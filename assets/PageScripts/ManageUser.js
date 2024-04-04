var SessionIsMain = "";
$(function () {
    GetSessesionIsMain();
    GetUserTypeList();
    GetUserTypeSearchList();
    GetUserDetails(1);

});

function GetUserTypeList() {
    var UserTypeList = $("#ddlUserType");
    $("#ddlUserType").empty();
    UserTypeList.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetUserTypeList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                if (SessionIsMain == "True")
                    UserTypeList.append($("<option></option>").val(this['UserTypeID']).html(this['UserType']));
                else if (this['UserTypeID'] != 1 && this['UserTypeID'] != 2)
                    UserTypeList.append($("<option></option>").val(this['UserTypeID']).html(this['UserType']));
            });
        }
    });
}

function GetUserTypeSearchList() {
    var SearchUserTypeList = $("#ddlSearchUserType");
    $("#ddlSearchUserType").empty();
    SearchUserTypeList.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetUserTypeList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                if (SessionIsMain == "True")
                    SearchUserTypeList.append($("<option></option>").val(this['UserTypeID']).html(this['UserType']));
                else if (this['UserTypeID'] != 1 && this['UserTypeID'] != 2)
                    SearchUserTypeList.append($("<option></option>").val(this['UserTypeID']).html(this['UserType']));
            });
        }
    });
}


function CheckMobileNoExists() {
    var IsExist = 0;
    var titletooltip = document.getElementById('txtMobileNo').title;
    var title = document.getElementById('txtMobileNo');

    if (titletooltip == "" || (titletooltip != "" && title.value.toLowerCase() != titletooltip.toLowerCase())) {
        $.ajax({
            type: "POST",
            url: " /assets/PageService/WS_ManageUser.asmx/CheckMobileNoExistsForUserRegistration",
            data: '{MobileNo : "' + title.value + '", WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == false) {
                    $("[id=btnSignUp]").removeAttr("disabled");
                    IsExist = 0;
                }
                else {
                    $("[id=btnSignUp]").attr("disabled");
                    title.focus();
                    IsExist = 1;
                }
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
    return IsExist;
}

function CheckEmailIDExists() {
    var IsExist = 0;
    var titletooltip = document.getElementById('txtEmailID').title;
    var title = document.getElementById('txtEmailID');

    if (titletooltip == "" || (titletooltip != "" && title.value.toLowerCase() != titletooltip.toLowerCase())) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageUser.asmx/CheckEmailIDExistsForUserRegistration",
            data: '{EmailID : "' + title.value + '", WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == false) {
                    $("[id=btnSignUp]").removeAttr("disabled");
                    IsExist = 0;
                }
                else {
                    $("[id=btnSignUp]").attr("disabled");
                    title.focus();
                    IsExist = 1;
                }
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
    return IsExist;
}

function CheckUserNameExists() {
    var IsExist = 0;
    var titletooltip = document.getElementById('txtUserName').title;
    var title = document.getElementById('txtUserName');

    if (titletooltip == "" || (titletooltip != "" && title.value.toLowerCase() != titletooltip.toLowerCase())) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageUser.asmx/CheckUserNameExists",
            data: '{UserName : "' + title.value + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == false) {
                    $("[id=btnSignUp]").removeAttr("disabled");
                    IsExist = 0;
                }
                else {
                    $("[id=btnSignUp]").attr("disabled");
                    title.focus();
                    IsExist = 1;
                }
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
    return IsExist;
}

function GetSessesionIsMain() {
    SessionIsMain = "";
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageUser.asmx/GetSessesionIsMain",
        data: '{}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            SessionIsMain = response.d;

        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });

    return SessionIsMain;
}

