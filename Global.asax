<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>

<script RunAt="server">

    void Application_Start(object sender, EventArgs e)
    {

        RegisterRoutes(RouteTable.Routes);
    }
    static void RegisterRoutes(RouteCollection routes)
    {
        routes.MapPageRoute("SelectUser", "SelectUser", "~/DefaultPage.aspx");

        routes.MapPageRoute("Login", "Login", "~/AdminLogin.aspx");
          routes.MapPageRoute("ManageUser", "ManageUser", "~/ManageUser.aspx");
        routes.MapPageRoute("LogoutPage", "LogoutPage", "~/Logout.aspx");
        routes.MapPageRoute("ManageCoach", "ManageCoach", "~/ManageCoach.aspx");
        routes.MapPageRoute("Candidate", "Candidate", "~/Candidate.aspx");
        routes.MapPageRoute("CandidateUpdate", "CandidateUpdate/{candidateID}", "~/CandidateUpdate.aspx");
        routes.MapPageRoute("ManageCourse", "ManageCourse", "~/ManageCourse.aspx");
        routes.MapPageRoute("Dashboard", "Dashboard", "~/Dashboard.aspx");

        routes.MapPageRoute("Coach/Login", "Coach/Login", "~/Coach/CoachLogin.aspx");
        routes.MapPageRoute("Coach/Dashboard", "Coach/Dashboard", "~/Coach/CoachDashboard.aspx");
        routes.MapPageRoute("Coach/LogoutPage", "Coach/LogoutPage", "~/Coach/CoachLogout.aspx");
        routes.MapPageRoute("Coach/ManageBatch", "Coach/ManageBatch", "~/Coach/ManageBatch.aspx");

    }

    void Application_End(object sender, EventArgs e)
    {
        //  Code that runs on application shutdown

    }

    void Application_Error(object sender, EventArgs e)
    {
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e)
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e)
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }

</script>
