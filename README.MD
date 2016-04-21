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

// using an external url as a layout template
app.get('/', function(req, res){
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