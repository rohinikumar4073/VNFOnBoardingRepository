var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  formData: {},
  actions: [
    actions.addData
  ],
  addData: function (data) {
    this.formData=data;
    this.emitChange();
  },
  exports: {
    getData: function () {
      return this.formData;
    }
  }
});
