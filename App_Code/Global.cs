using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Global
/// </summary>
public class Global
{
    public Global()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public static string DefaultSystemName = "SOFT ACADEMY";
    public static string DefaultSystemName2 = " ";

    public static string SEO_keywords = Global.DefaultSystemName + ",SOFT ACADEMY";
    public static string SEO_description = Global.DefaultSystemName + " ";
    public static string SEO_author = "JAIMINI SOFTWARE";

    public static string EncryptKey = "SoftAcadEncKey2021";
    public static string WSPassword = "SoftAcadWSPass2021";

    public static string ConnString = "Data Source=DESKTOP-CCGKBQ7;Initial Catalog=SoftAcademy; Integrated Security=True;";
    public static SqlConnection conn = new SqlConnection(ConnString);

    public static string MachineName = HttpContext.Current.Server.MachineName;

}