var hdnCourseID = 0;
var hdnCourseDetailID = 0;
var courseTypeList = [];
var courseLanguageData = [];
var courseCoachData = [];
var RowCourse;
var RowCourseDetail;
var IsSessionRecorded = false;
$(function () {
    $(".select2").select2();
    $('.nav-second-level').addClass("mm-show");
    $('#courseMenu').addClass("mm-active");
    GetCourseList(1);
    GetCourseTypeMasterList();
    GetLanguageMasterList();
    GetCoachList();

    $('#txtTitle').focus();
    $("#txtCGSTPer").attr('disabled', true);
    $("#ddlCourseType").attr('disabled', false);
});

function GetCourseTypeMasterList() {
    var ddlCourseType = $("#ddlCourseType");
    var searchDdlCourseType = $("#searchDdlCourseType");
    var CourseTypeId = $("#searchDdlCourseType").val();
    $("#ddlCourseType").empty();
    $("#searchDdlCourseType").empty();
    ddlCourseType.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    searchDdlCourseType.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCourseTypeMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            courseTypeList = response.d
            $.each(response.d, function () {
                ddlCourseType.append($("<option></option>").val(this['CourseTypeID']).html(this['CourseType']));
                searchDdlCourseType.append($("<option></option>").val(this['CourseTypeID']).html(this['CourseType']));
            });

            $("#ddlCourseType").val('0');
            $("#searchDdlCourseType").val(CourseTypeId);
        }
    });
}

function GetLanguageMasterList() {
    var ddlLanguage = $("#ddlLanguage");
    $("#ddlLanguage").empty();
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetLanguageMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            let languages = response.d;
            $.each(languages, function () {
                ddlLanguage.append(`<input type="checkbox" id="${this['LanguageID']}" name="CourseLanguage" value="${this['Language']}" class="form-check-input languages">`)
                    .append(`<label class="form-check-label" for="${this['LanguageID']}">${this['Language']}</label>`)
                    .append(`<br>`);
            });
        }
    });
}

function GetCoachList() {
    var ddlCoach = $("#ddlCoach");
    $("#ddlCoach").empty();
    ddlCoach.append($("<option disabled></option>").val(0).html("-- SELECT --"));
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_CommonPageMethods.asmx/GetCoachMasterList",
        data: '{WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function () {
                ddlCoach.append($("<option></option>").val(this['CoachID']).html(this['CoachName']));
            });
            setTimeout(() => {
                $('#ddlCoach').select2();
            }, 200);
        }
    });
}

function GetCourseList(pageIndex) {
    var CourseName = $("#txtSearchCourseName").val();
    var CourseTypeId = $("#searchDdlCourseType").val();

    var data = {};
    data.CourseTitle = CourseName;
    data.CourseTypeID = CourseTypeId || 0;

    ClearCourse();
    $("#divCourseList").css("display", "none");
    var PagerLimit = 20;

    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/GetCourseList",
        data: '{pageIndex: ' + pageIndex + ', PageSize: ' + PagerLimit + ',course: ' + JSON.stringify(data) + ',WSPassword: "' + WSPassword + '"}',
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
                OnCourseSuccess(response);
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

function OnCourseSuccess(response) {
    $("#divCourseList").css("display", "block");
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (RowCourse == null)
        RowCourse = $("[id=tblCourseList] tbody tr:last-child").clone(true);
    $("[id=tblCourseList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", RowCourse).eq(0).text($(this).find("RowNumber").text());
            $("td", RowCourse).eq(1).text($(this).find("CourseTitle").text());
            $("td", RowCourse).eq(2).text($(this).find("CourseType").text());
            $("td", RowCourse).eq(3).text($(this).find("CourseDescription").text());
            $("td", RowCourse).eq(4).text($(this).find("DescriptiveVideoURL").text());
            $("td", RowCourse).eq(5).text($(this).find("Price").text());
            $("td", RowCourse).eq(6).text($(this).find("SGSTPer").text());
            $("td", RowCourse).eq(7).text($(this).find("CGSTPer").text());
            $("td", RowCourse).eq(8).text($(this).find("CourseLanguage").text());
            $("td", RowCourse).eq(9).text($(this).find("CourseCoach").text());

            var strAction = '';
            strAction += '<button type="button" title="View" class="btn btn-success btn-icon btn-sm" onClick="ViewCourseDetail(' + $(this).find("CourseID").text() + ', ' + $(this).find("IsSessionRecorded").text() + ')"><i class="fa fa-eye"></i></button>';
            strAction += '<button type="button" title="Edit" class="btn btn-info waves-effect waves-light ml-1 btn-sm" onclick="return EditCourse(' + $(this).find("CourseID").text() + ')"><i class="fa fa-edit"></i></button>';
            strAction += '<button type="button" title="Delete" class="btn btn-danger waves-effect waves-light ml-1 btn-sm" onclick="return DeleteCourse(' + $(this).find("CourseID").text() + ')"><i class="fa fa-trash"></i></button>';

            $("td", RowCourse).eq(10).html(strAction);

            $("[id=tblCourseList] tbody").append(RowCourse);
            RowCourse = $("[id=tblCourseList] tbody tr:last-child").clone(true);
        });
        var pager = xml.find("Pager");

        $("[id=divpager]").css({ 'display': 'block' });
    }
    else {
        var empty_row9 = RowCourse.clone(true);
        $("td:first-child", empty_row9).attr("colspan", $("td", RowCourse).length);
        $("td:first-child", empty_row9).attr("align", "center");
        $("td:first-child", empty_row9).html("No records found for the search criteria.");
        $("td", empty_row9).not($("td:first-child", empty_row9)).remove();
        $("[id*=tblCourseList] tbody").append(empty_row9);
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
    GetCourseList(parseInt($(this).attr('page')));
});

