var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");

var FormOS = Form.default;

const schema = {
    "type": "object",
    "properties": {
        "openstackversion": {
            "type": "boolean",
            "title": "Has the VNF been booted under OpenStack version described in VCP Requirements Document?"
        },
        "kvmprescribed": {
            "type": "boolean",
            "title": "Has the VNF been booted under KVM prescribed in VCP Requirements document?"
        },
        "vnf-m": {
            "type": "object",
            "title": "If VNF require VNF-M",
            "properties": {
                "vfmrequired": {
                    "type": "boolean",
                    "title": "Does the VNF require its own specific VNF-M?"
                },
                "vfm-yes": {
                    "type": "array",
                    "title": "If VNF requires ",
                    "items": [
                        {
                            "title": "VNF-M have a MANO compliant Or-Vnfm interface?",
                            "type": "boolean",
                            "default": false
                        }, {
                            "title": "What format is the Or-Vnfm interface (REST, etc.)",
                            "type": "string"
                        }, {
                            "title": "Which resource allocation model does the specific VNFM use: NFVO allocation or VNFM allocation?",
                            "type": "string"
                        }, {
                            "title": "Is VNF-M complaint with all requirements in the VNF-M section of VCP Requirement Document? If no, describe all non-complaint requirements",
                            "type": "string"
                        }, {
                            "title": "Can VNF-M instantiate VNF 5 directly? If yes, is it supported via REST API?",
                            "type": "string"
                        }, {
                            "title": "Does VNF-M support upgrade to VNF? If yes, describe lifecycle involved in the upgrade",
                            "type": "string"
                        }, {
                            "title": "Does VNF-M support downgrades to VNF? If yes, describe lifecycle involved in the downgrade",
                            "type": "string"
                        }, {
                            "title": "Does VNF-M require admin access to the VIM? (Yes/No)",
                            "type": "boolean",
                            "default": false
                        }, {
                            "title": "How to provide OpenStack credentials to VNF-M, and how does VNF-M securely store the given credentials?",
                            "type": "string"
                        }
                    ]
                }
            }
        }
    }
};

const uiSchema = {
    "openstackversion": {
        "ui:widget": "radio"
    },
    "kvmprescribed": {
        "ui:widget": "radio"
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

const formData = {
    "companyname": "Test1",
    "companytechnicalcontact": {
        "email": "keerthi@gmail.com",
        "phone": "3434343434"
    },
    "vnfproductname": "Test1",
    "highleveldes": "Hello world",
    "networkservice": "Hello world",
    "etsicompliant": true,
    "datamodellanguage": "Hello world",
    "openstackversion": true,
    "kvmprescribed": false,
    "vnf-m": {
        "vfmrequired": true,
        "vfm-yes": [
            true,
            "Hello world",
            "Hello world",
            "Hello world",
            "Hello world",
            "Hello world",
            null,
            false,
            null
        ]
    }
}
var Orchestration = React.createClass({
    getInitialState: function() {
        return ({formData: this.props.formData, val: ""});
    },
    onSubmit: function(e) {
        this.handleConfirm(e.formData)
    },
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
    },
    render: function() {

        return (
            <div id="orcReq">
                <h2>Orchestration Requirements</h2>
                <FormOS schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} formData={this.state.formData}></FormOS>
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
        this.state.val = "";
        $("#orcReq button").click();
    },
    movePrev: function() {
        this.state.val = "prev";
        $("#orcReq button").click();
    }
});
module.exports = Orchestration;
