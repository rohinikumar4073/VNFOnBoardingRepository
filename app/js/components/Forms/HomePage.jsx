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
global.jQuery = require('jquery');


var bootstrap = require("bootstrap");

var homePage = React.createClass({
  changeRightPanel: function(pageNumber) {
      this.refs.rightPanel.setPageActive(pageNumber)

  },
    loadQuestionaire: function() {
        this.setState({pageActive:"questionaire"});
    },
    loadGenerator:function(){
      debugger;
  this.setState({pageActive:"generateDescriptors"});
    },
    changeStatus: function(pageNumber) {
        this.refs.leftPanel.changeStatus(pageNumber);
    },
	updataConfigurationStatus:function(status){
	
                    if (status != null) {
                        if (status == "NULL") {
                            this.setState({configurationStatus: "Activating"});
                        } else {
                            this.setState({configurationStatus:status});
                        }
                    } else {
                        self.setState({configurationStatus: "Not Configured"});
                    }

                
	},
    componentDidMount: function() {
      $('[data-toggle="tooltip"]').tooltip();

        var self = this;
        var gene = this.props.formData.generalInfo;

        if (self.props.formData.isVnfActive && self.props.formData.isGenDescComp) {
            $.ajax({
                url: config.formApi + "/vnf/" + gene.productinfo.vnfproductname + "/getVnfStatus",
                method: 'POST',
                data: {},
                success: function(data) {
                    if (data.status != null) {
                        if (data.status == "NULL") {
                            self.setState({configurationStatus: "Activating"});
                        } else {
                            self.setState({configurationStatus: data.status});
                        }
                    } else if (self.props.formData.isGenDescComp) {
                        self.setState({configurationStatus: "Configured"});
                    } else {
                        self.setState({configurationStatus: "Not Configured"});
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
                        if (data.status != null) {
                            if (data.status == "NULL") {
                                self.setState({configurationStatus: "Activating"});
                            } else {
                                self.setState({configurationStatus: data.status});
                            }
                        } else if (self.props.formData.isGenDescComp) {
                            self.setState({configurationStatus: "Configured"});
                        } else {
                            self.setState({configurationStatus: "Not Configured"});
                        }
                    },
                    error: function(data) {}
                })
            }, 10000);
        }

    },
    uploadPackage: function() {
        this.setState({pageActive:"upload"});


    },
    generateDescriptors: function() {
      this.setState({pageActive:"generateDescriptors"});

        this.props.setActivePage("generateDescriptors");
        $(".totalLeftScreenMode").removeClass("totalLeftScreenMode")
    },
    goMainScreen: function() {
        this.props.setActivePage({pageActive:"package"});
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
            pageActive:"upload"
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
    },
    loopTimeout: function() {

this.callTransition();
var self=this;
        setInterval(function() {
            self.callTransition();
            },5000);
    },
    callTransition:function(){
        var self = this;

            var retrieveUrl = config.formApi + "/vnf/" + self.props.formData.id + "/retrieve";
var counter =1;
            axios.get(retrieveUrl).then(function(response) {
                var data = [];
                console.log(response.data)
                for (var object in response.data) {
                    var dataObj = {
                        content: "",
                        status:response.data[object].status
                    }
                    dataObj.content = object;
                    if (response.data[object].status == "not-started" && counter ==1) {
                                counter++;
                                dataObj.status="in-progress";
                    }
                                        data.push(dataObj);

                }
                self.refs.workFlow.loadData(data)

            }).catch(function(error) {
                console.log(error);
            });

    },
    transition: function() {
        console.log(this.props.formData.id)
        var uploadUrl = config.formApi + "/vnf/" + this.props.formData.id + "/initialize";
        var self = this;
        axios.put(uploadUrl, {}).then(function(response) {
            console.log(response);
self.loopTimeout();
        }).catch(function(error) {
            console.log(error);
        });


    },  saveAndSetFormData:function(data){
      var savePackageUrl=config.formApi+ "/vnf/"+this.props.formData.id+"/saveFormData";
      var self=this;
                axios.post(savePackageUrl, {
                    formData: data
                }).then(function(response) {
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
      var PanelElem=(<div className="row questionaireFors" >
                        <LeftPanel className="totalLeftScreenMode" ref="leftPanel" changeRightPanel={this.changeRightPanel}>
                            </LeftPanel>
                            <RightPanel className="totalRightScreenMode" formDataFromHome={this.props.formData} ref="rightPanel" changeStatus={this.changeStatus}> </RightPanel>
                       </div>);
                       var PackageUploadElem=(<div>
                           <Workflow ref="workFlow" id={this.props.formData.id}></Workflow>


                         <PackageUpload setPageActive={this.setPageActive} ref="upload"
                                          id={this.props.formData.id}

                                         transition={this.transition} saveAndSetFormData={this.saveAndSetFormData} formData={this.props.formData}/>
                                       <div className="col-sm-12 col-md-12 col-lg-12 workflowView">

                                </div>
                                </div>);
        return (
            <div className="contentMain rightPanel totalRightScreenMode">
                <div className="contentBody">
                    <div className="row">
                        <div>
                            <div className={this.state.loaderOn
                                ? "homePageClass"
                                : ""}>
                                <h2 className="homePageHeading">
                                    <i className="fa fa-angle-left get-back" aria-hidden="true" onClick={this.goMainScreen}></i>
                                    <span className="package-heading-span">{this.props.formData.generalInfo.productinfo.vnfproductname}</span>
                                    <span className="configuration " className={this.state.configurationStatus == 'Not Configured'
                                        ? "  configuration"
                                        : (this.state.configurationStatus == "Configured"
                                            ? " configured configuration"
                                            : (this.state.configurationStatus == "ACTIVE"
                                                ? " active-vnf configuration"
                                                : " on-boarding configuration"))}>Status : {this.state.configurationStatus}</span>
                                </h2>
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <a href="#"  data-toggle="tooltip" title="Upload VNF Package" className={this.state.pageActive=="upload"
                                        ? "uploadPackage  cardPackage active"
                                        : "uploadPackage cardPackage  "} onClick={this.uploadPackage}>
                                        <i className="pull-left fa faicon fa-cloud-upload"></i>

                                        <h2>VNF Package</h2>

                                    </a>

                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3" onClick={this.loadQuestionaire}>
                                    <a href="#" className={this.state.pageActive =="questionaire"
                                        ? "uploadPackage  cardPackage active"
                                        : "uploadPackage cardPackage  "}>
                                        <i className="pull-left fa fa-question-circle faicon "></i>

                                        <h2>VNF Onboarding Questionaire</h2>

                                    </a>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3" onClick={this.loadGenerator}>

                                    <a href="#" className={this.state.pageActive =="generateDescriptors"
                                        ? "uploadPackage  cardPackage active"
                                        : "uploadPackage cardPackage  "} onClick={this.generateDescriptors}>
                                        <i className="pull-left fa faicon fa-cubes"></i>
                                        <h2>Generate Descriptors</h2>

                                    </a>
                                </div>

                                {/*<div className="col-sm-3 col-md-3 col-lg-3 ">
                                    <a href="#" className={this.state.configurationStatus == 'Not Configured'
                                        ? " cardPackage "
                                        : (this.state.configurationStatus == "Configured"
                                            ? "cardPackage configured"
                                            : (this.state.configurationStatus == "ACTIVE"
                                                ? "cardPackage active-vnf"
                                                : "cardPackage on-boarding"))}>
                                        <h2>Status
                                            <span>{this.state.configurationStatus}</span>
                                            <span className="progressActive">
                                                <span className="one">.</span>
                                                <span className="two">.</span>
                                                <span className="three">.</span>
                                            </span>
                                        </h2>

                                    </a>

                                </div>*/}
                                <div className="col-sm-12 col-md-12 col-lg-12  ">
                                    {
                                      this.state.pageActive =="upload"
                                      ? PackageUploadElem
                                      : this.state.pageActive =="questionaire"
                                        ? PanelElem
                                        : this.state.pageActive =="generateDescriptors"
                                        ?  <GenerateDescriptors formData={this.props.formData}  updataConfigurationStatus={this.updataConfigurationStatus} saveAndSetFormData={this.saveAndSetFormData} />
                                      :""
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

        );
    }

});

module.exports = homePage;
