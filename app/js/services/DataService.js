var React = require("react");
var axios = require("axios");
var config = require("./../properties/config.js");

var PackageGrid;
var HomePage;
var userName;
var packageName
module.exports = {
    registerHomePage:function(home){
      HomePage=home;
    },
    registerGridData: function(grid) {
        PackageGrid = grid;
    },registerPackageName: function(name) {
        packageName = name;
    },
    registerUserName:function(name){
      userName=name;
    },
    refreshGridData: function() {
        axios.get(config.formApi + "/vnfForm/getAllPackage").then(function(response) {
            PackageGrid.processPackageData(response.data);
        })
        PackageGrid.state.gridOptions.api.sizeColumnsToFit();
    },
    openPackage: function(a, b) {
        PackageGrid.onSelectionGridChanged(a, b);
    },saveandUpdateData: function(data, callback) {
      var savePackageUrl=config.formApi+ "/vnfForm/"+userName+"/"+packageName+"/saveFormData";
          var self=this;
          var postData={
              formData: data,
              userId:userName,
              id:packageName
          };
          axios.post(savePackageUrl, postData).then(function(response) {
            HomePage.setState({formData:data})
            callback()
          }).catch(function(error) {

              //self.setState({loaderOn: false});
          });
      }
};
