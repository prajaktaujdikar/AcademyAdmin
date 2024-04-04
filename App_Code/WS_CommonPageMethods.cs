using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_CommonPageMethods
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_CommonPageMethods : System.Web.Services.WebService
{

    public WS_CommonPageMethods()
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
    public string Logout(String WSPassword)
    {
        string str = string.Empty;
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                HttpContext.Current.Session.Abandon();
                HttpContext.Current.Session.Clear();
                HttpContext.Current.Session.RemoveAll();
                HttpContext.Current.Response.Cookies.Clear();

                str = "logout";
            }
        }
        catch (Exception ex)
        {
            str = "Error" + ex.Message;
        }
        return str;
    }

    [WebMethod(EnableSession = true)]
    public string CoachLogout(String WSPassword)
    {
        string str = string.Empty;
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                HttpContext.Current.Session.Abandon();
                HttpContext.Current.Session.Clear();
                HttpContext.Current.Session.RemoveAll();
                HttpContext.Current.Response.Cookies.Clear();

                str = "logout";
            }
        }
        catch (Exception ex)
        {
            str = "Error" + ex.Message;
        }
        return str;
    }

    #region UserTpe
    public class UserTpeList
    {
        public Int16 UserTypeID { get; set; }
        public string UserType { get; set; }
        public Int64 UserID { get; set; }
        public Boolean IsMain { get; set; }
      
    }

    [WebMethod(EnableSession = true)]
    public List<UserTpeList> GetUserTypeList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<UserTpeList> list = new List<UserTpeList>();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("UserTypeMasterGet", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                while (sdr.Read())
                {
                    list.Add(new UserTpeList
                    {
                        UserTypeID = Convert.ToInt16(sdr["UserTypeID"].ToString()),
                        UserType = sdr["UserType"].ToString(),
                    });
                }
            }
            return list;
        }
        catch (Exception ex)
        {
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return list;
    }

    #endregion

    #region BloodGroup
    public class BloodGroupList
    {
        public Int16 BloodGroupID { get; set; }
        public string BloodGroup { get; set; }
        public Int16 OrderNo { get; set; }

    }

    [WebMethod(EnableSession = true)]
    public List<BloodGroupList> GetBloodGroupList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<BloodGroupList> list = new List<BloodGroupList>();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("C_BloodGroupMasterGet", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                while (sdr.Read())
                {
                    list.Add(new BloodGroupList
                    {
                        BloodGroupID = Convert.ToInt16(sdr["BloodGroupID"].ToString()),
                        BloodGroup = sdr["BloodGroup"].ToString(),
                    });
                }
            }
            return list;
        }
        catch (Exception ex)
        {

        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return list;
    }
    #endregion

    #region Cast
    public class CasteReligionList
    {
        public Int16 CasteCategoryID { get; set; }
        public string CasteCategory { get; set; }
        public Int16 OrderNo { get; set; }

    }

    [WebMethod(EnableSession = true)]
    public List<CasteReligionList> GetCasteReligionList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CasteReligionList> list = new List<CasteReligionList>();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("C_CastCategoryMasterGet", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                while (sdr.Read())
                {
                    list.Add(new CasteReligionList
                    {
                        CasteCategoryID = Convert.ToInt16(sdr["CasteCategoryID"].ToString()),
                        CasteCategory = sdr["CasteCategory"].ToString(),
                    });
                }
            }
            return list;
        }
        catch (Exception ex)
        {

        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return list;
    }
    #endregion

    #region ReligionMaster
    public class ReligionMasterList
    {
        public Int16 ReligionID { get; set; }
        public string Religion { get; set; }
        public Boolean IsOther { get; set; }

    }

    [WebMethod(EnableSession = true)]
    public List<ReligionMasterList> GetReligionMasterList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<ReligionMasterList> list = new List<ReligionMasterList>();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("C_ReligionMasterGet", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                while (sdr.Read())
                {
                    list.Add(new ReligionMasterList
                    {
                        ReligionID = Convert.ToInt16(sdr["ReligionID"].ToString()),
                        Religion = sdr["Religion"].ToString(),
                        IsOther = Convert.ToBoolean(sdr["IsOther"].ToString()),
                    });
                }
            }
            return list;
        }
        catch (Exception ex)
        {

        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return list;
    }
    #endregion

    #region SateMaster
    public class SateMasterList
    {
        public Int16 StateID { get; set; }
        public string StateName { get; set; }


    }

    [WebMethod(EnableSession = true)]
    public List<SateMasterList> GetSateMasterList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<SateMasterList> list = new List<SateMasterList>();
        try
        {
            conn = new SqlConnection(Global.ConnString);
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            SqlCommand cmd = new SqlCommand("C_StateMasterGet", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                while (sdr.Read())
                {
                    list.Add(new SateMasterList
                    {
                        StateID = Convert.ToInt16(sdr["StateID"].ToString()),
                        StateName = sdr["StateName"].ToString(),

                    });
                }
            }
            return list;
        }
        catch (Exception ex)
        {

        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return list;
    }
    #endregion

    #region CityDetails
    public class CityDetails
    {
        public Int16 CityID { get; set; }
        public string CityName { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<CityDetails> GetCityByState(Int16 StateID, String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CityDetails> list = new List<CityDetails>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("C_CityMasterGetByStateID", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StateID", StateID).DbType = DbType.Int16;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new CityDetails
                        {
                            CityID = Convert.ToInt16(sdr["CityID"].ToString()),
                            CityName = sdr["CityName"].ToString(),
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

    #endregion

    #region DistrictDetails
    public class DistrictDetails
    {
        public Int16 DistrictID { get; set; }
        public string DistrictName { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<DistrictDetails> GetDistrictByState(Int16 StateID, String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<DistrictDetails> list = new List<DistrictDetails>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("C_DistrictMasterGetByStateID", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StateID", StateID).DbType = DbType.Int16;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new DistrictDetails
                        {
                            DistrictID = Convert.ToInt16(sdr["DistrictID"].ToString()),
                            DistrictName = sdr["DistrictName"].ToString(),
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
    #endregion

    #region LanguageMaster
    public class LanguageMaster
    {
        public Int16 LanguageID { get; set; }
        public string Language { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<LanguageMaster> GetLanguageMasterList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<LanguageMaster> list = new List<LanguageMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("LanguageMasterList", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new LanguageMaster
                        {
                            LanguageID = Convert.ToInt16(sdr["LanguageID"].ToString()),
                            Language = sdr["Language"].ToString(),
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
    #endregion

    #region CourseTypeMaster
    public class CourseTypeMaster
    {
        public Int16 CourseTypeID { get; set; }
        public string CourseType { get; set; }
        public bool IsFree { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<CourseTypeMaster> GetCourseTypeMasterList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CourseTypeMaster> list = new List<CourseTypeMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("CourseTypeMasterList", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new CourseTypeMaster
                        {
                            CourseTypeID = Convert.ToInt16(sdr["CourseTypeID"].ToString()),
                            CourseType = sdr["CourseType"].ToString(),
                            IsFree = Convert.ToBoolean(sdr["IsFree"]),
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
    #endregion

    #region CoachMaster
    public class CoachMaster
    {
        public Int16 CoachID { get; set; }
        public string CoachName { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<CoachMaster> GetCoachMasterList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CoachMaster> list = new List<CoachMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("CoachMasterList", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new CoachMaster
                        {
                            CoachID = Convert.ToInt16(sdr["CoachID"].ToString()),
                            CoachName = sdr["CoachName"].ToString(),
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
    #endregion

    #region CourseMaster
    public class CourseMaster
    {
        public Int16 CourseID { get; set; }
        public string CourseName { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<CourseMaster> GetCourseList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CourseMaster> list = new List<CourseMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("CourseList", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new CourseMaster
                        {
                            CourseID = Convert.ToInt16(sdr["CourseID"].ToString()),
                            CourseName = sdr["CourseTitle"].ToString(),
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
    public List<CourseMaster> GetCourseListForBatch(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CourseMaster> list = new List<CourseMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("CourseListForBatch", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new CourseMaster
                        {
                            CourseID = Convert.ToInt16(sdr["CourseID"].ToString()),
                            CourseName = sdr["CourseTitle"].ToString(),
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
    #endregion

    #region BatchStatusMaster
    public class BatchStatusMaster
    {
        public Int16 BatchStatusID { get; set; }
        public string BatchStatus { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<BatchStatusMaster> GetBatchStatusMasterList(String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<BatchStatusMaster> list = new List<BatchStatusMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("BatchStatusMasterList", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new BatchStatusMaster
                        {
                            BatchStatusID = Convert.ToInt16(sdr["BatchStatusID"].ToString()),
                            BatchStatus = sdr["BatchStatus"].ToString(),
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
            if (conn.State == ConnectionState.Open  )
                conn.Close();
        }
        return list;
    }
    #endregion

    #region CourseDetailMaster
    public class CourseDetailMaster
    {
        public long CourseDetailID { get; set; }
        public string CourseDetailTitle { get; set; }
    }

    [WebMethod(EnableSession = true)]
    public List<CourseDetailMaster> GetCourseDetailListForBatch(long BatchId, String WSPassword)
    {
        SqlConnection conn = new SqlConnection();
        List<CourseDetailMaster> list = new List<CourseDetailMaster>();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                conn = new SqlConnection(Global.ConnString);

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                cmd = new SqlCommand("CourseDetailList", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BatchID", BatchId).DbType = DbType.Int64;
                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        list.Add(new CourseDetailMaster
                        {
                            CourseDetailID = Convert.ToInt16(sdr["CourseDetailID"].ToString()),
                            CourseDetailTitle = sdr["CourseDetailTitle"].ToString(),
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
    #endregion
}
