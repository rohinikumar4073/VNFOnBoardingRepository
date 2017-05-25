var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

    var FormScale = Form.default;

const schema = {
  "type": "object",
  "properties": {
    "vmfailures": {
      "type": "string",
      "title": "How should VM failures be handled?"
    },
    "vmredundancy": {
      "type": "string",
      "title": "What is the VM Redundancy Schema (i.e., Local Intra Data Center and Geo-redundancy)?"
    }
  }
};

const uiSchema = {
  "vmfailures": {
    "ui:widget": "textarea"
  },
  "vmredundancy": {
    "ui:widget": "textarea"
  }
};
 const formData = {
"dhcpenabled": false,
  "intervm": false,
  "staticip": true,
  "floatingip": true,
  "antispoofing": true
};
    var ScalingRedundancy = React.createClass({
        getInitialState:function(){
            var formData = {};
            if (this.props.formData && this.props.formData["additonalInfo"]) {
                formData = this.props.formData["additonalInfo"]["scalingRedundancy"];
            }
            return ({vmArr: [], formData: formData, noOfVms: 0, val: "", statusActive: "phyRes"});
        },
        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.additonalInfo){
                formData["additonalInfo"]={};
              }
            formData["additonalInfo"]["scalingRedundancy"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
              self.props.saveFormData("additonalInfo");
                self.setState({formData:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });},
        handleConfirm: function(data) {
          if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"verification");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else{
            this.props.setPageActive("additonalInfo","next",data,"verification");
          }
        },
        render: function() {
            return (
                <div id="scalingRed">
                        <FormScale schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}>
                        </FormScale>
                         <div className="net">
                          {/*  <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,7,"prev")}>Previous</a> */}
                          {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                            <a href="#"  className="btn btn-danger btn-sm nextBtn"  onClick={this.moveNext}>Next</a>
                         </div>
                        </div>
            );
        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
         },
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#scalingRed button").click();
           //this.setState({val: "saveAndExit"});
         },
         moveNext:function(){
           this.setState({"val":"next"}) ;
           $("#scalingRed button").click();
         },
    });
module.exports=ScalingRedundancy;
