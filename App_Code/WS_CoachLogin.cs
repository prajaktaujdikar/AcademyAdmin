using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_CoachLogin
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_CoachLogin : System.Web.Services.WebService
{

    public WS_CoachLogin()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    public class CoachMasterDetails
    {
        public Int64 CoachID { get; set; } 
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string CoachName { get; set; }
        public string MobileNo { get; set; }

        public string EmailID { get; set; }      
        public string Password { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public string CheckCoachLogin(CoachMasterDetails coachMasterDetails, String WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();

        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();

                cmd = new SqlCommand("C_CoachMasterCheckLogin", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmailID", coachMasterDetails.EmailID).DbType = DbType.String;
                cmd.Parameters.AddWithValue("@Password", coachMasterDetails.Password).DbType = DbType.String;
               
                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                adp.Fill(ds);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    HttpContext.Current.Session["CoachID"] = ds.Tables[0].Rows[0]["CoachID"].ToString();
                    HttpContext.Current.Session["EmailID"] = ds.Tables[0].Rows[0]["EmailID"].ToString();
                    HttpContext.Current.Session["Password"] = ds.Tables[0].Rows[0]["Password"].ToString();
                    HttpContext.Current.Session["CoachName"] = ds.Tables[0].Rows[0]["CoachName"].ToString();
                    msg = "1";
                }
                else
                {
                    msg = "0";
                }

            }
        }
        catch (Exception ex)
        {
            msg = "Error" + ex.Message;
        }
        finally
        {
            cmd.Dispose();
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return msg;
    }
}