$("#btnSubmit").click(function () {
    var UserType = $("#ddlUserType").val();
    var FullName = $("#txtFullName").val();
    var EmailID = $("#txtEmailID").val().trim();
    var exprEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var MobileNo = $("#txtMobileNo").val().trim();
    var numberfilter = /^[0-9]*$/;
    var UserName = $("#txtUserName").val().trim();
    var Password = $("#txtPassword").val().trim();
    var ConfirmPassword = $("#txtConfirmPassword").val().trim();
    var exprusername = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
    var pattern = /^.*(?=.{9,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;

    if (UserType == 0) {
        //swal.fire("", "Select user type", "warning");
        swal.fire({
            title: "",
            text: "Select user type.",
            type: "warning",
        }, function (isConf) {
            if (isConf)
                $("#ddlUserType").select2("open");
            else
                $("#ddlUserType").select2("open");
        });
        return false;
    }
    else if (UserType == null) {
        swal.fire("", "You can not update this record. Contact main admin to update this record.", "warning");
        return false;
    }
    else if (FullName == "") {
        $("#txtFullName").focus();
        swal.fire("", "Enter full name", "warning");
        return false;
    }
    else if (EmailID == "") {
        $("#txtEmailID").focus();
        swal.fire("", "Enter email-id.", "warning");
        return false;
    }
    else if (EmailID != "" && exprEmail.test(EmailID) == false) {
        $("#txtEmailID").focus();
        swal.fire("", "Enter valid email-id.", "warning");
        return false;
    }
    else if (EmailID != "" && CheckEmailIDExists() == 1) {
        $("#txtEmailID").focus();
        swal.fire("", " Email-id already registered!", "warning");
        return false;
    }
    else if (MobileNo == "") {
        $("#txtMobileNo").focus();
        swal.fire("", "Enter mobile no", "warning");
        return false;
    }
    else if (MobileNo != "" && numberfilter.test(MobileNo) == false) {
        $("#txtMobileNo").focus();
        swal.fire("", "Enter valid digit for mobile no.", "warning");
        return false;
    }
    else if (MobileNo != "" && MobileNo.length != 10) {
        $("#txtMobileNo").focus();
        swal.fire("", "Enter 10 digit mobile no.", "warning");
        return false;
    }
    else if (CheckMobileNoExists() == 1) {
        $("#txtMobileNo").focus();
        swal.fire("", "Mobile no already registered!.", "warning");
        return false;
    }
    else if (UserName == "") {
        $("#txtUserName").focus();
        swal.fire("", "Enter user name", "warning");
        return false;
    }
    else if (UserName != "" && exprusername.test(UserName) == false) {
        $("#txtUserName").focus();
        swal.fire("", "Enter valid user name", "warning");
        return false;
    }
    else if (CheckUserNameExists() == 1) {
        $("#txtUserName").focus();
        swal.fire("", "User name already registered", "warning");
        return false;
    }
    else if (Password == "") {
        $("#txtPassword").focus();
        swal.fire("", "Enter password.", "warning");
        return false;
    }
    else if (Password != "" && pattern.test(Password) == false) {
        $("#txtPassword").focus();
        swal.fire("", "Enter valid password.", "warning");
        return false;
    }
    else if (ConfirmPassword == "") {
        $("#txtConfirmpassword").focus();
        swal.fire("", "Enter confirm password.", "warning");
        return false;
    }
    else if (Password !== ConfirmPassword) {
        $("#txtConfirmpassword").focus();
        swal.fire("", "Password and confirm password not match.", "warning");
        return false;
    }

    else {
        var data = {};

        data.UserID = hdnUserID;
        data.UserTypeID = UserType;
        data.FullName = FullName;
        data.EmailID = EmailID;
        data.MobileNo = MobileNo;
        data.UserName = UserName;
        data.Password = Password;
        data.ConfirmPassword = ConfirmPassword;

        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageUser.asmx/ManageUser",
            data: '{userDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (response) {
                var res = response.d;
                if (res.indexOf("CatchError") > -1) {
                    swal.fire("", response.d, "warning");
                    return false;
                }
                else if (response.d == "SessionExpire") {
                    swal.fire({
                        title: "",
                        text: "Something went wrong, Please try again!",
                        type: "warning",
                    }, function (IsConf) {
                        if (IsConf) {
                            location.reload();
                        } else {
                            location.reload();
                        }
                    });
                    return false;
                }
                else {
                    ClearUserDetails();
                    swal.fire("", res, "success");
                }
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
    return false;
});

$("#btnCancel").click(function () {
    ClearUserDetails();
});

function ClearUserDetails() {
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);

    $("#txtFullName").val('');
    $("#txtEmailID").val('');
    $("#txtEmailID").prop("disabled", false);
    $('txtEmailID').removeAttr('disabled');
    $("#ddlUserType").val('0');
    $("#txtMobileNo").prop("disabled", false);
    $("#txtMobileNo").val('');
    $('txtMobileNo').removeAttr('disabled');
    $("#txtUserName").val('');
    $("#txtPassword").val('');
    $("#txtPassword").prop("disabled", false);
    $("#txtConfirmPassword").val('');
    $("#txtConfirmPassword").prop("disabled", false);
    hdnUserID = 0;
    GetUserDetails(1);
}

function clearsearchdetails() {
    $("#ddlSearchUserType").val('0');
    $("#txtSearchFullName").val('');
    $("#txtSearchMobileNo").val('');
    $("#txtSearchEmailID").val('');
    GetUserDetails(1);
}

$("#btnSearch").click(function () {
    GetUserDetails(1);
});

$("#btnSearchCancel").click(function () {
    clearsearchdetails();
});


function GetUserDetails(pageIndex) {
    var UserTypeID = $("#ddlSearchUserType");
    var FullName = $("#txtSearchFullName");
    var Email = $("#txtSearchEmailID");
    var MobileNo = $("#txtSearchMobileNo");

    var data = {};
    data.UserTypeID = UserTypeID.val();
    data.FullName = FullName.val();
    data.EmailID = Email.val();
    data.MobileNo = MobileNo.val();
    //$("#divUserDetailList").css("display", "none");
    var PagerLimit = 20;
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageUser.asmx/GetUserDetailList",
        data: '{pageIndex: ' + pageIndex + ', PageSize: ' + PagerLimit + ', userDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var res = response.d;
            if (res.indexOf("Error") > -1) {
                swal.fire("", res, "warning");
                return false;
            }
            else if (response.d == "SessionExpire") {
                swal.fire({
                    title: "",
                    text: "Something went wrong, Please try again!",
                    type: "warning",
                }, function (IsConf) {
                    if (IsConf) {
                        location.reload();
                    } else {
                        location.reload();
                    }
                });
                return false;
            }
            else {
                OnUserMemberSuccess(response);
            }
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });

};

