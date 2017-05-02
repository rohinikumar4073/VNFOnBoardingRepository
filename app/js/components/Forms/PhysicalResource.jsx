define([
    'react', 'jquery' ,'react-jsonschema-form', 'toastr','jsx!components/Forms/ScalingRedundancy','jsx!components/Forms/PostInstall','jsx!components/Forms/Resource'
], function(React, $,  Form, toastr,ScalingRedundancy, PostInstall, Resource) {
  var nextPage="";
    var PhysicalResource = React.createClass({

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
              statusActive: "phyRes"
            }
            );
        },

        onSubmit: function(e) {
            this.handleConfirm(e.formData)
        },
        handleConfirm: function(data) {
          if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"additonalInfo");
           $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else{
            this.props.setPageActive("homePage","next",data,"additonalInfo")
          }
        },
        clickTheButton: function () {
            switch (this.state.statusActive) {
                case "phyRes":
                    $("#prd button").click()
                    break;
                case "scaRen":
                    $("#scalingRed button").click()
                    break;
                case "postInstall":
                    $("#commonInfo button").click()
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
             case "phyRes":
                this.state.formData["physicalResource"]=data;
             case "scaRen":
                this.state.formData["scalingRedun"]=data;
                 break;
             case "postInstall":
              this.state.formData["postIns"]=data;
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
         this.props.saveFormData(this.state.formData, "additonalInfo", "additonalInfo", this, nextPageClone, function (self) {
         })
       },
        render: function() {
            return (
                <div id="phys">
                        <ul className="nav nav-tabs tabs-left" role="tablist">
                          <li id="pr-tab" role="presentation" className="active" onClick={this.pageActive.bind(this, "phyRes")}>
                              <a href="#resource" aria-controls="resource" role="tab" data-toggle="tab" >
                                  Physical Resource
                              </a>
                          </li>
                          <li id="vnfd-tab" role="presentation" onClick={this.pageActive.bind(this, "scaRen")}>
                              <a href="#sandr" aria-controls="sandr" role="tab" data-toggle="tab" >
                                  Scaling and Redundancy
                              </a>
                          </li>
                          <li id="nsd-tab" role="presentation" onClick={this.pageActive.bind(this, "postInstall")}>
                              <a href="#postinstall" aria-controls="postinstall" role="tab" data-toggle="tab" >
                                  Post Install
                              </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div role="tabpanel" className="tab-pane active" id="resource" aria-labelledby="pr-tab">
                                          <div id="res" className="panel-collapse collapse in" role="tabpanel">
                                              <div className="panel-body">
<Resource saveFormData={this.saveFormData} formData={this.state.formData["physicalResource"]}></Resource>
                                              </div>
                                          </div>
                          </div>
                          <div role="tabpanel" className="tab-pane" id="sandr" aria-labelledby="vnfd-tab">
                                          <div id="scaling" className="panel-collapse collapse in" role="tabpanel">
                                              <div className="panel-body">
<ScalingRedundancy saveFormData={this.saveFormData} formData={this.state.formData["scalingRedun"]}></ScalingRedundancy>
                                              </div>
                                          </div>
                          </div>
                          <div role="tabpanel" className="tab-pane" id="postinstall" aria-labelledby="nsd-tab">

                                          <div id="post" className="panel-collapse collapse in" role="tabpanel">
                                              <div className="panel-body">
<PostInstall saveFormData={this.saveFormData} formData={this.state.formData["postIns"]}></PostInstall>
                                              </div>
                                          </div>
                          </div>
                        </div>
                         <div className="contentFooter">
                            <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"verification","prev")}>Previous</a>
                            <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>
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
             $("#phys button").click();
             this.props.setPageActive("homePage", "next", {},"additonalInfo");
             $(".leftMain").addClass("totalLeftScreenMode");
             $(".contentMain").addClass("totalRightScreenMode");
           //this.setState({val: "saveAndExit"});
         },
         finishForm:function(){
           this.state.val = "";
              $("#phys button").click();
         }
    });

    return PhysicalResource;

});
