<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Candidate.aspx.cs" Inherits="Candidate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="assets/PageStyle/Candidate.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                <span class="d-none d-sm-block header-title">View Candidate</span>

                <div class="row pt-3">
                    <div class="col-lg-4 mb-3">
                        <label class="form-label">Candidate Name </label>
                        <div class="input-group">
                            <input type="text" id="txtSearchCandidateName" required placeholder="Enter Candidate name" maxlength="50" class="form-control">
                        </div>
                    </div>

                    <div class="col-lg-4 mb-3">
                        <label class="form-label">Email-ID </label>
                        <div>
                            <input type="text" id="txtSearchEmailID" required placeholder="Enter Email ID" maxlength="50" class="form-control">
                        </div>
                    </div>

                    <div class="col-lg-4 mb-3">
                        <label class="form-label">Mobile No </label>
                        <div>
                            <input type="text" id="txtSearchMobileNo" required placeholder="Enter Mobile No" maxlength="50" class="form-control">
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
                    <div id="#divCandidateDetailList" class="col-lg-12 mb-3 text-center">
                        <div class="table-scrollable no-more-tables">
                            <div class="table-scrollable">
                                <table class="table table-striped mb-0" id="tblCandidateList">
                                    <thead>
                                        <tr>
                                            <th style="text-align: left; width: 70px;">Sr. No.</th>
                                            <th>Candidate Name</th>
                                            <th>Gender</th>
                                            <th>Date Of Birth</th>
                                            <th>Email ID</th>
                                            <th>Mobile No</th>
                                            <th style="text-align: center;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="odd gradeX">
                                            <td style="text-align: left;" data-title="Sr. No.">Sr. No.</td>
                                            <td data-title="Candidate Name">Candidate Name</td>
                                            <td data-title="Gender">Gender</td>
                                            <td data-title="Date Of Birth">Date Of Birth</td>
                                            <td data-title="EmailID">Email ID</td>
                                            <td data-title="MobileNo">Mobile No</td>
                                            <td data-title="Action" style="text-align: center;">Action</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="Pager pt-2" id="divpager"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="modalCandidateDetail" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
                    <div class="modal-dialog modal-lg" style="width: 100%;">
                        <div class="modal-content">
                            <div class="modal-header bg-info">
                                <h5 class="modal-title">View Detail</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div id="#DivModalDetails" class="col-lg-12 mb-3">
                                <div class="container-fluid">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-12 mb-3">
                                                    <div class="row pt-3">
                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">First Name</label>
                                                            <div class="input-group">
                                                                <label id="lblFirstName" class="form-control"></label>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">Middle Name </label>
                                                            <div>
                                                                <label id="lblMiddleName" class="form-control"></label>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">Last Name  <span style="color: red">*</span></label>
                                                            <div>
                                                                <label id="lblLastName" class="form-control"></label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="row pt-2">
                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">Email-ID <span style="color: red">*</span></label>
                                                            <div class="input-group">
                                                                <label id="lblEmailid" class="form-control"></label>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">Mobile No <span style="color: red">*</span></label>
                                                            <div>
                                                                <label id="lblMobileNo" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label>Gender</label>
                                                            <br />
                                                            <label id="lblMaleGender" class="radio-inline radio-success d-none">
                                                                Male
                                                                <i class="fa fa-male fa-3x"></i>
                                                            </label>
                                                            <label id="lblFemaleGender" class="radio-inline radio-success d-none">
                                                                Female
                                                                <i class="fa fa-female fa-3x"></i>
                                                            </label>
                                                            <label id="lblOtherGender" class="radio-inline radio-success d-none">
                                                                OTHER
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-2">
                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">Date Of Birth </label>
                                                            <div>
                                                                <label id="lblDOB" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-4 mb-3">
                                                            <label class="form-label">Blood Group </label>
                                                            <div>
                                                                <label id="lblBloodGroup" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="row pt-2">
                                                        <div class="col-sm-4">
                                                            <label>Nationality</label>
                                                            <lable id="lblNationality" class="form-control"></lable>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label>Religion</label>
                                                            <div>
                                                                <lable id="lblReligion" class="form-control"></lable>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label>Specify Other (Religion)</label>
                                                            <lable id="lblOtherReligion" class="form-control" style="text-transform: uppercase;"></lable>
                                                        </div>
                                                    </div>

                                                    <div class="row pt-2">
                                                        <div class="col-sm-4">
                                                            <label>Caste Category</label>
                                                            <lable id="lblCasteCategory" class="form-control"></lable>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label>Caste</label>
                                                            <lable id="lblCaste" class="form-control" style="text-transform: uppercase;"></lable>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label>Sub Caste</label>
                                                            <lable id="lblSubCaste" class="form-control" style="text-transform: uppercase;"></lable>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-2">
                                                        <h4 class="pl-1">LOCAL ADDRESS</h4>
                                                        <div class="col-lg-12 ">
                                                            <label class="form-label">Address </label>
                                                            <lable id="lblLocalAddress" class="form-control"></lable>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-2">
                                                        <div class="col-lg-3 mb-3">
                                                            <label class="form-label">Pincode </label>
                                                            <div>
                                                                <label id="lblPincode" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 mb-3">
                                                            <label class="form-label">State </label>
                                                            <div>
                                                                <label id="lblState" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 mb-3">
                                                            <label class="form-label">City </label>
                                                            <div>
                                                                <label id="lblCity" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-3 mb-3">
                                                            <label class="form-label">District </label>
                                                            <div>
                                                                <label id="lblDistrict" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="permanentAddress" class="d-none">
                                                        <h4 class=" ">PERMANENT ADDRESS</h4>
                                                        <div class="row">
                                                            <div class="col-lg-12 ">
                                                                <label class="form-label">Address </label>
                                                                <label id="lblPermanentAddress" class="form-control"></label>
                                                            </div>
                                                        </div>
                                                        <div class="row pt-2">
                                                            <div class="col-lg-3 mb-3">
                                                                <label class="form-label">Pincode </label>
                                                                <div>
                                                                    <label id="lblPermanentPincode" class="form-control"></label>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3 mb-3">
                                                                <label class="form-label">State </label>
                                                                <div>
                                                                    <label id="lblPermanentState" class="form-control"></label>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3 mb-3">
                                                                <label class="form-label">City </label>
                                                                <div>
                                                                    <label id="lblPermanentCity" class="form-control"></label>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3 mb-3">
                                                                <label class="form-label">District </label>
                                                                <div>
                                                                    <label id="lblPermanentDistrict" class="form-control"></label>
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
                </div>
            </div>
        </div>
    </div>
    <script src="/assets/PageScripts/Candidate.js"></script>
</asp:Content>

