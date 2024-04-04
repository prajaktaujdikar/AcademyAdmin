using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WS_ManageBatch
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WS_ManageBatch : System.Web.Services.WebService
{
    private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

    public WS_ManageBatch()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public string ManageBatch(Batch batch, string WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();

        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["CoachID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);
                    if (conn.State == ConnectionState.Closed)
                        conn.Open();

                    cmd = new SqlCommand("BatchManage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BatchID", batch.BatchID).DbType = DbType.Int64;
                    DateTime currentDateTime = DateTime.UtcNow;
                    Guid id = Guid.NewGuid();
                    string batchNo = currentDateTime.Year.ToString() + currentDateTime.Month.ToString() + currentDateTime.Day.ToString() + currentDateTime.Hour.ToString() + currentDateTime.Minute + id.ToString().Substring(0, 5);
                    cmd.Parameters.AddWithValue("@BatchNo", batchNo).DbType = DbType.String;

                    if (batch.CourseID == 0)
                        cmd.Parameters.AddWithValue("@CourseID", DBNull.Value).DbType = DbType.Int64;
                    else
                        cmd.Parameters.AddWithValue("@CourseID", batch.CourseID).DbType = DbType.Int64;

                    if (batch.BatchName == "")
                        cmd.Parameters.AddWithValue("@BatchName", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@BatchName", batch.BatchName).DbType = DbType.String;

                    if (batch.BatchStatusID == 0)
                        cmd.Parameters.AddWithValue("@BatchStatusID", DBNull.Value).DbType = DbType.Int16;
                    else
                        cmd.Parameters.AddWithValue("@BatchStatusID", batch.BatchStatusID).DbType = DbType.Int16;

                    TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["CoachID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["CoachID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();

                    if (batch.BatchID == 0)
                        msg = "Batch inserted successfully.";
                    else
                        msg = "Batch updated successfully.";
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
    public string GetBatchList(int pageIndex, int PageSize, Batch batch, string WSPassword)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("BatchGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@BatchName", batch.BatchName).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@CourseID", batch.CourseID).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@BatchStatusID", batch.BatchStatusID).DbType = DbType.String;
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
    public string DeleteBatch(long batchID, string WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["CoachID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);
                    if (conn.State == ConnectionState.Closed)
                        conn.Open();

                    cmd = new SqlCommand("BatchDeleteByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BatchId", batchID).DbType = DbType.Int64;
                    cmd.ExecuteNonQuery();
                    msg = "Batch deleted successfully.";
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
    public Batch GetBatchByID(long batchId, string WSPassword)
    {
        Batch batch = null;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["CoachID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);

                    if (conn.State == ConnectionState.Closed)
                        conn.Open();
                    cmd = new SqlCommand("BatchGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BatchId", batchId).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        batch = new Batch
                        {
                            BatchID = (long)ds.Tables[0].Rows[0]["BatchID"],
                            CourseID = (long)ds.Tables[0].Rows[0]["CourseID"],
                            BatchName = ds.Tables[0].Rows[0]["BatchName"].ToString(),
                            BatchStatusID = (short)ds.Tables[0].Rows[0]["BatchStatusID"],
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
        return batch;
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

    #region ManageBatchDetail
    [WebMethod(EnableSession = true)]
    public string ManageBatchDetail(BatchDetail batchDetail, string WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();

        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["CoachID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);
                    if (conn.State == ConnectionState.Closed)
                        conn.Open();

                    cmd = new SqlCommand("BatchDetailManage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BatchDetailID", batchDetail.BatchDetailID).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@BatchID", batchDetail.BatchID).DbType = DbType.Int64;

                    if (batchDetail.CourseDetailID == 0)
                        cmd.Parameters.AddWithValue("@CourseDetailID", DBNull.Value).DbType = DbType.Int64;
                    else
                        cmd.Parameters.AddWithValue("@CourseDetailID", batchDetail.CourseDetailID).DbType = DbType.Int64;

                    if (batchDetail.SessionDateTime == null)
                        cmd.Parameters.AddWithValue("@SessionDateTime", DBNull.Value).DbType = DbType.DateTime;
                    else
                        cmd.Parameters.AddWithValue("@SessionDateTime", batchDetail.SessionDateTime).DbType = DbType.DateTime;

                    if (batchDetail.SessionLiveLink == "")
                        cmd.Parameters.AddWithValue("@SessionLiveLink", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@SessionLiveLink", batchDetail.SessionLiveLink).DbType = DbType.String;

                    if (batchDetail.SessionLiveLinkDesc == "")
                        cmd.Parameters.AddWithValue("@SessionLiveLinkDesc", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@SessionLiveLinkDesc", batchDetail.SessionLiveLinkDesc).DbType = DbType.String;
                    
                    cmd.Parameters.AddWithValue("@IsSessionLive", batchDetail.IsSessionLive).DbType = DbType.Boolean;
                    cmd.Parameters.AddWithValue("@IsActive", true).DbType = DbType.Boolean;
                   
                    if (batchDetail.SessionRecordLink == "")
                        cmd.Parameters.AddWithValue("@SessionRecordLink", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@SessionRecordLink", batchDetail.SessionRecordLink).DbType = DbType.String;
                    
                    if (batchDetail.SessionRecordLinkDesc == "")
                        cmd.Parameters.AddWithValue("@SessionRecordLinkDesc", DBNull.Value).DbType = DbType.String;
                    else
                        cmd.Parameters.AddWithValue("@SessionRecordLinkDesc", batchDetail.SessionRecordLinkDesc).DbType = DbType.String;
                    
                    TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                    cmd.Parameters.AddWithValue("@UpdateBy", HttpContext.Current.Session["CoachID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@InsertTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.Parameters.AddWithValue("@InsertBy", HttpContext.Current.Session["CoachID"]).DbType = DbType.Int64;
                    cmd.Parameters.AddWithValue("@UpdateTime", TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE)).DbType = DbType.DateTime;
                    cmd.ExecuteNonQuery();

                    if (batchDetail.BatchDetailID == 0)
                        msg = "Batch Detail inserted successfully.";
                    else
                        msg = "Batch Detail updated successfully.";
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
    public string GetBatchDetailList(int pageIndex, int PageSize,long batchId, string WSPassword)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("BatchDetailGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@BatchID", batchId).DbType = DbType.Int64;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
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
    public string DeleteBatchDetail(long batchDetailID, string WSPassword)
    {
        string msg = string.Empty;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["CoachID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);
                    if (conn.State == ConnectionState.Closed)
                        conn.Open();

                    cmd = new SqlCommand("BatchDeleteByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BatchDetailID", batchDetailID).DbType = DbType.Int64;
                    cmd.ExecuteNonQuery();
                    msg = "Batch Detail deleted successfully.";
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
    public BatchDetail GetBatchDetailByID(long batchDetailID, string WSPassword)
    {
        BatchDetail batch = null;
        SqlConnection conn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        try
        {
            if (WSPassword == Global.WSPassword)
            {
                if (HttpContext.Current.Session["CoachID"] != null)
                {
                    conn = new SqlConnection(Global.ConnString);

                    if (conn.State == ConnectionState.Closed)
                        conn.Open();
                    cmd = new SqlCommand("BatchDetailGetByID", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BatchDetailID", batchDetailID).DbType = DbType.Int64;

                    SqlDataAdapter adp = new SqlDataAdapter(cmd);
                    DataSet ds = new DataSet();
                    adp.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        batch = new BatchDetail
                        {
                            BatchID = (long)ds.Tables[0].Rows[0]["BatchID"],
                            CourseDetailID = (long)ds.Tables[0].Rows[0]["CourseDetailID"],
                            CourseDetailTitle = ds.Tables[0].Rows[0]["CourseDetailTitle"].ToString(),
                            SessionDateTime = (DateTime)ds.Tables[0].Rows[0]["SessionDateTime"],
                            SessionLiveLink = (string)ds.Tables[0].Rows[0]["SessionLiveLink"],
                            SessionLiveLinkDesc = (string)ds.Tables[0].Rows[0]["SessionLiveLinkDescription"],
                            IsSessionLive = (bool)ds.Tables[0].Rows[0]["IsSessionLive"],
                            SessionRecordLink = (string)ds.Tables[0].Rows[0]["SessionRecordLink"],
                            SessionRecordLinkDesc = (string)ds.Tables[0].Rows[0]["SessionRecordLinkDescription"],
                            IsActive = (bool)ds.Tables[0].Rows[0]["IsActive"],
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
        return batch;
    }
    #endregion
}
public class Batch
{
    public long BatchID { get; set; }
    public string BatchNo { get; set; }
    public string BatchName { get; set; }
    public short BatchStatusID { get; set; }
    public long CourseID { get; set; }
    public string CourseTitle { get; set; }
    public string BatchStatus { get; set; }
}

public class BatchDetail
{
    public long BatchDetailID { get; set; }
    public long BatchID { get; set; }
    public long CourseDetailID { get; set; }
    public string CourseDetailTitle { get; set; }
    public DateTime SessionDateTime { get; set; }
    public string SessionLiveLink { get; set; }
    public string SessionLiveLinkDesc { get; set; }
    public bool IsSessionLive { get; set; }
    public string SessionRecordLink { get; set; }
    public string SessionRecordLinkDesc { get; set; }
    public bool IsActive { get; set; }
}




























