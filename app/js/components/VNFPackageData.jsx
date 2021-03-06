var React = require("react");
var toastr = require("toastr");
var axios = require("axios");
var config = require("./../properties/config.js");
var GridData = require("./GridData.jsx");
var CustomEdit = require("./Forms/CustomEdit.jsx");
var CustomDelete = require("./Forms/CustomDelete.jsx");
var NewVNFForm=require("./Forms/NewVNFForm.jsx");
var $ = require("jquery");
var dataService = require("./../services/DataService.js");
var AgGridReactGRID  = require("ag-grid-react").AgGridReact;
var Alert = require("./Forms/Alert.jsx");
var deleteVnfName = "";
var PackageData = React.createClass({
    onSelectionGridChanged: function(rowData, name) {
        var data = rowData.formData;
        this.props.setPackageDataAndName({packageName: name, data: data, pageActive: "homePage"})

    },

    onSelectionChanged: function(rowData) {
    //    var selectedRows = this.state.gridOptions.api.getSelectedRows();
        var selectedRowsString = '';
        var data = selectedRows[0].data.formData;
        var name = selectedRows[0].name;
        this.props.setPackageDataAndName({packageName: name, data: data, pageActive: data.pageNumber})

    },
    getInitialState: function() {
      debugger;
        return {
            deleteComponent: false,
            quickFilterText: null,
            height: 250,
            gridOptions: {},
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            },
            scrollbarWidth: function() {
                return ($(window).width() * 100) / 120 - 50;
            },
            columnDefs: [
                {
                    headerName: 'ID',
                    field: "id",
                    width: 300,
                    pinned: true
                }, {
                    headerName: 'Company Name',
                    field: "companyname",
                    width: 300,
                    pinned: true
                }, {
                    headerName: 'VNF Product Name',
                    field: "vnfproductname",
                    width: 300,
                    pinned: true
                }, {
                    headerName: 'Version',
                    field: "version",
                    width: 300,
                    pinned: true
                }, {
                    headerName: 'Edit',
                    field: "edit",
                    width: 300,
                    pinned: true,
                    cellRendererFramework: CustomEdit
                }, {
                    headerName: 'Delete',
                    field: "delete",
                    width: 300,
                    pinned: true,
                    cellRendererFramework: CustomDelete
                }
            ],
            rowData: [],
            pageActive: 1,
            configurationStatus: this.props.formData.isGenDescComp
                ? "Configured"
                : "Not Configured",
            isVnfActive: this.props.formData.isVnfActive,
            isGenDescComp: this.props.formData.isGenDescComp,
            addNew: false

        }
        debugger;
    },
    rowClicked(data) {},
    onQuickFilterText(event) {
        this.setState({quickFilterText: event.target.value});
    },
    onShowGrid(show) {
        this.setState({showGrid: show});
    },
    render: function() {
        var topHeaderTemplate;
        var gridTemplate;

                    gridTemplate = (
                        <div className="ag-fresh vnfGrid">
                            <AgGridReactGRID gridOptions={this.state.gridOptions}
                               quickFilterText={this.state.quickFilterText} icons={this.state.icons}
                               columnDefs={this.state.columnDefs} debug="true"/>
                        </div>
                    );
                    topHeaderTemplate = (
                        <div className="form-group">
                            <input type="text" className="form-control gridFilter" onChange={this.onQuickFilterText.bind(this)} placeholder="Type text to filter..."/>
                        </div>
                    );

        var self = this;
        return (
          <div className="container">
            <div className="row content-body packageData">
                <div className="col-md-12 vnfPackages">
                    <h2 className="page-heading">VNF Directory</h2>
                    <div className="viewOption">



                    </div>
                    <div className="vnfpackageListView">

                    </div>

                    <div className="vnf vnfpackageCardView">
                      <div className="col-sm-4 col-md-4 col-lg-3">
                          <a href="#" onClick={this.createNew}>
                              <div className="card">
                                  <div className="card-body add-new">
                                      <a href="#" className="tableView active">
                                          <i className="fa fa-plus-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Table View"></i>
                                      </a>
                                  </div>
                                  <div className="card-footer">
                                      <span className="card-footer-text">Add New
                                      </span>
                                      <i className="pull-right fa fa-chevron-right"></i>
                                  </div>
                              </div>
                          </a>
                      </div>
                        {
                          this.state.rowData.map(function(data) {
                            return <GridData data={data} onSelectionGridChanged={self.onSelectionGridChanged} handleDelete={self.handleDelete} closePopup={self.closePopup}/>
                          })
                        }

                    </div>
                </div>
              </div>
            {this.state.addNew
            ? <NewVNFForm header="Create VNF Record" userName={this.props.userName}closePage={this.closePage} />
          : ""
        }
        {this.state.deleteComponent
          ? <Alert closePopup = {this.closePopup} deleteRecord={this.deleteRecord}/>
        : ""}
        </div>
        );
    },
    handleDelete(value){
      $('.packageData').addClass('crossFade');
      deleteVnfName = value.name;
      this.setState({deleteComponent: true});
    },
    closePopup: function(){
      this.setState({deleteComponent: false});
      $('.packageData').removeClass('crossFade');
    },
    deleteRecord: function(){
      var self=this;
      var vnfProductName = deleteVnfName;
      var deleteURL = config.formApi + "/vnfForm/" +  vnfProductName+ "/deleteForm";
      axios["delete"](deleteURL).then(function (response) {
          toastr.success("VNF Deleted successfully!");
          deleteVnfName = "";
          self.setPageData();
          self.closePopup();
      });
    },
    closePage: function(close){
      if(close == "close"){
        this.setState({addNew: false});
        $('.packageData').removeClass('crossFade');
        var self = this;
        this.setPageData();
      }
    },
    createNew: function() {
      this.setState({addNew: true});
      $('.packageData').addClass('crossFade');
        //this.props.forAddNew();
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
    processPackageData: function(p) {
var packageData = this.state.rowData;
      while(packageData.length) {
          packageData.pop();
        }
        this.setState({rowData: packageData})

        var index = 1;
        for (var key in p) {
            var packageJSON = {};
            if (p[key]["formData"]["generalInfo"] && p[key]["formData"]["generalInfo"]["companytechnicalcontact"] && p[key]["formData"]["generalInfo"]["companytechnicalcontact"]["companyname"])
                packageJSON.companyname = p[key]["formData"]["generalInfo"]["companytechnicalcontact"]["companyname"];
            if (p[key]["formData"]["generalInfo"] && p[key]["formData"]["generalInfo"]["productinfo"] && p[key]["formData"]["generalInfo"]["productinfo"]["vnfproductname"])
                packageJSON.vnfproductname = p[key]["formData"]["generalInfo"]["productinfo"]["vnfproductname"];
            packageJSON.id = index;
            packageJSON.data = p[key];
            packageJSON.name =  p[key].id;
            p[key]["formData"].id = p[key].id;
            packageJSON.isGenDescComp = p[key]["formData"]["isGenDescComp"]
                ? true
                : false;
            packageJSON.isVnfActive = p[key]["formData"]["isVnfActive"]
                ? true
                : false;
            packageJSON.isPackageUploaded = p[key]["formData"]["isPackageUploaded"]
                ? true
                : false;
            packageJSON.testPackageExecuted = p[key]["formData"]["testPackageExecuted"]
                ? true
                : false;
            index++;
            packageData.push(packageJSON);
        }
        debugger;
        this.setState({rowData: packageData})

      var dataForTable=  JSON.parse(JSON.stringify(packageData))
    //    this.state.gridOptions.api.setRowData(dataForTable);


    },
    componentDidMount: function() {
          this.setPageData();
//        dataService.registerGridData(this);
    },
    setPageData:function(){
      var self=this;
      axios.get(config.formApi + "/vnfForm/"+this.props.userName+"/getAllPackage").then(function(response) {
          self.processPackageData(response.data);
      });
    }
});

module.exports = PackageData;
