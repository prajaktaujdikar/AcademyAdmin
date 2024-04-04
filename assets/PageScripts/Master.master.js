$(function () {

});

$("#btnLogout").click(function () {
    $.ajax({
        type: "POST", 
        url: "/assets/PageService/WS_CommonPageMethods.asmx/Logout",
        data: '{WSPassword: "' + WSPassword + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            window.location = "/LogoutPage";
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
});
