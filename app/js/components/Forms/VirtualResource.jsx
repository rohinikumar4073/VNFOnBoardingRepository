define([
    'react', 'jquery', 'react-jsonschema-form', 'toastr'
], function(React, $, Form, toastr) {
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
            return {statusActive: "generalInfo"}
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
                case "generalInfo":
                    $("#" + this.props.data.name + " #tab1 button").click();break;
                case "management":
                    $("#" + this.props.data.name + " #tab3 button").click();break;
                case "additionalBlock":
                    $("#" + this.props.data.name + " #tab2 button").click();break;
                case "kpiParameters":
                    $("#" + this.props.data.name + " #tab4 button").click();break;
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

            return (

                <div role="tabpanel" className={className} id={this.props.data.name} aria-labelledby={this.props.data.name + "-tab"}>
                    <ul className="nav nav-tabs" role="tablist">
                        <li id="tab1-tab" role="presentation" className={this.state.statusActive == "generalInfo"
                            ? "active"
                            : ""} onClick={this.pageActive.bind(this, "generalInfo")}>
                            <a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">
                                General Info
                            </a>
                        </li>
                        <li id="tab2-tab" role="presentation" onClick={this.pageActive.bind(this, "additionalBlock")} className={this.state.statusActive == "additionalBlock"
                            ? "active"
                            : ""}>
                            <a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">
                                Additional block storage
                            </a>
                        </li>
                        <li id="tab3-tab" role="presentation" onClick={this.pageActive.bind(this, "management")} className={this.state.statusActive == "management"
                            ? "active"
                            : ""}>
                            <a href="#tab3" aria-controls="tab3" role="tab" data-toggle="tab">
                                Management & Configuration Requirements
                            </a>
                        </li>
                        {/*  <li id="tab4-tab" role="presentation" onClick={this.pageActive.bind(this, "kpiParameters")} className={this.state.statusActive == "kpiParameters" ? "active" : ""}>
                            <a href="#tab4" aria-controls="tab4" role="tab" data-toggle="tab">
                                KPI Parameters
                            </a>
                        </li> */}
                    </ul>

                    <div className="tab-content">
                        <div role="tabpanel" className={this.state.statusActive == "generalInfo"
                            ? "tab-pane active"
                            : "tab-pane"} id="tab1" aria-labelledby="tab1-tab">
                            <FormVR schema={schema1} uiSchema={uiSchema1} formData={this.props.data.formData["generalInfo"]} onSubmit={this.onSubmit}></FormVR>

                        </div>
                        <div role="tabpanel" className={this.state.statusActive == "additionalBlock"
                            ? "tab-pane active"
                            : "tab-pane"} id="tab2" aria-labelledby="tab2-tab">
                            <FormVR schema={schema2} uiSchema={uiSchema} formData={this.props.data.formData["additionalBlock"]} onSubmit={this.onSubmit}></FormVR>

                        </div>
                        <div role="tabpanel" className={this.state.statusActive == "management"
                            ? "tab-pane active"
                            : "tab-pane"} id="tab3" aria-labelledby="tab3-tab">
                            <FormVR schema={schema3} uiSchema={uischema3} formData={this.props.data.formData["management"]} onSubmit={this.onSubmit}></FormVR>

                        </div>
                        {/*  <div role="tabpanel" className={this.state.statusActive == "kpiParameters" ? "tab-pane active" : "tab-pane"} id="tab4" aria-labelledby="tab4-tab">
                            <FormVR schema={schema4} uiSchema={uischema4} formData={this.props.data.formData["kpiParameters"]} onSubmit={this.onSubmit}></FormVR>

                        </div> */}
                    </div>

                </div>

            )
        }
    })

    var schema1 = {
        "type": "object",
        "name": "generalInfo",

        "properties": {
            "vmName": {
                "type": "string",
                "title": "VM name"
            },
            "imagename": {
                "type": "string",
                "title": "VM image file name"
            },
            "softwareimage": {
                "type": "string",
                "title": "VM software image format: (iso, qcow, qcow2)",
                "default": "qcow2"
            },
            "vcpusreq": {
                "type": "string",
                "title": "Number of vCPUs required",
                "default": "4"
            },
            "memoryamount": {
                "type": "string",
                "title": "Amount of memory required in GB",
                "default": "8 GB"
            },
            "blockdiskspace": {
                "type": "string",
                "title": "Amount of block disk space for primary VM disk image required in GB and required I/O-ops/sec",
                "default": "80 GB"
            },
            "cindervolume": {
                "type": "string",
                "title": "Any requirement for Cinder volume?"
            },
            "vmflavorreq": {
                "type": "string",

                "title": "Is a specific VM flavor required? If yes, what is the name, and what characteristics are associated with the VMs? (Refer to attached VCP Requirements document)"
            }
        }
    };

    var schema2 = {
        "name": "additionalBlock",

        "type": "object",

        "properties": {
            "nameOfTheVolme": {
                "title": "Name of volume",
                "type": "string"
            },
            "baseFileImage": {
                "title": "Base file image name/type",
                "type": "string"
            },
            "sizeInGB": {
                "title": "Size in GB",
                "type": "number"
            },
            "requiredIO": {
                "title": "Required IO-ops/second",
                "type": "string"
            },
            "volDriver": {
                "title": "Volume driver type: iSCSI, NFS, ZFS, FiberChannel, etc",
                "type": "string"
            },
            "deviceBus": {
                "title": "Device bus (virtio, ide, usb, etc)",
                "type": "string"
            },
            "deviceType": {
                "title": "Device type (disk, cdrom, etc)",
                "type": "string"
            },
            "assumptions": {
                "title": "Any other requirements / assumptions?",
                "type": "string"
            }
        }
    };

    var schema3 = {
        "name": "management",

        "type": "object",

        "properties": {
            "cloudinti": {
                "type": "boolean",
                "title": "Is there support for cloud-init?"
            },
            "configdrive": {
                "type": "boolean",
                "title": "Does VM require config-drive?"
            },
            "customconfig": {
                "type": "boolean",
                "title": "Does VM require passing custom configuration file in config-drive?"
            },
            "metadatasupport": {
                "type": "boolean",
                "title": "Does VM require metadata support?"
            },
            "detailsofctm": {
                "type": "string",
                "title": "Provide details on cloudinit/ configuration templates/metadata required, if any"
            },
            "configparameters": {
                "type": "string",
                "title": "What configuration parameters are required?"
            },
            "osnovaboot": {
                "type": "string",
                "title": "Provide sample OpenStack nova boot command for each VM in the VNF"
            }
        }
    }
    var schema4 = {
        "name": "kpiParameters",

        "type": "object",
        "description": "For monitoring, service assurance, and scaling needs, provide relevant KPI access information.",
        "properties": {
            "protocolport": {
                "type": "string",
                "title": "Protocol and port number:"
            },
            "usernamepwd": {
                "type": "string",
                "title": "Username/password credentials:"
            },
            "endpointurl": {
                "type": "string",
                "title": "Corresponding endpoint URL:"
            },
            "dispalyname": {
                "type": "string",
                "title": "Display name:"
            },
            "shortdes": {
                "type": "string",
                "title": "Short description:"
            },
            "accessmethod": {
                "type": "string",
                "title": "Access method (e.g., JSONPATH, OBJECTPATH):"
            },
            "amparameters": {
                "type": "string",
                "title": "Access method parameters (e.g., ‘json_path’ : ‘$.system.mem_total’):"
            },
            "monitoringparameter": {
                "type": "integer",
                "title": "Value-type of monitoring parameter (string, integer, decimal):"
            },
            "valuerange": {
                "type": "string",
                "title": "Range of possible values:"
            },
            "displayunits": {
                "type": "string",
                "title": "Display units, if applicable (e.g., MB, KB, %, etc.): "
            },
            "displaymonparams": {
                "type": "string",
                "title": "Display widget for monitoring parameter (counter, gauge):"
            },
            "minmaxfrequency": {
                "type": "string",
                "title": "Min/max frequency at which the parameter should be fetched:"
            },
            "provisionsec": {
                "type": "boolean",
                "title": "Any requirement to provision security groups in the cloud?"
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
                        "title": "VM software image format: (iso, qcow, qcow2)"
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

    }
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
    }
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
        "listOfStrings": [
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
    elem = "";
    var VirtualResource = React.createClass({
        getInitialState: function() {
            return ({
                noOfVMS: [],
                formData: this.props.formData,
                currentIndex: 0,
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
                var formData = {};
                if (this.props.formData && this.props.formData["VM_" + j]) {
                    formData = this.props.formData["VM_" + j];
                }
                noOfVMS.push({
                    name: "VM_" + j,
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
            return (
                <div id="virRes">
                    <h2>Virtual Resources Requirements</h2>
                    <ul className="nav nav-tabs" role="tablist">
                        {this.state.noOfVMS.map((vm) => <List moveTheData={moveTheData} data={vm}></List>)}
                    </ul>
                    <div className="tab-content">
                        {this.state.noOfVMS.map((vm) => <FormTabs data={vm} ref={vm.name} moveNext={moveNext} saveSubData={saveSubData}></FormTabs>)}
                    </div>
                    <div className="contentFooter">
                        <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.movePrevious}>Previous</a>
                        <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>
                        <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.clickedTheButton.bind(this, "vmManager")}>Next Page</a>
                        <a href="#" className="btn  btn-danger btn-sm nextBtn" disabled={this.state.currentIndex == 1} onClick={this.copyFromPrevForm}>Copy from Previous VM</a>

                    </div>
                </div>
            );
        },
        copyFromPrevForm: function() {
            var selcedElem = "VM_" + (this.state.currentIndex - 1);
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
            var selcedElem = "VM_" + this.state.currentIndex;
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
                currentIndex: (self.state.currentIndex + 1)
            });

        },
        moveTheData: function(currentElem) {
            isFromTabClick = false;
            elem = currentElem;

            var selcedElem = "VM_" + this.state.currentIndex;
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
            if (!this.props.formData) {
                this.props.formData = {};
            }
            if (!this.props.formData[parentSec]) {
                this.props.formData[parentSec] = {}
            }
            this.props.formData[parentSec][childSec] = data;

            var next = nextPage;
            nextPage = "";
            this.props.saveFormData(this.props.formData, "vmInfo", "vmInfo", this, next, function(self) {

                self.state.noOfVMS.forEach(function(v, i) {

                    var formData = {};
                    if (this.props.formData && this.props.formData[v.name]) {
                        formData = this.props.formData[v.name];
                    }
                    v.formData = formData;
                }.bind(self));
                self.setState({
                    noOfVMS: self.state.noOfVMS,
                    currentIndex: (self.state.currentIndex)
                });

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
                        if (this.props.formData && this.props.formData[v.name]) {
                            formData = this.props.formData[v.name];
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
            var bodyWidth = $('body').width();
            $('.contentFooter').css('width', bodyWidth - 300);
            if (this.props.vnfInfo.vnfBasic && this.props.vnfInfo.vnfBasic.countvms)
                this.setVMS(this.props.vnfInfo.vnfBasic.countvms);

            $(".leftMain").removeClass("totalLeftScreenMode")
            $(".rightPanel").removeClass("totalRightScreenMode")

        }
    });

    return VirtualResource;

});
