var React =require("react");
var $ =require("jquery");
var Form =require("./../../thirdParty/react-jsonschema-form.js");
var config=require("./../../properties/config.js");
var DataService=require("./../../services/DataService.js");
var axios=require("axios");
var ProductForm = Form.default;
var closeVar = false;
const schema = {
  "type": "object",
  "properties": {
    "productinfo": {
      "type": "object",
      "title": "Product Information",
      "properties": {
        "vnfproductname": {
          "type": "string",
          "title": "Product Name"
        },
        "version": {
          "type": "string",
          "title": "Product version"
        },
        "highleveldes": {
          "type": "string",
          "title": "Provide a high level description of the product"
        }
        /*,
        "networkservice":{
          "type": "string",
          "title": "How is the VNF typically used as a part of a network service?"
        }*/
      }
    },
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
          "title": "Company Technical Contact"
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
},
"productinfo":{
  "vnfproductname":{
    "classNames": "col-sm-12"

  },  "highleveldes":{
    "ui:widget": "textarea",
      "classNames": "col-sm-12"

    },  "networkservice":{
        "classNames": "col-sm-12"

      }, "version":{
          "classNames": "col-sm-12"

        }
}
};


 const formData = {
};

    var ProductInfo = React.createClass({

        getInitialState:function(){
          var data ={}
          if(this.props.formData["generalInfo"]){
            data=this.props.formData["generalInfo"];
          }
            return({
              vmArr:[],
              formData:data,
               noOfVms:0,
               val: ""
            }
            );
        },
        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.vnfInfo){
                formData["vnfInfo"]={};
              }
            formData["vnfInfo"]["generalInfo"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
                self.props.saveFormData("networkInfo");
                self.setState({data:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });
        },
        handleConfirm: function(data) {
          var formData=this.props.formData;
          if(!formData){
              formData["generalInfo"]={};
            }
          formData["generalInfo"]=data;
          var self=this;
          DataService.saveandUpdateData(formData,function(){
            if(self.state.val=="next" || self.state.val=="prev"){
              self.props.saveFormData("networkInfo");
              self.setState({data:e.formData,val:""})

            }else{
              self.setState({formData:e.formData})

            }
          })
          },

        render: function() {
            return (

              <div id="proInfo">
                    <ProductForm schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}>
                      </ProductForm>
                      <div className="net">
                          {/* <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"networkInfo","prev")}>Previous</a>*/}
                          {/*    <a href="#" id="save" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                          <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>

                      </div>

                      </div>

            );
        },

        moveNext:function(){
          this.setState({"val":"next"}) ;
          $("#proInfo button").click();
        },
        movePrev:function(){
          this.setState({"val":"prev"}) ;
          $("#proInfo button").click();
        },
        saveAndExit: function(){
          this.state.val = "saveAndExit";
            $("#proInfo button").click();
          //this.setState({val: "saveAndExit"});

        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
            $(".leftMain").removeClass("totalLeftScreenMode")
            $(".rightPanel").removeClass("totalRightScreenMode")
         }
    });
    module.exports= ProductInfo;
