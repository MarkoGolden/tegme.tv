using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using tegCore;
using UAT_core;
using SocialClass;

public partial class _Default : System.Web.UI.Page
{
	AccessoDatiS db1 = new AccessoDatiS();
	string cartellaRelativa = ClassVar.pathcanali + @"/";
	protected void Page_Load(object sender, EventArgs e)
	{
		if (!IsPostBack)
			
		caricacanale();
		this.DataBind();
	}

	private long idchannel()
	{


		
		if (Page.RouteData.Values.Count < 1) { Response.Redirect("~/channels/"); return 0; }

		if ((Page.RouteData.Values["channelname"].ToString() == "") ||
			(Page.RouteData.Values["channelname"].ToString() == null) ||
			(Page.RouteData.Values["channelname"].ToString() == string.Empty))
		{
			Response.Redirect("~/channels/");
			return 0;
		}
		string nomecanale = Page.RouteData.Values["channelname"].ToString();
		//if (nomecanale=="embed") Response.Redirect("~/embed.aspx");
		if (nomecanale == "/pages/tegmemaps.aspx") Response.Redirect("~/pages/tegmemaps.aspx");
		//if (nomecanale == "admin") Response.Redirect("~/admin/usermanager.aspx");
		tegCore.TB_StreamChannel canale = new tegCore.TB_StreamChannel();
		canale = db1.leggiStreamChannelName(nomecanale);
		if (canale != null)
		{
			return canale.idStreamChannel;
		}

		return 0;
	}

	private long idsource()
	{
		//{channelname}/{idsource}

		if (Page.RouteData.Values["idsource"] == null) { return 0; }
		
		long idsource = 0;
		long.TryParse(Page.RouteData.Values["idsource"].ToString(), out idsource);
		return idsource;

	}

	protected bool caricacanale()
	{

		long idch = idchannel();
		if (idch < 1) return false;

		string idchstr = idch.ToString();
		string idchpath = cartellaRelativa + idchstr + @"/";

		tegCore.TB_StreamChannel canale = new tegCore.TB_StreamChannel();
		canale = db1.leggiStreamChannel(idch);
		if (canale == null) { return false; }

		string nomecanale = canale.ChannelName;
		this.LiteralNome.Text = canale.ChannelNameurl;
		this.LiteralChannelDescriptions.Text = canale.ChannelDescription;
		this.LiteralChannelNameHead.Text = canale.ChannelName.ToUpper();
		this.LiteralChannelNmae.Text = canale.ChannelName.ToUpper();
		//this.LiteralProducerName.Text = canale.ChannelNameurl;
		this.LiteralChannelDescriptions.Text = canale.ChannelDescription;
		this.ImageLogo.ImageUrl = cartellaRelativa + idchstr + @"/startup/" + canale.ChannelLogo;
		//string coverChannel = "background-image: url(" + cartellaRelativa + idchstr + @"/startup/" + canale.ChannelImage + ");" ;  
		//this.sectionProducer.Attributes.Add("style", coverChannel);
		////style = "background-image: url(images/producer-img.jpg);" 
		this.ImageProducer.ImageUrl= cartellaRelativa + idchstr + @"/startup/" + canale.ChannelLogo1;
		if (canale.StreamLinkSocial1 != "")
		{
			this.hreffacebookprofile.HRef = canale.StreamLinkSocial1;
			//this.hreffacebookprofilef.HRef = canale.StreamLinkSocial1;
		}
		else
		{
			this.hreffacebookprofile.Visible = false; 
			//this.hreffacebookprofilef.Visible = false;
		};
		if (canale.StreamLinkSocial2 != "")
		{
			this.hreflinkedinprofile.HRef = canale.StreamLinkSocial2;
			//this.hreflinkedinprofilef.HRef = canale.StreamLinkSocial2;
		}
		else { this.hreflinkedinprofile.Visible = false;  }

		//if (canale.StreamLinkSocial3 != "")this.hreflinkedinprofilef.Visible = false;
		//{ this.hreftwitterprofile.HRef = canale.StreamLinkSocial3; this.hreftwitterprofile.HRef = canale.StreamLinkSocial3; }
		//else
		//{ this.hreftwitterprofile.Visible = true; this.hreftwitterprofile.Visible = false;
		//}

		if (canale.gasnippet != "") this.Literalgoogleanalitics.Text = canale.gasnippet;

		string usernameprod = canale.username;

		//List<tegCore.TB_Streams> contenuti = new List<tegCore.TB_Streams>();
		//tegCore.TB_Streams contenutoAttivo = new tegCore.TB_Streams();

	
		//this.placehgaSnippet.Text = canale.gasnippet;

		//fb leggi friends

		// check palinsesto

	


		// carica follower
		FollowerClass sc = new FollowerClass();
		int? numfollow = sc.contaFollowerChannel(nomecanale);
		if (numfollow > 0)
		{ this.LiteralFollowe.Text = numfollow.ToString(); }
		return true;


		// to do  --- contenuti = db1.listaStreams(idcanale);
	}


	//protected string thumb1(object th)
	//{
	//	if (th != null) { 
	//	string idchstr = idchannel().ToString();
	
	//	string idchpath = cartellaRelativa + idchstr ;
	//	string miouri = "http://" + Request.Url.Authority + idchpath + th.ToString();
	//		miouri = "background-image: url(" + miouri + ");";
	//	return miouri;
	//	}
	//	return "";
	//	//return "background: url(" + miouri + ") no-repeat center top;background-size:cover;";
	//}

	//protected string pathvideo(object nomefile)
	//{
	//	string r = "";

	//	string miouri = "http://" + Request.Url.Authority + @"/public/channels/" + idchannel() + @"/media/";

	//	r = "'" + miouri + nomefile + "'";
	//	//  azuremediaplayer.Src = miouri + "/media/" + nomefile.ToString();

	//	return r;


	//}


	//protected string mapPointReturn()
	//{
	//	string r = "";

	//	long idch = idchannel();
	//	List<TB_StreamSources> listasou = new List<TB_StreamSources>();

	//	listasou = db1.listasourcesChannel(idch);
	//	foreach (TB_StreamSources x in listasou)
	//	{
	//		if ((x.geolocation2 != null) && (x.geolocation2 != ""))
	//			r += @"['" + x.SourceName + "', " + x.geolocation2 + "],";
	//	}

	//	//r= @"['punto1', '45.51742', '9.21841'],
	//	//	['punto1', '45.51995', '9.78912']";
	//	if (r.Count() > 1)
	//	{
	//		r.Remove((r.Count() - 2), 1);
	//	}

	//	return r;
	//}
}