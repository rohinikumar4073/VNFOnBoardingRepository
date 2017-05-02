var React =require("react")
var dataService =require("./../../services/DataService")


  var CreateFormCustomEdit = React.createClass({
    getInitialState: function(){
      return{};
    },
    componentDidMount: function(){
    },
    // handleClick: function(status){
    //   this.setState({is_dac: status});
    //   renderService.setRadioStatus(this.props.rowIndex,this.props.data,status);
    // },
    openPackage:function(){

      dataService.openPackage(this.props.data.data,this.props.data.name);
    },
    render: function() {

      return(
          <div>
            <i className="glyphicon glyphicon-pencil" onClick={this.openPackage}></i>
          </div>
        );
  }
});
module.export=CreateFormCustomEdit;
