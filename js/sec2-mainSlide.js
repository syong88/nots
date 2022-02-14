;(function($, window, document, undefined){
	var sets2Id = sets2Id2 = s2n = s2cnt = ts2Cnt = 0;	    
	var winW = s2TitH = s2FontH2 = s2FontH3 =  h2FontH4 = s2MarginTop = 0;
		h2Rate = 90/1903;
		h3Rate = 30/1903;
		h4Rate = 20/1903;

		s2n = $('.sec2Slide').length-2;

		$(window).resize(function(){
			resizeFn();
		});
		
		resizeFn()
		setTimeout(resizeFn,100);
		function resizeFn(){
			winW = $(window).innerWidth();
			s2TitH = $('.sec2-slide-title').innerHeight();
			s2MarginTop = -(s2TitH / 2);
			
			if( winW < 1903 ){
				s2FontH2 = h2Rate * winW;
				s2FontH3 = h3Rate * winW;
				h2FontH4 = h4Rate * winW;
				$('.sec2Slide').css({width: winW });	
			}
			else{
				s2FontH2 = 90;
				s2FontH3 = 30;
				h2FontH4 = 20;
				$('.sec2Slide').css({width: 1903 });				
			}
			
			$('.sec2-slide-title h2').css({ fontSize: s2FontH2<31?31:s2FontH2 });	
			$('.sec2-slide-title h3').css({ fontSize: s2FontH3<14?14:s2FontH3 });	
			$('.sec2-slide-title h4').css({ fontSize: h2FontH4<12?12:h2FontH4 });	
			
			$('.sec2-slide-title').css({ marginTop: s2MarginTop });	
		}
		
		//메인 슬라이드 자동실행
		autoPlayFn();
		
		function autoPlayFn(){
			sets2Id = setInterval(nextCountFn,4000);
		}
		
		//Touch Event
		$('.section2-slide-view').swipe({
			swipeLeft:	function(){
				if( !$('.section2-slide-wrap').is(':animated') ){
					clearInterval(sets2Id);
					nextCountFn();
					touchTimeControlFn();
				}
			},
			swipeRight:	function(){
				if( !$('.section2-slide-wrap').is(':animated') ){
					clearInterval(sets2Id);
					prevCountFn();
					touchTimeControlFn();
				}				
			}
		});
		
		//5초간 터치없으면 자동 실행 함수
		function touchTimeControlFn(){
			ts2Cnt=0;
			clearInterval(sets2Id2);
			sets2Id2 = setInterval(function(){
				ts2Cnt++;
				if(ts2Cnt>5){
					nextCountFn();
					clearInterval(sets2Id);
					autoPlayFn();
					clearInterval(sets2Id2);
				}
			},1000);
		}
		
		$('.sec2SlideNextBt').on({
			click:	function(){
				if( !$('.section2-slide-wrap').is(':animated') ){
					nextCountFn();	
				}
			},
			mouseenter:	function(){
				clearInterval(sets2Id);
			},
			mouseleave:	function(){
				autoPlayFn();
			},
			focusin:	function(){
				clearInterval(sets2Id);
			},
			focusout:	function(){
				autoPlayFn();
			}
		});
		
		$('.sec2SlidePrevBt').on({
			click:	function(){
				if( !$('.section2-slide-wrap').is(':animated') ){
					prevCountFn();
				}
			},
			mouseenter:	function(){
				clearInterval(sets2Id);
			},
			mouseleave:	function(){
				autoPlayFn();
			},
			focusin:	function(){
				clearInterval(sets2Id);
			},
			focusout:	function(){
				autoPlayFn();
			}
		});
		
		function nextCountFn(){
			s2cnt++;
			mainSlideFn();
		}
		function prevCountFn(){
			s2cnt--;
			mainSlideFn();
		}
		
		function mainSlideFn(){
			$('.section2-slide-wrap').stop().animate({left:(-100*s2cnt)+'%'},500,'easeOutExpo', function(){
				if( s2cnt > 2 ){
					s2cnt=0;
				}
				if( s2cnt < 0 ){
					s2cnt=2;
				}	
				$('.section2-slide-wrap').stop().animate({left:(-100*s2cnt)+'%'},0);
			});
		}
	
})(jQuery, window, document);//sec1-mainSlide.js