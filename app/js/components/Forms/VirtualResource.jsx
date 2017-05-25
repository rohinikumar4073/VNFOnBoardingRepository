var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

var FormVR = Form.default;
var List = React.createClass({
    render: function() {

        var className = this.props.data.isActive
            ? "active"
            : "";
        return (

            <li id={this.props.data.name + "-tab"} role="presentation" className={className}>

                <a aria-controls={this.props.data.name} href={"#" + this.props.data.name} onClick={this.props.moveTheData.bind(this, this.props.data.name)} role="tab" data-toggle="tab">
                    {this.props.data.name}
                </a>
            </li>

        )
    }
});
var nextPage = "";
var FormTabs = React.createClass({
    getInitialState: function() {
        return {statusActive: "general"}
    },
    onSubmit: function(e) {
        this.props.saveSubData(e.schema.name, this.props.data.name, e.formData);
    },
    handleConfirm: function(data) {
        var formData = {};
        this.props.moveNext(data, this.props.data.name);
    },
    moveNextSection: function(data) {
        this.clickTheButton();
    },
    clickTheButton: function() {
        switch (this.state.statusActive) {
            case "general":
                $("#" + this.props.data.name + " #tab1 button").click();
                break;
            case "compute":
                $("#" + this.props.data.name + " #tab3 button").click();
                break;
            case "network":
                $("#" + this.props.data.name + " #tab2 button").click();
                break;
            case "misc":
                $("#" + this.props.data.name + " #tab4 button").click();
                break;
            default:
                break;

        }
    },
    pageActive: function(activePage) {
        this.clickTheButton();
        this.setState({"statusActive": activePage});
    },
    render: function() {
        var className = this.props.data.isActive
            ? "tab-pane active"
            : "tab-pane ";
var formData={};
        return (

            <div role="tabpanel" className={className} id={this.props.data.name} aria-labelledby={this.props.data.name + "-tab"}>
                <ul className="nav nav-tabs" role="tablist">
                    <li id="tab1-tab" role="presentation" className={this.state.statusActive == "general"
                        ? "active"
                        : ""} >
                        <a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this,"general")}>
                            General
                        </a>
                    </li>
                    <li id="tab2-tab" role="presentation" className={this.state.statusActive == "network"
                        ? "active"
                        : ""}>
                        <a href="#tab2" aria-controls="tab2" role="tab"  onClick={this.pageActive.bind(this,"network")} data-toggle="tab">
                            Network
                        </a>
                    </li>
                    <li id="tab3-tab" role="presentation"  className={this.state.statusActive == "compute"
                        ? "active"
                        : ""}>
                        <a href="#tab3" aria-controls="tab3"   onClick={this.pageActive.bind(this,"compute")} role="tab" data-toggle="tab">
                            Compute
                        </a>
                    </li>
                   <li id="tab4-tab" role="presentation" className={this.state.statusActive == "misc" ? "active" : ""}>
                            <a href="#tab4" aria-controls="tab4" role="tab" data-toggle="tab"  onClick=
                              {this.pageActive.bind(this,"misc")} >
                              Miscellaneous
                            </a>
                        </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className={this.state.statusActive == "general"
                        ? "tab-pane active"
                        : "tab-pane"} id="tab1" aria-labelledby="tab1-tab">
                        <FormVR schema={schema1} uiSchema={uiSchema1} formData={this.props.formData["general"]} onSubmit={this.onSubmit}></FormVR>

                    </div>
                    <div role="tabpanel" className={this.state.statusActive == "network"
                        ? "tab-pane active"
                        : "tab-pane"} id="tab2" aria-labelledby="tab2-tab">
                        <FormVR schema={schema2} uiSchema={uiSchema} formData={this.props.formData["network"]} onSubmit={this.onSubmit}></FormVR>

                    </div>
                    <div role="tabpanel" className={this.state.statusActive == "compute"
                        ? "tab-pane active"
                        : "tab-pane"} id="tab3" aria-labelledby="tab3-tab">
                        <FormVR schema={schema3} uiSchema={uischema3} formData={this.props.formData["compute"]} onSubmit={this.onSubmit}></FormVR>

                    </div>
                      <div role="tabpanel" className={this.state.statusActive == "misc" ? "tab-pane active" : "tab-pane"} id="tab4" aria-labelledby="tab4-tab">
                            <FormVR schema={schema4} uiSchema={uischema4} formData={this.props.formData["misc"]} onSubmit={this.onSubmit}></FormVR>

                        </div>
                      </div>

            </div>

        )
    }
})
var schema1 = {
    "title": "VNFC",
    "name":"general",
    "type": "object",
    "properties": {
        "description": {
            "type": "string",
            "title": "Description"
        },
        "swImageDescriptor": {
            "type": "object",
            "title": "Software Image Details",
            "properties": {
                "checksum": {
                    "type": "string",
                    "title": "Checksum"
                },
                "containerFormat": {
                    "type": "string",
                    "title": "VNF Container Format"
                },
                "diskFormat": {
                    "type": "string",
                    "title": "VNF software image format"
                },
                "minDisk": {
                    "type": "string",
                    "title": "Minimum Primary VM block disk space for image required in GB"
                },
                "minRam": {
                    "type": "string",
                    "title": "Minimum memory in MB  required for this image to run"
                },
                "swImage": {
                    "type": "string",
                    "title": "Size of the image in GB"
                },
                "operatingSystem": {
                    "type": "string",
                    "title": "Operating System"
                },
                "supportedVirtualizationEnvironment": {
                    "type": "string",
                    "title": "Supported Virtualization Environment"
                },
                "License Information": {
                    "type": "object",
                    "title": "License",
                    "properties": {
                        "licenseData": {
                            "type": "string",
                            "title": "Product Activation key"
                        },
                        "licenseDateValidity": {
                            "type": "string",
                            "format": "date",
                            "title": "License Date Validity"
                        },
                        "licenseInstanceValidity": {
                            "type": "string",
                            "format": "date",
                            "title": "License Instance Validity"
                        },
                        "licenseAdditionalParams": {
                            "type": "string",
                            "title": "License Additional Details"
                        }
                    }
                }
            }
        }
    }
};
var schema2 = {
    "name": "network",
"title":"Network Details",
    "type": "object",
    "properties": {
        "internalCpd": {
            "title": "Internal Connection Point",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                            "id": {
                                "type": "string",
                                "title": "ID / Name"
                            },
                            "cpRole": {
                                "type": "string",
                                "title": "Type of port"
                            },
                            "layerProtocol": {
                                "type": "string",
                                "title": "Layer Port - Identifies which protocol the CP uses for connectivity purposes"
                            },
                            "internalVld": {
                                "type": "string",
                                "title": "Internal Virtual Link Descriptor - Reference of a network ID in VLD"
                            },
                            "bitRateRequirement": {
                                "type": "string",
                                "title": "Bit Rate Requirement"
                            },
                            "addressData": {
                              "title":"Address Mappings",
                                "type": "object",
                                "properties": {
                                    "addressType": {
                                        "type": "string",
                                        "title": "Address Type (L2 or L3)",
                                        "enum":["L2","L3"]
                                    },
                                    "l2AddressData": {
                                        "type": "object",
                                        "title":"L2 Address Details",
                                        "properties": {
                                            "MacAddress": {
                                                "type": "string",
                                                "title": "MAC address of the port"
                                            },
                                            "VLAN": {
                                                "type": "integer",
                                                "title": "VLAN ID of the port"
                                            },
                                            "VNID": {
                                                "type": "integer",
                                                "title": "Virtual Network ID of the port"
                                            }
                                        }
                                    },
                                    "l3AddressData": {
                                      "title":"L3 Address Details",
                                        "type": "object",
                                        "properties": {
                                            "ipAddressAssignment": {
                                                "type": "boolean",
                                                "title": "Specify if the address assignment is the responsibility of management and orchestration function or not. NOTE:  If it is set to True, it is the management and orchestration function responsibility. "
                                            },
                                            "floatingIPActivated": {
                                                "type": "boolean",
                                                "title": "Floating IP activated?"
                                            },
                                            "ipAddressType": {
                                                "type": "string",
                                                "title": "IP Address Type (IPv4 or IPv6)",
                                                "enum":["IPv4","IPv6"]
                                            },
                                            "numberOfIPaddress": {
                                                "type": "integer",
                                                "title": "Number of IP addresses"
                                            }
                                        }
                                    }
                                }
                            }



                }
            }
        },
        "NIC Capability": {
            "type": "string",
            "title": "NIC Capablity"
        }

    }
};

