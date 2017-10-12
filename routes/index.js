'use strict';

var paypal = require('paypal-rest-sdk');
var config = {};

// Routes

exports.index = function (req, res) {
  res.render('index');
};

exports.create = function (req, res) {
	var method = req.query.method;

	var payment = {
		"intent": "sale",
		"payer": {
		},
		"transactions": [{
			"amount": {
				"currency": req.query.currency,
				"total": req.query.amount
			},
			"description": req.query.description
		}]
	};

	if (method === 'paypal') {
		payment.payer.payment_method = 'paypal';
		payment.redirect_urls = {
			"return_url": "http://localhost:3000/execute",
			"cancel_url": "http://localhost:3000/cancel"
		};
	} else if (method === 'credit_card') {
		var funding_instruments = [
			{
				"credit_card": {
					"type": req.query.type.toLowerCase(),
					"number": req.query.number,
					"expire_month": req.query.expire_month,
					"expire_year": req.query.expire_year,
					"first_name": req.query.first_name,
					"last_name": req.query.last_name
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
			req.session.paymentId = payment.id;
			res.render('create', { 'payment': payment });
		}
	});
};

exports.execute = function (req, res) {
	var paymentId = req.session.paymentId;
	var payerId = req.query.PayerID;

	var details = { "payer_id": payerId };
	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
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