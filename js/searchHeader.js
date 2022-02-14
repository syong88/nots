jQuery(function(){
	
		//스크롤이벤트 - 스크롤탑값이 창높이에 닿으면 헤더 ROW1 ROW2상단 고정
		$(window).scroll(function(){
			if( $(this).scrollTop() >= 46 ){
				$('#header').addClass('addFixed');
			}
			else{
				$('#header').removeClass('addFixed');
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
	
	
});
//header.js