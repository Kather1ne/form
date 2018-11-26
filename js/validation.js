$(function(){

	$('[name="city"]').kladr({
		type: $.kladr.type.city
	});

	var form = $('.order-form');

	$(form).on('submit', function(event) {

		event.preventDefault();

		var data = $(this).serializeArray();

		for (var input in data){
			var item = $('.item-input[name=' + data[input]['name'] + ']');

			if (data[input]['value'] == "") { item.parent().addClass('empty'); }
			else { item.parent().removeClass('empty'); }

			switch(data[input]['name']) {
				case 'surname':  
				if (item.val().match(/\w+ \w+/) == null) {
					item.parent().addClass('err');
				}
				else {
					item.parent().removeClass('err');
				}
				break;
				case 'number': 
				if (item.val().match(/^(\+7|7|8)+([0-9]){10}/) == null) {
					item.parent().addClass('err');
				}
				else {
					item.parent().removeClass('err');
				}
				break; 
				case 'email': 
				if (item.val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@\w{2,10}.\w{2,10}/) == null) {
					item.parent().addClass('err');
				}
				else {
					item.parent().removeClass('err');
				}
				break; 
				case 'city': 
				if (item.attr('data-kladr-id') == null) {
					item.parent().addClass('err');
				}
				else {
					item.parent().removeClass('err');
				}
				break; 
				default: break;
			}
		}
	});

	$('#delivery').change(function() {
		if(this.checked) {
			$('.price-item.price:nth-child(2) span').html('450 руб.');
			var sum = Number($('.price-item.price:nth-child(2) span').html().match(/\d+/)) + Number($('.price-item.price:nth-child(1) span').html().match(/\d+/)) - Number($('.price-item.price:nth-child(3) span').html().match(/\d+/));
			$('.bill-sum').html(sum + ' руб.');
		}
	});

	$('#mail, #pickup').change(function() {
		if(this.checked) {
			$('.price-item.price:nth-child(2) span').html('0 руб.');
			var sum = Number($('.price-item.price:nth-child(2) span').html().match(/\d+/)) + Number($('.price-item.price:nth-child(1) span').html().match(/\d+/)) - Number($('.price-item.price:nth-child(3) span').html().match(/\d+/));
			$('.bill-sum').html(sum + ' руб.');
		}
	});
});