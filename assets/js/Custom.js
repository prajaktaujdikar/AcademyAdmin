$(function () {
    SetWSPassword();
});

var WSPassword = "";
function SetWSPassword() {
    var Pass = "";
    $.ajax({
        type: "POST", 
        url: "/CommonPageMethods.aspx/GetWSPassword",
        data: '{}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var res = response.d;
            Pass = res;
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    WSPassword = Pass;
}

function GetCandidateIDSession() {
    var RecordID = 0;
    $.ajax({
        type: "POST",
        url: "/assets/PageServices/WS_CommonPageMethods.asmx/GetCadidateIDSession",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var res = response.d;
            RecordID = res;
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return RecordID;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 37 && charCode != 39)
        return false;

    return true;
}