(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\App.js":[function(require,module,exports){
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

},{"./Store.js":"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\Store.js","./actions.js":"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\actions.js","react":"react"}],"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\Store.js":[function(require,module,exports){
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

},{"./actions.js":"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\actions.js","flux-react":"flux-react"}],"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['addMessage']);

},{"flux-react":"flux-react"}],"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\specs\\App-spec.js":[function(require,module,exports){
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

},{"./../app/App.js":"C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\app\\App.js","react/addons":"react/addons"}]},{},["C:\\Users\\TEST\\Vishnu\\VNFOnBoardingRepository\\specs\\App-spec.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9URVNUL1Zpc2hudS9WTkZPbkJvYXJkaW5nUmVwb3NpdG9yeS9hcHAvQXBwLmpzIiwiQzovVXNlcnMvVEVTVC9WaXNobnUvVk5GT25Cb2FyZGluZ1JlcG9zaXRvcnkvYXBwL1N0b3JlLmpzIiwiQzovVXNlcnMvVEVTVC9WaXNobnUvVk5GT25Cb2FyZGluZ1JlcG9zaXRvcnkvYXBwL2FjdGlvbnMuanMiLCJDOi9Vc2Vycy9URVNUL1Zpc2hudS9WTkZPbkJvYXJkaW5nUmVwb3NpdG9yeS9zcGVjcy9BcHAtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNsQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXRDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU87QUFDTCxjQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM3QixnQkFBVSxFQUFFLEVBQUU7S0FDZixDQUFDO0dBQ0g7QUFDRCxvQkFBa0IsRUFBRSw4QkFBWTtBQUM5QixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQzNDO0FBQ0Qsc0JBQW9CLEVBQUUsZ0NBQVk7QUFDaEMsU0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztHQUM5QztBQUNELGFBQVcsRUFBRSx1QkFBWTtBQUN2QixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osY0FBUSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUU7S0FDOUIsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxZQUFVLEVBQUUsb0JBQVUsS0FBSyxFQUFFO0FBQzNCLFNBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM5QyxXQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZ0JBQVUsRUFBRSxFQUFFO0tBQ2YsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxrQkFBZ0IsRUFBRSwwQkFBVSxLQUFLLEVBQUU7QUFDakMsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGdCQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO0tBQy9CLENBQUMsQ0FBQztHQUNKO0FBQ0QsZ0JBQWMsRUFBRSx3QkFBVSxPQUFPLEVBQUU7QUFDakMsV0FDRTs7O01BQU0sT0FBTztLQUFPLENBQ3BCO0dBQ0g7QUFDRixRQUFNLEVBQUUsa0JBQVc7QUFDbEIsV0FDQzs7O01BQ00sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7TUFDN0M7O1VBQU0sUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUM7UUFDOUIsK0JBQU8sR0FBRyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUMsR0FBRTtPQUMvRjtLQUNILENBQ1I7R0FDRjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7O0FDckRyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDakMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUV0QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDaEMsVUFBUSxFQUFFLEVBQUU7QUFDWixTQUFPLEVBQUUsQ0FDUCxPQUFPLENBQUMsVUFBVSxDQUNuQjtBQUNELFlBQVUsRUFBRSxvQkFBVSxPQUFPLEVBQUU7QUFDN0IsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25CO0FBQ0QsU0FBTyxFQUFFO0FBQ1AsZUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0QjtHQUNGO0NBQ0YsQ0FBQyxDQUFDOzs7OztBQ2pCSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUNsQyxZQUFZLENBQ2IsQ0FBQyxDQUFDOzs7OztBQ0pILElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7QUFFdkMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFXOztBQUV6QixJQUFFLENBQUMsOEJBQThCLEVBQUUsWUFBVztBQUM1QyxRQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsb0JBQUMsR0FBRyxPQUFFLENBQUMsQ0FBQztBQUMvQyxVQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUNqRCxDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFN0b3JlID0gcmVxdWlyZSgnLi9TdG9yZS5qcycpO1xyXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xyXG5cclxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpLFxyXG4gICAgICBuZXdNZXNzYWdlOiAnJ1xyXG4gICAgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgU3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XHJcbiAgfSxcclxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIG1lc3NhZ2VzOiBTdG9yZS5nZXRNZXNzYWdlcygpXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGFkZE1lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBpbnB1dCA9IHRoaXMucmVmcy5uZXdNZXNzYWdlLmdldERPTU5vZGUoKTtcclxuICAgIGFjdGlvbnMuYWRkTWVzc2FnZShpbnB1dC52YWx1ZSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbmV3TWVzc2FnZTogJydcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdXBkYXRlTmV3TWVzc2FnZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbmV3TWVzc2FnZTogZXZlbnQudGFyZ2V0LnZhbHVlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlck1lc3NhZ2VzOiBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj57bWVzc2FnZX08L2Rpdj5cclxuICAgICk7XHJcbiAgfSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuICAgICAgICB7dGhpcy5zdGF0ZS5tZXNzYWdlcy5tYXAodGhpcy5yZW5kZXJNZXNzYWdlcyl9XHJcbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuYWRkTWVzc2FnZX0+XHJcbiAgICAgICAgICA8aW5wdXQgcmVmPVwibmV3TWVzc2FnZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUubmV3TWVzc2FnZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlTmV3TWVzc2FnZX0vPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHRcclxufSk7XHJcblx0XHJcbm1vZHVsZS5leHBvcnRzID0gQXBwO1xyXG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcclxudmFyIGFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZmx1eC5jcmVhdGVTdG9yZSh7XHJcbiAgbWVzc2FnZXM6IFtdLFxyXG4gIGFjdGlvbnM6IFtcclxuICAgIGFjdGlvbnMuYWRkTWVzc2FnZVxyXG4gIF0sXHJcbiAgYWRkTWVzc2FnZTogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH0sXHJcbiAgZXhwb3J0czoge1xyXG4gICAgZ2V0TWVzc2FnZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXM7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXHJcbiAgJ2FkZE1lc3NhZ2UnXHJcbl0pOyIsInZhciBBcHAgPSByZXF1aXJlKCcuLy4uL2FwcC9BcHAuanMnKTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0L2FkZG9uc1wiKTtcclxudmFyIFRlc3RVdGlscyA9IFJlYWN0LmFkZG9ucy5UZXN0VXRpbHM7XHJcblxyXG5kZXNjcmliZShcIkFwcFwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgaXQoXCJzaG91bGQgYmUgd3JhcHBlZCB3aXRoIGEgZGl2XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFwcCA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoPEFwcC8+KTtcclxuICAgIGV4cGVjdChhcHAuZ2V0RE9NTm9kZSgpLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xyXG4gIH0pO1xyXG5cclxufSk7XHJcbiJdfQ==
