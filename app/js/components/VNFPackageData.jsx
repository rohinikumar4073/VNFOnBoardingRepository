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

var PackageData = React.createClass({
    onSelectionGridChanged: function(rowData, name) {
        var data = rowData.formData;
        this.props.setPackageDataAndName({packageName: name, data: data, pageActive: "homePage"})

    },

    onSelectionChanged: function(rowData) {
        var selectedRows = this.state.gridOptions.api.getSelectedRows();
        var selectedRowsString = '';
        var data = selectedRows[0].data.formData;
        var name = selectedRows[0].name;
        this.props.setPackageDataAndName({packageName: name, data: data, pageActive: data.pageNumber})

    },
    getInitialState: function() {
      debugger;
        return {
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
          <div className="container-fluid">
            <div className="row content-body packageData">
                <div className="col-md-12 vnfPackages">
                    <h2 className="page-heading">VNF Directory</h2>
                    <div className="viewOption">

                        <a href="#" className="gridView" onClick={this.cardClick}>
                            <i className="fa fa-th" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Card View"></i>
                        </a>
                        <a href="#" className="tableView active" onClick={this.tableClick}>
                            <i className="fa fa-table" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Table View"></i>
                        </a>

                    </div>
                    <div className="vnfpackageListView">
                      {topHeaderTemplate}
                      {gridTemplate}

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
                            return <GridData data={data} onSelectionGridChanged={self.onSelectionGridChanged}/>
                          })
                        }

                    </div>
                </div>
              </div>
            {this.state.addNew
            ? <NewVNFForm header="Create VNF Record" closePage={this.closePage} />
          : ""
        }
        </div>
        );
    },
    closePage: function(close){
      if(close == "close"){
        this.setState({addNew: false});
        $('.packageData').removeClass('crossFade');
        var self = this;
        axios.get(config.formApi + "/vnf/getAllPackage").then(function(response) {
            self.processPackageData(response.data);
        })
      }
    },
    createNew: function() {
      this.setState({addNew: true});
      $('.packageData').addClass('crossFade');
      debugger;
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
            packageJSON.name = key;
            p[key]["formData"].id = key;
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
        this.state.gridOptions.api.setRowData(dataForTable);


    },
    componentDidMount: function() {
        var self = this;
        debugger;
        axios.get(config.formApi + "/vnf/getAllPackage").then(function(response) {
            self.processPackageData(response.data);
        })
        self.state.gridOptions.api.sizeColumnsToFit();
        dataService.registerGridData(this);
    }
});

module.exports = PackageData;
