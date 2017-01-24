using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SocialClass;

public class followerController : ApiController
{

	FollowerClass sc = new FollowerClass();

	//GET api/<controller>
	[Route("api/listfollower/{numelement}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<TB_Followers>))]
	public IEnumerable<followercompleto> Getfollowchannel([FromUri] int numelement)
	{
		
		return sc.listaUltimiFollowerAllChannel(numelement);
		 
	}
	// GET api/<controller>
	[Route("api/listfollow/{channel}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<TB_Followers>))]
	public IEnumerable<TB_Followers> Getfollowchannel([FromUri] string channel)
	{
		List<TB_Followers> lo = new List<TB_Followers>();
		lo = sc.listaFollowerChannel(channel);
		return lo;
	}

	[Route("api/listfollowing/{idsocial}")]
	[HttpGet]
	[ResponseType(typeof(IEnumerable<TB_Followings>))]
	public IEnumerable<TB_Followings> Get([FromUri] string idsocial)
	{
		List<TB_Followings> lo = new List<TB_Followings>();
		lo = sc.listaFollowing(idsocial);
		return lo;
	}

	// GET api/<controller>/5
	public string Get(int id)
	{
		return "value";
	}

	// POST api/<controller>
	[HttpPost]
	public  HttpResponseMessage Post([FromBody] AccountFollower obj)
	{
		int x = 0;

		if (obj!=null)
		{
			TB_Followers newfw = new TB_Followers();
			newfw.socialtype = obj.account_type;
			newfw.fw_email = obj.account_email;
			newfw.fw_imagespath = obj.picture_url;
			newfw.fw_name = obj.account_name;
			newfw.ueserid = obj.account_id;
			newfw.datecreate = DateTime.Now;

			string channelName = obj.channel_name.Replace("#","");
			x  = sc.SaveFollows(newfw, channelName);
		}

		
		switch (x)
		{
			case 0:
				var res = Request.CreateResponse(HttpStatusCode.MethodNotAllowed, obj);
				return res;
			case -1:
				var res1 = Request.CreateResponse(HttpStatusCode.BadRequest, obj);
				return res1;
			case 1:
				var resok = Request.CreateResponse(HttpStatusCode.Created, obj);
				return resok;

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

public class AccountFollower
{
	public long idfollower { get; set; }
	public string account_type { get; set; }
	public string account_id { get; set; }
	public string account_email { get; set; }
	public string picture_url { get; set; }

	public string account_name { get; set; }
	public string channel_name { get; set; }
}

public class objectFollowing
{
	public long idfollower { get; set; }
	public string channel_name { get; set; }

}

//'account_type' : 'facebook', 'account_id' : '132123454', 'account_email': 'example@example.com' 'picture_url' : 'https://fb.com/picure.jpg', 'channel_name' : 'nba'  }