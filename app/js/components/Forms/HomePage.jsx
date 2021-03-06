var React = require("react");
var $ = require("jquery");
var SampleMachina = require("./SampleMachina.js");
var Loader = require("react-loading");
var toastr = require("toastr");
var axios = require("axios");
var config = require("./../../properties/config.js");
var Workflow = require("./../Workflow.jsx");
var PackageUpload = require("./VNFPackageUpload.jsx");
var GenerateDescriptors = require("./GenerateDescriptors.jsx");
var RightPanel = require("./../RightPanel.jsx");
var LeftPanel = require("./../LeftPanel.jsx");
var Stomp = require("./../../websocket/stomp.js");
var SockJS = require("./../../websocket/sockjs.js");
global.jQuery = require('jquery');
var DataService=require("./../../services/DataService.js")
var bootstrap = require("bootstrap");

var homePage = React.createClass({
  changeRightPanel: function(pageNumber) {
        this.refs.rightPanel.saveFormData(pageNumber)

    },
    loadQuestionaire: function() {
        this.setState({pageActive: "questionaire"});
    },
    loadGenerator: function() {
        this.setState({pageActive: "generateDescriptors"});
    },
    changeStatus: function(pageNumber) {
        this.refs.leftPanel.changeStatus(pageNumber);
    },
    updataConfigurationStatus: function(status) {

        if (status != null) {
            if (status == "NULL") {
                this.setState({configurationStatus: "Activating"});
            } else {
                this.setState({configurationStatus: status});
            }
        } else {
            self.setState({configurationStatus: "Not Configured"});
        }

    },
    componentDidMount: function() {
      DataService.registerHomePage(this);
      DataService.registerUserName(this.props.userName);
      DataService.registerPackageName(this.props.formData.id);
        var self = this;
        var socket = new SockJS(config.formApi + '/workflow-validation-websocket');
        var stompClient = Stomp.Stomp.over(socket);
        $('[data-toggle="tooltip"]').tooltip();
        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/jenkins/' + self.props.formData.id, function(response) {
              self.callTransition(JSON.parse(response.body));

            });
        });

    },
    uploadPackage: function() {
        this.setState({pageActive: "upload"});

    },
    generateDescriptors: function() {
        this.setState({pageActive: "generateDescriptors"});
        this.props.setActivePage("generateDescriptors");
        $(".totalLeftScreenMode").removeClass("totalLeftScreenMode")
    },
    goMainScreen: function() {
        this.props.setActivePage({pageActive: "package"});
    },
    getInitialState: function() {

        return {
            configurationStatus: this.props.formData.isGenDescComp
                ? "Configured"
                : "Not Configured",
            isVnfActive: this.props.formData.isVnfActive,
            isGenDescComp: this.props.formData.isGenDescComp,
            testPackageExecuted: this.props.formData.testPackageExecuted,
            loaderOn: false,
            statusLoaderOn: false,
            pageActive: "upload",
            formData:this.props.formData
        };
    },
    testPackage: function() {
        this.setState({loaderOn: true});
        var self = this;
        $.ajax({
            url: config.testApi + "/executeJava",
            method: 'GET',
            data: {},
            success: function(data) {
                self.setState({testPackageExecuted: true, loaderOn: false});
                self.props.formData.testPackageExecuted = true;
                self.props.saveAndSetFormData(self.props.formData);
                toastr.success("Test cases executed successfully");
            },
            error: function(data) {
                self.setState({loaderOn: false});
                toastr.error("Test cases could not be executed");
            }
        })
    },loopTimeout: function() {

this.callTransition();
var self=this;
        setInterval(function() {
            self.callTransition();
            },5000);
    },
    callTransition1:function(){
        var self = this;

            var retrieveUrl = config.formApi + "/vnfAction/" + self.props.formData.id + "/retrieve";
var inProgressFlag =false;
            axios.get(retrieveUrl).then(function(response) {
                var data = [];
                console.log(response.data)
                for (var object in response.data) {
                    var dataObj = {
                        content: "",
                        status:response.data[object].status
                    }
                    dataObj.content = object;
                    dataObj.status = dataObj.status.toLowerCase();

                    if (response.data[object].status == "failed" && !inProgressFlag )  {
                                inProgressFlag=true;
                    }
                    if (response.data[object].status == "not-started" && !inProgressFlag )  {
                                inProgressFlag=true;
                                dataObj.status="in-progress";
                    }
                                        data.push(dataObj);

                }
                self.refs.workFlow.loadData(data)

            }).catch(function(error) {
                console.log(error);
            });

    },
    transition1: function() {
        console.log(this.props.formData.id)
        var uploadUrl = config.formApi + "/vnfAction/" + this.props.formData.id + "/initialize";
        var self = this;
        axios.put(uploadUrl, {}).then(function(response) {
            console.log(response);
self.loopTimeout();
        }).catch(function(error) {
            console.log(error);
        });


    },
    callTransition: function(response) {
        var self = this;
        var inProgressFlag = false;
        var data = [];
        for (var object in response) {
          if(object=="id"){
            continue;
          }
            var dataObj = {
                content: "",
                status: response[object].status
            }
            dataObj.content = object;
            dataObj.status = dataObj.status.toLowerCase();

            if (response[object].status == "failed" && !inProgressFlag) {
                inProgressFlag = true;
            }
            if (response[object].status == "not-started" && !inProgressFlag) {
                inProgressFlag = true;
                dataObj.status = "in-progress";
            }
            data.push(dataObj);
        }
        self.refs.workFlow.loadData(data);
    },
    transition: function() {
        console.log(this.props.formData.id)
        var uploadUrl = config.formApi + "/vnfAction/" + this.props.formData.id + "/initialize";
        var self = this;
        axios.put(uploadUrl, {}).then(function(response) {

            self.callTransition(response.data);
        }).catch(function(error) {
            console.log(error);
        });

    },

    saveAndSetFormData: function(data) {
        var savePackageUrl = config.formApi + "/vnfForm/" + this.props.formData.id + "/saveFormData";
        var self = this;
        axios.post(savePackageUrl, {formData: data}).then(function(response) {
            self.props.setActivePage(data);
            //    self.setState({loaderOn: false});
            callback(response)
        }).catch(function(error) {
            //  self  .setState({loaderOn: false});
        });
    },
    activateVNF: function() {
        var self = this;
        var gene = this.props.formData.generalInfo;
        self.setState({statusLoaderOn: true});
        var packageId = this.props.formData.uploadNSDPackageId[0];
        if (this.state.isGenDescComp && !this.state.isVnfActive) {
            $.ajax({
                url: config.formApi + "/vnf/" + packageId + "/activateVnf",
                method: 'POST',
                data: {},
                success: function(data) {
                    self.props.formData.isVnfActive = true;
                    self.props.saveAndSetFormData(self.props.formData);
                    self.setState({isVnfActive: true})
                    $.ajax({
                        url: config.formApi + "/vnf/" + gene.productinfo.vnfproductname + "/getVnfStatus",
                        method: 'POST',
                        data: {},
                        success: function(data) {
                            if (data.status == "NULL") {
                                self.setState({configurationStatus: "Activating", statusLoaderOn: false});
                            } else {
                                self.setState({configurationStatus: data.status});
                            }
                        },
                        error: function(data) {}
                    })
                    setInterval(function() {
                        $.ajax({
                            url: config.formApi + "/vnf/" + gene.productinfo.vnfproductname + "/getVnfStatus",
                            method: 'POST',
                            data: {},
                            success: function(data) {
                                if (data.status == "NULL") {
                                    self.setState({configurationStatus: "Activating", statusLoaderOn: false});
                                } else {
                                    self.setState({configurationStatus: data.status});
                                }
                            },
                            error: function(data) {}
                        })
                    }, 7000);

                    self.setState({configurationStatus: "Configured"});

                },
                error: function(data) {}
            })
        }

    },
    render: function() {
        var PanelElem = (
            <div className="row questionaireFors">
              <div className="col-md-12">
                <LeftPanel className="totalLeftScreenMode" ref="leftPanel" changeRightPanel={this.changeRightPanel}></LeftPanel>
                <RightPanel className="totalRightScreenMode" formData={this.state.formData} ref="rightPanel" changeStatus={this.changeStatus}></RightPanel>
                </div>
          </div>
        );
        var PackageUploadElem = (
            <div>
                <Workflow ref="workFlow" id={this.props.formData.id}></Workflow>

                <PackageUpload setPageActive={this.setPageActive} ref="upload" id={this.props.formData.id} transition={this.transition} saveAndSetFormData={this.saveAndSetFormData} formData={this.props.formData}/>
                <div className="col-sm-12 col-md-12 col-lg-12 workflowView"></div>
            </div>
        );
        return (
            <div className="levelTwo container">
                <div className="homePageHeadOne">
                    <i className="fa fa-angle-left get-back" aria-hidden="true" onClick={this.goMainScreen}></i>
                    <span className="package-heading-span">
                        <b>{this.props.formData.generalInfo.productinfo.vnfproductname}</b>
                    </span>
                    <span className="package-span">
                        <i className="fa fa-info-circle product"></i>
                        <b>Contact & Product Info</b>
                    </span>
                </div>
                <div className="homePageHeadTwo">

                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <a href="#" data-toggle="tooltip" title="Upload VNF Package" className={this.state.pageActive == "upload"
                            ? "uploadPackage cardPackage active"
                            : "uploadPackage cardPackage "} onClick={this.uploadPackage}>
                            <i className={this.state.pageActive == "upload"
                                ? "pull-left fa faicon fa-cloud-upload headContent active"
                                : " pull-left fa faicon fa-cloud-upload headContent"}></i>

                            <h2 className={this.state.pageActive == "upload"
                                ? "headContent active"
                                : "headContent"}>Upload VNF Package</h2>

                        </a>

                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3" onClick={this.loadQuestionaire}>
                        <a href="#" className={this.state.pageActive == "questionaire"
                            ? "uploadPackage cardPackage active"
                            : "uploadPackage cardPackage "}>
                            <i className={this.state.pageActive == "questionaire"
                                ? "pull-left fa fa-question-circle faicon fa-2x headContent active"
                                : " pull-left fa fa-question-circle faicon fa-2x headContent"}></i>

                            <h2 className={this.state.pageActive == "questionaire"
                                ? "headContent active"
                                : "headContent"}>Onboarding Questionaire</h2>

                        </a>
                    </div>

                    <div className="col-sm-3 col-md-3 col-lg-3" onClick={this.loadGenerator}>

                        <a href="#" className={this.state.pageActive == "generateDescriptors"
                            ? "uploadPackage cardPackage active"
                            : "uploadPackage cardPackage "} onClick={this.generateDescriptors}>
                            <i className={this.state.pageActive == "generateDescriptors"
                                ? "pull-left fa faicon fa-cubes headContent active"
                                : " pull-left fa faicon fa-cubes headContent"}></i>
                            <h2 className={this.state.pageActive == "generateDescriptors"
                                ? "headContent active"
                                : "headContent"}>Generate Descriptors</h2>

                        </a>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3" onClick={this.loadGenerator}>

                        <a href="#" className={this.state.pageActive == "generateDescriptors"
                            ? "uploadPackage cardPackage active"
                            : "uploadPackage cardPackage "} onClick={this.generateDescriptors}>
                            <h2>
                            <span className="configuration" className={this.state.configurationStatus == 'Not Configured'
                                ? " configuration"
                                : (this.state.configurationStatus == "Configured"
                                    ? " configured configuration"
                                    : (this.state.configurationStatus == "ACTIVE"
                                        ? " active-vnf configuration"
                                        : " on-boarding configuration"))}>
                             {this.state.configurationStatus}</span>
                              </h2>

                        </a>
                    </div>
                </div>
                <div className="contentMain rightPanel totalRightScreenMode">

                    <div className="contentBody">
                        <div className="row homePageMain">
                            <div>
                                <div className={this.state.loaderOn
                                    ? "homePageClass"
                                    : ""}>
                                    <div className="col-sm-12 col-md-12 col-lg-12  ">
                                        {this.state.pageActive == "upload"
                                            ? PackageUploadElem
                                            : this.state.pageActive == "questionaire"
                                                ? PanelElem
                                                : this.state.pageActive == "generateDescriptors"
                                                    ? <GenerateDescriptors formData={this.props.formData} updataConfigurationStatus={this.updataConfigurationStatus} saveAndSetFormData={this.saveAndSetFormData}/>
                                                    : ""
}
                                    </div>

                                </div>
                                {/*  <div className="contentFooter">
                                <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.goMainScreen}></a>
                            </div> */}
                                <div className={this.state.loaderOn
                                    ? "showLoader"
                                    : "hideLoader"}>
                                    <Loader type='spinningBubbles' color='#000000'></Loader>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

});

module.exports = homePage;
