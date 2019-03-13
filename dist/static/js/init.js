$(function(){
    //함수실행
    comFn();
    roomFn();
    
    $(window).load(function() {
        //리사이즈
        $(window).resize(function() {
            //함수실행
            comFn();
            roomFn();
            roomPop();
            
            // 메인 비주얼 영역
            $("div[id*=bxBox-] .bxS").bxSlider({
                mode : 'fade',
                auto : true,
                autoHover : true,
                autoControls : true,
                pager : true,
                speed : 500,
                duration : 5000
            });
        }).resize();
    });
    
    // 팝업 닫기 클릭시 z-index 복귀
    $('#roomList > li .bxBox .a-x').on('click', function () {
        $(this).closest('li').find('.bxBox').css({
            visibility: 'hidden',
            height: 0
        });

        $(this).closest('li').find('.roomSlider').bxSlider({
            autoControls: false
        });
    });
});


function comFn(){
    menuCom();
    
    $(window).scroll(function(){
        menuCom();
    });
    
}
 
//메뉴
function menuCom(){
    var st = $(window).scrollTop();
    var mainTop = $('.header .logo-box a'); 
    var menu = $('.nav .nav-list li');
    var section = $('section[class*="-sec"]');
    var visual = $('.main-sec');
    var visualH = visual.height();
    var hdH = $(".header").outerHeight();
    var time = 1000;
    
    //console.log(hdH);
    visual.css({'padding-top' : hdH+'px'});
    
    //header
    if ( st < (visualH-1) ) {
        $('.header').removeClass('on');
    }else{
        $('.header').addClass('on');
    }
    
    //scroll menu on
    $.each(section, function(idx, item){
        var target = section.eq(idx);
        var secId = ( '#'+String(target.attr('id')) );
        var targetTop = target.offset().top;
        var plusH = hdH+1;

        //console.log(targetId);

        if ( st < visualH ) {
            menu.removeClass('on'); 
        }
        if ( (targetTop-plusH) <= st ) {
            menu.removeClass('on');
            menu.find('a[href="'+secId+'"]').parents('li').addClass('on');
        }

    });
    
    //click move
    menu.find('a').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        var offsetTop = $(target).offset().top;
        //menu.removeClass('on');
        //$(this).parents('li').addClass('on');

        $('html, body').stop().animate({
            scrollTop : (offsetTop-hdH)
        }, time);

        return false;
    });
    
    //top
    mainTop.on('click', function(e){
        e.preventDefault();
        $("html, body").stop().animate({
            scrollTop : 0
        }, time);
    });
}

function roomFn(){

    // 객실안내
    $('#roomList .d-row-1 .a-btn').on('click', function () {
        $('#roomList > li .bxBox').css({
            visibility: 'hidden',
            height: 0
        });

        if ($(this).closest('li').find('.bxBox').css('visibility') == 'hidden') {

            $(this).closest('li').find('.bxBox').css({
                visibility: 'visible',
                height: 'auto'
            });
            
            roomPop();

            $(this).closest('li').find('.roomSlider').bxSlider({
                auto : true,
                autoControls : false,
                pager : false,
                speed : 500,
                duration : 3000

            });
        } else {

        }
    });
    
}

//팝업 높이값(모바일에서만)
function roomPop(){
    var mql = window.matchMedia("screen and (max-width: 767px)");

    if(mql.matches) {
        var mImgH = $('.room-area .li-item > figure').height();
        var popImg = $('.room-area .ul-list .li-item .bxBox .bx-wrapper img'); //.contents .visit-sec .room-area .ul-list .li-item .bxBox .bx-wrapper .bx-viewport
        var popView = $('.room-area .ul-list .li-item .bxBox .bx-wrapper .bx-viewport');

        //console.log (mImgH)
        popImg.css({'height' : (mImgH-5)+'px'});
        popView.css({'height' : (mImgH-5)+'px'});
    } else {

    }
}








