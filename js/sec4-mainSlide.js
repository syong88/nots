;(function($, window, document, undefined){
	
	var s4Cnt=s4TCnt=s4setId=s4SetId2=s4slideW=0;
	var n = $('.sec4Slide-wrap>li').length-3; //5-3=2 0~2까지 쓰려고
	
	//섹션4 반응형 슬라이드
	sec4ResizeFn();
	setTimeout(sec4ResizeFn,100);
	
	$(window).resize(function(){
		sec4ResizeFn();
	});
	function sec4ResizeFn(){
		winW = $(window).innerWidth();
		if( winW >= 1600 ){
			s4slideW = 1600/2; //800
			
		}
		else if( winW > 760 ){
			s4slideW = winW/2;
			
		}
		else{ //760이하 (css,jQuery 범위 연결해야한다)
			s4slideW = winW/1; //1칸 다 나와라 or s4slideW = winW;
		}
		$('.sec4Slide').css({width:s4slideW});
		$('.sec4Slide-wrap').css({width:s4slideW*(n+3), marginLeft:-s4slideW});
		sec4MainSlide();
	}
	
	s4AutoPlayFn();
	function s4AutoPlayFn(){
		s4setId = setInterval(s4NextCoundFn,4000);
		
	}
	
	//다음카운트 함수
	function s4NextCoundFn(){
			s4Cnt++;
			sec4MainSlide();
	}
	//이전카운트 함수
	function s4PrevCoundFn(){
			s4Cnt--;
			sec4MainSlide();
	}
	
	//터치스와이프 이벤트
	$('.sec4Slide-view').swipe({
		swipeLeft:	function(){
			if( !$('.sec4Slide-wrap').is(':animated') ){
				clearInterval(s4setId);
				s4NextCoundFn();
				touchTimeFn();

			}
		},
		swipeRight:	function(){
			if( !$('.sec4Slide-wrap').is(':animated') ){			
				clearInterval(s4setId);
				s4PrevCoundFn();
				touchTimeFn();
			}
		}
	});
	
	//5초간 터치 없으면 자동실행 함수////////////////////////////////////
	function touchTimeFn(){
		s4TCnt=0;
		clearInterval(s4SetId2);
		s4SetId2 = setInterval(function(){
			s4TCnt++;
			if( s4TCnt>5 ){
				s4NextCoundFn();
				clearInterval(s4setId);
				s4AutoPlayFn();
				clearInterval(s4SetId2);
			}
		},1000);
	}
	
	//페이지버튼 마우스엔터시 clearInterval 이벤트
	$('.sec4PageBt').on({
		mouseenter:	function(){
			clearInterval(setId);
		},
		mouseleave:	function(){
			s4AutoPlayFn();
		}
	});
	
	//페이지버튼 클릭이벤트
	$('.sec4PageBt').each(function(index){
		$(this).on({
			click:	function(){
				s4Cnt=index;
				sec4MainSlide(index);
			}
		});
	});
	
	//페이지버튼 함수
	function s4PageBtFn(){
		$('.sec4PageBt').removeClass('addCurrentPage');
		$('.sec4PageBt').eq(s4Cnt>2?0:s4Cnt).addClass('addCurrentPage');
	}
	
	//메인슬라이드
	function sec4MainSlide(){
		
		$('.sec4Slide-wrap').stop().animate({left: (-s4slideW*s4Cnt) },500, function(){
			if(s4Cnt>2){
				s4Cnt=0;
				
			}
			if(s4Cnt<0){
				s4Cnt=2;
				
			}
			$('.sec4Slide-wrap').stop().animate({left: (-s4slideW*s4Cnt) },0);
		});
		s4PageBtFn();	
	}
	
})(jQuery, window, document);

//sec4-mainSlide.js











