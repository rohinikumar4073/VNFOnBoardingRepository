

var React =require("react");
var $ = require("jquery");
var UOPService =require("./../services/UOPService.js")
    var GridData = React.createClass({
      getInitialState: function(){
          return {
              configurationStatus: this.props.data.isGenDescComp
                  ? "Configured"
                  : "Not Configured",
              isVnfActive: this.props.data.isVnfActive,
              isGenDescComp: this.props.data.isGenDescComp

          };
      },
      componentDidMount: function(){
        var self = this;
        var gene = this.props.data.data.formData.generalInfo;

        if (self.props.data.isVnfActive && self.props.data.isGenDescComp &&  self.props.data.jobId) {
            UOPService.getOssId(function(ossId){
            UOPService.getJOBStatus(function(data){


            if(response.data.status=="IN_PROGRESS"){
              self.setState(configurationStatus, "Activating");
            }
            else if(response.data.status=="OK"){
              self.setState(configurationStatus, "ACTIVE");


            }
            else if(response.data.status=="ON_ERROR")
              self.setState(configurationStatus, "ERROR");


              },ossId,self.props.data.jobId);

                  },parent)
        }
      },
      render:function(){
        var flag="";
        var flag2=""
        if(this.props.data.data.formData.status=="Finish"){
          flag="fa-check-circle"
          flag2="completed"
        }else{
          flag="fa-flag"
          flag2="inprogress"

        }
      return(
            <div className="col-sm-4 col-md-4 col-lg-3" >
                    <div className="card">
                        <div className="card-body">

                            <h4>Company Name -
                                <span>{this.props.data.companyname}</span>
                                <span className={"status "+flag2}><i onClick={this.props.handleDelete.bind(this,this.props.data.name)}>x</i></span>
                            </h4>

                            <h4>VNF Product Name -
                                <span>{this.props.data.vnfproductname}</span>
                            </h4>
                            <a href="#" className={this.state.configurationStatus == 'Not Configured'
                                ? "homeCardPackage not-configured"
                                : (this.state.configurationStatus == "Configured"
                                    ? "homeCardPackage configured"
                                    : (this.state.configurationStatus == "ACTIVE"
                                        ? "homeCardPackage active-vnf"
                                        : "homeCardPackage on-boarding"))}>
                                        <h2>
                                          <span>{this.state.configurationStatus}</span>
                                        </h2>


                            </a>

                            <p></p>
                        </div>
                        <div className="card-footer" onClick={this.props.onSelectionGridChanged.bind(this,this.props.data.data,this.props.data.name)}>
                          <a href="javascript:void(0)"><span className="card-footer-text">View details</span></a>
                            <i className="pull-right fa fa-chevron-right"></i>
                        </div>
                    </div>
            </div>

        );
      }
      });

    module.exports= GridData;
