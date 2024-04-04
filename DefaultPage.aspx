<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DefaultPage.aspx.cs" Inherits="DefaultPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- Bootstrap select pluings -->
    <link href="assets/Template1/libs/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
    <link href="assets/PageStyle/AdminLogin.css" rel="stylesheet" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="<%= ConfigurationManager.AppSettings["Logo"]   %>" />
    <!-- Bootstrap select plugin -->
    <script src="assets/Template1/libs/sweetalert2/sweetalert2.min.js"></script>
    <!-- App css -->
    <link href="assets/Template1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/Template1/css/icons.min.css" rel="stylesheet" />
    <link href="assets/Template1/css/app.min.css" rel="stylesheet" />

</head>
<body>
    <form id="form1" runat="server"></form>
    <div id="divUserType" style="position: center">
        <div class="text-center">
            <img src="<%= ConfigurationManager.AppSettings["Logo2"]   %>" class="rounded pt-5" alt="..." style="height:200px;" />
        </div>

        <h1 class="heading-hr mt-3 text-center text-success">SOFT ACADEMY</h1>
        <div class="row mt-4">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <div class="row text-center">
                    <div class="col-sm-12 col-lg-6 col-md-6">
                        <a href="/Login">
                            <div class="card text-center display:inline elements">
                                <div class="card-body bg-dark" style="border-radius: 25px;">
                                    <div class="icon-lg text-primary bg-success  p-1">
                                        <img src="/assets/image/Coach/Admin.png" style="height:80px;" alt="" />
                                        <h4 style="color: white">Admin Login</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-md-6">
                        <a href="/Coach/Login"> 
                            <div class="card text-center display:inline elements">
                                <div class="card-body bg-dark" style="border-radius: 25px;">
                                    <div class="icon-lg text-primary bg-success  p-1">
                                        <img src="/assets/image/Coach/Coach.png" style="height:80px" alt="" />
                                        <h4 style="color: white">Coach Login</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-sm-4"></div>
        </div>
    </div>

    <!-- JAVASCRIPT  FILES ========================================= -->

    <!-- Vendor js -->
    <script src="assets/Template1/js/vendor.min.js"></script>

    <!-- Sweet Alerts js -->
    <script src="assets/libs/sweetalert2/sweetalert2.min.js"></script>

    <!-- App js -->
    <script src="assets/Template1/js/app.min.js"></script>
</body>
</html>
