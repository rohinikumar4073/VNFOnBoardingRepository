var React = require("react");
var $ = require("jquery");
var SampleMachina = require("./SampleMachina.js");
var Loader = require("react-loading");
var toastr = require("toastr");
var axios = require("axios");
var config = require("./../../properties/config.js");
var Workflow = require("./../Workflow.jsx");
var PackageUpload=require("./VNFPackageUpload.jsx");

var homePage = React.createClass({

    loadQuestionaire: function() {
        this.props.setActivePage("networkInfo");
        $(".totalRightScreenMode").removeClass("totalRightScreenMode")
        $(".totalLeftScreenMode").removeClass("totalLeftScreenMode")
    },
    componentDidMount: function() {

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
        this.props.setActivePage("upload");
        $(".leftMain").addClass("totalLeftScreenMode")
        $(".rightPanel").addClass("totalRightScreenMode")

    },
    generateDescriptors: function() {
        this.props.setActivePage("generateDescriptors");
        $(".totalRightScreenMode").removeClass("totalRightScreenMode")
        $(".totalLeftScreenMode").removeClass("totalLeftScreenMode")
    },
    goMainScreen: function() {
        this.props.setActivePage("package");
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
            statusLoaderOn: false
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

        var self = this;

        setInterval(function() {
            var retrieveUrl = config.formApi+"/vnf/123/retrieve";

            axios.get(retrieveUrl).then(function(response) {
                var data = [];
                console.log(response.data)
                for (var object in response.data) {
                    var dataObj = {
                        content: ""
                    }
                    if (response.data[object].status == "not-started") {
                        break;
                    } else if (response.data[object].status == "completed") {
                        dataObj.content = object;
                        data.push(dataObj)

                    }
                }
                self.refs.workFlow.loadData(data)

            }).catch(function(error) {
                console.log(error);
            });
        }, 2000);
    },
    transition: function() {
      debugger;

          var uploadUrl = "http://10.76.110.81:40512/vnf/123/initialize";
          var self = this;
          axios.put(uploadUrl,{}).then(function(response) {
              console.log(response);

          }).catch(function(error) {
              console.log(error);
          });

        this.loopTimeout();
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
                                </h2>
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <a href="#" className={this.props.formData.isPackageUploaded
                                        ? "uploadPackage greenColor cardPackage"
                                        : "uploadPackage cardPackage active"} onClick={this.uploadPackage}>
                                        <i className="pull-left fa faicon fa-cloud-upload"></i>

                                        <h2>Upload
                                          VNF Package</h2>

                                    </a>

                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3" onClick={this.loadQuestionaire}>
                                    <a href="#" className="cardPackage  ">
                                    <i className="pull-left fa fa-question-circle faicon "></i>

                                        <h2>VNF Onboarding
                                          Questionaire</h2>

                                    </a>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3">

                                    <a href="#" className={this.state.isGenDescComp
                                        ? "generatePackage greenColor cardPackage"
                                        : "generatePackage cardPackage"} onClick={this.generateDescriptors}>
                                          <i className="pull-left fa faicon fa-cubes"></i>
                                        <h2>Generate
                                          Descriptors</h2>

                                    </a>
                                </div>

                                <div className="col-sm-3 col-md-3 col-lg-3 ">
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

                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 ">

                                  <PackageUpload setPageActive={this.setPageActive} ref="upload"  transition={this.transition} saveAndSetFormData={this.saveAndSetFormData}  formData={this.state.data}/> :
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 ">
                                    <Workflow ref="workFlow" id={this.props.formData.id}></Workflow>
                                </div>

                            </div>
                            <div className="contentFooter">
                                <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.goMainScreen}>Return to VNF Directory</a>
                            </div>
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
