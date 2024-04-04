<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ManageCourse.aspx.cs" Inherits="ManageCourse" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="assets/PageStyle/ManageCourse.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs nav-bordered" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab-b1" data-toggle="tab" href="#home-b1" role="tab" aria-controls="home-b1" aria-selected="false">
                            <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                            <span class="d-none d-sm-block">Manage Course</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="profile-tab-b1" data-toggle="tab" href="#profile-b1" role="tab" aria-controls="profile-b1" aria-selected="true">
                            <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                            <span class="d-none d-sm-block">View Course</span>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane show active" id="home-b1" role="tabpanel" aria-labelledby="home-tab-b1">
                        <form id="frmManage">
                            <div class="row pt-3">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Course Title <span style="color: red">*</span></label>
                                    <div class="input-group">
                                        <input type="text" id="txtTitle" required placeholder="Enter Title" maxlength="150" class="form-control">
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Type <span style="color: red">*</span></label>
                                    <div>
                                        <select id="ddlCourseType" class="form-control select2" onchange="IsFreeCourse()">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Description </label>
                                    <div>
                                        <textarea cols="10" rows="3" id="txtDescription" required placeholder="Enter Description" maxlength="1000" class="form-control"></textarea>
                                    </div>
                                </div>

                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Video URL </label>
                                    <div class="input-group">
                                        <input type="text" id="txtVideoURL" required placeholder="Enter Video URL" maxlength="250" class="form-control">
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Price <span style="color: red">*</span></label>
                                    <div>
                                        <input type="number" id="txtPrice" required placeholder="Enter Price" maxlength="18" class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label class="form-label">SGST Percentage <span style="color: red">*</span></label>
                                    <div>
                                        <input type="number" id="txtSGSTPer" required placeholder="Enter SGST Percentage" maxlength="10" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">CGST Percentage <span style="color: red">*</span></label>
                                    <div>
                                        <input type="number" id="txtCGSTPer" required placeholder="Enter CGST Percentage" maxlength="10" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label>Language <span style="color: red">*</span></label>
                                    <ul id="ddlLanguage">
                                    </ul>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label>Coach <span style="color: red">*</span></label>
                                    <select id="ddlCoach" class="form-control select2" name="CourseCoach[]" multiple="multiple">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row pt-2" id="isSessionRecorded">
                                <div class="col-lg-4 mb-3 ml-3">
                                    <input type="checkbox" id="chkIsSessionRecorded" class="form-check-input">
                                    <label class="form-check-label" for="chkIsSessionRecorded">Is Session Recorded</label>
                                </div>
                            </div>
                            <div class="form-group mt-20 pt-2 text-right">
                                <button id="btnSubmit" type="submit" class="btn btn-success">Submit </button>
                                <button id="btnCancel" type="button" class="btn btn-danger">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane " id="profile-b1" role="tabpanel" aria-labelledby="profile-tab-b1">
                        <div class="row pt-3">
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Course Name </label>
                                <div class="input-group">
                                    <input type="text" id="txtSearchCourseName" required placeholder="Enter Candidate name" maxlength="50" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Type <span style="color: red">*</span></label>
                                <div>
                                    <select id="searchDdlCourseType" class="form-control select2">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-2">
                            <div class="form-group mb-3 text-left">
                                <button class="btn btn-primary btn-lg width-lg btn-rounded" id="btnSearch" type="submit">Search</button>
                                <button id="btnSearchCancel" type="button" class="btn btn-danger btn-lg width-lg btn-rounded">Clear</button>
                            </div>
                        </div>
                        <div class="row">
                            <div id="#divCourseList" class="col-lg-12 mb-3 text-center">
                                <div class="table-scrollable no-more-tables">
                                    <div class="table-scrollable">
                                        <table class="table table-striped mb-0" id="tblCourseList">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: left; width: 70px;">Sr. No.</th>
                                                    <th>Title</th>
                                                    <th>Type</th>
                                                    <th>Description</th>
                                                    <th>Video URL</th>
                                                    <th>Price</th>
                                                    <th>SGST Percentage</th>
                                                    <th>CGST Percentage</th>
                                                    <th>Languages</th>
                                                    <th>Assigned Coach</th>
                                                    <th style="text-align: center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd gradeX">
                                                    <td style="text-align: left;" data-title="Sr. No.">Sr. No.</td>
                                                    <td data-title="Title">Title</td>
                                                    <td data-title="Type">Type</td>
                                                    <td data-title="Description">Description</td>
                                                    <td data-title="VideoURL">Video URL</td>
                                                    <td data-title="Price">Price</td>
                                                    <td data-title="SGST">SGST Percentage</td>
                                                    <td data-title="CGST">CGST Percentage</td>
                                                    <td data-title="Languages">Languages</td>
                                                    <td data-title="Coaches">Assigned Coach</td>
                                                    <td data-title="Action" style="text-align: center; width: 160px">Action</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="Pager pt-2" id="divpager"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modalCourseDetail" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-lg" style="width: 100%;">
                <div class="modal-content">
                    <div class="modal-header bg-info">
                        <h5 class="modal-title">Course Detail</h5>
                        <button type="button" class="close" onclick="closedetailModal()">&times;</button>
                    </div>
                    <div id="#DivModalDetails" class="col-lg-12 mb-3">
                        <div class="container-fluid">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-12 mb-3">
                                            <div class="row pt-3">
                                                <div class="col-lg-6 mb-1">
                                                    <label class="form-label">Title <span style="color: red">*</span></label>
                                                    <div class="input-group">
                                                        <input type="text" id="txtCourseDetailTitle" required placeholder="Enter Title" maxlength="150" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-3">
                                                    <label class="form-label">Descriptive Video URL </label>
                                                    <div class="input-group">
                                                        <input type="text" id="txtCourseDetailVideoURL" required placeholder="Enter Video URL" maxlength="250" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row pt-1">
                                                <div class="col-lg-12 mb-3">
                                                    <label class="form-label">Description <span style="color: red">*</span></label>
                                                    <div>
                                                        <textarea cols="10" rows="3" id="txtDetail" required placeholder="Enter Course Detail" maxlength="1000" class="form-control"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row pt-1">
                                                <div class="col-lg-6 mb-3">
                                                    <label class="form-label">Order No </label>
                                                    <div class="input-group">
                                                        <input type="number" id="txtOrderNumber" required placeholder="Enter Order" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 mb-3 d-none" id="SessionRecordLink">
                                                    <label class="form-label">Session Record Link</label>
                                                    <div class="input-group">
                                                        <input type="text" id="txtSessionRecordLink" required placeholder="Enter Session Record Lin" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row pt-1 d-none" id="SessionRecordDesc">
                                                <div class="col-lg-12 mb-3">
                                                    <label class="form-label">Session Record Description <span style="color: red">*</span></label>
                                                    <div>
                                                        <textarea cols="10" rows="3" id="txtSessionRecordDescr" required placeholder="Enter Session Record Description" maxlength="1000" class="form-control"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mr-0 text-right">
                                                <div class="form-group">
                                                    <button id="btnDetailSubmit" type="submit" class="btn btn-success">Submit </button>
                                                    <button id="btnDetailCancel" type="button" class="btn btn-danger">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div id="#divCourseDetailList" class="col-lg-12 mb-3 text-center">
                                            <div class="table-scrollable no-more-tables">
                                                <div class="table-scrollable">
                                                    <table class="table table-striped mb-0" id="tblCourseDetailList">
                                                        <thead>
                                                            <tr>
                                                                <th style="text-align: left; width: 70px;">Sr. No.</th>
                                                                <th>Title</th>
                                                                <th>Course Title</th>
                                                                <th>Course Detail</th>
                                                                <th>Video URL</th>
                                                                <th>Order No</th>
                                                                <th>Session Record Link</th>
                                                                <th>Session Record Link Description</th>
                                                                <th style="text-align: center;">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr class="odd gradeX">
                                                                <td style="text-align: left;" data-title="Sr. No.">Sr. No.</td>
                                                                <td data-title="Title">Title</td>
                                                                <td data-title="CourseTitle">Course Title</td>
                                                                <td data-title="Description">Course Detail</td>
                                                                <td data-title="VideoURL">Video URL</td>
                                                                <td data-title="OrderNo">Order No</td>
                                                                <td data-title="SessionRecordLink">Order No</td>
                                                                <td data-title="SessionRecordLinkDescription">Order No</td>
                                                                <td data-title="Action" style="text-align: center; width: 160px">Action</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="/assets/js/Custom.js"></script>
    <script src="/assets/PageScripts/ManageCourse.js"></script>
</asp:Content>

