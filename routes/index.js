'use strict';

var paypal = require('paypal-rest-sdk');
var config = {};

// Routes

exports.index = function (req, res) {
  res.render('index');
};

exports.create = function (req, res) {
	var method = req.param('method');

	var payment = {
		"intent": "sale",
		"payer": {
		},
		"transactions": [{
			"amount": {
				"currency": req.param('currency'),
				"total": req.param('amount')
			},
			"description": req.param('description')
		}]
	};

	if (method === 'paypal') {
		payment.payer.payment_method = 'paypal';
		payment.redirect_urls = {
			"return_url": "http://localhost:" + config.port + "/execute",
			"cancel_url": "http://localhost:" + config.port + "/cancel"
		};
	} else if (method === 'credit_card') {
		var funding_instruments = [
			{
				"credit_card": {
					"type": req.param('type').toLowerCase(),
					"number": req.param('number'),
					"expire_month": req.param('expire_month'),
					"expire_year": req.param('expire_year'),
					"first_name": req.param('first_name'),
					"last_name": req.param('last_name')
				}
			}
		];
		payment.payer.payment_method = 'credit_card';
		payment.payer.funding_instruments = funding_instruments;
	}

	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			req.session.payment_id = payment.id;
			res.render('create', { 'payment': payment, 'method': method });
		}
	});
};

exports.execute = function (req, res) {
	var payment_id = req.session.payment_id;
	var payer_id = req.param('PayerID');

	var details = { "payer_id": payer_id };
	var payment = paypal.payment.execute(payment_id, details, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			res.render('execute', { 'payment': payment });
		}
	});
};

exports.cancel = function (req, res) {
  res.render('cancel');
};

// Configuration

exports.init = function (c) {
	config = c;
	paypal.configure(c.api);
};