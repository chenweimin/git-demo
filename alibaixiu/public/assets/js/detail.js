var postId = getUrlParams('id');
var review;

$.ajax({
	type: 'get',
	url: '/posts/'+ postId,
	success: function (response) {
		var html = template('postTpl', response);
		$('#article').html(html);
	}
})

$('#article').on('click', '#like', function () {
	$.ajax({
		type: 'post',
		url: '/posts/fabulous/'+ postId,
		success: function () {
			alert('点赞成功');
		}
	})
})

$.ajax({
	type: 'get',
	url: '/settings',
	success: function (response) {
		review = response.review;
		if(response.comment) {
			var html = template('commentTpl');
			$('#comment').html(html);
		}
	}
})

$('#comment').on('submit', 'form', function () {
	var content = $(this).find('textarea').val();
	var state;
	if (review) {
		state = 0;
	}else {
		state = 1;
	}
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			content: content,
			post: postId,
			state: state
		},
		success: function (response) {
			alert('评论成功');
			location.reload();
		},
		error: function () {
			alert('评论失败');
		}
	})
	return false;
})