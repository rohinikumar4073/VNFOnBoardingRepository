define([
    'react',
    'jquery',
    'jsx!components/Panel'
   ,'jsx!components/Login'
   ,'jsx!components/Signup'

], function(React, $, Panel,Login,Signup) {

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
                    {this.state.userName?
                        <Panel/>
                        :this.state.val == "signup"
                          ? <Signup/>
                          : this.state.val =="login"
                          ?  <Login setUserName={this.setUserName}/>
                          : <Login setUserName={this.setUserName}/>}
                    </div>
                </div>
            );
        }
    });

    return Body;
});
