var React = require("react");
var axios = require("axios"); 
var PackageGrid;
module.exports = {
    registerGridData: function(grid) {
        PackageGrid = grid;
    },
    refreshGridData: function() {
        axios.get(config.formApi + "/vnf/getAllPackage").then(function(response) {
            PackageGrid.processPackageData(response.data);
        })
        PackageGrid.state.gridOptions.api.sizeColumnsToFit();
    },
    openPackage: function(a, b) {
        PackageGrid.onSelectionGridChanged(a, b)
    }
};
