<%@ Page Language="C#" AutoEventWireup="true" CodeFile="embed.aspx.cs" Inherits="embed" %>

<!DOCTYPE html>

<head runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Embed tegme Video</title>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <script language="javascript">AC_FL_RunContent = 0;</script>
        <!-- Libraries -->
        <!-- DASH-AVC/265 reference implementation -->
        <script src="dPlayer/js/shaka-player.js"></script>
        <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>

        <!-- Video js css-->
        <link href="dPlayer/node_modules/video.js/dist/video-js.css" rel="stylesheet">
        <!-- If you'd like to support IE8 -->
        <script src="dPlayer/node_modules/video.js/dist/ie8/videojs-ie8.min.js"></script>
        <!-- end Video js -->
        <link rel="stylesheet" href="dPlayer/css/style_of_player.css" type="text/css" media="screen, projection">

        <script>
            function supports_media_source()
            {
                "use strict";
                var hasWebKit = (window.WebKitMediaSource !== null && window.WebKitMediaSource !== undefined),
                    hasMediaSource = (window.MediaSource !== null && window.MediaSource !== undefined);
                return (hasWebKit || hasMediaSource);
            }
        </script>
        
    </head>
<body>
    <form id="form1" runat="server">

		<!-- START VIDEO ZONE -->

        <div class="main--wrapper">

    		<div id="video-wrap-new" class="video-container">
    			<!-- Video JS video -->
    			<video id="videoObj" x-webkit-airplay="allow" class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay data-setup="{}"></video>
    			<!-- end Video JS video -->
    		</div>

        </div>

		<!-- END VIDEO ZONE -->

		

		<script src="dPlayer/node_modules/video.js/dist/video.js"></script>
		<script src="dPlayer/js/api.js"></script>
		<script src="dPlayer/js/TegmePlayer.js"></script>
    </form>
</body>
</html>
