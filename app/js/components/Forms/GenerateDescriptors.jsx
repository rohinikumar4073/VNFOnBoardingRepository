var React = require("react");
var toastr = require("toastr");
var Loader = require("react-loading")
var config = require("./../../properties/config.js")
var $ = require("jquery");
var Dropzone = require("react-dropzone")

var GenerateDescriptors = React.createClass({
    getInitialState() {
        $(".leftMain").addClass("totalLeftScreenMode");
       $(".contentMain").addClass("totalRightScreenMode");
        return {files: [], NSDfiles: [], loaderOn: false};
    },
    saveAndExit: function() {

        $(".leftMain").addClass("totalLeftScreenMode");
       $(".contentMain").addClass("totalRightScreenMode");
        this.props.setActivePage("homePage", "next", {}, "");

    },
    uploadPackage: function() {
        var theform = new FormData();
        var vnf = this.state.files[0];
        var fileName = vnf.name;
        console.log(vnf.name);
        console.log(vnf);
        var self = this;
        var f = fileName.substr(0, fileName.lastIndexOf('.'));
        this.setState({loaderOn: true});

        theform.append('uploadFile', vnf, vnf.name);

        self.props.formData.uploadNSDPackageId = [];

        self.props.saveAndSetFormData(self.props.formData);

        $.ajax({
            url: config.formApi + "/vnf/" + f + "/uploadVnfd",
            data: theform,
            type: 'POST',
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            success: function(data) {
                toastr.success("VNF successfully uploaded");
                self.setState({loaderOn: false});
                self.props.formData.isGenDescComp = true;
                self.props.formData.isVnfActive = false;

                self.props.formData.uploadNSDPackageId.push(data.id);
                self.props.saveAndSetFormData(self.props.formData);

            },
            error: function(data) {
                toastr.error("VNF not uploaded");
            }
        })

    },
    onDrop: function(acceptedFiles) {
        this.setState({files: acceptedFiles});
    },
    uploadNSDPackage: function() {
        var theform = new FormData();
        var fileName = nsd.name;
        var nsd = this.state.NSDfiles[0];
        console.log(nsd.name);
        console.log(nsd);
        var self = this;
        var f = fileName.substr(0, fileName.lastIndexOf('.'));
        theform.append('uploadFile', nsd, nsd.name);
        $.ajax({
            url: config.formApi + "/vnf/" + f + "/uploadNsd",
            data: theform,
            type: 'POST',
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            success: function(data) {
                toastr.success("NSD successfully created");
            },
            error: function(data) {
                toastr.error("NSD not created");
            }
        })

    },
    onDropNSD: function(acceptedFiles) {
        this.setState({NSDfiles: acceptedFiles});
    },
    createNsd: function() {
        this.setState({loaderOn: true});
        var dataTobeSent = {
            "vnfdList": []
        };

        for (var key in this.props.formData.vmInfo) {

            var vmName = this.props.formData.vmInfo[key].generalInfo.vmName;
            dataTobeSent.vnfdList.push(vmName)

        }
        var self = this;
        $.ajax({
            url: config.formApi + "/vnf/createNsd",
            data: JSON.stringify(dataTobeSent),
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.success("NSD successfully created");

                self.setState({loaderOn: false});
                self.props.formData.isGenDescComp = true;
                self.props.saveAndSetFormData(self.props.formData);
            },
            error: function(data) {
                toastr.error("NSD  not created");
                self.setState({loaderOn: false});
            }
        })
    },
    createVnfd: function() {
        this.setState({loaderOn: true});
        var successIndex = 0;
        var flag = 0;
        var vendorName = "";
        if (this.props.formData.generalInfo && this.props.formData.generalInfo.companytechnicalcontact && this.props.formData.generalInfo.companytechnicalcontact.companyname)
            vendorName = this.props.formData.generalInfo.companytechnicalcontact.companyname;
        for (var key in this.props.formData.vmInfo) {
            successIndex = successIndex + 1;
            var flavourData = this.props.formData.vmInfo[key].generalInfo.vmflavorreq;
            var vmImage = this.props.formData.vmInfo[key].generalInfo.imagename;
            var vmName = this.props.formData.vmInfo[key].generalInfo.vmName;

            var dataTobeSent = {
                "endpoint": "generic",
                "flavor": flavourData,
                "floatingIp": "random",
                "folderPath": "C://Users//TEST//Desktop//vnfOnboarding//openimscore-packages-master",
                "scaleInOut": "1",
                "type": vmName,
                "vendor": vendorName,
                "version": "3.2.0",
                "vim": "VIM",
                "vmImage": vmImage,
                "vnfdName": vmName
            }
            var self = this;
            $.ajax({
                url: config.formApi + "/vnf/createVnfd",
                data: JSON.stringify(dataTobeSent),
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    flag = flag + 1;
                    if (flag == successIndex)
                        toastr.success("VNF successfully created");
                    self.setState({loaderOn: false});
                },
                error: function(data) {
                    toastr.error("VNF not created");
                    self.setState({loaderOn: false});
                }
            })
        }

    },
    render: function() {
        //  debugger;

        return (
            <div>
                <div className={this.state.loaderOn
                    ? "generateDescriptors"
                    : ""}>
                    <h2>Generate Descriptors</h2>
                    <ul className="nav nav-tabs tabs-left" role="tablist">
                        <li id="vnfd-tab" role="presentation" className="active">
                            <a href="#vnfd" aria-controls="vnfd" role="tab" data-toggle="tab">
                                VNFD
                            </a>
                        </li>
                        <li id="nsd-tab" role="presentation">
                            <a href="#nsd" aria-controls="nsd" role="tab" data-toggle="tab">
                                NSD
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="vnfd" aria-labelledby="vnfd-tab">
                            <div id="accordion">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#createvnfd" aria-expanded="true">Create VNFD(s) based on questionaire inputs</a>
                                            </h4>
                                        </div>
                                        <div id="createvnfd" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
                                                <div id="createDescriptors">
                                                    <h3></h3>
                                                    <a href="#" className="btn btn-danger btn-sm" onClick={this.createVnfd}>Create VNFD(s)</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#uploadvnfd" aria-expanded="true">Upload VNF Descriptors</a>
                                            </h4>
                                        </div>
                                        <div id="uploadvnfd" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
                                                <div id="uploadDescriptors">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <h1>VNF Upload
                                                            </h1>
                                                            <div className="uploadfile">
                                                                <Dropzone ref={(node) => {
                                                                    this.dropzone = node;
                                                                }} onDrop={this.onDrop}>
                                                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                                                </Dropzone>
                                                                {this.state.files.length > 0
                                                                    ? <div>
                                                                            <h2>Uploading {this.state.files.length}
                                                                                files...</h2>
                                                                            <div>{this.state.files.map((file) => <h3>{file.name}</h3>)}</div>
                                                                        </div>
                                                                    : null}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="btn btn-danger btn-sm" onClick={this.uploadPackage}>Upload VNFD</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div role="tabpanel" className="tab-pane" id="nsd" aria-labelledby="nsd-tab">
                            <div id="accordion">
                                <div className="panel-group">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#creatensd" aria-expanded="true">Create NSD(s)</a>
                                            </h4>
                                        </div>
                                        <div id="creatensd" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
                                                <div id="createNSDescriptors">
                                                    <a href="#" className="btn btn-danger btn-sm" onClick={this.createNsd}>Create NSD(s)</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" href="#uploadnsd" aria-expanded="true">Upload NS Descriptors</a>
                                            </h4>
                                        </div>
                                        <div id="uploadnsd" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
                                                <div id="uploadNSDescriptors">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <h1>NSD Upload
                                                            </h1>
                                                            <div className="uploadfile">
                                                                <Dropzone ref={(node) => {
                                                                    this.dropzone = node;
                                                                }} onDrop={this.onDropNSD}>
                                                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                                                </Dropzone>
                                                                {this.state.NSDfiles.length > 0
                                                                    ? <div>
                                                                            <h2>Uploading {this.state.NSDfiles.length}
                                                                                files...</h2>
                                                                            <div>{this.state.NSDfiles.map((file) => <h3>{file.name}</h3>)}</div>
                                                                        </div>
                                                                    : null}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="btn btn-danger btn-sm" onClick={this.uploadNSDPackage}>Upload NSD</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contentFooter">
                      {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                    </div>
                </div>
                <div className={this.state.loaderOn
                    ? "showLoader"
                    : "hideLoader"}>
                    <Loader type='spinningBubbles' color='#CD040B'></Loader>
                </div>
            </div>

        );
    }
});

module.exports = GenerateDescriptors;
