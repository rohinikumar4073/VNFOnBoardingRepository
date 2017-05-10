var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var FormNetwork = Form.default;

const schema = {
  "type": "object",
  "properties": {
    "dhcpenabled": {
      "type": "boolean",
      
      "title": "Do all of the VNF’s management interfaces have DHCP enabled?"
    },
    "intervm": {
      "type": "boolean",
      "title": "(If more than one VM in VNF) Is there a separate internal network required for inter-VM communication?"
    },
    "staticip": {
      "type": "boolean",
      "title": "Do any of the interfaces require static IP address assignment at boot?"
    },
    "floatingip": {
      "type": "boolean",
      "title": "Do any of the interfaces require floating-IP address assignment?"
    },
    "antispoofing": {
      "type": "boolean",
      "title": "Do any of the interfaces require anti-spoofing (port security) disabled ?"
    }
  }
};

const uiSchema = {
  "dhcpenabled": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  },
  "intervm": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  },
  "staticip": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  },
  "floatingip": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  },
  "antispoofing": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  }
};
 const formData = {
  "dhcpenabled": false,
  "intervm": false,
  "staticip": true,
  "floatingip": true,
  "antispoofing": true
}
    var NetworkInfo = React.createClass({
        getInitialState:function(){
          debugger;
            return({
              formData:this.props.formData, val: ""
            }
            );
        },
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
          if(this.state.val == "saveAndExit"){
            debugger;
            this.props.setPageActive("homePage", "next", data,"networkInfo");

          }
          else{
            this.props.setPageActive("vnfInfo","next",data,"networkInfo")
          }
        },
        render: function() {
            return (
                <div id="netReq">
                      <h2>Networking Requirements</h2>
                        <FormNetwork schema={schema} uiSchema={uiSchema} formData={this.props.formData} onSubmit={this.onSubmit}>
                        </FormNetwork>
                        <div className="contentFooter">
                           <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"generalInfo","prev")}>Previous</a>
                           <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>
                           <a href="#"  className="btn btn-danger btn-sm nextBtn" onClick={this.moveClick}>Next</a>
                        </div>
                        </div>
            );
        },
         componentDidMount: function() {



         },
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#netReq button").click();
           //this.setState({val: "saveAndExit"});
         },
         moveClick:function(){
           this.state.val = "";
           $("#netReq button").click();
         }
    });
    module.exports= NetworkInfo;
