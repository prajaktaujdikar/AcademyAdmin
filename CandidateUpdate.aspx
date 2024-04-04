<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="CandidateUpdate.aspx.cs" Inherits="CandidateUpdate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="assets/PageStyle/CandidateUpdate.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <span class="d-block d-sm-none"><i class="fa fa-edit"></i></span>
                <span class="d-none d-sm-block header-title">Edit Candidate</span>

                <form id="frmManage">
                    <div class="row">
                        <div class="col-lg-12 mb-3">
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
                            <div class="form-group mt-20 pt-2 text-right">
                                <button id="btnSubmit" type="submit" class="btn btn-success">Submit </button>
                                <button id="btnCancel" type="button" class="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="/assets/js/Custom.js"></script>
    <script>
        var candidateID = <%= candidateID %>;
    </script>
    <script src="/assets/PageScripts/CandidateUpdate.js"></script>
</asp:Content>
