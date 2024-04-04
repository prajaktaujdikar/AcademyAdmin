using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_ManageCandidate
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_CandidateUpdate : System.Web.Services.WebService
{
    private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

    public WS_CandidateUpdate()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public string UpdateCandidate(CandidateDetails candidateDetails, String WSPassword)
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

                    cmd = new SqlCommand("CandidateMasterUpdate", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CandidateID", candidateDetails.CandidateID).DbType = DbType.Int16;

                    if (candidateDetails.FirstName == "")
                        cmd.Parameters.AddWithValue("@FirstName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@FirstName", candidateDetails.FirstName).DbType = DbType.String;

                    if (candidateDetails.MiddleName == "")
                        cmd.Parameters.AddWithValue("@MiddleName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@MiddleName", candidateDetails.MiddleName).DbType = DbType.String;

                    if (candidateDetails.LastName == "")
                        cmd.Parameters.AddWithValue("@LastName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@LastName", candidateDetails.LastName).DbType = DbType.String;

                    if (candidateDetails.MobileNo == "")
                        cmd.Parameters.AddWithValue("@MobileNo", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@MobileNo", candidateDetails.MobileNo).DbType = DbType.String;

                    if (candidateDetails.EmailID == "")
                        cmd.Parameters.AddWithValue("@EmailID", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@EmailID", candidateDetails.EmailID).DbType = DbType.String;

                    if (candidateDetails.Gender == "")
                        cmd.Parameters.AddWithValue("@Gender", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Gender", candidateDetails.Gender).DbType = DbType.String;

                    if (candidateDetails.DOB == "")
                        cmd.Parameters.AddWithValue("@DOB", DBNull.Value).DbType = DbType.DateTime;
                    else
                        cmd.Parameters.AddWithValue("@DOB", candidateDetails.DOB.Substring(3, 2) + "/" + candidateDetails.DOB.Substring(0, 2) + "/" + candidateDetails.DOB.Substring(6, 4)).DbType = DbType.DateTime;

                    if (candidateDetails.BloodGroupID == 0)
                        cmd.Parameters.AddWithValue("@BloodGroupID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@BloodGroupID", candidateDetails.BloodGroupID).DbType = DbType.Int16;

                    if (candidateDetails.Nationality == "")
                        cmd.Parameters.AddWithValue("@Nationality", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Nationality", candidateDetails.Nationality).DbType = DbType.String;

                    if (candidateDetails.CasteCategoryID == 0)
                        cmd.Parameters.AddWithValue("@CasteCategoryID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@CasteCategoryID", candidateDetails.CasteCategoryID).DbType = DbType.Int16;

                    if (candidateDetails.Caste == "")
                        cmd.Parameters.AddWithValue("@Caste", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@Caste", candidateDetails.Caste).DbType = DbType.String;

                    if (candidateDetails.SubCaste == "")
                        cmd.Parameters.AddWithValue("@SubCaste", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@SubCaste", candidateDetails.SubCaste).DbType = DbType.String;

                    if (candidateDetails.ReligionID == 0)
                        cmd.Parameters.AddWithValue("@ReligionID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@ReligionID", candidateDetails.ReligionID).DbType = DbType.Int16;

                    if (candidateDetails.ReligionOther == "")
                        cmd.Parameters.AddWithValue("@ReligionOther", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@ReligionOther", candidateDetails.ReligionOther).DbType = DbType.String;

                    if (candidateDetails.LocalAddress == "")
                        cmd.Parameters.AddWithValue("@LocalAddress", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@LocalAddress", candidateDetails.LocalAddress).DbType = DbType.String;

                    if (candidateDetails.LocalPincode == "")
                        cmd.Parameters.AddWithValue("@LocalPincode", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@LocalPincode", candidateDetails.LocalPincode).DbType = DbType.String;

                    if (candidateDetails.LocalCityID == 0)
                        cmd.Parameters.AddWithValue("@LocalCityID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@LocalCityID", candidateDetails.LocalCityID).DbType = DbType.Int16;

                    if (candidateDetails.LocalDistrictID == 0)
                        cmd.Parameters.AddWithValue("@LocalDistrictID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@LocalDistrictID", candidateDetails.LocalDistrictID).DbType = DbType.Int16;

                    cmd.Parameters.AddWithValue("@IsSamePermanentAddress", candidateDetails.IsSamePermanentAddress).DbType = DbType.Boolean;

                    if (candidateDetails.PermanentAddress == "")
                        cmd.Parameters.AddWithValue("@PermanentAddress", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@PermanentAddress", candidateDetails.PermanentAddress).DbType = DbType.String;

                    if (candidateDetails.PermanentPincode == "")
                        cmd.Parameters.AddWithValue("@PermanentPincode", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@PermanentPincode", candidateDetails.PermanentPincode).DbType = DbType.String;

                    if (candidateDetails.PermanentCityID == 0)
                        cmd.Parameters.AddWithValue("@PermanentCityID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@PermanentCityID", candidateDetails.PermanentCityID).DbType = DbType.Int16;

                    if (candidateDetails.PermanentDistrictID == 0)
                        cmd.Parameters.AddWithValue("@PermanentDistrictID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@PermanentDistrictID", candidateDetails.PermanentDistrictID).DbType = DbType.Int16;

                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();

                    if (candidateDetails.CandidateID == 0)
                        msg = "candidate Details inserted successfully.";
                    else
                        msg = "candidate Details updated successfully.";
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
    public List<CandidateDetails> GetCandidateDetailsByID(Int64 CandidateID, String WSPassword)
    {
        List<CandidateDetails> list = new List<CandidateDetails>();
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
                    cmd = new SqlCommand("CandidateMasterGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CandidateID", CandidateID).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        list.Add(new CandidateDetails
                        {
                            CandidateID = Convert.ToInt64(ds.Tables[0].Rows[0]["CandidateID"].ToString()),
                            FirstName = ds.Tables[0].Rows[0]["FirstName"].ToString(),
                            MiddleName = ds.Tables[0].Rows[0]["MiddleName"].ToString(),
                            LastName = ds.Tables[0].Rows[0]["LastName"].ToString(),
                            MobileNo = ds.Tables[0].Rows[0]["MobileNo"].ToString(),
                            EmailID = ds.Tables[0].Rows[0]["EmailID"].ToString(),
                            Gender = ds.Tables[0].Rows[0]["Gender"].ToString(),
                            GenderText = ds.Tables[0].Rows[0]["GenderText"].ToString(),
                            DOB = ds.Tables[0].Rows[0]["DOB"].ToString(),
                            BloodGroupID = Convert.ToInt16(ds.Tables[0].Rows[0]["BloodGroupID"].ToString()),
                            BloodGroup = ds.Tables[0].Rows[0]["BloodGroup"].ToString(),
                            Nationality = ds.Tables[0].Rows[0]["Nationality"].ToString(),
                            CasteCategoryID = Convert.ToInt16(ds.Tables[0].Rows[0]["CasteCategoryID"].ToString()),
                            CasteCategory = ds.Tables[0].Rows[0]["CasteCategory"].ToString(),
                            Caste = ds.Tables[0].Rows[0]["Caste"].ToString(),
                            SubCaste = ds.Tables[0].Rows[0]["SubCaste"].ToString(),
                            ReligionID = Convert.ToInt16(ds.Tables[0].Rows[0]["ReligionID"].ToString()),
                            Religion = ds.Tables[0].Rows[0]["Religion"].ToString(),
                            ReligionOther = ds.Tables[0].Rows[0]["ReligionOther"].ToString(),

                            LocalAddress = ds.Tables[0].Rows[0]["LocalAddress"].ToString(),
                            LocalPincode = ds.Tables[0].Rows[0]["LocalPincode"].ToString(),
                            LocalStateID = Convert.ToInt16(ds.Tables[0].Rows[0]["LocalStateID"].ToString()),
                            LocalStateName = ds.Tables[0].Rows[0]["LocalStateName"].ToString(),
                            LocalCityID = Convert.ToInt16(ds.Tables[0].Rows[0]["LocalCityID"].ToString()),
                            CityName = ds.Tables[0].Rows[0]["CityName"].ToString(),
                            LocalDistrictID = Convert.ToInt16(ds.Tables[0].Rows[0]["LocalDistrictID"].ToString()),
                            DistrictName = ds.Tables[0].Rows[0]["DistrictName"].ToString(),

                            IsSamePermanentAddress = Convert.ToBoolean(ds.Tables[0].Rows[0]["IsSamePermanentAddress"].ToString()),
                            PermanentAddress = ds.Tables[0].Rows[0]["PermanentAddress"].ToString(),
                            PermanentPincode = ds.Tables[0].Rows[0]["PermanentPincode"].ToString(),
                            PermanentStateID = Convert.ToInt16(ds.Tables[0].Rows[0]["PermanentStateID"].ToString()),
                            PermanentStateName = ds.Tables[0].Rows[0]["PermanentStateName"].ToString(),
                            PermanentCityID = Convert.ToInt16(ds.Tables[0].Rows[0]["PermanentCityID"].ToString()),
                            PermanentCityName = ds.Tables[0].Rows[0]["PermanentCityName"].ToString(),
                            PermanentDistrictID = Convert.ToInt16(ds.Tables[0].Rows[0]["PermanentDistrictID"].ToString()),
                            PermanentDistrictName = ds.Tables[0].Rows[0]["PermanentDistrictName"].ToString(),
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
    public bool CheckMobileNoExists(string MobileNo, String WSPassword, Int64 CandidateId = 0)
    {
        bool IsExist = false;
        SqlConnection conn = new SqlConnection(Global.ConnString);
        try
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = null;
            cmd = new SqlCommand("CandidateMasterMobileNoCheckExists", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CandidateID", CandidateId).DbType = DbType.Int64;
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
            cmd = new SqlCommand("CandidateMasterEmailIDCheckExists", conn);
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
public class CandidateDetails
{
    public Int64 CandidateID { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string CandidateName { get; set; }
    public string MobileNo { get; set; }
    public string EmailID { get; set; }
    public string Gender { get; set; }
    public string GenderText { get; set; }
    public string DOB { get; set; }
    public Int16 BloodGroupID { get; set; }
    public string BloodGroup { get; set; }
    public String Nationality { get; set; }
    public Int16 CasteCategoryID { get; set; }
    public string CasteCategory { get; set; }
    public string Caste { get; set; }
    public string SubCaste { get; set; }
    public Int16 ReligionID { get; set; }
    public string Religion { get; set; }
    public string ReligionOther { get; set; }
    public string LocalAddress { get; set; }
    public string LocalPincode { get; set; }
    public Int16 LocalCityID { get; set; }
    public string CityName { get; set; }
    public Int16 LocalStateID { get; set; }
    public string LocalStateName { get; set; }
    public Int16 LocalDistrictID { get; set; }
    public string DistrictName { get; set; }
    public Boolean IsSamePermanentAddress { get; set; }
    public string PermanentAddress { get; set; }
    public string PermanentPincode { get; set; }
    public Int16 PermanentStateID { get; set; }
    public string PermanentStateName { get; set; }
    public Int16 PermanentCityID { get; set; }
    public string PermanentCityName { get; set; }
    public Int16 PermanentDistrictID { get; set; }
    public string PermanentDistrictName { get; set; }
}
