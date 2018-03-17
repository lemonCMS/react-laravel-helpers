(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "lodash/partial", "react", "prop-types", "classnames"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("lodash/partial"), require("react"), require("prop-types"), require("classnames"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.partial, global.react, global.propTypes, global.classnames);
    global.Paginator = mod.exports;
  }
})(this, function (_exports, _partial2, _react, _propTypes, _classnames) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  _partial2 = _interopRequireDefault(_partial2);
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _classnames = _interopRequireDefault(_classnames);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  var Paginator =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Paginator, _React$Component);

    function Paginator() {
      var _this;

      _this = _React$Component.call(this) || this;
      _this.prevPageClicked = _this.prevPageClicked.bind(_assertThisInitialized(_this));
      _this.nextPageClicked = _this.nextPageClicked.bind(_assertThisInitialized(_this));
      _this.pageClicked = _this.pageClicked.bind(_assertThisInitialized(_this));
      _this.renderPrevious = _this.renderPrevious.bind(_assertThisInitialized(_this));
      _this.renderNext = _this.renderNext.bind(_assertThisInitialized(_this));
      _this.renderDots = _this.renderDots.bind(_assertThisInitialized(_this));
      _this.renderNumber = _this.renderNumber.bind(_assertThisInitialized(_this));
      _this.renderRange = _this.renderRange.bind(_assertThisInitialized(_this));
      _this.renderStart = _this.renderStart.bind(_assertThisInitialized(_this));
      _this.renderFinish = _this.renderFinish.bind(_assertThisInitialized(_this));
      _this.renderAdjacentRange = _this.renderAdjacentRange.bind(_assertThisInitialized(_this));
      _this.renderSlider = _this.renderSlider.bind(_assertThisInitialized(_this));
      _this.renderFinish = _this.renderFinish.bind(_assertThisInitialized(_this));
      _this.renderFinish = _this.renderFinish.bind(_assertThisInitialized(_this));
      _this.renderFinish = _this.renderFinish.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = Paginator.prototype;

    _proto.prevPageClicked = function prevPageClicked(evt) {
      evt.preventDefault();

      if (this.props.currPage > 1) {
        this.props.onChange(Number(this.props.currPage) - 1);
      }
    };

    _proto.nextPageClicked = function nextPageClicked(evt) {
      evt.preventDefault();

      if (this.props.currPage < this.props.lastPage) {
        this.props.onChange(Number(this.props.currPage) + 1);
      }
    };

    _proto.pageClicked = function pageClicked(pageNum, evt) {
      evt.preventDefault();

      if (this.props.currPage !== pageNum) {
        this.props.onChange(Number(pageNum));
      }
    };

    _proto.renderPrevious = function renderPrevious() {
      var classStr = (0, _classnames.default)({
        disabled: this.props.currPage <= 1
      });
      return _react.default.createElement("li", {
        key: "prev",
        className: classStr
      }, _react.default.createElement("a", {
        href: "#",
        rel: "prev",
        onClick: this.prevPageClicked
      }, "\xAB"));
    };

    _proto.renderNext = function renderNext() {
      var classStr = (0, _classnames.default)({
        disabled: this.props.currPage >= this.props.lastPage
      });
      return _react.default.createElement("li", {
        key: "next",
        className: classStr
      }, _react.default.createElement("a", {
        href: "#",
        rel: "next",
        onClick: this.nextPageClicked
      }, "\xBB"));
    };

    _proto.renderDots = function renderDots(key) {
      return _react.default.createElement("li", {
        key: key,
        className: "disabled"
      }, _react.default.createElement("span", null, "..."));
    };

    _proto.renderNumber = function renderNumber(num) {
      var classStr = (0, _classnames.default)({
        active: this.props.currPage === num
      });
      return _react.default.createElement("li", {
        key: num,
        className: classStr
      }, _react.default.createElement("a", {
        href: "#",
        onClick: (0, _partial2.default)(this.pageClicked, num)
      }, num));
    };

    _proto.renderRange = function renderRange(firstNum, lastNum) {
      var pages = [];

      for (var i = firstNum; i <= lastNum; i++) {
        pages.push(this.renderNumber(i));
      }

      return pages;
    };

    _proto.renderStart = function renderStart() {
      var pages = this.renderRange(1, 2);
      pages.push(this.renderDots('dots-start'));
      return pages;
    };

    _proto.renderFinish = function renderFinish() {
      var pages = this.renderRange(this.props.lastPage - 1, this.props.lastPage);
      pages.unshift(this.renderDots('dots-finish'));
      return pages;
    };

    _proto.renderAdjacentRange = function renderAdjacentRange() {
      return this.renderRange(this.props.currPage - 2, this.props.currPage + 2);
    };

    _proto.renderSlider = function renderSlider() {
      var sliderNum = 6;
      var buttons = [];

      if (this.props.currPage <= sliderNum) {
        buttons = buttons.concat(this.renderRange(1, sliderNum + 2));
        buttons = buttons.concat(this.renderFinish());
      } else if (this.props.currPage >= this.props.lastPage - sliderNum) {
        buttons = buttons.concat(this.renderStart());
        buttons = buttons.concat(this.renderRange(this.props.lastPage - sliderNum, this.props.lastPage));
      } else {
        buttons = buttons.concat(this.renderStart());
        buttons = buttons.concat(this.renderAdjacentRange());
        buttons = buttons.concat(this.renderFinish());
      }

      return buttons;
    };

    _proto.render = function render() {
      var buttons = [];
      buttons.push(this.renderPrevious());

      if (this.props.lastPage <= 13) {
        buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
      } else {
        buttons = buttons.concat(this.renderSlider());
      }

      buttons.push(this.renderNext());
      return _react.default.createElement("div", {
        className: "text-center"
      }, _react.default.createElement("ul", {
        className: "pagination"
      }, buttons));
    };

    return Paginator;
  }(_react.default.Component);

  Paginator.propTypes = {
    currPage: _propTypes.default.number.isRequired,
    lastPage: _propTypes.default.number.isRequired,
    onChange: _propTypes.default.func.isRequired
  };
  var _default = Paginator;
  _exports.default = _default;
});