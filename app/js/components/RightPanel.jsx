var React =require("react");
var toastr=require("toastr");
var axios=require("axios");
var agGridReact=require("ag-grid-react-component");
var PackageData=require("./VNFPackageData.jsx");
var GeneralInfo=require("./Forms/GeneralInfo.jsx");
var CommonInfo=require("./Forms/CommonInfo.jsx");
var Orchestration=require("./Forms/Orchestration.jsx");
var VirtualResource=require("./Forms/VirtualResource.jsx");
var ManagementConfig=require("./Forms/ManagementConfig.jsx");
var ScalingRedundancy=require("./Forms/ScalingRedundancy.jsx");
var PhysicalResource=require("./Forms/PhysicalResource.jsx");
var PackageUpload=require("./Forms/VNFPackageUpload.jsx");
var VNFInformation=require("./Forms/VNFInformation.jsx");
var HomePage=require("./Forms/HomePage.jsx");
var GenerateDescriptors=require("./Forms/GenerateDescriptors.jsx");
var Loader=require("react-loading");

    var AgGridReactGRID = agGridReact.AgGridReact;
    var RightPanel = React.createClass({
      setActivePage:function(activePage){
        this.setState({pageActive: activePage});

        this.props.changeStatus(activePage)

      },
      forAddNew: function() {
          var packageName=this.generatePackageName();
          this.setState({pageActive: "generalInfo", packageName: packageName, data: {}})
      },
        setPageActive: function(pageNumber, fromPage, formData, prevPageName) {
          var packageName=this.getPackageName();
           if(pageNumber!="package"){
            this.props.changeStatus(pageNumber)
          }
            if(fromPage=="prev" || !formData){
              this.setState({pageActive: pageNumber, packageName: packageName});

            }else{
              this.state.data[prevPageName]=formData;
                this.state.data.pageNumber=(pageNumber);
                this.state.data.status="inProgress";
              var savePackageUrl=config.formApi+ "/vnf/"+packageName+"/saveFormData";
              this.setState({loaderOn: true});
              var self=this;
              this.ajaxCalltoSetData(self.state.data,packageName,function(response){
                  self.setState({pageActive: pageNumber, packageName: packageName,data:self.state.data});
              })

            }
        },
        ajaxCalltoSetData:function(data,packageName,callback){
          var savePackageUrl=config.formApi+ "/vnf/"+packageName+"/saveFormData";
          var self=this;
                    axios.post(savePackageUrl, {
                        formData: data
                    }).then(function(response) {
                      self.setState({loaderOn: false});
                      callback(response)
                    }).catch(function(error) {
                      self  .setState({loaderOn: false});
                    });
        },
        saveAndSetFormData:function(data){
          var packageName=this.getPackageName();
          this.ajaxCalltoSetData(data,packageName,function(response){
            self.setState({data:data});
          });
        },
        getPackageName:function(){
          var packageName="";
          if (!this.state.packageName) {
              packageName = this.generatePackageName();
          } else {
              packageName = this.state.packageName;
          }
          return packageName;
        },
        setPackageData: function(rowData) {
            this.refs.package.setPackageData(rowData);
        },
        saveFormData(formData,prevPageName,currentPage,ref,nextPage,callback){
          var packageName=this.getPackageName();
          this.state.data[prevPageName]=formData;
            this.state.data.pageNumber=(currentPage);
            this.state.data.status="inProgress";
          var self=this;
          this.ajaxCalltoSetData(self.state.data,packageName,function(response){
            if(nextPage){
              self.props.changeStatus(nextPage)
              self.setState({ pageActive:nextPage, packageName: packageName,data:self.state.data});
            }else{
              self.setState({ packageName: packageName,data:self.state.data});
              callback(ref);
            }
          });
        },
        generatePackageName: function() { // Public Domain/MIT
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
        setPackageName: function(packageName) {
            this.setState({packageName: packageName})
        },
        getInitialState: function() {
            return {pageActive: "package", packageName: "",
              loaderOn: false,
              statusLoaderOn: false,
              data:{"generalInfo":{}}}

        },

        onShowGrid(show) {
            this.setState({showGrid: show});
        },
        ageCellRendererFunc: function(params) {
            return '<span class="glyphicon glyphicon-pencil"></span></span><span class="glyphicon glyphicon-trash"></span>';
        },
        setPackageDataAndName:function(data){
          this.setState(data);
          this.props.changeStatus(data.pageActive)

        },
        render: function() {
            var topHeaderTemplate;
            var gridTemplate;
            gridTemplate = (
                <div className="ag-fresh vnfGrid">
                    <AgGridReactGRID gridOptions={this.state.gridOptions} quickFilterText={this.state.quickFilterText} icons={this.state.icons} columnDefs={this.state.columnDefs} debug="true"/>
                </div>
            );
            topHeaderTemplate = (
                <div className="form-group">
                    <input type="text" className="form-control gridFilter" placeholder="Type text to filter..."/>
                </div>
            );

            var GeneralInfoForm = (
                <GeneralInfo></GeneralInfo>
            );
            var vnfPackage = (
                <div className="col-md-12 vnfPackages">
                    <h2>VNF Packages</h2>
                    <div className="viewOption">
                        <a href="#" className="tableView active" onClick={this.tableClick}>
                            <i className="fa fa-table" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Table View"></i>
                        </a>
                        <a href="#" className="gridView" onClick={this.cardClick}>
                            <i className="fa fa-th" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Card View"></i>
                        </a>
                    </div>
                    <div className="vnfpackageListView">
                        {topHeaderTemplate}
                        {gridTemplate}

                    </div>

                    <div className="vnf vnfpackageCardView"></div>
                </div>
            );
            return (

                <div className={"contentMain rightPanel "+this.props.className}>
                  <div className={this.state.loaderOn
                      ? "homePageClass"
                      : ""}>
                    <div className="contentBody">
                        <div className="row">
                            <div className="col-xs-12">

                                {this.state.pageActive == "package"
                                    ? <PackageData ref="package" setPackageDataAndName={this.setPackageDataAndName} forAddNew = {this.forAddNew} formData={this.state.data} setPageActive={this.setPageActive}/>
                                  : (this.state.pageActive == "generalInfo"
                                        ? <GeneralInfo setPageActive={this.setPageActive} ref="generalInfo" formData={this.state.data["generalInfo"]}/>
                                      : this.state.pageActive == "verification"
                                            ? <CommonInfo setPageActive={this.setPageActive} ref="verification" formData={this.state.data["verification"]}/>
                                          : this.state.pageActive == "vmInfo"
                                                ? <VirtualResource setPageActive={this.setPageActive}
                                                saveFormData={this.saveFormData} ref="vmInfo" vnfInfo={this.state.data["vnfInfo"]}
                                                formData={this.state.data["vmInfo"]}/>
                                              : this.state.pageActive == "vnfInfo"
                                                    ? <VNFInformation setPageActive={this.setPageActive} ref="vnfInfo" saveFormData={this.saveFormData}
                                                    formData={this.state.data["vnfInfo"]}/>
                                                  : this.state.pageActive == "vmManager"
                                                        ? <Orchestration setPageActive={this.setPageActive} ref="vmManager" formData={this.state.data["vmManager"]}/>
                                                      : this.state.pageActive == "networkInfo"
                                                            ? <Networking setPageActive={this.setPageActive} ref="networkInfo" formData={this.state.data["networkInfo"]}/>
                                                            : this.state.pageActive == 8
                                                                ? <CommonInfo setPageActive={this.setPageActive} ref="8" formData={this.state.data[8]}/>
                                                              : (this.state.pageActive == "additonalInfo"
                                                                    ? <PhysicalResource setPageActive={this.setPageActive} ref="additonalInfo" saveFormData={this.saveFormData} formData={this.state.data["additonalInfo"]}/>
                                                                  : this.state.pageActive == "upload"
                                                                    ? <PackageUpload setPageActive={this.setPageActive} ref="upload"  saveAndSetFormData={this.saveAndSetFormData}  formData={this.state.data}/> :
                                                                    this.state.pageActive == "homePage"
                                                                      ? <HomePage setActivePage={this.setActivePage} ref="homePage" formData={this.state.data}  saveAndSetFormData={this.saveAndSetFormData}/>
                                                                    : this.state.pageActive == "generateDescriptors"
                                                                    ? <GenerateDescriptors setActivePage={this.setActivePage} saveAndSetFormData={this.saveAndSetFormData} ref="generateDescriptors" formData={this.state.data}/>
                                                                  : ""))
}

                            </div>
                        </div>
                    </div>

                </div>
                    <div className={this.state.loaderOn
                        ? "showLoader"
                        : "hideLoader"}>
                         <Loader type='spinningBubbles' color='#000000'></Loader>
                    </div>
                      </div>

            );
        },
        cardClick: function() {

            $(this).addClass('active');
            $('.viewOption .tableView').removeClass('active');
            $('.vnfpackageCardView').css('display', 'block');
            $('.vnfpackageListView').hide();

        },
        tableClick: function() {

            $(this).addClass('active');
            $('.viewOption .gridView').removeClass('active');
            $('.vnfpackageListView').css('display', 'block');
            $('.vnfpackageCardView').hide();

        },

        componentDidMount: function() {


        }
    });

    module.exports= RightPanel;
