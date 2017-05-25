var React = require("react");
var $ = require("jquery");
var LeftPanel = require("./LeftPanel.jsx");
var Header= require("./Header.jsx");
var RightPanel= require("./RightPanel.jsx");
var PackageData=require("./VNFPackageData.jsx");
var HomePage=require("./Forms/HomePage.jsx");

var Panel = React.createClass({

    changeStatus: function(pageNumber) {
        this.refs.leftPanel.changeStatus(pageNumber);
    },
    getInitialState: function() {
        return {pageActive: "package", packageName: "",
          loaderOn: false,
          statusLoaderOn: false,
          data:{"generalInfo":{}}}

    },    setPackageDataAndName:function(data){
          this.setState(data);

        },
        setActivePage:function(data){

            this.setState(data);
        },
    render: function() {

        return (
            <div>
              <Header/>
                {this.state.pageActive == "package" ?
                    <PackageData ref="package" userName={this.props.userName} setActivePage={this.setActivePage} setPackageDataAndName={this.setPackageDataAndName} forAddNew = {this.forAddNew} formData={this.state.data} setPageActive={this.setPageActive}/>
                     : (this.state.pageActive == "homePage"
                         ? <HomePage setActivePage={this.setActivePage} userName={this.props.userName} ref="homePage" formData={this.state.data}  saveAndSetFormData={this.saveAndSetFormData}/>:"")
                       }

            </div>
        );
    },

    changeRightPanel: function(pageNumber) {
        this.refs.rightPanel.setPageActive(pageNumber)

    },

    componentDidMount: function() {

        var bodyWidth = $('body').width();
        var bodyHeight = $('body').height();
        $('.leftMainBody').css('height', bodyHeight - 50);
        $('.contentFooter').css('width', bodyWidth - 300);

        if ($(window).width() <= 768) {

            $('.contentMain').css('margin-left', '55px');
            $('.contentFooter').css('margin-left', '75px');
            $('.contentFooter').css('width', bodyWidth - 95);
            $('.leftMainBody').css('width', '55px');
            $('.leftnav  a span').hide();
            $('.leftMainFooter').css('width', '55px');
        }



    }
});

module.exports = Panel;
