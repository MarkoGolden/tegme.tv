using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Security;


/// <summary>
/// Descrizione di riepilogo per ClassVar
/// </summary>
///// 
//namespace wwwtegme
//{}


    public class ClassVar
{

    public ClassVar()
    {
        //
        // TODO: aggiungere qui la logica del costruttore
        //
    }

	public static string usernamec()
	{
		string r="nd";

		if(Membership.GetUser()!=null)
		{
			return Membership.GetUser().UserName;
		}

		return r;
	}

	public static long idchannel()
	{
		long idchan = 0;

		//if (HttpContext.Current.Page.RouteData.Values["channelname"] != null)
		//{

		//}
		if (HttpContext.Current.Request.QueryString["idch"] != null)
		{
			long.TryParse(HttpContext.Current.Request.QueryString["idch"], out idchan);
		}
		else
		{
			if (HttpContext.Current.Session["idchannel"] != null)
			{
				idchan = (long)HttpContext.Current.Session["idchannel"];
				HttpContext.Current.Session["idchannel"] = idchan;
			}
		}
		return idchan;
	}

	public static void routewww()
    {
       
    }

	public static string urlApp = "http://new.tegme.tv/";

  public static string Fisicotempapath = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoServerFisicoTemp"]))
            ? System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\media" :
            ConfigurationManager.AppSettings["percorsoServerFisicoTemp"] + @"\\";
            //"public/media/";

    public static  string Fisicopathimgprofili = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoServerFisicoProfili"])) ? 
            System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\media" : 
            ConfigurationManager.AppSettings["percorsoServerFisicoProfili"] + @"\\";
    public static string Fisicopathvideocanalitemp = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoServerFisicoCanaliTemp"])) ?
            System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\media" : 
            ConfigurationManager.AppSettings["percorsoServerFisicoCanaliTemp"] + @"\\";

    public static string Fisicopathfisicoroot = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsopublic"])) ?
           System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\" :
           ConfigurationManager.AppSettings["percorsopublic"] + @"\\";

    public static string pathFisicocanali = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoServerCanali"])) ? 
            System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\channels" : 
            ConfigurationManager.AppSettings["percorsoServerCanali"] + @"\";

    public static string pathcanali = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoCanali"])) ?
          @"/public/channels/" :
          ConfigurationManager.AppSettings["percorsoCanali"] + @"/";

    //public static string pathvideocanale = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoServerFisicoMedia"])) ? 
    //        System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\media" : 
    //        ConfigurationManager.AppSettings["percorsoServerFisicoMedia"] + @"\\";
    //public static string pathvideoinizialecanale = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["percorsoServerFisicoMedia"])) ? 
    //        System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\media" : 
    //        ConfigurationManager.AppSettings["percorsoServerFisicoMedia"] + @"\\";


    // ESERCIZIO -------------------------------------




    public static string CartellaFFMPEG = System.Web.HttpContext.Current.Request.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath) + @"public\\util\\ffmpeg";
    public static string ThumbFotoLarge  = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["ThumbFotoLarge"])) ? "200" : ConfigurationManager.AppSettings["ThumbFotoLarge"] ;
    public static string ThumbFotoSmall = (string.IsNullOrEmpty(ConfigurationManager.AppSettings["ThumbFotoSmall"])) ? "200" : ConfigurationManager.AppSettings["ThumbFotoSmall"];

        //Public Shared Property ThumbFotoSmall As Integer = 100

        //   'IIf((HttpContext.Current.Request.Cookies("idlingua") Is Nothing),, (Long.Parse(HttpContext.Current.Request.Cookies("idlingua").Value)))
        //   Public Shared ReadOnly Property idLingua As Long
        //       Get
        //           If(HttpContext.Current.Request.Cookies("idlingua") Is Nothing) Then
        //              Return 1
        //           Else
        //               Return(Long.Parse(HttpContext.Current.Request.Cookies("idlingua").Value))
        //           End If
        //       End Get

        //   End Property



    

    public static string tegme
    {
        get { return "Images/tegmes.png"; }
    }

    public static string meerkat
    {
        get { return "Images/meerkat.png"; }
    }
    public static string ipcamera
    {
        get { return "Images/ipcamera.png"; }
    }
    public static string skype
    {
        get { return "Images/skype.png"; }
    }
    public static string ustream
    {
        get { return "Images/Ustream-Icon.png"; }
    }
    public static string livestream
    {
        get { return "Images/livestream.png"; }
    }
    public static string periscope
    {
        get { return "Images/periscope.png"; }
    }

    public static string filevideo
    {
        get { return "Images/filevideo.png"; }
    }

    public static string siglavideo
    {
        get { return "Images/siglavideo.png"; }
    }
    public static string grafica
    {
        get { return "Images/grafica.png"; }
    }


    public static string iconaView(string s)
    {
        if (s != "")
        {
            switch (s)
            {
                case "tegme":
                    return tegme;
                   
                case "siglavideo":
                    return siglavideo;
                   
                case "filevideo":
                    return filevideo;

                case "periscope":
                    return periscope;
                
                case "Ustream":
                    return ustream;
                                case "skype":
                    return skype;
                
                case "meerkat":
                    return meerkat;

                case "ipcamera":
                    return ipcamera;
                
                case "file":
                    return filevideo;
                
                case "grafica":
                    return grafica;
                
                default:
                    return ClassVar.tegme;
                    break;

            }
        }
        return "";
    }

	public static bool IsEmptyEntity<T>(T obj)
	{
		foreach (var property in typeof(T).GetProperties())
			if (property.GetValue(obj, null) != null)
				return false;
		return true;
	}
}