var schema3 = {
    "name": "compute",
    "title":"Compute Details",
    "type": "object",
    "properties": {
        "requestAdditionalCapabilities": {
          "title":"Additional Capability Details",
            "type": "object",
            "properties": {
                "requestedAditionalCapabilityName": {
                    "type": "string",
                    "title": "Capablity Name"
                },
                "supportMandatory": {
                    "type": "boolean",
                    "title": "Support Mandatory"
                },
                "minRequestedAdditionalCapabilityVersion": {
                    "type": "string",
                    "title": "Minimum version required for the capability"
                },
                "preferredRequestedAdditionalCapabilityVersion": {
                    "type": "string",
                    "title": "Preferred version for the capability"
                },
                "targetPerformanceParameters": {
                    "type": "string",
                    "title": "Targeted Performance Parameters"
                }
            }
        },
        "virtualMemory": {
            "type": "object",
            "title": "Virtual Memory Details",
            "properties": {

                "virtualMemSize": {
                    "type": "integer",
                    "title": "Virtual Memory Size"
                },
                "virtualMemOverSubscriptionPolicy": {
                    "type": "boolean",
                    "title": "Subscription Policy"
                },
                "memoryPageSize": {
                    "type": "integer",
                    "title": "Huge page size"
                }
            }
        },
        "virtualCpu": {
          "title":"Virtual CPU Details",
                "type": "object",
                "properties": {
                  "cpuArchitecture": {
                    "type": "string",
                    "title": "CPU architecture"
                  },
                  "numVirtualCpu": {
                    "type": "integer",
                    "title": "Number of vCPUs"
                  }, "virtualCpuclock": {
                    "type": "integer",
                    "title": "Virtual CPU Clock"
                  },
              "virtualCpuOversubscriptionPolicy":{
                "type": "integer",
                "title": "Virtual CPU Oversubscription Policy"
              } ,
              "virtualCpuPinning": {
                "title":"Virtual CPU Pinning",
                "type":"object",
                "properties":{
                  "cpuPolicy": {
                    "type":"string",
                    "title":"CPU Policy"
                  },
                  "cpuPinningPolicy": {
                    "type":"string",
                    "title":"CPU Pinning Policy"
                  },
                  "cpuPinningMap": {
                    "type":"string",
                    "title":"CPU Pinning Map"
                  }
                }

              }
                }
              }
    }
}
var schema4 = {
  "name":"misc",
  "type":"object",
  "properties":{
    "virtualStorageDescriptor":{
    "title":"VNF Storage Details",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "Cinder Volume Name"
      },
      "typeOfStorage": {
        "type": "string",
        "title": "Storage type"
      },
      "sizeOfStorage": {
        "type": "integer",
        "title": "Storage size in GB"
      },
      "rdmaEnabled": {
        "type": "boolean",
        "title": "Does storage support RDMA"
      },
      "swImageDescriptor": {
        "type": "string",
       "title": "Base file image"
      }
    }
  },"bootOrder":{
      "title":"Define boot order of Virtual Storage",
      "type":"string"
  }
}

};

