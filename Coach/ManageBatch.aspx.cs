using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ManageBatch : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Page.Title = " Manage Batch | " + Global.DefaultSystemName;

        if (Session["CoachID"] == null)
            Response.Redirect("~/SelectUser", true);

        Label lblPage1 = this.Master.FindControl("lblPage1") as Label;
        lblPage1.Text = "Manage Batch";
        Label Label1 = this.Master.FindControl("Label1") as Label;
        Label1.Text = "Master";
        Label label2 = this.Master.FindControl("Label2") as Label;
        label2.Text = "Batch";
    }
}