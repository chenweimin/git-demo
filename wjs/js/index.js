$(function(){
    banner();
    initTab();
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function(){
    var $banner = $('.carousel');
    var $point = $banner.find('.carousel-indicators');
    var $image = $banner.find('.carousel-inner');
    var $window = $(window);

    var data = [
        {
            pcSrc:'images/b1.jpg',
            mSrc:'images/mb1.jpg'
        },
        {
            pcSrc:'images/b2.jpg',
            mSrc:'images/mb2.jpg'
        },
        {
            pcSrc:'images/b3.jpg',
            mSrc:'images/mb3.jpg'
        },
        {
            pcSrc:'images/b4.jpg',
            mSrc:'images/mb4.jpg'
        }
    ]

    var render = function(){
        var isMobile = $window.width() < 768 ? true : false;
        var pointHtml= '';
        var imageHtml= '';
        $.each(data,function(k,v){
            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+k+'" '+(k==0?'class="active"':'')+'></li>';
            imageHtml += '<div class="item '+(k==0?'active':'')+'">';
            if(isMobile){
                imageHtml += '<a class="m_imageBox" href="#"><img src="'+(v.mSrc)+'" /></a>';
            }else{
                imageHtml += '<a class="pc_imageBox" href="#" style="background-image: url('+v.pcSrc+');"></a>';
            }
            imageHtml += '</div>';
        });
        $point.html(pointHtml);
        $image.html(imageHtml);
    }

    $window.on('resize',function(){
        render();
    }).trigger('resize');

    var startX = 0;
    var distanceX =0;
    var isMove = false;
    $banner.on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        if(isMove && Math.abs(distanceX) >= 50){
            if(distanceX > 0){
                $banner.carousel('prev');
            }else{
                $banner.carousel('next');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
};

var initTab = function(){
    var tabs = $('.wjs_product .nav-tabs');
    var liList = tabs.find('li');
    var width = 0;
    $.each(liList,function(i,item){
        width += $(item).outerWidth(true);
    })
    tabs.width(width);
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });
}