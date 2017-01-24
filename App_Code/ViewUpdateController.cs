using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using tegCore;
using UAT_core;

public class ViewUpdateController : ApiController
{

	AccessoDatiS db1 = new AccessoDatiS();
	UatClassLogic db2 = new UatClassLogic();

	// GET api/<controller>
	public IEnumerable<string> Get()
	{
		return new string[] { "value1", "value2" };
	}

	// GET api/<controller>/5
	public string Get(int id)
	{
		return "value";
	}

	// POST api/<controller>
	[HttpPost]
	public HttpResponseMessage Post([FromBody] vupdate obj)
	{

		string tiporeq = obj.tipo;
		long idobj = obj.idobject;
		switch (tiporeq)
		{
			case "sou":
				//AggiornaVisiste
				db1.AggiornaVisiste(idobj);
				var res = Request.CreateResponse(HttpStatusCode.OK, obj);
				return res;
				
			case "adv":
				db2.ConsumeAdv(idobj);
				var res1 = Request.CreateResponse(HttpStatusCode.OK, obj);
				return res1;
				
			case "blo":
				//AggiornaBlock
				db1.AggiornaBlock(idobj);
				var res2 = Request.CreateResponse(HttpStatusCode.OK, obj);
				return res2;
			
		}
		var resfail = Request.CreateResponse(HttpStatusCode.NotModified, obj);
		return resfail;
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
public class vupdate
{
	public long idobject { get; set; }
	public string tipo { get; set; }
}
