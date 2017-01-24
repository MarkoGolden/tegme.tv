<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">


	<!-- Google map -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKapVuH6bUK-IEwy2xG5qMRyVinxls-Vg"></script>
	
	<!-- Libraries -->
	<!-- DASH-AVC/265 reference implementation -->
	<%--<script src="<%= Page.ResolveUrl("~/dPlayer/js/shaka-player.js")%>"></script>
	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>--%>

	<!-- Video js css-->
<%--	<link href="<%= Page.ResolveUrl("~/dPlayer/node_modules/video.js/dist/video-js.css")%>" rel="stylesheet" />--%>
	<!-- end Video js -->
	<%--<link rel="stylesheet" href="dPlayer/css/style.css" >--%>
	<link href="<%= Page.ResolveUrl("~/dPlayer/css/style_of_player.css")%>" rel="stylesheet" type="text/css" media="screen, projection" />

	<link href="<%= Page.ResolveUrl("~/js/dist/video-js.min.css")%>" rel="stylesheet" type="text/css" media="screen, projection" />
	<script src='<%= Page.ResolveUrl("~/js/dPlayer/node_modules/video.js/dist/video.min.js")%>'></script>
	
	<link "<%= Page.ResolveUrl("~/js/dist/video-js.min.css")%>" rel="stylesheet" />
	
	<%--<link href="http://vjs.zencdn.net/5.11.8/video-js.css" rel="stylesheet" />

	<!-- If you'd like to support IE8 -->
	<script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
	<script src="http://vjs.zencdn.net/5.11.8/video.js"></script>--%>
	<script>

        function supports_media_source()
        {
            "use strict";
            var hasWebKit = (window.WebKitMediaSource !== null && window.WebKitMediaSource !== undefined),
                hasMediaSource = (window.MediaSource !== null && window.MediaSource !== undefined);
            return (hasWebKit || hasMediaSource);
        }
    </script>

    <style>

    	#buttons-wrap{
    		height:40px;
    	}
    	#buttons-wrap img{
    		margin:0!important;
    		padding:0!important;
    	}
    	.modal-content{
    		background: #70ad47;
		    width: 130px;
		    top: 70px;
    	}

		     #sectproducer{
         /*width:300px;
         height:300px;float:left;*/
         /*background-color: #AAFFCC;
         
         opacity:0.3;*/
		  /*background: rgba(255, 255, 255, 0.1);*/
		  background:rgba(0,0,0,0.6);
		  -khtml-opacity:.50; 
			-moz-opacity:.50; 
			-ms-filter:”alpha(opacity=50)”;
			 filter:alpha(opacity=50);
				filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0.5);
			/*opacity:.50;*/ 
	 }
