var myPlayer = false;
var videoData = false;
var videoPath = false;
var isMobile =  false;
var videoType = false;
var isVideoBannerExecuted = false;
var divContainerTransparent = false;
var nextVideoCount = 1;
var isEnded = false;


$(document).ready(function(){
	 myPlayer = videojs('videoObj');
	 myPlayer.on("mousemove", function () {

      var objectBar = jQuery('.horizontal-bar');
      var objectBarBack = jQuery('.horizontal-back');
      if (isEnded) {
        isEnded = false;
        jQuery(objectBar).fadeIn(1000, function () {
          setTimeout(function () {
            jQuery(objectBar).fadeOut(1000, function () {
              //setTimeout(function(){isEnded = true;console.log('finito')},1500);
              isEnded = true;
            });
          }, 4000);
        });
        jQuery(objectBarBack).fadeIn(1000, function () {
          setTimeout(function () {
            jQuery(objectBarBack).fadeOut(1000, function () {
              //setTimeout(function(){isEnded = true;console.log('finito')},1500);
              isEnded = true;
            });
          }, 4000);
        });
      }
    });

    // nella visualizzazione mobile fullscreen nasconde il bottone centrale play
    myPlayer.on("fullscreenchange", function (event) {

      var fullscreenOrNot = videojs('videoObj').isFullscreen();
      if (fullscreenOrNot) {
        jQuery('.horizontal-bar').hide();
        jQuery('.horizontal').removeClass('horizontal-bar');
      } else {
        jQuery('.horizontal').addClass('horizontal-bar');
      }
    });
	
	
	        myPlayer.on("ended", function (e) {

            if(videoType == "adv" && !isVideoBannerExecuted) {
                setVideoSource(videoData);
                myPlayer.controls(true);
                isVideoBannerExecuted = true;
                play();
				console.log("adv")
            }else {
				console.log(hasAdv.isAdv)
				
					if(hasAdv.isAdv)
					{
					//	console.log("ADV-TRUE")
					//	console.log(hasAdv.originalSource)
					
						//initialize( videoData, false );
						if( iOS){            
							//$('#videoObj').prepend('<video id="videoObj" x-webkit-airplay="allow" class="video-js vjs-default-skin vjs-big-play-centered" controls data-setup="{}"></video>');
							$('video').html('<source src="'+ hasAdv.originalSource +'"  type="application/x-mpegURL" >');
						}
						else if(isEdge())
						{
							console.log("EDGE")
							myPlayer.src({"type":"application/x-mpegURL", "src":hasAdv.originalSource});
						}
						else if(isAndroid){
							$('video').html('<source src="'+ hasAdv.originalSource +'"  type="application/x-mpegURL" >');
						}
						else{
					
						// source = new shaka.player.DashVideoSource(connectStrvalue, null, estimator);
							player.load(hasAdv.originalSource);
					
						}
						$('#video_adv_link,#advTooltip').remove();
						$('.vjs-control-bar').show();
						 initialize( videoData, false );
						 
						hasAdv.isAdv = false;
						//nextVideoCount--;
						return false;
					}
					
					else{		
								select_video(nextVideoCount, false );	
									//console.log(videoData)
									/* if(nextVideoCount<= videoLoopMax)
									{
										
										console.log(nextVideoCount)
										select_video(nextVideoCount, false );
										nextVideoCount++;
									}
									else
									{
										console.log("zero")
										nextVideoCount = 0;
										select_video(nextVideoCount, false );
									} */
					
								//  deferred.resolve();
						}	
				   }
		//	myPlayer.removeEventListener('ended'); 
            //deferred.resolve();
        });
	
	
});



  function initialize(videoData,isMobile) {
    

    divContainerTransparent = getDivContainerTransparent();

    videoData = videoData;
    isMobile = isMobile;

    //alert(videoData);
  /*****************************************
   *
   * Init Configuration
   *
   *****************************************/

   //delete old buttons
   $('.button-background-h').remove();

    //flag che verifica l'avvenuta esecuzione del video banner legato ad un video
    isVideoBannerExecuted = false;

    //Oggetto con i dati recuperati da backend
    videoData = videoData;

    //flag utilizzato per la renderizzazione mobile
    isMobile = isMobile;

    //recupera il path del video da visualizzare

    videoPath = getPathVideo(videoData);

    //flag utilizzato per abilitare\disabilitare le faccine
    var buttonBarState = "on";

    videoType = "sou";

    //nasconde/visualizza i controlli (play,pause...) del player
    if (isMobile) {
      myPlayer.controls(false);
    } else {
      myPlayer.controls(true);
    }
    //abilita l'autoplay del player
    myPlayer.autoplay(true);
    //esprime le dimensioni del player in percentuale
    myPlayer.fluid(false);

    myPlayer.preload("auto");

    //nella visualizzazione mobile hide/show la barra con le faccine
    isEnded = true;
    var eventType = 'mouseover';
    if (isMobile) {
      eventType = 'click';
    }

   

    //Nei tablet/phone mostra il big play button
    if (isMobile) {
      var playBT = jQuery(".vjs-big-play-button");
      if (myPlayer.player_.paused()) {
        playBT.show();
      } else {
        playBT.hide();
      }
    }

    //button bar Component
    divContainerTransparent = getDivContainerTransparent();

    var barContainer = null;

    if (isMobile) {

      //Costruisce un nuovo layer dove aggiungere le faccine
      var concrateHorizontalButtonBar = getHorizontalTegmeBar();
      barContainer = concrateHorizontalButtonBar;

    }else{

      //Fornisce come layer per aggiungere le faccine direttamente la controlbar presente sul video player
      barContainer = myPlayer.controlBar;
    }



        //creazione bottoni faccine
        bEnbeded = customDivButton(myPlayer, barContainer, 'vjs-enbeded');
        b1 = customDivButton(myPlayer, barContainer, "vjs-button1");
        b2 = customDivButton(myPlayer, barContainer, "vjs-button2");
        b3 = customDivButton(myPlayer, barContainer, "vjs-button3");
        b4 = customDivButton(myPlayer, barContainer, "vjs-button4");
        b5 = customDivButton(myPlayer, barContainer, "vjs-button5");
        b6 = customDivButton(myPlayer, barContainer, "vjs-button6");
        b7 = customDivButton(myPlayer, barContainer, "vjs-button7");
        bblank = customDivButton(myPlayer, barContainer, 'vjs-button-blank');
        b8 = customDivButton(myPlayer, barContainer, 'vjs-button-star');
        b8.addClass("pull-right");
        b8.addClass("margin-rigth-5");
		$('#video-wrap-new').append('<div id="advTooltip" style="display:none;position:absolute;padding:10px;background:#fff;display:none;border-radius:5px;border:2px solid  #70ad47;font-size:20px;color:#70ad47;bottom:60px;right:0px;">buy advertising space for this video !</div>');
        //end creazione bottoni faccine
        
        embed( videoData );

        //gestione eventi bottoni faccine
        bEnbeded.on('click', function () {
            jQuery(".embed-container").toggle();
        });

        b1.on('click', function () {
            if(buttonBarState == 'on') {
                votaRating( videoData.idStreamSource, "http://www.tegme.tv/api/tegvalue", 10);//?
                disableButtonBar();
            }
        });

        b2.on('click', function () {
            if(buttonBarState == 'on') {
                votaRating(videoData.idStreamSource, "http://www.tegme.tv/api/tegvalue", 20);//?
                disableButtonBar();
            }
        });

        b3.on('click', function () {
            if(buttonBarState == 'on') {
                votaRating(videoData.idStreamSource, "http://www.tegme.tv/api/tegvalue", 30);//?
                disableButtonBar();
            }
        });

        b4.on('click', function () {
            if(buttonBarState == 'on') {
                votaRating(videoData.idStreamSource, "http://www.tegme.tv/api/tegvalue", 40);//?
                disableButtonBar();
            }
        });

        b5.on('click', function () {
            if(buttonBarState == 'on') {
                votaRating(videoData.idStreamSource, "http://www.tegme.tv/api/tegvalue", 50);//?
                disableButtonBar();
            }
        });

        b6.on('click', function () {//block
            if(buttonBarState == 'on') {
                updateView(videoData.idStreamSource, "http://www.tegme.tv/api/ViewUpdate", "blo");
                disableButtonBar();
            }
        });

        b7.on('click', function () {
            if(buttonBarState == 'on') {
                votaRating(videoData.idStreamSource, "http://www.tegme.tv/api/tegvalue", 60);//?
                disableButtonBar();
            }
        });

        b8.on('click', function () {
            var urlStar = "https://admin.tegme.tv/wizard/purchaseadv.aspx"+"?idsource="+videoData.idStreamSource;
            window.open(urlStar);
        }).on("mouseover",function(e){e.stopPropagation();$("#advTooltip").fadeIn();}).on("mouseout",function(e){e.stopPropagation();$("#advTooltip").fadeOut();});

    myPlayer.on('loadeddata', function () {

        jQuery(".video-container").removeClass("pre-load");
        jQuery("#videoObj").removeClass("hide");

    });

    // add logo to video
    logo_img = videoData.logostream;
    $('.logo-img').remove();
    $('#videoObj').prepend("<img class='logo-img' src='"+ logo_img +"'>");
    
    playVideo( videoData );

    //Iphone buttons
    if( isIphone ){

      $('#videoObj').css({ 'width': '100%', 'height' : '100%' });
      
      var iphone_buttons_interval_count = 0;
      var iphone_buttons_interval = setInterval( function(){

        $('.vjs-control-bar > button').each(function(){
          $(this).remove();
        });

        $('.vjs-control-bar > div').each(function(){
          
          if( $(this).attr('class').split(' ')[0] != 'button-background-h' ){
            $(this).remove();
          }else{
            $(this).attr( 'style', 'width:5px!important;float:left;' );
          }

        });
        $('.vjs-button-star').css({'left' : '35px', 'bottom' : '0', 'background-color' : 'transparent!important', 'float': 'left', 'border-radius': '10px' });
        $('.vjs-using-native-controls .vjs-control-bar').attr( 'style', 'display:block!important;padding-left:83px!important;background:none!important' );
        
      
        iphone_buttons_interval_count ++;
        if( iphone_buttons_interval_count > 1 ){
          clearInterval( iphone_buttons_interval );
        }
      }, 1000 );
    }
    //end Iphone buttons

  }

  
  
  
  
  
  
  
  function getButtonBar() {

        var vjsComponentButtonBar = videojs.getComponent('Component');
        var ButtonBar = videojs.extend(vjsComponentButtonBar, {
            constructor: function (player, options) {
                vjsComponentButtonBar.call(this, myPlayer, options);
            }
        });

        var obj = new ButtonBar();
        return obj;

  }

  function getDivContainerTransparent() {

       /**
        * Crea un contenitore che si posiziona in modo assoluto sul player.
        * Questo container intermedio è un trick che permette alla controlbar, in modalità mobile,
        * di far funzionare correttamente gli eventi click delle faccine.
        * */

        var vjsComponent = getButtonBar();
        var divContainerTrasparent = myPlayer.addChild(vjsComponent);
        var player = myPlayer;

        divContainerTrasparent.addClass("div-container-trasparent");
        divContainerTrasparent.on('click', function () {
            if (!isMobile) {
                if (player.paused()) {
                    player.play();
                } else {
                    player.pause();
                }
            }
        });

        return divContainerTrasparent;

  } 

  function getHorizontalTegmeBar() {

       /**
        * Questa funzione crea il container dove verranno aggiunti i diversi bottoni (faccine).
        * */

        var vjsComponent = getButtonBar();
        var concrateHorizontalBackButtonBar = divContainerTransparent.addChild(vjsComponent);
        concrateHorizontalBackButtonBar.addClass("horizontal-back");

        var concrateHorizontalButtonBar = divContainerTransparent.addChild(vjsComponent);
        concrateHorizontalButtonBar.addClass("horizontal");
        concrateHorizontalButtonBar.addClass("horizontal-bar");
        concrateHorizontalButtonBar.addClass("cursor-pointer");

        return concrateHorizontalButtonBar;

  }

  function playVideo( videoData ){
//alert('playVideo');
//alert(videoData);
        /**
         *
         * Questa funzione ha il compito di avviare il video del player,
         * occupandosi di eseguire il video banner se presente.
         * Inoltre grazie ad un sistema di notifica (promise) avvisa il chiamante della fine del video.
         *
         * */

        var deferred = jQuery.Deferred();
        var currentVideo = videoData;
        enabledButtonBar();
        jQuery('.logo-container').remove();

        //aggiorna le visite
        updateView(currentVideo.idStreamSource,"http://www.tegme.tv/api/ViewUpdate", 'sou');

        if(isAndroid || iOS || isEdge() ){
          play();
          return false;
        }
        
        if(!isMobile) {
            myPlayer.controls(true);
        }

        if(currentVideo != null && currentVideo.hasadv) {
         //alert('hasadv');

            if(currentVideo.tipoadv == 'b') {
                
                //aggiorna le visite
                updateView(currentVideo.idadvsource,"http://www.tegme.tv/api/ViewUpdate",'adv');
                setVideoSource(videoData);
            }

            if(!isVideoBannerExecuted){
                if (currentVideo.tipoadv == 'v') {

                    
                    myPlayer.controls(true);
                    //aggiorna le visite
                    updateView(currentVideo.idadvsource,"http://www.tegme.tv/api/ViewUpdate",'adv');
                    setVideoSource(videoData);
                }
            }

        }else{          
            setVideoSource(videoData);
            isVideoBannerExecuted = false;
            jQuery('.banner-container').remove();
        }

        


    //    play();
        isVideoBannerExecuted = false;
        /*return deferred.promise();*/
        return deferred;

  }

  function disableButtonBar() {
        /**
         * Questa funzione disabilita i bottoni (faccine)
         * */
        buttonBarState = "off";
        b1.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button1').addClass('vjs-button1-disabled');
        b2.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button2').addClass('vjs-button2-disabled');
        b3.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button3').addClass('vjs-button3-disabled');
        b4.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button4').addClass('vjs-button4-disabled');
        b5.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button5').addClass('vjs-button5-disabled');
        b6.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button6').addClass('vjs-button6-disabled');
        b7.removeClass("cursor-pointer").addClass('cursor-auto').removeClass('vjs-button7').addClass('vjs-button7-disabled');

   }

   function enabledButtonBar() {
        /**
         * Questa funzione abilita i bottoni (faccine)
         * */
        buttonBarState = "on";
        b1.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button1').removeClass('vjs-button1-disabled');
        b3.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button3').removeClass('vjs-button3-disabled');
        b4.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button4').removeClass('vjs-button4-disabled');
        b5.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button5').removeClass('vjs-button5-disabled');
        b6.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button6').removeClass('vjs-button6-disabled');
        b7.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button7').removeClass('vjs-button7-disabled');
        b2.addClass("cursor-pointer").removeClass('cursor-auto').addClass('vjs-button2').removeClass('vjs-button2-disabled');

  }

    function customDivButton(myPlayer, container, classButtonImage) {


    /**
     * Questa funzione ha il compito di creare il contenitore dei bottoni (faccine)
     * */

    var componentDiv = videojs.getComponent('Component');
    var concreteComponentDiv = videojs.extend(componentDiv, {
      constructor: function () {
        componentDiv.call(this, myPlayer);
      }
    });

    var divButton = new concreteComponentDiv();    

    if (isMobile) {
      divButton.addClass("col-xs-1");
      divButton.addClass("col-sm-1");
      divButton.addClass("col-md-1");
      divButton.addClass("col-lg-1");
    }

    divButton.addClass('button-background-h');
    divButton.addClass(classButtonImage);
    container.addChild(divButton);

    return divButton;

  }

  function setVideoSource(videoData){

    //alert('setvideosource');
    //alert(videoData);
    /**
     * Questa funzione fornisce al player il path del video da eseguire
     * */
    if(videoData != null) {

      if(iOS || isAndroid || isEdge() ){

        videoType = "application/x-mpegURL";
        var videoSrc = getPathVideo(videoData); // + videoData.urlStreamSource;
        //alert(videoSrc);
        myPlayer.src({type: videoType, src: videoSrc});
        videoType = "sou";

      }else{

        videoType = "video/mp4";
        var videoSrc = getPathVideo(videoData); // + videoData.urlStreamSource;
        //alert(videoSrc);
       // myPlayer.src({type: videoType, src: videoSrc}); // commented for do not loanding video two times
        videoType = "sou";

      }
    }

  } 


  function play(){

    /**
     * Avvia il player
     * */
     //alert('play');
     
     if(iOS || isAndroid || isEdge() || isFirefox ){
      myPlayer.play();
     }

  }

  function setVideoData(videoData){
      /**
       * Questa funzione rende disponibile all'intera classe l'istanza con i dati recuperati da backend
       * */

      videoData = videoData;

  }

  function embed( videoData ){

    /**
     * Questa funzione gestisce la creazione dell'embed, occupandosi di creare una input box contenente il path dell'embed
     * */
    var vjsComponentButtonBar = videojs.getComponent('Component');
    videojs.EmbedOverlayInput = videojs.extend(vjsComponentButtonBar, {
      constructor: function(player, options) {
        vjsComponentButtonBar.call(this, player, options);
      }
    });

    videojs.EmbedOverlayInput.prototype.setSrc = function() {
      this.el().value = '<iframe src="' + embed_page_url + '?idvideo=' + videoData.idStreamSource + '" width="100%" height="720" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" ></iframe>';
    };

    videojs.EmbedOverlay = videojs.extend(vjsComponentButtonBar, {
      constructor: function(player, options) {
        vjsComponentButtonBar.call(this, player, options);

        this.input = new videojs.EmbedOverlayInput(player, {
         // location: options.location,
          el: vjsComponentButtonBar.prototype.createEl('input', {
            className: 'vjs-embedoverlay-input'
          },{
            type: 'text'
          })
        });

        //this.hide();
        this.addClass("embed-container");
        player.addChild(this);
        this.el().appendChild(this.input.el());
        this.input.setSrc();
      }
    });

    myPlayer.addChild(new videojs.EmbedOverlay(myPlayer,""));
    return videojs.EmbedOverlay;

  }

  function getPathVideo(videoData) {
//alert( 'getPathVideo' ); 
//alert(videoData);
    /**
     * Questa funzione centralizza la gestione del path del video
     * */
    Costanti_videoPath = "http://www.tegme.tv/public/channels/#/media/";
    var videoPtah = Costanti_videoPath.replace(/#/g, videoData.ChannelId);
    if( isAndroid ){
      return videoData.urlStreamSourceHls;
    }else if( iOS || isEdge() ){
      return videoData.urlStreamSourceHls;
    }else{
      return videoData.urlStreamSourceDash;
    }

  }