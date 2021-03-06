var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

var FormResource = Form.default;

const schema = {
  "type": "object",
  "properties": {
    "affinity": {
      "type": "boolean",
      "title": "Does VM require affinity/antiaffinity placements?"
    },
    "singlevnf": {
      "type": "string",
      "title": "How many physical hosts are required to support a single instance of this VNF?"
    },
    "epaparameters": {
      "type": "string",
      "title": "For each constituent VM, note the EPA parameters to be used during instantiation."
    }
  }
};

const uiSchema = {
  "affinity": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  },
  "epaparameters": {
    "ui:widget": "textarea"
  }
};

 const formData = {
  "affinity": true,
  "singlevnf": "hello world",
  "epaparameters": "hello world"
}


    var Resource = React.createClass({

        getInitialState:function(){
          var data ={}
          if(this.props.formData["additonalInfo"]){
            data=this.props.formData["additonalInfo"]["physicalResource"];
          }
            return({
              formData:data,
               val: ""
            }
            );
        },

        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.additonalInfo){
                formData["additonalInfo"]={};
              }
            formData["additonalInfo"]["physicalResource"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
              self.props.saveFormData("additonalInfo");
                self.setState({formData:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });},




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
                <div id="prd">

                        <FormResource schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit} >
                        </FormResource>
                         <div className="contentFooter">
                        {/*  <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"verification","prev")}>Previous</a>*/}
                  {/*    <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>*/}
                         </div>
                        </div>

            );
        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
         },
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#prd button").click();
           //this.setState({val: "saveAndExit"});

         },
         finishForm:function(){
           this.setState({"val":"next"}) ;
              $("#prd button").click();
         }
    });

  module.exports= Resource;
