$('#userForm').on('submit', function () {
	var formData = $(this).serialize();
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function (){
			location.reload();
		},
		error: function (){
			alert('添加用户失败');
		}
	})
	return false;
});

$('#modifyBox').on('change', '#avatar', function () {
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar);
		}
	})
});

$.ajax({
	type: 'get',
	url: '/users',
	success: function (response) {
		var html = template('userTpl', {data: response});
		$('#userBox').html(html);
	}
})

$('#userBox').on('click', '.edit', function (){
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'get',
		url: '/users/' +id,
		success: function (response) {
			console.log(response)
			var html = template('modifyTpl', response);
			$('#modifyBox').html(html);
		}
	})
})

$('#modifyBox').on('submit', '#userForm', function () {
	var formData = $(this).serialize();
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/users/'+ id,
		data: formData,
		success: function (response) {
			location.reload();
		}
	})
	return false;
});

$('#userBox').on('click', '.delete', function () {
	
	if(confirm('您真的要删除用户吗?')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/users/'+ id,
			success: function() {
				location.reload();
			}
		})
	}
});

var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany')
selectAll.on('change', function () {
	var status = $(this).prop('checked');

	if(status) {
		deleteMany.show();
	}else {
		deleteMany.hide();
	}

	$('#userBox').find('input').prop('checked', status);
});

$('#userBox').on('change', '.userStatus', function () {
	var inputs = $('#userBox').find('input');
	if(inputs.length == inputs.filter(':checked').length) {
		selectAll.prop('checked', true);
	}else {
		selectAll.prop('checked', false);
	}

	if(inputs.filter(':checked').length > 0) {
		deleteMany.show();
	}else {
		deleteMany.hide();
	}
});

deleteMany.on('click', function (){
	var ids = [];
	var checkedUser = $('#userBox').find('input').filter(':checked');

	checkedUser.each(function (index, element) {
		ids.push($(element).attr('data-id'));
	});

	if(confirm('您真的要进行批量删除操作吗?')) {
		$.ajax({
			type: 'delete',
			url: '/users/' + ids.join('-'),
			success: function () {
				location.reload();
			}
		})
	}
});