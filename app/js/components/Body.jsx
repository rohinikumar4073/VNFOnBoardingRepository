define([
    'react',
    'jquery',
    'jsx!components/Panel'
   ,'jsx!components/Login'

], function(React, $, Panel,Login) {

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
                        <Panel/>:
                                <Login setUserName={this.setUserName}/>}

                    </div>
                </div>
            );
        }
    });

    return Body;
});
