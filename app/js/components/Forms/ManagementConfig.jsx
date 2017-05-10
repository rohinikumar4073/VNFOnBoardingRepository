var React =require("react");
var $ =require("jquery");
var Form =require("./../../thirdParty/react-jsonschema-form.js");

    var FormConfig = Form.default;

    const schema = {
        "type": "object",
        "name":"mgmt",
        "properties": {
            "countvms": {
                "title": "How many VMs are in the VNF?",
                "type": "string"
            },
            "table2": {
                "type": "object",
                "title": "For one VM Table2",
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
                    },
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
                    },
                    "constituentvm": {
                        "type": "object",
                        "title": "CONSTITUENT VM KPI PARAMETERS (OPTIONAL)",
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
                    }
                }
            }
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
        }
    };

    const formData = {
        "countvms": "one",
        "table2": {
            "cloudinti": true,
            "configdrive": true,
            "customconfig": true,
            "metadatasupport": false,
            "configparameters": "Hello world!",
            "osnovaboot": "Hello world!",
            "nativegui": true,
            "usegui": "Hello world!",
            "sshmanagement": false,
            "sshenable": "Hello world!",
            "sshnotenable": "Hello world!",
            "netconfmgmt": true,
            "netconfenable": "Hello world!",
            "netconfnotenable": "Hello world!",
            "acceptpostresource": "Hello world!",
            "constituentvm": {
                "protocolport": "Hello world!",
                "usernamepwd": "Hello world!",
                "endpointurl": "Hello world!",
                "dispalyname": "Hello world!",
                "shortdes": "Hello world!",
                "accessmethod": "Hello world!",
                "amparameters": "Hello world!",
                "monitoringparameter": 11,
                "valuerange": "Hello world!",
                "displayunits": "Hello world!",
                "displaymonparams": "Hello world!",
                "minmaxfrequency": "Hello world!",
                "provisionsec": true
            }
        }
    }

    var ManagementInfo = React.createClass({

        getInitialState: function() {

            return ({formData: this.props.formData, val: ""});
        },

        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },

        handleConfirm: function(data) {
            if (this.state.val == "saveAndExit") {
                this.props.setPageActive("homePage", "next", data);
                $(".leftMain").addClass("totalLeftScreenMode");
                $(".contentMain").addClass("totalRightScreenMode");
            } else {
                this.props.setPageActive(7, "next", data);
            }

        },
        render: function() {
            return (
                <div id="mgmtConfig">
                    <h2>Management & Configuration Requirements</h2>
                    <FormConfig schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} formData={this.state.formData}></FormConfig>
                    <div className="net">
                      {/*  <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this, 5, "prev")}>Previous</a>*/}
                      {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
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
            $("#mgmtConfig button").click();
            //this.setState({val: "saveAndExit"});

        },
        moveNext: function() {
            this.state.val = "";
            $("#mgmtConfig button").click();

        }
    });


module.exports= ManagementInfo;
