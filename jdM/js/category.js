window.onload = function(){
    iscrollLeft();
    iscrollRight();
}

var iscrollLeft = function(){
    new IScroll(document.querySelector('.cate_left'));
}
var iscrollRight = function(){
    new IScroll(document.querySelector('.cate_right'));
}