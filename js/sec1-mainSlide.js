;(function($, window, document, undefined){
	var setId=setId2=tCnt=n=cnt=bar=winW=wrpW=winH=brat=barH=boxH=mTop=oneH=timer=txtH=tTop=tiH2=tiH4=h2Rat=h4Rat=h2H=h4H=0;
	    n = $('.slide').length-2;  //슬라이드 갯수 3 = 5-2맨앞 맨뒤
		brat = 200/969;  	//타임바 높이비율 = 0.206398349  상수값
		timer = 4;   //4초 초단위
		h2Rat =	68/1900  	//0.035789474
		h4Rat = 16/1900 	//0.008421053
		
		mainSlideResponseFn();
		setTimeout(mainSlideResponseFn,100);

		$(window).resize(function(){
			mainSlideResponseFn();
		});
		
		//메인 슬라이드 반응형
		function mainSlideResponseFn(){
			winW = $(window).innerWidth();
			winH = $(window).innerHeight();
			wrpW = $('#wrap').innerWidth();
			h2H = $('.slide-title h2').innerHeight();
			h4H = $('.slide-title h4').innerHeight();
				
			//타임바 비율계산 및 타이머 콘트롤
			barH = winH * brat 	//타임바 높이 = 창높이 * 타임바비율 
			boxH = (barH*n)+(10*n) //페이지버튼 타임바3개 박스 전체 높이 = (높이*3) + (마진*3)
			mTop = -(boxH/2);
			oneH = barH/(100*timer);   // 100분의 1초에 한번 증가 할 높이값 0.5 = 200/(100*4)    
			
			//슬라이드 타이틀
			txtH = h2H + h4H   		//글상자 전체 높이
			tTop = -(txtH/2) 		//글상자 마진 탑
			
			if( winW > 1024 ){
				tiH2 = (h2Rat*wrpW)*1.1; 	//타이틀 H2 = h2Rat * wrpW 
				tiH4 = (h4Rat*wrpW)*1.1; 	//타이틀 H4 = h4Rat * wrpW 
			}
			else if( winW > 500  ){
				tiH2 = (h2Rat*wrpW)*1.3;
				tiH4 = (h4Rat*wrpW)*1.3;
			}
			else{  //500이하
				tiH2 = (h2Rat*wrpW)*2;
				tiH4 = (h4Rat*wrpW)*2;
			}
			
			//반응형 적용 ////////////////////////////////////////////////
			//슬라이드
			$('.slide').css({ maxWidth: wrpW, height: winH });
			
			//페이지버튼
			$('.sec1Slide-page-wrap ul li').css({ height: barH });
			$('.sec1Slide-page-wrap').css({ height: boxH , marginTop: mTop });
			
			//타이틀 적용
			$('.slide-title').css({height: txtH, marginTop: tTop })
			$('.slide-title h2').css({ fontSize: tiH2 });
			$('.slide-title h4').css({ fontSize: tiH4 });
			
			//메인 슬라이드 적용 호출
			mainSlideFn();			
		}
		
		//메인 슬라이드 자동실행
		autoPlayFn();
		
		function autoPlayFn(){
			mainSlideResponseFn();  //반응형 너비 높이 모든 비율계산 적용
			setId = setInterval(function(){
				bar += oneH;  //0.5
				if( bar > barH ){  //타임바 길이 969픽셀 기준값 200
					bar = oneH; //0.5
					nextCountFn();
				}
				pageBtFn();
			}, 10);
		}

		//페이지버튼 함수 : 자동실행 호출, 페이지버튼 클릭시 메이슬라이드 실행시 호출
		function pageBtFn(){
			$('.sec1PageBt').find('i').css({ height:0 });
			$('.sec1PageBt').eq(cnt>2?0:cnt).find('i').css({ height: bar });			
		}
		
		//페이지버튼 & 다음, 이전 슬라이드 
		//버튼위에 마우스 오버시 일시정지
		//마우스 아웃시 재실행
		$('.timeControl').on({
			mouseenter:	function(){
				clearInterval(setId);
			},
			focusin:	function(){
				clearInterval(setId);
			},
			mouseleave:	function(){
				clearInterval(setId);
				autoPlayFn();
			},
			focusout:	function(){
				clearInterval(setId);
				autoPlayFn();
			}
		});
		
		//페이지버튼 클릭 이벤트
		//예외조건 : 현재 실행중인 슬라이드가 아니면 클릭 된다.
		$('.sec1PageBt').each(function(idx){
			$(this).on({
				click:	function(){
					if( cnt != idx ){  //현재 슬라이드가 아니다.
						cnt=idx;   //현재 슬라이드를 클릭된 슬라이드 변경
						bar = 0;   //타임바 길이 초기화
						mainSlideFn(); //메이슬라이드
						touchTimeControlFn();
					}
				}
			});	
		});
		
		//Touch Event
		$('.sec1Slide-view').swipe({
			swipeLeft:	function(){
				clearInterval(setId);
				bar = 0;
				nextCountFn();
				
				//5초간 터치없으면 자동 실행
				touchTimeControlFn();
				
			},
			swipeRight:	function(){
				clearInterval(setId);
				bar = 0;
				prevCountFn();
				
				//5초간 터치없으면 자동 실행
				touchTimeControlFn();
				
			}
		});
		
		//5초간 터치없으면 자동 실행 함수
		function touchTimeControlFn(){
			tCnt=0;
			clearInterval(setId2);
			setId2 = setInterval(function(){
				tCnt++;
				if(tCnt>5){
					nextCountFn();
					clearInterval(setId);
					autoPlayFn();
					clearInterval(setId2);  //자신의 타이머중지
				}
			},1000);
		}
		
		
		
		//다음화살버튼 클릭 이벤트
		$('.sec1NextBt').on({
			click:	function(){
				//애니메이션 실행중에는 클릭 안되게 한다.
				if( !$('.sec1Slide-wrap').is(':animated') ){
					bar = 0;
					nextCountFn();	
				}
			}
		});
		
		//이전화살버튼 클릭 이벤트
		$('.sec1PrevBt').on({
			click:	function(){
				alert("dd");
				//애니메이션 실행중에는 클릭 안되게 한다.
				if( !$('.sec1Slide-wrap').is(':animated') ){
					bar = 0;
					prevCountFn();
				}
			}
		});
		
		function nextCountFn(){
			cnt++;
			mainSlideFn();
		}
		function prevCountFn(){
			cnt--;
			mainSlideFn();
		}
		
		function mainSlideFn(){
			$('.sec1Slide-wrap').stop().animate({left:(-100*cnt)+'%'},600, function(){
				if( cnt > 2 ){
					cnt=0;
				}
				if( cnt < 0 ){
					cnt=2;
				}
				$('.sec1Slide-wrap').stop().animate({left:(-100*cnt)+'%'},0);
			});
			pageBtFn();
		}
	
})(jQuery, window, document);//sec1-mainSlide.js