var rowUserProgram;
function OnUserMemberSuccess(response) {
    $("#divUserDetailList").css("display", "block");
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (rowUserProgram == null)
        rowUserProgram = $("[id=tblUserList] tbody tr:last-child").clone(true);
    $("[id=tblUserList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", rowUserProgram).eq(0).text($(this).find("RowNumber").text());
            $("td", rowUserProgram).eq(1).text($(this).find("FullName").text());
            $("td", rowUserProgram).eq(2).text($(this).find("UserType").text());
            $("td", rowUserProgram).eq(3).text($(this).find("EmailID").text());
            $("td", rowUserProgram).eq(4).text($(this).find("MobileNo").text());
            $("td", rowUserProgram).eq(5).text($(this).find("UserName").text());

            var strAction = '';

            strAction += '<button type="button" title="Edit" class="btn btn-info waves-effect waves-light ml-2" onclick="return EditUserDetails(' + $(this).find("UserID").text() + ')" ><i class="fa fa-edit"></i></button>&nbsp&nbsp&nbsp';
            strAction += '<button type="button" title="Delete" class="btn btn-danger waves-effect waves-light d-none" onclick="return DeleteUserDetails(' + $(this).find("UserID").text() + ')" ><i class="fa fa-trash"></i></button>&nbsp&nbsp';

            $("td", rowUserProgram).eq(6).html(strAction);

            $("[id=tblUserList] tbody").append(rowUserProgram);
            rowUserProgram = $("[id=tblUserList] tbody tr:last-child").clone(true);
        });
        //$("[id=DivPager]").css({ 'display': 'block' });
        var pager = xml.find("Pager");

        $("[id=divpager]").css({ 'display': 'block' });
        $(".Pager").ASPSnippets_Pager({
            ActiveCssClass: "current",
            PagerCssClass: "pager",
            PageIndex: parseInt(pager.find("PageIndex").text()),
            PageSize: parseInt(pager.find("PageSize").text()),
            RecordCount: parseInt(pager.find("RecordCount").text())
        });
    }
    else {
        var empty_row9 = rowUserProgram.clone(true);
        $("td:first-child", empty_row9).attr("colspan", $("td", rowUserProgram).length);
        $("td:first-child", empty_row9).attr("align", "center");
        $("td:first-child", empty_row9).html("No records found for the search criteria.");
        $("td", empty_row9).not($("td:first-child", empty_row9)).remove();
        $("[id*=tblUserList] tbody").append(empty_row9);
        $("[id=divpager]").hide();
    }
};

