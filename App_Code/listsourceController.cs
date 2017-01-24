using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using System.Web.Http.Description;
using tegCore;
using UAT_core;
using System.Threading.Tasks;

public class listsourceController : ApiController
{
	AccessoDatiS db1 = new AccessoDatiS();
	UatClassLogic ua1 = new UatClassLogic();

	string cartellaRelativa = @"/";
	// GET api/<controller>
	[Route("api/list/{tipo}/{channel}")]
	[ResponseType(typeof(IEnumerable<homeElement>))]
	public IEnumerable<homeElement> Get([FromUri] string tipo,[FromUri] string channel)
	{
		List<homeElement> lhome = new List<homeElement>();

		long idch = 0;
		if (tipo == "a")
		{
			long.TryParse(channel, out idch);
		
			
		}
		else
		//if(tipo=="b")
		//	{}
			if(channel!="")
			{
				TB_StreamChannel ch1 = new TB_StreamChannel();
				ch1 = db1.leggiStreamChannelName(channel);
				if (ch1 != null)
					idch = ch1.idStreamChannel;
			}

		

		ua1.pathrelativoStream = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroid = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
		ua1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		db1.servermediauri = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
		//db1.serverapiuri = 
			//System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
		//db1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
		//db1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		string miouri = "http://" + System.Web.HttpContext.Current.Request.Url.Authority + @"/public/channels/" + idch.ToString();
		ua1.pathrelativoweb = miouri;
		db1.serverapiuri = miouri;
		if (idch < 1) return null;

		if (tipo == "b")
		{
			lhome = ua1.listaHomeAdv(idch);
		}
		
		//if (tipo == "b1")
		//{
		//	lhome = ua1.listaHomeAdv(idch).Skip(4).ToList();
		//}
		if (tipo == "mv1")
		{
			List<homeElement> lh1 = ua1.listaHomeAdv(idch);
			//db1.listaHomeElVisite(idch);
			lhome = (from a in lh1 orderby a.visite descending select a).ToList();
		}
		//if (tipo == "mv2")
		//{
		//	List<homeElement> lh1 = db1.listaHomeElVisite(idch);
		//	lhome = ua1.AggiungeAdvLista(lh1, idch).Skip(4).ToList();
		//}

		if (tipo == "fw")
		{
			lhome = ua1.listaHomeAdv(idch);
		}

		return lhome;

		//List<homeElement> lh = new List<homeElement>();
		//List<TB_Streams> contenuti = new List<TB_Streams>();
		//TB_Streams contenutoAttivo = new TB_Streams();

		//TB_StreamChannel canale = new TB_StreamChannel();
		////canale = db1.leggiStreamChannelName("nasatv");
		//canale = db1.leggiStreamChannel(idch);
		//if (canale == null) { return null; }


		//fb leggi friends

		// check palinsesto

		// se esiste palinsesto allora query con palinsesto



		//return new string[] { "value1", "value2" };
	}

	// GET api/<controller>
	[Route("api/list/b/{channel}/{idstreamsource}")]
	[ResponseType(typeof(IEnumerable<homeElement>))]
	public IEnumerable<homeElement> GetchannelwithId([FromUri] string channel, [FromUri] long idstreamsource)
	{
		List<homeElement> lhome = new List<homeElement>();

		long idch = 0;
		
			if (channel != "")
		{
			TB_StreamChannel ch1 = new TB_StreamChannel();
			ch1 = db1.leggiStreamChannelName(channel);
			if (ch1 != null)
				idch = ch1.idStreamChannel;
		}
			else { return null; }



		ua1.pathrelativoStream = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroid = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
		ua1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		db1.servermediauri = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
																										   //db1.serverapiuri = 
																										   //System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
																										   //db1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
																										   //db1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		string miouri = "http://" + System.Web.HttpContext.Current.Request.Url.Authority + @"/public/channels/" + idch.ToString();
		ua1.pathrelativoweb = miouri;
		db1.serverapiuri = miouri;
		if (idch < 1) return null;

			lhome = ua1.listaHomeAdv(idch);


		return lhome;
			
		
	}

	// GET api/<controller>
	[Route("api/embed/{idstreamsource}")]
	[ResponseType(typeof(IEnumerable<homeElement>))]
	public IEnumerable<homeElement> Getembed([FromUri] long idstreamsource)
	{
		List<homeElement> lhome = new List<homeElement>();

		
		//if (tipo == "a")
		//{
		//	long.TryParse(channel, out idch);


		//}
		//else
		//	//if(tipo=="b")
		//	//	{}
		//	if (channel != "")
		//{
		//	TB_StreamChannel ch1 = new TB_StreamChannel();
		//	ch1 = db1.leggiStreamChannelName(channel);
		//	if (ch1 != null)
		//		idch = ch1.idStreamChannel;
		//}



		ua1.pathrelativoStream = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroid = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
		ua1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		db1.servermediauri = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
																										   //db1.serverapiuri = 
																										   //System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
																										   //db1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
																										   //db1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		string miouri = "http://" + System.Web.HttpContext.Current.Request.Url.Authority + @"/public/channels/";
		ua1.pathrelativoweb = miouri;
		db1.serverapiuri = miouri;
		if (idstreamsource < 1) return null;

		homeElement sing = new homeElement();
		sing = ua1.listaSingoloEmbed(idstreamsource);
		lhome.Add(sing);

		return lhome;


	}

	public void Post([FromBody]string value)
	{
	}

	// PUT api/<controller>/5
	public void Put(int id, [FromBody]string value)
	{
	}

	// DELETE api/<controller>/5
	public void Delete(int id)
	{
	}
}
