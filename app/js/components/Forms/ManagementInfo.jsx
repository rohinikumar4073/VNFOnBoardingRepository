var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

    var FormMgmtInfo = Form.default;
    const schema = {
        "type": "object",
        "properties": {
          "nativegui": {
              "type": "boolean",
              "title": "Does the VNF support a Native Application dashboard GUI?"
          },
          "usegui": {
              "type": "string",
              "title": "If yes, describe how to use/access the GUI (e.g., port # and credentials):"
          },
          "sshmanagement": {
              "type": "boolean",
              "title": "Does the VNF support SSH management?"
          },
          "sshenable": {
              "type": "string",
              "title": "If SSH support is enabled by default, what are the default credentials?"
          },
          "sshnotenable": {
              "type": "string",
              "default": "Default name",
              "title": "If not enabled by default, how is support enabled and configured?"
          },
          "netconfmgmt": {
              "type": "boolean",
              "title": "Does the VNF support NETCONF management?"
          },
          "netconfenable": {
              "type": "string",
              "title": "If NETCONF support is enabled by default, what are the default credentials?"
          },
          "netconfnotenable": {
              "type": "string",
              "title": "If not enabled by default, how is support enabled and configured?"
          },
          "acceptpostresource": {
              "type": "string",
              "title": "How can we determine if the VNF is ready to accept configuration post resource orchestration? Is there a preferred configuration mechanism/protocol?"
          }
        }
    };

const uiSchema = {
  "nativegui": {
      "ui:widget": "radio",
      "ui:options": {
          "inline": true
      }
  },
   "usegui": {
        "ui:widget": "textarea"
    },
    "sshmanagement": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    },  "sshenable": {
          "ui:widget": "textarea"
      },  "sshnotenable": {
            "ui:widget": "textarea"
        },
        "netconfmgmt": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "netconfenable": {
            "ui:widget": "textarea"
        },
        "netconfnotenable": {
            "ui:widget": "textarea"
        },
        "acceptpostresource": {
            "ui:widget": "textarea"
        }
};
    var Management = React.createClass({
        getInitialState:function(){
          var data ={}
          if(this.props.formData["vnfInfo"]){
            data=this.props.formData["vnfInfo"]["managementInfo"];
          }
            return({
              formData:data,
               val: ""
            }
            );
        },
        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.vnfInfo){
                formData["vnfInfo"]={};
              }
            formData["vnfInfo"]["managementInfo"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
                self.props.saveFormData("networkInfo");
                self.setState({formData:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });},
        render: function() {
            return (
                <div id="managementInfo">
                        <FormMgmtInfo schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit} >
                        </FormMgmtInfo>
                         <div className="contentFooter">
                        {/*  <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"verification","prev")}>Previous</a>*/}
                    {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>*/}
                    <div className="net">
                        {/* <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"networkInfo","prev")}>Previous</a>*/}
                        {/*    <a href="#" id="save" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                        <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>

                    </div>
                         </div>
                        </div>
            );
        },moveNext:function(){
          this.setState({"val":"next"}) ;
          $("#managementInfo button").click();
        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
         },
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#managementInfo button").click();
           //this.setState({val: "saveAndExit"});
         },
         finishForm:function(){
           this.state.val = "";
              $("#managementInfo button").click();
         }
    });
    module.exports= Management;
