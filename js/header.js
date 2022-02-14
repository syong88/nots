;(function($, window, document, undefined){
	//header 높이 설정 = 슬라이드(섹션1높이 창높이)+169
	var winH = t = setId = 0;
	var headH = 169;
	var cnt = -1;
	var n = $('.mMainBt-wrap>li').length-1;   //5
	var winW = $(window).innerHeight();
	
		//mfTabBt 서브2 탭버튼
		$('.mfTabBt').each(function(index){
			$(this).on({
				click:	function(){
					$('.mfTabSub').hide();
					$('.mfTabSub').eq(index).show();
				}
			});
		});
		
		//msTabBt 서브3 탭버튼
		$('.msTabBt').each(function(index){
			$(this).on({
				click:	function(){
					$('.msTabSub').hide();
					$('.msTabSub').eq(index).show();
				}
			});
			
		});
		
		
		//close버튼 클릭시 창 닫히는 이벤트
		$('.headerCloseBt').on({
			click:	function(){
				$('.mNav').hide();
			}
		});
		
		//mMainBt 클릭시 : 아코디언 메뉴 와 아이콘 변경 알고리즘
		$('.mMainBt').on({
			click:	function(){
				
				$('.sub').stop().slideUp(300);
				$(this).next().stop().slideToggle(300);
				
				//아이콘 변경
				//토글클랙스기능이 현재버튼에선 문제없는데
				//다른버튼 클릭하면 토글이 원위치가 안된다. 버그(Bug)
				//$(this).find('.moreBt').toggleClass('addMore');
				
				//addMore 클래스가 존재하냐?(검색 : hasClass) 참 true  / 거짓 false 그러면 삭제
				//추가하고자하는 클래스가 존재 하지 않으면 클래스 추가
				
				//현재[this] 클릭한 버튼 위에서 자식태그[children]안에 클래스 'addMore' 검색 hasClass 				
				// var x = $(this).children().hasClass('addMore');
				var findHas = $(this).find('.addMore').hasClass('addMore');
					
					//추가하고자하는 클래스가 존재 하지 않으면(if~then ...) 클래스 추가
					if( findHas == false ){
						$('.moreBt').removeClass('addMore');  //자신포함 다른모든 클래스
						$(this).children().addClass('addMore');
					}
					//추가하고자하는 클래스가 존재 하면(if~then ...) 클래스 삭제
					else if( findHas == true ){
						//$('.moreBt').removeClass('addMore');
						$(this).children().removeClass('addMore');
					}
				
			}
		});
		
		//.mMainBt-wrap>li.addAni 추가 클래스
		function mMainBtAniFn(){
			$('.mMainBt-wrap>li').removeClass('addAni'); //초기화
			cnt=-1;  //초기화
			
			setId = setInterval(function(){
				cnt++;  //0 1 2 3 4 5
				if( cnt > n ){
					clearInterval( setId );
				}
				else{
					$('.mMainBt-wrap>li').eq(cnt).addClass('addAni');
				}
				console.log( cnt );
				
			},100);
		}
		
		//sec1SkipBt 버튼클릭시 섹션1로 이동 반응형 mobile
		$('.sec1SkipBt').on({
			click:	function(){
				//winW = $(window).innerHeight();
				if( winW>900 ){
					$('html,body').stop().animate({scrollTop:$('.header-row1').offset().top},600, 'swing');	
				}	
				else if( winW<=900 ){
					$('html,body').stop().animate({scrollTop:$('.mobile').offset().top},600, 'swing');	
				}	
			}
		});

	
	
		//모바일메뉴 이벤트
		//앱바버튼 클릭 이벤트
		$('.appbarBt').on({
			click:	function(){
				
				//mobileResizeFn();
				$('html,body').stop().animate({scrollTop: winH }, 500,'swing');
				
				if( t==0 ){
					t=1; //클릭됨
					$('.mNav').stop().show();
					mMainBtAniFn();  //3D 회전
				}
				else{
					t=0; //초기화
					$('.mNav').stop().hide();	
				}
				
			}
		});

		function mobileResizeFn(){
						
			if( winW > 900 ){
				t=0;  //클릭안된 상태로 초기화 설정
				$('.mNav').stop().hide();
			}
			
		}
			
		
		headerResizeFn();
		setTimeout(headerResizeFn,100);
		
		//반응형 resize();
		$(window).resize(function(){
			headerResizeFn();
			mobileResizeFn();
		});
	
		function headerResizeFn(){
			winW = $(window).innerWidth();
			winH = $(window).innerHeight();
			headH = $('#header-wrap').innerHeight();
			$('#header').css({ height: winH+headH });
			$('.mNav').css({ height: winH });
			
			
			
		}
	
		//스크롤이벤트 - 스크롤탑값이 창높이에 닿으면 헤더 ROW1 ROW2상단 고정
		$(window).scroll(function(){
			if( $(this).scrollTop() >= winH+46 ){
				$('#header, #section2').addClass('addFixed');
				$('#header').css({ height: winH });
			}
			else{
				$('#header, #section2').removeClass('addFixed');
				$('#header').css({ height: winH+headH });
			}
		});
		
		//languageBt
		$('.languageBt').on({
			mouseenter:	function(){
				$(this).next().stop().slideDown(200);
			},
			focusin:	function(){
				$(this).next().stop().slideDown(200);
			}
		});

		
		$('.aside li').on({
			mouseleave:	function(){
				$('.landscape-sub').stop().slideUp(200);
			}
		});
		
		
		$('.mainBt').on({
			focusin:	function(){
				$('.landscape-sub').stop().slideUp(200);
			}			
		});
		
		
		///검색버튼 클릭 이벤트 검색박스 show()/////////////////////////////////////////////
		$('.searchBt').on({
			click:	function(){
					
					$('.search-form-wrap').show();
							
			}
		});
		
		///검색버튼 클릭 이벤트 검색박스 show()/////////////////////////////////////////////
		$('.msearchBt').on({
			click:	function(){
					
					$('.search-form-wrap').show();
							
			}
		});
		
		
		//검색박스 닫기버튼 클릭 이벤트 hide()
		$('.searchCloseBt').on({
			click:	function(){
				$('.search-form-wrap').hide();
			}
		});
	
	
		//1.폼 전송 서버에게 정보검색 요청
		//검색박스내에서 입력상자 검색버튼 클릭 이벤트( 폼전송 ) searchForm.submit()
		$('.searchFormBt').on({
			click:	function(){

				if( $('#searchText').val() != '' ){
					searchForm.submit(); 
				}
				else{
					return false;
				}
				
			}
		});
		
		
		/*
		쿼리스트링(Query String)
		//file:///D:/%EC%9B%B9%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%85%94(%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8)UIUX%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EC%96%91%EC%84%B1%EA%B3%BC%EC%A0%95/%ED%9B%88%EB%A0%A8%EC%83%9D%EC%82%B0%EC%B6%9C%EB%AC%BC/%EA%B5%90%EC%82%AC%EB%AC%B8%EC%84%A0%EC%A2%85/20200305-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%8E%EA%B8%B0%EC%B4%88%EB%8E%85%ED%84%B0%20%EC%88%98%EC%A7%91%20%EB%B0%8F%20%EC%8A%A4%EC%BC%80%EC%B9%98-NOTs/search/index.html?searchText=cream
		*/
	
	
	
})(jQuery, window, document);
//header.js