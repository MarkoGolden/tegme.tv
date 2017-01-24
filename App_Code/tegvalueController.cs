using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.ServiceModel.Channels;
using System.Web;
using System.Web.Http;
using tegCore;
public class tegvalueController : ApiController
{


	AccessoDatiS db = new AccessoDatiS();
	IContentEntities dc = new IContentEntities();
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
	//public void Post([FromBody]string value)
	//{
	//	object a = value;

	//}

	[HttpPost]
	public  HttpResponseMessage Post(TB_StreamRating value)
	{
		object a = value;

		

		if (value != null)
		{

			TB_StreamRating rating = new TB_StreamRating();

			rating.dateagg = DateTime.Now;
			rating.idstream = value.idstream;
			rating.ratestream = value.ratestream;
			rating.useragg = GetIp(); // value.useragg;
			db.editRating(rating);

		}


		var res = Request.CreateResponse(HttpStatusCode.Created, value);
		return res;
	}

	public string GetIp()
	{
		return GetClientIp();
	}
	private string GetClientIp(HttpRequestMessage request = null)
	{
		request = request ?? Request;

		if (request.Properties.ContainsKey("MS_HttpContext"))
		{
			return ((HttpContextWrapper)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
		}
		else if (request.Properties.ContainsKey(RemoteEndpointMessageProperty.Name))
		{
			RemoteEndpointMessageProperty prop = (RemoteEndpointMessageProperty)request.Properties[RemoteEndpointMessageProperty.Name];
			return prop.Address;
		}
		else if (HttpContext.Current != null)
		{
			return HttpContext.Current.Request.UserHostAddress;
		}
		else
		{
			return null;
		}
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
