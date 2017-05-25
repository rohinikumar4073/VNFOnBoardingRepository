var React =require("react");
var $ =require("jquery");
var Form =require("./../../thirdParty/react-jsonschema-form.js");
    var FormCommon = Form.default;
    var DataService=require("./../../services/DataService.js")


const schema = {
  "type": "object",
  "properties": {

    "sanitytest": {
      "type": "string",
      "title": "Describe how Verizon can quickly verify that the VNF is functioning properly. Provide a minimal sanity-test procedure and expected results."
    },
    "adminconfigmanual": {
      "type": "string",
      "title": "Provide Instructions for how to download a copy of your software images and product admin/configuration manuals, or attach a copy when you return this questionnaire."
    }
  }
};

const uiSchema = {
  "etsicompliant": {
    "ui:widget": "radio"
  },
  "sanitytest": {
    "ui:widget": "textarea"
  },
  "adminconfigmanual": {
    "ui:widget": "textarea"
  }
};

 const formData = {
  "etsicompliant": true,
  "datamodellanguage": "data model language",
  "sanitytest": "Hello World !",
  "adminconfigmanual": "Hello World !"
};

    var CommonInfo = React.createClass({

        getInitialState:function(){
           var data={};
          if(this.props.formData["verification"]){
            data=this.props.formData["verification"];
          }
            return({
              formData:data,
               val: "",

            }
            );},
        onSubmit: function(e) {

              var formData=this.props.formData;
              if(!formData.verification){
                  formData["verification"]={};
                }
              formData["verification"]=e.formData;
              var self=this;
              DataService.saveandUpdateData(formData,function(){
                if(self.state.val=="next" || self.state.val=="prev"){
                  self.props.saveFormData("additonalInfo");
                  self.setState({formData:e.formData,val:""})

                }else{
                  self.setState({formData:e.formData})

                }
              });    },
        handleConfirm: function(data) {
          if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"verification");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else if(this.state.val == "prev"){
            this.props.setPageActive("vmManager","prev",data,"verification");
          }
          else{
            this.props.setPageActive("additonalInfo","next",data,"verification");
          }
        },
        render: function() {
            return (
                <div id="verification" >
  <h2>Verification</h2>
                        <FormCommon schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} formData={this.state.formData} >
                        </FormCommon>
                         <div className="net">
                           {/*<a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"vmManager","prev")}>Previous</a>*/}
                           <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.movePrev}>Previous</a>
                          {/*  <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>*/}
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
             $("#verification button").click();
           //this.setState({val: "saveAndExit"});
         },
         moveNext:function(){
           this.setState({"val":"next"}) ;
               $("#verification button").click();
             },
             movePrev: function(){
               this.state.val = "prev";
              $("#verification button").click();
             }
    });
    module.exports= CommonInfo;
