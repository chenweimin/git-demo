$(function(){
    var $banner = $('.sn_banner');
    var width = $banner.width();
    var $image = $banner.find('ul:first');
    var $point = $banner.find('ul:eq(1)');
    var $points = $point.find('li');
    var animateFuc = function(){
        $image.animate({'transform':'translateX('+(-index*width)+'px)'},200,'linear',function(){
            if(index >= 9){
                index = 1;
                $image.css({'transform':'translateX('+(-index*width)+'px)'});
            }else if(index <= 0){
                index = 8;
                $image.css({'transform':'translateX('+(-index*width)+'px)'});
            }

            $points.removeClass('now').eq(index-1).addClass('now');
        });
    }

    var index=1;
    var timer = setInterval(function(){
        index ++;
        animateFuc();
    },5000);

    $image.on('swipeRight',function(){
        index --;
        animateFuc();
    });
    $image.on('swipeLeft',function(){
        index ++;
        animateFuc();
    });
});
