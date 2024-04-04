$(function () {
    $("#txtUserName").focus();
});

$("#btnSignIn").click(function () {
    var UserName = $("#txtUserName").val().trim();
    var Password = $("#txtPassword").val().trim();

    if (UserName == "") {
        $("#txtUserName").focus();
        swal.fire("", "Enter user name", "warning");
        return false;
    }
    else if (Password == "") {
        $("#txtPassword").focus();
        swal.fire("", "Enter password", "warning");
        return false;
    }
    else {
        var data = {};
        data.UserName = UserName;
        data.Password = Password;
        $.ajax({
            type: "POST", 
            url: "/assets/PageService/WS_AdminLogin.asmx/CheckUserLogin",
            data: '{userMasterDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var res = response.d;
                if (res.indexOf("Error") > -1) {
                    swal.fire("", res, "warning");
                    return false;
                }
                else {
                    if (res == "1")
                        window.location = "/Dashboard";
                    else if (res == "2")
                        swal.fire("", "User account blocked!", "error");
                    else
                        swal.fire("", "Invalid username or passowrd!", "warning");
                }
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
                return false;
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
                return false;
            }
        });
    }
    return false;
});