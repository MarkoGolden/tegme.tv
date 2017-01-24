using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using tegCore;
public class searchController : ApiController
{
	ClassSearch sc = new ClassSearch();

	// GET api/<controller>
	[Route("api/searchtitle/{s}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<string>))]
	public IEnumerable<string> GetFirstsearch([FromUri] string s)
	{

		if (s != "")
		{
			
			return sc.searchfirsttitolo(s);
		}

		return null;
		
	}

	[Route("api/search/{s}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<geoVideo>))]
	public IEnumerable<objectSearch> Getsearch([FromUri] string s)
	{

		if (s != "")
		{
			sc.pathteg = ClassVar.urlApp;
			
			return sc.searchcompleta(s);
		}

		return null;

		


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
