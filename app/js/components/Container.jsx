

var React = require('react');
var Store = require('./../../Store.js');
var actions = require('./../../actions.js');
var Login = require('./Login.jsx');
var $ = require('jquery');

    var Body = React.createClass({
        getInitialState: function() {
            return {userName:""};

        },

         setUserName:function(userName){
                    this.setState({userName:$("#user").val()})
                    $(".userName").html($("#user").val())
                    $(".header").css("visibility","visible")
            },

        render: function() {


            return (
                <div className={(this.props.className || '')}>
                    <div className="row">
                    {this.state.userName?
                        <Login/>:
                                <Login setUserName={this.setUserName}/>}

                    </div>
                </div>
            );
        }
    });
    module.exports = Body;
