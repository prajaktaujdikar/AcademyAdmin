using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserID"] == null)
        {
            
        }
        else
        {
            lblUserName.Text = HttpContext.Current.Session["FullName"].ToString();
        }



        int UserTypeID = Convert.ToInt16(HttpContext.Current.Session["UserTypeID"].ToString());

        if (UserTypeID == 1 || UserTypeID == 2)
        {
            UserLabel.Text = "User";
            liUser.Style.Add("display", "block");

        }
        else
        {
            UserLabel.Text = "";
            liUser.Style.Add("display", "none");
        }
    }
}
