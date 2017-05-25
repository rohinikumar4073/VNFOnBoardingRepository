var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

var FormScale = Form.default;

const schema = {
    "type": "object",
    "properties": {
        "flavorId": {
            "type": "string",
            "title": "Id of the flavour"
        },
        "description": {
            "type": "string",
            "title": "Description"
        },
        "vduProfile": {
          "title":"VDU Profile",
            "type": "array",
            "items": {
                "type": "object" ,
                "properties": {
                    "vduId": {
                        "type": "string",
                        "title": "Point to the VNFC ID"
                    },
                    "minNumberOfInstances": {
                        "type": "integer",
                        "title": "Minimum number of instances allowed for this VNFC"
                    },
                    "maxNumberOfInstances": {
                        "type": "integer",
                        "title": "Maximum number of instances allowed for this VNFC"
                    },
                    "localAffinityOrAntiAffinityRule": {
                        "type": "object",
                        "title": "Affinity",
                        "properties": {
                            "affinityOrAntiAffinity": {
                                "type": "boolean",
                                "title": "Is Affinity"
                            },
                            "scope": {
                                "type": "string",
                                "title": "Scope"
                            },
                            "groupId": {
                                "type": "string",
                                "title": "Group ID"
                            }
                        }

                    }
                }
            }

        },
        "vlProfile": {
            "type": "object",
            "title": "VL Profile",
            "properties": {
                "vnfVldId": {
                    "type": "string",
                    "title": "VNF VLD ID"
                },
                "bitRateRequirements": {
                    "title": "Bit Rate Requirements",
                    "type": "object",
                    "properties": {
                        "root": {
                            "type": "integer",
                            "title": "Root"
                        },
                        "leaf": {
                            "type": "integer",
                            "title": "Leaf"
                        }
                    },
                    "qos": {
                        "title": "QOS",
                        "type": "object",
                        "properties": {
                            "latency": {
                                "type": "string",
                                "title": "Root"
                            },
                            "paketDelayVariation": {
                                "type": "integer",
                                "title": "Packet Delay Variation"
                            },
                            "packetLossRatio": {
                                "type": "integer",
                                "title": "Packet loss ratio"
                            }

                        }
                    }
                }
            }
        },
        "instantiationLevel": {
            "title": "Instatiation Level" ,
            "type": "object",
            "properties": {
                "levelId": {
                    "type": "integer",
                    "title": "Uniquely identifies a level with the DF"
                },
                "description": {
                    "type": "string",
                    "title": "Description"
                },
                "vduLevel": {
                  "title":"VDU Level",
                    "type": "array",
                    "items": {
                      "type":"object",
                        "properties": {
                            "vduId": {
                                "type": "string",
                                "title": "Identifies VNFC"
                            },
                            "numberOfInstances": {
                                "type": "integer",
                                "title": "Indicates the number of instance of this VDU to deploy for this level"
                            }
                        }
                    }

                },
                "scaleInfo": {
                    "type": "array",
                    "title": "Scaling Info",
                     "items": {"type":"object",
                        "properties": {
                            "aspectId": {
                                "type": "string",
                                "title": "Identifier of the scaling aspect"
                            },
                            "scaleLevel": {
                                "type": "string",
                                "title": "Represents for each aspect the scale level that corresponds to this instantiation level. scaleInfo shall be present if the VNF supports scaling. "
                            }
                        }
                    }

                }

            },
            "defaultInstantiationLevel": {
                "type": "string",
                "title": "Default instantiation level for this VNF"
            },
            "supportedOperation": {
                "type": "string",
                "title": " which operations are available for this DF via the VNF LCM interface"
            },
            "vnfLcmOperationsConfiguration": {
                "type": "string",
                "title": "Configuration parameters for the VNF Lifecycle Management operations"
            },
            "instantiateVnfOpConfig": {
                "type": "object",
                "properties": {
                    "parameter": [
                        {
                            "type": "array",
                            "properties": {
                                "parameter": "parameter1"
                            }
                        }
                    ]
                },
                "scaleVnfOpConfig": {
                    "type": "object",
                    "properties": {
                        "parameter": [
                            {
                                "type": "array",
                                "properties": {
                                    "parameter": {
                                        "type": "string",
                                        "title": "Parameter1"
                                    }
                                }
                            }
                        ],
                        "scalingByMoreThanOneStepSupported": {
                            "type": "boolean",
                            "title": ""
                        }
                    }
                }
            }
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
var DeployementFlavour = React.createClass({
    getInitialState: function() {
      var data ={}
      if(this.props.formData["vnfInfo"]){
        data=this.props.formData["vnfInfo"]["deploymentFlavour"];
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
        formData["vnfInfo"]["deploymentFlavour"]=e.formData;
        var self=this;
        DataService.saveandUpdateData(formData,function(){
          if(self.state.val=="next" || self.state.val=="prev"){
            self.props.saveFormData("networkInfo");
            self.setState({formData:e.formData,val:""})

          }else{
            self.setState({formData:e.formData})

          }
        });  },
    handleConfirm: function(data) {
        if (this.state.val == "saveAndExit") {
            this.props.setPageActive("homePage", "next", data, "verification");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
        } else {
            this.props.setPageActive("additonalInfo", "next", data, "verification");
        }
    },
    render: function() {
        return (
            <div id="depFlavour">
                <FormScale schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}></FormScale>
                <div className="net">
                    <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        var bodyWidth = $('body').width();
        $('.contentFooter').css('width', bodyWidth - 300);
    },
    saveAndExit: function() {
        this.state.val = "saveAndExit";
        $("#depFlavour button").click();
        //this.setState({val: "saveAndExit"});
    },
    moveNext: function() {
      this.setState({"val":"next"}) ;
        $("#depFlavour button[type='submit']").click();
    }
});
module.exports = DeployementFlavour;
