$(function () {
    $(".select2").select2();
    GetCoachDetails(1);
    GetDefaultDate();
    GetBloodGroupList();
    GetCasteCategoryList();
    GetReligionMasterList();
    GetSateMasterList();
    GetPermanentSateMasterList();
    GetDefaultJoinDate();

    $('#txtFirstName').focus();
});

function GetBloodGroupList() {

    var ddlBloodGroup = $("#ddlBloodGroup");
    $("#ddlBloodGroup").empty();
    ddlBloodGroup.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetBloodGroupList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                ddlBloodGroup.append($("<option></option>").val(this['BloodGroupID']).html(this['BloodGroup']));
            });
        }
    });
}

function GetDefaultDate() {
    flatpickr("#txtDOB", {
        "dateFormat": "d/m/Y",
        "allowInput": true,
        "onOpen": function (selectedDates, dateStr, instance) {
            instance.setDate(instance.input.value, false);
        },
    });
};

function GetDefaultJoinDate() {
    flatpickr("#txtDOJ", {
        "dateFormat": "d/m/Y",
        "allowInput": true,
        "onOpen": function (selectedDates, dateStr, instance) {
            instance.setDate(instance.input.value, false);
        },
    });
};

function GetCasteCategoryList() {
    var ddlCasteCategory = $("#ddlCasteCategory");
    $("#ddlCasteCategory").empty();
    ddlCasteCategory.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCasteReligionList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                ddlCasteCategory.append($("<option></option>").val(this['CasteCategoryID']).html(this['CasteCategory']));
            });
        }
    });
}

var arrReligion = [];
function GetReligionMasterList() {
    arrReligion = [];
    var ddlReligion = $("#ddlReligion");
    $("#ddlReligion").empty();
    ddlReligion.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetReligionMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            arrReligion = response.d;
            $.each(response.d, function () {
                ddlReligion.append($("<option></option>").val(this['ReligionID']).html(this['Religion']));
            });
        }
    });
}

$("#ddlReligion").on('change', function () {
    OnReligionChange();
});

function OnReligionChange() {
    var Religion = $("#ddlReligion").val();
    $("#txtOtherReligion").val('');
    $("#txtOtherReligion").attr('disabled', 'disabled');
    if (Religion != 0) {
        $.each(arrReligion, function () {
            if (this["ReligionID"] == Religion && this["IsOther"] == true) {
                $("#txtOtherReligion").removeAttr('disabled');
            }
        });
    }
}

function GetSateMasterList() {
    var ddlStateMaster = $("#ddlState");
    $("#ddlState").empty();
    ddlStateMaster.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetSateMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                ddlStateMaster.append($("<option></option>").val(this['StateID']).html(this['StateName']));
            });
        }
    });
}

function LocalStateChange() {
    $("#ddlCity").select2("val", "0");
    $("#ddlDistrict").select2("val", "0");
    GetCityMaster();
    GetDistrictMaster();
}

function GetCityMaster() {
    var State = $("#ddlState").val();
    var ddlCity = $("[id=ddlCity]");
    $("[id=ddlCity]").empty();
    ddlCity.append($("<option></option>").val(0).html("-- SELECT --"));

    if (State != 0) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCityByState",
            data: '{StateID: ' + State + ', WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $.each(response.d, function () {
                    ddlCity.append($("<option></option>").val(this['CityID']).html(this['CityName']));
                });
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
}

function GetDistrictMaster() {
    var State = $("#ddlState").val();
    var ddlDistrict = $("[id=ddlDistrict]");
    $("[id=ddlDistrict]").empty();
    ddlDistrict.append($("<option></option>").val(0).html("-- SELECT --"));

    if (State != 0) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_CommonPageMethods.asmx/GetDistrictByState",
            data: '{StateID: ' + State + ', WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $.each(response.d, function () {
                    ddlDistrict.append($("<option></option>").val(this['DistrictID']).html(this['DistrictName']));
                });
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
}
function PermanentStateChange() {
    $("#ddlPermanentCity").select2("val", "0");
    $("#ddlPermanentDistrict").select2("val", "0");
    GetPermanentCityMaster();
    GetPermanentDistrictMaster();
}

