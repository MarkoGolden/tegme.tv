using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using tegCore;
using UAT_core;
using System.Threading.Tasks;


	
	public class StreamHController : ApiController
    {
		AccessoDatiS db1 = new AccessoDatiS();
	UatClassLogic lg1 = new UatClassLogic();
		string cartellaRelativa =  @"/";



		// GET: api/StreamH
        //[Route("GetAllRows/{user}/{table}")]
		[Route("api/StreamH/{idch}")]
		[ResponseType(typeof(IEnumerable<homeElement>))]
		public IEnumerable<homeElement> Get([FromUri] long idch)
        {

		

		List<homeElement> lhome = new List<homeElement>();
		lhome = lg1.listaHomeAdv(idch);
		return lhome;

		//if (canale == null) { return null; }

		//long idch = idchannel();
		//string idchstr = idch.ToString();
		//string idchpath = cartellaRelativa + idchstr + @"/";
		List<TB_Streams> contenuti = new List<TB_Streams>();
			TB_Streams contenutoAttivo = new TB_Streams();



			//TB_StreamChannel canale = new TB_StreamChannel();
			//canale = db1.leggiStreamChannel(idch);
		//canale = db1.leggiStreamChannelName("nasatv");
			
			//this.placehgaSnippet.Text = canale.gasnippet;

		

		
			//this.RepeaterVideos.DataSource = lhome;
			//this.RepeaterVideos.DataBind();

			//if (idsource() > 0)
			//{
			//	long ids = idsource();
			//	homeElement selezionato = new homeElement();
			//	selezionato = db1.leggiHomeElem(ids);
			//	return popolavideo(lhome, selezionato);
			//}
			//else return popolavideo(lhome);


		//	lh.Add(new homeElement { nomeStream = "prova", nomeStreamSource="streamSource", thumbStream="~/"})
			


            //return new string[] { "value1", "value2" };
        }

	// GET: api/StreamH/5
	[Route("api/StreamH/s/{idsource}")]
	[ResponseType(typeof(homeElement))]
	public  homeElement GetSingle([FromUri] long idsource)
        {

            if(idsource < 1) { return null; }

            homeElement ogg1 = new homeElement();
            long idcanale = 1;
           // ogg1 = db1.leggiHomeElem(id);
            //long idchannel = ogg1.ChannelId;
          
            homeElement homeE = new homeElement();
            homeE = lg1.nextSource(idcanale, idsource);
            return homeE;

            
        }

        //// GET: api/StreamH
        //[Route("channel/{idch}")]
        //[ResponseType(typeof(IEnumerable<homeElement>))]
       


   
    }

