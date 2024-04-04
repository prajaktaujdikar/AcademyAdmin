$(function () {
    $('.nav-second-level').addClass("mm-show");
    $('#candidateMenu').addClass("mm-active");
    $(".select2").select2();
    GetDefaultDate();
    GetBloodGroupList();
    GetCasteCategoryList();
    GetReligionMasterList();
    GetStateMasterList();
    GetPermanentStateMasterList();

    EditCandidateDetails(candidateID);

    $('#txtFirstName').focus();
});

function GetDefaultDate() {
    flatpickr("#txtDOB", {
        "dateFormat": "d/m/Y",
        "allowInput": true,
        "onOpen": function (selectedDates, dateStr, instance) {
            instance.setDate(instance.input.value, false);
        },
    });
};

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

$("#txtDOB").on('change', function () {
    var dob = $("#txtDOB").val().trim();;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (dob != '') {
        if (format.test(dob)) {
            return true;
        } else {
            $("#txtDOB").focus();
            swal.fire("", "Enter valid birth date.", "warning");
            return false;
        }
    }
});

function GetStateMasterList() {
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

function GetPermanentStateMasterList() {
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

    if (State && State != 0) {
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

    if (State && State != 0) {
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
    var txtMobileNo = document.getElementById('txtMobileNo');

    if (txtMobileNo.value) {
        $.ajax({
            type: "POST",
            url: " /assets/PageService/WS_CandidateUpdate.asmx/CheckMobileNoExists",
            data: '{MobileNo : "' + txtMobileNo.value + '", WSPassword: "' + WSPassword + '", CandidateId: ' + hdnCandidateID + '}',
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
                    txtMobileNo.focus();
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
            url: "/assets/PageService/WS_CandidateUpdate.asmx/CheckEmailIDExists",
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
    var BloodGroup = $("#ddlBloodGroup").val();
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
        swal.fire("", "mobile no already registered!.", "warning");
        return false;
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
        swal.fire("", " email-id already registered!", "warning");
        return false;
    }
    else if (DOB != "" && new Date() < new Date(DOB.substring(3, 5) + "/" + DOB.substring(0, 2) + "/" + DOB.substring(6, 10))) {
        $("#txtDOB").focus();
        swal.fire("", "Future date are not accepted for birth date.", "warning");
        return false;
    }
    else if (IsOtherReligion == true && ReligionOther == "") {
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
    else {
        var data = {};
        data.CandidateID = hdnCandidateID;

        data.FirstName = FirstName;
        data.MiddleName = MiddleName;
        data.LastName = LastName;
        data.EmailID = EmailID;
        data.MobileNo = MobileNo;
        data.Gender = Gender;
        data.DOB = DOB;
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
            url: "/assets/PageService/WS_CandidateUpdate.asmx/UpdateCandidate",
            data: '{candidateDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
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
                    location.href = '/Candidate.aspx';
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
    location.href = '/Candidate.aspx';
    return false;
});

function EditCandidateDetails(CandidateID) {
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CandidateUpdate.asmx/GetCandidateDetailsByID",
        data: '{CandidateID: "' + CandidateID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnCandidateUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
}

var hdnCandidateID = 0;
function OnCandidateUpdateSuccess(response) {
    var res = response.d;
    if (res.length > 0) {
        hdnCandidateID = res[0].CandidateID;

        $("#txtFirstName").val(res[0].FirstName);
        $("#txtMiddleName").val(res[0].MiddleName);
        $("#txtLastName").val(res[0].LastName);
        $("#txtEmailid").val(res[0].EmailID);
        $("#txtEmailid").attr("disabled", "disabled");
        $("#txtEmailid").attr("title", res[0].EmailID);
        $("#txtMobileNo").val(res[0].MobileNo);
        $("#txtMobileNo").attr("title", res[0].MobileNo);
        var Gender = res[0].Gender;

        $("input:radio[name='rbGender']").prop("checked", false);

        if (Gender != "")
            $("input:radio[name='rbGender'][value='" + Gender + "']").prop("checked", true);

        $("#txtDOB").val(res[0].DOB).trigger('change');
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

        $("[id=btnSubmit]").html("Update");
        $("[id=btnSubmit]").attr('disabled', false);
    } else {
        location.href = '/Candidate.aspx';
    }
};