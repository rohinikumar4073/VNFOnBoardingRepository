var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")
var FormVNF = Form.default;

const schema = {
  "description": "",
  "name":"vnf",
  "type": "object",
  "properties": {
    "countvms": {
      "title": "How many VNFCs are in the VNF?",
      "type": "number"
    },"orderingDependencies": {
      "title": "Are there any startup ordering dependencies?",
      "type": "boolean"
    },"startUporderingDependencies": {
      "title": "If there are startup order dependencies, explain the steps.",
      "type": "string"
    }

  }
};

const uiSchema = {

    "addblockstorage": {
      "items": []
    },
    "orderingDependencies": {
      "ui:widget": "radio",
      "ui:options": {
        "inline": true
      }
    },"startUporderingDependencies":{
      "ui:widget": "textarea"

    }

};


    var VNFBasic = React.createClass({
        getInitialState:function(){
          var data ={}
          if(this.props.formData["vnfInfo"]){
            data=this.props.formData["vnfInfo"]["generalInfo"];
          }
            return({
              vmArr:[],
              formData:data,
               noOfVms:0,
               val: ""
            }
            );
        },
        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.vnfInfo){
                formData["vnfInfo"]={};
              }
            formData["vnfInfo"]["generalInfo"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
                self.props.saveFormData("networkInfo");
                self.setState({data:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });
        },
        handleConfirm: function(data) {
          var formData=this.props.formData;
          if(!formData.vnfInfo){
              formData["vnfInfo"]={};
            }
          formData["vnfInfo"]["vnfGeneralInfo"]=data;
          var self=this;
          DataService.saveandUpdateData(formData,function(){
              self.props.setPageActive("vmInfo","next",data,"vnfInfo")
          })
          },
        render: function() {
            return (
                <div id="virRes">
                      <FormVNF schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}>
                        </FormVNF>
                        <div className="net">
                            {/* <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"networkInfo","prev")}>Previous</a>*/}
                            {/*    <a href="#" id="save" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                            <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>

                        </div>

                        </div>
            );
        },moveNext:function(){
          this.setState({"val":"next"}) ;
          $("#virRes button").click();
        },
        movePrev:function(){
          this.setState({"val":"prev"}) ;
          $("#virRes button").click();
        },
        saveAndExit: function(){
          this.state.val = "saveAndExit";
            $("#virRes button").click();
          //this.setState({val: "saveAndExit"});

        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
            $(".leftMain").removeClass("totalLeftScreenMode")
            $(".rightPanel").removeClass("totalRightScreenMode")
         }
    });

    module.exports= VNFBasic;
