<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ManageUser.aspx.cs" Inherits="ManageUser" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="assets/PageStyle/ManageUser.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs nav-bordered" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab-b1" data-toggle="tab" href="#home-b1" role="tab" aria-controls="home-b1" aria-selected="false">
                            <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                            <span class="d-none d-sm-block">Manage User</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="profile-tab-b1" data-toggle="tab" href="#profile-b1" role="tab" aria-controls="profile-b1" aria-selected="true">
                            <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                            <span class="d-none d-sm-block">View User</span>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane show active" id="home-b1" role="tabpanel" aria-labelledby="home-tab-b1">
                        <form action="#">
                            <div class="row pt-3">
                                <div class="col-lg-4 mb-3">
                                    <label for="SelectUser">User Type <span style="color: red">*</span></label>
                                    <div>
                                        <select id="ddlUserType" class="form-control select2">
                                            <option value="0">-- SELECT --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4 mb-3">
                                    <label for="fullname">Full Name <span style="color: red">*</span></label>
                                    <div>
                                        <input class="form-control" type="text" id="txtFullName" maxlength="150" placeholder="Enter your name" />
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="emailaddress">Email-ID <span style="color: red">*</span></label>
                                    <div>
                                        <input class="form-control" type="email" id="txtEmailID" maxlength="150" placeholder="Enter your email" />
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label for="emailaddress">Mobile No <span style="color: red">*</span></label>
                                    <div>
                                        <input class="form-control" id="txtMobileNo" maxlength="10" placeholder="Enter your mobile no" onkeypress="return isNumberKey(event)" />
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="emailaddress">User Name <span style="color: red">*</span></label>
                                    (User Name for login) <i class="fa fa-info-circle" data-toggle="tooltip" data-placement="right" title="User Name must not contain any space" aria-hidden="true"></i>
                                    <div>
                                        <input class="form-control" id="txtUserName" maxlength="50" placeholder="Enter your user name" />
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col-lg-4 mb-3">
                                    <label for="password">Password <span style="color: red">*</span> <i class="fa fa-info-circle" data-toggle="tooltip" data-placement="right" title="Password must contain at least 9 character, with at least 1 special character and at least 1 uppercase." aria-hidden="true"></i></label>
                                    <div>
                                        <input class="form-control" type="password" id="txtPassword" maxlength="9" placeholder="Enter your password" />
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="password">Confirm Password <span style="color: red">*</span></label>
                                    <div>
                                        <input class="form-control" type="password" id="txtConfirmPassword" maxlength="9" placeholder="Enter confirm password" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-4">
                                <%-- <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="checkbox-signup" />
                                    <label class="custom-control-label" for="checkbox-signup">I accept <a href="javascript: void(0);" class="text-primary">Terms and Conditions</a></label>
                                </div>--%>
                            </div>

                            <div class="form-group mb-3 text-left">
                                <button class="btn btn-primary btn-lg width-lg btn-rounded" id="btnSubmit" type="submit">Submit</button>
                                <button id="btnCancel" type="button" class="btn btn-danger btn-lg width-lg btn-rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane " id="profile-b1" role="tabpanel" aria-labelledby="profile-tab-b1">
                        <div class="row pt-3">
                            <div class="col-lg-3 mb-3">
                                <label for="SelectUser">User Type </label>
                                <div>
                                    <select id="ddlSearchUserType" class="form-control select2">
                                        <option value="0">-- SELECT --</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-3 mb-3">
                                <label for="fullname">Full Name </label>
                                <div>
                                    <input class="form-control" type="text" id="txtSearchFullName" maxlength="150" placeholder="Enter your name" />
                                </div>
                            </div>
                            <div class="col-lg-3 mb-3">
                                <label for="emailaddress">Mobile No </label>
                                <div>
                                    <input class="form-control" id="txtSearchMobileNo" maxlength="10" placeholder="Enter your mobile no" onkeypress="return isNumberKey(event)" />
                                </div>
                            </div>
                            <div class="col-lg-3 mb-3">
                                <label for="emailaddress">Email-ID </label>
                                <div>
                                    <input class="form-control" type="email" id="txtSearchEmailID" maxlength="150" placeholder="Enter your email" />
                                </div>
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="form-group mb-3 text-left">
                                <button class="btn btn-primary btn-lg width-lg btn-rounded" id="btnSearch" type="submit">Search</button>
                                <button id="btnSearchCancel" type="button" class="btn btn-danger btn-lg width-lg btn-rounded">Clear</button>
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div id="#divUserDetailList" class="col-lg-12 mb-3 text-center">
                                <div class="table-scrollable no-more-tables">
                                    <div class="table-scrollable">
                                        <table class="table table-striped mb-0" id="tblUserList">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: left; width: 70px;">Sr. No.</th>
                                                    <th>Full Name</th>
                                                    <th>UserType</th>
                                                    <th>Email ID</th>
                                                    <th>Mobile No</th>
                                                    <th>UserName</th>
                                                    <th style="text-align: center;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd gradeX">
                                                    <td style="text-align: left;" data-title="Sr. No.">Sr. No.</td>
                                                    <td data-title="Full Name">Full Name</td>
                                                    <td data-title="UserType">UserType</td>
                                                    <td data-title="Email ID">Email ID</td>
                                                    <td data-title="Mobile No">Mobile No</td>
                                                    <td data-title="UserName">UserName </td>

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
                </div>
            </div>
        </div>
    </div>
    <script src="assets/PageScripts/ManageUser.js"></script>
</asp:Content>

