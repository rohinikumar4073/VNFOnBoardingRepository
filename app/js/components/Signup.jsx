/* Login Page */
var React = require('react');

var Signup = React.createClass({
        render: function() {
           return (
               <div className="container loginWidget">
                    <div className="login-header">
                        <div className="app-branding">
                            <img src="css/images/vz_logotab_115x115.png" />
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
                                      <div className="loginPage">
                                             <div className="form-group input-transparent-field">
                                                  <input type="text" id="user" className="form-control" placeholder="Name"/>
                                             </div>
                                             <div className="form-group input-transparent-field">
                                                      <input type="password" id="password" className="form-control" placeholder=" Password"/>
                                             </div>
                                              <a href="#"  onClick={this.props.setUserName} role="button" className="btn  btn-danger signin">Sign Up</a>
                                     </div>
                                </div>

                            </div>
                            <div className="signin__footer">
                                <h3>Need help?</h3>
                                <div><a href="#">For any questions or concerns, drop us a line.</a></div>
                            </div>
                        </div>
                    </div>
               </div>
           );
        }

    });

module.exports=Signup;
