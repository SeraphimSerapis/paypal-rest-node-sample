## PayPal REST API Sample for Node.js

This is a sample application for the PayPal REST API Node.js SDK

If you're looking for a real world sample - check out [rest-api-sample-app-nodejs](http://github.com/paypal/rest-api-sample-app-nodejs).

### Configuration

Get your API credentials over at [developer.paypal.com](http://developer.paypal.com/webapps/developer/applications/myapps) by creating a new application. Use these credentials in the [config.json](../master/config.json) file.

The app uses standard PayPal test credentials at this very moment.

### Running it

First of all install all needed packages using `npm install`. Then run the app by using `node app.js`.

### Dependencies

[express](http://npmjs.org/package/express) - used as web-framework  
[jade](http://npmjs.org/package/jade) - for HTML templating  
[paypal-rest-sdk](http://npmjs.org/package/paypal-rest-sdk) - to handle PayPal payments

#### Development dependencies

[grunt](http://npmjs.org/package/grunt) - Runs tasks like JSHint validation  
[grunt-contrib-jshint](http://npmjs.org/package/grunt-contrib-jshint) - JSHint validation for JS files

### Contributing

Happy to have a look at pull requests

### Author

**Tim Messerschmidt**
[github.com/seraphimserapis](https://github.com/seraphimserapis)
