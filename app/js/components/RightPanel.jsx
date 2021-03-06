var React = require("react");
var toastr = require("toastr");
var axios = require("axios");
var GeneralInfo = require("./Forms/GeneralInfo.jsx");
var CommonInfo = require("./Forms/CommonInfo.jsx");
var Orchestration = require("./Forms/Orchestration.jsx");
var VirtualResource = require("./Forms/VirtualResource.jsx");
var ManagementConfig = require("./Forms/ManagementConfig.jsx");
var ScalingRedundancy = require("./Forms/ScalingRedundancy.jsx");
var PhysicalResource = require("./Forms/PhysicalResource.jsx");
var VNFInformation = require("./Forms/VNFInformation.jsx");
var Loader = require("react-loading");
var config = require("./../properties/config.js");

var Networking = require("./Forms/Networking.jsx");
var RightPanel = React.createClass({
    setActivePage: function(activePage) {
        this.setState({pageActive: activePage});

        this.props.changeStatus(activePage)

    },
    forAddNew: function() {
        var packageName = this.generatePackageName();
        this.setState({pageActive: "generalInfo", packageName: packageName, data: {}})
    },
    setPageActive: function(pageNumber, fromPage, formData, prevPageName) {
        var packageName = this.getPackageName();
        if (pageNumber != "package") {
            this.props.changeStatus(pageNumber)
        }
        if (fromPage == "prev" && !formData) {
            this.setState({pageActive: pageNumber, packageName: packageName});
        } else if (fromPage == "prev" && formData) {

            this.setState({pageActive: pageNumber, packageName: packageName});
            this.state.data[prevPageName] = formData;
            this.state.data.pageNumber = (pageNumber);
            this.state.data.status = "inProgress";
            var savePackageUrl = config.formApi + "/vnfForm/" + packageName + "/saveFormData";
            this.setState({loaderOn: true});
            var self = this;
            this.ajaxCalltoSetData(self.state.data, packageName, function(response) {
                self.setState({pageActive: pageNumber, packageName: packageName, data: self.state.data});
            })
        } else {
            debugger;
            this.state.data[prevPageName] = formData;
            this.state.data.pageNumber = (pageNumber);
            this.state.data.status = "inProgress";
            var savePackageUrl = config.formApi + "/vnfForm/" + packageName + "/saveFormData";
            this.setState({loaderOn: true});
            var self = this;
            this.ajaxCalltoSetData(self.state.data, packageName, function(response) {
                self.setState({pageActive: pageNumber, packageName: packageName, data: self.state.data});
            })

        }
    },
    ajaxCalltoSetData: function(data, packageName, callback) {
        var savePackageUrl = config.formApi + "/vnfForm/" + packageName + "/saveFormData";
        var self = this;
        axios.post(savePackageUrl, {formData: data}).then(function(response) {
            self.setState({loaderOn: false});
            callback(response)
        }).catch(function(error) {
            self.setState({loaderOn: false});
        });
    },
    saveAndSetFormData: function(data) {
        var packageName = this.getPackageName();
        this.ajaxCalltoSetData(data, packageName, function(response) {
            self.setState({data: data});
        });
    },
    getPackageName: function() {
        var packageName = "";
        if (!this.state.packageName) {
            packageName = this.generatePackageName();
        } else {
            packageName = this.state.packageName;
        }
        return packageName;
    },
    setPackageData: function(rowData) {
        this.refs.package.setPackageData(rowData);
    },
    saveFormData(nextPage) {
        this.props.changeStatus(nextPage)
        this.setState({pageActive: nextPage});
    },
    generatePackageName: function() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x'
                ? r
                : (r & 0x3 | 0x8)).toString(16);
        });

    },
    setPackageName: function(packageName) {
        this.setState({packageName: packageName})
    },
    getInitialState: function() {
        return {
            pageActive: "vnfInfo",
            packageName: "",
            loaderOn: false,
            statusLoaderOn: false,
            data: {
                "generalInfo": {}
            }
        }

    },

    onShowGrid(show) {
        this.setState({showGrid: show});
    },
    ageCellRendererFunc: function(params) {
        return '<span class="glyphicon glyphicon-pencil"></span></span><span class="glyphicon glyphicon-trash"></span>';
    },
    setPackageDataAndName: function(data) {
        this.setState(data);
        this.props.changeStatus(data.pageActive)

    },
    render: function() {

        return (

            <div className={this.state.loaderOn
                ? "homePageClass"
                : ""}>

                <div >
                    <div className="col-xs-9 right-panel-forms">

                        {this.state.pageActive == "verification"
                            ? <CommonInfo setPageActive={this.setPageActive} ref="verification" saveFormData={this.saveFormData}
                            formData={this.props.formData} />
                            : this.state.pageActive == "vnfInfo"
                                ? <VNFInformation setPageActive={this.setPageActive} ref="vnfInfo" saveFormData={this.saveFormData} formData={this.props.formData}/>
                                : this.state.pageActive == "vmManager"
                                    ? <Orchestration setPageActive={this.setPageActive} ref="vmManager" saveFormData={this.saveFormData}
                                    formData={this.props.formData} />
                                    : this.state.pageActive == "networkInfo"
                                        ? <Networking setPageActive={this.setPageActive} ref="networkInfo" saveFormData={this.saveFormData}
                                         formData={this.props.formData}/>
                                            : this.state.pageActive == "additonalInfo"
                                                ? <PhysicalResource setPageActive={this.setPageActive} ref="additonalInfo"
                                                saveFormData={this.saveFormData} formData={this.props.formData}
                                                />
                                                : ""
}

                    </div>
                </div>

                <div className={this.state.loaderOn
                    ? "showLoader"
                    : "hideLoader"}>
                    <Loader type='spinningBubbles' color='#000000'></Loader>
                </div>
            </div>

        );
    },
    cardClick: function() {

        $(this).addClass('active');
        $('.viewOption .tableView').removeClass('active');
        $('.vnfpackageCardView').css('display', 'block');
        $('.vnfpackageListView').hide();

    },
    tableClick: function() {

        $(this).addClass('active');
        $('.viewOption .gridView').removeClass('active');
        $('.vnfpackageListView').css('display', 'block');
        $('.vnfpackageCardView').hide();

    },

    componentDidMount: function() {
        this.setState({"data": this.props.formData, packageName: this.props.formData.id});
    }
});

module.exports = RightPanel;
