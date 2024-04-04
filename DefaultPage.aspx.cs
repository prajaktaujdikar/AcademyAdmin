using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class DefaultPage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Page.Title = " Home | " + Global.DefaultSystemName;
        if (Session["UserID"] != null)
            Response.Redirect("~/Dashboard", true);

        if (Session["CoachID"] != null)
            Response.Redirect("~/Coach/Dashboard", true);

    }
}