function GetPermanentSateMasterList() {

    var ddlPermanentState = $("#ddlPermanentState");
    $("#ddlPermanentState").empty();
    ddlPermanentState.append($("<option></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetSateMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                ddlPermanentState.append($("<option></option>").val(this['StateID']).html(this['StateName']));
            });
        }
    });
}

function GetPermanentCityMaster() {
    var State = $("#ddlPermanentState").val();
    var ddlPermanentCity = $("[id=ddlPermanentCity]");
    $("[id=ddlPermanentCity]").empty();
    ddlPermanentCity.append($("<option></option>").val(0).html("-- SELECT --"));

    if (State != 0) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCityByState",
            data: '{StateID: ' + State + ', WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $.each(response.d, function () {
                    ddlPermanentCity.append($("<option></option>").val(this['CityID']).html(this['CityName']));
                });
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
}

function GetPermanentDistrictMaster() {
    var State = $("#ddlPermanentState").val();
    var ddlPermanentDistrict = $("[id=ddlPermanentDistrict]");
    $("[id=ddlPermanentDistrict]").empty();
    ddlPermanentDistrict.append($("<option></option>").val(0).html("-- SELECT --"));

    if (State != 0) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_CommonPageMethods.asmx/GetDistrictByState",
            data: '{StateID: ' + State + ', WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $.each(response.d, function () {
                    ddlPermanentDistrict.append($("<option></option>").val(this['DistrictID']).html(this['DistrictName']));
                });
            },
            failure: function (response) {
                swal.fire("", "Failure : " + response.failure, "warning");
            },
            error: function (response) {
                swal.fire("", "Error : " + response.statusText, "warning");
            }
        });
    }
}

function SamePermanentAddressChange() {

    if ($("#chkSamePermanentAddress").prop("checked") == true) {
        $("#txtPermanentAddress").val('');
        $("#txtPermanentPincode").val('');
        $("#ddlPermanentState").select2("val", "0");
        //GetPermanentCityMaster();
        //GetPermanentDistrictMaster();

        $("#txtPermanentAddress").attr("disabled", "disabled");
        $("#txtPermanentPincode").attr("disabled", "disabled");
        $("#ddlPermanentState").attr("disabled", "disabled");
        $("#ddlPermanentCity").attr("disabled", "disabled");
        $("#ddlPermanentDistrict").attr("disabled", "disabled");
    }
    else {
        $("#txtPermanentAddress").removeAttr("disabled");
        $("#txtPermanentPincode").removeAttr("disabled");
        $("#ddlPermanentState").removeAttr("disabled");
        $("#ddlPermanentCity").removeAttr("disabled");
        $("#ddlPermanentDistrict").removeAttr("disabled");
    }
}