$("#btnSubmit").click(function () {
    var title = $("#txtTitle").val();
    var courseType = $("#ddlCourseType").val();
    var description = $("#txtDescription").val();
    var videoURL = $("#txtVideoURL").val();
    var price = $("#txtPrice").val();
    var SGSTPer = $("#txtSGSTPer").val().trim();
    var CGSTPer = $("#txtCGSTPer").val().trim();
    var isFreeCourse = false;
    if (courseType && courseTypeList) {
        isFreeCourse = courseTypeList.filter(x => x.CourseTypeID == courseType)[0].IsFree;
    }

    var language = [];
    $('input[name="CourseLanguage"]:checked').each(function () {
        language.push(this.id);
    });
    var coach = $("#ddlCoach").val();

    if (title == "") {
        $("#txtTitle").focus();
        swal.fire("", "Enter Title.", "warning");
        return false;
    }
    else if (!courseType || courseType == "") {
        $("#ddlCourseType").focus();
        swal.fire("", "Select course type.", "warning");
        return false
    }
    else if (price == 0 && !isFreeCourse) {
        $("#txtPrice").focus();
        swal.fire("", "Enter price.", "warning");
        return false;
    }
    else if (SGSTPer == 0 && !isFreeCourse) {
        $("#txtSGSTPer").focus();
        swal.fire("", "Enter SGST percentage.", "warning");
        return false;
    }
    else if (CGSTPer == 0 && !isFreeCourse) {
        $("#txtCGSTPer").focus();
        swal.fire("", "Enter CGST percentage.", "warning");
        return false;
    }
    else if (language.length == 0) {
        //$("#ddlLanguage").focus();
        /*$("input[name^=CourseLanguage]")[0].checked = true;*/
        $("input[name^=CourseLanguage]")[0].focus();
        swal.fire("", "Select atleast one language.", "warning");
        
        return false;
    }
    else if (coach.length == 0) {
        $("#ddlCoach").focus();
        swal.fire("", "Select atleast one coach.", "warning");
        return false;
    }
    else {
        var data = {};
        data.CourseID = hdnCourseID;
        data.CourseTitle = title;
        data.CourseTypeID = courseType;
        data.CourseDescription = description;
        data.DescriptiveVideoURL = videoURL;
        data.Price = +price;
        data.SGSTPer = +SGSTPer;
        data.CGSTPer = +CGSTPer;
        data.IsSessionRecorded = $("#chkIsSessionRecorded").is(":checked");

        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageCourse.asmx/ManageCourse",
            data: '{course: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (response) {
                var res = response.d;
                if (res.message.indexOf("CatchError") > -1) {
                    swal.fire("", res.message, "warning");
                    return false;
                }
                else if (res.message == "SessionExpire") {
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
                    if (res.courseId) {
                        AddCourseLanguages(language, res.courseId);
                        AddCourseCoaches(coach, res.courseId);
                    }
                    ClearCourse();
                    swal.fire("", res.message, "success");
                    setTimeout(() => {
                        GetCourseList(1);
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

function IsFreeCourse() {
    var courseType = $("#ddlCourseType").val();
    if (+courseType) {
        var isFreeCourse = courseTypeList.filter(x => x.CourseTypeID == courseType)[0].IsFree || false;
        if (isFreeCourse) {
            $("#txtPrice").val('');
            $("#txtSGSTPer").val('');
            $("#txtCGSTPer").val('');
            $("#txtPrice").attr('disabled', true);
            $("#txtSGSTPer").attr('disabled', true);
        } else {
            $("#txtPrice").attr('disabled', false);
            $("#txtSGSTPer").attr('disabled', false);
        }
    }
}

function AddCourseLanguages(languages, courseId) {
    var addCourseLanguage = [];
    var deletedCourseLanguage = [];
    languages.forEach(x => {
        let courseLanguage = courseLanguageData ? courseLanguageData.filter(cl => cl.LanguageID == x && cl.CourseID == courseId)[0] : null;
        let courseLanguageID = null;
        if (courseLanguage) {
            courseLanguageID = courseLanguage.CourseLanguageID;
        }

        addCourseLanguage.push({
            CourseLanguageID: +courseLanguageID,
            CourseID: courseId,
            LanguageID: +x
        });
    });

    let a = courseLanguageData.map(x => +x.CourseLanguageID);
    let b = addCourseLanguage.map(x => +x.CourseLanguageID);

    deletedCourseLanguage = $(a).not(b).get();

    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/ManageCourseLanguage",
        data: '{courseLanguages: ' + JSON.stringify(addCourseLanguage) + ', WSPassword: "' + WSPassword + '"}',
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
            DeleteCourseLanguage(deletedCourseLanguage);
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
}

function DeleteCourseLanguage(deletedCourseLanguage) {
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/DeleteCourseLanguage",
        data: '{courseLanguagesIds: ' + JSON.stringify(deletedCourseLanguage) + ', WSPassword: "' + WSPassword + '"}',
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
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
}

function AddCourseCoaches(Coaches, courseId) {
    var addCourseCoach = [];
    var deletedCourseCoach = [];
    Coaches.forEach(x => {
        let courseCoach = courseCoachData ? courseCoachData.filter(cl => cl.CoachID == x && cl.CourseID == courseId)[0] : null;
        let courseCoachID = null;
        if (courseCoach) {
            courseCoachID = courseCoach.CourseCoachID;
        }

        addCourseCoach.push({
            CourseCoachID: +courseCoachID,
            CourseID: courseId,
            CoachID: +x
        });
    });

    let a = courseCoachData.map(x => +x.CourseCoachID);
    let b = addCourseCoach.map(x => +x.CourseCoachID);

    deletedCourseCoach = $(a).not(b).get();

    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/ManageCourseCoach",
        data: '{courseCoaches: ' + JSON.stringify(addCourseCoach) + ', WSPassword: "' + WSPassword + '"}',
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
            DeleteCourseCoach(deletedCourseCoach);
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
}

function DeleteCourseCoach(deletedCourseCoach) {
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/DeleteCourseCoach",
        data: '{courseCoachIds: ' + JSON.stringify(deletedCourseCoach) + ', WSPassword: "' + WSPassword + '"}',
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
        },
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
}

function DeleteCourse(CourseID) {
    swal.fire({
        title: "Are you sure you want to delete course?",
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
                url: "/assets/PageService/WS_ManageCourse.asmx/DeleteCourse",
                data: '{courseID: ' + CourseID + ', WSPassword: "' + WSPassword + '"}',
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
                        GetCourseList(1);
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

function EditCourse(CourseID) {
    $("#ddlCourseType").attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/GetCourseByID",
        data: '{courseId: "' + CourseID + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnCourseUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
}

function OnCourseUpdateSuccess(response) {
    var res = response.d;
    if (res) {
        hdnCourseID = res.CourseID;

        $("#txtTitle").val(res.CourseTitle);
        $("#ddlCourseType").val(res.CourseTypeID).trigger('change');
        $("#txtDescription").val(res.CourseDescription);
        $("#txtVideoURL").val(res.DescriptiveVideoURL);
        $("#txtPrice").val(res.Price);
        $("#txtCGSTPer").val(res.CGSTPer);
        $("#txtSGSTPer").val(res.SGSTPer);
        $("#chkIsSessionRecorded").prop("disabled", true);
        $("#chkIsSessionRecorded").prop("checked", res.IsSessionRecorded);

        if (res.CourseLanguageIds) {
            var courseLanguage = res.CourseLanguageIds.split(",");
            $(".languages").prop("checked", false);
            courseLanguage.forEach((x) => {
                var languageId = x.split("|")[0];
                $(`#${languageId}`).prop("checked", true);
            });

            courseLanguage.forEach((x) => {
                courseLanguageId = x.split("|")[1];
                languageId = x.split("|")[0];
                courseLanguageData.push({
                    CourseLanguageID: courseLanguageId,
                    CourseID: res.CourseID,
                    LanguageID: languageId
                });
            });
        }

        if (res.CourseCoachIds) {
            var courseCoach = res.CourseCoachIds.split(",");
            let coachIds = [];
            courseCoach.forEach((x) => {
                var coachId = x.split("|")[0];
                coachIds.push(coachId);
            });
            $("#ddlCoach").val(coachIds).trigger('change');

            courseCoach.forEach((x) => {
                courseCoachID = x.split("|")[1];
                coachId = x.split("|")[0];
                courseCoachData.push({
                    CourseCoachID: courseCoachID,
                    CourseID: res.CourseID,
                    CoachID: coachId
                });
            });
        }

        $('.nav-tabs a[href="#home-b1"]').tab('show');
        $("[id=btnSubmit]").html("Update");
        $("[id=btnSubmit]").attr('disabled', false);
    }
    return false;
};

$("#btnCancel").click(function () {
    ClearCourse();
    return false;
});

function ClearCourse() {
    $("[id=btnSubmit]").html("Submit");
    $("[id=btnSubmit]").attr('disabled', false);

    $("#txtTitle").val('');
    $("#ddlCourseType").select2('val', '0');
    $("#txtDescription").val('');
    $("#txtVideoURL").val('');
    $("#txtPrice").val('');
    $("#txtSGSTPer").val('');
    $("#txtCGSTPer").val('');
    $("#chkIsSessionRecorded").prop("checked", false);
    $("#txtPrice").attr('disabled', false);
    $("#txtSGSTPer").attr('disabled', false);
    $("#txtCGSTPer").attr('disabled', true);
    $("#ddlCourseType").attr('disabled', false);

    GetCourseTypeMasterList();
    GetLanguageMasterList();
    GetCoachList();

    hdnCourseID = 0;
    courseLanguageData = [];
    courseCoachData = [];
}

function ViewCourseDetail(courseID, isSessionRecorded) {
    ClearCourseDetail();
    hdnCourseID = courseID;
    $("#modalCourseDetail").modal("show");
    IsSessionRecorded = isSessionRecorded;
    if (isSessionRecorded) {
        $("#SessionRecordDesc").removeClass("d-none").addClass("d-block");
        $("#SessionRecordLink").removeClass("d-none").addClass("d-block");
    } else {
        $("#SessionRecordDesc").removeClass("d-block").addClass("d-none");
        $("#SessionRecordLink").removeClass("d-block").addClass("d-none");
    }
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/GetCourseDetailList",
        data: '{courseID: ' + courseID +', pageIndex:-1, PageSize:-1, WSPassword: "' + WSPassword + '"}',
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
                OnCourseDetailSuccess(response);
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

function OnCourseDetailSuccess(response) {
    $("#divCourseDetailList").css("display", "block");
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    var Details = xml.find("DetailList");

    if (RowCourseDetail == null)
        RowCourseDetail = $("[id=tblCourseDetailList] tbody tr:last-child").clone(true);
    $("[id=tblCourseDetailList] tbody tr").remove();

    if (Details.length > 0) {
        $.each(Details, function () {
            $("td", RowCourseDetail).eq(0).text($(this).find("RowNumber").text());
            $("td", RowCourseDetail).eq(1).text($(this).find("CourseTitle").text());
            $("td", RowCourseDetail).eq(2).text($(this).find("CourseDetailTitle").text());
            $("td", RowCourseDetail).eq(3).text($(this).find("CourseDetail").text());
            $("td", RowCourseDetail).eq(4).text($(this).find("DescriptiveVideoURL").text());
            $("td", RowCourseDetail).eq(5).text($(this).find("OrderNo").text());
            $("td", RowCourseDetail).eq(6).text($(this).find("SessionRecordLink").text());
            $("td", RowCourseDetail).eq(7).text($(this).find("SessionRecordLinkDescription").text());

            var strAction = '';
            strAction += '<button type="button" title="Edit" class="btn btn-info waves-effect waves-light ml-1 btn-sm" onclick="return EditCourseDetail(' + $(this).find("CourseDetailID").text() + ')"><i class="fa fa-edit"></i></button>';
            strAction += '<button type="button" title="Delete" class="btn btn-danger waves-effect waves-light ml-1 btn-sm" onclick="return DeleteCourseDetail(' + $(this).find("CourseDetailID").text() + ')"><i class="fa fa-trash"></i></button>';

            $("td", RowCourseDetail).eq(8).html(strAction);

            $("[id=tblCourseDetailList] tbody").append(RowCourseDetail);
            RowCourseDetail = $("[id=tblCourseDetailList] tbody tr:last-child").clone(true);
        });

    }
    else {
        var empty_row7 = RowCourseDetail.clone(true);
        $("td:first-child", empty_row7).attr("colspan", $("td", RowCourseDetail).length);
        $("td:first-child", empty_row7).attr("align", "center");
        $("td:first-child", empty_row7).html("No records found");
        $("td", empty_row7).not($("td:first-child", empty_row7)).remove();
        $("[id*=tblCourseDetailList] tbody").append(empty_row7);
    }
};

function ClearCourseDetail() {
    $("[id=btnDetailSubmit]").html("Submit");
    $("[id=btnDetailSubmit]").attr('disabled', false);

    $("#txtCourseDetailTitle").val('');
    $("#txtCourseDetailVideoURL").val('');
    $("#txtOrderNumber").val('');
    $("#txtDetail").val('');
    $("#txtSessionRecordLink").val('');
    $("#txtSessionRecordDescr").val('');
 
    hdnCourseID = 0;
    hdnCourseDetailID = 0;
}

$("#btnDetailCancel").click(function () {
    ClearCourseDetail();
    return false;
});

$("#btnDetailSubmit").click(function () {
    var title = $("#txtCourseDetailTitle").val();
    var detail = $("#txtDetail").val();
    var videoURL = $("#txtCourseDetailVideoURL").val();
    var orderNumber = $("#txtOrderNumber").val();
    var sessionRecordLink = $("#txtSessionRecordLink").val() || "";
    var sessionRecordLinkDescription = $("#txtSessionRecordDescr").val() || "";

    if (title == "") {
        $("#txtCourseDetailTitle").focus();
        swal.fire("", "Enter Title", "warning");
        return false;
    }
    else if (detail == "") {
        $("#txtDetail").focus();
        swal.fire("", "Enter Course Detail", "warning");
        return false
    }
    else {
        var data = {};
        data.CourseDetailID = hdnCourseDetailID;
        data.CourseID = hdnCourseID;
        data.CourseDetailTitle = title;
        data.CourseDetail = detail;
        data.DescriptiveVideoURL = videoURL;
        data.OrderNo = orderNumber;
        data.SessionRecordLink = sessionRecordLink;
        data.SessionRecordLinkDescription = sessionRecordLinkDescription;

        $.ajax({
            type: "POST",
            url: "/assets/PageService/WS_ManageCourse.asmx/ManageCourseDetail",
            data: '{courseDetail: ' + JSON.stringify(data) + ', WSPassword: "' + WSPassword + '"}',
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
                    ViewCourseDetail(hdnCourseID, IsSessionRecorded);
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

function EditCourseDetail(courseDetailId){
    $.ajax({
        type: "POST",
        url: "/assets/PageService/WS_ManageCourse.asmx/GetCourseDetailByID",
        data: '{courseDetailId: "' + courseDetailId + '", WSPassword: "' + WSPassword + '"}',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnCourseDetailUpdateSuccess,
        failure: function (response) {
            swal.fire("", "Failure : " + response.failure, "warning");
        },
        error: function (response) {
            swal.fire("", "Error : " + response.statusText, "warning");
        }
    });
    return false;
}

function OnCourseDetailUpdateSuccess(response){
    var res = response.d;
    if (res) {
        hdnCourseDetailID = res.CourseDetailID;

        $("#txtCourseDetailTitle").val(res.CourseDetailTitle);
        $("#txtCourseDetailVideoURL").val(res.DescriptiveVideoURL);
        $("#txtOrderNumber").val(res.OrderNo);
        $("#txtDetail").val(res.CourseDetail);
        $("#txtSessionRecordLink").val(res.SessionRecordLink);
        $("#txtSessionRecordDescr").val(res.SessionRecordLinkDescription);

        $("[id=btnDetailSubmit]").html("Update");
        $("[id=btnDetailSubmit]").attr('disabled', false);
    }
    return false;
}

function DeleteCourseDetail(courseDetailId) {
    swal.fire({
        title: "Are you sure you want to delete course details?",
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
                url: "/assets/PageService/WS_ManageCourse.asmx/DeleteCourseDetail",
                data: '{courseDetailId: ' + courseDetailId + ', WSPassword: "' + WSPassword + '"}',
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
                        ViewCourseDetail(hdnCourseID, IsSessionRecorded);
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

$("#txtSGSTPer").on("change", function (e) {
    $("#txtCGSTPer").val(e.target.value);
})

$("#btnSearch").click(function () {
    GetCourseList(1);
});

$("#btnSearchCancel").click(function () {
    $("#txtSearchCourseName").val('');
    $("#searchDdlCourseType").val('0');
    GetCourseList(1);
});

function closedetailModal() {
    IsSessionRecorded = false;
    $("#modalCourseDetail").modal("hide");
}