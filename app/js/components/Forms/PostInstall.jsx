var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
    var FormPostInstall = Form.default;
    var DataService=require("./../../services/DataService.js")

const schema = {
  "type": "object",
  "properties": {
    "licenswork": {
      "type": "string",
      "title": "Describe how licensing works, if any. (Attach details, such as license server address, key, etc.)"
    },
    "publicinternet": {
      "type": "string",
      "title": "Do any of the interfaces require public internet connectivity, such as access to a licensing server or to a public software repository?"
    },
    "specificitems": {
      "type": "string",
      "title": "Are there specific items that the operator must input during VNF instantiation, such as DNS, RADIUS, licensing servers, and so on. If yes, describe below."
    }
  }
};

const uiSchema = {
  "licenswork": {
    "ui:widget": "textarea"
  },
  "publicinternet": {
    "ui:widget": "textarea"
  },
  "specificitems": {
    "ui:widget": "textarea"
  }
};

 const formData = {
  "datamodellanguage": "data model language",
  "licenswork": "Hello World !",
  "publicinternet": "Hello World !",
  "specificitems": "Hello World !"
};
    var PostInstall = React.createClass({
        getInitialState:function(){
            var formData = {};
            if (this.props.formData && this.props.formData["additonalInfo"]) {
                formData = this.props.formData["additonalInfo"]["postInstall"];
            }
            return ({vmArr: [], formData: formData, noOfVms: 0, val: "", statusActive: "phyRes"});
        },
        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.additonalInfo){
                formData["additonalInfo"]={};
              }
            formData["additonalInfo"]["postInstall"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
              self.props.saveFormData("additonalInfo");
                self.setState({formData:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });  },
        handleConfirm: function(data) {
         if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"verification");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else{
            this.props.setPageActive("additonalInfo","next",data,"verification");
          }
        },
        render: function() {
            return (
                <div id="commonInfo" >
                        <FormPostInstall schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} formData={this.state.formData} >
                        </FormPostInstall>
                         <div className="net">
                        { /*   <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"vmManager","prev")}>Previous</a> */}
                        {/*    <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>*/}
                            <a href="#"  className="btn btn-danger btn-sm nextBtn"  onClick={this.moveNext}>Next</a>
                         </div>
                        </div>
            );
        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
         }  ,
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#commonInfo button").click();
           //this.setState({val: "saveAndExit"});
         },
         moveNext:function(){
           this.setState({"val":"next"}) ;
               $("#commonInfo button").click();
             },
    });
    module.exports= PostInstall;
