;(function($, window, document, undefined){
	
	var winW = $(window).innerWidth();
	var s3cnt = [];
	var s3mov = [];
	var wrapW = []; //반응형되어야함, slide wrap너비
	var cols = 3;
	var slidW = 0; //반응형되어야함, li 이미지한개 너비
	var z = 0;  //슬라이드 번호 전달(매개변수 사용안하는 경우) 
	var s3pag = ['.s3s0PageBt','.s3s1PageBt','.s3s2PageBt'];
	var n = []; //슬라이드0,1,2 각각 슬라이드이미지orli 총 갯수
	var sEnd = [];
	var dTime = 600;
	
	sec3SlideResizeFn();
	//setTimeout(sec3SlideResizeFn,100);
	
	$(window).resize(function(){
		sec3SlideResizeFn();
	});
	
	function sec3SlideResizeFn(){
		winW = $(window).innerWidth();
		s3mov[0]=[];
		s3mov[1]=[];
		s3mov[2]=[];
		
		//칸수변수: cols 3 2 1
		if( winW > 760 ){
			cols=3;
			s3mov[0] = [3,3]; //6개 3개씩이동 2번 칸별로 3,3
			s3mov[1] = [3,2]; //5개 3개씩이동 2번 칸별로 3,2
			s3mov[2] = [0,0]; //3개 3개씩이동 0번 칸별로 0,0
			
			
			s3cnt = [0,0,0]; //초기화
		}
		else if( winW > 480 ){
			cols=2;
			s3mov[0] = [2,  2,  2]; //6개 2개씩이동 3번 칸별로 
			s3mov[1] = [2,  2,1.5]; //5개 2개씩이동 3번 칸별로 
			s3mov[2] = [2,1,  0]; //3개 2개씩이동 1번 칸별로 
			
			s3cnt = [0,0,0];
		}
		else{
			cols=1;
			s3mov[0] = [1,1,1,1,1,1]; //6개 1개씩이동 6번(0~5)
			s3mov[1] = [1,1,1,1,1,0]; //5개 1개씩이동 5번(0~4) 
			s3mov[2] = [1,1,1,0,0,0]; //3개 1개씩이동 3번(0~2) 
			
			s3cnt = [0,0,0];
		}
		
		if( winW >= 1110 ){//평상시
			slidW = 1110/cols;
		}
		else{
			slidW = winW/cols;
		}
		for( i=0; i<3; i++ ){
			n[i] = $('.section3-slide-wrap').eq(i).find('li').length;
			sEnd[i] = Math.ceil(n[i] / cols)-1;
			wrapW[i] = slidW * n[i];
			$('.section3-slide-wrap').eq(i).css({width:wrapW[i]});
		}
		
		
		// n[0] = $('.section3-slide-wrap').eq(0).find('li').length;
		// n[1] = $('.section3-slide-wrap').eq(1).find('li').length;
		// n[2] = $('.section3-slide-wrap').eq(2).find('li').length;

		// sEnd[0] = Math.ceil(n[0] / cols)-1; //자리올림 (6/3)=2-1=1 0,1
		// sEnd[1] = Math.ceil(n[1] / cols)-1; //자리올림:Math.ceil()<->자리내림:Math.floor()
		// sEnd[2] = Math.ceil(n[2] / cols)-1; //반올림 : Math.round()
		
		// wrapW[0] = slidW * n[0]; //6
		// wrapW[1] = slidW * n[1]; //5
		// wrapW[2] = slidW * n[2]; //3

		//슬라이드wrap 너비
		// $('.section3-slide-wrap').eq(0).css({width:wrapW[0]});
		// $('.section3-slide-wrap').eq(1).css({width:wrapW[1]});
		// $('.section3-slide-wrap').eq(2).css({width:wrapW[2]});
		//슬라이드 li 너비 = 이미지너비
		//$('.section3-slide-wrap').eq(0).find('i').css({width:slidW});
		$('.section3-slide-wrap>li').css({width: slidW });
		
		s3mainSlide(); //Realtime 빼먹고 프로그램짜면 착오생김
		
	}
	
	//탭메뉴 버튼 클릭해서 
	//해당 슬라이드 보이기	
	$('.sec3TabBt').each(function(idx){
		$(this).on({
			click:	function(){
				s3cnt = [0,0,0];
				z = idx; //슬라이드번호 리턴값 
				
				$('.sec3TabBt').removeClass('addS3TabDeco');
				$(this).addClass('addS3TabDeco');
				
				$('.section3-slide-container').removeClass('addSlide');
				$('.section3-slide-container').eq(idx).addClass('addSlide');
			}
		});
	});
	
	//터치스와이프 이벤트
	$('.section3-slide-view').swipe({
		swipeLeft:	function(){
			s3NextFn();
		},
		swipeRight:	function(){
			s3PrevFn();
		}
	
	});
	
	
	//다음 슬라이드 버튼 클릭이벤트, 탭메뉴 버튼에서 슬라이드그룹 결정 z
	$('.s3NextBt').on({
		click:	function(){
			s3NextFn();
		}
	});	
		
	//이전 슬라이드 버튼 클릭이벤트, 탭메뉴 버튼에서 슬라이드그룹 결정 z
	$('.s3PrevBt').on({
		click:	function(){
			s3PrevFn();
		}
	});	
		
	//다음 슬라이드 카운트 함수
	function s3NextFn(){
		s3cnt[z]++;

			if( s3cnt[z] > sEnd[z] ){ // 6/3=2(칸)
				s3cnt[z]=sEnd[z];
			}
		
		s3mainSlide();
	}	
	
	//이전 슬라이드 카운트 함수
	function s3PrevFn(){
		s3cnt[z]--;
		if( s3cnt[z] < 0 ){
			s3cnt[z]=0;
		}
		s3mainSlide();
	}	
	
	//페이지네이션
	function pageNationFn(){
		/// .s3s0PageBt .s3s1PageBt .s3s2PageBt                             
		$('.s3s'+z+'PageBt').removeClass('addPageEffect');
		$('.s3s'+z+'PageBt').eq(s3cnt[z]).addClass('addPageEffect');
		
		// s3pag = ['.s3s0PageBt','.s3s1PageBt','.s3s2PageBt'];
		// $( s3pag[z] ).removeClass('addPageEffect');
		// $( s3pag[z] ).eq(s3cnt[z]).addClass('addPageEffect');
	}
	
	//섹션3 슬라이드0 페이지버튼0 클릭이벤트
	$('.s3s0PageBt').each(function(index){
		$(this).on({
			click:	function(){
				z=0; //첫번째 슬라이드
				s3cnt[z]=index; //먼저 변수값정의되고
				s3mainSlide(); //함수호출하면됨
			}
		});
	});
	//섹션3 슬라이드1 페이지버튼1 클릭이벤트
	$('.s3s1PageBt').each(function(index){
		$(this).on({
			click:	function(){
				z=1; //두번째 슬라이드
				s3cnt[z]=index;
				s3mainSlide(); 
			}
		});
	});
	//섹션3 슬라이드2 페이지버튼2 클릭이벤트
	$('.s3s2PageBt').each(function(index){
		$(this).on({
			click:	function(){
				z=2; //세번째 슬라이드
				s3cnt[z]=index;
				s3mainSlide(); 
			}
		});
	});
	
	//슬라이드 콘테이너0 메인함수
	function s3mainSlide(){
		pageNationFn();
			// if(s3cnt[1]>=2){ //슬라이드 그룹1:두번째그룹 2개씩이동하다가 2번째
				// s3mov[1]=1;  //이동할 이미지 갯수 1개로 수정
				// sEnd[1]=3;
			// }
																		  //줄번호,  칸번호				
		$('.section3-slide-wrap').eq(z).stop().animate({left: -(( slidW * s3mov[z][s3cnt[z]] ) * s3cnt[z] )}, dTime, 'swing'); 
											
	}																	
	
})(jQuery, window, document);
//sec3-mainSlide.js









