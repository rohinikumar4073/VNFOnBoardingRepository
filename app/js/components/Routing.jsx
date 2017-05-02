
var React = require('react');
var Store = require('./../../Store.js');
var actions = require('./../../actions.js');
var Login = require('./Login.jsx');
var Panel = require('./Panel.jsx');
var $ = require('jquery');


    var RoutingFile = React.createClass({
      getInitialState: function() {
          return {userName:""};

      },

       setUserName:function(userName){
                  this.setState({userName:$("#user").val()})
                  $(".userName").html($("#user").val())
            },

        render: function() {
            return (
              <div>
                  {this.state.userName?
                      <Panel/>:
                    <Login setUserName={this.setUserName}/>}
             </div>
            );
        }
    });

    module.exports = RoutingFile;
