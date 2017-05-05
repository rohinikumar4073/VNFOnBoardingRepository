var React =require("react");
var $ =require("jquery");
var Form =require("./../../thirdParty/react-jsonschema-form.js");
var config=require("./../../properties/config.js");
var axios=require("axios");
var NewVnf = Form.default;
var closeVar = false;
const schema = {
  "type": "object",
  "properties": {
    "companytechnicalcontact": {
      "type": "object",
      "title": "Contact Information",
      "properties": {
        "companyname":{
          "type": "string",
          "title": "Company Name"
        },
        "technicalcontact": {
          "type": "string",
          "title": "Company Technical Contact Name"
        },
        "email":{
          "type": "string",
          "title": "Email"
        },
        "phone": {
          "type": "string",
          "title": "Phone"
        }
      }
    },
    "productinfo": {
      "type": "object",
      "title": "Product Information",
      "properties": {
        "vnfproductname": {
          "type": "string",
          "title": "VNF Product"
        },
        "highleveldes": {
          "type": "string",
          "title": "Provide high level description of the function of the VNF"
        },
        "networkservice":{
          "type": "string",
          "title": "How is the VNF typically used as a part of a network service?"
        }
      }
    }
  }
};

const uiSchema = {
  "companytechnicalcontact" : {
  "companyname": {
    "classNames": "col-sm-4"
  },
  "technicalcontact": {
    "classNames": "col-sm-4"
  },

  "email": {
    "classNames": "col-sm-4"
  },
  "phone": {
    "classNames": "col-sm-4"
  }
}
};

 const formData = {
};

    var NewVnfForm = React.createClass({

        getInitialState:function(){
            return({data:{"generalInfo":{}}});
        },
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(fData) {
          debugger;
          var packageName=this.generatePackageName();
          this.state.data.generalInfo=fData;
          var self = this;
          this.ajaxCalltoSetData(self.state.data,packageName,function(response){
            debugger;
            self.props.closePage("close");
          })
        },
        ajaxCalltoSetData:function(data,packageName,callback){
          var savePackageUrl=config.formApi+ "/vnf/"+packageName+"/saveFormData";
          var self=this;
          debugger;
                    axios.post(savePackageUrl, {
                        formData: data
                    }).then(function(response) {
                      self.setState({loaderOn: false});
                      callback(response)
                    }).catch(function(error) {
                      self.setState({loaderOn: false});
                    });
        },
        render: function() {
            return (
              <div className="modal-dialog modal-lg newVnf">
                    <div className={"modal-content " + this.props.className}>
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.handleCancel}>
                                &times;
                            </button>
                            <h3>{this.props.header}</h3>
                        </div>
                        <div className="modal-body">
                            <NewVnf schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={this.onSubmit} onError={errors => {
                                console.log("i am errors" + errors);
                            }} onSubmit={this.onSubmit}>
                                <div>

                                    <button type="submit" className="btn btn-sm btn-primary btn-save" data="Save">Save</button>
                                    <button onClick={this.handleCancel} type="button" className="btn btn-sm btn-default  btn-cancel" data="Cancel">Cancel</button>

                                    <button type="submit" className="btn btn-sm btn-primary" data="Save">Save</button>

                                </div>
                            </NewVnf>
                        </div>
                    </div>
                </div>
            );
        },
        generatePackageName:function(){
          var d = new Date().getTime();
          if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
              d += performance.now(); //use high-precision timer if available
          }
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
              return (c === 'x'
                  ? r
                  : (r & 0x3 | 0x8)).toString(16);
          });
        },
         componentDidMount: function() {

         },
         handleCancel: function(){
           var self = this;
           self.props.closePage("close");
         },
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#verification button").click();
           //this.setState({val: "saveAndExit"});
         },

    });
    module.exports= NewVnfForm;
