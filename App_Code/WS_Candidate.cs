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
public class WS_Candidate : System.Web.Services.WebService
{
    private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

    public WS_Candidate()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public string GetCandidateDetailList(int pageIndex, int PageSize,CandidateDetails candidateDetails, string WSPassword)
    {
        string msg = string.Empty;
        SqlCommand cmd = new SqlCommand();
        SqlConnection con = new SqlConnection();
        try
        {
            con = new SqlConnection(Global.ConnString);
            if (con.State == ConnectionState.Closed)
                con.Open();

            cmd = new SqlCommand("CandidateMasterGet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@PageSize", PageSize).DbType = DbType.Int32;
            cmd.Parameters.AddWithValue("@CandidateName", candidateDetails.CandidateName).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@EmailID", candidateDetails.EmailID).DbType = DbType.String;
            cmd.Parameters.AddWithValue("@MobileNo", candidateDetails.MobileNo).DbType = DbType.String;
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

}
