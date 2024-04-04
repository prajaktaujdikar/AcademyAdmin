var courseList = [];
var batchStatusList = [];
var RowBatch;
var RowBatchDetail;
var hdnBatchID = 0;
var hdnBatchDetailID = 0;

$(function () {
    $(".select2").select2();
    $('.nav-second-level').addClass("mm-show");
    $('#batchMenu').addClass("mm-active");

    GetCourseMasterList();
    GetBatchStatusList();
    GetBatchList(1);
});

function GetCourseMasterList() {
    var ddlCourse = $("#ddlCourse");
    var searchDdlCourse = $("#searchDdlCourse");
    var courseId = $("#searchDdlCourse").val();
    $("#ddlCourse").empty();
    $("#searchDdlCourse").empty();
    ddlCourse.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    searchDdlCourse.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCourseListForBatch",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            courseList = response.d
            $.each(response.d, function () {
                ddlCourse.append($("<option></option>").val(this['CourseID']).html(this['CourseName']));
                searchDdlCourse.append($("<option></option>").val(this['CourseID']).html(this['CourseName']));
            });

            $("#ddlCourse").val('0');
            $("#searchDdlCourse").val(courseId || 0);
        }
    });
}

function GetBatchStatusList() {
    var ddlBatchStatus = $("#ddlBatchStatus");
    var searchDdlBatchStatus = $("#searchDdlBatchStatus");
    var batchStatusId = $("#searchDdlBatchStatus").val();
    $("#ddlBatchStatus").empty();
    $("#searchDdlBatchStatus").empty();
    ddlBatchStatus.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    searchDdlBatchStatus.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetBatchStatusMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            batchStatusList = response.d;
            $.each(batchStatusList, function () {
                ddlBatchStatus.append($("<option></option>").val(this['BatchStatusID']).html(this['BatchStatus']));
                searchDdlBatchStatus.append($("<option></option>").val(this['BatchStatusID']).html(this['BatchStatus']));
            });
            $("#ddlBatchStatus").val('0');
            $("#searchDdlBatchStatus").val(batchStatusId || 0);
        }
    });
}

function GetCourseDetailMasterList(BatchId) {
    var ddlCourseDetail = $("#ddlCourseDetail");
    $("#ddlCourseDetail").empty();
    ddlCourseDetail.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCourseDetailListForBatch",
        data: '{BatchId: '+ BatchId +', WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            courseList = response.d
            $.each(response.d, function () {
                ddlCourseDetail.append($("<option></option>").val(this['CourseDetailID']).html(this['CourseDetailTitle']));
            });

            $("#ddlCourseDetail").val('0');
        }
    });
}

