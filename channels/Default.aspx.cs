using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using tegCore;

public partial class channels_Default : System.Web.UI.Page
{

    AccessoDatiS db = new AccessoDatiS();
    string cartellaRelativa = ClassVar.pathcanali + @"/";
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            //bindrepeater();
        }
    }

    protected void bindrepeater()
    {

     

    }


}