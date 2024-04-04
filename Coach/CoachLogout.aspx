<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CoachLogout.aspx.cs" Inherits="Coach_CoachLogout" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
     <meta charset="utf-8" />
    <title>Logout</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- App favicon -->
    <link rel="shortcut icon" href="<%= ConfigurationManager.AppSettings["Logo"]   %>" />

    <!-- Bootstrap select pluings -->
    <link href="/assets/Template1/libs/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />


    <!-- App css -->
    <link href="/assets/Template1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/assets/Template1/css/icons.min.css" rel="stylesheet" />
    <link href="/assets/Template1/css/app.min.css" rel="stylesheet" />

</head>

    <body class="authentication-bg">

    <div class="account-pages my-5 pt-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div>

                        <div class="text-center authentication-logo mb-4">
                            <a href="index.html" class="logo-dark">
                                <span>
                                    <img src="assets/images/logo-dark.png" alt="" height="30" /></span>
                            </a>
                            <a href="index.html" class="logo-light">
                                <span>
                                    <img src="assets/images/logo-light.png" alt="" height="30" /></span>
                            </a>
                        </div>

                        <div class="text-center">
                            <div class="mb-3">
                                <div class="checkmark">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 161.2 161.2" enable-background="new 0 0 161.2 161.2" xml:space="preserve">
                                        <path class="path" fill="none" stroke="#4bd396" stroke-miterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
                                                c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
                                                c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z" />
                                        <circle class="path" fill="none" stroke="#4bd396" stroke-width="4" stroke-miterlimit="10" cx="80.6" cy="80.6" r="62.1" />
                                        <polyline class="path" fill="none" stroke="#4bd396" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="113,52.8
                                                74.1,108.4 48.2,86.4 " />

                                        <circle class="spin" fill="none" stroke="#4bd396" stroke-width="4" stroke-miterlimit="10" stroke-dasharray="12.2175,12.2175" cx="80.6" cy="80.6" r="73.9" />

                                    </svg>

                                </div>
                            </div>

                            <h3>See You Again !</h3>

                            <p class="text-muted mt-2">You are now successfully sign out. Back to <a href="/SelectUser" class="text-dark m1-1">Sign In</a></p>
                        </div>


                    </div>
                    <!-- end card -->

                </div>
                <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->

    <!-- Vendor js -->
    <script src="/assets/Template1/js/vendor.min.js"></script>

    <!-- Bootstrap select plugin -->
    <script src="/assets/Template1/libs/bootstrap-select/bootstrap-select.min.js"></script>

    <!-- App js -->
    <script src="/assets/Template1/js/app.min.js"></script>
    <script src="/assets/js/Custom.js"></script>
    
</body>
</html>
