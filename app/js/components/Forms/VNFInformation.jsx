var React=require("react");
var $ =require("jquery");
var Form = require("./../../thirdParty/react-jsonschema-form.js");
var VNFBasic = require("./VNFBasic.jsx");
var KpiParameters = require("./KpiParameters.jsx");
var ManagementInfo = require("./ManagementInfo.jsx");
  var nextPage="";

    var VMInformation = React.createClass({
        getInitialState:function(){
          var formData={};
          if(this.props.formData){
            formData=this.props.formData;
          }
            return({
              vmArr:[],
              formData:formData,
               noOfVms:0,
               val: "",
              statusActive: "vnf"
            }
            );
        },
        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
          debugger;
          if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"vnfInfo");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else{
            this.props.setPageActive("vmInfo","next",data,"vnfInfo")
          }
        },
        clickTheButton: function () {
          debugger;
            switch (this.state.statusActive) {
                case "vnf":
                    $("#virRes button").click()
                    break;
                case "mgmt":
                    $("#managementInfo button").click()
                    break;
                case "kpiParameters":
                    $("#kpiRes button").click()
                    break;
                default:
                    break;
            }
        },
        pageActive: function (activePage) {
            this.clickTheButton(activePage);
            this.setState({ "statusActive": activePage });
        },
        moveNextSection: function (data) {
            this.clickTheButton();
       },
       saveFormData:function(data){
         if(!this.state.formData){
           this.state.formData={};
         }
         switch (this.state.statusActive) {
             case "vnf":
                this.state.formData["vnfBasic"]=data;
             case "mgmt":
                this.state.formData["managementInfo"]=data;

                 break;
             case "kpiParameters":
              this.state.formData["kpiParameters"]=data;
                 break;
             default:
                 break;
         }
         var nextPageClone="";
         if (nextPage) {
             nextPageClone =nextPage;
             nextPage="";
         }

   this.setState({ "formData": this.state.formData });
         this.props.saveFormData(this.state.formData, "vnfInfo", "vnfInfo", this, nextPageClone, function (self) {
         })
       },
        render: function() {
            return (
              <div id="vvnf">
                      <ul className="nav nav-tabs tabs-left" role="tablist">
                        <li id="vr-tab" role="presentation" className="active" onClick={this.pageActive.bind(this, "vnf")}>
                            <a href="#vresource" aria-controls="vresource" role="tab" data-toggle="tab">
                              Virtual Resource Requirements
                            </a>
                        </li>
                        <li id="mgmt-tab" role="presentation" >
                            <a href="#mgmt" aria-controls="mgmt" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this, "mgmt")}>
                              Management & Configuration Requirements
                            </a>
                        </li>
                        <li id="kpi-tab" role="presentation" >
                            <a href="#kpipar" aria-controls="kpipar" role="tab" data-toggle="tab" onClick={this.pageActive.bind(this, "kpiParameters")}>
                              KPI Parameters
                            </a>
                        </li>

                      </ul>
                      <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="vresource" aria-labelledby="vr-tab">
                                        <div id="vres" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
          <VNFBasic saveFormData={this.saveFormData} formData={this.state.formData["vnfBasic"]}></VNFBasic>
                                            </div>
                                        </div>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="mgmt" aria-labelledby="mgmt-tab">
                                        <div id="mgm" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
          <ManagementInfo saveFormData={this.saveFormData} formData={this.state.formData["managementInfo"]}></ManagementInfo>
                                            </div>
                                        </div>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="kpipar" aria-labelledby="kpi-tab">
                                        <div id="kpi" className="panel-collapse collapse in" role="tabpanel">
                                            <div className="panel-body">
          <KpiParameters saveFormData={this.saveFormData} formData={this.state.formData["kpiParameters"]}></KpiParameters>
                                            </div>
                                        </div>
                        </div>
                      </div>

                      <div className="net">
                        {/* <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"networkInfo","prev")}>Previous</a>*/}
                          <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.movePrev}>Previous</a>
                    {/*    <a href="#" id="save" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a> */}
                           <a href="#"  className="btn btn-danger btn-sm nextBtn"  onClick={this.moveNext}>Next</a>

                      </div>
                      </div>
            );
        },moveNext:function(){
           nextPage="vmInfo"
          this.clickTheButton();
        },
        movePrev: function(){
          nextPage="networkInfo"
         this.clickTheButton();
        },
        saveAndExit: function(){
          this.state.val = "saveAndExit";
            $("#vvnf button").click();
            this.props.setPageActive("homePage", "next", {},"vnfInfo");

          //this.setState({val: "saveAndExit"});
        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);

         }
    });

    module.exports= VMInformation;