function CheckMobileNoExists() {
    var IsExist = 0;
    var titletooltip = document.getElementById('txtMobileNo').title;
    var title = document.getElementById('txtMobileNo');

    if (titletooltip == "" || (titletooltip != "" && title.value.toLowerCase() != titletooltip.toLowerCase())) {
        $.ajax({
            type: "POST",
            url: " /assets/PageService/WS_ManageCoach.asmx/CheckMobileNoExists",
            data: '{MobileNo : "' + title.value + '", WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == false) {
                    $("[id=btnSubmit]").removeAttr("disabled");
                    IsExist = 0;
                }
                else {
                    $("[id=btnSubmit]").attr("disabled");
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
    var titletooltip = document.getElementById('txtEmailid').title;
    var title = document.getElementById('txtEmailid');

    if (titletooltip == "" || (titletooltip != "" && title.value.toLowerCase() != titletooltip.toLowerCase())) {
        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageCoach.asmx/CheckEmailIDExists",
            data: '{EmailID : "' + title.value + '", WSPassword: "' + WSPassword + '"}',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == false) {
                    $("[id=btnSubmit]").removeAttr("disabled");
                    IsExist = 0;
                }
                else {
                    $("[id=btnSubmit]").attr("disabled");
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

$("#btnSubmit").click(function () {
    var FirstName = $("#txtFirstName").val();
    var MiddleName = $("#txtMiddleName").val();
    var LastName = $("#txtLastName").val();
    var MobileNo = $("#txtMobileNo").val();
    var numberfilter = /^[0-9]*$/;
    var Gender = $("input:radio[name='rbGender']:checked").val();
    var EmailID = $("#txtEmailid").val();
    var exprEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var DOB = $("#txtDOB").val().trim();
    var DOJ = $("#txtDOJ").val().trim();
    var BloodGroup = $("#ddlBloodGroup").val();
    var Password = $("#txtPassword").val().trim();
    var ConfirmPassword = $("#txtConfirmPassword").val().trim();
    var Nationality = $("#txtNationality").val();
    var CasteCategory = $("#ddlCasteCategory").val();
    var Caste = $("#txtCaste").val();
    var SubCaste = $("#txtSubCaste").val();
    var Religion = $("#ddlReligion").val();
    var ReligionOther = $("#txtOtherReligion").val();
    var IsOtherReligion = false;
    $.each(arrReligion, function () {
        if (this["ReligionID"] == Religion && this["IsOther"] == true) {
            IsOtherReligion = true;
        }
    });
    var LocalAddress = $("#txtLocalAddress").val().trim();;
    var LocalPincode = $("#txtPincode").val().trim();;
    var LocalState = $("#ddlState").val();
    var LocalCity = $("#ddlCity").val();
    var LocalDistrict = $("#ddlDistrict").val();
    var chkSamePermanentAddress = $("#chkSamePermanentAddress").prop("checked");
    var PermanentAddress = $("#txtPermanentAddress").val().trim();
    var PermanentPincode = $("#txtPermanentPincode").val().trim();
    var PermanentState = $("#ddlPermanentState").val();
    var PermanentCity = $("#ddlPermanentCity").val();
    var PermanentDistrict = $("#ddlPermanentDistrict").val();
    var pattern = /^.*(?=.{9,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;

    if (FirstName == "") {
        $("#txtFirstName").focus();
        swal.fire("", "Enter first name", "warning");
        return false;
    }
    else if (LastName == "") {
        $("#txtLastName").focus();
        swal.fire("", "Enter last name", "warning");
        return false
    }
    else if (EmailID == "") {
        $("#txtEmailid").focus();
        swal.fire("", "Enter email-id.", "warning");
        return false;
    }
    else if (EmailID != "" && exprEmail.test(EmailID) == false) {
        $("#txtEmailid").focus();
        swal.fire("", "Enter valid email-id.", "warning");
        return false;
    }
    else if (EmailID != "" && CheckEmailIDExists() == 1) {
        $("#txtEmail").focus();
        swal.fire("", " Email-id already registered!", "warning");
        return false;
    }
    else if (MobileNo == "") {
        $("#txtMobileNo").focus();
        swal.fire("", "Enter mobile no.", "warning");
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
    else if (MobileNo != "" && CheckMobileNoExists() == 1) {
        $("#txtMobileNo").focus();
        swal.fire("", "Mobile no. already registered!.", "warning");
        return false;
    }
    else if (DOB != "" && new Date() < new Date(DOB.substring(3, 5) + "/" + DOB.substring(0, 2) + "/" + DOB.substring(6, 10))) {
        $("#txtDOB").focus();
        swal.fire("", "Future date are not accepted for birth date.", "warning");
        return false;
    }
    else if (DOJ != "" && new Date() < new Date(DOJ.substring(3, 5) + "/" + DOJ.substring(0, 2) + "/" + DOJ.substring(6, 10))) {
        $("#txtDOB").focus();
        swal.fire("", "Future date are not accepted.", "warning");
        return false;
    }
    else if (IsOtherReligion == true && OtherReligion == "") {
        $("#txtOtherReligion").focus();
        swal.fire("", "Specify other religion.", "warning");
        return false;
    }
    else if (LocalPincode != "" && LocalPincode.length != 6) {
        $("#txtLocalPincode").focus();
        swal.fire("", "Enter 6 digit local pincode.", "warning");
        return false;
    }
    else if (PermanentPincode != "" && PermanentPincode.length != 6) {
        $("#txtPermanentPincode").focus();
        swal.fire("", "Enter 6 digit permanent pincode.", "warning");
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
        $("#txtConfirmPassword").focus();
        swal.fire("", "Enter confirm password.", "warning");
        return false;
    }
    else if (Password != ConfirmPassword) {
        $("#txtConfirmPassword").focus();
        swal.fire("", "Password and confirm password not match!", "warning");
        return false;
    }
    else {
        var data = {};
        data.CoachID = hdnCoachID;

        data.FirstName = FirstName;
        data.MiddleName = MiddleName;
        data.LastName = LastName;
        data.EmailID = EmailID;
        data.MobileNo = MobileNo;
        data.DOJ = DOJ;
        data.Gender = Gender;
        data.DOB = DOB;
        data.Password = Password;
        data.ConfirmPassword = ConfirmPassword;
        data.BloodGroupID = BloodGroup;
        data.Nationality = Nationality;
        data.CasteCategoryID = CasteCategory;
        data.Caste = Caste;
        data.SubCaste = SubCaste;
        data.ReligionID = Religion;
        data.ReligionOther = ReligionOther;
        data.LocalAddress = LocalAddress;
        data.LocalPincode = LocalPincode;
        data.LocalStateID = LocalState;
        data.LocalCityID = LocalCity;
        data.LocalDistrictID = LocalDistrict;

        data.IsSamePermanentAddress = chkSamePermanentAddress;
        data.PermanentAddress = PermanentAddress;
        data.PermanentStateID = PermanentState;
        data.PermanentPincode = PermanentPincode;
        data.PermanentCityID = PermanentCity;
        data.PermanentDistrictID = PermanentDistrict;

        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageCoach.asmx/ManageCoach",
            data: '{coachDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
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
                    ClearCoachDetails();
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
    ClearCoachDetails();
    return false;
});

function ClearCoachDetails() {
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);

    $("#txtFirstName").val('');
    $("#txtMiddleName").val('');
    $("#txtLastName").val('');
    $("#txtDOJ").val('');
    $("#txtMobileNo").prop("disabled", false);
    $("#txtMobileNo").val('');
    $("#txtEmailid").prop("disabled", false);
    $("#txtEmailid").val('');
    $('txtEmail').removeAttr('disabled');
    $("input:radio[name='rbGender']").prop("checked", false);
    $("#txtDOB").val('');
    $("#txtPassword").val('');
    $("#txtPassword").prop("disabled", false);
    $("#txtConfirmPassword").val('');
    $("#txtConfirmPassword").prop("disabled", false);
    $("#ddlBloodGroup").select2('val', '0');
    $("#txtNationality").val('');
    $("#ddlReligion").select2('val', '0');
    $("#ddlCasteCategory").select2('val', '0');
    $("#txtCaste").val('');
    $("#txtSubCaste").val('');
    $("#txtLocalAddress").val('');
    $("#txtPincode").val('');
    $("#ddlState").select2('val', '0');
    $("#chkSamePermanentAddress").prop("checked", false);
    $("#txtPermanentAddress").val('');
    $("#txtPermanentPincode").val('');
    $("#ddlPermanentState").select2('val', '0');
    GetCityMaster();
    GetDistrictMaster();
    GetPermanentCityMaster();
    GetPermanentDistrictMaster();
    GetCoachDetails(1);

    hdnCoachID = 0;
}

$("#btnSearch").click(function () {
    GetCoachDetails(1);
});

$("#btnSearchCancel").click(function () {
    $("#txtSearchCoachName").val('');
    $("#txtSearchMobileNo").val('');
    $("#txtSearchEmailID").val('');
    GetCoachDetails(1);
});

function GetCoachDetails(pageIndex) {
    var CoachName = $("#txtSearchCoachName").val();
    var EmailID = $("#txtSearchEmailID").val();
    var MobileNo = $("#txtSearchMobileNo").val();

    var data = {};
    data.CoachName = CoachName;
    data.EmailID = EmailID;
    data.MobileNo = MobileNo;

    //$("#divCoachDetailList").css("display", "none");
    var PagerLimit = 20;

    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCoach.asmx/GetCoachDetailList",
        data: '{pageIndex: ' + pageIndex + ', PageSize: ' + PagerLimit + ', coachDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
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
                OnCoachMemberSuccess(response);
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

var RowCoachProgram;
function OnCoachMemberSuccess(response) {
    $("#divCoachDetailList").css("display", "block");
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (RowCoachProgram == null)
        RowCoachProgram = $("[id=tblCoachList] tbody tr:last-child").clone(true);
    $("[id=tblCoachList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", RowCoachProgram).eq(0).text($(this).find("RowNumber").text());
            $("td", RowCoachProgram).eq(1).text($(this).find("FirstName").text());
            $("td", RowCoachProgram).eq(2).text($(this).find("MiddleName").text());
            $("td", RowCoachProgram).eq(3).text($(this).find("LastName").text());
            $("td", RowCoachProgram).eq(4).text($(this).find("GenderText").text());
            $("td", RowCoachProgram).eq(5).text($(this).find("DOB").text());
            $("td", RowCoachProgram).eq(6).text($(this).find("EmailID").text());
            $("td", RowCoachProgram).eq(7).text($(this).find("MobileNo").text());


            var strAction = '';
            strAction += '<button type="button" title="View"  class="btn btn-success btn-icon " onclick="return ViewCoachDetails(' + $(this).find("CoachID").text() + ')" ><i class="fa fa-eye"></i></button>';
            strAction += '<button type="button" title="Edit" class="btn btn-info waves-effect waves-light ml-2" onclick="return EditCoachDetails(' + $(this).find("CoachID").text() + ')" ><i class="fa fa-edit"></i></button>&nbsp&nbsp&nbsp';
            strAction += '<button type="button" title="Delete" class="btn btn-danger waves-effect waves-light" onclick="return DeleteCoachDetails(' + $(this).find("CoachID").text() + ')" ><i class="fa fa-trash"></i></button>&nbsp&nbsp';

            $("td", RowCoachProgram).eq(8).html(strAction);

            $("[id=tblCoachList] tbody").append(RowCoachProgram);
            RowCoachProgram = $("[id=tblCoachList] tbody tr:last-child").clone(true);
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
        var empty_row9 = RowCoachProgram.clone(true);
        $("td:first-child", empty_row9).attr("colspan", $("td", RowCoachProgram).length);
        $("td:first-child", empty_row9).attr("align", "center");
        $("td:first-child", empty_row9).html("No records found for the search criteria.");
        $("td", empty_row9).not($("td:first-child", empty_row9)).remove();
        $("[id*=tblCoachList] tbody").append(empty_row9);
        $("[id=divpager]").hide();
    }
};

$(".Pager").on("click", '.page', function () {
    GetCoachDetails(parseInt($(this).attr('page')));
});

function DeleteCoachDetails(CoachID) {
    swal.fire({
        title: "Are you sure you want to delete coach?",
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
                url: "/assets/PageService/WS_ManageCoach.asmx/DeleteCoachDetails",
                data: '{CoachID: ' + CoachID + ', WSPassword: "' + WSPassword + '"}',
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

                        ClearCoachDetails();
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

function EditCoachDetails(CoachID) {
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCoach.asmx/GetCoachDetailsByID",
        data: '{CoachID: "' + CoachID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnCoachUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
}
var hdnCoachID = 0;
function OnCoachUpdateSuccess(response) {
    var res = response.d;
    if (res.length > 0) {
        hdnCoachID = res[0].CoachID;

        $("#txtFirstName").val(res[0].FirstName);
        $("#txtMiddleName").val(res[0].MiddleName);
        $("#txtLastName").val(res[0].LastName);
        $("#txtEmailid").val(res[0].EmailID);
        $("#txtEmailid").attr("disabled", "disabled");
        $("#txtEmailid").attr("title", res[0].EmailID);
        $("#txtMobileNo").val(res[0].MobileNo);
        $("#txtMobileNo").attr("disabled", "disabled");
        $("#txtMobileNo").attr("title", res[0].MobileNo);
        var Gender = res[0].Gender;

        $("input:radio[name='rbGender']").prop("checked", false);

        if (Gender != "")
            $("input:radio[name='rbGender'][value='" + Gender + "']").prop("checked", true);

        $("#txtPassword").val(res[0].Password);
        $("#txtPassword").attr("disabled", "disabled");
        $("#txtPassword").attr("title", res[0].MobileNo);
        $("#txtConfirmPassword").val(res[0].Password);
        $("#txtConfirmPassword").attr("disabled", "disabled");
        $("#txtConfirmPassword").attr("title", res[0].Password);

        $("#txtDOB").val(res[0].DOB).trigger('change');
        $("#txtDOJ").val(res[0].DOJ).trigger('change');
        $("#ddlBloodGroup").val(res[0].BloodGroupID).trigger('change');
        $("#txtNationality").val(res[0].Nationality);
        $("#ddlCasteCategory").val(res[0].CasteCategoryID).trigger('change');
        $("#txtCast").val(res[0].Caste);
        $("#txtSubCaste").val(res[0].SubCaste);
        $("#ddlReligion").val(res[0].ReligionID).trigger('change');
        $("#txtOtherReligion").val(res[0].ReligionOther);
        $("#txtLocalAddress").val(res[0].LocalAddress);
        $("#txtPincode").val(res[0].LocalPincode);
        $("#ddlState").val(res[0].LocalStateID).trigger('change');
        GetCityMaster();
        GetDistrictMaster();
        $("#ddlCity").val(res[0].LocalCityID).trigger('change');
        $("#ddlDistrict").val(res[0].LocalDistrictID).trigger('change');
        $("#chkSamePermanentAddress").prop('checked', res[0].IsSamePermanentAddress);
        SamePermanentAddressChange();
        $("#txtPermanentAddress").val(res[0].PermanentAddress);
        $("#txtPermanentPincode").val(res[0].PermanentPincode);
        $("#ddlPermanentState").val(res[0].PermanentStateID);
        GetPermanentCityMaster();
        GetPermanentDistrictMaster();
        $("#ddlPermanentCity").val(res[0].PermanentCityID).trigger('change');
        $("#ddlPermanentDistrict").val(res[0].PermanentDistrictID).trigger('change');

        $('.nav-tabs a[href="#home-b1"]').tab('show');
        $("[id=btnSubmit]").html("Update");
        $("[id=btnSubmit]").attr('disabled', false);

    }
    return false;
};

function ViewCoachDetails(CoachID) {
    $("#modalCoachDetail").modal("show");
    $("#lblDOJ").text('');
    $("#lblBloodGroup").text('');
    $("#lblNationality").text('');
    $("#lblCasteCategory").text('');
    $("#lblReligion").text('');
    $("#lblreligionother").text('');
    $("#lblCity").text('');
    $("#lblDistrict").text('');

    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCoach.asmx/GetCoachDetailsByID",
        data: '{CoachID: "' + CoachID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var res = response.d;
            if (res.length > 0) {
                $("#lblDOJ").text(res[0].DOJ);
                $("#lblBloodGroup").text(res[0].BloodGroup);
                $("#lblNationality").text(res[0].Nationality);
                $("#lblCasteCategory").text(res[0].CasteCategory);
                $("#lblReligion").text(res[0].Religion);
                $("#lblCity").text(res[0].CityName);
                $("#lblDistrict").text(res[0].DistrictName);
            }
            else {
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
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
};


