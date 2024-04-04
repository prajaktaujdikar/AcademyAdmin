using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_AdminLogin
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_AdminLogin : System.Web.Services.WebService
{

    public WS_AdminLogin()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    public class UserMasterDetails
    {
        public Int64 UserID { get; set; }
        public Int16 UserTypeID { get; set; }
        public string FullName { get; set; }
        public string MobileNo { get; set; }
        public string EmailID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    [WebMethod(EnableSession = true)] 
    public string CheckUserLogin(UserMasterDetails userMasterDetails, String WSPassword)
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

                cmd = new SqlCommand("U_UserMasterCheckLogin", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserName", userMasterDetails.UserName).DbType = DbType.String;
                cmd.Parameters.AddWithValue("@Password", userMasterDetails.Password).DbType = DbType.String;
                //cmd.Parameters.AddWithValue("@CandidateName", candidateMasterDetails.CandidateName).DbType = DbType.String;
                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                adp.Fill(ds);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    HttpContext.Current.Session["UserID"] = ds.Tables[0].Rows[0]["UserID"].ToString();
                    HttpContext.Current.Session["EmailID"] = ds.Tables[0].Rows[0]["EmailID"].ToString();
                    HttpContext.Current.Session["Password"] = ds.Tables[0].Rows[0]["Password"].ToString();
                    HttpContext.Current.Session["FullName"] = ds.Tables[0].Rows[0]["FullName"].ToString();
                    HttpContext.Current.Session["UserTypeID"] = ds.Tables[0].Rows[0]["UserTypeID"].ToString();
                    HttpContext.Current.Session["IsMain"] = ds.Tables[0].Rows[0]["IsMain"].ToString();

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
