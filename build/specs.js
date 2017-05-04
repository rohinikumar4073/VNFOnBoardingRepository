(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Store = require('./Store.js');
var actions = require('./actions.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      messages: Store.getMessages(),
      newMessage: ''
    };
  },
  componentWillMount: function componentWillMount() {
    Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function componentWillUnmount() {
    Store.removeChangeListener(this.changeState);
  },
  changeState: function changeState() {
    this.setState({
      messages: Store.getMessages()
    });
  },
  addMessage: function addMessage(event) {
    event.preventDefault();
    var input = this.refs.newMessage.getDOMNode();
    actions.addMessage(input.value);
    this.setState({
      newMessage: ''
    });
  },
  updateNewMessage: function updateNewMessage(event) {
    this.setState({
      newMessage: event.target.value
    });
  },
  renderMessages: function renderMessages(message) {
    return React.createElement(
      'div',
      null,
      message
    );
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      this.state.messages.map(this.renderMessages),
      React.createElement(
        'form',
        { onSubmit: this.addMessage },
        React.createElement('input', { ref: 'newMessage', type: 'text', value: this.state.newMessage, onChange: this.updateNewMessage })
      )
    );
  }

});

module.exports = App;

},{"./Store.js":"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\Store.js","./actions.js":"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\actions.js","react":"react"}],"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  messages: [],
  actions: [actions.addMessage],
  addMessage: function addMessage(message) {
    this.messages.push(message);
    this.emitChange();
  },
  exports: {
    getMessages: function getMessages() {
      return this.messages;
    }
  }
});

},{"./actions.js":"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\actions.js","flux-react":"flux-react"}],"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['addMessage']);

},{"flux-react":"flux-react"}],"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\specs\\App-spec.js":[function(require,module,exports){
"use strict";

var App = require('./../app/App.js');
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

describe("App", function () {

  it("should be wrapped with a div", function () {
    var app = TestUtils.renderIntoDocument(React.createElement(App, null));
    expect(app.getDOMNode().tagName).toEqual('DIV');
  });
});

},{"./../app/App.js":"C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\app\\App.js","react/addons":"react/addons"}]},{},["C:\\Users\\TEST\\Garima\\VNFOnboarding\\VNFOnBoardingRepository\\specs\\App-spec.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9URVNUL0dhcmltYS9WTkZPbmJvYXJkaW5nL1ZORk9uQm9hcmRpbmdSZXBvc2l0b3J5L2FwcC9BcHAuanMiLCJDOi9Vc2Vycy9URVNUL0dhcmltYS9WTkZPbmJvYXJkaW5nL1ZORk9uQm9hcmRpbmdSZXBvc2l0b3J5L2FwcC9TdG9yZS5qcyIsIkM6L1VzZXJzL1RFU1QvR2FyaW1hL1ZORk9uYm9hcmRpbmcvVk5GT25Cb2FyZGluZ1JlcG9zaXRvcnkvYXBwL2FjdGlvbnMuanMiLCJDOi9Vc2Vycy9URVNUL0dhcmltYS9WTkZPbmJvYXJkaW5nL1ZORk9uQm9hcmRpbmdSZXBvc2l0b3J5L3NwZWNzL0FwcC1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFdEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzFCLGlCQUFlLEVBQUUsMkJBQVk7QUFDM0IsV0FBTztBQUNMLGNBQVEsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFO0FBQzdCLGdCQUFVLEVBQUUsRUFBRTtLQUNmLENBQUM7R0FDSDtBQUNELG9CQUFrQixFQUFFLDhCQUFZO0FBQzlCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDM0M7QUFDRCxzQkFBb0IsRUFBRSxnQ0FBWTtBQUNoQyxTQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzlDO0FBQ0QsYUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLFFB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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlLmpzJyk7XHJcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XHJcblxyXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZXM6IFN0b3JlLmdldE1lc3NhZ2VzKCksXHJcbiAgICAgIG5ld01lc3NhZ2U6ICcnXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcclxuICB9LFxyXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbWVzc2FnZXM6IFN0b3JlLmdldE1lc3NhZ2VzKClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgYWRkTWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld01lc3NhZ2UuZ2V0RE9NTm9kZSgpO1xyXG4gICAgYWN0aW9ucy5hZGRNZXNzYWdlKGlucHV0LnZhbHVlKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBuZXdNZXNzYWdlOiAnJ1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVOZXdNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBuZXdNZXNzYWdlOiBldmVudC50YXJnZXQudmFsdWVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyTWVzc2FnZXM6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PnttZXNzYWdlfTwvZGl2PlxyXG4gICAgKTtcclxuICB9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG4gICAgICAgIHt0aGlzLnN0YXRlLm1lc3NhZ2VzLm1hcCh0aGlzLnJlbmRlck1lc3NhZ2VzKX1cclxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGRNZXNzYWdlfT5cclxuICAgICAgICAgIDxpbnB1dCByZWY9XCJuZXdNZXNzYWdlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5uZXdNZXNzYWdlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdNZXNzYWdlfS8+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cdFxyXG59KTtcclxuXHRcclxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XHJcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xyXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcclxuICBtZXNzYWdlczogW10sXHJcbiAgYWN0aW9uczogW1xyXG4gICAgYWN0aW9ucy5hZGRNZXNzYWdlXHJcbiAgXSxcclxuICBhZGRNZXNzYWdlOiBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfSxcclxuICBleHBvcnRzOiB7XHJcbiAgICBnZXRNZXNzYWdlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tZXNzYWdlcztcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVBY3Rpb25zKFtcclxuICAnYWRkTWVzc2FnZSdcclxuXSk7IiwidmFyIEFwcCA9IHJlcXVpcmUoJy4vLi4vYXBwL0FwcC5qcycpO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3QvYWRkb25zXCIpO1xyXG52YXIgVGVzdFV0aWxzID0gUmVhY3QuYWRkb25zLlRlc3RVdGlscztcclxuXHJcbmRlc2NyaWJlKFwiQXBwXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuICBpdChcInNob3VsZCBiZSB3cmFwcGVkIHdpdGggYSBkaXZcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgYXBwID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudCg8QXBwLz4pO1xyXG4gICAgZXhwZWN0KGFwcC5nZXRET01Ob2RlKCkudGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XHJcbiAgfSk7XHJcblxyXG59KTtcclxuIl19
