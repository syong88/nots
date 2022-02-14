;(function($, window, document, undefined){
	var cookieValue = '';
	
		//4.쿠키가져오기그리고 비교
		var getCookieFn = function( name ){
			var f = 0;  //found 
			var s = 0;  //start
			var e = 0;  //end
			var n = document.cookie.length; 
				
				for(i=0; i<n; i++){
					s = i;
					e = s + name.length;
					if( document.cookie.slice(s,e) == name ){
						f = 1;
						break;
					}
				}

				if( f==1 ){
					s = e + 1; //11+1 '=' 문자 12
					e = document.cookie.indexOf(';', s); //인덱스 -1, 15
					if( s > e ){ //쿠키가 1개인경우
						e = document.cookie.length;
						cookieValue = document.cookie.slice(s,e);
					}
					else{ //쿠키 2개 이상인경우
						cookieValue = document.cookie.slice(s,e);
					}
				}	
		}

		
		//3.쿠키설정 ////////////////////////////////////////
		var setCookieFn = function( name, value, expires ){
			var today = new Date();
				today.setTime( today.getTime() + (expires*24*60*60*1000) ); //날짜를 시간으로 계산
				document.cookie = name + '=' + value + ';path=/;expires=' + today.toUTCString + ';';			
		}
		
		
		//2.팝업창 닫기 ////////////////////////////////////////
		var popupCloseFn = function(){
			$('#popup').stop().hide();
			if(  $('#chkbox').prop('checked') === true  ){ //하루동안 열지 않음 체크 시
				//setCookieFn('popup0317-1','yes',1); 	   //쿠키설정값 보내기	
				//setCookieFn('popup0317-2','yes',1); 	   //쿠키설정값 보내기	
				setCookieFn('popup0317-3','yes',1); 	   //쿠키설정값 보내기	
			}
		}
		//닫기 클릭 이벤트
		$('.popupCloseBt').on({
			click:	function(){
				popupCloseFn();
			}
		});
		
		//1.팝업창 열기 ////////////////////////////////////////
		var popupOpenFn = function(){ //익명함수=리터럴함수
			// getCookieFn('popup0317-1');
			// getCookieFn('popup0317-2');
			getCookieFn('popup0317-3');
			if( cookieValue !='yes' ){
				if($(window).innerWidth()>1024){
					$('#popup').stop().show();
				}
			}
		}
		popupOpenFn();
	
	
})(jQuery, window, document);//cookiem.js