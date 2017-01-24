<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="channels_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Tegme -- Channels</title>
	<!-- Bootstrap -->
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<link href="sass/tegme.css" rel="stylesheet" type="text/css">
	<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">

	<!-- Google map -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOAz2zq_AdGGtmrwE0rFYyjcjanga44wM"></script>

	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <form id="form1" runat="server">
		<header class="header">
			<div class="header_inner">
				<div class="video_back"></div>
				<video poster="img/poster.png" width="100%" class="video_tegme" autoplay loop>
					<source src="img/countdown.mp4" type="video/mp4">
					<source src="mov_bbb.ogg" type="video/ogg">
					Your browser does not support HTML5 video.
				</video>
				<div class="container vodeo_container">
					<div class="row">
						<div class="col-md-12">
							<div class="header_wrap">
								<div class="header_wrap_inner">
									<div class="nav_wrap">
										<!---navigation-->
										<nav class="navbar">
											<div class="container-fluid">
												<!-- Brand and toggle get grouped for better mobile display -->
												<div class="navbar-header">
													<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
													<a class="navbar-brand" href="#">
														<img src="img/logo.png" /></a>
												</div>

												<!-- Collect the nav links, forms, and other content for toggling -->
												<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
													<ul class="nav navbar-nav navbar-right tegme_menu">
														<li><a href="https://admin.tegme.tv/login.aspx" target="_blank" >Login</a></li>
														<li><a href="https://admin.tegme.tv/registration.aspx" target="_blank" >Become a Producer</a></li>
														<li><a href="http://www.tegme.com">About Us</a></li>
													</ul>
												</div>
												<!-- /.navbar-collapse -->
											</div>
											<!-- /.container-fluid -->
										</nav>
										<!--navigation-->
									</div>
									<div class="title">
										It’s your time to become<br />
										a real producer
									</div>
									<div class="description">
										Start your business with online videos, the first video platform that allows you to monetize instantly your talent 
									</div>
									<div class="tegme_large_btn"><span><a href="http://landingIta.tegme.tv">EXPLORE</a></span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

		<section class="section_margin">
			<div class="container-fluid">

				<div class="row" id="feature_vid">
					<div class="col-md-6 col-sm-6">
						<div class="large_video_box large_video_back large_video_green">
							<img class="img-responsive" src="img/green_video_img.png" />
							<div class="video_caption">
								Featured
								<br />
								Video
            <h4 onclick="showall('feature_vid')">View All</h4>
							</div>
						</div>
					</div>

				</div>

			</div>
		</section>

	<%--	<div class="clearfix"></div>--%>

		<%--<section>
			<div class="search-bar" id='search-bar'>--%>
			
				<%--<input id='search-input' type="text" placeholder="search channel" />--%>
				<%--<div id="search-btn" class="search-btn"></div>--%>
				
			<%--</div>--%>
		<%--	<div id='autocompleter-container'></div>
			<div id='repeater-container'></div>
		</section>--%>

		<section class="search_section">
			<div class="container search_section_container">
				<div class="table">
					<div class="table_cell">
						<h2>Find Your Channel</h2>
						<div class="search" id='search-bar'>
							
								<div id="search-btn" class="search-btn">
									<span><i class="fa fa-search" aria-hidden="true"></i></span>
							</div>
								<span><input id='search-input' type="text" placeholder="Search channel" /></span>
							<div id='autocompleter-container'></div>
							<div id='repeater-container'></div>
						</div>
						
						
					</div>
				</div>
			</div>
		</section>
		<!-- Google Map channels -->
		<section class="section_margin">
		<section class="map_section">
			<%--<div class="panel-body panel-body-map">--%>
				<div id="map" style="width: 100%; height: 600px;"></div>
			
			<%--</div><img src="img/map.png" width="100%">--%>
		</section>
			</section>
		<!-- end Google Map channels -->
		<section class="section_margin">
			<div class="container-fluid">
				<div class="row row-rtl" id="mostViewed_vid">
					<div class="col-md-6 col-sm-6">
						<div class="large_video_box large_video_back large_video_green" style="background: none;">
							<img class="img-responsive" src="img/most_viewed_bg.png" />
							<div class="video_caption">
								Most Viewed<br />
								Video
            <h4 onclick="showall('mostViewed_vid')">View All</h4>
							</div>
						</div>
					</div>
					<div class="clear-fix">
					</div>
				</div>
				
			</div>
		</section>

		<!--  Categories Section -->
		<section class="cat_section cat_section_original">
			<div class="container">
				<h1 class="cat_title">Categories</h1>
				<div class="row">
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #acbfa3;">
								<img src="img/categories-icon/dance.png" />
							</div>
							<span>Dance</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #bfa3b9;">
								<img src="img/categories-icon/car.png" />
							</div>
							<span>Car</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #bfb9a3;">
								<img src="img/categories-icon/cat.png" />
							</div>
							<span>Cat</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #bfaba3;">
								<img src="img/categories-icon/buildind.png" />
							</div>
							<span>University</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #a3b9bf;">
								<img src="img/categories-icon/beauty.png" />
							</div>
							<span>Beauty</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #a3a5bf;">
								<img src="img/categories-icon/dog.png" />
							</div>
							<span>Dog</span>
						</div>
					</div>

					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #acbfa3;">
								<img src="img/categories-icon/narrative.png" />
							</div>
							<span>Cartoon</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #bfa3b9;">
								<img src="img/categories-icon/technology.png" />
							</div>
							<span>Technology</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #bfb9a3;">
								<img src="img/categories-icon/party.png" />
							</div>
							<span>Party </span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #bfaba3;">
								<img src="img/categories-icon/sport.png" />
							</div>
							<span>Animal</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #a3b9bf;">
								<img src="img/categories-icon/id-card.png" />
							</div>
							<span>Business</span>
						</div>
					</div>
					<div class="col-md-2 col-xs-4 col-sm-4">
						<div class="cat_box">
							<div class="cat_box_img" style="background: #a3a5bf;">
								<img src="img/categories-icon/idea.png" />
							</div>
							<span>Design</span>
						</div>
					</div>
					<div class="i-hide">
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/people.png" />
								</div>
								<span>People</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/travel.png" />
								</div>
								<span>Travel</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/gaming.png" />
								</div>
								<span>Gaming</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/social.png" />
								</div>
								<span>Social Media</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/real-estate.png" />
								</div>
								<span>Real Estate</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/political.png" />
								</div>
								<span>Political</span>
							</div>
						</div>

						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/pet.png" />
								</div>
								<span>Pet</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/sports.png" />
								</div>
								<span>Sport</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/company.png" />
								</div>
								<span>Company</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/gossip.png" />
								</div>
								<span>Celebrity Gossip</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/finance.png" />
								</div>
								<span>Finance</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/news.png" />
								</div>
								<span>News</span>
							</div>
						</div>

						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/wedding.png" />
								</div>
								<span>Wedding</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/vlogging.png" />
								</div>
								<span>Vloggers</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/parenting.png" />
								</div>
								<span>Parenting</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/history.png" />
								</div>
								<span>History</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/science.png" /></div>
								<span>Science</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/photography.png" />
								</div>
								<span>Photography</span>
							</div>
						</div>

						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/green.png" />
								</div>
								<span>Green</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/medical.png" />
								</div>
								<span>Medical</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/career.png" />
								</div>
								<span>Career</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/kids.png" />
								</div>
								<span>Kids</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/money.png" /></div>
								<span>Money</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/nature.png" />
								</div>
								<span>Nature</span>
							</div>
						</div>

						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/seo.png" />
								</div>
								<span>SEO</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/shopping.png" />
								</div>
								<span>Shopping</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/fashion.png" />
								</div>
								<span>Fashion</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/law.png" />
								</div>
								<span>Law</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/learning.png" /></div>
								<span>Learning</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/entertainment.png" />
								</div>
								<span>Entertainment</span>
							</div>
						</div>

						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/corporate.png" />
								</div>
								<span>Corporate</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/economy.png" />
								</div>
								<span>Economics</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/diy.png" />
								</div>
								<span>DIY</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/wine.png" />
								</div>
								<span>Wine</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/health.png" /></div>
								<span>Health</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/music.png" />
								</div>
								<span>Music</span>
							</div>
						</div>

						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #acbfa3;">
									<img src="img/categories-icon/personal.png" />
								</div>
								<span>Personal</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfa3b9;">
									<img src="img/categories-icon/movie.png" />
								</div>
								<span>Movie</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfb9a3;">
									<img src="img/categories-icon/food.png" />
								</div>
								<span>Food</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #bfaba3;">
									<img src="img/categories-icon/innovation.png" />
								</div>
								<span>Innovation</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3b9bf;">
									<img src="img/categories-icon/talk.png" /></div>
								<span>Talk</span>
							</div>
						</div>
						<div class="col-md-2 col-xs-4 col-sm-4">
							<div class="cat_box">
								<div class="cat_box_img" style="background: #a3a5bf;">
									<img src="img/categories-icon/education.png" />
								</div>
								<span>Education</span>
							</div>
						</div>
					</div>
				</div>
				<div class="download">
					<div class="show-all">
						<span>
							<img src="img/download.png" /><br>
							<span>Show all</span></span>
					</div>
					<div class="hide-all">
						<span>
							<img src="img/categories-icon/download-opp.png" /><br>
							<span>Hide</span></span>
					</div>
				</div>
			</div>
		</section>
		<!-- End Categories Section -->

		<!--========================slidere==============================-->
		<section class="slider large_slider">
			<div class="container-fluid">
				<h1 class="slider_title">Best Producers</h1>
				<div class="row">
					<div class="span12">
						<div class="well">
							<div class="carousel slide" data-ride="carousel" data-type="multi" data-interval="5000" id="myCarousel">
								<div class="carousel-inner" id="bestProducers">
								</div>
								<a class="left carousel-control" href="#myCarousel" data-slide="prev"><i class="glyphicon glyphicon-chevron-left"></i></a>
								<a class="right carousel-control" href="#myCarousel" data-slide="next"><i class="glyphicon glyphicon-chevron-right"></i></a>
							</div>
						</div>
						<!--/well-->
					</div>
				</div>
			</div>
		</section>
		<!---======================slider================================-->

		<section class="cat_section best_producers_wrap">
			<div class="container">
				<h1 class="cat_title">Last Followers</h1>
				<div class="row auto-clear"  id="carousel-items">
				
				</div>
				<div class="follower-toggle">
					<div class="show-all-follower">
						<span><img src="img/download.png" /><br>
						<span>Show all</span></span>
					</div>
					<div class="hide-all-follower">
						<span><img src="img/categories-icon/download-opp.png" /><br>
						<span>Hide</span></span>
					</div>
				</div>
				<div class="two-boxes">
					<div class="row">
						<div class="col-md-6 col-sm-6">
							<div class="create_your_box">
								<h1>Create your channel</h1>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="sp-img-advertising">
								<h1>Publish Your advertising</h1>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>
		<footer class="search_section" style="background: #333;">
			<div class="container search_section_container">
				<div class="table" style="min-height: 250px;">
					<div class="table_cell">
						<div class="footer">
							<img src="img/logo.png" />
							<h3>Copyright 2016 Tegme srl. All rights reserved.</h3>
							<h5><a href="http://www.tegme.com" target="_blank">www.tegme.com</a>
								</h5><h5>
								<a href="mailto:info@tegme.com" target="_blank">Contact Us</a></h5>
							<h5>
							<a href="https://www.linkedin.com/company/tegme" target="_blank"><i class="fa fa fa-linkedin-square fa-2x"></i></a>
							<a href="https://www.facebook.com/tegmeTV" target="_blank"><i class="fa fa-facebook-square fa-2x"></i></a></h5>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<script src='<%= Page.ResolveUrl("~/js/jquery.min.js")%>'></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="js/global_api.js"></script>
		<script src="js/global_map_api.js"></script>
	
		<script>
    $(document).ready(function () {
$('.carousel[data-type="multi"] .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  for (var i=0;i<2;i++) {
    next=next.next();
    if (!next.length) {
    	next = $(this).siblings(':first');
  	}
    
    next.children(':first-child').clone().appendTo($(this));
  }
});

    $('.show-all').on('click', function(){
      $('div.i-hide').slideToggle(300);
      $(this).hide();
      $('.hide-all').show();
    });
    $('.hide-all').on('click', function(){
      $(this).hide();
      $('div.i-hide').slideToggle(300);
      $('.show-all').show();
    });
	
	  $('.show-all-follower').on('click', function(){
      $('div.hidden-follower').fadeIn();
      $(this).hide();
      $('.hide-all-follower').show();
    });
    $('.hide-all-follower').on('click', function(){
      $(this).hide();
      $('div.hidden-follower').fadeOut();
      $('.show-all-follower').show();
    });
});
		</script>
		<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-70781230-1', 'auto');
  ga('send', 'pageview');

		</script>
		<!-- End Global Statistics -->
	</form>
</body>
</html>