$(".Pager").on("click", '.page', function () {
    GetUserDetails(parseInt($(this).attr('page')));
});

function DeleteUserDetails(UserID) {
    swal.fire({
        title: "Are you sure you want to delete user?",
        type: "info",
        showCancelButton: !0,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonClass: "btn btn-primary mt-2 mr-2",
        cancelButtonClass: "btn btn-secondary ms-4 mt-2",
        buttonsStyling: !1
    }).then(function (t) {
        if (t.value == true) {
            $.ajax({
                type: "POST",
                url: "/assets/PageService/WS_ManageUser.asmx/DeleteUserDetails",
                data: '{UserID: ' + UserID + ', WSPassword: "' + WSPassword + '"}',
                dataType: "json",
                contentType: "application/json; charset:utf-8",
                async: false,
                success: function (response) {
                    var res = response.d;
                    if (res.indexOf("Error") > -1) {
                        swal.fire("", res, "warning");
                        return false;
                    }
                    else if (response.d == "SessionExpire") {
                        swal.fire({
                            title: "",
                            text: "Something went wrong, Please try again!",
                            type: "warning",
                        }, function (IsConf) {
                            if (IsConf) {
                                location.reload();
                            } else {
                                location.reload();
                            }
                        });
                        return false;
                    }
                    else {
                        ClearUserDetails();
                        swal.fire("", res, "success");
                    }
                },
                failure: function (response) {
                    swal.fire("", "Failure : " + response.failure, "warning");
                },
                error: function (response) {
                    swal.fire("", "Error : " + response.statusText, "warning");
                }
            });
        }
    });
    return false;
}

function EditUserDetails(UserID) {
    $.ajax({
        type: "POST",
        url: " /assets/PageService/WS_ManageUser.asmx/GetUserDetailsByID",
        data: '{UserID: "' + UserID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnUserUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
}
var hdnUserID = 0;
function OnUserUpdateSuccess(response) {
    var res = response.d;
    if (res.length > 0) {
        hdnUserID = res[0].UserID;

        $("#ddlUserType").val(res[0].UserTypeID).trigger('change');
        $("#txtFullName").val(res[0].FullName);
        $("#txtEmailID").val(res[0].EmailID);
        //$("#txtEmailID").attr("disabled", "disabled");
        $("#txtEmailID").attr("title", res[0].EmailID);
        $("#txtMobileNo").val(res[0].MobileNo);
        //$("#txtMobileNo").attr("disabled", "disabled");
        $("#txtMobileNo").attr("title", res[0].MobileNo);
        $("#txtUserName").val(res[0].UserName);
        $("#txtUserName").attr("title", res[0].UserName);
        $("#txtPassword").val(res[0].Password);
        $("#txtPassword").attr("disabled", "disabled");
        $("#txtPassword").attr("title", res[0].Password);
        $("#txtConfirmPassword").val(res[0].Password);
        $("#txtConfirmPassword").attr("disabled", "disabled");
        $("#txtConfirmPassword").attr("title", res[0].Password);
        $('.nav-tabs a[href="#home-b1"]').tab('show');
        $("[id=btnSubmit]").html("Update");
        $("[id=btnSubmit]").attr('disabled', false);
    }
    return false;
};