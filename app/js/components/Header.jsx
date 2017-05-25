var React = require('react');
var Store = require('./../../Store.js');
var actions = require('./../../actions.js');
    var UserProfile = React.createClass({
        render: function() {
            return (
                <ul className="nav navbar-nav navbar-right userInfo">
			</ul>
            );
        }
    });
    var Header = React.createClass({
        render: function() {
            return (
                  <div className="header">
                             <nav className="navbar navbar-default">
                                <div className="container">
                                <div className="navbar-header">
                                    <a className="vzlogo" href="/"></a>
                                </div>
                                <h1 className="sublogo">VNF Exchange</h1>

                              <span className="contact">  Contact us</span>
                              <span className="pipe"></span>
                                <span className="phone-no">1-888-2323-122 </span>

                                <UserProfile></UserProfile>
                                </div>
                            </nav>
                </div>
            );
        }
    });
    module.exports = Header;
