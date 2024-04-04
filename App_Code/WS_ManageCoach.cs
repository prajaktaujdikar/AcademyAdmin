using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_ManageCoach
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_ManageCoach : System.Web.Services.WebService
{
    private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
    DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);

    public WS_ManageCoach()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
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

    public class CoachDetails
    {
        public Int64 CoachID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string CoachName { get; set; }
        public string MobileNo { get; set; }
        public string EmailID { get; set; }
        public string Gender { get; set; }
        public string GenderText { get; set; }
        public string DOB { get; set; }
        public string Password { get; set; }
        public string DOJ { get; set; }
        public Int16 BloodGroupID { get; set; }
        public string BloodGroup { get; set; }
        public Int16 ReligionID { get; set; }
        public string Religion { get; set; }
        public string ReligionOther { get; set; }
        public String Nationality { get; set; }
        public Int16 CasteCategoryID { get; set; }
        public string Caste { get; set; }
        public string SubCaste { get; set; }
        public string LocalAddress { get; set; }
        public string LocalPincode { get; set; }
        public Int16 LocalStateID { get; set; }
        public Int16 LocalCityID { get; set; }
        public string CityName { get; set; }
        public Int16 LocalDistrictID { get; set; }
        public string DistrictName { get; set; }

        public Boolean IsSamePermanentAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPincode { get; set; }
        public Int16 PermanentStateID { get; set; }
        public Int16 PermanentCityID { get; set; }
        public Int16 PermanentDistrictID { get; set; }

    }

    [WebMethod(EnableSession = true)]
    public string ManageCoach(CoachDetails coachDetails, String WSPassword)
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

                    cmd = new SqlCommand("CoachMasterManage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CoachID", coachDetails.CoachID).DbType = DbType.Int16;

                    if (coachDetails.FirstName == "")
                        cmd.Parameters.AddWithValue("@FirstName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@FirstName", coachDetails.FirstName).DbType = DbType.String;

                    if (coachDetails.MiddleName == "")
                        cmd.Parameters.AddWithValue("@MiddleName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@MiddleName", coachDetails.MiddleName).DbType = DbType.String;

                    if (coachDetails.LastName == "")
                        cmd.Parameters.AddWithValue("@LastName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@LastName", coachDetails.LastName).DbType = DbType.String;

                    if (coachDetails.MobileNo == "")
                        cmd.Parameters.AddWithValue("@MobileNo", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@MobileNo", coachDetails.MobileNo).DbType = DbType.String;

                    if (coachDetails.EmailID == "")
                        cmd.Parameters.AddWithValue("@EmailID", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@EmailID", coachDetails.EmailID).DbType = DbType.String;

                    if (coachDetails.Password == "")
                        cmd.Parameters.AddWithValue("@Password", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Password", coachDetails.Password).DbType = DbType.String;

                    if (coachDetails.Gender == "")
                        cmd.Parameters.AddWithValue("@Gender", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Gender", coachDetails.Gender).DbType = DbType.String;

                    if (coachDetails.DOB == "")
                        cmd.Parameters.AddWithValue("@DOB", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@DOB", coachDetails.DOB.Substring(3, 2) + "/" + coachDetails.DOB.Substring(0, 2) + "/" + coachDetails.DOB.Substring(6, 4)).DbType = DbType.DateTime;

                    if (coachDetails.BloodGroupID == 0)
                        cmd.Parameters.AddWithValue("@BloodGroupID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@BloodGroupID", coachDetails.BloodGroupID).DbType = DbType.Int16;

                    if (coachDetails.DOJ == "")
                        cmd.Parameters.AddWithValue("@DateOfJoin", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@DateOfJoin", coachDetails.DOJ.Substring(3, 2) + "/" + coachDetails.DOJ.Substring(0, 2) + "/" + coachDetails.DOJ.Substring(6, 4)).DbType = DbType.DateTime;

                    if (coachDetails.LocalAddress == "")
                        cmd.Parameters.AddWithValue("@LocalAddress", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@LocalAddress", coachDetails.LocalAddress).DbType = DbType.String;

                    if (coachDetails.LocalPincode == "")
                        cmd.Parameters.AddWithValue("@LocalPincode", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@LocalPincode", coachDetails.LocalPincode).DbType = DbType.String;

                    if (coachDetails.LocalCityID == 0)
                        cmd.Parameters.AddWithValue("@LocalCityID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@LocalCityID", coachDetails.LocalCityID).DbType = DbType.Int16;

                    if (coachDetails.LocalDistrictID == 0)
                        cmd.Parameters.AddWithValue("@LocalDistrictID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@LocalDistrictID", coachDetails.LocalDistrictID).DbType = DbType.Int16;

                    cmd.Parameters.AddWithValue("@IsSamePermanentAddress", coachDetails.IsSamePermanentAddress).DbType = DbType.Boolean;

                    if (coachDetails.PermanentAddress == "")
                        cmd.Parameters.AddWithValue("@PermanentAddress", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@PermanentAddress", coachDetails.PermanentAddress).DbType = DbType.String;

                    if (coachDetails.PermanentPincode == "")
                        cmd.Parameters.AddWithValue("@PermanentPincode", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@PermanentPincode", coachDetails.PermanentPincode).DbType = DbType.String;

                    if (coachDetails.PermanentCityID == 0)
                        cmd.Parameters.AddWithValue("@PermanentCityID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@PermanentCityID", coachDetails.PermanentCityID).DbType = DbType.Int16;

                    if (coachDetails.PermanentDistrictID == 0)
                        cmd.Parameters.AddWithValue("@PermanentDistrictID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@PermanentDistrictID", coachDetails.PermanentDistrictID).DbType = DbType.Int16;

                    if (coachDetails.ReligionID == 0)
                        cmd.Parameters.AddWithValue("@ReligionID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@ReligionID", coachDetails.ReligionID).DbType = DbType.Int16;

                    if (coachDetails.ReligionOther == "")
                        cmd.Parameters.AddWithValue("@ReligionOther", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@ReligionOther", coachDetails.ReligionOther).DbType = DbType.String;

                    if (coachDetails.Nationality == "")
                        cmd.Parameters.AddWithValue("@Nationality", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Nationality", coachDetails.Nationality).DbType = DbType.String;

                    if (coachDetails.CasteCategoryID == 0)
                        cmd.Parameters.AddWithValue("@CasteCategoryID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@CasteCategoryID", coachDetails.CasteCategoryID).DbType = DbType.Int16;

                    if (coachDetails.Caste == "")
                        cmd.Parameters.AddWithValue("@Caste", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Caste", coachDetails.Caste).DbType = DbType.String;

                    if (coachDetails.SubCaste == "")
                        cmd.Parameters.AddWithValue("@SubCaste", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@SubCaste", coachDetails.SubCaste).DbType = DbType.String;


                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();
                    
                    if (coachDetails.CoachID == 0)
                        msg = "Coach details inserted successfully.";
                    else
                        msg = "Coach details updated successfully.";
                }
                else
                    msg = "SessionExpire";
            }
        }
        catch (Exception e)
        {
            msg = "CatchError" + e.Message;
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
    public string GetCoachDetailList(int pageIndex, int PageSize, String WSPassword, CoachDetails coachDetails)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("CoachMasterGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
            
            cmd.Parameters.AddWithValue("@CoachName",coachDetails.CoachName).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@EmailID", coachDetails.EmailID).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@MobileNo", coachDetails.MobileNo).DbType = DbType.String;
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
    public string DeleteCoachDetails(Int64 CoachID, String WSPassword)
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

                    cmd = new SqlCommand("CoachMasterDeleteByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CoachID", CoachID).DbType = DbType.Int64;                 
                    cmd.ExecuteNonQuery();
                    msg = "Coach details deleted successfully.";
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

    public List<CoachDetails> GetCoachDetailsByID(Int64 CoachID, String WSPassword)
    {
        List<CoachDetails> list = new List<CoachDetails>();
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
                    cmd = new SqlCommand("CoachMasterGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;                
                    cmd.Parameters.AddWithValue("@CoachID", CoachID).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        list.Add(new CoachDetails
                        {

                            CoachID = Convert.ToInt64(ds.Tables[0].Rows[0]["CoachID"].ToString()),
                          

                            FirstName = ds.Tables[0].Rows[0]["FirstName"].ToString(),
                            MiddleName = ds.Tables[0].Rows[0]["MiddleName"].ToString(),
                            LastName = ds.Tables[0].Rows[0]["LastName"].ToString(),                           
                            DOJ = ds.Tables[0].Rows[0]["DateOfJoin"].ToString(),
                            MobileNo = ds.Tables[0].Rows[0]["MobileNo"].ToString(),
                            EmailID = ds.Tables[0].Rows[0]["EmailID"].ToString(),                           
                            Gender = ds.Tables[0].Rows[0]["Gender"].ToString(),
                            GenderText = ds.Tables[0].Rows[0]["GenderText"].ToString(),
                            DOB = ds.Tables[0].Rows[0]["DOB"].ToString(),
                            BloodGroupID = Convert.ToInt16(ds.Tables[0].Rows[0]["BloodGroupID"].ToString()),
                            BloodGroup = ds.Tables[0].Rows[0]["BloodGroup"].ToString(),
                            Nationality = ds.Tables[0].Rows[0]["Nationality"].ToString(),
                            Password  = ds.Tables[0].Rows[0]["Password"].ToString(),
                            CasteCategoryID = Convert.ToInt16(ds.Tables[0].Rows[0]["CasteCategoryID"].ToString()),
                            Caste = ds.Tables[0].Rows[0]["Caste"].ToString(),
                            SubCaste = ds.Tables[0].Rows[0]["SubCaste"].ToString(),
                            ReligionID = Convert.ToInt16(ds.Tables[0].Rows[0]["ReligionID"].ToString()),
                            Religion = ds.Tables[0].Rows[0]["Religion"].ToString(),
                            ReligionOther = ds.Tables[0].Rows[0]["ReligionOther"].ToString(),                        

                            LocalAddress = ds.Tables[0].Rows[0]["LocalAddress"].ToString(),
                            LocalPincode = ds.Tables[0].Rows[0]["LocalPincode"].ToString(),
                            LocalStateID = Convert.ToInt16(ds.Tables[0].Rows[0]["LocalStateID"].ToString()),
                            LocalCityID = Convert.ToInt16(ds.Tables[0].Rows[0]["LocalCityID"].ToString()),
                            CityName = ds.Tables[0].Rows[0]["CityName"].ToString(),
                            LocalDistrictID = Convert.ToInt16(ds.Tables[0].Rows[0]["LocalDistrictID"].ToString()),
                            DistrictName = ds.Tables[0].Rows[0]["DistrictName"].ToString(),

                            IsSamePermanentAddress = Convert.ToBoolean(ds.Tables[0].Rows[0]["IsSamePermanentAddress"].ToString()),
                            PermanentAddress = ds.Tables[0].Rows[0]["PermanentAddress"].ToString(),
                            PermanentPincode = ds.Tables[0].Rows[0]["PermanentPincode"].ToString(),
                            PermanentStateID = Convert.ToInt16(ds.Tables[0].Rows[0]["PermanentStateID"].ToString()),
                            PermanentCityID = Convert.ToInt16(ds.Tables[0].Rows[0]["PermanentCityID"].ToString()),
                            PermanentDistrictID = Convert.ToInt16(ds.Tables[0].Rows[0]["PermanentDistrictID"].ToString()),

                        });
                    }
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

    [WebMethod(EnableSession = true)]
    public bool CheckMobileNoExists(string MobileNo, String WSPassword)
    {
        bool IsExist = false;
        SqlConnection conn = new SqlConnection(Global.ConnString);
        try
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = null;
            cmd = new SqlCommand("CoachMasterMobileNoCheckExists", conn);
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
    public bool CheckEmailIDExists(string EmailID, String WSPassword)
    {
        bool IsExist = false;
        SqlConnection conn = new SqlConnection(Global.ConnString);
        try
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = null;
            cmd = new SqlCommand("CoachMasterEmailIDCheckExists", conn);
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
}
