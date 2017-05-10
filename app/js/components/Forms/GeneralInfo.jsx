var React =require("react");
var $ =require("jquery");
var Form =require("./../../thirdParty/react-jsonschema-form.js");

    var FormGeneral = Form.default;

    const schema = {
        "type": "object",
        "properties": {
            "companytechnicalcontact": {
                "type": "object",
                "title": "Contact Information",
                "required": ["companyname"],
                "properties": {
                    "companyname": {
                        "type": "string",
                        "title": "Company name"
                    },
                    "technicalcontact": {
                        "type": "string",
                        "title": "Company technical contact name"
                    },
                    "email": {
                        "title": "Email",
                        "type": "string",
                        "format": "email"
                    },
                    "phone": {
                        "title": "Phone",
                        "type": "number"
                    }
                }
            },
            "productinfo": {
                "type": "object",
                "title": "Product Information",
                "required": ["vnfproductname"],

                "properties": {
                    "vnfproductname": {
                        "type": "string",
                        "title": "VNF product name"
                    },
                    "highleveldes": {
                        "type": "string",
                        "title": "Provide a high-level description of the function of the VNF:"
                    },
                    "networkservice": {
                        "type": "string",
                        "title": "How is the VNF typically used as part of a network service?"
                    }
                }
            }

        }
    };

    const uiSchema = {
        "productinfo": {
            "highleveldes": {
                "ui:widget": "textarea"
            },
            "networkservice": {
                "ui:widget": "textarea"
            }
        },
        "commonInfo": {

            "etsicompliant": {
                "ui:widget": "radio"
            },
            "sanitytest": {
                "ui:widget": "textarea"
            },
            "adminconfigmanual": {
                "ui:widget": "textarea"
            },
            "licenswork": {
                "ui:widget": "textarea"
            },
            "publicinternet": {
                "ui:widget": "textarea"
            },
            "specificitems": {
                "ui:widget": "textarea"
            }

        }

    };

    const formData = {
        "companytechnicalcontact": {
            "companyname": "Company name",
            "technicalcontact": "Company technical contact name",
            "email": "Test@gmail.com",
            "phone": 9876543212
        },
        "vnfproductname": "VNF product name",
        "highleveldes": "Provide a high-level description of the function of the VNF:",
        "networkservice": "Provide a high-level description of the function of the VNF:"
    };

    var GeneralInfo = React.createClass({

        getInitialState: function() {
          $(".leftMain").addClass("totalLeftScreenMode");
          $(".contentMain").addClass("totalRightScreenMode");
            return ({formData: this.props.formData, val: ""});
        },

        onSubmit: function(e) {
            this.handleConfirm(e.formData);

        },

        handleConfirm: function(data) {
          if(true){
            if(this.state.val == "saveAndExit"){
              $(".leftMain").addClass("totalLeftScreenMode");
              $(".contentMain").addClass("totalRightScreenMode");
              this.props.setPageActive("homePage", "next", data,"generalInfo");


              //$(".leftMain").addClass("totalRightScreenMode")
            }
            else{
              this.props.setPageActive("homePage", "next", data,"generalInfo");

            }
          }
            else if(this.state.val == "saveAndExit"){
              this.props.setPageActive("package", "next", data,"generalInfo");
              $(".leftMain").addClass("totalLeftScreenMode");
              $(".contentMain").addClass("totalRightScreenMode");
            }
              else{
                this.props.setPageActive("networkInfo", "next", data,"generalInfo");
                $(".totalRightScreenMode").removeClass("totalRightScreenMode")
                $(".totalLeftScreenMode").removeClass("totalLeftScreenMode")
            }

        },
        render: function() {
            return (
                <div id="vnfInfo">
                    <h2>General Information</h2>
                    <FormGeneral schema={schema} uiSchema={uiSchema} formData={this.state.formData} packageName={this.props.packageName} onSubmit={this.onSubmit}></FormGeneral>
                    <div className="net">
                    {/*    <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>*/}
                        <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>
                    </div>

                </div>

            );
        },
        moveNext: function() {
            $("#vnfInfo button").click();
        },
        saveAndExit: function(){
          this.state.val = "saveAndExit";
            $("#vnfInfo button").click();
          //this.setState({val: "saveAndExit"});

        },
        componentDidMount: function() {
            var bodyWidth = $('body').width();
            $('.contentFooter').css('width', bodyWidth - 300);
        }
    });

    module.exports= GeneralInfo;
