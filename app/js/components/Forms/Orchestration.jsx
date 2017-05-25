var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

var FormOS = Form.default;
var vnfmSchema ={
    "type": "object",
    "title":"VNFM Managed Section",
    "properties": {


              "isManoComplaint":  {
                    "title": "Does the specific VNF-M have a MANO compliant Or-Vnfm interface?",
                    "type": "boolean",
                    "default": false
                }, "VnfmInterfaceFormat":{
                    "title": "What format is the Or-Vnfm interface (REST, etc.)",
                    "type": "string"
                },  "isNfVOallocation":{
                    "title": "Which resource allocation model does the specific VNFM use ?",
                    "type": "string",
                    "enum": [
                        "NFVO allocation",
                        "VNFM allocation"
                      ]
                }, "vnfMComplaint":{
                    "title": "Is VNF-M complaint with all requirements in the VNF-M section of VCP Requirement Document? If no, describe all non-complaint requirements",
                    "type": "string"
                }, "isVnmInstatiate":{
                    "title": "Can VNF-M instantiate VNF directly? If yes, is it supported via REST API?",
                    "type": "string"
                },  "isVNFMSupportUpgrade":{
                    "title": "Does VNF-M support upgrade to VNF? If yes, describe lifecycle involved in the upgrade",
                    "type": "string"
                }, "isVNFMSupportDowngrade":{
                    "title": "Does VNF-M support downgrades to VNF? If yes, describe lifecycle involved in the downgrade",
                    "type": "string"
                }, "vnfmAdminAccess":{
                    "title": "Does VNF-M require admin access to the VIM ? ",
                    "type": "boolean",
                    "default": false
                }, "isOpenStackCredentails":{
                    "title": "How to provide OpenStack credentials to VNF-M, and how does VNF-M securely store the given credentials?",
                    "type": "string"
                }

    }
}

const uiSchema = {
    "openstackversion": {
        "ui:widget": "radio",
         "ui:options": {
            "inline": true
          }
    },"openstackversion": {
        "ui:widget": "radio",
        "ui:options": {
           "inline": true
         }
    },
    "isVnfm": {
        "ui:widget": "radio",
        "ui:options": {
           "inline": true
         }
    },"kvmprescribed": {
        "ui:widget": "radio",
        "ui:options": {
           "inline": true
         }
    },"vnfm":{
      "isManoComplaint": {
          "ui:widget": "radio",
          "ui:options": {
             "inline": true
           }
      },"vnfmAdminAccess": {
          "ui:widget": "radio",
          "ui:options": {
             "inline": true
           }
      }
    },
    "vnf-m": {
        "vfmrequired": {
            "ui:widget": "radio"
        },
        "vfm-yes": {
            "items": [
                {
                    "ui:widget": "radio"
                }, {
                    "ui:widget": "textarea"
                }, {
                    "ui:widget": "textarea"
                }, {
                    "ui:widget": "textarea"
                }, {
                    "ui:widget": "textarea"
                }, {
                    "ui:widget": "textarea"
                }, {
                    "ui:widget": "textarea"
                }, {
                    "ui:widget": "radio"
                }, {
                    "ui:widget": "textarea"
                }
            ]
        }
    }
};

var Orchestration = React.createClass({
    getInitialState: function() {
      var data={};
      if(this.props.formData["orchestration"]){
        data=this.props.formData["orchestration"];
      }
        return({
          formData:data,
           val: "",
            "schema" :{
                 "type": "object",
                 "properties": {
                     "openstackversion": {
                         "type": "boolean",
                         "title": "Has the VNF been booted under OpenStack version described in VCP Requirements Document?"
                     },
                     "kvmprescribed": {
                         "type": "boolean",
                         "title": "Has the VNF been booted under KVM prescribed in VCP Requirements document?"
                     },"isVnfm":{
                       "type": "boolean",
                       "title": "Is VNF managed by VNFM ?"
                     }

                 }
             }
        }
        );
    },
    onSubmit: function(e) {

          var formData=this.props.formData;
          if(!formData.orchestration){
              formData["orchestration"]={};
            }
          formData["orchestration"]=e.formData;
          var self=this;
          DataService.saveandUpdateData(formData,function(){
            if(self.state.val=="next" || self.state.val=="prev"){
              self.props.saveFormData("verification");
              self.setState({formData:e.formData,val:""})

            }else{
              self.setState({formData:e.formData})

            }
          });    },
    handleConfirm: function(data) {
        if (this.state.val == "saveAndExit") {
            this.props.setPageActive("homePage", "next", data, "vmManager");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
        }
        else if(this.state.val == "prev"){
            this.props.setPageActive("vmInfo", "prev", data, "vmManager");
        }else {
            this.props.setPageActive("verification", "next", data, "vmManager");
        }
    },handleChange:function(e){
      var schema= JSON.parse(JSON.stringify(this.state.schema))
      if(e.formData.isVnfm){
        schema.properties.vnfm=vnfmSchema;
      }else{
        schema.properties.vnfm={};
      }
      this.setState({schema:schema,formData:e.formData})
    },
    render: function() {

        return (
            <div id="orcReq">
                <h2>Orchestration Requirements</h2>
                <FormOS schema={this.state.schema} uiSchema={uiSchema} onSubmit={this.onSubmit}  onChange={this.handleChange} formData={this.state.formData}></FormOS>
                <div className="net">
                    <a href="#" className="btn btn-default btn-sm previousBtn" onClick={this.movePrev}>Previous</a>
                      {/*<a href="#" className="btn btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this, "vmInfo", "prev")}>Previous</a>*/}
                  {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>*/}
                    <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        var bodyWidth = $('body').width();
        $('.contentFooter').css('width', bodyWidth - 300);
        $(".leftMain").removeClass("totalLeftScreenMode")
        $(".rightPanel").removeClass("totalRightScreenMode")
    },
    saveAndExit: function() {
        this.state.val = "saveAndExit";
        $("#orcReq button").click();
        //this.setState({val: "saveAndExit"});
    },
    moveNext: function() {
      this.setState({"val":"next"}) ;
        $("#orcReq button").click();
    },
    movePrev: function() {
        this.state.val = "prev";
        $("#orcReq button").click();
    }
});
module.exports = Orchestration;
