using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using tegCore;
using UAT_core;
public class homelistController : ApiController
{

	AccessoDatiS db1 = new AccessoDatiS();
	UatClassLogic ua1 = new UatClassLogic();
	ClassCategorie cat1 = new ClassCategorie();

	// GET api/<controller>
	[Route("api/listhome/{tipo}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<homeElement>))]
	public IEnumerable<homeElement>  GetHome([FromUri] string tipo)
	{
		ua1.pathrelativoStream = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroid = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroid"];
		ua1.pathrelativoStreamUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameUAT"]; // "http://media01.wedot.net:1935/tegme/";
		ua1.pathrelativoStreamAndroidUAT = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingNameAndroidUAT"];

		db1.servermediauri = System.Configuration.ConfigurationManager.AppSettings["ServerStreamingName"]; // "http://media01.wedot.net:1935/tegme/";

		string miouri = "http://" + System.Web.HttpContext.Current.Request.Url.Authority + @"/public/channels/" ;
		//ua1.pathrelativoweb = miouri;
		db1.serverapiuri = miouri;

		if (tipo == "top")
		{
			return db1.listaVideoTopView();
		}

		if (tipo == "bottom")
		{
			return db1.listaVideoTopFollow();
		}

		return null;
		
	}


	[Route("api/listproducer/{tipo}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<producers>))]
	public IEnumerable<producers> Getproducer([FromUri] string tipo)
	{
		string miouri = "http://" + System.Web.HttpContext.Current.Request.Url.Authority + @"/public/channels/";
		//ua1.pathrelativoweb = miouri;
		db1.serverapiuri = miouri;
		

		return db1.listaStreamChannelxNumeroVideo(5); ;
			}


	[Route("api/listcategories/")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<TB_StreamsCategorieModel>))]
	public IEnumerable<TB_StreamsCategorieModel> GetCategories()
	{
		string miouri = "http://" + System.Web.HttpContext.Current.Request.Url.Authority + @"/public/channels/img/categories-icon/";
		//ua1.pathrelativoweb = miouri;
		//db1.serverapiuri = miouri;

		List<TB_StreamsCategorieModel> l1 = new List<TB_StreamsCategorieModel>();
		
		foreach(TB_StreamsCategorieModel m1 in cat1.ListaCateg())
		{
			m1.iconcateg = miouri + m1.iconcateg;
			l1.Add(m1);
		}
		//cat1.ListaCateg();
		//return null;
		return l1;

		// to do return db1.listaStreamChannelxNumeroVideo(10); ;
	}




	// POST api/<controller>
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
