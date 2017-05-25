var React = require("react");
var $ = require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var DataService=require("./../../services/DataService.js")

    var FormKpi = Form.default;

    const schema = {
        "name": "kpiParameters",
        "type": "object",
        "description": "* For monitoring, service assurance, and scaling needs, provide relevant KPI access information.",
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

const uiSchema = {
  "provisionsec": {
      "ui:widget": "radio",
      "ui:options": {
          "inline": true
      }
  }
};

 const formData = {
  "affinity": true,
  "singlevnf": "hello world",
  "epaparameters": "hello world"
}


    var KpiParameters = React.createClass({

        getInitialState:function(){
          var data ={}
          if(this.props.formData["vnfInfo"]){
            data=this.props.formData["vnfInfo"]["kpiParameters"];
          }
            return({
              formData:data,
               val: ""
            }
            );
        },

        onSubmit: function(e) {
            var formData=this.props.formData;
            if(!formData.vnfInfo){
                formData["vnfInfo"]={};
              }
            formData["vnfInfo"]["kpiParameters"]=e.formData;
            var self=this;
            DataService.saveandUpdateData(formData,function(){
              if(self.state.val=="next" || self.state.val=="prev"){
                self.props.saveFormData("networkInfo");
                self.setState({formData:e.formData,val:""})

              }else{
                self.setState({formData:e.formData})

              }
            });
        },




        handleConfirm: function(data) {
        if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"additonalInfo");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else{
            this.props.setPageActive("homePage","next",data,"additonalInfo")
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }

        },
        render: function() {
            return (
                <div id="kpiRes">

                        <FormKpi schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit} >
                        </FormKpi>
                         <div className="contentFooter">
                           <div className="net">
                               <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.moveNext}>Next</a>

                           </div>   </div>
                        </div>

            );
        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
         },moveNext:function(){
           this.setState({"val":"next"}) ;
           $("#kpiRes button").click();
         },
         saveAndExit: function(){
           this.state.val = "saveAndExit";
             $("#kpiRes button").click();
           //this.setState({val: "saveAndExit"});

         },
         finishForm:function(){
           this.state.val = "";
              $("#kpiRes button").click();
         }
    });

    module.exports= KpiParameters;
