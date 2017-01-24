using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using tegCore;
using UAT_core;

public class gpsController : ApiController
{

	AccessoDatiS db1 = new AccessoDatiS();
	UatClassLogic ua1 = new UatClassLogic();

	// GET api/<controller>
	[Route("api/locations/{channel}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<geoVideo>))]
	public IEnumerable<geoVideo> Get([FromUri] string channel)
	{
		long idch = 0;
		List<geoVideo> listasou = new List<geoVideo>();

		if (channel != "")
		{
			string pathimg = "http://www.tegme.tv/public/channels/";
			TB_StreamChannel ch1 = new TB_StreamChannel();
			ch1 = db1.leggiStreamChannelName(channel);
			if (ch1 != null)
				idch = ch1.idStreamChannel;
			pathimg += idch.ToString() + "/thumbs/";
			listasou = db1.listasourcesGeo(idch, pathimg);
		}

		return listasou;
	}


	// GET api/<controller>
	[Route("api/globlocations")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<globalpos>))]
	public IEnumerable<globalpos> global()
		{
		string pathsite = "http://www.tegme.tv";

		List<globalpos> lista1 = new List<globalpos>();
		lista1 = db1.listaCanaliGeolocalizzati(pathsite);


			return lista1;


	}
	// GET api/<controller>/5
	public string Get(int id)
	{
		return "value";
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




