"use strict";

var cheerio = require('cheerio'),           // used to convert raw html into jQuery style object to we can use css selectors
    request = require('request-promise'),   // promise based request object
    cache = {};                             // cache object used to store html by url - removes the need to reload html for each request 

// override res.render to allow us to fetch template url or use html template string
module.exports = function(req, res, next){
    
    // save a pointer to the original render() function so we can replace it if we dont have a .template property
    var originalRender = res.render;
    
    // replace the standard res.render function so we can intercept response rendering
    res.render = function(view, options, fn){
        
        // set the render function back to its original value (we need to do this so the app instance is correct)
        res.render = originalRender;
        
        if (!options.template){
            // no .template, therefore process this as normal
            res.render(view, options, fn);
        } 
        else {
            
            // clear layout as we're going to use the .template url or html string
            options.layout = null;
            
            // resolve the template, either url to jquery object or html
            resolveTemplate(options.template).then(function($){
                
                // convert view into html to be inserted
                res.render(view, options, function(err, html) {
                    if (err) next(err);
                    
                    // inject content into selector or body
                    $(options.templateSelector || 'body').html(html);
                    
                    // return merged content
                    res.status(200).send($.html());
                });
            });
        }
    };
    
    next();
}

/**
 * Converts template url to $ object 
 * @param {string} template - url to external template or html content
 */
function resolveTemplate(template){
    
    return new Promise(function(resolve, reject){
        
        // if its a url and we have the contents in cache
        if (template.isUrl() && cache[template]){
            
            // return cached template as a jquery style object
            resolve(cache[template]);
        }
        else if (template.isUrl()){
            
            // request the template url
            return request({ uri: template }).then(function(html){
                
                // convert html into jquery style object so we can use selectors
                var $ = cheerio.load(html);
                
                // add base url to ensure links/scripts/styles load correctly
                $('head').prepend('<base href="' + template + '">');
                
                // cache the result so we dont have to keep getting it for future requests
                cache[template] = $;
                
                // resolve with jquery object containing content
                resolve($);
            })
            .catch(function (err) {
                
                // request failed, inform the user
                res.status(500).send('Unable to retrieve ' + template).end();
            });
        }
        else {
            // the template must contain markup, just return it
            resolve(template);
        }
    });
}

// helper function to allow us to determine if the template is a url
String.prototype.isUrl = function(){ 
    return /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/i.test(this);
}