.bordo{
border-color: #70ad47;
    border-style: solid;
    border-width: medium;
}

    </style>

    <script type="text/javascript" src="//platform.linkedin.com/in.js">
	    api_key: 784w5ubxzjccgp
	    authorize: true
	    onLoad: onLinkedInLoad
	</script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

	<header class="header nba-header">
		<div class="header_inner">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="header_wrap">
							<div class="header_wrap_inner">
								<div class="nav_wrap">
									<!---------------------navigation-------------------->
									<nav class="navbar">
										<div class="container-fluid">
											<!-- Brand and toggle get grouped for better mobile display -->
											<div class="navbar-header">
												<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
													<span class="sr-only">Toggle navigation</span>
													<span class="icon-bar"></span>
													<span class="icon-bar"></span>
													<span class="icon-bar"></span>
												</button>
												<a class="navbar-brand" href="#">
													<img runat="server" src="~/channels/img/logo.png" class="logo_nba" /></a>
											</div>

											<!-- Collect the nav links, forms, and other content for toggling -->
											<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
												<ul class="nav navbar-nav navbar-right tegme_menu">
													<li><a href="https://admin.tegme.tv/login.aspx">Login</a></li>
													<li><a href="http://www.tegme.tv/channels" >Tegme TV</a></li>
													<li><a href="#">About Us</a></li>
												</ul>
											</div>
											<!-- /.navbar-collapse -->
										</div>
										<!-- /.container-fluid -->
									</nav>
									<!---------------------navigation--------------------->
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>


	<section class="nba-profile">
		<div class="container">
			<div class="row">
				<div class="col-md-6 ">
					<div class="nba-details">
						<div class="nba-prof-img">
							<asp:Image ID="ImageLogo" runat="server" class="img-responsive" />
							<%--<img src="channels/img/nba.jpg" alt="">--%>
						</div>
						<div class="nba-prof-name">
							<div class="nba-social">
								<a class="fb-w" href="#">
									<img runat="server" src="~/channels/img/fb-white.png" alt="">
								</a>
								<a class="lk-w" href="#">
									<img runat="server" src="~/channels/img/lk-white.png" alt="">
								</a>
							</div>
							<p class="nba-name"><a href="#">
								<asp:Literal ID="LiteralChannelNameHead" Text="" runat="server"></asp:Literal></a></p>
							<p class="nba-followers"><a href="#">
								<asp:Literal ID="LiteralFollowe" runat="server"></asp:Literal>
								followers</a></p>
						</div>
					</div>
				</div>
				<div class="col-md-6 text-right nba-details_follow">
					<%--<a href="#" class="centric-follow-btn" data-toggle="modal" data-target="#myModal">follow us</a>--%>
					<a href="#" class="nba-follow" data-toggle="modal" data-target="#myModal" >Follow Us</a>
				</div>
				<!-- Modal -->
				<div id="myModal" class="modal fade" role="dialog">
					<div class="modal-dialog">

						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title">Follow us</h4>
							</div>
							<div class="modal-body">
								<div id="buttons-wrap" style="width: 100px; padding: 10px 12px;">
									<div onclick='follow("facebook")' style='float: left; cursor: pointer; width: 18px;'>
										<img src='http://www.tegme.tv/images/facebook-icon.png' style='width: 100%' />
									</div>
									<div onclick='follow("linkedin")' style='float: right; cursor: pointer; width: 30px;'>
										<img src='http://www.tegme.tv/images/linkedin-icon.png' style='width: 100%' />
									</div>
								</div>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
	</section>


	<%--<header>
		<div class="top-header">
			<div class="container-fluid">

				<div class="stegme-logo">
					<a href="http://www.tegme.tv/channels">
						<img class="img-responsive" src="<%= Page.ResolveUrl("~/images/stagme-logo.png")%>" />
						<%--<asp:Image ID="imglogo" runat="server" ImageUrl="<%= Page.ResolveUrl("~/images/stagme-logo.png")%>" CssClass="img-responsive" />
						</a>
				</div>

				<div class="top-right-link">
					<ul>
						<li><a href="https://admin.tegme.tv/registration.aspx">Become a Producer !</a></li>
						<li><a href="https://admin.tegme.tv/login.aspx?dash=1">Dashboard</a></li>
					</ul>
				</div>


			</div>
		</div>
		<div class="sec-header">
			<div class="container-fluid">
				<div class="centric-logo-cvr">
					<asp:Image ID="ImageLogo" runat="server" class="img-responsive"  />
					


					<div class="centric-follow-cvr">
						<h1>
							<asp:Literal ID="LiteralChannelNameHead" Text="" runat="server"></asp:Literal></h1>
						<a href="#" class="centric-follow-btn" data-toggle="modal" data-target="#myModal" >follow us</a>
						<p>
							<asp:Literal ID="LiteralFollowe" runat="server"></asp:Literal> followers</p>

						<%-- Social follow buttons 
						<!-- Modal -->
						<div id="myModal" class="modal fade" role="dialog">
						  <div class="modal-dialog">

						    <!-- Modal content-->
						    <div class="modal-content">
						      <div class="modal-header">
						        <button type="button" class="close" data-dismiss="modal">&times;</button>
						        <h4 class="modal-title">Follow us</h4>
						      </div>
						      <div class="modal-body">
						        <div id="buttons-wrap" style="width:100px;padding:10px 12px;">
									<div onclick='follow("facebook")' style='float:left;cursor:pointer;width:18px;'>
										<img src='http://new.tegme.tv/images/facebook-icon.png' style='width:100%' />
									</div>
									<div onclick='follow("linkedin")' style='float:right;cursor:pointer;width:30px;'>
										<img src='http://new.tegme.tv/images/linkedin-icon.png' style='width:100%' />
									</div>
								</div>
						      </div>
						     
						    </div>

						  </div>
						</div>
						<%-- end Social follow buttons

					</div>
				</div>

				<div class="right-user-cvr">
					<div class="user-icon" style="max-width:75px;">
						<asp:Image ID="ImageProducer" runat="server" class="img-responsive"  />
						<%--<img src="images/user-img.png" class="img-responsive" />
					</div>
					<div class="user-info">
						<h1>
							<asp:Literal ID="LiteralProducerName" Text="" runat="server"></asp:Literal></h1>
						<p></p>
						<ul class="top-socail">
							<li><a href="#" id="hreffacebookprofile" runat="server" target="_blank">
								<img src='<%= Page.ResolveUrl("~/images/facebook-icon.png") %>' class="img-responsive" /></a></li>
						<%--	<li><a href="#" id="hreftwitterprofile" runat="server" target="_blank">
								<img src="images/twitter-icon.png" class="img-responsive" /></a></li>
							<li><a href="#" id="hreflinkedinprofile" runat="server" target="_blank">
								<img src='<%= Page.ResolveUrl("~/images/linkedin-icon.png") %>' class="img-responsive" /></a></li>
						</ul>
					</div>
				</div>

			</div>
		</div>
	</header>--%>

	<!-- START VIDEO ZONE -->

	<div class="main-wrapper">

		<div id="video-wrap-new" class="video-container">
			<!-- Video JS video -->
			<video id="videoObj" x-webkit-airplay="allow" class="video-js vjs-default-skin vjs-big-play-centered" controls data-setup="{}"></video>
			<!-- end Video JS video -->
		</div>

	</div>

	<section class="video-data">
		<div class="container">
			<div class="row">
				<div class="col-md-2 col-xs-2">
					<div class="nba-views">
						<p><i class="fa fa-eye"></i>0</p>
					</div>
				</div>
				<div class="col-md-7 col-xs-7">
					<div class="nba-video-name text-center">
						<p></p>
					</div>
				</div>
				<div class="col-md-3 col-xs-3">
					<div class="nba-video-follow text-right">
						<a href="#" onclick="publish()">
							<img runat="server" src="~/channels/img/fb.png" alt="" /></a>
						
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- END VIDEO ZONE -->


	<section class="channels-list"  id="next-video">
		
	</section>
	<section class="search_section">
		<div class="container search_section_container">
			<div class="table">
				<div class="table_cell">
					<h2>Find Your Videos</h2>
					<div class="search"><span><i class="fa fa-search" aria-hidden="true"></i>
						<input type="text" placeholder="Search channel" /></span></div>
				</div>
			</div>
		</div>
	</section>