function GetBatchList(pageIndex) {
    var BatchName = $("#searchTxtBatchName").val();
    var CourseID = $("#searchDdlCourse").val();
    var BatchStatusID = $("#searchDdlBatchStatus").val();

    var data = {};
    data.BatchName = BatchName;
    data.CourseID = CourseID || 0;
    data.BatchStatusID = BatchStatusID || 0;

    ClearBatch();
    $("#divBatchList").css("display", "none");
    var PagerLimit = 20;

    $.ajax({
        type: "POST",
        url: "/assets/PageService/Coach/WS_ManageBatch.asmx/GetBatchList",
        data: '{pageIndex: ' + pageIndex + ', PageSize: ' + PagerLimit + ',batch:' + JSON.stringify(data) + ',WSPassword: "' + WSPassword + '"}',
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
                OnBatchSuccess(response);
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

function OnBatchSuccess(response) {
    $("#divBatchList").css("display", "block");
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (RowBatch == null)
        RowBatch = $("[id=tblBatchList] tbody tr:last-child").clone(true);
    $("[id=tblBatchList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", RowBatch).eq(0).text($(this).find("RowNumber").text());
            $("td", RowBatch).eq(1).text($(this).find("BatchNo").text());
            $("td", RowBatch).eq(2).text($(this).find("BatchName").text());
            $("td", RowBatch).eq(3).text($(this).find("CourseTitle").text());
            $("td", RowBatch).eq(4).text($(this).find("BatchStatus").text());

            var strAction = '';
            strAction += '<button type="button" title="Batch Detail" class="btn btn-success btn-icon btn-sm mr-1" onClick="ViewBatchDetail(' + $(this).find("BatchID").text() + ')">Batch Detail</button>';
            strAction += '<button type="button" title="Candidate Detail" class="btn btn-success btn-icon btn-sm" onClick="ViewCandidateDetail(' + $(this).find("BatchID").text() + ')">Candidate Detail</button>';
            strAction += '<button type="button" title="Edit" class="btn btn-info waves-effect waves-light ml-1 btn-sm" onclick="return EditBatch(' + $(this).find("BatchID").text() + ')"><i class="fa fa-edit"></i></button>';
            strAction += '<button type="button" title="Delete" class="btn btn-danger waves-effect waves-light ml-1 btn-sm" onclick="return DeleteBatch(' + $(this).find("BatchID").text() + ')"><i class="fa fa-trash"></i></button>';

            $("td", RowBatch).eq(5).html(strAction);

            $("[id=tblBatchList] tbody").append(RowBatch);
            RowBatch = $("[id=tblBatchList] tbody tr:last-child").clone(true);
        });
        var pager = xml.find("Pager");

        $("[id=divpager]").css({ 'display': 'block' });
    }
    else {
        var empty_row9 = RowBatch.clone(true);
        $("td:first-child", empty_row9).attr("colspan", $("td", RowBatch).length);
        $("td:first-child", empty_row9).attr("align", "center");
        $("td:first-child", empty_row9).html("No records found for the search criteria.");
        $("td", empty_row9).not($("td:first-child", empty_row9)).remove();
        $("[id*=tblBatchList] tbody").append(empty_row9);
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
    GetBatchList(parseInt($(this).attr('page')));
});

