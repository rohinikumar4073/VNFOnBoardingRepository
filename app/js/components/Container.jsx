

var React = require('react');
var Store = require('./../../Store.js');
var actions = require('./../../actions.js');
var Login = require('./Login.jsx');
var Signup=require('./Signup.jsx');
var $ = require('jquery');

    var Body = React.createClass({
        getInitialState: function() {
            return {userName:"",
              val:""
            };

        },

         setUserName:function(userName){
                    this.setState({userName:$("#user").val()})
                    $(".userName").html($("#user").val())
                    $(".header").css("visibility","visible")
                    this.setState({val : "login"})
            },
            goSignup: function(){
                       this.setState({val : "signup"})
               },
        render: function() {
            return (
                <div className={(this.props.className || '')}>
                    <div className="row">
                    {this.state.val== "login"
                    ? <Login/>
                  :( this.state.val == "signup"
                    ? <Signup/>
                  :<Login setUserName={this.setUserName}/>)}
                    </div>
                </div>
            );
        }
    });
    module.exports = Body;
