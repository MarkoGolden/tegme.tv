using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using tegCore;
public partial class MasterPage : System.Web.UI.MasterPage
{
	AccessoDatiS db1 = new AccessoDatiS();
	protected void Page_Load(object sender, EventArgs e)
	{

	}

	private long idchannel()
	{


	if (Page.RouteData.Values.Count < 1) { Response.Redirect("~/channels/"); return 0; }

		if ((Page.RouteData.Values["channelname"].ToString() == "") ||
			(Page.RouteData.Values["channelname"].ToString() == null) ||
			(Page.RouteData.Values["channelname"].ToString() == string.Empty))
		{
			Response.Redirect("~/channels/");
			
		}
		string nomecanale = Page.RouteData.Values["channelname"].ToString();
		TB_StreamChannel canale = new TB_StreamChannel();
		canale = db1.leggiStreamChannelName(nomecanale);
		if (canale != null)
		{
			return canale.idStreamChannel;
		}
		else
		{
			Response.Redirect("~/channels/");
		}

		return 0;
	}
	
}
