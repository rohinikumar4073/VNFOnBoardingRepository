import React from 'react';


var Alert = React.createClass({

  removeAlert: function() {
    // var {dispatch, alert} = this.props;
    // dispatch(removeAlert(alert.id));
    this.props.closePopup();
  },
  render: function() {
    var {alert, style} = this.props;
    return (
      <div className="alertDiv">
              <div className="modal-header">
                  <button type="button" className="close" onClick={this.removeAlert}>
                      &times;
                  </button>
                  <h3>Delete VNF</h3>
              </div>
              <div className="modal-body">
                <div style={{padding:'20px'}}>
                    <span>Are you sure you want to delete this VNF?</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button type="button" className="btn btn-sm btn-primary btn-save" onClick={this.props.deleteRecord}>
                      Delete
                    </button>
                    <button type="button" className="btn btn-sm btn-default  btn-cancel" onClick={this.removeAlert}>
                      Cancel
                    </button>
                  </div>
                </div>
        </div>
    );
  }
});

module.exports = Alert;
