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
              <Header className="container-fluid" />
                {this.state.pageActive == "package" ?
                    <PackageData ref="package" setActivePage={this.setActivePage} setPackageDataAndName={this.setPackageDataAndName} forAddNew = {this.forAddNew} formData={this.state.data} setPageActive={this.setPageActive}/>
                     : (this.state.pageActive == "homePage"
                         ? <HomePage setActivePage={this.setActivePage} ref="homePage" formData={this.state.data}  saveAndSetFormData={this.saveAndSetFormData}/>:"")
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

        $(window).resize(function() {
            var bodyWidth = $('body').width();
            var bodyHeight = $('body').height();
            $('.contentFooter').css('width', bodyWidth);
            $('.leftMainBody').css('height', bodyHeight - 50);
            if ($(window).width() <= 768) {
                $('.contentFooter').css('width', bodyWidth - 95);
                $('.contentMain').css('margin-left', '55px');
                $('.contentFooter').css('margin-left', '75px');
                $('.leftMainBody').css('width', '55px');
                $('.leftnav a span').hide();
                $('.leftMainFooter').css('width', '55px');
                $('.forward').css('display', 'inline-block');
                $('.backward').css('display', 'none');
            } else {
                $('.contentFooter').css('width', bodyWidth - 300);
                $('.contentMain').css('margin-left', '260px');
                $('.contentFooter').css('margin-left', '280px');
                $('.leftMainBody').css('width', '260px');
                $('.leftnav a span').show();
                $('.leftMainFooter').css('width', '260px');
                $('.backward').css('display', 'inline-block');
                $('.forward').css('display', 'none');
            }
        });

    }
});

module.exports = Panel;
