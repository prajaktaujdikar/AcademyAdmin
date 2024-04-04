<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ManageCoach.aspx.cs" Inherits="ManageCoach" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="assets/PageStyle/ManageCoach.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs nav-bordered" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab-b1" data-toggle="tab" href="#home-b1" role="tab" aria-controls="home-b1" aria-selected="false">
                            <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                            <span class="d-none d-sm-block">Manage Coach</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="profile-tab-b1" data-toggle="tab" href="#profile-b1" role="tab" aria-controls="profile-b1" aria-selected="true">
                            <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                            <span class="d-none d-sm-block">View Coach</span>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane show active" id="home-b1" role="tabpanel" aria-labelledby="home-tab-b1">
                        <form id="frmManage">
                            <div class="row pt-3">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">First Name <span style="color: red">*</span></label>
                                    <div class="input-group">
                                        <input type="text" id="txtFirstName" required placeholder="Enter first name" maxlength="50" class="form-control">
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Middle Name </label>
                                    <div>
                                        <input type="text" id="txtMiddleName" required placeholder="Enter middle name" maxlength="50" class="form-control">
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Last Name  <span style="color: red">*</span></label>
                                    <div>
                                        <input type="text" id="txtLastName" required placeholder="Enter last name" maxlength="50" class="form-control">
                                    </div>
                                </div>

                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Email-ID <span style="color: red">*</span></label>
                                    <div class="input-group">
                                        <input type="text" id="txtEmailid" required placeholder="Enter  email id" maxlength="150" class="form-control">
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Mobile No <span style="color: red">*</span></label>
                                    <div>
                                        <input type="text" id="txtMobileNo" required placeholder="Enter mobile no" maxlength="10" class="form-control" onkeypress="return isNumberKey(event)">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label>Gender</label>
                                    <br />
                                    <label class="radio-inline radio-success">
                                        <input type="radio" name="rbGender" value="M" class="styled">
                                        <i class="fa fa-male fa-3x" aria-hidden="true"></i>
                                    </label>
                                    <label class="radio-inline radio-success">
                                        <input type="radio" name="rbGender" value="F" class="styled">
                                        <i class="fa fa-female fa-3x" aria-hidden="true"></i>
                                    </label>
                                    <label class="radio-inline radio-success">
                                        <input type="radio" name="rbGender" value="O" class="styled">
                                        OTHER
                                    </label>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Date Of Birth </label>
                                    <div>
                                        <input type="date" id="txtDOB" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Blood Group </label>
                                    <div>
                                        <select id="ddlBloodGroup" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Date Of Joining </label>
                                    <div>
                                        <input type="date" id="txtDOJ" class="form-control" autocomplete="off">
                                    </div>
                                </div>
                            </div>

                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Password <span style="color: red">*</span><i class="fa fa-info-circle" data-toggle="tooltip" data-placement="right" title="Password must contain at least 9 character, with at least 1 special character and at least 1 uppercase." aria-hidden="true"></i></label>
                                    <div class="input-group">
                                        <input type="password" id="txtPassword" required placeholder="Enter password" maxlength="9" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label class="form-label">Confirm Password <span style="color: red">*</span></label>
                                    <div>
                                        <input type="password" id="txtConfirmPassword" required placeholder="Enter Confirm Password" maxlength="9" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-sm-4">
                                    <label>Nationality</label>
                                    <input id="txtNationality" type="text" class="form-control" maxlength="50">
                                </div>
                                <div class="col-sm-4">
                                    <label>Religion</label>
                                    <div>
                                        <select id="ddlReligion" class="form-control select2" onchange="OnReligionChange()">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <label>Specify Other (Religion)</label>
                                    <input id="txtOtherReligion" type="text" class="form-control" style="text-transform: uppercase;" maxlength="50" disabled="disabled">
                                </div>
                            </div>

                            <div class="row pt-2">
                                <div class="col-sm-4">
                                    <label>Caste Category</label>
                                    <select id="ddlCasteCategory" class="form-control select2">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                                <div class="col-sm-4">
                                    <label>Caste</label>
                                    <input id="txtCaste" type="text" class="form-control" style="text-transform: uppercase;" maxlength="150">
                                </div>
                                <div class="col-sm-4">
                                    <label>Sub Caste</label>
                                    <input id="txtSubCaste" type="text" class="form-control" style="text-transform: uppercase;" maxlength="150">
                                </div>
                            </div>
                            <div class="row pt-2">
                                <h4 class="pl-1">LOCAL ADDRESS</h4>
                                <div class="col-lg-12 ">
                                    <label class="form-label">Address </label>
                                    <textarea rows="4" id="txtLocalAddress" class="form-control" required placeholder="Enter address" maxlength="200"></textarea>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">Pincode </label>
                                    <div>
                                        <input type="text" id="txtPincode" required placeholder="Enter pincode" maxlength="6" class="form-control" onkeypress="return isNumberKey(event)">
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">State </label>
                                    <div>
                                        <select id="ddlState" class="form-control select2" onchange="LocalStateChange()">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">City </label>
                                    <div>
                                        <select id="ddlCity" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">District </label>
                                    <div>
                                        <select id="ddlDistrict" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <h4 class=" ">PERMANENT ADDRESS</h4>
                            <div class="row mr-5 pt-1">
                                <div class="col-lg-4">
                                    <div class="custom-control custom-checkbox mb-2">
                                        <%--    <input id="checkmeout1" name="Public"  value="checkmeout" type="checkbox">--%>
                                        <input id="chkSamePermanentAddress" name="public" value="IsSame" type="checkbox" onchange="SamePermanentAddressChange()" />
                                        <label for="chkSamePermanentAddress" id="" style="font-size: 15px">Same as above</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 ">
                                    <label class="form-label">Address </label>
                                    <textarea rows="4" id="txtPermanentAddress" class="form-control" required placeholder="Enter address" maxlength="200"></textarea>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">Pincode </label>
                                    <div>
                                        <input type="text" id="txtPermanentPincode" required placeholder="Enter pincode" maxlength="6" class="form-control" onkeypress="return isNumberKey(event)">
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">State </label>
                                    <div>
                                        <select id="ddlPermanentState" class="form-control select2" onchange="PermanentStateChange()">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">City </label>
                                    <div>
                                        <select id="ddlPermanentCity" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label class="form-label">District </label>
                                    <div>
                                        <select id="ddlPermanentDistrict" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mt-20 pt-2 text-left">
                                <button id="btnSubmit" type="submit" class="btn btn-primary btn-lg width-lg btn-rounded">Submit </button>
                                <button id="btnCancel" type="button" class="btn btn-danger btn-lg width-lg btn-rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane " id="profile-b1" role="tabpanel" aria-labelledby="profile-tab-b1">
                        <div class="row pt-3">
                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Coach Name </label>
                                <div class="input-group">
                                    <input type="text" id="txtSearchCoachName" required placeholder="Enter first name" maxlength="50" class="form-control">
                                </div>
                            </div>

                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Email-ID </label>
                                <div>
                                    <input type="text" id="txtSearchEmailID" required placeholder="Enter middle name" maxlength="50" class="form-control">
                                </div>
                            </div>

                            <div class="col-lg-4 mb-3">
                                <label class="form-label">Mobile No  </label>
                                <div>
                                    <input type="text" id="txtSearchMobileNo" required placeholder="Enter last name" maxlength="50" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row pt-2">
                            <div class="form-group mb-3 text-left">
                                <button class="btn btn-primary btn-lg width-lg btn-rounded" id="btnSearch" type="submit">Search</button>
                                <button id="btnSearchCancel" type="button" class="btn btn-danger btn-lg width-lg btn-rounded">Clear</button>
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div id="#divCoachDetailList" class="col-lg-12 mb-3 text-center">
                                <div class="table-scrollable no-more-tables">
                                    <div class="table-scrollable">
                                        <table class="table table-striped mb-0" id="tblCoachList">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: left; width: 70px;">Sr. No.</th>
                                                    <th>First Name</th>
                                                    <th>Middle Name</th>
                                                    <th>Last Name</th>
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
                                                    <td data-title="First Name">First Name</td>
                                                    <td data-title="Middle Name">Middle Name</td>
                                                    <td data-title="Last Name">Last Name</td>
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
                    </div>

                    <div id="modalCoachDetail" class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
                        <div class="modal-dialog modal-lg" style="width: 200%;">
                            <div class="modal-content">
                                <div class="modal-header bg-info">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">Date Of Joining </label>
                                            <div>
                                                <p id="lblDOJ"></p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">Blood Group </label>
                                            <div>
                                                <p id="lblBloodGroup"></p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">Nationality </label>
                                            <div>
                                                <p id="lblNationality"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">CasteCategory </label>
                                            <div>
                                                <p id="lblCasteCategory"></p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">Religion </label>
                                            <p id="lblReligion"></p>
                                        </div>
                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">City </label>
                                            <div>
                                                <p id="lblCity"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4 mb-3">
                                            <label class="form-label">District </label>
                                            <p id="lblDistrict"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <script src="/assets/PageScripts/ManageCoach.js"></script>
</asp:Content>