const schema = {
    "type": "object",
    "properties": {
        "table1": {
            "type": "object",
            "title": "VM Details",
            "properties": {
                "imagename": {
                    "type": "string",
                    "title": "VM image file name"
                },
                "softwareimage": {
                    "type": "string",
                    "title": "VNF Software Image Format"
                },
                "vcpusreq": {
                    "type": "string",
                    "title": "Number of vCPUs required"
                },
                "memoryamount": {
                    "type": "string",
                    "title": "Amount of memory required in MB"
                },
                "blockdiskspace": {
                    "type": "string",
                    "title": "Amount of block disk space for primary VM disk image required in GB and required I/O-ops/sec"
                },
                "cindervolume": {
                    "type": "string",
                    "title": "Any requirement for Cinder volume?"
                },
                "addblockstorage": {
                    "type": "array",
                    "title": "Describe additional block storage (volume) requirements for the constituent VM:",
                    "items": [
                        {
                            "title": "Name of volume",
                            "type": "string"
                        }, {
                            "title": "Base file image name/type",
                            "type": "string"
                        }, {
                            "title": "Size in GB",
                            "type": "number"
                        }, {
                            "title": "Required IO-ops/second",
                            "type": "string"
                        }, {
                            "title": "Volume driver type: iSCSI, NFS, ZFS, FiberChannel, etc",
                            "type": "string"
                        }, {
                            "title": "Device bus (virtio, ide, usb, etc)",
                            "type": "string"
                        }, {
                            "title": "Device type (disk, cdrom, etc)",
                            "type": "string"
                        }, {
                            "title": "Any other requirements / assumptions?",
                            "type": "string"
                        }
                    ]
                },
                "vmflavorreq": {
                    "type": "string",
                    "default": "Default name",
                    "title": "Is a specific VM flavor required? If yes, what is the name, and what characteristics are associated with the VMs? (Refer to attached VCP Requirements document)"
                },
                "orderingdependencies": {
                    "type": "boolean",
                    "title": "If more than one VM, are there startup ordering dependencies? (Yes/No)"
                },
                "odsteps": {
                    "type": "string",
                    "default": "Default name",
                    "title": "If there are startup ordering dependencies, explain the steps:"
                }
            }
        },
        "table2": {}
    }
};
var uiSchema1 = {
    "orderingdependencies": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    }
};
var uischema4 = {
    "provisionsec": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    }

};
var uischema3 = {

    "cloudinti": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    },
    "configdrive": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    },
    "customconfig": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    },
    "metadatasupport": {
        "ui:widget": "radio",
        "ui:options": {
            "inline": true
        }
    },
    "detailsofctm": {
        "ui:widget": "textarea"
    },
    "osnovaboot": {
        "ui:widget": "textarea"
    },
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
    },
    "sshenable": {
        "ui:widget": "textarea"
    }
};
const uiSchema = {
    "table2": {
        "cloudinti": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "configdrive": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "customconfig": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "metadatasupport": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        },
        "detailsofctm": {
            "ui:widget": "textarea"
        },
        "osnovaboot": {
            "ui:widget": "textarea"
        },
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
        },
        "sshenable": {
            "ui:widget": "textarea"
        },
        "sshnotenable": {
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
        },
        "constituentvm": {
            "provisionsec": {
                "ui:widget": "radio",
                "ui:options": {
                    "inline": true
                }
            }
        }
    },
    "table1": {
        "addblockstorage": {
            "items": []
        },
        "orderingdependencies": {
            "ui:widget": "radio",
            "ui:options": {
                "inline": true
            }
        }
    }
};
const formData = {
    "countvms": "",
    "table1": {
        "imagename": "Image name",
        "softwareimage": "Software Image name",
        "vcpusreq": "",
        "memoryamount": "",
        "blockdiskspace": "",
        "cindervolume": "",
        "addblockstorage": [
            "volume",
            "name/type",
            1,
            "IO-ops/second",
            "iSCSI",
            "virtio",
            "disk",
            "hello world"
        ],
        "vmflavorreq": "m1.small",
        "orderingdependencies": true,
        "odsteps": ""
    },
    "listOfstrings": [
        "foo", "bar"
    ],
    "multipleChoicesList": [
        "foo", "bar"
    ],
    "fixedItemsList": [
        "Some text", true, 123
    ],
    "nestedList": [
        [
            "lorem", "ipsum"
        ],
        ["dolor"]
    ],
    "unorderable": [
        "one", "two"
    ],
    "unremovable": [
        "one", "two"
    ],
    "noToolbar": [
        "one", "two"
    ],
    "fixedNoToolbar": [42, true, "additional item one", "additional item two"]
}
var isFromTabClick = false;
var elem = "";
var VirtualResource = React.createClass({
    getInitialState: function() {
        return ({
            noOfVMS: [],
            formData: {},
            currentIndex: 0,
            val:"",
            tabData: {
                isFromTabClick: false
            }
        });
    },
    onSubmit: function(e) {
        this.handleConfirm(e.formData)
    },
    setVMS: function(data) {
        var noOfVMS = []
        for (var i = 0; i < data; i++) {
            var j = i + 1;
            var isActive = false;
            if (j == 1) {
                isActive = true;
            }
            var formData={}
            if (this.props.formData && this.props.formData.vnfInfo && this.props.formData.vnfInfo.vmInfo && this.props.formData.vnfInfo.vmInfo["VNFC_" + j]) {
                formData = this.props.formData.vnfInfo.vmInfo["VNFC_" + j];
            }
            noOfVMS.push({
                name: "VNFC_" + j,
                isActive: isActive,
                formData: formData
            });
        }
        this.setState({noOfVMS: noOfVMS, currentIndex: 1})
    },
    render: function() {
        var moveNext = this.moveNext;
        var moveTheData = this.moveTheData;
        var saveSubData = this.saveSubData;
        var self=this;
        return (
            <div id="virRes">

                <ul className="nav nav-tabs" role="tablist">
                    {this.state.noOfVMS.map((vm) => <List moveTheData={moveTheData} data={vm}></List>)}
                </ul>
                <div className="tab-content">
                    {this.state.noOfVMS.map((vm) => <FormTabs data={vm} ref={vm.name} moveNext={moveNext}
                    formData={vm.formData} saveSubData={saveSubData}></FormTabs>)}
                </div>
                <div className="net">
                    {/*<a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.movePrevious}>Previous</a>*/}
                    <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.clickedTheButton.bind(this, "vnfInfo")}>Previous</a>
                    {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                    <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.clickedTheButton.bind(this, "vmManager")}>Next Page</a>
                    <a href="#" className="btn  btn-danger btn-sm nextBtn" disabled={this.state.currentIndex == 1} onClick={this.copyFromPrevForm}>Copy from Previous VM</a>

                </div>
            </div>
        );
    },
    copyFromPrevForm: function() {
        var selcedElem = "VNFC_" + (this.state.currentIndex - 1);
        var data = this.props.formData[selcedElem];
        this.state.noOfVMS[this.state.currentIndex - 1].formData = data;
        this.setState({noOfVMS: this.state.noOfVMS})
    },
    saveAndExit: function() {
        this.clickedTheButton("homePage");
        $(".leftMain").addClass("totalLeftScreenMode");
        $(".contentMain").addClass("totalRightScreenMode");

    },
    movePrevious: function() {
        if (this.state.currentIndex === 1) {
            this.props.setPageActive("vnfInfo", "prev")

        } else {

            this.state.noOfVMS.forEach(function(v, i) {
                if (i == (this.state.currentIndex - 2)) {
                    v.isActive = true;
                } else {
                    v.isActive = false;
                }

            }.bind(this));
            this.setState({
                noOfVMS: this.state.noOfVMS,
                currentIndex: (this.state.currentIndex - 1)
            });

        }

    },
    clickedTheButton: function(nxtPage) {

        var selcedElem = "VNFC_" + this.state.currentIndex;
        var self = this;
        nextPage = nxtPage;
        this.refs[selcedElem].moveNextSection();

        self.state.noOfVMS.forEach(function(v, i) {
            if (i == (self.state.currentIndex)) {
                v.isActive = true;
            } else {
                v.isActive = false;
            }
            var formData = {};
            if (this.props.formData && this.props.formData[v.name]) {
                formData = this.props.formData[v.name];
            }
            v.formData = formData;
        }.bind(self));
        self.setState({
            noOfVMS: self.state.noOfVMS,
            currentIndex: (self.state.currentIndex + 1),
            "val":"next"
        });

    },
    moveTheData: function(currentElem) {
        isFromTabClick = false;
        elem = currentElem;

        var selcedElem = "VNFC_" + this.state.currentIndex;
        this.refs[selcedElem].moveNextSection();
        var self = this;
        var index = 1;
        self.state.noOfVMS.forEach(function(v, i) {
            if (v.name == (elem)) {
                v.isActive = true;
                index = i;
            } else {
                v.isActive = false;
            }
            var formData = {};
            if (this.props.formData && this.props.formData[v.name]) {
                formData = this.props.formData[v.name];
            }
            v.formData = formData;
        }.bind(self));
        self.setState({
            noOfVMS: self.state.noOfVMS,
            currentIndex: (index + 1)
        });
        isFromTabClick = false;
        elem = "";

    },

    saveSubData: function(childSec, parentSec, data) {

          var formData=this.props.formData;
          if(!formData.vnfInfo){
              formData["vnfInfo"]={};
            }
          if(!formData["vnfInfo"]["vmInfo"]){
            formData["vnfInfo"]["vmInfo"]={}
          }
          var self=this;
          if (!formData["vnfInfo"]["vmInfo"][parentSec]) {
              formData["vnfInfo"]["vmInfo"][parentSec] = {}
          }
          this.props.formData["vnfInfo"]["vmInfo"][parentSec][childSec] = data;

          DataService.saveandUpdateData(formData,function(){
            if(self.state.val=="next" || self.state.val=="prev"){
              self.props.saveFormData("networkInfo");
              self.setState({data:e.formData,val:""})

            }else{
              self.setState({formData:e.formData})

            }
          });




    },
    moveNext: function(data, name) {
        if (!this.props.formData) {
            this.props.formData = {};
        }

        this.props.formData[name] = data;
        var nextPage = ""
        if ((this.state.currentIndex === this.props.vnfInfo.countvms) && !isFromTabClick) {
            nextPage = "vmManager"
        }
        this.props.saveFormData(this.props.formData, "vmInfo", "vmInfo", this, nextPage, function(self) {
            if (isFromTabClick) {
                var index = 1;
                self.state.noOfVMS.forEach(function(v, i) {
                    if (v.name == (elem)) {
                        v.isActive = true;
                        index = i;
                    } else {
                        v.isActive = false;
                    }
                    var formData = {};
                    if (this.props.formData && this.props.formData[v.name]) {
                        formData = this.props.formData[v.name];
                    }
                    v.formData = formData;
                }.bind(self));
                self.setState({
                    noOfVMS: self.state.noOfVMS,
                    currentIndex: (index + 1)
                });
                isFromTabClick = false;
                elem = "";
            } else {
                self.state.noOfVMS.forEach(function(v, i) {
                    if (i == (self.state.currentIndex)) {
                        v.isActive = true;
                    } else {
                        v.isActive = false;
                    }
                    var formData = {};
                    if (this.props.formData && this.props.formData.vmInfo && this.props.formData.vmInfo[v.name]) {
                        formData = this.props.formData.vmInfo[v.name];
                    }
                    v.formData = formData;
                }.bind(self));
                self.setState({
                    noOfVMS: self.state.noOfVMS,
                    currentIndex: (self.state.currentIndex + 1)
                });
            }

        });

    },
    componentDidMount: function() {
    },
    loadData:function(){

        if (this.props.formData.vnfInfo && this.props.formData.vnfInfo.generalInfo
           && this.props.formData.vnfInfo.generalInfo.countvms){
              this.setVMS(this.props.formData.vnfInfo.generalInfo.countvms);
            }


    }
});

module.exports = VirtualResource;
