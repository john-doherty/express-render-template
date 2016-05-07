# express-render-template

Extends res.render allowing an external URL to be used as a layout & CSS selector as a placeholder location _(alternative to an iframe)_.

## Installation

```bash
$ npm install --save express-render-template
```

## Usage

The example below will request the [Mammoth Workwear](http://mammothworkwear.com) home page and replace the contents of **#promo-banner** with the contents of the view

```js
var renderTemplate = require('express-render-template');

// replace res.render with renderTemplate version
app.use(renderTemplate);

// create a regular express route
app.get('/', function(req, res){
    
    // call res.render as normal but pass template and selector rather than layout
    res.render('view-name',{
       template: 'http://mammothworkwear.com',  // external url to use as layout page
       templateSelector: '#promo-banner'        // element within the layout to inject view content
    });
});
```

## View Template

```html
<h1>20% off <a href="https://northseaworkwear.com/brands-dickies-fr-workwear/">Dickies Workwear</a></h1>
```

## Auto Base Tag Injection

To ensure scripts, styles and images in the external template load on your site, the render method injects a HTML base tag ```<base href="http://mammothworkwear.com" />```. Therefore you need to ensure any links within your view are absolute.

## License

[ISC License](LICENSE) &copy; 2016 [John Doherty](http://wwww.johndoherty.info/)