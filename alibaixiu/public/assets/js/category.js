$('#addCategory').on('submit', function() {
	var formData = $(this).serialize();
	$.ajax({
		type: 'post',
		url: '/categories',
		data: formData,
		success: function () {
			location.reload();
		}
	})
	return false;
})

$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response) {
		var html = template('categoryListTpl', {data: response});
		$('#categoryBox').html(html);
	}
})

$('#categoryBox').on('click', '.edit', function() {
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'get',
		url: '/categories/'+ id,
		success: function (response) {
			var html = template('modifyCategoryTpl', response);
			$('#formBox').html(html);
		}
	})
});

$('#formBox').on('submit', '#modifyCategory', function () {
	var id = $(this).attr('data-id');
	var formData = $(this).serialize();
	$.ajax({
		type: 'put',
		url: '/categories/'+ id,
		data: formData,
		success: function () {
			location.reload();
		}
	});
	return false;
});

$('#categoryBox').on('click', '.delete', function () {
	if(confirm('您真的要执行删除操作吗?')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/categories/'+ id,
			success: function () {
				location.reload();
			}
		})
	}
})