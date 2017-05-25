var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var VNFBasic = require("./VNFBasic.jsx");
var ProductInfo=require("./ProductInfo.jsx");
var KpiParameters = require("./KpiParameters.jsx");
var ManagementInfo = require("./ManagementInfo.jsx");
var VirtualResource = require("./VirtualResource.jsx");
var DeployementFlavour = require("./DeploymentFlavour.jsx")
var nextPage = "";

var VMInformation = React.createClass({
    getInitialState: function() {
        var formData = {};
        if (this.props.formData) {
            formData = this.props.formData;
        }
        return ({vmArr: [], formData: formData, noOfVms: 0, val: "", statusActive: "product"});
    },
    onSubmit: function(e) {
        this.handleConfirm(e.formData)
    },
    handleConfirm: function(data) {
        if (this.state.val == "saveAndExit") {
            this.props.setPageActive("homePage", "next", data, "vnfInfo");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
        } else {
            this.props.setPageActive("vmInfo", "next", data, "vnfInfo")
        }
    },
    clickTheButton: function() {
        switch (this.state.statusActive) {
            case "product":
                $("#proInfo button").click();
                break;
            case "vnf":
                $("#virRes button").click();
                break;
            case "mgmt":
                $("#managementInfo button").click();
                break;
            case "kpiParameters":
                $("#kpiRes button").click();
                break;
                case "depFlavourButton":
                $("#depFlavour button[type='submit']").click();
                    break;

            default:
                break;
        }
    },
    pageActive: function(activePage) {
      if(activePage=="virtualInfo"){
        this.refs.vr.loadData();
      }
        this.clickTheButton(activePage);
        this.setState({"statusActive": activePage});
    },
    moveNextSection: function(data) {
        this.clickTheButton();
    },
    saveFormData: function(nextPage) {
        this.props.saveFormData( nextPage)
    },
    render: function() {
        return (
            <div id="vvnf">
                <ul className="nav nav-tabs tabs-left" role="tablist">
                  <li id="product-tab" role="presentation">
                      <a href="#pro" aria-controls="prodInfo" role="tab" data-toggle="tab"  className="active" onClick={this.pageActive.bind(this, "product")}>
                          Product
                      </a>
                  </li>
                    <li id="vr-tab" role="presentation">
                        <a href="#vresource" aria-controls="vresource" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this, "vnf")}>
                            General Information
                        </a>
                    </li>
                    <li id="mgmt-tab" role="presentation">
                        <a href="#mgmt" aria-controls="mgmt" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this, "mgmt")}>
                            Management & Config Requirements
                        </a>
                    </li>
                    <li id="kpi-tab" role="presentation">
                        <a href="#kpipar" aria-controls="kpipar" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this, "kpiParameters")}>
                            KPI Parameters
                        </a>
                    </li>
                    <li id="deploy-flavour-tab" role="presentation">
                        <a href="#depFlavourButton" aria-controls="depFlavourButtonpar" role="tab" data-toggle="tab"
                          onClick={this.pageActive.bind(this, "depFlavourButton")}>
                            DeploymentFlavour
                        </a>
                    </li>
                    <li id="kpi-tab" role="presentation">
                        <a href="#vnfcInform" aria-controls="kpipar" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this, "virtualInfo")}>
                            VNFC
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="pro" aria-labelledby="product-tab">
                      <div id="produ" className="panel-collapse collapse in" role="tabpanel">
                          <div className="panel-body">
                              <ProductInfo saveFormData={this.saveFormData} formData={this.props.formData} ></ProductInfo>
                          </div>
                      </div>
                  </div>
                    <div role="tabpanel" className="tab-pane " id="vresource" aria-labelledby="vr-tab">
                        <div id="vres" className="panel-collapse collapse in" role="tabpanel">
                            <div className="panel-body">
                                <VNFBasic saveFormData={this.saveFormData} formData={this.props.formData} ></VNFBasic>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="mgmt" aria-labelledby="mgmt-tab">
                        <div id="mgm" className="panel-collapse collapse in" role="tabpanel">
                            <div className="panel-body">
                                <ManagementInfo saveFormData={this.saveFormData} formData={this.props.formData}></ManagementInfo>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="kpipar" aria-labelledby="kpi-tab">
                        <div id="kpi" className="panel-collapse collapse in" role="tabpanel">
                            <div className="panel-body">
                                <KpiParameters saveFormData={this.saveFormData} formData={this.props.formData}></KpiParameters>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="depFlavourButton" aria-labelledby="vnfcInform-tab">
                        <div id="vnfcData" className="panel-collapse collapse in" role="tabpanel">
                            <div className="panel-body">
                                <DeployementFlavour saveFormData={this.saveFormData} formData={this.props.formData }></DeployementFlavour>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="vnfcInform" aria-labelledby="vnfcInform-tab">
                        <div id="vnfcData" className="panel-collapse collapse in" role="tabpanel">
                            <div className="panel-body">
                                <VirtualResource  saveFormData={this.saveFormData} ref="vr" formData={this.props.formData }/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    },
    moveNext: function() {
        nextPage = "vmInfo"
        this.clickTheButton();
    },
    movePrev: function() {
        nextPage = "networkInfo"
        this.clickTheButton();
    },
    saveAndExit: function() {
        this.state.val = "saveAndExit";
        $("#vvnf button").click();
        this.props.setPageActive("homePage", "next", {}, "vnfInfo");

        //this.setState({val: "saveAndExit"});
    },
    componentDidMount: function() {
        var bodyWidth = $('body').width();
        $('.contentFooter').css('width', bodyWidth - 300);

    }
});

module.exports = VMInformation;
