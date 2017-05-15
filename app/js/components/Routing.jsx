
var React = require('react');
var Store = require('./../../Store.js');
var actions = require('./../../actions.js');
var Login = require('./Login.jsx');
var Panel = require('./Panel.jsx');
var Signup = require('./Signup.jsx');
var $ = require('jquery');


    var RoutingFile = React.createClass({
      getInitialState: function() {
          return {userName:"",
            val:""
          };

      },

       setUserName:function(userName){
                  this.setState({userName:$("#user").val()})
                  $(".userName").html($("#user").val())
                  console.log("routing");
                  debugger;
                    this.setState({val:"login"})
            },
            goSignup: function(){
              debugger;
                       this.setState({val : "signup"})
               },
        render: function() {
            return (
              <div>
                  {this.state.userName ?
                      <Panel/>
                      : (this.state.val == "signup"
                      ? <Signup/>
                    :  <Login  goSignup ={this.goSignup} setUserName={this.setUserName}/>)
                      }
             </div>
            );
        }
    });

    module.exports = RoutingFile;
