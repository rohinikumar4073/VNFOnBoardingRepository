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
    },  testPackage:function(){
          this.setState({loaderOn: true});
          var self = this;
          $.ajax({
              url: config.testApi+"/executeJava",
              method: 'GET',
              data: {},
              success: function(data) {
                self.setState({testPackageExecuted: true,loaderOn: false});
                self.props.formData.testPackageExecuted=true;
                self.props.saveAndSetFormData(self.props.formData);
                  toastr.success("Test cases executed successfully");
                      },
                      error: function(data) {
                        self.setState({loaderOn: false});
                        toastr.error("Test cases could not be executed");
                      }
                  })
        },registerOSSApp:function(nfvoId,callback){
			var self=this;
				axios({
					method: 'post',
					url: config.uopApi+'/settings/applications/',

					data:

							{
							  "appName": "MyOSS",
							  "domainId": "6ea7a82f-1f7c-42d7-abe4-2c6d92d94d30",
							  "modeInstanceId": "45698bbf-0419-4be4-acfe-4427c00054f7",
							  "modeInstanceUndeployId": "7c10bed4-6aa0-47f2-a54c-00515a410b54",
							  "nfvoId": nfvoId,
							  "orchType": "HP",
							  "orgId": "b877eb45-c18d-46eb-8a79-d20c3204d23d",
							  "resourceArtifactId": "c4ad5969-f921-3552-8c66-7828a6b5d306",
							  "tenantId": "f8ff51d0-3bac-4dbb-998d-d7a155aaf384",
							  "vnfGroupId": "43b5dfee-ec46-4101-aaa2-ca412f7ba056"
							}



					}).then(function (response) {
						callback(response.data.ossRegistrationId)

					})
					  .catch(function (error) {
						console.log(error);
						self.setState({loaderOn: false});
					  });
		},
		getJOBStatus:function(jobId,ossId){
			var self=this;
			var interval=setInterval(function(){
			axios({
					method: 'get',
					url: config.uopApi+'/jobs/'+jobId+"/",
					  headers: {'Oss-Registration-Id': ossId}



					}).then(function (response) {
						if(response.data.status=="IN_PROGRESS")
							self.setState({configurationStatus: "Activating"});
						else if(response.data.status=="OK"){
								self.setState({configurationStatus: "ACTIVE"});
								clearInterval(interval)

						}
						else if(response.data.status=="ON_ERROR")
							self.setState({configurationStatus: "Error"});

					})
					  .catch(function (error) {
					  });
		}, 5000);

		},
		deployPackage:function(ossId,packageId){
			var self=this;

				axios({
					method: 'post',
					url: config.uopApi+'/vnfs/instances/',
					  headers: {'Oss-Registration-Id': ossId},
					data:
						 {
						  "virtualNtwk1": "data-network-2",
						  "virtualNtwk2": "data-network",
						  "vnfDesc": "INFOBLOX DNS UOP",
						  "vnfName": "IB-DNS",
						  "vnfPackageId": packageId
						   }


					}).then(function (response) {
						console.log(response);
						self.setState({loaderOn: false});
						 self.props.formData.jobId=response.data.jobId;
							self.props.saveAndSetFormData(self.props.formData);
							self.getJOBStatus(response.data.jobId,ossId)

					})
					  .catch(function (error) {
						console.log(error);
						self.setState({loaderOn: false});
					  });
		},
		getOssId:function(callback){
			var self=this;
			axios({
					method: 'post',
					url: config.uopApi+'/settings/nfvo/',
					data:
						{
							  "sOrchType": "HP",
							  "sPassword": "Welcome@1234",
							  "sTargetURL": "http://localhost:10022",
							  "sUsername": "vdsi_onb_vnf_mgr@vdsi"
						}

					}).then(function (response) {
						console.log(response);
						if(response.data.nfvoId)
						self.registerOSSApp(response.data.nfvoId,callback)
					})
					  .catch(function (error) {
						console.log(error);
						self.setState({loaderOn: false});
					  });
		},
        activateVNF: function() {
            var self = this;
            var gene = this.props.formData.generalInfo;
            self.setState({statusLoaderOn: true});
           var packageId=this.props.formData.uploadNSDPackageId[0];

			self.setState({loaderOn: true});
			 this.getOssId(function(ossId){
				 self.deployPackage(ossId,packageId)
			 });
					if (this.state.isGenDescComp && !this.state.isVnfActive) { }

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
                                                                }} onDrop={this.onDrop} style={{}}>
                                                                    <div className="upload2">Try dropping some files here, or click to select files to upload.</div>
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
                                                                <Dropzone  style={{}} ref={(node) => {
                                                                    this.dropzone = node;
                                                                }} onDrop={this.onDropNSD}>
                                                                    <div className="upload2" >Try dropping some files here, or click to select files to upload.</div>
                                                                </Dropzone>
                                                                {this.state.NSDfiles.length > 0
                                                                    ? <div>
                                                                            <h2>Uploading {this.state.NSDfiles.length}
                                                                                files...</h2>
                                                                              <div >{this.state.NSDfiles.map((file) => <h3>{file.name}</h3>)}</div>
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
                    <div className="net">

                        <a href="#" className="btn btn-danger btn-sm nextBtn"  onClick={this.testPackage} >Test Package</a>
                        <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.activateVNF} >Activate VNF</a>
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