<div id="map" style="width: 100%; height: 600px;"></div>
	<div class="page-content-wrap">

		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-default">

					<!-- START GOOGLE WORLD MAP -->
					<div class="panel-body panel-body-map">
						
					</div>
				</div>

			</div>
		</div>

	</div>

	<section  class="nba-producer" >
				<%--<div style="background-image: url(images/producer-img.jpg); width: 100%; height: 100%; "></div>--%>
		<div class="container" >

			<div class="row">
				<div class="col-md-9">
					<h2 class="title"><span></span>
						Producer<span></span></h2>
					<p class="prod-text"><span>Name:</span><asp:Literal ID="LiteralNome" runat="server"></asp:Literal></p>
					<p class="prod-channel"><span>Channel:</span><asp:Literal ID="LiteralChannelNmae" Text="ChannelName" runat="server"></asp:Literal></p>
					<p class="prod-desc"><span>Descriptions:</span><asp:Literal ID="LiteralChannelDescriptions" Text="" runat="server"></asp:Literal></p>
					<p>
						<a href="#" class="nba-follow" data-toggle="modal" data-target="#myModal" style="margin-top:0px;">Follow Us</a>
					</p>
				
				</div>
				<div class="col-md-3" >
					<asp:Image ID="ImageProducer" runat="server" class="img-responsive bordo" />
					<div class="col-md-12">
						<a href="#" id="hreflinkedinprofile" runat="server" target="_blank">
							<img src="images/linkedin-icon.png" class="img-responsive" /></a>
						<a href="#" id="hreffacebookprofile" runat="server" target="_blank">
							<img src="images/facebook-icon.png" class="img-responsive" />
						</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	<%--	<li><a href="#" id="hreffacebookprofile" runat="server" target="_blank">
			<img src="images/facebook-icon.png" class="img-responsive" /></a></li>
		<li><a href="#" id="hreftwitterprofile" runat="server" target="_blank">
			<img src="images/twitter-icon.png" class="img-responsive" /></a></li>
		<li><a href="#" id="hreflinkedinprofile" runat="server" target="_blank">
			<img src="images/linkedin-icon.png" class="img-responsive" /></a></li>--%>

	</section>
	<!-- <a name="feat-vdo-list-1"></a> -->

	<!-- Section Next Video 
	<section class="feat-sec">
		<h1>Next Videos</h1>

		<div id="video_boxes_wrapper_1" class="video_boxes_wrapper"></div>

		<div class="more-btn-cvr">
			<a id="more-btn-1" class="more-btn"></a>
		</div>

	</section>
	<!-- END Section Next Video -->
	<div class="clearfix"></div>

	<!--
	<section>
		<div class="search-bar" id='search-bar'>
			<%--<form>--%>
				<input id='search-input' type="text" placeholder="search video" />
				<div id="search-btn" class="search-btn"></div>
			<%--</form>--%>
		</div>
		<div id='autocompleter-container'></div>
		<div id='repeater-container'></div>
	</section> -->




	<%--<section class="feat-sec most-view-sec" >
		<h1>Most Viewed </h1>

		<div id="video_boxes_wrapper_2" class="video_boxes_wrapper">

		</div>

		<div class="more-btn-cvr">
			<a id="more-btn-2" class="more-btn"></a>
		</div>

	</section>--%>


	<%--<div>
		<ul class="social-icon-pro">
			<li>
				<a href="#" id="hreffacebookprofilef" runat="server" target="_blank">
					<i class="fa fa-facebook-square" aria-hidden="true"></i></a>
				<a href="#" id="A1" runat="server" target="_blank">
					<i class="fa fa-facebook-square" aria-hidden="true"></i></a>
			
                                
			</li>

			<li>
			<%--	<a href="#" id="A2" runat="server" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i>
					  <span>100+</span>
				</a>
			</li>
		</ul>
	</div>--%>
	
