<%@ Page Title="" Language="C#" MasterPageFile="~/Coach/CoachMasterPage.master" AutoEventWireup="true" CodeFile="ManageBatch.aspx.cs" Inherits="ManageBatch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs nav-bordered" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab-b1" data-toggle="tab" href="#home-b1" role="tab" aria-controls="home-b1" aria-selected="false">
                            <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                            <span class="d-none d-sm-block">Manage Batch</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="profile-tab-b1" data-toggle="tab" href="#profile-b1" role="tab" aria-controls="profile-b1" aria-selected="true">
                            <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                            <span class="d-none d-sm-block">View Batch</span>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane show active" id="home-b1" role="tabpanel" aria-labelledby="home-tab-b1">
                        <form id="frmManage">
                            <div class="row pt-3">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Name <span style="color: red">*</span></label>
                                    <div class="input-group">
                                        <input type="text" id="txtBatchName" required placeholder="Enter Batch Name" maxlength="150" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Course <span style="color: red">*</span></label>
                                    <div>
                                        <select id="ddlCourse" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Status <span style="color: red">*</span></label>
                                    <div>
                                        <select id="ddlBatchStatus" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
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
                                <label class="form-label">Course </label>
                                <div>
                                    <select id="searchDdlCourse" class="form-control select2">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Name </label>
                                <div class="input-group">
                                    <input type="text" id="searchTxtBatchName" required placeholder="Enter Batch Name" maxlength="150" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Status </label>
                                <div>
                                    <select id="searchDdlBatchStatus" class="form-control select2">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group mt-20 pt-2 text-right">
                                <button id="btnSearchSubmit" type="submit" class="btn btn-success">Search </button>
                                <button id="btnSearchCancel" type="button" class="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                        <div class="row">
                            <div id="#divBatchList" class="col-lg-12 mb-3 text-center">
                                <div class="table-scrollable no-more-tables">
                                    <div class="table-scrollable">
                                        <table class="table table-striped mb-0" id="tblBatchList">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: left; width: 70px;">Sr. No.</th>
                                                    <th>Batch No</th>
                                                    <th>Batch Name</th>
                                                    <th>Course Title</th>
                                                    <th>Batch Status</th>
                                                    <th style="text-align: center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd gradeX">
                                                    <td style="text-align: left;" data-title="Sr. No.">Sr. No.</td>
                                                    <td data-title="BatchNo">Batch No</td>
                                                    <td data-title="BatchName">Batch Name<</td>
                                                    <td data-title="CourseTitle">Course Title</td>
                                                    <td data-title="BatchStatus">Batch Status<</td>
                                                    <td data-title="Action" style="text-align: center; width: 350px">Action</td>
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
    </div>

    <div id="modalCandidateDetail" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="width: 200%;">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <label class="form-label">Course Detail <span style="color: red">*</span></label>
                            <div>
                                <select id="ddlCourses" class="form-control select2">
                                    <option value="0">-- SELECT --</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="modalBatchDetail" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="width: 200%;">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="container">
                    <form id="formManageBatch">
                        <div class="row pt-3">
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Course Detail<span style="color: red">*</span></label>
                                <div>
                                    <select id="ddlCourseDetail" class="form-control select2">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Session Datetime <span style="color: red">*</span></label>
                                <div>
                                    <input type="date" id="sessionDateTime" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Session Live Link <span style="color: red">*</span></label>
                                <div>
                                    <input type="text" id="txtSessionLiveLink" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 mb-3">
                                <label class="form-label">Session Live Link Description<span style="color: red">*</span></label>
                                <div>
                                    <textarea rows="2" id="txtSessionLiveLinkDesc" class="form-control" required placeholder="Enter Session Live Link Description " maxlength="200"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="custom-control custom-checkbox mb-2">
                                <input id="chkIsSessionLive" value="IsSessionLive" type="checkbox" onchange="openSessionLink()" />
                                <label for="chkIsSessionLive" id="lblIsSessionLive" style="font-size: 15px">Is Session Live</label>
                            </div>
                            <div class="col-lg-8 mb-3 divSessionLink d-none">
                                <label class="form-label">Session Record Link <span style="color: red">*</span></label>
                                <div>
                                    <input type="text" id="txtSessionRecordLink" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="row divSessionLink d-none">
                            <div class="col-lg-12 mb-3">
                                <label class="form-label">Session Record Link Description<span style="color: red">*</span></label>
                                <div>
                                    <textarea rows="2" id="txtSessionRecordLinkDesc" class="form-control" required placeholder="Enter Session Live Link Description " maxlength="200"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mt-20 pt-2 text-right">
                            <button id="btnSubmitBatchDetail" type="submit" class="btn btn-success">Submit</button>
                            <button id="btnCancelBatchDetail" type="button" class="btn btn-danger">Cancel</button>
                        </div>
                    </form>

                    <div class="row">
                        <div id="#divBatchDetailList" class="col-lg-12 mb-3 text-center">
                            <div class="table-scrollable no-more-tables">
                                <div class="table-scrollable">
                                    <table class="table table-striped mb-0" id="tblBatchDetailList">
                                        <thead>
                                            <tr>
                                                <th style="text-align: left; width: 70px;">Sr. No.</th>
                                                <th>Course Detail Title</th>
                                                <th>Session Date Time</th>
                                                <th>Session Live Link</th>
                                                <th>Session Live Link Description</th>
                                                <th>Is Session Live</th>
                                                <th>Session Record Link</th>
                                                <th>Session Record Link Description</th>
                                                <th style="text-align: center;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="odd gradeX">
                                                <td style="text-align: left;" data-title="Sr. No.">Sr. No.</td>
                                                <td data-title="CourseDetailTitle">Course Detail Title</td>
                                                <td data-title="SessionDateTime">Session Date Time</td>
                                                <td data-title="SessionLiveLink">Session Live Lin</td>
                                                <td data-title="SessionLiveLinkDescription">Session Live Link Description</td>
                                                <td data-title="IsSessionLive">Is Session Live</td>
                                                <td data-title="SessionRecordLink">Session Record Link</td>
                                                <td data-title="SessionRecordLinkDescription">Session Record Link Description</td>
                                                <td data-title="Action" style="text-align: center; width: 350px">Action</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="Pager pt-2" id="divpager2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/assets/js/Custom.js"></script>
    <script src="/assets/PageScripts/Coach/ManageBatch.js"></script>
</asp:Content>

