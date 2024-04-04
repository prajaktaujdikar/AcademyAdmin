using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_ManageUser
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_ManageUser : System.Web.Services.WebService
{
    private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
    DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
    public WS_ManageUser()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod(EnableSession = true)]
    public bool CheckUserNameExists(string UserName)
    {
        bool IsExist = false;
        SqlConnection conn = new SqlConnection(Global.ConnString);
        try
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("U_UserMasterUserNameCheckExists", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserName", UserName).DbType = DbType.String;
            int i = Convert.ToInt32(cmd.ExecuteScalar());
            if (i == 0)
                IsExist = false;
            else
                IsExist = true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return IsExist;
    }

    [WebMethod(EnableSession = true)]
    public bool CheckMobileNoExistsForUserRegistration(string MobileNo, String WSPassword)
    {
        bool IsExist = false;
        SqlConnection conn = new SqlConnection(Global.ConnString);
        try
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("U_UserMasterMobileNoCheckExists", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@MobileNo", MobileNo).DbType = DbType.String;
            int i = Convert.ToInt32(cmd.ExecuteScalar());
            if (i == 0)
                IsExist = false;
            else
                IsExist = true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return IsExist;
    }

    [WebMethod(EnableSession = true)]
    public bool CheckEmailIDExistsForUserRegistration(string EmailID, String WSPassword)
    {
        bool IsExist = false;
        SqlConnection conn = new SqlConnection(Global.ConnString);
        try
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("U_UserMasterEmailIDCheckExists", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EmailID", EmailID).DbType = DbType.String;
            int i = Convert.ToInt32(cmd.ExecuteScalar());
            if (i == 0)
                IsExist = false;
            else
                IsExist = true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return IsExist;
    }

    private static DataSet GetListData(SqlCommand cmd)
    {
        SqlConnection conn = new SqlConnection();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            using (SqlDataAdapter sda = new SqlDataAdapter())
            {
                cmd.Connection = conn;
                sda.SelectCommand = cmd;
                using (DataSet ds = new DataSet())
                {
                    sda.Fill(ds, "DetailList");
                    return ds;
                }
            }
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
    }

    private static DataSet GetListDataPager(SqlCommand cmd, int pageIndex, int PageSize)
    {
        SqlConnection conn = new SqlConnection();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            using (SqlDataAdapter sda = new SqlDataAdapter())
            {
                cmd.Connection = conn;
                sda.SelectCommand = cmd;
                using (DataSet ds = new DataSet())
                {
                    sda.Fill(ds, "DetailList");
                    DataTable dt = new DataTable("Pager");
                    dt.Columns.Add("PageIndex");
                    dt.Columns.Add("PageSize");
                    dt.Columns.Add("RecordCount");
                    dt.Rows.Add();
                    dt.Rows[0]["PageIndex"] = pageIndex;
                    dt.Rows[0]["PageSize"] = PageSize;
                    dt.Rows[0]["RecordCount"] = cmd.Parameters["@RecordCount"].Value;
                    ds.Tables.Add(dt);
                    return ds;
                }
            }
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
    }

    [WebMethod(EnableSession = true)]
    public string   GetSessesionIsMain()
    {
        string IsMain = "";
        if (Session["IsMain"] != null)
            IsMain = HttpContext.Current.Session["IsMain"].ToString();
        
            return IsMain;
    }

    public class UserDetails
    {
        public Int64 UserID { get; set; }
        public Int16 UserTypeID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string EmailID { get; set; }
    }

    [WebMethod(EnableSession = true)]

    public string ManageUser(UserDetails userDetails, String WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();

        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["UserID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);
                    if (conn.State == ConnectionState.Closed)
                        conn.Open();

                    cmd = new SqlCommand("U_UserMasterManage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userDetails.UserID).DbType = DbType.Int16;

                    if (userDetails.FullName == "")
                        cmd.Parameters.AddWithValue("@FullName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@FullName", userDetails.FullName).DbType = DbType.String;

                    if (userDetails.UserTypeID == 0)
                        cmd.Parameters.AddWithValue("@UserTypeID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@UserTypeID", userDetails.UserTypeID).DbType = DbType.Int16;

                    if (userDetails.EmailID == "")
                        cmd.Parameters.AddWithValue("@EmailID", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@EmailID", userDetails.EmailID).DbType = DbType.String;

                    if (userDetails.MobileNo == "")
                        cmd.Parameters.AddWithValue("@MobileNo", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@MobileNo", userDetails.MobileNo).DbType = DbType.String;

                    if (userDetails.UserName == "")
                        cmd.Parameters.AddWithValue("@UserName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@UserName", userDetails.UserName).DbType = DbType.String;

                    if (userDetails.Password == "")
                        cmd.Parameters.AddWithValue("@Password", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Password", userDetails.Password).DbType = DbType.String;
                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();

                    if (userDetails.UserID == 0)
                        msg = "User Details inserted successfully.";
                    else
                        msg = "User Details updated successfully.";
                }
                else
                {
                    msg = "SessionExpire";
                }
            }
        }
        catch (Exception ex)
        {
            msg = "CatchError" + ex.Message;
        }
        finally
        {
            cmd.Dispose();
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return msg;
    }

    [WebMethod(EnableSession = true)]
    public string GetUserDetailList(int pageIndex, int PageSize, String WSPassword, UserDetails userDetails)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("U_UserMasterGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@UserTypeID", userDetails.UserTypeID).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@FullName", userDetails.FullName).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@MobileNo", userDetails.MobileNo).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@EmailID", userDetails.EmailID).DbType = DbType.String;
            cmd.Parameters.Add("@RecordCount", SqlDbType.Int, 4).Direction = ParameterDirection.Output;

            msg = GetListDataPager(cmd, pageIndex, PageSize).GetXml();

        }
        catch (Exception ex)
        {
            msg = "CatchError" + ex.Message;

        }
        finally
        {
            if (con.State == ConnectionState.Open)
                con.Close();
        }
        return msg;
    }

    [WebMethod(EnableSession = true)]
    public string DeleteUserDetails(Int64 UserID, String WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["UserID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);
                    if (conn.State == ConnectionState.Closed)
                        conn.Open();

                    cmd = new SqlCommand("U_UserMasterDeleteByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", UserID).DbType = DbType.Int64;
                    cmd.ExecuteNonQuery();
                    msg = "User details deleted successfully.";
                }
                else
                    msg = "SessionExpire";
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

    [WebMethod(EnableSession = true)]

    public List<UserDetails> GetUserDetailsByID(Int64 UserID, String WSPassword)
    {
        List<UserDetails> list = new List<UserDetails>();
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["UserID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);

                    if (conn.State == ConnectionState.Closed)
                        conn.Open();
                    cmd = new SqlCommand("U_UserMasterGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", UserID).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        list.Add(new UserDetails
                        {

                            UserID = Convert.ToInt64(ds.Tables[0].Rows[0]["UserID"].ToString()),

                            UserTypeID = Convert.ToInt16(ds.Tables[0].Rows[0]["UserTypeID"].ToString()),
                            FullName = ds.Tables[0].Rows[0]["FullName"].ToString(),
                            MobileNo = ds.Tables[0].Rows[0]["MobileNo"].ToString(),
                            EmailID = ds.Tables[0].Rows[0]["EmailID"].ToString(),
                            UserName = ds.Tables[0].Rows[0]["UserName"].ToString(),
                            Password = ds.Tables[0].Rows[0]["Password"].ToString(),

                        });
                    }
                }
                else
                {

                }
            }
        }
        catch (Exception ex)
        {

        }
        finally
        {
            cmd.Dispose();
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return list;
    }
}
