	
	//YouTube loading
	youtubeOnloadFn();
	function youtubeOnloadFn(){
		if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vfl_QvS8o/www-widgetapi.js';a.async = true;var c = document.currentScript;if (c) {var n = c.nonce || c.getAttribute('nonce');if (n) {a.setAttribute('nonce', n);}}var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}
	}
	
	
	//YouTube 메인 함수 실행	
	window.onload = function(){	
		youtubeObj();	
	}

		function youtubeObj(){

			var videos = $('.youtubeWrap');
			for(var i=0; i < videos.length; i++){
			var player;
			var youtube = videos[i];
			var geturl = $('.youtubeWrap').attr("data-url")
				$('.youtubeWrap iframe').attr("src",
					  "https://www.youtube.com/embed/" + geturl
					+ "?&enablejsapi=1&html5-1");
				$('.youtubeWrap iframe').attr('frameborder', 0);
				youtube.onPlayerReady = function(event){
					event.target.mute();
				}
				player = new YT.Player(youtube, {
					 playerVars: {
						'width' : '100%',
						'height' : '100%',
						'autoplay' : 1,
						'controls' : 0,
						'autohide' : 1,
						'wmode': 'opaque',
						'showinfo' : 0,
						'loop' : 1,
						'mute' : 0,
						'rel' : 0,
						'playlist' : geturl
					},
					videoId: geturl,
					events: {
						  'onReady': youtube.onPlayerReady
					}
				});
				
			}
			
			t=0;
			//button 제어  /////////////////////////////////
			$('.ytCap').on({
				click:	function(){
					//player.playVideo();//재생
					//player.stopVideo();//정지
					if(t==0){	
						//player.stopVideo(); //일시정지->처음부터시작 
						player.pauseVideo();  //일시정지->currentTime부터 시작
						t=1;
					}
					else{
						player.playVideo();//재생
						t=0;
					}
				}
			});
			
		} //youtubeObj() 메인함수 끝


		var winW = $(window).innerWidth();
		
		setInterval(vidoeResizeFn,100);
		//비디오박스 높이 비율 = window.innerWidth()* 0.56271777
		//비디오 높이 비율 	= window.innerWidth()* 0.56271777
		$(window).resize(function(){
			vidoeResizeFn();
		});
		
	function vidoeResizeFn(){
		
		winW = $(window).innerWidth();
		
		if( winW >= 1903 ){
			winW=1903;
		}
		else{
			winW = $(window).innerWidth(); //1903미만일때는 반응형 창너비로 해라
		}
		$('.youtubeWrap').css({height:winW*0.562391178}); 
		$('.section>div').css({height:winW*0.562391178, marginTop:-(winW*0.562391178)*0.079529796});

		
	}	
		
		
		
		
		
		
		
		
		
		
		
		