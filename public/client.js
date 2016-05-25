$(function(){

// index
	$.get('/cities' , appendToList);

// delete
	$('.block-list').on('click', 'i[data-block]', function(event){
			if(!confirm('Are you sure')){
				return false;
			}
			var target = $(event.currentTarget);
			$.ajax({
			type:	'DELETE', url: '/cities/' + target.data('block')
			}).done(function(){
				target.parents('li').remove();
			});
	});

// Create a block and add it to a list
	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var cityData = form.serialize();
		console.log('cityData : ',cityData);

		$.ajax({
			type: 'POST', url: '/cities', data: cityData
		}).error(function () {
			alert('Invalid City');
		})
		.done(function(cityName){
			appendToList([cityName]);
			form.trigger('reset');
		});
	});

// Append blocks in a list
	function appendToList(blocks) {
		var list = [];
		var content , block;
		for(var i in blocks){
			block = blocks[i];
			content = '<i class="fa fa-trash" aria-hidden="true" data-block= '+ block +'></i><a href="/cities/'+ block + '">' + block + '</a>';
			list.push($('<li>', { html : content } ));
		}

		$('.block-list').append(list);
	}

});


/*=============================================================================================

	Se consume con Jquery el arreglo de bloques que definimos en nuestra api.

	 $(event.currentTarget);
	 the icon elment that was clicked

	event.preventDefault();
	Previene el form de un submit inmendiato

 	form.serialize();
	Transform form data to URL-encoded notation

	form.trigger('reset');
	cleans up form text input fields

================================================================================================ */
