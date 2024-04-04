using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_ManageCourse
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_ManageCourse : System.Web.Services.WebService
{
    private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

    public WS_ManageCourse()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    #region Course
    [WebMethod(EnableSession = true)]
    public string GetCourseList(int pageIndex, int PageSize,Course course,string WSPassword)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("CourseGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@CourseTitle", course.CourseTitle).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@CourseTypeID", course.CourseTypeID).DbType = DbType.String;
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
    public dynamic ManageCourse(Course course, string WSPassword)
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

                    cmd = new SqlCommand("CourseManage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseID", course.CourseID).DbType = DbType.Int64;

                    if (course.CourseTitle == "")
                        cmd.Parameters.AddWithValue("@CourseTitle", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@CourseTitle", course.CourseTitle).DbType = DbType.String;

                    if (course.CourseTypeID == 0)
                        cmd.Parameters.AddWithValue("@CourseTypeID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@CourseTypeID", course.CourseTypeID).DbType = DbType.Int16;

                    if (course.CourseImageURL == "")
                        cmd.Parameters.AddWithValue("@CourseImageURL", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@CourseImageURL", "").DbType = DbType.String;

                    if (course.CourseDescription == "")
                        cmd.Parameters.AddWithValue("@CourseDescription", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@CourseDescription", course.CourseDescription).DbType = DbType.String;

                    if (course.DescriptiveVideoURL == "")
                        cmd.Parameters.AddWithValue("@DescriptiveVideoURL", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@DescriptiveVideoURL", course.DescriptiveVideoURL).DbType = DbType.String;

                    if (course.Price == 0)
                        cmd.Parameters.AddWithValue("@Price", DBNull.Value).DbType = DbType.Decimal;
                    else
                        cmd.Parameters.AddWithValue("@Price", course.Price).DbType = DbType.Decimal;

                    if (course.SGSTPer == 0)
                        cmd.Parameters.AddWithValue("@SGSTPer", DBNull.Value).DbType = DbType.Decimal;
                    else
                        cmd.Parameters.AddWithValue("@SGSTPer", course.SGSTPer).DbType = DbType.Decimal;

                    if (course.CGSTPer == 0)
                        cmd.Parameters.AddWithValue("@CGSTPer", DBNull.Value).DbType = DbType.Decimal;
                    else
                        cmd.Parameters.AddWithValue("@CGSTPer", course.CGSTPer).DbType = DbType.Decimal;

                    cmd.Parameters.AddWithValue("@IsActive", true).DbType = DbType.Boolean;
                    cmd.Parameters.AddWithValue("@IsSessionRecorded", course.IsSessionRecorded).DbType = DbType.Boolean;
                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();

                    if (course.CourseID == 0)
                        msg = "Course inserted successfully.";
                    else
                        msg = "Course updated successfully.";
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

        long courseID = GetLatestAddedCourseID(course.CourseID);
        return new
        {
            message = msg,
            courseId = courseID
        };
    }

    [WebMethod(EnableSession = true)]
    public string DeleteCourse(long courseID, string WSPassword)
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

                    cmd = new SqlCommand("CourseDeleteByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseId", courseID).DbType = DbType.Int64;
                    cmd.ExecuteNonQuery();
                    msg = "Course detail deleted successfully.";
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
    public string ManageCourseCoach(List<CourseCoach> courseCoaches, string WSPassword)
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
                    foreach (CourseCoach courseCoach in courseCoaches)
                    {
                        cmd = new SqlCommand("CourseCoachManage", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@CourseCoachID", courseCoach.CourseCoachID).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@CourseID", courseCoach.CourseID).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@CoachID", courseCoach.CoachID).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                        cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                        cmd.ExecuteNonQuery();
                    }

                    msg = "Successfully saved";
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
    public string ManageCourseLanguage(List<CourseLanguage> courseLanguages, string WSPassword)
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
                    
                    foreach (CourseLanguage courseLanguage in courseLanguages) {
                        cmd = new SqlCommand("CourseLanguageManage", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@CourseLanguageID", courseLanguage.CourseLanguageID).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@CourseID", courseLanguage.CourseID).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@LanguageID", courseLanguage.LanguageID).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                        cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                        cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                        cmd.ExecuteNonQuery();
                    }

                    msg = "Successfully saved";
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
    public string DeleteCourseLanguage(List<long> courseLanguagesIds, string WSPassword)
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

                    foreach (long id in courseLanguagesIds)
                    {
                        cmd = new SqlCommand("CourseLanguageDeleteByID", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@CourseLanguageID", id).DbType = DbType.Int64;
                        cmd.ExecuteNonQuery();
                    }

                    msg = "Successfully saved";
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
    public string DeleteCourseCoach(List<long> courseCoachIds, string WSPassword)
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

                    foreach (long id in courseCoachIds)
                    {
                        cmd = new SqlCommand("CourseCoachDeleteByID", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@CourseCoachID", id).DbType = DbType.Int64;
                        cmd.ExecuteNonQuery();
                    }

                    msg = "Successfully saved";
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
    public Course GetCourseByID(long courseId, string WSPassword)
    {
        Course course = null;
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
                    cmd = new SqlCommand("CourseGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseID", courseId).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        course = new Course
                        {
                            CourseID = (long)ds.Tables[0].Rows[0]["CourseID"],
                            CourseTypeID = (short)ds.Tables[0].Rows[0]["CourseTypeID"],
                            CourseTitle = ds.Tables[0].Rows[0]["CourseTitle"].ToString(),
                            CourseImageURL = ds.Tables[0].Rows[0]["CourseImageURL"].ToString(),
                            DescriptiveVideoURL = ds.Tables[0].Rows[0]["DescriptiveVideoURL"].ToString(),
                            CourseDescription = ds.Tables[0].Rows[0]["CourseDescription"].ToString(),
                            Price = (decimal)ds.Tables[0].Rows[0]["Price"],
                            CGSTPer = (decimal)ds.Tables[0].Rows[0]["CGSTPer"],
                            SGSTPer = (decimal)ds.Tables[0].Rows[0]["SGSTPer"],
                            IsActive = (bool)ds.Tables[0].Rows[0]["IsActive"],
                            CourseLanguageIds = ds.Tables[0].Rows[0]["CourseLanguageIds"].ToString(),
                            CourseCoachIds = ds.Tables[0].Rows[0]["CourseCoachIds"].ToString(),
                            IsSessionRecorded = (bool)ds.Tables[0].Rows[0]["IsSessionRecorded"],
                        };
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
        return course;
    }

    [WebMethod(EnableSession = true)]
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

    private long GetLatestAddedCourseID(long CourseID)
    {
        SqlConnection conn = new SqlConnection();
        long courseId = 0;
        try
        {
            conn = new SqlConnection(Global.ConnString);
            SqlCommand cmd = new SqlCommand();
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            cmd.Connection = conn;
            cmd.CommandType = CommandType.Text;
            if (CourseID == 0)
            {
                cmd.CommandText = "SELECT TOP 1 CourseID FROM Course ORDER BY InsertTime DESC";
                courseId = (long)cmd.ExecuteScalar();
            }
            else
            {
                courseId = CourseID;
            }
        }
        finally
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        return courseId;
    }
    #endregion

    #region Course Detail
    [WebMethod(EnableSession = true)]
    public string GetCourseDetailList(long courseID, int pageIndex, int PageSize, string WSPassword)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("CourseDetailGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CourseID", courseID).DbType = DbType.Int64;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
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
    public string ManageCourseDetail(CourseDetails courseDetail, string WSPassword)
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
                    cmd = new SqlCommand("CourseDetailManage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseDetailID", courseDetail.CourseDetailID).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@CourseID", courseDetail.CourseID).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@CourseDetailTitle", courseDetail.CourseDetailTitle).DbType = DbType.String;
                    cmd.Parameters.AddWithValue("@CourseDetail", courseDetail.CourseDetail).DbType = DbType.String;
                    cmd.Parameters.AddWithValue("@DescriptiveVideoURL", courseDetail.DescriptiveVideoURL).DbType = DbType.String;
                    cmd.Parameters.AddWithValue("@SessionRecordLink", courseDetail.SessionRecordLink).DbType = DbType.String;
                    cmd.Parameters.AddWithValue("@SessionRecordLinkDescription", courseDetail.SessionRecordLinkDescription).DbType = DbType.String;
                    cmd.Parameters.AddWithValue("@OrderNo", courseDetail.OrderNo).DbType = DbType.Int32;
                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["UserID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();

                    msg = "Successfully saved";
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
    public string DeleteCourseDetail(long courseDetailId, string WSPassword)
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

                    cmd = new SqlCommand("CourseDetailDeleteByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseDetailID", courseDetailId).DbType = DbType.Int64;
                    cmd.ExecuteNonQuery();

                    msg = "Successfully Deleted";
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
    public CourseDetails GetCourseDetailByID(long courseDetailId, string WSPassword)
    {
        CourseDetails courseDetails = null;
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
                    cmd = new SqlCommand("CourseDetailGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseDetailID", courseDetailId).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        courseDetails = new CourseDetails
                        {
                            CourseDetailID = (long)ds.Tables[0].Rows[0]["CourseDetailID"],
                            CourseID = (long)ds.Tables[0].Rows[0]["CourseID"],
                            CourseTitle = ds.Tables[0].Rows[0]["CourseTitle"].ToString(),
                            CourseDetailTitle = ds.Tables[0].Rows[0]["CourseDetailTitle"].ToString(),
                            CourseDetail = ds.Tables[0].Rows[0]["CourseDetail"].ToString(),
                            DescriptiveVideoURL = ds.Tables[0].Rows[0]["DescriptiveVideoURL"].ToString(),
                            OrderNo = (short)ds.Tables[0].Rows[0]["OrderNo"],
                            SessionRecordLink = ds.Tables[0].Rows[0]["SessionRecordLink"].ToString(),
                            SessionRecordLinkDescription = ds.Tables[0].Rows[0]["SessionRecordLinkDescription"].ToString()
                        };
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
        return courseDetails;
    }
    #endregion
}

public class Course
{
    public long CourseID { get; set; }
    public string CourseTitle { get; set; }
    public short CourseTypeID { get; set; }
    public string CourseImageURL { get; set; }
    public string CourseDescription { get; set; }
    public string DescriptiveVideoURL { get; set; }
    public decimal Price { get; set; }
    public decimal SGSTPer { get; set; }
    public decimal CGSTPer { get; set; }
    public bool? IsActive { get; set; }
    public string CourseLanguageIds { get; set; }
    public string CourseCoachIds { get; set; }
    public bool? IsSessionRecorded { get; set; }
}

public class CourseCoach
{
    public long CourseCoachID { get; set; }
    public long CourseID { get; set; }
    public long CoachID { get; set; }
}

public class CourseLanguage
{
    public long CourseLanguageID { get; set; }
    public long CourseID { get; set; }
    public long LanguageID { get; set; }
}

public class CourseDetails
{
    public long CourseDetailID { get; set; }
    public long CourseID { get; set; }
    public string CourseTitle { get; set; }
    public string CourseDetailTitle { get; set; }
    public string CourseDetail { get; set; }
    public string DescriptiveVideoURL { get; set; }
    public short OrderNo { get; set; }
    public bool IsSessionRecorded { get; set; }
    public string SessionRecordLink { get; set; }
    public string SessionRecordLinkDescription { get; set; }
}
