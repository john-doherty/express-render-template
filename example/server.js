var express = require('express'),
    app = express(),
    iframeReplacement = require('../index.js');

function Server(){

    app.use(iframeReplacement);

    app.get('/', function(req, res){

        res.render('view-name', {
            template: 'http://mammothworkwear.com',  // external url to use as layout page 
            templateSelector: '#promo-banner'        // element within the layout to inject view content 
        });
    });

    app.listen(8000);
}

module.exports = new Server();