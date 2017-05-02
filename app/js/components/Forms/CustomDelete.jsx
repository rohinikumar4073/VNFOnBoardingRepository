var React = require("react")
var DataService = require("./../../services/DataService");
var toastr = require("toastr");
var axios = require("axios");
var config=require("./../../properties/config.js");

var CreateFormCustomDelete = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {},
    // handleClick: function(status){
    //   this.setState({is_dac: status});
    //   renderService.setRadioStatus(this.props.rowIndex,this.props.data,status);
    // },
    deleteVNF: function() {
        var self = this;

        var sureDel = confirm("Please confirm to delete VNF");
        if (!sureDel) {
            return;
        } else {
            var vnfProductName = this.props.data.name;
            var deleteURL = config.formApi + "/vnf/" + vnfProductName + "/deleteForm";

            axios.delete(deleteURL).then(function(response) {
                toastr.success("VNF Deleted successfully!");
                DataService.refreshGridData()

                self.props.api.refreshView();

            })
        }
    },
    render: function() {

        return (
            <div>
                <i className="glyphicon glyphicon-trash" onClick={this.deleteVNF}></i>
            </div>
        );
    }
});
module.exports = CreateFormCustomDelete;
