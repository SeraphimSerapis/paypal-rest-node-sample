'use strict';

$(function () {
	$('#number').focusout(function () {
		var number = $('#number').val();
		var type = getCreditCardType(number);
		var length = $('#type').val().length;
		if (type !== "unknown" && length === 0) {
			$('#type').val(type);
		}
	});
});

// found at: http://webstandardssherpa.com/reviews/auto-detecting-credit-card-type/
function getCreditCardType(accountNumber) {
	//start without knowing the credit card type
	var result = "unknown";

	//first check for MasterCard
	if (/^5[1-5]/.test(accountNumber)) {
		result = "Mastercard";
	}

	//then check for Visa
	else if (/^4/.test(accountNumber)) {
		result = "Visa";
	}

	//then check for AmEx
	else if (/^3[47]/.test(accountNumber)) {
		result = "Amex";
	}

	return result;
}