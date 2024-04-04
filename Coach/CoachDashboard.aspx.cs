using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Coach_CoachDashboard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Page.Title = "Coach Dashboard | " + Global.DefaultSystemName;
        if (Session["CoachID"] == null)
            Response.Redirect("~/SelectUser", true);
    }
}