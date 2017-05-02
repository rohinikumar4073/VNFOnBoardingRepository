/* Login Page */
var React = require('react');

var Signup = require('./Signup.jsx');

var Login = React.createClass({
    onClickFunc: function() {
        console.log("Inside onclick");
        return <Signup></Signup>;
    },

    render: function() {
        var signup = <Signup></Signup>;
        return (
            <div className="container loginWidget">
                <div className="login-header">
                    <div className="app-branding">
                        <img src="images/vz_logotab_115x115.png"/>
                        <a class="vzlogo1" href="#"></a>
                    </div>
                    <div className="app-header__body">
                        <h1>VNF Onboarding Portal</h1>
                    </div>
                </div>
                <div className="row main-section">
                    <div className="col-md-12 logForm">
                        <div className="signin__wrapper">
                            <div className="signin__new-users">
                                <h3>Create an account</h3>
                                <div className="signin__who-are-you">
                                    <h4>Tell us who you are. Select one of the items below.</h4>
                                    <a href="#" onClick={this.onClickFunc}>
                                        <span>VNF Planners,<br/>
                                            Onboarding Team</span>
                                        <img src="images/arrow__right-large.png"/>
                                    </a>
                                    <a href="#">
                                        <span>VNF Vendors,<br/>
                                            Operations,<br/>
                                            ME and Others...</span>
                                        <img src="images/arrow__right-large.png"/>
                                    </a>
                                </div>
                            </div>
                            <div className="signin__returning-user">
                                <h3>Returning users</h3>
                                <div className="loginPage">
                                    <div className="form-group input-transparent-field">
                                        <input type="text" id="user" className="form-control" placeholder="Name"/>
                                    </div>
                                    <div className="form-group input-transparent-field">
                                        <input type="password" id="password" className="form-control" placeholder=" Password"/>
                                    </div>
                                    <a href="#" onClick={this.props.setUserName} role="button" className="btn  btn-danger signin">Sign in</a>
                                </div>
                            </div>
                        </div>
                        <div className="signin__footer">
                            <h3>Need help?</h3>
                            <div>
                                <a href="#">For any questions or concerns, drop us a line.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});
module.exports = Login;
