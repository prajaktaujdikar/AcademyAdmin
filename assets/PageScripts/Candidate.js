$(function () {
    $('.nav-second-level').addClass("mm-show");
    $('#candidateMenu').addClass("mm-active");
    GetCandidateDetails(1);
});

function GetCandidateDetails(pageIndex) {
    var CandidateName = $("#txtSearchCandidateName").val();
    var EmailID = $("#txtSearchEmailID").val();
    var MobileNo = $("#txtSearchMobileNo").val();

    var data = {};
    data.CandidateName = CandidateName;
    data.EmailID = EmailID;
    data.MobileNo = MobileNo;

    $("#divCandidateDetailList").css("display", "none");
    var PagerLimit = 20;

    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_Candidate.asmx/GetCandidateDetailList",
        data: '{pageIndex: ' + pageIndex + ', PageSize: ' + PagerLimit + ',candidateDetails: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
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
                OnCandidateMemberSuccess(response);
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

var RowCandidateProgram;
function OnCandidateMemberSuccess(response) {
    $("#divCandidateDetailList").css("display", "block");
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (RowCandidateProgram == null)
        RowCandidateProgram = $("[id=tblCandidateList] tbody tr:last-child").clone(true);
    $("[id=tblCandidateList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", RowCandidateProgram).eq(0).text($(this).find("RowNumber").text());
            $("td", RowCandidateProgram).eq(1).text($(this).find("CandidateName").text());
            $("td", RowCandidateProgram).eq(2).text($(this).find("GenderText").text());
            $("td", RowCandidateProgram).eq(3).text($(this).find("DOB").text());
            $("td", RowCandidateProgram).eq(4).text($(this).find("EmailID").text());
            $("td", RowCandidateProgram).eq(5).text($(this).find("MobileNo").text());

            var strAction = '';
            strAction += '<button type="button" title="View" class="btn btn-success btn-icon" onClick="ViewCandidateDetails(' + $(this).find("CandidateID").text() + ')"><i class="fa fa-eye"></i></button>';
            strAction += '<button type="button" title="Edit" onClick="RedirectToEditPage(' + $(this).find("CandidateID").text() + ')" class="btn btn-info waves-effect waves-light ml-2"><i class="fa fa-edit"></i></button>&nbsp&nbsp&nbsp';

            $("td", RowCandidateProgram).eq(6).html(strAction);

            $("[id=tblCandidateList] tbody").append(RowCandidateProgram);
            RowCandidateProgram = $("[id=tblCandidateList] tbody tr:last-child").clone(true);
        });
        var pager = xml.find("Pager");

        $("[id=divpager]").css({ 'display': 'block' });
    }
    else {
        var empty_row9 = RowCandidateProgram.clone(true);
        $("td:first-child", empty_row9).attr("colspan", $("td", RowCandidateProgram).length);
        $("td:first-child", empty_row9).attr("align", "center");
        $("td:first-child", empty_row9).html("No records found for the search criteria.");
        $("td", empty_row9).not($("td:first-child", empty_row9)).remove();
        $("[id*=tblCandidateList] tbody").append(empty_row9);
        $("[id=divpager]").hide();
    }
    if (pager) {
        $(".Pager").ASPSnippets_Pager({
            ActiveCssClass: "current",
            PagerCssClass: "pager",
            PageIndex: parseInt(pager.find("PageIndex").text()),
            PageSize: parseInt(pager.find("PageSize").text()),
            RecordCount: parseInt(pager.find("RecordCount").text())
        });
    }
};

$(".Pager").on("click", '.page', function () {
    GetCandidateDetails(parseInt($(this).attr('page')));
});

function RedirectToEditPage(CandidateID) {
    location.href = `/CandidateUpdate/${CandidateID}`
}

function ViewCandidateDetails(CandidateID) {
    $("#modalCandidateDetail").modal("show");
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CandidateUpdate.asmx/GetCandidateDetailsByID",
        data: '{CandidateID: "' + CandidateID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnCandidateDetailsUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
};

function OnCandidateDetailsUpdateSuccess(response) {
    $("#DivModalDetails").css("display", "block");
    var res = response.d;
    if (res.length > 0) {
        $("#lblFirstName").text(res[0].FirstName);
        $("#lblMiddleName").text(res[0].MiddleName);
        $("#lblLastName").text(res[0].LastName);
        $("#lblEmailid").text(res[0].EmailID);
        $("#lblMobileNo").text(res[0].MobileNo);
        var Gender = res[0].Gender;
        if (Gender === 'F') {
            $(`#lblFemaleGender`).removeClass('d-none');
        } else if (Gender === 'M') {
            $(`#lblMaleGender`).addClass('d-block');
        } else {
            $(`#lblOtherGender`).addClass('d-block');
        }
        $("#lblDOB").text(res[0].DOB);
        $("#lblBloodGroup").text(res[0].BloodGroup);
        $("#lblNationality").text(res[0].Nationality);
        $("#lblCasteCategory").text(res[0].CasteCategory);
        $("#lblCast").text(res[0].Caste);
        $("#lblSubCaste").text(res[0].SubCaste);
        $("#lblReligion").text(res[0].Religion);
        $("#lblOtherReligion").text(res[0].ReligionOther);
        $("#lblLocalAddress").text(res[0].LocalAddress);
        $("#lblPincode").text(res[0].LocalPincode);
        $("#lblState").text(res[0].LocalStateName);
        $("#lblCity").text(res[0].CityName);
        $("#lblDistrict").text(res[0].DistrictName);
        if (res[0].isSamePermanentAddress) {
            $("#permanentAddress").addClass('d-block');
            $("#lblPermanentAddress").text(res[0].PermanentAddress);
            $("#lblPermanentPincode").text(res[0].PermanentPincode);
            $("#lblPermanentState").text(res[0].PermanentStateName);
            $("#lblPermanentCity").text(res[0].PermanentCityName);
            $("#lblPermanentDistrict").text(res[0].PermanentDistrictName);
        }
    }
};

$("#btnSearch").click(function () {
    GetCandidateDetails(1);
});

$("#btnSearchCancel").click(function () {
    $("#txtSearchCandidateName").val('');
    $("#txtSearchMobileNo").val('');
    $("#txtSearchEmailID").val('');
    GetCandidateDetails(1);
});
