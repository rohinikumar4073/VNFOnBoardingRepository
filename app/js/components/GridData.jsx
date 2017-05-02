var React =require("react");


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

        if (self.props.data.isVnfActive && self.props.data.isGenDescComp) {
          $.ajax({
              url: config.formApi + "/vnf/" + gene.productinfo.vnfproductname + "/getVnfStatus",
              method: 'POST',
              data: {},
              success: function(data) {
                if(data.status != null){
                  if (data.status=="NULL") {
                      self.setState({configurationStatus: "Activating"});
                  } else {
                      self.setState({configurationStatus: data.status});
                  }
                }
                else if(self.props.data.isGenDescComp){
                  self.setState({configurationStatus: "Configured"});
                }
                else{
                  self.setState({configurationStatus: "Not Configured"});
                }
              },
              error: function(data) {}
          })
            setInterval(function() {
                $.ajax({
                    url: config.formApi + "/vnf/" + gene.productinfo.vnfproductname + "/getVnfStatus",
                    method: 'POST',
                    data: {},
                    success: function(data) {
                      if(data.status != null){
                        if (data.status=="NULL") {
                            self.setState({configurationStatus: "Activating"});
                        } else {
                            self.setState({configurationStatus: data.status});
                        }
                      }
                      else if(self.props.data.isGenDescComp){
                        self.setState({configurationStatus: "Configured"});
                      }
                      else{
                        self.setState({configurationStatus: "Not Configured"});
                      }
                    },
                    error: function(data) {}
                })
            }, 10000);
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
                <a href="#" onClick={this.props.onSelectionGridChanged.bind(this,this.props.data.data,this.props.data.name)}>
                    <div className="card">
                        <div className="card-body">
                            <h4>Company Name -
                                <span>{this.props.data.companyname}</span>
                                <span className={"status "+flag2}><i className={"fa "+ flag} aria-hidden="true"></i></span>
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
                        <div className="card-footer">
                            <span className="card-footer-text">View details</span>
                            <i className="pull-right fa fa-chevron-right"></i>
                        </div>
                    </div>
                </a>
            </div>

        );
      }
      });

    module.exports= GridData;