function DeleteBatch(BatchID) {
    swal.fire({
        title: "Are you sure you want to delete batch?",
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
                url: "/assets/PageService/Coach/WS_ManageBatch.asmx/DeleteBatch",
                data: '{batchID: ' + BatchID + ', WSPassword: "' + WSPassword + '"}',
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
                        GetBatchList(1);
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

function EditBatch(BatchID) {
    $("#ddlCourse").attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "/assets/PageService/Coach/WS_ManageBatch.asmx/GetBatchByID",
        data: '{batchId: "' + BatchID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnBatchUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
}

function OnBatchUpdateSuccess(response) {
    var res = response.d;
    if (res) {
        hdnBatchID = res.BatchID;

        $("#txtBatchName").val(res.BatchName);
        $("#ddlCourse").val(res.CourseID).trigger('change');
        $("#ddlBatchStatus").val(res.BatchStatusID).trigger('change');

        $('.nav-tabs a[href="#home-b1"]').tab('show');
        $("[id=btnSubmit]").html("Update");
        $("[id=btnSubmit]").attr('disabled', false);
    }
    return false;
};

$("#btnSubmit").click(function () {
    var batchName = $("#txtBatchName").val();
    var course = $("#ddlCourse").val();
    var batchstatus = $("#ddlBatchStatus").val();

    if (batchName == "") {
        $("#txtBatchName").focus();
        swal.fire("", "Enter Batch Name.", "warning");
        return false;
    }
    else if (!course || course == "") {
        $("#ddlCourse").focus();
        swal.fire("", "Select Course.", "warning");
        return false
    }
    else if (!batchstatus || batchstatus == "") {
        $("#ddlBatchStatus").focus();
        swal.fire("", "Enter Batch Status.", "warning");
        return false;
    }
    else {
        var data = {};
        data.BatchID = hdnBatchID;
        data.BatchName = batchName;
        data.BatchStatusID = +batchstatus;
        data.CourseID = +course;

        $.ajax({
            type: "POST",
            url: "/assets/PageService/Coach/WS_ManageBatch.asmx/ManageBatch",
            data: '{batch:' + JSON.stringify(data) + ', WSPassword:"' + WSPassword + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (response) {
                var res = response.d;
                if (res.indexOf("CatchError") > -1) {
                    swal.fire("", res, "warning");
                    return false;
                }
                else if (res == "SessionExpire") {
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
                    ClearBatch();
                    swal.fire("", res, "success");
                    setTimeout(() => {
                        GetBatchList(1);
                        $('.nav-tabs a[href="#profile-b1"]').tab('show');
                    }, 500);
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

function ClearBatch() {
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);

    $("#txtBatchName").val('');
    $("#ddlCourse").select2('val', '0');
    $("#ddlBatchStatus").val('');
    GetCourseMasterList();
    GetBatchStatusList();

    hdnCourseID = 0;
}

$("#btnSearchSubmit").click(function () {
    GetBatchList(1);
});

$("#btnSearchCancel").click(function () {
    $("#searchTxtBatchName").val('');
    $("#searchDdlCourse").val('0');
    $("#searchDdlBatchStatus").val('0');
    GetBatchList(1);
});

//Batch Detail
function ViewBatchDetail(batchId) {
    hdnBatchID = batchId;
    GetCourseDetailMasterList(batchId);
    GetDefaultDate();
    GetBatchDetail(batchId);
    $("#modalBatchDetail").modal('show');
}

function openSessionLink() {
    if ($("#chkIsSessionLive").prop("checked") == true) {
        $(".divSessionLink").removeClass("d-none").addClass("d-block");
    } else {
        $(".divSessionLink").removeClass("d-block").addClass("d-none");
    }
}

function GetBatchDetail(batchId) {
    ClearBatchDetail();
    $("#divBatchDetailList").css("display", "none");
    var PagerLimit = -1;

    $.ajax({
        type: "POST",
        url: "/assets/PageService/Coach/WS_ManageBatch.asmx/GetBatchDetailList",
        data: '{pageIndex: ' + -1 + ', PageSize: ' + -1 + ',batchId:' + batchId + ',WSPassword: "' + WSPassword + '"}',
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
                OnBatchDeailSuccess(response);
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

function OnBatchDeailSuccess(response) {
    $("#divBatchDetailList").css("display", "block");
    $("[id=btnSubmitBatchDetail]").html("Submit");
    $("[id=btnSubmitBatchDetail]").attr('disabled', false);
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (RowBatchDetail == null)
        RowBatchDetail = $("[id=tblBatchDetailList] tbody tr:last-child").clone(true);
    $("[id=tblBatchDetailList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", RowBatchDetail).eq(0).text($(this).find("RowNumber").text());
            $("td", RowBatchDetail).eq(1).text($(this).find("CourseDetailTitle").text());
            $("td", RowBatchDetail).eq(2).text($(this).find("SessionDateTime").text());
            $("td", RowBatchDetail).eq(3).text($(this).find("SessionLiveLink").text());
            $("td", RowBatchDetail).eq(4).text($(this).find("SessionLiveLinkDescription").text());
            $("td", RowBatchDetail).eq(5).text($(this).find("IsSessionLive").text());
            $("td", RowBatchDetail).eq(6).text($(this).find("SessionRecordLink").text());
            $("td", RowBatchDetail).eq(7).text($(this).find("SessionRecordLinkDescription").text());

            var strAction = '';
            strAction += '<button type="button" title="Edit" class="btn btn-info waves-effect waves-light btn-sm" onclick="return EditBatchDetail(' + $(this).find("BatchDetailID").text() + ')"><i class="fa fa-edit"></i></button>';
            strAction += '<button type="button" title="Delete" class="btn btn-danger waves-effect waves-light btn-sm" onclick="return DeleteBatchDetail(' + $(this).find("BatchDetailID").text() + ')"><i class="fa fa-trash"></i></button>';

            $("td", RowBatchDetail).eq(8).html(strAction);

            $("[id=tblBatchDetailList] tbody").append(RowBatchDetail);
            RowBatchDetail = $("[id=tblBatchDetailList] tbody tr:last-child").clone(true);
        });
    }
    else {
        var empty_row9 = RowBatchDetail.clone(true);
        $("td:first-child", empty_row9).attr("colspan", $("td", RowBatchDetail).length);
        $("td:first-child", empty_row9).attr("align", "center");
        $("td:first-child", empty_row9).html("No records found for the search criteria.");
        $("td", empty_row9).not($("td:first-child", empty_row9)).remove();
        $("[id*=tblBatchDetailList] tbody").append(empty_row9);
    }
};

function ClearBatchDetail() {

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

$("#sessionDateTime").on('change', function () {
    var dob = $("#sessionDateTime").val().trim();;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (dob != '') {
        if (format.test(dob)) {
            return true;
        } else {
            $("#sessionDateTime").focus();
            swal.fire("", "Enter valid session date.", "warning");
            return false;
        }
    }
});

$("#btnSubmitBatchDetail").click(function () {
    var courseDetailId = $("#ddlCourseDetail").val();
    var sessionDateTime = $("#sessionDateTime").val().trim();
    var sessionLiveLink = $("#txtSessionLiveLink").val();
    var sessionLiveLinkDesc = $("#txtSessionLiveLinkDesc").val();
    var isSessionLive = $("#chkIsSessionLive").prop("checked");
    var sessionRecordLink = $("#txtSessionRecordLink").val();
    var sessionRecordLinkDesc = $("#txtSessionRecordLinkDesc").val();

    if (courseDetailId == "") {
        $("#ddlCourseDetail").focus();
        swal.fire("", "Select Course Detail.", "warning");
        return false;
    }
    else if (sessionDateTime == "") {
        $("#sessionDateTime").focus();
        swal.fire("", "Select Valid Datetime", "warning");
        return false
    }
    else if (sessionLiveLink == "") {
        $("#txtSessionLiveLink").focus();
        swal.fire("", "Enter Session live link.", "warning");
        return false;
    }
    else if (isSessionLive && sessionRecordLink == "") {
        $("#txtSessionRecordLink").focus();
        swal.fire("", "Enter Session Record link.", "warning");
        return false;
    }
    else if (isSessionLive && sessionRecordLinkDesc == "") {
        $("#txtSessionRecordLinkDesc").focus();
        swal.fire("", "Enter Session Record link description.", "warning");
        return false;
    }
    else {
        var data = {};
        data.BatchDetailID = +hdnBatchDetailID;
        data.BatchID = +hdnBatchID;
        data.CourseDetailId = +courseDetailId;
        data.SessionDateTime = sessionDateTime;
        data.SessionLiveLink = sessionLiveLink;
        data.SessionLiveLinkDesc = sessionLiveLinkDesc;
        data.IsSessionLive = isSessionLive;
        data.SessionRecordLink = sessionRecordLink;
        data.SessionRecordLinkDesc = sessionRecordLinkDesc;

        $.ajax({
            type: "POST",
            url: "/assets/PageService/Coach/WS_ManageBatch.asmx/ManageBatchDetail",
            data: '{batchDetail:' + JSON.stringify(data) + ', WSPassword:"' + WSPassword + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (response) {
                var res = response.d;
                if (res.indexOf("CatchError") > -1) {
                    swal.fire("", res, "warning");
                    return false;
                }
                else if (res == "SessionExpire") {
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
                    ClearBatch();
                    swal.fire("", res, "success");
                    setTimeout(() => {
                        GetBatchList(1);
                        $('.nav-tabs a[href="#profile-b1"]').tab('show');
                    }, 500);
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

//Candidate Detail
function ViewCandidateDetail() {
    $("#modalCandidateDetail").modal('show');
}

