(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/App.js":[function(require,module,exports){
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

},{"./Store.js":"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/Store.js","./actions.js":"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/actions.js","react":"react"}],"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/Store.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
  formData: {},
  actions: [actions.addData],
  addData: function addData(data) {
    this.formData = data;
    this.emitChange();
  },
  exports: {
    getData: function getData() {
      return this.formData;
    }
  }
});

},{"./actions.js":"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/actions.js","flux-react":"flux-react"}],"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['addData']);

},{"flux-react":"flux-react"}],"/home/invlab07/Sravani/VNF/master/vnf_exchange/specs/App-spec.js":[function(require,module,exports){
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

},{"./../app/App.js":"/home/invlab07/Sravani/VNF/master/vnf_exchange/app/App.js","react/addons":"react/addons"}]},{},["/home/invlab07/Sravani/VNF/master/vnf_exchange/specs/App-spec.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9pbnZsYWIwNy9TcmF2YW5pL1ZORi9tYXN0ZXIvdm5mX2V4Y2hhbmdlL2FwcC9BcHAuanMiLCIvaG9tZS9pbnZsYWIwNy9TcmF2YW5pL1ZORi9tYXN0ZXIvdm5mX2V4Y2hhbmdlL2FwcC9TdG9yZS5qcyIsIi9ob21lL2ludmxhYjA3L1NyYXZhbmkvVk5GL21hc3Rlci92bmZfZXhjaGFuZ2UvYXBwL2FjdGlvbnMuanMiLCIvaG9tZS9pbnZsYWIwNy9TcmF2YW5pL1ZORi9tYXN0ZXIvdm5mX2V4Y2hhbmdlL3NwZWNzL0FwcC1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFdEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzFCLGlCQUFlLEVBQUUsMkJBQVk7QUFDM0IsV0FBTztBQUNMLGNBQVEsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFO0FBQzdCLGdCQUFVLEVBQUUsRUFBRTtLQUNmLENBQUM7R0FDSDtBQUNELG9CQUFrQixFQUFFLDhCQUFZO0FBQzlCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDM0M7QUFDRCxzQkFBb0IsRUFBRSxnQ0FBWTtBQUNoQyxTQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzlDO0FBQ0QsYUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtLQUM5QixDQUFDLENBQUM7R0FDSjtBQUNELFlBQVUsRUFBRSxvQkFBVSxLQUFLLEVBQUU7QUFDM0IsU0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLFFBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzlDLFdBQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixnQkFBVSxFQUFFLEVBQUU7S0FDZixDQUFDLENBQUM7R0FDSjtBQUNELGtCQUFnQixFQUFFLDBCQUFVLEtBQUssRUFBRTtBQUNqQyxRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZ0JBQVUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7S0FDL0IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxnQkFBYyxFQUFFLHdCQUFVLE9BQU8sRUFBRTtBQUNqQyxXQUNFOzs7TUFBTSxPQUFPO0tBQU8sQ0FDcEI7R0FDSDtBQUNGLFFBQU0sRUFBRSxrQkFBVztBQUNsQixXQUNDOzs7TUFDTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztNQUM3Qzs7VUFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQUFBQztRQUM5QiwrQkFBTyxHQUFHLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQyxHQUFFO09BQy9GO0tBQ0gsQ0FDUjtHQUNGOztDQUVELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7Ozs7QUNyRHJCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNqQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUNoQyxVQUFRLEVBQUUsRUFBRTtBQUNaLFNBQU8sRUFBRSxDQUNQLE9BQU8sQ0FBQyxPQUFPLENBQ2hCO0FBQ0QsU0FBTyxFQUFFLGlCQUFVLElBQUksRUFBRTtBQUN2QixRQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQztBQUNuQixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7QUFDRCxTQUFPLEVBQUU7QUFDUCxXQUFPLEVBQUUsbUJBQVk7QUFDbkIsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCO0dBQ0Y7Q0FDRixDQUFDLENBQUM7Ozs7O0FDakJILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ2xDLFNBQVMsQ0FDVixDQUFDLENBQUM7Ozs7O0FDSkgsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3BDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOztBQUV2QyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVc7O0FBRXpCLElBQUUsQ0FBQyw4QkFBOEIsRUFBRSxZQUFXO0FBQzVDLFFBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBQyxHQUFHLE9BQUUsQ0FBQyxDQUFDO0FBQy9DLFVBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ2pELENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpLFxuICAgICAgbmV3TWVzc2FnZTogJydcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcbiAgfSxcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpXG4gICAgfSk7XG4gIH0sXG4gIGFkZE1lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlucHV0ID0gdGhpcy5yZWZzLm5ld01lc3NhZ2UuZ2V0RE9NTm9kZSgpO1xuICAgIGFjdGlvbnMuYWRkTWVzc2FnZShpbnB1dC52YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXdNZXNzYWdlOiAnJ1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGVOZXdNZXNzYWdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5ld01lc3NhZ2U6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9LFxuICByZW5kZXJNZXNzYWdlczogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj57bWVzc2FnZX08L2Rpdj5cbiAgICApO1xuICB9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlcy5tYXAodGhpcy5yZW5kZXJNZXNzYWdlcyl9XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmFkZE1lc3NhZ2V9PlxuICAgICAgICAgIDxpbnB1dCByZWY9XCJuZXdNZXNzYWdlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5uZXdNZXNzYWdlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVOZXdNZXNzYWdlfS8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0XG59KTtcblx0XG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgZm9ybURhdGE6IHt9LFxuICBhY3Rpb25zOiBbXG4gICAgYWN0aW9ucy5hZGREYXRhXG4gIF0sXG4gIGFkZERhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YT1kYXRhO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9LFxuICBleHBvcnRzOiB7XG4gICAgZ2V0RGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybURhdGE7XG4gICAgfVxuICB9XG59KTtcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICdhZGREYXRhJ1xuXSk7XG4iLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi8uLi9hcHAvQXBwLmpzJyk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3QvYWRkb25zXCIpO1xudmFyIFRlc3RVdGlscyA9IFJlYWN0LmFkZG9ucy5UZXN0VXRpbHM7XG5cbmRlc2NyaWJlKFwiQXBwXCIsIGZ1bmN0aW9uKCkge1xuXG4gIGl0KFwic2hvdWxkIGJlIHdyYXBwZWQgd2l0aCBhIGRpdlwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXBwID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudCg8QXBwLz4pO1xuICAgIGV4cGVjdChhcHAuZ2V0RE9NTm9kZSgpLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICB9KTtcblxufSk7XG4iXX0=
