$(function () {
    $("#txtEmailID").focus();
});

$("#btnSignIn").click(function () {
    var EmailID = $("#txtEmailID").val().trim();
    var Password = $("#txtPassword").val().trim();

    if (EmailID == "") {
        $("#txtEmailID").focus();
        swal.fire("", "Enter email-id", "warning");
        return false;
    }
    else if (Password == "") {
        $("#txtPassword").focus();
        swal.fire("", "Enter password", "warning");
        return false;
    }

    else {
        var data = {};
        data.EmailID = EmailID;
        data.Password = Password;
        $.ajax({
            type: "POST", 
            url: "/assets/PageService/Coach/WS_CoachLogin.asmx/CheckCoachLogin",
            data: '{coachMasterDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
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
                        window.location = "/Coach/Dashboard";
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