<%--	<div>
		<a href="#" class="centric-follow-btn" data-toggle="modal" data-target="#myModal">follow us</a>
	</div>
	<a href="#" id="hreflinkedinprofilef" runat="server" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>--%>



		<%--	<div class="prd-left-side">
				<a href="#">Producer</a>
			</div>

			<div class="prd-right-side">
				<artical class="pro-info">   </artical>

				<artical class="pro-feedback">
                    <h1>Descriptions</h1>
					
                    <p>
					
						</p>--%>
                    
                    
     
	
	 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->

	<script>
        $(document).ready(function () {
            $('a[href*="#"]:not([href="#"])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                       
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });


        });
    </script>



    <script type="in/Login"></script>
 	<script src='<%= Page.ResolveUrl("~/js/jquery.min.js")%>'></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src='<%= Page.ResolveUrl("~/js/shaka-player.2.0.0.compiled.js")%>'></script>
	<script src='<%= Page.ResolveUrl("~/js/defer.js")%>'></script>
	<%--<script src='<%= Page.ResolveUrl("~/js/dPlayer/js/api.js")%>'></script>--%>
	

	<!-- Map api js -->
	<%--<script type="text/javascript" src='<%= Page.ResolveUrl("~/dPlayer/js/map_api.js")%>' ></script>--%>

	<!-- Search js -->
	<%--<script type="text/javascript" src='<%= Page.ResolveUrl("~/dPlayer/js/search.js")%>'></script>--%>

	<!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
	<script type="text/javascript">
    window.cookieconsent_options = {"message":"This website uses cookies to ensure you get the best experience on our website","dismiss":"Got it!","learnMore":"More info","link":"http://www.tegme.tv/disclamer/cookiepolicy.aspx","theme":"dark-bottom"};
	</script>

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.10/cookieconsent.min.js"></script>
	<!-- End Cookie Consent plugin -->



	<!-- Glbal statistic -->
	<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-70781230-1', 'auto');
  ga('send', 'pageview');

	</script>
	<!-- End Glabal Statistics -->

	<!-- personal statistics -->
	<asp:Literal ID="Literalgoogleanalitics" runat="server"></asp:Literal>

	<!--  -----------------------  -->


</asp:Content>


	

		

