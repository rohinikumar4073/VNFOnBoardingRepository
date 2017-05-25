var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var FormNetwork = Form.default;
var DataService=require("./../../services/DataService.js")

const schema = {
  "type": "object",
  "properties": {
    "dhcpenabled": {
      "type": "boolean",
      "title": "Do all of the VNF's management interfaces have DHCP enabled?"
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
    },
    "externalCpd":{
      "type":"array",
      "title":"External CPD",
      "items":{
        "type":"object",
        "properties":{
          "cpRole": {
              "type": "string",
              "title": "Type of port"
            },
            "layerProtocol": {
              "type": "string",
              "title": "Identifies which protocol the CP uses for connectivity purposes"
            },
            "internalVld": {
              "type": "string",
              "title": "Reference of a network ID in VL descriptor"
            },
            "bitRateRequirement": {
              "type": "string",
              "title": "Bit Rate Requirement"
            },
            "addressData": {
              "title":"Address Data",
              "type": "object",
              "properties": {
                "addressType": {
                  "type": "string",
                  "title": "Type of address",
                  "enum": ["L2","L3"]
                },
                "l2AddressData": {
                  "type": "object",
                  "title":"L2 Address Data",
                  "properties": {
                    "MacAddress": {
                      "type": "string",
                      "title": "MAC address of the port"
                    },
                    "VLAN": {
                      "type": "number",
                      "title": "VLAN ID of the port"
                    },
                    "VNID": {
                      "type": "number",
                      "title": "Virtual Network ID of the port"
                    }
                  }
                },
                "l3AddressData": {
                  "type": "object",
                  "title":"L3 Address Data",
                  "properties": {
                    "ipAddressType": {
                      "type": "string",
                      "title": "ipv4/ipv6"
                    },
                    "numberOfIPaddress": {
                      "type": "number",
                      "title": "Number of IPa addresses"
                    },
                    "ipAddressAssignment": {
                      "type": "boolean",
                      "title": "Specify if the address assignment is the responsibility of management and orchestration function or not. NOTE:  If it is set to True, it is the management and orchestration function responsibility. "
                    },
                    "floatingIPActivated": {
                      "type": "boolean",
                      "title": "Floating IP activated?"
                    }
                  }
                }
              }
            }
        }
      }
    },
    "NICCapability": {
         "type": "string",
         "title": "NIC Capablity"
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
  },
  "externalCpd":{
    "ui:options": {
      "orderable": false
    },
    "items":{
      "cpRole":{
        "classNames":"col-sm-6"
      },
      "layerProtocol":{
        "classNames":"col-sm-6"
      },
      "internalVld":{
        "classNames":"col-sm-6"
      },
      "bitRateRequirement":{
        "classNames":"col-sm-6"
      },
      "addressData":{
      "classNames":"col-sm-12",
      "addressType":{
          "ui:widget":"radio",
          "ui:options":{
            "inline":"true"
          },
          "classNames":"col-sm-6"
        },
        "l2AddressData":{
              "classNames":"col-sm-12",
          "MacAddress": {
            "classNames":"col-sm-6"
          },
          "VLAN": {
            "classNames":"col-sm-6"
          },
          "VNID": {
          "classNames":"col-sm-6"
          }
        },
        "l3AddressData":{
            "classNames":"col-sm-12",
          "ipAddressAssignment": {
            "classNames":"col-sm-6"
          },
          "floatingIPActivated": {
            "classNames":"col-sm-6"
          },
          "ipAddressType": {
            "classNames":"col-sm-6"
          },
          "numberOfIPaddress": {
            "classNames":"col-sm-6"
          }
        }
      }
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
          var data ={}
          if(this.props.formData["networkInfo"]){
            data=this.props.formData["networkInfo"];
          }
            return({
              formData:data,
               val: ""
            }
            );
        },
        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.networkInfo){
                formData["networkInfo"]={};
              }
            formData["networkInfo"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
                self.props.saveFormData("vmManager");
                self.setState({formData:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });  },
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
                        <FormNetwork schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}>
                        </FormNetwork>
                        <div className="net">
                      {/*     <a href="#" className="btn  btn-default btn-sm previousBtn " onClick={this.props.setPageActive.bind(this,"generalInfo","prev")}>Previous</a>
                            {/* <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
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

             this.setState({"val":"next"}) ;

           $("#netReq button[type='submit']").click();
         }
    });
    module.exports= NetworkInfo;
