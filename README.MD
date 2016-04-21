# express-render-template

Extends res.render allowing an external URL to be loaded as a layout template and a CSS selector as a placeholder location.

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
       template: 'http://mammothworkwear.com',
       selector: '#promo-banner'
    });
});
```

## View Template

```html
    <h1>20% off Dickies Workweaar</h1>
```