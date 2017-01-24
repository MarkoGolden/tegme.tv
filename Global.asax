<%@ Application Language="C#" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.Http" %>
<%@ Import Namespace="System.Web.Optimization" %>
<%@ Import Namespace="System.Web.Routing" %>

<%@ Import Namespace="System.Web.Security" %>
<%@ Import Namespace="System.Web.SessionState" %>
<%@ Import Namespace="Microsoft.AspNet.FriendlyUrls" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="tegCore" %>
<%@ Import Namespace="System.Web.Cors" %>
<%@ Import Namespace="System.Web.Http.Cors" %>


<script runat="server">

	void Application_Start(object sender, EventArgs e)
	{

		GlobalConfiguration.Configure(WebApiConfig.Register);
		// Codice eseguito all'avvio dell'applicazione

		//HttpConfiguration h = new HttpConfiguration();

		//h.MapHttpAttributeRoutes();
		RouteTable.Routes.MapHttpRoute(
	name: "DefaultApi",
	routeTemplate: "api/{controller}/{id}",
	defaults: new { id = System.Web.Http.RouteParameter.Optional }
	);

		//		RouteTable.Routes.MapPageRoute(
		//"channels",
		//"{channelname}/{idvideo}", "~/default.aspx",false,
		// new RouteValueDictionary
		// { { "channels", "channels" },{ "idvideo", "0" } }
		//);

		//RouteTable.Routes.MapPageRoute("channels", "{channelname}", "~/default.aspx");
		RouteTable.Routes.MapPageRoute("channels", "{channelname}/{idvideo}", "~/default.aspx",
			true, 
        new RouteValueDictionary { { "idvideo", string.Empty } });
		RouteTable.Routes.MapPageRoute("embed", "embed/{idsource}", "~/embed/default.aspx");

		RouteTable.Routes.Ignore("{*alljs}", new {alljs=@".*\.js(/.*)?"});
		RouteTable.Routes.Ignore("{*allcss}", new {allcss=@".*\.css(/.*)?"});
		RouteTable.Routes.Ignore("{*allpng}", new {allpng=@".*\.png(/.*)?"});
		RouteTable.Routes.Ignore("{*alljpg}", new {allpng=@".*\.JPG(/.*)?"});
		//		RouteTable.Routes.IgnoreRoute("{*alljs}", new {alljs=@".*\.js(/.*)?"});
		//		RouteTable.Routes.IgnoreRoute("{*allpng}", new {allpng=@".*\.png(/.*)?"});
		//RouteTable.Routes.IgnoreRoute("{*allcss}", new {allcss=@".*\.css(/.*)?"});
		//RouteTable.Routes.Ignore("{resource}.axd/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.mp4/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.css/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.js/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.ashx/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.dPlayer/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.dPlayer/js/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.dPlayer/css/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.dPlayer/node_modules/{*pathInfo}");
		//RouteTable.Routes.Ignore("{resource}.fonts/{*pathInfo}");

		//RouteConfig.RegisterRoutes(RouteTable.Routes);

		//RouteTable.Routes.MapPageRoute("channels", "{channelname}", "~/default.aspx");

		//RouteTable.Routes.MapPageRoute("idsource", "{channelname}/{idsource}", "~/default.aspx");
		//RouteTable.Routes.MapPageRoute("channeledit", "edit/{channelname}", "~/edit/default.aspx");
		//RouteTable.Routes.MapPageRoute("channeledits", "edits/{channelname}", "~/edits/default.aspx");

		//RouteTable.Routes.config.Routes.MapHttpRoute(
		//              name: "DefaultApi",
		//              routeTemplate: "api/{controller}/{id}",
		//              defaults: new { id = RouteParameter.Optional }

	}

	void Application_End(object sender, EventArgs e)
	{
		//  Codice eseguito all'arresto dell'applicazione

	}

	void Application_Error(object sender, EventArgs e)
	{
		// Codice eseguito in caso di errore non gestito

	}

	void Session_Start(object sender, EventArgs e)
	{
		// Codice eseguito all'avvio di una nuova sessione


	}

	void Session_End(object sender, EventArgs e)
	{
		// Codice eseguito al termine di una sessione. 
		// Nota: l'evento Session_End viene generato solo quando la modalità sessionstate
		// è impostata su InProc nel file Web.config. Se la modalità è impostata su StateServer 
		// o SQLServer, l'evento non viene generato.

	}


	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// Servizi e configurazione dell'API Web
			 //EnableCrossSiteRequests(config);
			// Route dell'API Web
			config.MapHttpAttributeRoutes();

			
			//config.EnableSystemDiagnosticsTracing();

			//config.Routes.MapHttpRoute(
			//    name: "DefaultApi",
			//    routeTemplate: "api/{controller}/{id}",
			//    defaults: new { id = RouteParameter.Optional }
			//);


			//config.Routes.MapHttpRoute(
			//    name: "DefaultApi",
			//    routeTemplate: "api/{controller}/{id}",
			//    defaults: new { id = RouteParameter.Optional }
			//);

			//config.Routes.MapHttpRoute(
			//    name: "CatController",
			//    routeTemplate: "api/categorie/"
			//    );

			var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
			config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
		}
		private static void EnableCrossSiteRequests(HttpConfiguration config)
    {
        var cors = new EnableCorsAttribute(
            origins: "*", 
            headers: "*", 
            methods: "*");
        config.EnableCors(cors);
    }
	}

</script>
