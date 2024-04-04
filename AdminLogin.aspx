<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdminLogin.aspx.cs" Inherits="AdminLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>Login | SoftAcademy</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta content="" name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- App favicon -->
    <link rel="shortcut icon" href="<%= ConfigurationManager.AppSettings["Logo"]   %>" />

    <!-- Bootstrap select pluings -->
    <link href="assets/Template1/libs/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
    <link href="assets/PageStyle/AdminLogin.css" rel="stylesheet" />
    <!-- Sweet Alert-->
    <link href="/assets/Template1/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" />
    <!-- Bootstrap select plugin -->
    <script src="/assets/Template1/libs/sweetalert2/sweetalert2.min.js"></script>
    <!-- App css -->
    <link href="assets/Template1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/Template1/css/icons.min.css" rel="stylesheet" />
    <link href="assets/Template1/css/app.min.css" rel="stylesheet" />


</head>
<body class="authentication-bg">
    <form id="form1" runat="server"></form>

    <div class="account-pages my-5 pt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div>

                        <div class="text-center authentication-logo mb-4">
                            <a class="logo-dark">
                                <span>
                                    <img src="<%= ConfigurationManager.AppSettings["LogoFull3"]   %>" alt="" height="50" /></span>
                            </a>
                            <a class="logo-light">
                                <span>
                                    <img src="<%= ConfigurationManager.AppSettings["LogoFull3"]   %>" alt="" height="50" /></span>
                            </a>
                        </div>

                        <form action="#">

                            <div class="form-group mb-3">
                                <label for="emailaddress">User Name</label>
                                <input class="form-control" type="text" id="txtUserName" placeholder="Enter your user name" />

                            </div>
                            <div class="form-group mb-3">
                                <label for="password">Password</label>
                                <input class="form-control" type="password" id="txtPassword" placeholder="Enter your password" />
                            </div>

                            <%--<div class="form-group mb-3">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="checkbox-signin" checked>
                                        <label class="custom-control-label" for="checkbox-signin">Remember me</label>
                                    </div>
                                </div>--%>

                            <div class="form-group text-center mb-3">
                                <button class="btn btn-primary btn-lg width-lg btn-rounded" id="btnSignIn" type="submit">Sign In </button>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-center">
                                    <a href="/" class="text-muted">Forgot password?</a>
                                </div>
                            </div>
                        </form>

                    </div>
                    <!-- end card -->


                    <!-- end row -->

                </div>
                <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>

    <!-- JAVASCRIPT  FILES ========================================= -->

    <!-- Vendor js -->
    <script src="assets/Template1/js/vendor.min.js"></script>



    <!-- Bootstrap select plugin -->
    <script src="/assets/Template1/libs/bootstrap-select/bootstrap-select.min.js"></script>

    <!-- App js -->
    <script src="/assets/Template1/js/app.min.js"></script>
    <!-- Sweet Alerts js -->
    <script src="/assets/Template1/libs/sweetalert2/sweetalert2.min.js"></script>
    <script src="assets/js/Custom.js"></script>
    <script src="assets/PageScripts/AdminLogin.js"></script>
</body>
</html>
