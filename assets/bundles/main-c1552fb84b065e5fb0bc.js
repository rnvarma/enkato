/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function () {

	    __webpack_require__(1);
	    __webpack_require__(25);

	    var React = __webpack_require__(27);
	    var ReactDOM = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function getCookie(name) {
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = $.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == name + '=') {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }

	    csrftoken = getCookie('csrftoken');

	    var Comment = React.createClass({
	        displayName: "Comment",

	        render: function () {
	            return React.createElement(
	                "div",
	                { className: "comment" },
	                React.createElement(
	                    "h2",
	                    { className: "author" },
	                    this.props.author
	                ),
	                React.createElement(
	                    "div",
	                    { className: "comment-text" },
	                    this.props.children
	                )
	            );
	        }
	    });

	    var CommentList = React.createClass({
	        displayName: "CommentList",

	        render: function () {
	            var commentNodes = this.props.data.map(function (comment) {
	                return React.createElement(
	                    Comment,
	                    { author: comment.author, key: comment.id },
	                    comment.text
	                );
	            });
	            return React.createElement(
	                "div",
	                { className: "commentList" },
	                commentNodes
	            );
	        }
	    });

	    var CommentForm = React.createClass({
	        displayName: "CommentForm",

	        getInitialState: function () {
	            return { author: '', text: '' };
	        },
	        handleAuthorChange: function (e) {
	            this.setState({ author: e.target.value });
	        },
	        handleTextChange: function (e) {
	            this.setState({ text: e.target.value });
	        },
	        handleSubmit: function (e) {
	            e.preventDefault();
	            var author = this.state.author.trim();
	            var text = this.state.text.trim();
	            if (!text || !author) {
	                return;
	            }
	            this.props.onCommentSubmit({ author: author, text: text });
	            this.setState({ author: '', text: '' });
	        },
	        render: function () {
	            return React.createElement(
	                "form",
	                { className: "commentForm", onSubmit: this.handleSubmit },
	                React.createElement("input", {
	                    type: "text",
	                    placeholder: "Your name..",
	                    value: this.state.author,
	                    onChange: this.handleAuthorChange }),
	                React.createElement("input", {
	                    type: "text",
	                    placeholder: "Say something",
	                    value: this.state.text,
	                    onChange: this.handleTextChange }),
	                React.createElement(
	                    "button",
	                    { type: "submit", value: "Post" },
	                    "Submit!"
	                )
	            );
	        }
	    });

	    var CommentBox = React.createClass({
	        displayName: "CommentBox",

	        getInitialState: function () {
	            return { data: [] };
	        },
	        loadDataFromServer: function () {
	            $.ajax({
	                url: this.props.url,
	                dataType: 'json',
	                cache: false,
	                success: function (data) {
	                    this.setState({ data: data });
	                }.bind(this),
	                error: function (xhr, status, err) {
	                    console.error(this.props.url, status, err.toString());
	                }.bind(this)
	            });
	        },
	        onCommentSubmit: function (comment) {
	            $.ajax({
	                url: this.props.url,
	                dataType: 'json',
	                type: 'POST',
	                data: comment,
	                beforeSend: function (xhr) {
	                    xhr.withCredentials = true;
	                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
	                },
	                success: function (data) {
	                    this.setState({ data: data });
	                }.bind(this),
	                error: function (xhr, status, err) {
	                    console.error(this.props.url, status, err.toString());
	                }.bind(this)
	            });
	        },
	        componentDidMount: function () {
	            this.loadDataFromServer();
	            setInterval(this.loadDataFromServer, this.props.pollInterval);
	        },
	        render: function () {
	            return React.createElement(
	                "div",
	                { className: "commentBox" },
	                React.createElement(
	                    "h1",
	                    null,
	                    "Comments!"
	                ),
	                React.createElement(CommentList, { data: this.state.data }),
	                React.createElement(CommentForm, { onCommentSubmit: this.onCommentSubmit })
	            );
	        }
	    });

	    ReactDOM.render(React.createElement(CommentBox, { url: "/1/allcomments", pollInterval: 2000 }), document.getElementById('react-app'));
	}).call(window);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	__webpack_require__(2);

	}.call(window));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__ (3);
	__webpack_require__ (12);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./../resolve-url-loader/index.js!./../sass-loader/index.js?sourceMap!./lib/bootstrap.styles.loader.js!./../imports-loader/index.js?jQuery=jquery,$=jquery,this=>window!./../imports-loader/index.js?jQuery=jquery,$=jquery,this=>window!./no-op.js", function() {
				var newContent = require("!!./../css-loader/index.js!./../resolve-url-loader/index.js!./../sass-loader/index.js?sourceMap!./lib/bootstrap.styles.loader.js!./../imports-loader/index.js?jQuery=jquery,$=jquery,this=>window!./../imports-loader/index.js?jQuery=jquery,$=jquery,this=>window!./no-op.js");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\nbody {\n  margin: 0;\n}\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n[hidden],\ntemplate {\n  display: none;\n}\n\na {\n  background-color: transparent;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\nb,\nstrong {\n  font-weight: bold;\n}\n\ndfn {\n  font-style: italic;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nimg {\n  border: 0;\n}\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\nfigure {\n  margin: 1em 40px;\n}\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\npre {\n  overflow: auto;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\n\nbutton {\n  overflow: visible;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\ninput {\n  line-height: normal;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box;\n}\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\nlegend {\n  border: 0;\n  padding: 0;\n}\n\ntextarea {\n  overflow: auto;\n}\n\noptgroup {\n  font-weight: bold;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n\n  .navbar {\n    display: none;\n  }\n\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n\n  .label {\n    border: 1px solid #000;\n  }\n\n  .table {\n    border-collapse: collapse !important;\n  }\n\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(" + __webpack_require__(6) + ");\n  src: url(" + __webpack_require__(6) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(7) + ") format(\"woff2\"), url(" + __webpack_require__(8) + ") format(\"woff\"), url(" + __webpack_require__(9) + ") format(\"truetype\"), url(" + __webpack_require__(10) + ") format(\"svg\");\n}\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.glyphicon-asterisk:before {\n  content: \"*\";\n}\n\n.glyphicon-plus:before {\n  content: \"+\";\n}\n\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20AC\";\n}\n\n.glyphicon-minus:before {\n  content: \"\\2212\";\n}\n\n.glyphicon-cloud:before {\n  content: \"\\2601\";\n}\n\n.glyphicon-envelope:before {\n  content: \"\\2709\";\n}\n\n.glyphicon-pencil:before {\n  content: \"\\270F\";\n}\n\n.glyphicon-glass:before {\n  content: \"\\E001\";\n}\n\n.glyphicon-music:before {\n  content: \"\\E002\";\n}\n\n.glyphicon-search:before {\n  content: \"\\E003\";\n}\n\n.glyphicon-heart:before {\n  content: \"\\E005\";\n}\n\n.glyphicon-star:before {\n  content: \"\\E006\";\n}\n\n.glyphicon-star-empty:before {\n  content: \"\\E007\";\n}\n\n.glyphicon-user:before {\n  content: \"\\E008\";\n}\n\n.glyphicon-film:before {\n  content: \"\\E009\";\n}\n\n.glyphicon-th-large:before {\n  content: \"\\E010\";\n}\n\n.glyphicon-th:before {\n  content: \"\\E011\";\n}\n\n.glyphicon-th-list:before {\n  content: \"\\E012\";\n}\n\n.glyphicon-ok:before {\n  content: \"\\E013\";\n}\n\n.glyphicon-remove:before {\n  content: \"\\E014\";\n}\n\n.glyphicon-zoom-in:before {\n  content: \"\\E015\";\n}\n\n.glyphicon-zoom-out:before {\n  content: \"\\E016\";\n}\n\n.glyphicon-off:before {\n  content: \"\\E017\";\n}\n\n.glyphicon-signal:before {\n  content: \"\\E018\";\n}\n\n.glyphicon-cog:before {\n  content: \"\\E019\";\n}\n\n.glyphicon-trash:before {\n  content: \"\\E020\";\n}\n\n.glyphicon-home:before {\n  content: \"\\E021\";\n}\n\n.glyphicon-file:before {\n  content: \"\\E022\";\n}\n\n.glyphicon-time:before {\n  content: \"\\E023\";\n}\n\n.glyphicon-road:before {\n  content: \"\\E024\";\n}\n\n.glyphicon-download-alt:before {\n  content: \"\\E025\";\n}\n\n.glyphicon-download:before {\n  content: \"\\E026\";\n}\n\n.glyphicon-upload:before {\n  content: \"\\E027\";\n}\n\n.glyphicon-inbox:before {\n  content: \"\\E028\";\n}\n\n.glyphicon-play-circle:before {\n  content: \"\\E029\";\n}\n\n.glyphicon-repeat:before {\n  content: \"\\E030\";\n}\n\n.glyphicon-refresh:before {\n  content: \"\\E031\";\n}\n\n.glyphicon-list-alt:before {\n  content: \"\\E032\";\n}\n\n.glyphicon-lock:before {\n  content: \"\\E033\";\n}\n\n.glyphicon-flag:before {\n  content: \"\\E034\";\n}\n\n.glyphicon-headphones:before {\n  content: \"\\E035\";\n}\n\n.glyphicon-volume-off:before {\n  content: \"\\E036\";\n}\n\n.glyphicon-volume-down:before {\n  content: \"\\E037\";\n}\n\n.glyphicon-volume-up:before {\n  content: \"\\E038\";\n}\n\n.glyphicon-qrcode:before {\n  content: \"\\E039\";\n}\n\n.glyphicon-barcode:before {\n  content: \"\\E040\";\n}\n\n.glyphicon-tag:before {\n  content: \"\\E041\";\n}\n\n.glyphicon-tags:before {\n  content: \"\\E042\";\n}\n\n.glyphicon-book:before {\n  content: \"\\E043\";\n}\n\n.glyphicon-bookmark:before {\n  content: \"\\E044\";\n}\n\n.glyphicon-print:before {\n  content: \"\\E045\";\n}\n\n.glyphicon-camera:before {\n  content: \"\\E046\";\n}\n\n.glyphicon-font:before {\n  content: \"\\E047\";\n}\n\n.glyphicon-bold:before {\n  content: \"\\E048\";\n}\n\n.glyphicon-italic:before {\n  content: \"\\E049\";\n}\n\n.glyphicon-text-height:before {\n  content: \"\\E050\";\n}\n\n.glyphicon-text-width:before {\n  content: \"\\E051\";\n}\n\n.glyphicon-align-left:before {\n  content: \"\\E052\";\n}\n\n.glyphicon-align-center:before {\n  content: \"\\E053\";\n}\n\n.glyphicon-align-right:before {\n  content: \"\\E054\";\n}\n\n.glyphicon-align-justify:before {\n  content: \"\\E055\";\n}\n\n.glyphicon-list:before {\n  content: \"\\E056\";\n}\n\n.glyphicon-indent-left:before {\n  content: \"\\E057\";\n}\n\n.glyphicon-indent-right:before {\n  content: \"\\E058\";\n}\n\n.glyphicon-facetime-video:before {\n  content: \"\\E059\";\n}\n\n.glyphicon-picture:before {\n  content: \"\\E060\";\n}\n\n.glyphicon-map-marker:before {\n  content: \"\\E062\";\n}\n\n.glyphicon-adjust:before {\n  content: \"\\E063\";\n}\n\n.glyphicon-tint:before {\n  content: \"\\E064\";\n}\n\n.glyphicon-edit:before {\n  content: \"\\E065\";\n}\n\n.glyphicon-share:before {\n  content: \"\\E066\";\n}\n\n.glyphicon-check:before {\n  content: \"\\E067\";\n}\n\n.glyphicon-move:before {\n  content: \"\\E068\";\n}\n\n.glyphicon-step-backward:before {\n  content: \"\\E069\";\n}\n\n.glyphicon-fast-backward:before {\n  content: \"\\E070\";\n}\n\n.glyphicon-backward:before {\n  content: \"\\E071\";\n}\n\n.glyphicon-play:before {\n  content: \"\\E072\";\n}\n\n.glyphicon-pause:before {\n  content: \"\\E073\";\n}\n\n.glyphicon-stop:before {\n  content: \"\\E074\";\n}\n\n.glyphicon-forward:before {\n  content: \"\\E075\";\n}\n\n.glyphicon-fast-forward:before {\n  content: \"\\E076\";\n}\n\n.glyphicon-step-forward:before {\n  content: \"\\E077\";\n}\n\n.glyphicon-eject:before {\n  content: \"\\E078\";\n}\n\n.glyphicon-chevron-left:before {\n  content: \"\\E079\";\n}\n\n.glyphicon-chevron-right:before {\n  content: \"\\E080\";\n}\n\n.glyphicon-plus-sign:before {\n  content: \"\\E081\";\n}\n\n.glyphicon-minus-sign:before {\n  content: \"\\E082\";\n}\n\n.glyphicon-remove-sign:before {\n  content: \"\\E083\";\n}\n\n.glyphicon-ok-sign:before {\n  content: \"\\E084\";\n}\n\n.glyphicon-question-sign:before {\n  content: \"\\E085\";\n}\n\n.glyphicon-info-sign:before {\n  content: \"\\E086\";\n}\n\n.glyphicon-screenshot:before {\n  content: \"\\E087\";\n}\n\n.glyphicon-remove-circle:before {\n  content: \"\\E088\";\n}\n\n.glyphicon-ok-circle:before {\n  content: \"\\E089\";\n}\n\n.glyphicon-ban-circle:before {\n  content: \"\\E090\";\n}\n\n.glyphicon-arrow-left:before {\n  content: \"\\E091\";\n}\n\n.glyphicon-arrow-right:before {\n  content: \"\\E092\";\n}\n\n.glyphicon-arrow-up:before {\n  content: \"\\E093\";\n}\n\n.glyphicon-arrow-down:before {\n  content: \"\\E094\";\n}\n\n.glyphicon-share-alt:before {\n  content: \"\\E095\";\n}\n\n.glyphicon-resize-full:before {\n  content: \"\\E096\";\n}\n\n.glyphicon-resize-small:before {\n  content: \"\\E097\";\n}\n\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\";\n}\n\n.glyphicon-gift:before {\n  content: \"\\E102\";\n}\n\n.glyphicon-leaf:before {\n  content: \"\\E103\";\n}\n\n.glyphicon-fire:before {\n  content: \"\\E104\";\n}\n\n.glyphicon-eye-open:before {\n  content: \"\\E105\";\n}\n\n.glyphicon-eye-close:before {\n  content: \"\\E106\";\n}\n\n.glyphicon-warning-sign:before {\n  content: \"\\E107\";\n}\n\n.glyphicon-plane:before {\n  content: \"\\E108\";\n}\n\n.glyphicon-calendar:before {\n  content: \"\\E109\";\n}\n\n.glyphicon-random:before {\n  content: \"\\E110\";\n}\n\n.glyphicon-comment:before {\n  content: \"\\E111\";\n}\n\n.glyphicon-magnet:before {\n  content: \"\\E112\";\n}\n\n.glyphicon-chevron-up:before {\n  content: \"\\E113\";\n}\n\n.glyphicon-chevron-down:before {\n  content: \"\\E114\";\n}\n\n.glyphicon-retweet:before {\n  content: \"\\E115\";\n}\n\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\";\n}\n\n.glyphicon-folder-close:before {\n  content: \"\\E117\";\n}\n\n.glyphicon-folder-open:before {\n  content: \"\\E118\";\n}\n\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\";\n}\n\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\";\n}\n\n.glyphicon-hdd:before {\n  content: \"\\E121\";\n}\n\n.glyphicon-bullhorn:before {\n  content: \"\\E122\";\n}\n\n.glyphicon-bell:before {\n  content: \"\\E123\";\n}\n\n.glyphicon-certificate:before {\n  content: \"\\E124\";\n}\n\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\";\n}\n\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\";\n}\n\n.glyphicon-hand-right:before {\n  content: \"\\E127\";\n}\n\n.glyphicon-hand-left:before {\n  content: \"\\E128\";\n}\n\n.glyphicon-hand-up:before {\n  content: \"\\E129\";\n}\n\n.glyphicon-hand-down:before {\n  content: \"\\E130\";\n}\n\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\";\n}\n\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\";\n}\n\n.glyphicon-circle-arrow-up:before {\n  content: \"\\E133\";\n}\n\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\";\n}\n\n.glyphicon-globe:before {\n  content: \"\\E135\";\n}\n\n.glyphicon-wrench:before {\n  content: \"\\E136\";\n}\n\n.glyphicon-tasks:before {\n  content: \"\\E137\";\n}\n\n.glyphicon-filter:before {\n  content: \"\\E138\";\n}\n\n.glyphicon-briefcase:before {\n  content: \"\\E139\";\n}\n\n.glyphicon-fullscreen:before {\n  content: \"\\E140\";\n}\n\n.glyphicon-dashboard:before {\n  content: \"\\E141\";\n}\n\n.glyphicon-paperclip:before {\n  content: \"\\E142\";\n}\n\n.glyphicon-heart-empty:before {\n  content: \"\\E143\";\n}\n\n.glyphicon-link:before {\n  content: \"\\E144\";\n}\n\n.glyphicon-phone:before {\n  content: \"\\E145\";\n}\n\n.glyphicon-pushpin:before {\n  content: \"\\E146\";\n}\n\n.glyphicon-usd:before {\n  content: \"\\E148\";\n}\n\n.glyphicon-gbp:before {\n  content: \"\\E149\";\n}\n\n.glyphicon-sort:before {\n  content: \"\\E150\";\n}\n\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\";\n}\n\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\";\n}\n\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\";\n}\n\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\";\n}\n\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\";\n}\n\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\";\n}\n\n.glyphicon-unchecked:before {\n  content: \"\\E157\";\n}\n\n.glyphicon-expand:before {\n  content: \"\\E158\";\n}\n\n.glyphicon-collapse-down:before {\n  content: \"\\E159\";\n}\n\n.glyphicon-collapse-up:before {\n  content: \"\\E160\";\n}\n\n.glyphicon-log-in:before {\n  content: \"\\E161\";\n}\n\n.glyphicon-flash:before {\n  content: \"\\E162\";\n}\n\n.glyphicon-log-out:before {\n  content: \"\\E163\";\n}\n\n.glyphicon-new-window:before {\n  content: \"\\E164\";\n}\n\n.glyphicon-record:before {\n  content: \"\\E165\";\n}\n\n.glyphicon-save:before {\n  content: \"\\E166\";\n}\n\n.glyphicon-open:before {\n  content: \"\\E167\";\n}\n\n.glyphicon-saved:before {\n  content: \"\\E168\";\n}\n\n.glyphicon-import:before {\n  content: \"\\E169\";\n}\n\n.glyphicon-export:before {\n  content: \"\\E170\";\n}\n\n.glyphicon-send:before {\n  content: \"\\E171\";\n}\n\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\";\n}\n\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\";\n}\n\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\";\n}\n\n.glyphicon-floppy-save:before {\n  content: \"\\E175\";\n}\n\n.glyphicon-floppy-open:before {\n  content: \"\\E176\";\n}\n\n.glyphicon-credit-card:before {\n  content: \"\\E177\";\n}\n\n.glyphicon-transfer:before {\n  content: \"\\E178\";\n}\n\n.glyphicon-cutlery:before {\n  content: \"\\E179\";\n}\n\n.glyphicon-header:before {\n  content: \"\\E180\";\n}\n\n.glyphicon-compressed:before {\n  content: \"\\E181\";\n}\n\n.glyphicon-earphone:before {\n  content: \"\\E182\";\n}\n\n.glyphicon-phone-alt:before {\n  content: \"\\E183\";\n}\n\n.glyphicon-tower:before {\n  content: \"\\E184\";\n}\n\n.glyphicon-stats:before {\n  content: \"\\E185\";\n}\n\n.glyphicon-sd-video:before {\n  content: \"\\E186\";\n}\n\n.glyphicon-hd-video:before {\n  content: \"\\E187\";\n}\n\n.glyphicon-subtitles:before {\n  content: \"\\E188\";\n}\n\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\";\n}\n\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\";\n}\n\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\";\n}\n\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\";\n}\n\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\";\n}\n\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\";\n}\n\n.glyphicon-registration-mark:before {\n  content: \"\\E195\";\n}\n\n.glyphicon-cloud-download:before {\n  content: \"\\E197\";\n}\n\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\";\n}\n\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\";\n}\n\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\";\n}\n\n.glyphicon-cd:before {\n  content: \"\\E201\";\n}\n\n.glyphicon-save-file:before {\n  content: \"\\E202\";\n}\n\n.glyphicon-open-file:before {\n  content: \"\\E203\";\n}\n\n.glyphicon-level-up:before {\n  content: \"\\E204\";\n}\n\n.glyphicon-copy:before {\n  content: \"\\E205\";\n}\n\n.glyphicon-paste:before {\n  content: \"\\E206\";\n}\n\n.glyphicon-alert:before {\n  content: \"\\E209\";\n}\n\n.glyphicon-equalizer:before {\n  content: \"\\E210\";\n}\n\n.glyphicon-king:before {\n  content: \"\\E211\";\n}\n\n.glyphicon-queen:before {\n  content: \"\\E212\";\n}\n\n.glyphicon-pawn:before {\n  content: \"\\E213\";\n}\n\n.glyphicon-bishop:before {\n  content: \"\\E214\";\n}\n\n.glyphicon-knight:before {\n  content: \"\\E215\";\n}\n\n.glyphicon-baby-formula:before {\n  content: \"\\E216\";\n}\n\n.glyphicon-tent:before {\n  content: \"\\26FA\";\n}\n\n.glyphicon-blackboard:before {\n  content: \"\\E218\";\n}\n\n.glyphicon-bed:before {\n  content: \"\\E219\";\n}\n\n.glyphicon-apple:before {\n  content: \"\\F8FF\";\n}\n\n.glyphicon-erase:before {\n  content: \"\\E221\";\n}\n\n.glyphicon-hourglass:before {\n  content: \"\\231B\";\n}\n\n.glyphicon-lamp:before {\n  content: \"\\E223\";\n}\n\n.glyphicon-duplicate:before {\n  content: \"\\E224\";\n}\n\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\";\n}\n\n.glyphicon-scissors:before {\n  content: \"\\E226\";\n}\n\n.glyphicon-bitcoin:before {\n  content: \"\\E227\";\n}\n\n.glyphicon-btc:before {\n  content: \"\\E227\";\n}\n\n.glyphicon-xbt:before {\n  content: \"\\E227\";\n}\n\n.glyphicon-yen:before {\n  content: \"\\A5\";\n}\n\n.glyphicon-jpy:before {\n  content: \"\\A5\";\n}\n\n.glyphicon-ruble:before {\n  content: \"\\20BD\";\n}\n\n.glyphicon-rub:before {\n  content: \"\\20BD\";\n}\n\n.glyphicon-scale:before {\n  content: \"\\E230\";\n}\n\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\";\n}\n\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\";\n}\n\n.glyphicon-education:before {\n  content: \"\\E233\";\n}\n\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\";\n}\n\n.glyphicon-option-vertical:before {\n  content: \"\\E235\";\n}\n\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\";\n}\n\n.glyphicon-modal-window:before {\n  content: \"\\E237\";\n}\n\n.glyphicon-oil:before {\n  content: \"\\E238\";\n}\n\n.glyphicon-grain:before {\n  content: \"\\E239\";\n}\n\n.glyphicon-sunglasses:before {\n  content: \"\\E240\";\n}\n\n.glyphicon-text-size:before {\n  content: \"\\E241\";\n}\n\n.glyphicon-text-color:before {\n  content: \"\\E242\";\n}\n\n.glyphicon-text-background:before {\n  content: \"\\E243\";\n}\n\n.glyphicon-object-align-top:before {\n  content: \"\\E244\";\n}\n\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\";\n}\n\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\";\n}\n\n.glyphicon-object-align-left:before {\n  content: \"\\E247\";\n}\n\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\";\n}\n\n.glyphicon-object-align-right:before {\n  content: \"\\E249\";\n}\n\n.glyphicon-triangle-right:before {\n  content: \"\\E250\";\n}\n\n.glyphicon-triangle-left:before {\n  content: \"\\E251\";\n}\n\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\";\n}\n\n.glyphicon-triangle-top:before {\n  content: \"\\E253\";\n}\n\n.glyphicon-console:before {\n  content: \"\\E254\";\n}\n\n.glyphicon-superscript:before {\n  content: \"\\E255\";\n}\n\n.glyphicon-subscript:before {\n  content: \"\\E256\";\n}\n\n.glyphicon-menu-left:before {\n  content: \"\\E257\";\n}\n\n.glyphicon-menu-right:before {\n  content: \"\\E258\";\n}\n\n.glyphicon-menu-down:before {\n  content: \"\\E259\";\n}\n\n.glyphicon-menu-up:before {\n  content: \"\\E260\";\n}\n\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: transparent;\n}\n\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #333333;\n  background-color: #fff;\n}\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\na {\n  color: #337ab7;\n  text-decoration: none;\n}\n\na:hover,\na:focus {\n  color: #23527c;\n  text-decoration: underline;\n}\n\na:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n\nfigure {\n  margin: 0;\n}\n\nimg {\n  vertical-align: middle;\n}\n\n.img-responsive {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n\n.img-rounded {\n  border-radius: 6px;\n}\n\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\n\n.img-circle {\n  border-radius: 50%;\n}\n\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n\n[role=\"button\"] {\n  cursor: pointer;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\n\nh1 small,\nh1 .small,\nh2 small,\nh2 .small,\nh3 small,\nh3 .small,\nh4 small,\nh4 .small,\nh5 small,\nh5 .small,\nh6 small,\nh6 .small,\n.h1 small,\n.h1 .small,\n.h2 small,\n.h2 .small,\n.h3 small,\n.h3 .small,\n.h4 small,\n.h4 .small,\n.h5 small,\n.h5 .small,\n.h6 small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #777777;\n}\n\nh1,\n.h1,\nh2,\n.h2,\nh3,\n.h3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\nh1 small,\nh1 .small,\n.h1 small,\n.h1 .small,\nh2 small,\nh2 .small,\n.h2 small,\n.h2 .small,\nh3 small,\nh3 .small,\n.h3 small,\n.h3 .small {\n  font-size: 65%;\n}\n\nh4,\n.h4,\nh5,\n.h5,\nh6,\n.h6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\nh4 small,\nh4 .small,\n.h4 small,\n.h4 .small,\nh5 small,\nh5 .small,\n.h5 small,\n.h5 .small,\nh6 small,\nh6 .small,\n.h6 small,\n.h6 .small {\n  font-size: 75%;\n}\n\nh1,\n.h1 {\n  font-size: 36px;\n}\n\nh2,\n.h2 {\n  font-size: 30px;\n}\n\nh3,\n.h3 {\n  font-size: 24px;\n}\n\nh4,\n.h4 {\n  font-size: 18px;\n}\n\nh5,\n.h5 {\n  font-size: 14px;\n}\n\nh6,\n.h6 {\n  font-size: 12px;\n}\n\np {\n  margin: 0 0 10px;\n}\n\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\n\nsmall,\n.small {\n  font-size: 85%;\n}\n\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-nowrap {\n  white-space: nowrap;\n}\n\n.text-lowercase {\n  text-transform: lowercase;\n}\n\n.text-uppercase,\n.initialism {\n  text-transform: uppercase;\n}\n\n.text-capitalize {\n  text-transform: capitalize;\n}\n\n.text-muted {\n  color: #777777;\n}\n\n.text-primary {\n  color: #337ab7;\n}\n\na.text-primary:hover,\na.text-primary:focus {\n  color: #286090;\n}\n\n.text-success {\n  color: #3c763d;\n}\n\na.text-success:hover,\na.text-success:focus {\n  color: #2b542c;\n}\n\n.text-info {\n  color: #31708f;\n}\n\na.text-info:hover,\na.text-info:focus {\n  color: #245269;\n}\n\n.text-warning {\n  color: #8a6d3b;\n}\n\na.text-warning:hover,\na.text-warning:focus {\n  color: #66512c;\n}\n\n.text-danger {\n  color: #a94442;\n}\n\na.text-danger:hover,\na.text-danger:focus {\n  color: #843534;\n}\n\n.bg-primary {\n  color: #fff;\n}\n\n.bg-primary {\n  background-color: #337ab7;\n}\n\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #286090;\n}\n\n.bg-success {\n  background-color: #dff0d8;\n}\n\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3;\n}\n\n.bg-info {\n  background-color: #d9edf7;\n}\n\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee;\n}\n\n.bg-warning {\n  background-color: #fcf8e3;\n}\n\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5;\n}\n\n.bg-danger {\n  background-color: #f2dede;\n}\n\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9;\n}\n\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee;\n}\n\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n\nul ul,\nul ol,\nol ul,\nol ol {\n  margin-bottom: 0;\n}\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n  margin-left: -5px;\n}\n\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\ndl {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n\ndt,\ndd {\n  line-height: 1.42857;\n}\n\ndt {\n  font-weight: bold;\n}\n\ndd {\n  margin-left: 0;\n}\n\n.dl-horizontal dd:before,\n.dl-horizontal dd:after {\n  content: \" \";\n  display: table;\n}\n\n.dl-horizontal dd:after {\n  clear: both;\n}\n\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777777;\n}\n\n.initialism {\n  font-size: 90%;\n}\n\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eeeeee;\n}\n\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\n\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857;\n  color: #777777;\n}\n\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014   \\A0';\n}\n\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n  text-align: right;\n}\n\n.blockquote-reverse footer:before,\n.blockquote-reverse small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right footer:before,\nblockquote.pull-right small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n\n.blockquote-reverse footer:after,\n.blockquote-reverse small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right footer:after,\nblockquote.pull-right small:after,\nblockquote.pull-right .small:after {\n  content: '\\A0   \\2014';\n}\n\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\n\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\n\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\n\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  box-shadow: none;\n}\n\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.container:before,\n.container:after {\n  content: \" \";\n  display: table;\n}\n\n.container:after {\n  clear: both;\n}\n\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.container-fluid:before,\n.container-fluid:after {\n  content: \" \";\n  display: table;\n}\n\n.container-fluid:after {\n  clear: both;\n}\n\n.row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n\n.row:before,\n.row:after {\n  content: \" \";\n  display: table;\n}\n\n.row:after {\n  clear: both;\n}\n\n.col-xs-1,\n.col-sm-1,\n.col-md-1,\n.col-lg-1,\n.col-xs-2,\n.col-sm-2,\n.col-md-2,\n.col-lg-2,\n.col-xs-3,\n.col-sm-3,\n.col-md-3,\n.col-lg-3,\n.col-xs-4,\n.col-sm-4,\n.col-md-4,\n.col-lg-4,\n.col-xs-5,\n.col-sm-5,\n.col-md-5,\n.col-lg-5,\n.col-xs-6,\n.col-sm-6,\n.col-md-6,\n.col-lg-6,\n.col-xs-7,\n.col-sm-7,\n.col-md-7,\n.col-lg-7,\n.col-xs-8,\n.col-sm-8,\n.col-md-8,\n.col-lg-8,\n.col-xs-9,\n.col-sm-9,\n.col-md-9,\n.col-lg-9,\n.col-xs-10,\n.col-sm-10,\n.col-md-10,\n.col-lg-10,\n.col-xs-11,\n.col-sm-11,\n.col-md-11,\n.col-lg-11,\n.col-xs-12,\n.col-sm-12,\n.col-md-12,\n.col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.col-xs-1,\n.col-xs-2,\n.col-xs-3,\n.col-xs-4,\n.col-xs-5,\n.col-xs-6,\n.col-xs-7,\n.col-xs-8,\n.col-xs-9,\n.col-xs-10,\n.col-xs-11,\n.col-xs-12 {\n  float: left;\n}\n\n.col-xs-1 {\n  width: 8.33333%;\n}\n\n.col-xs-2 {\n  width: 16.66667%;\n}\n\n.col-xs-3 {\n  width: 25%;\n}\n\n.col-xs-4 {\n  width: 33.33333%;\n}\n\n.col-xs-5 {\n  width: 41.66667%;\n}\n\n.col-xs-6 {\n  width: 50%;\n}\n\n.col-xs-7 {\n  width: 58.33333%;\n}\n\n.col-xs-8 {\n  width: 66.66667%;\n}\n\n.col-xs-9 {\n  width: 75%;\n}\n\n.col-xs-10 {\n  width: 83.33333%;\n}\n\n.col-xs-11 {\n  width: 91.66667%;\n}\n\n.col-xs-12 {\n  width: 100%;\n}\n\n.col-xs-pull-0 {\n  right: auto;\n}\n\n.col-xs-pull-1 {\n  right: 8.33333%;\n}\n\n.col-xs-pull-2 {\n  right: 16.66667%;\n}\n\n.col-xs-pull-3 {\n  right: 25%;\n}\n\n.col-xs-pull-4 {\n  right: 33.33333%;\n}\n\n.col-xs-pull-5 {\n  right: 41.66667%;\n}\n\n.col-xs-pull-6 {\n  right: 50%;\n}\n\n.col-xs-pull-7 {\n  right: 58.33333%;\n}\n\n.col-xs-pull-8 {\n  right: 66.66667%;\n}\n\n.col-xs-pull-9 {\n  right: 75%;\n}\n\n.col-xs-pull-10 {\n  right: 83.33333%;\n}\n\n.col-xs-pull-11 {\n  right: 91.66667%;\n}\n\n.col-xs-pull-12 {\n  right: 100%;\n}\n\n.col-xs-push-0 {\n  left: auto;\n}\n\n.col-xs-push-1 {\n  left: 8.33333%;\n}\n\n.col-xs-push-2 {\n  left: 16.66667%;\n}\n\n.col-xs-push-3 {\n  left: 25%;\n}\n\n.col-xs-push-4 {\n  left: 33.33333%;\n}\n\n.col-xs-push-5 {\n  left: 41.66667%;\n}\n\n.col-xs-push-6 {\n  left: 50%;\n}\n\n.col-xs-push-7 {\n  left: 58.33333%;\n}\n\n.col-xs-push-8 {\n  left: 66.66667%;\n}\n\n.col-xs-push-9 {\n  left: 75%;\n}\n\n.col-xs-push-10 {\n  left: 83.33333%;\n}\n\n.col-xs-push-11 {\n  left: 91.66667%;\n}\n\n.col-xs-push-12 {\n  left: 100%;\n}\n\n.col-xs-offset-0 {\n  margin-left: 0%;\n}\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%;\n}\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%;\n}\n\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%;\n}\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%;\n}\n\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%;\n}\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%;\n}\n\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%;\n}\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%;\n}\n\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n\n@media (min-width: 768px) {\n  .col-sm-1,\n  .col-sm-2,\n  .col-sm-3,\n  .col-sm-4,\n  .col-sm-5,\n  .col-sm-6,\n  .col-sm-7,\n  .col-sm-8,\n  .col-sm-9,\n  .col-sm-10,\n  .col-sm-11,\n  .col-sm-12 {\n    float: left;\n  }\n\n  .col-sm-1 {\n    width: 8.33333%;\n  }\n\n  .col-sm-2 {\n    width: 16.66667%;\n  }\n\n  .col-sm-3 {\n    width: 25%;\n  }\n\n  .col-sm-4 {\n    width: 33.33333%;\n  }\n\n  .col-sm-5 {\n    width: 41.66667%;\n  }\n\n  .col-sm-6 {\n    width: 50%;\n  }\n\n  .col-sm-7 {\n    width: 58.33333%;\n  }\n\n  .col-sm-8 {\n    width: 66.66667%;\n  }\n\n  .col-sm-9 {\n    width: 75%;\n  }\n\n  .col-sm-10 {\n    width: 83.33333%;\n  }\n\n  .col-sm-11 {\n    width: 91.66667%;\n  }\n\n  .col-sm-12 {\n    width: 100%;\n  }\n\n  .col-sm-pull-0 {\n    right: auto;\n  }\n\n  .col-sm-pull-1 {\n    right: 8.33333%;\n  }\n\n  .col-sm-pull-2 {\n    right: 16.66667%;\n  }\n\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n\n  .col-sm-pull-4 {\n    right: 33.33333%;\n  }\n\n  .col-sm-pull-5 {\n    right: 41.66667%;\n  }\n\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n\n  .col-sm-pull-7 {\n    right: 58.33333%;\n  }\n\n  .col-sm-pull-8 {\n    right: 66.66667%;\n  }\n\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n\n  .col-sm-pull-10 {\n    right: 83.33333%;\n  }\n\n  .col-sm-pull-11 {\n    right: 91.66667%;\n  }\n\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n\n  .col-sm-push-0 {\n    left: auto;\n  }\n\n  .col-sm-push-1 {\n    left: 8.33333%;\n  }\n\n  .col-sm-push-2 {\n    left: 16.66667%;\n  }\n\n  .col-sm-push-3 {\n    left: 25%;\n  }\n\n  .col-sm-push-4 {\n    left: 33.33333%;\n  }\n\n  .col-sm-push-5 {\n    left: 41.66667%;\n  }\n\n  .col-sm-push-6 {\n    left: 50%;\n  }\n\n  .col-sm-push-7 {\n    left: 58.33333%;\n  }\n\n  .col-sm-push-8 {\n    left: 66.66667%;\n  }\n\n  .col-sm-push-9 {\n    left: 75%;\n  }\n\n  .col-sm-push-10 {\n    left: 83.33333%;\n  }\n\n  .col-sm-push-11 {\n    left: 91.66667%;\n  }\n\n  .col-sm-push-12 {\n    left: 100%;\n  }\n\n  .col-sm-offset-0 {\n    margin-left: 0%;\n  }\n\n  .col-sm-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .col-sm-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n\n  .col-sm-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .col-sm-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n\n  .col-sm-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .col-sm-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n\n  .col-sm-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .col-sm-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-md-1,\n  .col-md-2,\n  .col-md-3,\n  .col-md-4,\n  .col-md-5,\n  .col-md-6,\n  .col-md-7,\n  .col-md-8,\n  .col-md-9,\n  .col-md-10,\n  .col-md-11,\n  .col-md-12 {\n    float: left;\n  }\n\n  .col-md-1 {\n    width: 8.33333%;\n  }\n\n  .col-md-2 {\n    width: 16.66667%;\n  }\n\n  .col-md-3 {\n    width: 25%;\n  }\n\n  .col-md-4 {\n    width: 33.33333%;\n  }\n\n  .col-md-5 {\n    width: 41.66667%;\n  }\n\n  .col-md-6 {\n    width: 50%;\n  }\n\n  .col-md-7 {\n    width: 58.33333%;\n  }\n\n  .col-md-8 {\n    width: 66.66667%;\n  }\n\n  .col-md-9 {\n    width: 75%;\n  }\n\n  .col-md-10 {\n    width: 83.33333%;\n  }\n\n  .col-md-11 {\n    width: 91.66667%;\n  }\n\n  .col-md-12 {\n    width: 100%;\n  }\n\n  .col-md-pull-0 {\n    right: auto;\n  }\n\n  .col-md-pull-1 {\n    right: 8.33333%;\n  }\n\n  .col-md-pull-2 {\n    right: 16.66667%;\n  }\n\n  .col-md-pull-3 {\n    right: 25%;\n  }\n\n  .col-md-pull-4 {\n    right: 33.33333%;\n  }\n\n  .col-md-pull-5 {\n    right: 41.66667%;\n  }\n\n  .col-md-pull-6 {\n    right: 50%;\n  }\n\n  .col-md-pull-7 {\n    right: 58.33333%;\n  }\n\n  .col-md-pull-8 {\n    right: 66.66667%;\n  }\n\n  .col-md-pull-9 {\n    right: 75%;\n  }\n\n  .col-md-pull-10 {\n    right: 83.33333%;\n  }\n\n  .col-md-pull-11 {\n    right: 91.66667%;\n  }\n\n  .col-md-pull-12 {\n    right: 100%;\n  }\n\n  .col-md-push-0 {\n    left: auto;\n  }\n\n  .col-md-push-1 {\n    left: 8.33333%;\n  }\n\n  .col-md-push-2 {\n    left: 16.66667%;\n  }\n\n  .col-md-push-3 {\n    left: 25%;\n  }\n\n  .col-md-push-4 {\n    left: 33.33333%;\n  }\n\n  .col-md-push-5 {\n    left: 41.66667%;\n  }\n\n  .col-md-push-6 {\n    left: 50%;\n  }\n\n  .col-md-push-7 {\n    left: 58.33333%;\n  }\n\n  .col-md-push-8 {\n    left: 66.66667%;\n  }\n\n  .col-md-push-9 {\n    left: 75%;\n  }\n\n  .col-md-push-10 {\n    left: 83.33333%;\n  }\n\n  .col-md-push-11 {\n    left: 91.66667%;\n  }\n\n  .col-md-push-12 {\n    left: 100%;\n  }\n\n  .col-md-offset-0 {\n    margin-left: 0%;\n  }\n\n  .col-md-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .col-md-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n\n  .col-md-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .col-md-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n\n  .col-md-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .col-md-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n\n  .col-md-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .col-md-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n}\n\n@media (min-width: 1200px) {\n  .col-lg-1,\n  .col-lg-2,\n  .col-lg-3,\n  .col-lg-4,\n  .col-lg-5,\n  .col-lg-6,\n  .col-lg-7,\n  .col-lg-8,\n  .col-lg-9,\n  .col-lg-10,\n  .col-lg-11,\n  .col-lg-12 {\n    float: left;\n  }\n\n  .col-lg-1 {\n    width: 8.33333%;\n  }\n\n  .col-lg-2 {\n    width: 16.66667%;\n  }\n\n  .col-lg-3 {\n    width: 25%;\n  }\n\n  .col-lg-4 {\n    width: 33.33333%;\n  }\n\n  .col-lg-5 {\n    width: 41.66667%;\n  }\n\n  .col-lg-6 {\n    width: 50%;\n  }\n\n  .col-lg-7 {\n    width: 58.33333%;\n  }\n\n  .col-lg-8 {\n    width: 66.66667%;\n  }\n\n  .col-lg-9 {\n    width: 75%;\n  }\n\n  .col-lg-10 {\n    width: 83.33333%;\n  }\n\n  .col-lg-11 {\n    width: 91.66667%;\n  }\n\n  .col-lg-12 {\n    width: 100%;\n  }\n\n  .col-lg-pull-0 {\n    right: auto;\n  }\n\n  .col-lg-pull-1 {\n    right: 8.33333%;\n  }\n\n  .col-lg-pull-2 {\n    right: 16.66667%;\n  }\n\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n\n  .col-lg-pull-4 {\n    right: 33.33333%;\n  }\n\n  .col-lg-pull-5 {\n    right: 41.66667%;\n  }\n\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n\n  .col-lg-pull-7 {\n    right: 58.33333%;\n  }\n\n  .col-lg-pull-8 {\n    right: 66.66667%;\n  }\n\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n\n  .col-lg-pull-10 {\n    right: 83.33333%;\n  }\n\n  .col-lg-pull-11 {\n    right: 91.66667%;\n  }\n\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n\n  .col-lg-push-0 {\n    left: auto;\n  }\n\n  .col-lg-push-1 {\n    left: 8.33333%;\n  }\n\n  .col-lg-push-2 {\n    left: 16.66667%;\n  }\n\n  .col-lg-push-3 {\n    left: 25%;\n  }\n\n  .col-lg-push-4 {\n    left: 33.33333%;\n  }\n\n  .col-lg-push-5 {\n    left: 41.66667%;\n  }\n\n  .col-lg-push-6 {\n    left: 50%;\n  }\n\n  .col-lg-push-7 {\n    left: 58.33333%;\n  }\n\n  .col-lg-push-8 {\n    left: 66.66667%;\n  }\n\n  .col-lg-push-9 {\n    left: 75%;\n  }\n\n  .col-lg-push-10 {\n    left: 83.33333%;\n  }\n\n  .col-lg-push-11 {\n    left: 91.66667%;\n  }\n\n  .col-lg-push-12 {\n    left: 100%;\n  }\n\n  .col-lg-offset-0 {\n    margin-left: 0%;\n  }\n\n  .col-lg-offset-1 {\n    margin-left: 8.33333%;\n  }\n\n  .col-lg-offset-2 {\n    margin-left: 16.66667%;\n  }\n\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n\n  .col-lg-offset-4 {\n    margin-left: 33.33333%;\n  }\n\n  .col-lg-offset-5 {\n    margin-left: 41.66667%;\n  }\n\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n\n  .col-lg-offset-7 {\n    margin-left: 58.33333%;\n  }\n\n  .col-lg-offset-8 {\n    margin-left: 66.66667%;\n  }\n\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n\n  .col-lg-offset-10 {\n    margin-left: 83.33333%;\n  }\n\n  .col-lg-offset-11 {\n    margin-left: 91.66667%;\n  }\n\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n}\n\ntable {\n  background-color: transparent;\n}\n\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #777777;\n  text-align: left;\n}\n\nth {\n  text-align: left;\n}\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n\n.table > thead > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > th,\n.table > tbody > tr > td,\n.table > tfoot > tr > th,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857;\n  vertical-align: top;\n  border-top: 1px solid #ddd;\n}\n\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #ddd;\n}\n\n.table > caption + thead > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > th,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n\n.table > tbody + tbody {\n  border-top: 2px solid #ddd;\n}\n\n.table .table {\n  background-color: #fff;\n}\n\n.table-condensed > thead > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > th,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > th,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n\n.table-bordered {\n  border: 1px solid #ddd;\n}\n\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > th,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > th,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #ddd;\n}\n\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9;\n}\n\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5;\n}\n\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column;\n}\n\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell;\n}\n\n.table > thead > tr > td.active,\n.table > thead > tr > th.active,\n.table > thead > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr > td.active,\n.table > tbody > tr > th.active,\n.table > tbody > tr.active > td,\n.table > tbody > tr.active > th,\n.table > tfoot > tr > td.active,\n.table > tfoot > tr > th.active,\n.table > tfoot > tr.active > td,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8;\n}\n\n.table > thead > tr > td.success,\n.table > thead > tr > th.success,\n.table > thead > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr > td.success,\n.table > tbody > tr > th.success,\n.table > tbody > tr.success > td,\n.table > tbody > tr.success > th,\n.table > tfoot > tr > td.success,\n.table > tfoot > tr > th.success,\n.table > tfoot > tr.success > td,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n\n.table > thead > tr > td.info,\n.table > thead > tr > th.info,\n.table > thead > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr > td.info,\n.table > tbody > tr > th.info,\n.table > tbody > tr.info > td,\n.table > tbody > tr.info > th,\n.table > tfoot > tr > td.info,\n.table > tfoot > tr > th.info,\n.table > tfoot > tr.info > td,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n\n.table > thead > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr > td.warning,\n.table > tbody > tr > th.warning,\n.table > tbody > tr.warning > td,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr > td.warning,\n.table > tfoot > tr > th.warning,\n.table > tfoot > tr.warning > td,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n\n.table > thead > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr > td.danger,\n.table > tbody > tr > th.danger,\n.table > tbody > tr.danger > td,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr > td.danger,\n.table > tfoot > tr > th.danger,\n.table > tfoot > tr.danger > td,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%;\n}\n\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 15px;\n    overflow-y: hidden;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid #ddd;\n  }\n\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0;\n}\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\n\ninput[type=\"file\"] {\n  display: block;\n}\n\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\n\nselect[multiple],\nselect[size] {\n  height: auto;\n}\n\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n}\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.form-control:focus {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n\n.form-control::-moz-placeholder {\n  color: #999;\n  opacity: 1;\n}\n\n.form-control:-ms-input-placeholder {\n  color: #999;\n}\n\n.form-control::-webkit-input-placeholder {\n  color: #999;\n}\n\n.form-control::-ms-expand {\n  border: 0;\n  background-color: transparent;\n}\n\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  background-color: #eeeeee;\n  opacity: 1;\n}\n\n.form-control[disabled],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n}\n\ntextarea.form-control {\n  height: auto;\n}\n\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px;\n  }\n\n  input[type=\"date\"].input-sm,\n  .input-group-sm > input[type=\"date\"].form-control,\n  .input-group-sm > input[type=\"date\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-sm input[type=\"date\"],\n  input[type=\"time\"].input-sm,\n  .input-group-sm > input[type=\"time\"].form-control,\n  .input-group-sm > input[type=\"time\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-sm\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-sm,\n  .input-group-sm > input[type=\"datetime-local\"].form-control,\n  .input-group-sm > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-sm\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-sm,\n  .input-group-sm > input[type=\"month\"].form-control,\n  .input-group-sm > input[type=\"month\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-sm\n  input[type=\"month\"] {\n    line-height: 30px;\n  }\n\n  input[type=\"date\"].input-lg,\n  .input-group-lg > input[type=\"date\"].form-control,\n  .input-group-lg > input[type=\"date\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-lg input[type=\"date\"],\n  input[type=\"time\"].input-lg,\n  .input-group-lg > input[type=\"time\"].form-control,\n  .input-group-lg > input[type=\"time\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-lg\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-lg,\n  .input-group-lg > input[type=\"datetime-local\"].form-control,\n  .input-group-lg > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-lg\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-lg,\n  .input-group-lg > input[type=\"month\"].form-control,\n  .input-group-lg > input[type=\"month\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-lg\n  input[type=\"month\"] {\n    line-height: 46px;\n  }\n}\n\n.form-group {\n  margin-bottom: 15px;\n}\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.radio label,\n.checkbox label {\n  min-height: 20px;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9;\n}\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\n\ninput[type=\"radio\"][disabled],\ninput[type=\"radio\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled]\ninput[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n\n.radio-inline.disabled,\nfieldset[disabled] .radio-inline,\n.checkbox-inline.disabled,\nfieldset[disabled]\n.checkbox-inline {\n  cursor: not-allowed;\n}\n\n.radio.disabled label,\nfieldset[disabled] .radio label,\n.checkbox.disabled label,\nfieldset[disabled]\n.checkbox label {\n  cursor: not-allowed;\n}\n\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px;\n}\n\n.form-control-static.input-lg,\n.input-group-lg > .form-control-static.form-control,\n.input-group-lg > .form-control-static.input-group-addon,\n.input-group-lg > .input-group-btn > .form-control-static.btn,\n.form-control-static.input-sm,\n.input-group-sm > .form-control-static.form-control,\n.input-group-sm > .form-control-static.input-group-addon,\n.input-group-sm > .input-group-btn > .form-control-static.btn {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.input-sm,\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\nselect.input-sm,\n.input-group-sm > select.form-control,\n.input-group-sm > select.input-group-addon,\n.input-group-sm > .input-group-btn > select.btn {\n  height: 30px;\n  line-height: 30px;\n}\n\ntextarea.input-sm,\n.input-group-sm > textarea.form-control,\n.input-group-sm > textarea.input-group-addon,\n.input-group-sm > .input-group-btn > textarea.btn,\nselect[multiple].input-sm,\n.input-group-sm > select[multiple].form-control,\n.input-group-sm > select[multiple].input-group-addon,\n.input-group-sm > .input-group-btn > select[multiple].btn {\n  height: auto;\n}\n\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px;\n}\n\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto;\n}\n\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.input-lg,\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px;\n}\n\nselect.input-lg,\n.input-group-lg > select.form-control,\n.input-group-lg > select.input-group-addon,\n.input-group-lg > .input-group-btn > select.btn {\n  height: 46px;\n  line-height: 46px;\n}\n\ntextarea.input-lg,\n.input-group-lg > textarea.form-control,\n.input-group-lg > textarea.input-group-addon,\n.input-group-lg > .input-group-btn > textarea.btn,\nselect[multiple].input-lg,\n.input-group-lg > select[multiple].form-control,\n.input-group-lg > select[multiple].input-group-addon,\n.input-group-lg > .input-group-btn > select[multiple].btn {\n  height: auto;\n}\n\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px;\n}\n\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px;\n}\n\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto;\n}\n\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n}\n\n.has-feedback {\n  position: relative;\n}\n\n.has-feedback .form-control {\n  padding-right: 42.5px;\n}\n\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none;\n}\n\n.input-lg + .form-control-feedback,\n.input-group-lg > .form-control + .form-control-feedback,\n.input-group-lg > .input-group-addon + .form-control-feedback,\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px;\n}\n\n.input-sm + .form-control-feedback,\n.input-group-sm > .form-control + .form-control-feedback,\n.input-group-sm > .input-group-addon + .form-control-feedback,\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d;\n}\n\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n\n.has-success .form-control:focus {\n  border-color: #2b542c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n}\n\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8;\n}\n\n.has-success .form-control-feedback {\n  color: #3c763d;\n}\n\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b;\n}\n\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n\n.has-warning .form-control:focus {\n  border-color: #66512c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n}\n\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n\n.has-warning .form-control-feedback {\n  color: #8a6d3b;\n}\n\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442;\n}\n\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n\n.has-error .form-control:focus {\n  border-color: #843534;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n}\n\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede;\n}\n\n.has-error .form-control-feedback {\n  color: #a94442;\n}\n\n.has-feedback label ~ .form-control-feedback {\n  top: 25px;\n}\n\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n\n  .form-inline .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .form-inline .input-group .form-control {\n    width: auto;\n  }\n\n  .form-inline .input-group > .form-control {\n    width: 100%;\n  }\n\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n\n  .form-inline .radio label,\n  .form-inline .checkbox label {\n    padding-left: 0;\n  }\n\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px;\n}\n\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after {\n  content: \" \";\n  display: table;\n}\n\n.form-horizontal .form-group:after {\n  clear: both;\n}\n\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px;\n  }\n}\n\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px;\n}\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px;\n  }\n}\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px;\n  }\n}\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.btn:focus,\n.btn.focus,\n.btn:active:focus,\n.btn:active.focus,\n.btn.active:focus,\n.btn.active.focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n\n.btn:hover,\n.btn:focus,\n.btn.focus {\n  color: #333;\n  text-decoration: none;\n}\n\n.btn:active,\n.btn.active {\n  outline: 0;\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: not-allowed;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\n}\n\n.btn-default:focus,\n.btn-default.focus {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #8c8c8c;\n}\n\n.btn-default:hover {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n\n.btn-default:active,\n.btn-default.active,\n.open > .btn-default.dropdown-toggle {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n\n.btn-default:active:hover,\n.btn-default:active:focus,\n.btn-default:active.focus,\n.btn-default.active:hover,\n.btn-default.active:focus,\n.btn-default.active.focus,\n.open > .btn-default.dropdown-toggle:hover,\n.open > .btn-default.dropdown-toggle:focus,\n.open > .btn-default.dropdown-toggle.focus {\n  color: #333;\n  background-color: #d4d4d4;\n  border-color: #8c8c8c;\n}\n\n.btn-default:active,\n.btn-default.active,\n.open > .btn-default.dropdown-toggle {\n  background-image: none;\n}\n\n.btn-default.disabled:hover,\n.btn-default.disabled:focus,\n.btn-default.disabled.focus,\n.btn-default[disabled]:hover,\n.btn-default[disabled]:focus,\n.btn-default[disabled].focus,\nfieldset[disabled] .btn-default:hover,\nfieldset[disabled] .btn-default:focus,\nfieldset[disabled] .btn-default.focus {\n  background-color: #fff;\n  border-color: #ccc;\n}\n\n.btn-default .badge {\n  color: #fff;\n  background-color: #333;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n\n.btn-primary:focus,\n.btn-primary.focus {\n  color: #fff;\n  background-color: #286090;\n  border-color: #122b40;\n}\n\n.btn-primary:hover {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n\n.btn-primary:active,\n.btn-primary.active,\n.open > .btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n\n.btn-primary:active:hover,\n.btn-primary:active:focus,\n.btn-primary:active.focus,\n.btn-primary.active:hover,\n.btn-primary.active:focus,\n.btn-primary.active.focus,\n.open > .btn-primary.dropdown-toggle:hover,\n.open > .btn-primary.dropdown-toggle:focus,\n.open > .btn-primary.dropdown-toggle.focus {\n  color: #fff;\n  background-color: #204d74;\n  border-color: #122b40;\n}\n\n.btn-primary:active,\n.btn-primary.active,\n.open > .btn-primary.dropdown-toggle {\n  background-image: none;\n}\n\n.btn-primary.disabled:hover,\n.btn-primary.disabled:focus,\n.btn-primary.disabled.focus,\n.btn-primary[disabled]:hover,\n.btn-primary[disabled]:focus,\n.btn-primary[disabled].focus,\nfieldset[disabled] .btn-primary:hover,\nfieldset[disabled] .btn-primary:focus,\nfieldset[disabled] .btn-primary.focus {\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n\n.btn-primary .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n\n.btn-success:focus,\n.btn-success.focus {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #255625;\n}\n\n.btn-success:hover {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n\n.btn-success:active,\n.btn-success.active,\n.open > .btn-success.dropdown-toggle {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n\n.btn-success:active:hover,\n.btn-success:active:focus,\n.btn-success:active.focus,\n.btn-success.active:hover,\n.btn-success.active:focus,\n.btn-success.active.focus,\n.open > .btn-success.dropdown-toggle:hover,\n.open > .btn-success.dropdown-toggle:focus,\n.open > .btn-success.dropdown-toggle.focus {\n  color: #fff;\n  background-color: #398439;\n  border-color: #255625;\n}\n\n.btn-success:active,\n.btn-success.active,\n.open > .btn-success.dropdown-toggle {\n  background-image: none;\n}\n\n.btn-success.disabled:hover,\n.btn-success.disabled:focus,\n.btn-success.disabled.focus,\n.btn-success[disabled]:hover,\n.btn-success[disabled]:focus,\n.btn-success[disabled].focus,\nfieldset[disabled] .btn-success:hover,\nfieldset[disabled] .btn-success:focus,\nfieldset[disabled] .btn-success.focus {\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n\n.btn-success .badge {\n  color: #5cb85c;\n  background-color: #fff;\n}\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n\n.btn-info:focus,\n.btn-info.focus {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #1b6d85;\n}\n\n.btn-info:hover {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n\n.btn-info:active,\n.btn-info.active,\n.open > .btn-info.dropdown-toggle {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n\n.btn-info:active:hover,\n.btn-info:active:focus,\n.btn-info:active.focus,\n.btn-info.active:hover,\n.btn-info.active:focus,\n.btn-info.active.focus,\n.open > .btn-info.dropdown-toggle:hover,\n.open > .btn-info.dropdown-toggle:focus,\n.open > .btn-info.dropdown-toggle.focus {\n  color: #fff;\n  background-color: #269abc;\n  border-color: #1b6d85;\n}\n\n.btn-info:active,\n.btn-info.active,\n.open > .btn-info.dropdown-toggle {\n  background-image: none;\n}\n\n.btn-info.disabled:hover,\n.btn-info.disabled:focus,\n.btn-info.disabled.focus,\n.btn-info[disabled]:hover,\n.btn-info[disabled]:focus,\n.btn-info[disabled].focus,\nfieldset[disabled] .btn-info:hover,\nfieldset[disabled] .btn-info:focus,\nfieldset[disabled] .btn-info.focus {\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n\n.btn-info .badge {\n  color: #5bc0de;\n  background-color: #fff;\n}\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n\n.btn-warning:focus,\n.btn-warning.focus {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #985f0d;\n}\n\n.btn-warning:hover {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n\n.btn-warning:active,\n.btn-warning.active,\n.open > .btn-warning.dropdown-toggle {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n\n.btn-warning:active:hover,\n.btn-warning:active:focus,\n.btn-warning:active.focus,\n.btn-warning.active:hover,\n.btn-warning.active:focus,\n.btn-warning.active.focus,\n.open > .btn-warning.dropdown-toggle:hover,\n.open > .btn-warning.dropdown-toggle:focus,\n.open > .btn-warning.dropdown-toggle.focus {\n  color: #fff;\n  background-color: #d58512;\n  border-color: #985f0d;\n}\n\n.btn-warning:active,\n.btn-warning.active,\n.open > .btn-warning.dropdown-toggle {\n  background-image: none;\n}\n\n.btn-warning.disabled:hover,\n.btn-warning.disabled:focus,\n.btn-warning.disabled.focus,\n.btn-warning[disabled]:hover,\n.btn-warning[disabled]:focus,\n.btn-warning[disabled].focus,\nfieldset[disabled] .btn-warning:hover,\nfieldset[disabled] .btn-warning:focus,\nfieldset[disabled] .btn-warning.focus {\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n\n.btn-warning .badge {\n  color: #f0ad4e;\n  background-color: #fff;\n}\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n\n.btn-danger:focus,\n.btn-danger.focus {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #761c19;\n}\n\n.btn-danger:hover {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n\n.btn-danger:active,\n.btn-danger.active,\n.open > .btn-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n\n.btn-danger:active:hover,\n.btn-danger:active:focus,\n.btn-danger:active.focus,\n.btn-danger.active:hover,\n.btn-danger.active:focus,\n.btn-danger.active.focus,\n.open > .btn-danger.dropdown-toggle:hover,\n.open > .btn-danger.dropdown-toggle:focus,\n.open > .btn-danger.dropdown-toggle.focus {\n  color: #fff;\n  background-color: #ac2925;\n  border-color: #761c19;\n}\n\n.btn-danger:active,\n.btn-danger.active,\n.open > .btn-danger.dropdown-toggle {\n  background-image: none;\n}\n\n.btn-danger.disabled:hover,\n.btn-danger.disabled:focus,\n.btn-danger.disabled.focus,\n.btn-danger[disabled]:hover,\n.btn-danger[disabled]:focus,\n.btn-danger[disabled].focus,\nfieldset[disabled] .btn-danger:hover,\nfieldset[disabled] .btn-danger:focus,\nfieldset[disabled] .btn-danger.focus {\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n\n.btn-danger .badge {\n  color: #d9534f;\n  background-color: #fff;\n}\n\n.btn-link {\n  color: #337ab7;\n  font-weight: normal;\n  border-radius: 0;\n}\n\n.btn-link,\n.btn-link:active,\n.btn-link.active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n\n.btn-link:hover,\n.btn-link:focus {\n  color: #23527c;\n  text-decoration: underline;\n  background-color: transparent;\n}\n\n.btn-link[disabled]:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:hover,\nfieldset[disabled] .btn-link:focus {\n  color: #777777;\n  text-decoration: none;\n}\n\n.btn-lg,\n.btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px;\n}\n\n.btn-sm,\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.btn-xs,\n.btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n\n.btn-block {\n  display: block;\n  width: 100%;\n}\n\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n\n.fade.in {\n  opacity: 1;\n}\n\n.collapse {\n  display: none;\n}\n\n.collapse.in {\n  display: block;\n}\n\ntr.collapse.in {\n  display: table-row;\n}\n\ntbody.collapse.in {\n  display: table-row-group;\n}\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-property: height, visibility;\n  transition-property: height, visibility;\n  -webkit-transition-duration: 0.35s;\n  transition-duration: 0.35s;\n  -webkit-transition-timing-function: ease;\n  transition-timing-function: ease;\n}\n\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n\n.dropup,\n.dropdown {\n  position: relative;\n}\n\n.dropdown-toggle:focus {\n  outline: 0;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box;\n}\n\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857;\n  color: #333333;\n  white-space: nowrap;\n}\n\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5;\n}\n\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #337ab7;\n}\n\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #777777;\n}\n\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n\n.open > .dropdown-menu {\n  display: block;\n}\n\n.open > a {\n  outline: 0;\n}\n\n.dropdown-menu-right {\n  left: auto;\n  right: 0;\n}\n\n.dropdown-menu-left {\n  left: 0;\n  right: auto;\n}\n\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857;\n  color: #777777;\n  white-space: nowrap;\n}\n\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n  content: \"\";\n}\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px;\n}\n\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    right: 0;\n    left: auto;\n  }\n\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto;\n  }\n}\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n\n.btn-group > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn:hover,\n.btn-group-vertical > .btn:focus,\n.btn-group-vertical > .btn:active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n\n.btn-toolbar {\n  margin-left: -5px;\n}\n\n.btn-toolbar:before,\n.btn-toolbar:after {\n  content: \" \";\n  display: table;\n}\n\n.btn-toolbar:after {\n  clear: both;\n}\n\n.btn-toolbar .btn,\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n\n.btn-toolbar > .btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group > .btn-group {\n  float: left;\n}\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.btn-group > .btn-lg + .dropdown-toggle,\n.btn-group-lg.btn-group > .btn + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.btn .caret {\n  margin-left: 0;\n}\n\n.btn-lg .caret,\n.btn-group-lg > .btn .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n\n.dropup .btn-lg .caret,\n.dropup .btn-group-lg > .btn .caret {\n  border-width: 0 5px 5px;\n}\n\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after {\n  content: \" \";\n  display: table;\n}\n\n.btn-group-vertical > .btn-group:after {\n  clear: both;\n}\n\n.btn-group-vertical > .btn-group > .btn {\n  float: none;\n}\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n\n.btn-group-justified > .btn,\n.btn-group-justified > .btn-group {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n\n.btn-group-justified > .btn-group .btn {\n  width: 100%;\n}\n\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n\n.input-group .form-control:focus {\n  z-index: 3;\n}\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\n.input-group-addon.input-sm,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .input-group-addon.btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n\n.input-group-addon.input-lg,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .input-group-addon.btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.input-group-addon:first-child {\n  border-right: 0;\n}\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.input-group-addon:last-child {\n  border-left: 0;\n}\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n\n.input-group-btn > .btn {\n  position: relative;\n}\n\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:focus,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group {\n  z-index: 2;\n  margin-left: -1px;\n}\n\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n\n.nav:before,\n.nav:after {\n  content: \" \";\n  display: table;\n}\n\n.nav:after {\n  clear: both;\n}\n\n.nav > li {\n  position: relative;\n  display: block;\n}\n\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n\n.nav > li.disabled > a {\n  color: #777777;\n}\n\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #777777;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n\n.nav .open > a,\n.nav .open > a:hover,\n.nav .open > a:focus {\n  background-color: #eeeeee;\n  border-color: #337ab7;\n}\n\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n\n.nav > li > a > img {\n  max-width: none;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd;\n}\n\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n\n.nav-tabs > li > a:hover {\n  border-color: #eeeeee #eeeeee #ddd;\n}\n\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #555555;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n\n.nav-pills > li {\n  float: left;\n}\n\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #fff;\n  background-color: #337ab7;\n}\n\n.nav-stacked > li {\n  float: none;\n}\n\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n\n.nav-justified,\n.nav-tabs.nav-justified {\n  width: 100%;\n}\n\n.nav-justified > li,\n.nav-tabs.nav-justified > li {\n  float: none;\n}\n\n.nav-justified > li > a,\n.nav-tabs.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n\n@media (min-width: 768px) {\n  .nav-justified > li,\n  .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n\n  .nav-justified > li > a,\n  .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n\n.nav-tabs-justified,\n.nav-tabs.nav-justified {\n  border-bottom: 0;\n}\n\n.nav-tabs-justified > li > a,\n.nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n\n.nav-tabs-justified > .active > a,\n.nav-tabs.nav-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a,\n  .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n\n  .nav-tabs-justified > .active > a,\n  .nav-tabs.nav-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n\n.tab-content > .tab-pane {\n  display: none;\n}\n\n.tab-content > .active {\n  display: block;\n}\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n\n.navbar:before,\n.navbar:after {\n  content: \" \";\n  display: table;\n}\n\n.navbar:after {\n  clear: both;\n}\n\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n\n.navbar-header:before,\n.navbar-header:after {\n  content: \" \";\n  display: table;\n}\n\n.navbar-header:after {\n  clear: both;\n}\n\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch;\n}\n\n.navbar-collapse:before,\n.navbar-collapse:after {\n  content: \" \";\n  display: table;\n}\n\n.navbar-collapse:after {\n  clear: both;\n}\n\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n\n@media (max-device-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n\n.container > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-header,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-header,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n\n.navbar-brand {\n  float: left;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n  height: 50px;\n}\n\n.navbar-brand:hover,\n.navbar-brand:focus {\n  text-decoration: none;\n}\n\n.navbar-brand > img {\n  display: block;\n}\n\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand,\n  .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n\n.navbar-toggle:focus {\n  outline: 0;\n}\n\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n\n.navbar-nav {\n  margin: 7.5px -15px;\n}\n\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    box-shadow: none;\n  }\n\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 20px;\n  }\n\n  .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n\n  .navbar-nav > li {\n    float: left;\n  }\n\n  .navbar-nav > li > a {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }\n}\n\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n\n@media (min-width: 768px) {\n  .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n\n  .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n\n  .navbar-form .form-control-static {\n    display: inline-block;\n  }\n\n  .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n\n  .navbar-form .input-group .input-group-addon,\n  .navbar-form .input-group .input-group-btn,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n\n  .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n\n  .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n\n  .navbar-form .radio,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n\n  .navbar-form .radio label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n\n  .navbar-form .radio input[type=\"radio\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n\n  .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n\n  .navbar-form .form-group:last-child {\n    margin-bottom: 0;\n  }\n}\n\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    border: 0;\n    margin-left: 0;\n    margin-right: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n}\n\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n\n.navbar-btn.btn-sm,\n.btn-group-sm > .navbar-btn.btn {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.navbar-btn.btn-xs,\n.btn-group-xs > .navbar-btn.btn {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-left: 15px;\n    margin-right: 15px;\n  }\n}\n\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px;\n  }\n\n  .navbar-right ~ .navbar-right {\n    margin-right: 0;\n  }\n}\n\n.navbar-default {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7;\n}\n\n.navbar-default .navbar-brand {\n  color: #777;\n}\n\n.navbar-default .navbar-brand:hover,\n.navbar-default .navbar-brand:focus {\n  color: #5e5e5e;\n  background-color: transparent;\n}\n\n.navbar-default .navbar-text {\n  color: #777;\n}\n\n.navbar-default .navbar-nav > li > a {\n  color: #777;\n}\n\n.navbar-default .navbar-nav > li > a:hover,\n.navbar-default .navbar-nav > li > a:focus {\n  color: #333;\n  background-color: transparent;\n}\n\n.navbar-default .navbar-nav > .active > a,\n.navbar-default .navbar-nav > .active > a:hover,\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #555;\n  background-color: #e7e7e7;\n}\n\n.navbar-default .navbar-nav > .disabled > a,\n.navbar-default .navbar-nav > .disabled > a:hover,\n.navbar-default .navbar-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent;\n}\n\n.navbar-default .navbar-toggle {\n  border-color: #ddd;\n}\n\n.navbar-default .navbar-toggle:hover,\n.navbar-default .navbar-toggle:focus {\n  background-color: #ddd;\n}\n\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #888;\n}\n\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #e7e7e7;\n}\n\n.navbar-default .navbar-nav > .open > a,\n.navbar-default .navbar-nav > .open > a:hover,\n.navbar-default .navbar-nav > .open > a:focus {\n  background-color: #e7e7e7;\n  color: #555;\n}\n\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #777;\n  }\n\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #333;\n    background-color: transparent;\n  }\n\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #555;\n    background-color: #e7e7e7;\n  }\n\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent;\n  }\n}\n\n.navbar-default .navbar-link {\n  color: #777;\n}\n\n.navbar-default .navbar-link:hover {\n  color: #333;\n}\n\n.navbar-default .btn-link {\n  color: #777;\n}\n\n.navbar-default .btn-link:hover,\n.navbar-default .btn-link:focus {\n  color: #333;\n}\n\n.navbar-default .btn-link[disabled]:hover,\n.navbar-default .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-default .btn-link:hover,\nfieldset[disabled] .navbar-default .btn-link:focus {\n  color: #ccc;\n}\n\n.navbar-inverse {\n  background-color: #222;\n  border-color: #090909;\n}\n\n.navbar-inverse .navbar-brand {\n  color: #9d9d9d;\n}\n\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #fff;\n  background-color: transparent;\n}\n\n.navbar-inverse .navbar-text {\n  color: #9d9d9d;\n}\n\n.navbar-inverse .navbar-nav > li > a {\n  color: #9d9d9d;\n}\n\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: #090909;\n}\n\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent;\n}\n\n.navbar-inverse .navbar-toggle {\n  border-color: #333;\n}\n\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333;\n}\n\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #fff;\n}\n\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #101010;\n}\n\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: #090909;\n  color: #fff;\n}\n\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #090909;\n  }\n\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #090909;\n  }\n\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #9d9d9d;\n  }\n\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: #090909;\n  }\n\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444;\n    background-color: transparent;\n  }\n}\n\n.navbar-inverse .navbar-link {\n  color: #9d9d9d;\n}\n\n.navbar-inverse .navbar-link:hover {\n  color: #fff;\n}\n\n.navbar-inverse .btn-link {\n  color: #9d9d9d;\n}\n\n.navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link:focus {\n  color: #fff;\n}\n\n.navbar-inverse .btn-link[disabled]:hover,\n.navbar-inverse .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-inverse .btn-link:hover,\nfieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #444;\n}\n\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n\n.breadcrumb > li {\n  display: inline-block;\n}\n\n.breadcrumb > li + li:before {\n  content: \"/\\A0\";\n  padding: 0 5px;\n  color: #ccc;\n}\n\n.breadcrumb > .active {\n  color: #777777;\n}\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n\n.pagination > li {\n  display: inline;\n}\n\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  line-height: 1.42857;\n  text-decoration: none;\n  color: #337ab7;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  margin-left: -1px;\n}\n\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n\n.pagination > li > a:hover,\n.pagination > li > a:focus,\n.pagination > li > span:hover,\n.pagination > li > span:focus {\n  z-index: 2;\n  color: #23527c;\n  background-color: #eeeeee;\n  border-color: #ddd;\n}\n\n.pagination > .active > a,\n.pagination > .active > a:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span,\n.pagination > .active > span:hover,\n.pagination > .active > span:focus {\n  z-index: 3;\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n  cursor: default;\n}\n\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #777777;\n  background-color: #fff;\n  border-color: #ddd;\n  cursor: not-allowed;\n}\n\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n}\n\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center;\n}\n\n.pager:before,\n.pager:after {\n  content: \" \";\n  display: table;\n}\n\n.pager:after {\n  clear: both;\n}\n\n.pager li {\n  display: inline;\n}\n\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n}\n\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #777777;\n  background-color: #fff;\n  cursor: not-allowed;\n}\n\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\n\n.label:empty {\n  display: none;\n}\n\n.btn .label {\n  position: relative;\n  top: -1px;\n}\n\na.label:hover,\na.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.label-default {\n  background-color: #777777;\n}\n\n.label-default[href]:hover,\n.label-default[href]:focus {\n  background-color: #5e5e5e;\n}\n\n.label-primary {\n  background-color: #337ab7;\n}\n\n.label-primary[href]:hover,\n.label-primary[href]:focus {\n  background-color: #286090;\n}\n\n.label-success {\n  background-color: #5cb85c;\n}\n\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n\n.label-info {\n  background-color: #5bc0de;\n}\n\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #31b0d5;\n}\n\n.label-warning {\n  background-color: #f0ad4e;\n}\n\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n\n.label-danger {\n  background-color: #d9534f;\n}\n\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px;\n}\n\n.badge:empty {\n  display: none;\n}\n\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n\n.btn-xs .badge,\n.btn-group-xs > .btn .badge,\n.btn-group-xs > .btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\n\n.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n\n.list-group-item > .badge {\n  float: right;\n}\n\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n\na.badge:hover,\na.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eeeeee;\n}\n\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 21px;\n  font-weight: 200;\n}\n\n.jumbotron > hr {\n  border-top-color: #d5d5d5;\n}\n\n.container .jumbotron,\n.container-fluid .jumbotron {\n  border-radius: 6px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.jumbotron .container {\n  max-width: 100%;\n}\n\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding-top: 48px;\n    padding-bottom: 48px;\n  }\n\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    padding-left: 60px;\n    padding-right: 60px;\n  }\n\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 63px;\n  }\n}\n\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s ease-in-out;\n  -o-transition: border 0.2s ease-in-out;\n  transition: border 0.2s ease-in-out;\n}\n\n.thumbnail > img,\n.thumbnail a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.thumbnail .caption {\n  padding: 9px;\n  color: #333333;\n}\n\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #337ab7;\n}\n\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n\n.alert .alert-link {\n  font-weight: bold;\n}\n\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n\n.alert > p + p {\n  margin-top: 5px;\n}\n\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #3c763d;\n}\n\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n\n.alert-success .alert-link {\n  color: #2b542c;\n}\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #31708f;\n}\n\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n\n.alert-info .alert-link {\n  color: #245269;\n}\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n  color: #8a6d3b;\n}\n\n.alert-warning hr {\n  border-top-color: #f7e1b5;\n}\n\n.alert-warning .alert-link {\n  color: #66512c;\n}\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebccd1;\n  color: #a94442;\n}\n\n.alert-danger hr {\n  border-top-color: #e4b9c0;\n}\n\n.alert-danger .alert-link {\n  color: #843534;\n}\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n\n  to {\n    background-position: 0 0;\n  }\n}\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n\n  to {\n    background-position: 0 0;\n  }\n}\n\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #337ab7;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px;\n}\n\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n\n.media {\n  margin-top: 15px;\n}\n\n.media:first-child {\n  margin-top: 0;\n}\n\n.media,\n.media-body {\n  zoom: 1;\n  overflow: hidden;\n}\n\n.media-body {\n  width: 10000px;\n}\n\n.media-object {\n  display: block;\n}\n\n.media-object.img-thumbnail {\n  max-width: none;\n}\n\n.media-right,\n.media > .pull-right {\n  padding-left: 10px;\n}\n\n.media-left,\n.media > .pull-left {\n  padding-right: 10px;\n}\n\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top;\n}\n\n.media-middle {\n  vertical-align: middle;\n}\n\n.media-bottom {\n  vertical-align: bottom;\n}\n\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n}\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n\na.list-group-item,\nbutton.list-group-item {\n  color: #555;\n}\n\na.list-group-item .list-group-item-heading,\nbutton.list-group-item .list-group-item-heading {\n  color: #333;\n}\n\na.list-group-item:hover,\na.list-group-item:focus,\nbutton.list-group-item:hover,\nbutton.list-group-item:focus {\n  text-decoration: none;\n  color: #555;\n  background-color: #f5f5f5;\n}\n\nbutton.list-group-item {\n  width: 100%;\n  text-align: left;\n}\n\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  background-color: #eeeeee;\n  color: #777777;\n  cursor: not-allowed;\n}\n\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #777777;\n}\n\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #c7ddef;\n}\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d;\n}\n\na.list-group-item-success .list-group-item-heading,\nbutton.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-success:hover,\na.list-group-item-success:focus,\nbutton.list-group-item-success:hover,\nbutton.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\n\na.list-group-item-success.active,\na.list-group-item-success.active:hover,\na.list-group-item-success.active:focus,\nbutton.list-group-item-success.active,\nbutton.list-group-item-success.active:hover,\nbutton.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f;\n}\n\na.list-group-item-info .list-group-item-heading,\nbutton.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-info:hover,\na.list-group-item-info:focus,\nbutton.list-group-item-info:hover,\nbutton.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\n\na.list-group-item-info.active,\na.list-group-item-info.active:hover,\na.list-group-item-info.active:focus,\nbutton.list-group-item-info.active,\nbutton.list-group-item-info.active:hover,\nbutton.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b;\n}\n\na.list-group-item-warning .list-group-item-heading,\nbutton.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-warning:hover,\na.list-group-item-warning:focus,\nbutton.list-group-item-warning:hover,\nbutton.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\n\na.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus,\nbutton.list-group-item-warning.active,\nbutton.list-group-item-warning.active:hover,\nbutton.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442;\n}\n\na.list-group-item-danger .list-group-item-heading,\nbutton.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-danger:hover,\na.list-group-item-danger:focus,\nbutton.list-group-item-danger:hover,\nbutton.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc;\n}\n\na.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus,\nbutton.list-group-item-danger.active,\nbutton.list-group-item-danger.active:hover,\nbutton.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n\n.panel-body {\n  padding: 15px;\n}\n\n.panel-body:before,\n.panel-body:after {\n  content: \" \";\n  display: table;\n}\n\n.panel-body:after {\n  clear: both;\n}\n\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit;\n}\n\n.panel-title > a,\n.panel-title > small,\n.panel-title > .small,\n.panel-title > small > a,\n.panel-title > .small > a {\n  color: inherit;\n}\n\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0;\n}\n\n.panel > .list-group .list-group-item,\n.panel > .panel-collapse > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n\n.panel > .list-group:first-child .list-group-item:first-child,\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n\n.panel > .list-group:last-child .list-group-item:last-child,\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n\n.panel > .table caption,\n.panel > .table-responsive > .table caption,\n.panel > .panel-collapse > .table caption {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n\n.panel > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.panel > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #ddd;\n}\n\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0;\n}\n\n.panel-group {\n  margin-bottom: 20px;\n}\n\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n\n.panel-group .panel-heading + .panel-collapse > .panel-body,\n.panel-group .panel-heading + .panel-collapse > .list-group {\n  border-top: 1px solid #ddd;\n}\n\n.panel-group .panel-footer {\n  border-top: 0;\n}\n\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #ddd;\n}\n\n.panel-default {\n  border-color: #ddd;\n}\n\n.panel-default > .panel-heading {\n  color: #333333;\n  background-color: #f5f5f5;\n  border-color: #ddd;\n}\n\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ddd;\n}\n\n.panel-default > .panel-heading .badge {\n  color: #f5f5f5;\n  background-color: #333333;\n}\n\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ddd;\n}\n\n.panel-primary {\n  border-color: #337ab7;\n}\n\n.panel-primary > .panel-heading {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #337ab7;\n}\n\n.panel-primary > .panel-heading .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #337ab7;\n}\n\n.panel-success {\n  border-color: #d6e9c6;\n}\n\n.panel-success > .panel-heading {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #d6e9c6;\n}\n\n.panel-success > .panel-heading .badge {\n  color: #dff0d8;\n  background-color: #3c763d;\n}\n\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #d6e9c6;\n}\n\n.panel-info {\n  border-color: #bce8f1;\n}\n\n.panel-info > .panel-heading {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #bce8f1;\n}\n\n.panel-info > .panel-heading .badge {\n  color: #d9edf7;\n  background-color: #31708f;\n}\n\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #bce8f1;\n}\n\n.panel-warning {\n  border-color: #faebcc;\n}\n\n.panel-warning > .panel-heading {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #faebcc;\n}\n\n.panel-warning > .panel-heading .badge {\n  color: #fcf8e3;\n  background-color: #8a6d3b;\n}\n\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #faebcc;\n}\n\n.panel-danger {\n  border-color: #ebccd1;\n}\n\n.panel-danger > .panel-heading {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ebccd1;\n}\n\n.panel-danger > .panel-heading .badge {\n  color: #f2dede;\n  background-color: #a94442;\n}\n\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ebccd1;\n}\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  border: 0;\n}\n\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%;\n}\n\n.embed-responsive-4by3 {\n  padding-bottom: 75%;\n}\n\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n\n.modal-open {\n  overflow: hidden;\n}\n\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  -o-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n\n.modal.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  -o-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: 0;\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n\n.modal-backdrop.fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n\n.modal-backdrop.in {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n\n.modal-header:before,\n.modal-header:after {\n  content: \" \";\n  display: table;\n}\n\n.modal-header:after {\n  clear: both;\n}\n\n.modal-header .close {\n  margin-top: -2px;\n}\n\n.modal-title {\n  margin: 0;\n  line-height: 1.42857;\n}\n\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n\n.modal-footer:before,\n.modal-footer:after {\n  content: \" \";\n  display: table;\n}\n\n.modal-footer:after {\n  clear: both;\n}\n\n.modal-footer .btn + .btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n\n  .modal-sm {\n    width: 300px;\n  }\n}\n\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 12px;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n\n.tooltip.in {\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px;\n}\n\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 14px;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n}\n\n.popover.top {\n  margin-top: -10px;\n}\n\n.popover.right {\n  margin-left: 10px;\n}\n\n.popover.bottom {\n  margin-top: 10px;\n}\n\n.popover.left {\n  margin-left: -10px;\n}\n\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n\n.popover-content {\n  padding: 9px 14px;\n}\n\n.popover > .arrow,\n.popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.popover > .arrow {\n  border-width: 11px;\n}\n\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\";\n}\n\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n\n.popover.top > .arrow:after {\n  content: \" \";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #fff;\n}\n\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n\n.popover.right > .arrow:after {\n  content: \" \";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #fff;\n}\n\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n\n.popover.bottom > .arrow:after {\n  content: \" \";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #fff;\n}\n\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n\n.popover.left > .arrow:after {\n  content: \" \";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #fff;\n  bottom: -10px;\n}\n\n.carousel {\n  position: relative;\n}\n\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  -o-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  line-height: 1;\n}\n\n@media all and (transform-3d), (-webkit-transform-3d) {\n  .carousel-inner > .item {\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\n    -moz-transition: -moz-transform 0.6s ease-in-out;\n    -o-transition: -o-transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out;\n    -webkit-backface-visibility: hidden;\n    -moz-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n    -moz-perspective: 1000px;\n    perspective: 1000px;\n  }\n\n  .carousel-inner > .item.next,\n  .carousel-inner > .item.active.right {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    left: 0;\n  }\n\n  .carousel-inner > .item.prev,\n  .carousel-inner > .item.active.left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    left: 0;\n  }\n\n  .carousel-inner > .item.next.left,\n  .carousel-inner > .item.prev.right,\n  .carousel-inner > .item.active {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    left: 0;\n  }\n}\n\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n\n.carousel-inner > .active {\n  left: 0;\n}\n\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.carousel-inner > .next {\n  left: 100%;\n}\n\n.carousel-inner > .prev {\n  left: -100%;\n}\n\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n\n.carousel-inner > .active.left {\n  left: -100%;\n}\n\n.carousel-inner > .active.right {\n  left: 100%;\n}\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  background-color: transparent;\n}\n\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n}\n\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n}\n\n.carousel-control:hover,\n.carousel-control:focus {\n  outline: 0;\n  color: #fff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  margin-top: -10px;\n  z-index: 5;\n  display: inline-block;\n}\n\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  line-height: 1;\n  font-family: serif;\n}\n\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n\n.carousel-control .icon-next:before {\n  content: '\\203A';\n}\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: transparent;\n}\n\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #fff;\n}\n\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n\n.carousel-caption .btn {\n  text-shadow: none;\n}\n\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -10px;\n    font-size: 30px;\n  }\n\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -10px;\n  }\n\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -10px;\n  }\n\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n\n.clearfix:after {\n  clear: both;\n}\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.pull-right {\n  float: right !important;\n}\n\n.pull-left {\n  float: left !important;\n}\n\n.hide {\n  display: none !important;\n}\n\n.show {\n  display: block !important;\n}\n\n.invisible {\n  visibility: hidden;\n}\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.affix {\n  position: fixed;\n}\n\n@-ms-viewport {\n  width: device-width;\n}\n\n.visible-xs {\n  display: none !important;\n}\n\n.visible-sm {\n  display: none !important;\n}\n\n.visible-md {\n  display: none !important;\n}\n\n.visible-lg {\n  display: none !important;\n}\n\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n\n  table.visible-xs {\n    display: table !important;\n  }\n\n  tr.visible-xs {\n    display: table-row !important;\n  }\n\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n\n  table.visible-sm {\n    display: table !important;\n  }\n\n  tr.visible-sm {\n    display: table-row !important;\n  }\n\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n\n  table.visible-md {\n    display: table !important;\n  }\n\n  tr.visible-md {\n    display: table-row !important;\n  }\n\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n\n  table.visible-lg {\n    display: table !important;\n  }\n\n  tr.visible-lg {\n    display: table-row !important;\n  }\n\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n\n.visible-print {\n  display: none !important;\n}\n\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n\n  table.visible-print {\n    display: table !important;\n  }\n\n  tr.visible-print {\n    display: table-row !important;\n  }\n\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n\n.visible-print-block {\n  display: none !important;\n}\n\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n\n.visible-print-inline {\n  display: none !important;\n}\n\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n\n.visible-print-inline-block {\n  display: none !important;\n}\n\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtbG9hZGVyL25vLW9wLmpzIiwic291cmNlcyI6WyIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1sb2FkZXIvbm8tb3AuanMiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX21peGlucy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9faGlkZS10ZXh0LnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19vcGFjaXR5LnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19pbWFnZS5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fbGFiZWxzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19yZXNldC1maWx0ZXIuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX3Jlc2l6ZS5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fcmVzcG9uc2l2ZS12aXNpYmlsaXR5LnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19zaXplLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL190YWItZm9jdXMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX3Jlc2V0LXRleHQuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX3RleHQtZW1waGFzaXMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX3RleHQtb3ZlcmZsb3cuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX3ZlbmRvci1wcmVmaXhlcy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fYWxlcnRzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19idXR0b25zLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19wYW5lbHMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX3BhZ2luYXRpb24uc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX2xpc3QtZ3JvdXAuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX25hdi1kaXZpZGVyLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19mb3Jtcy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fcHJvZ3Jlc3MtYmFyLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL190YWJsZS1yb3cuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX2JhY2tncm91bmQtdmFyaWFudC5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fYm9yZGVyLXJhZGl1cy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fZ3JhZGllbnRzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19jbGVhcmZpeC5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL21peGlucy9fY2VudGVyLWJsb2NrLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19uYXYtdmVydGljYWwtYWxpZ24uc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9taXhpbnMvX2dyaWQtZnJhbWV3b3JrLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvbWl4aW5zL19ncmlkLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3ZhcmlhYmxlcy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19ub3JtYWxpemUuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcHJpbnQuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fZ2x5cGhpY29ucy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19zY2FmZm9sZGluZy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL190eXBlLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2NvZGUuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fZ3JpZC5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL190YWJsZXMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fZm9ybXMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fYnV0dG9ucy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19jb21wb25lbnQtYW5pbWF0aW9ucy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19kcm9wZG93bnMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fYnV0dG9uLWdyb3Vwcy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19pbnB1dC1ncm91cHMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fbmF2cy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19uYXZiYXIuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fYnJlYWRjcnVtYnMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcGFnaW5hdGlvbi5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19wYWdlci5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19sYWJlbHMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fYmFkZ2VzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2p1bWJvdHJvbi5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL190aHVtYm5haWxzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2FsZXJ0cy5zY3NzIiwiL1VzZXJzL1JvaGFuL0dpdGh1Yi95b3VuaXZlcnNpdHktdjIveW91bml2ZXJzaXR5L25vZGVfbW9kdWxlcy9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19wcm9ncmVzcy1iYXJzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX21lZGlhLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2xpc3QtZ3JvdXAuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcGFuZWxzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3dlbGxzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3Jlc3BvbnNpdmUtZW1iZWQuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fY2xvc2Uuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fbW9kYWxzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3Rvb2x0aXAuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcG9wb3ZlcnMuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fY2Fyb3VzZWwuc2NzcyIsIi9Vc2Vycy9Sb2hhbi9HaXRodWIveW91bml2ZXJzaXR5LXYyL3lvdW5pdmVyc2l0eS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fdXRpbGl0aWVzLnNjc3MiLCIvVXNlcnMvUm9oYW4vR2l0aHViL3lvdW5pdmVyc2l0eS12Mi95b3VuaXZlcnNpdHkvbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3Jlc3BvbnNpdmUtdXRpbGl0aWVzLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX21peGluc1wiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3ZhcmlhYmxlc1wiO1xuJGljb24tZm9udC1wYXRoOiBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9mb250cy9ib290c3RyYXAvXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fbm9ybWFsaXplXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcHJpbnRcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19nbHlwaGljb25zXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fc2NhZmZvbGRpbmdcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL190eXBlXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fY29kZVwiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2dyaWRcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL190YWJsZXNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19mb3Jtc1wiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2J1dHRvbnNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19jb21wb25lbnQtYW5pbWF0aW9uc1wiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2Ryb3Bkb3duc1wiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2J1dHRvbi1ncm91cHNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19pbnB1dC1ncm91cHNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19uYXZzXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fbmF2YmFyXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fYnJlYWRjcnVtYnNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19wYWdpbmF0aW9uXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcGFnZXJcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19sYWJlbHNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19iYWRnZXNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19qdW1ib3Ryb25cIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL190aHVtYm5haWxzXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fYWxlcnRzXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcHJvZ3Jlc3MtYmFyc1wiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX21lZGlhXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fbGlzdC1ncm91cFwiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3BhbmVsc1wiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3dlbGxzXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fcmVzcG9uc2l2ZS1lbWJlZFwiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX2Nsb3NlXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fbW9kYWxzXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fdG9vbHRpcFwiO1xuQGltcG9ydCBcIi4uL2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib290c3RyYXAvX3BvcG92ZXJzXCI7XG5AaW1wb3J0IFwiLi4vYm9vdHN0cmFwLXNhc3MvYXNzZXRzL3N0eWxlc2hlZXRzL2Jvb3RzdHJhcC9fY2Fyb3VzZWxcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL191dGlsaXRpZXNcIjtcbkBpbXBvcnQgXCIuLi9ib290c3RyYXAtc2Fzcy9hc3NldHMvc3R5bGVzaGVldHMvYm9vdHN0cmFwL19yZXNwb25zaXZlLXV0aWxpdGllc1wiO1xuXG4iLCIvLyBNaXhpbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFV0aWxpdGllc1xuQGltcG9ydCBcIm1peGlucy9oaWRlLXRleHRcIjtcbkBpbXBvcnQgXCJtaXhpbnMvb3BhY2l0eVwiO1xuQGltcG9ydCBcIm1peGlucy9pbWFnZVwiO1xuQGltcG9ydCBcIm1peGlucy9sYWJlbHNcIjtcbkBpbXBvcnQgXCJtaXhpbnMvcmVzZXQtZmlsdGVyXCI7XG5AaW1wb3J0IFwibWl4aW5zL3Jlc2l6ZVwiO1xuQGltcG9ydCBcIm1peGlucy9yZXNwb25zaXZlLXZpc2liaWxpdHlcIjtcbkBpbXBvcnQgXCJtaXhpbnMvc2l6ZVwiO1xuQGltcG9ydCBcIm1peGlucy90YWItZm9jdXNcIjtcbkBpbXBvcnQgXCJtaXhpbnMvcmVzZXQtdGV4dFwiO1xuQGltcG9ydCBcIm1peGlucy90ZXh0LWVtcGhhc2lzXCI7XG5AaW1wb3J0IFwibWl4aW5zL3RleHQtb3ZlcmZsb3dcIjtcbkBpbXBvcnQgXCJtaXhpbnMvdmVuZG9yLXByZWZpeGVzXCI7XG5cbi8vIENvbXBvbmVudHNcbkBpbXBvcnQgXCJtaXhpbnMvYWxlcnRzXCI7XG5AaW1wb3J0IFwibWl4aW5zL2J1dHRvbnNcIjtcbkBpbXBvcnQgXCJtaXhpbnMvcGFuZWxzXCI7XG5AaW1wb3J0IFwibWl4aW5zL3BhZ2luYXRpb25cIjtcbkBpbXBvcnQgXCJtaXhpbnMvbGlzdC1ncm91cFwiO1xuQGltcG9ydCBcIm1peGlucy9uYXYtZGl2aWRlclwiO1xuQGltcG9ydCBcIm1peGlucy9mb3Jtc1wiO1xuQGltcG9ydCBcIm1peGlucy9wcm9ncmVzcy1iYXJcIjtcbkBpbXBvcnQgXCJtaXhpbnMvdGFibGUtcm93XCI7XG5cbi8vIFNraW5zXG5AaW1wb3J0IFwibWl4aW5zL2JhY2tncm91bmQtdmFyaWFudFwiO1xuQGltcG9ydCBcIm1peGlucy9ib3JkZXItcmFkaXVzXCI7XG5AaW1wb3J0IFwibWl4aW5zL2dyYWRpZW50c1wiO1xuXG4vLyBMYXlvdXRcbkBpbXBvcnQgXCJtaXhpbnMvY2xlYXJmaXhcIjtcbkBpbXBvcnQgXCJtaXhpbnMvY2VudGVyLWJsb2NrXCI7XG5AaW1wb3J0IFwibWl4aW5zL25hdi12ZXJ0aWNhbC1hbGlnblwiO1xuQGltcG9ydCBcIm1peGlucy9ncmlkLWZyYW1ld29ya1wiO1xuQGltcG9ydCBcIm1peGlucy9ncmlkXCI7XG4iLCIvLyBDU1MgaW1hZ2UgcmVwbGFjZW1lbnRcbi8vXG4vLyBIZWFkcyB1cCEgdjMgbGF1bmNoZWQgd2l0aCBvbmx5IGAuaGlkZS10ZXh0KClgLCBidXQgcGVyIG91ciBwYXR0ZXJuIGZvclxuLy8gbWl4aW5zIGJlaW5nIHJldXNlZCBhcyBjbGFzc2VzIHdpdGggdGhlIHNhbWUgbmFtZSwgdGhpcyBkb2Vzbid0IGhvbGQgdXAuIEFzXG4vLyBvZiB2My4wLjEgd2UgaGF2ZSBhZGRlZCBgLnRleHQtaGlkZSgpYCBhbmQgZGVwcmVjYXRlZCBgLmhpZGUtdGV4dCgpYC5cbi8vXG4vLyBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9oNWJwL2h0bWw1LWJvaWxlcnBsYXRlL2NvbW1pdC9hYTAzOTZlYWU3NTdcblxuLy8gRGVwcmVjYXRlZCBhcyBvZiB2My4wLjEgKGhhcyBiZWVuIHJlbW92ZWQgaW4gdjQpXG5AbWl4aW4gaGlkZS10ZXh0KCkge1xuICBmb250OiAwLzAgYTtcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xuICB0ZXh0LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMDtcbn1cblxuLy8gTmV3IG1peGluIHRvIHVzZSBhcyBvZiB2My4wLjFcbkBtaXhpbiB0ZXh0LWhpZGUoKSB7XG4gIEBpbmNsdWRlIGhpZGUtdGV4dDtcbn1cbiIsIi8vIE9wYWNpdHlcblxuQG1peGluIG9wYWNpdHkoJG9wYWNpdHkpIHtcbiAgb3BhY2l0eTogJG9wYWNpdHk7XG4gIC8vIElFOCBmaWx0ZXJcbiAgJG9wYWNpdHktaWU6ICgkb3BhY2l0eSAqIDEwMCk7XG4gIGZpbHRlcjogYWxwaGEob3BhY2l0eT0kb3BhY2l0eS1pZSk7XG59XG4iLCIvLyBJbWFnZSBNaXhpbnNcbi8vIC0gUmVzcG9uc2l2ZSBpbWFnZVxuLy8gLSBSZXRpbmEgaW1hZ2VcblxuXG4vLyBSZXNwb25zaXZlIGltYWdlXG4vL1xuLy8gS2VlcCBpbWFnZXMgZnJvbSBzY2FsaW5nIGJleW9uZCB0aGUgd2lkdGggb2YgdGhlaXIgcGFyZW50cy5cbkBtaXhpbiBpbWctcmVzcG9uc2l2ZSgkZGlzcGxheTogYmxvY2spIHtcbiAgZGlzcGxheTogJGRpc3BsYXk7XG4gIG1heC13aWR0aDogMTAwJTsgLy8gUGFydCAxOiBTZXQgYSBtYXhpbXVtIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnRcbiAgaGVpZ2h0OiBhdXRvOyAvLyBQYXJ0IDI6IFNjYWxlIHRoZSBoZWlnaHQgYWNjb3JkaW5nIHRvIHRoZSB3aWR0aCwgb3RoZXJ3aXNlIHlvdSBnZXQgc3RyZXRjaGluZ1xufVxuXG5cbi8vIFJldGluYSBpbWFnZVxuLy9cbi8vIFNob3J0IHJldGluYSBtaXhpbiBmb3Igc2V0dGluZyBiYWNrZ3JvdW5kLWltYWdlIGFuZCAtc2l6ZS4gTm90ZSB0aGF0IHRoZVxuLy8gc3BlbGxpbmcgb2YgYG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpb2AgaXMgaW50ZW50aW9uYWwuXG5AbWl4aW4gaW1nLXJldGluYSgkZmlsZS0xeCwgJGZpbGUtMngsICR3aWR0aC0xeCwgJGhlaWdodC0xeCkge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaWYoJGJvb3RzdHJhcC1zYXNzLWFzc2V0LWhlbHBlciwgdHdicy1pbWFnZS1wYXRoKFwiI3skZmlsZS0xeH1cIiksIFwiI3skZmlsZS0xeH1cIikpO1xuXG4gIEBtZWRpYVxuICBvbmx5IHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMiksXG4gIG9ubHkgc2NyZWVuIGFuZCAoICAgbWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSxcbiAgb25seSBzY3JlZW4gYW5kICggICAgIC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksXG4gIG9ubHkgc2NyZWVuIGFuZCAoICAgICAgICBtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSxcbiAgb25seSBzY3JlZW4gYW5kICggICAgICAgICAgICAgICAgbWluLXJlc29sdXRpb246IDE5MmRwaSksXG4gIG9ubHkgc2NyZWVuIGFuZCAoICAgICAgICAgICAgICAgIG1pbi1yZXNvbHV0aW9uOiAyZHBweCkge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChpZigkYm9vdHN0cmFwLXNhc3MtYXNzZXQtaGVscGVyLCB0d2JzLWltYWdlLXBhdGgoXCIjeyRmaWxlLTJ4fVwiKSwgXCIjeyRmaWxlLTJ4fVwiKSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiAkd2lkdGgtMXggJGhlaWdodC0xeDtcbiAgfVxufVxuIiwiLy8gTGFiZWxzXG5cbkBtaXhpbiBsYWJlbC12YXJpYW50KCRjb2xvcikge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG5cbiAgJltocmVmXSB7XG4gICAgJjpob3ZlcixcbiAgICAmOmZvY3VzIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkY29sb3IsIDEwJSk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBSZXNldCBmaWx0ZXJzIGZvciBJRVxuLy9cbi8vIFdoZW4geW91IG5lZWQgdG8gcmVtb3ZlIGEgZ3JhZGllbnQgYmFja2dyb3VuZCwgZG8gbm90IGZvcmdldCB0byB1c2UgdGhpcyB0byByZXNldFxuLy8gdGhlIElFIGZpbHRlciBmb3IgSUU5IGFuZCBiZWxvdy5cblxuQG1peGluIHJlc2V0LWZpbHRlcigpIHtcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoZW5hYmxlZCA9IGZhbHNlKTtcbn1cbiIsIi8vIFJlc2l6ZSBhbnl0aGluZ1xuXG5AbWl4aW4gcmVzaXphYmxlKCRkaXJlY3Rpb24pIHtcbiAgcmVzaXplOiAkZGlyZWN0aW9uOyAvLyBPcHRpb25zOiBob3Jpem9udGFsLCB2ZXJ0aWNhbCwgYm90aFxuICBvdmVyZmxvdzogYXV0bzsgLy8gUGVyIENTUzMgVUksIGByZXNpemVgIG9ubHkgYXBwbGllcyB3aGVuIGBvdmVyZmxvd2AgaXNuJ3QgYHZpc2libGVgXG59XG4iLCIvLyBSZXNwb25zaXZlIHV0aWxpdGllc1xuXG4vL1xuLy8gTW9yZSBlYXNpbHkgaW5jbHVkZSBhbGwgdGhlIHN0YXRlcyBmb3IgcmVzcG9uc2l2ZS11dGlsaXRpZXMubGVzcy5cbi8vIFtjb252ZXJ0ZXJdICRwYXJlbnQgaGFja1xuQG1peGluIHJlc3BvbnNpdmUtdmlzaWJpbGl0eSgkcGFyZW50KSB7XG4gICN7JHBhcmVudH0ge1xuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gIH1cbiAgdGFibGUjeyRwYXJlbnR9ICB7IGRpc3BsYXk6IHRhYmxlICFpbXBvcnRhbnQ7IH1cbiAgdHIjeyRwYXJlbnR9ICAgICB7IGRpc3BsYXk6IHRhYmxlLXJvdyAhaW1wb3J0YW50OyB9XG4gIHRoI3skcGFyZW50fSxcbiAgdGQjeyRwYXJlbnR9ICAgICB7IGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDsgfVxufVxuXG4vLyBbY29udmVydGVyXSAkcGFyZW50IGhhY2tcbkBtaXhpbiByZXNwb25zaXZlLWludmlzaWJpbGl0eSgkcGFyZW50KSB7XG4gICN7JHBhcmVudH0ge1xuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgfVxufVxuIiwiLy8gU2l6aW5nIHNob3J0Y3V0c1xuXG5AbWl4aW4gc2l6ZSgkd2lkdGgsICRoZWlnaHQpIHtcbiAgd2lkdGg6ICR3aWR0aDtcbiAgaGVpZ2h0OiAkaGVpZ2h0O1xufVxuXG5AbWl4aW4gc3F1YXJlKCRzaXplKSB7XG4gIEBpbmNsdWRlIHNpemUoJHNpemUsICRzaXplKTtcbn1cbiIsIi8vIFdlYktpdC1zdHlsZSBmb2N1c1xuXG5AbWl4aW4gdGFiLWZvY3VzKCkge1xuICAvLyBEZWZhdWx0XG4gIG91dGxpbmU6IHRoaW4gZG90dGVkO1xuICAvLyBXZWJLaXRcbiAgb3V0bGluZTogNXB4IGF1dG8gLXdlYmtpdC1mb2N1cy1yaW5nLWNvbG9yO1xuICBvdXRsaW5lLW9mZnNldDogLTJweDtcbn1cbiIsIkBtaXhpbiByZXNldC10ZXh0KCkge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LWJhc2U7XG4gIC8vIFdlIGRlbGliZXJhdGVseSBkbyBOT1QgcmVzZXQgZm9udC1zaXplLlxuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIGxpbmUtYnJlYWs6IGF1dG87XG4gIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtYmFzZTtcbiAgdGV4dC1hbGlnbjogbGVmdDsgLy8gRmFsbGJhY2sgZm9yIHdoZXJlIGBzdGFydGAgaXMgbm90IHN1cHBvcnRlZFxuICB0ZXh0LWFsaWduOiBzdGFydDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXNoYWRvdzogbm9uZTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIHdvcmQtYnJlYWs6IG5vcm1hbDtcbiAgd29yZC1zcGFjaW5nOiBub3JtYWw7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xufVxuIiwiLy8gVHlwb2dyYXBoeVxuXG4vLyBbY29udmVydGVyXSAkcGFyZW50IGhhY2tcbkBtaXhpbiB0ZXh0LWVtcGhhc2lzLXZhcmlhbnQoJHBhcmVudCwgJGNvbG9yKSB7XG4gICN7JHBhcmVudH0ge1xuICAgIGNvbG9yOiAkY29sb3I7XG4gIH1cbiAgYSN7JHBhcmVudH06aG92ZXIsXG4gIGEjeyRwYXJlbnR9OmZvY3VzIHtcbiAgICBjb2xvcjogZGFya2VuKCRjb2xvciwgMTAlKTtcbiAgfVxufVxuIiwiLy8gVGV4dCBvdmVyZmxvd1xuLy8gUmVxdWlyZXMgaW5saW5lLWJsb2NrIG9yIGJsb2NrIGZvciBwcm9wZXIgc3R5bGluZ1xuXG5AbWl4aW4gdGV4dC1vdmVyZmxvdygpIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG4iLCIvLyBWZW5kb3IgUHJlZml4ZXNcbi8vXG4vLyBBbGwgdmVuZG9yIG1peGlucyBhcmUgZGVwcmVjYXRlZCBhcyBvZiB2My4yLjAgZHVlIHRvIHRoZSBpbnRyb2R1Y3Rpb24gb2Zcbi8vIEF1dG9wcmVmaXhlciBpbiBvdXIgR3J1bnRmaWxlLiBUaGV5IGhhdmUgYmVlbiByZW1vdmVkIGluIHY0LlxuXG4vLyAtIEFuaW1hdGlvbnNcbi8vIC0gQmFja2ZhY2UgdmlzaWJpbGl0eVxuLy8gLSBCb3ggc2hhZG93XG4vLyAtIEJveCBzaXppbmdcbi8vIC0gQ29udGVudCBjb2x1bW5zXG4vLyAtIEh5cGhlbnNcbi8vIC0gUGxhY2Vob2xkZXIgdGV4dFxuLy8gLSBUcmFuc2Zvcm1hdGlvbnNcbi8vIC0gVHJhbnNpdGlvbnNcbi8vIC0gVXNlciBTZWxlY3RcblxuXG4vLyBBbmltYXRpb25zXG5AbWl4aW4gYW5pbWF0aW9uKCRhbmltYXRpb24pIHtcbiAgLXdlYmtpdC1hbmltYXRpb246ICRhbmltYXRpb247XG4gICAgICAgLW8tYW5pbWF0aW9uOiAkYW5pbWF0aW9uO1xuICAgICAgICAgIGFuaW1hdGlvbjogJGFuaW1hdGlvbjtcbn1cbkBtaXhpbiBhbmltYXRpb24tbmFtZSgkbmFtZSkge1xuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiAkbmFtZTtcbiAgICAgICAgICBhbmltYXRpb24tbmFtZTogJG5hbWU7XG59XG5AbWl4aW4gYW5pbWF0aW9uLWR1cmF0aW9uKCRkdXJhdGlvbikge1xuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogJGR1cmF0aW9uO1xuICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogJGR1cmF0aW9uO1xufVxuQG1peGluIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb24oJHRpbWluZy1mdW5jdGlvbikge1xuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ICR0aW1pbmctZnVuY3Rpb247XG4gICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogJHRpbWluZy1mdW5jdGlvbjtcbn1cbkBtaXhpbiBhbmltYXRpb24tZGVsYXkoJGRlbGF5KSB7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAkZGVsYXk7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAkZGVsYXk7XG59XG5AbWl4aW4gYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCgkaXRlcmF0aW9uLWNvdW50KSB7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogJGl0ZXJhdGlvbi1jb3VudDtcbiAgICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAkaXRlcmF0aW9uLWNvdW50O1xufVxuQG1peGluIGFuaW1hdGlvbi1kaXJlY3Rpb24oJGRpcmVjdGlvbikge1xuICAtd2Via2l0LWFuaW1hdGlvbi1kaXJlY3Rpb246ICRkaXJlY3Rpb247XG4gICAgICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcbn1cbkBtaXhpbiBhbmltYXRpb24tZmlsbC1tb2RlKCRmaWxsLW1vZGUpIHtcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiAkZmlsbC1tb2RlO1xuICAgICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6ICRmaWxsLW1vZGU7XG59XG5cbi8vIEJhY2tmYWNlIHZpc2liaWxpdHlcbi8vIFByZXZlbnQgYnJvd3NlcnMgZnJvbSBmbGlja2VyaW5nIHdoZW4gdXNpbmcgQ1NTIDNEIHRyYW5zZm9ybXMuXG4vLyBEZWZhdWx0IHZhbHVlIGlzIGB2aXNpYmxlYCwgYnV0IGNhbiBiZSBjaGFuZ2VkIHRvIGBoaWRkZW5gXG5cbkBtaXhpbiBiYWNrZmFjZS12aXNpYmlsaXR5KCR2aXNpYmlsaXR5KSB7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogJHZpc2liaWxpdHk7XG4gICAgIC1tb3otYmFja2ZhY2UtdmlzaWJpbGl0eTogJHZpc2liaWxpdHk7XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogJHZpc2liaWxpdHk7XG59XG5cbi8vIERyb3Agc2hhZG93c1xuLy9cbi8vIE5vdGU6IERlcHJlY2F0ZWQgYC5ib3gtc2hhZG93KClgIGFzIG9mIHYzLjEuMCBzaW5jZSBhbGwgb2YgQm9vdHN0cmFwJ3Ncbi8vIHN1cHBvcnRlZCBicm93c2VycyB0aGF0IGhhdmUgYm94IHNoYWRvdyBjYXBhYmlsaXRpZXMgbm93IHN1cHBvcnQgaXQuXG5cbkBtaXhpbiBib3gtc2hhZG93KCRzaGFkb3cuLi4pIHtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAkc2hhZG93OyAvLyBpT1MgPDQuMyAmIEFuZHJvaWQgPDQuMVxuICAgICAgICAgIGJveC1zaGFkb3c6ICRzaGFkb3c7XG59XG5cbi8vIEJveCBzaXppbmdcbkBtaXhpbiBib3gtc2l6aW5nKCRib3htb2RlbCkge1xuICAtd2Via2l0LWJveC1zaXppbmc6ICRib3htb2RlbDtcbiAgICAgLW1vei1ib3gtc2l6aW5nOiAkYm94bW9kZWw7XG4gICAgICAgICAgYm94LXNpemluZzogJGJveG1vZGVsO1xufVxuXG4vLyBDU1MzIENvbnRlbnQgQ29sdW1uc1xuQG1peGluIGNvbnRlbnQtY29sdW1ucygkY29sdW1uLWNvdW50LCAkY29sdW1uLWdhcDogJGdyaWQtZ3V0dGVyLXdpZHRoKSB7XG4gIC13ZWJraXQtY29sdW1uLWNvdW50OiAkY29sdW1uLWNvdW50O1xuICAgICAtbW96LWNvbHVtbi1jb3VudDogJGNvbHVtbi1jb3VudDtcbiAgICAgICAgICBjb2x1bW4tY291bnQ6ICRjb2x1bW4tY291bnQ7XG4gIC13ZWJraXQtY29sdW1uLWdhcDogJGNvbHVtbi1nYXA7XG4gICAgIC1tb3otY29sdW1uLWdhcDogJGNvbHVtbi1nYXA7XG4gICAgICAgICAgY29sdW1uLWdhcDogJGNvbHVtbi1nYXA7XG59XG5cbi8vIE9wdGlvbmFsIGh5cGhlbmF0aW9uXG5AbWl4aW4gaHlwaGVucygkbW9kZTogYXV0bykge1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIC13ZWJraXQtaHlwaGVuczogJG1vZGU7XG4gICAgIC1tb3otaHlwaGVuczogJG1vZGU7XG4gICAgICAtbXMtaHlwaGVuczogJG1vZGU7IC8vIElFMTArXG4gICAgICAgLW8taHlwaGVuczogJG1vZGU7XG4gICAgICAgICAgaHlwaGVuczogJG1vZGU7XG59XG5cbi8vIFBsYWNlaG9sZGVyIHRleHRcbkBtaXhpbiBwbGFjZWhvbGRlcigkY29sb3I6ICRpbnB1dC1jb2xvci1wbGFjZWhvbGRlcikge1xuICAvLyBGaXJlZm94XG4gICY6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiAkY29sb3I7XG4gICAgb3BhY2l0eTogMTsgLy8gT3ZlcnJpZGUgRmlyZWZveCdzIHVudXN1YWwgZGVmYXVsdCBvcGFjaXR5OyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL3B1bGwvMTE1MjZcbiAgfVxuICAmOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAkY29sb3I7IH0gLy8gSW50ZXJuZXQgRXhwbG9yZXIgMTArXG4gICY6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgIHsgY29sb3I6ICRjb2xvcjsgfSAvLyBTYWZhcmkgYW5kIENocm9tZVxufVxuXG4vLyBUcmFuc2Zvcm1hdGlvbnNcbkBtaXhpbiBzY2FsZSgkcmF0aW8uLi4pIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKCRyYXRpbyk7XG4gICAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgkcmF0aW8pOyAvLyBJRTkgb25seVxuICAgICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoJHJhdGlvKTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKCRyYXRpbyk7XG59XG5cbkBtaXhpbiBzY2FsZVgoJHJhdGlvKSB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoJHJhdGlvKTtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWCgkcmF0aW8pOyAvLyBJRTkgb25seVxuICAgICAgIC1vLXRyYW5zZm9ybTogc2NhbGVYKCRyYXRpbyk7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoJHJhdGlvKTtcbn1cbkBtaXhpbiBzY2FsZVkoJHJhdGlvKSB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVkoJHJhdGlvKTtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWSgkcmF0aW8pOyAvLyBJRTkgb25seVxuICAgICAgIC1vLXRyYW5zZm9ybTogc2NhbGVZKCRyYXRpbyk7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVkoJHJhdGlvKTtcbn1cbkBtaXhpbiBza2V3KCR4LCAkeSkge1xuICAtd2Via2l0LXRyYW5zZm9ybTogc2tld1goJHgpIHNrZXdZKCR5KTtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHNrZXdYKCR4KSBza2V3WSgkeSk7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzQ4ODU7IElFOStcbiAgICAgICAtby10cmFuc2Zvcm06IHNrZXdYKCR4KSBza2V3WSgkeSk7XG4gICAgICAgICAgdHJhbnNmb3JtOiBza2V3WCgkeCkgc2tld1koJHkpO1xufVxuQG1peGluIHRyYW5zbGF0ZSgkeCwgJHkpIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgkeCwgJHkpO1xuICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKCR4LCAkeSk7IC8vIElFOSBvbmx5XG4gICAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoJHgsICR5KTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgkeCwgJHkpO1xufVxuQG1peGluIHRyYW5zbGF0ZTNkKCR4LCAkeSwgJHopIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKCR4LCAkeSwgJHopO1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoJHgsICR5LCAkeik7XG59XG5AbWl4aW4gcm90YXRlKCRkZWdyZWVzKSB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoJGRlZ3JlZXMpO1xuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKCRkZWdyZWVzKTsgLy8gSUU5IG9ubHlcbiAgICAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgkZGVncmVlcyk7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoJGRlZ3JlZXMpO1xufVxuQG1peGluIHJvdGF0ZVgoJGRlZ3JlZXMpIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVgoJGRlZ3JlZXMpO1xuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlWCgkZGVncmVlcyk7IC8vIElFOSBvbmx5XG4gICAgICAgLW8tdHJhbnNmb3JtOiByb3RhdGVYKCRkZWdyZWVzKTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoJGRlZ3JlZXMpO1xufVxuQG1peGluIHJvdGF0ZVkoJGRlZ3JlZXMpIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoJGRlZ3JlZXMpO1xuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlWSgkZGVncmVlcyk7IC8vIElFOSBvbmx5XG4gICAgICAgLW8tdHJhbnNmb3JtOiByb3RhdGVZKCRkZWdyZWVzKTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoJGRlZ3JlZXMpO1xufVxuQG1peGluIHBlcnNwZWN0aXZlKCRwZXJzcGVjdGl2ZSkge1xuICAtd2Via2l0LXBlcnNwZWN0aXZlOiAkcGVyc3BlY3RpdmU7XG4gICAgIC1tb3otcGVyc3BlY3RpdmU6ICRwZXJzcGVjdGl2ZTtcbiAgICAgICAgICBwZXJzcGVjdGl2ZTogJHBlcnNwZWN0aXZlO1xufVxuQG1peGluIHBlcnNwZWN0aXZlLW9yaWdpbigkcGVyc3BlY3RpdmUpIHtcbiAgLXdlYmtpdC1wZXJzcGVjdGl2ZS1vcmlnaW46ICRwZXJzcGVjdGl2ZTtcbiAgICAgLW1vei1wZXJzcGVjdGl2ZS1vcmlnaW46ICRwZXJzcGVjdGl2ZTtcbiAgICAgICAgICBwZXJzcGVjdGl2ZS1vcmlnaW46ICRwZXJzcGVjdGl2ZTtcbn1cbkBtaXhpbiB0cmFuc2Zvcm0tb3JpZ2luKCRvcmlnaW4pIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAkb3JpZ2luO1xuICAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46ICRvcmlnaW47XG4gICAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogJG9yaWdpbjsgLy8gSUU5IG9ubHlcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAkb3JpZ2luO1xufVxuXG5cbi8vIFRyYW5zaXRpb25zXG5cbkBtaXhpbiB0cmFuc2l0aW9uKCR0cmFuc2l0aW9uLi4uKSB7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogJHRyYW5zaXRpb247XG4gICAgICAgLW8tdHJhbnNpdGlvbjogJHRyYW5zaXRpb247XG4gICAgICAgICAgdHJhbnNpdGlvbjogJHRyYW5zaXRpb247XG59XG5AbWl4aW4gdHJhbnNpdGlvbi1wcm9wZXJ0eSgkdHJhbnNpdGlvbi1wcm9wZXJ0eS4uLikge1xuICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6ICR0cmFuc2l0aW9uLXByb3BlcnR5O1xuICAgICAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6ICR0cmFuc2l0aW9uLXByb3BlcnR5O1xufVxuQG1peGluIHRyYW5zaXRpb24tZGVsYXkoJHRyYW5zaXRpb24tZGVsYXkpIHtcbiAgLXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OiAkdHJhbnNpdGlvbi1kZWxheTtcbiAgICAgICAgICB0cmFuc2l0aW9uLWRlbGF5OiAkdHJhbnNpdGlvbi1kZWxheTtcbn1cbkBtaXhpbiB0cmFuc2l0aW9uLWR1cmF0aW9uKCR0cmFuc2l0aW9uLWR1cmF0aW9uLi4uKSB7XG4gIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHRyYW5zaXRpb24tZHVyYXRpb247XG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogJHRyYW5zaXRpb24tZHVyYXRpb247XG59XG5AbWl4aW4gdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24oJHRpbWluZy1mdW5jdGlvbikge1xuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiAkdGltaW5nLWZ1bmN0aW9uO1xuICAgICAgICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiAkdGltaW5nLWZ1bmN0aW9uO1xufVxuQG1peGluIHRyYW5zaXRpb24tdHJhbnNmb3JtKCR0cmFuc2l0aW9uLi4uKSB7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gJHRyYW5zaXRpb247XG4gICAgIC1tb3otdHJhbnNpdGlvbjogLW1vei10cmFuc2Zvcm0gJHRyYW5zaXRpb247XG4gICAgICAgLW8tdHJhbnNpdGlvbjogLW8tdHJhbnNmb3JtICR0cmFuc2l0aW9uO1xuICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAkdHJhbnNpdGlvbjtcbn1cblxuXG4vLyBVc2VyIHNlbGVjdFxuLy8gRm9yIHNlbGVjdGluZyB0ZXh0IG9uIHRoZSBwYWdlXG5cbkBtaXhpbiB1c2VyLXNlbGVjdCgkc2VsZWN0KSB7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6ICRzZWxlY3Q7XG4gICAgIC1tb3otdXNlci1zZWxlY3Q6ICRzZWxlY3Q7XG4gICAgICAtbXMtdXNlci1zZWxlY3Q6ICRzZWxlY3Q7IC8vIElFMTArXG4gICAgICAgICAgdXNlci1zZWxlY3Q6ICRzZWxlY3Q7XG59XG4iLCIvLyBBbGVydHNcblxuQG1peGluIGFsZXJ0LXZhcmlhbnQoJGJhY2tncm91bmQsICRib3JkZXIsICR0ZXh0LWNvbG9yKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kO1xuICBib3JkZXItY29sb3I6ICRib3JkZXI7XG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcblxuICBociB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogZGFya2VuKCRib3JkZXIsIDUlKTtcbiAgfVxuICAuYWxlcnQtbGluayB7XG4gICAgY29sb3I6IGRhcmtlbigkdGV4dC1jb2xvciwgMTAlKTtcbiAgfVxufVxuIiwiLy8gQnV0dG9uIHZhcmlhbnRzXG4vL1xuLy8gRWFzaWx5IHB1bXAgb3V0IGRlZmF1bHQgc3R5bGVzLCBhcyB3ZWxsIGFzIDpob3ZlciwgOmZvY3VzLCA6YWN0aXZlLFxuLy8gYW5kIGRpc2FibGVkIG9wdGlvbnMgZm9yIGFsbCBidXR0b25zXG5cbkBtaXhpbiBidXR0b24tdmFyaWFudCgkY29sb3IsICRiYWNrZ3JvdW5kLCAkYm9yZGVyKSB7XG4gIGNvbG9yOiAkY29sb3I7XG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kO1xuICBib3JkZXItY29sb3I6ICRib3JkZXI7XG5cbiAgJjpmb2N1cyxcbiAgJi5mb2N1cyB7XG4gICAgY29sb3I6ICRjb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZW4oJGJhY2tncm91bmQsIDEwJSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogZGFya2VuKCRib3JkZXIsIDI1JSk7XG4gIH1cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6ICRjb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZW4oJGJhY2tncm91bmQsIDEwJSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogZGFya2VuKCRib3JkZXIsIDEyJSk7XG4gIH1cbiAgJjphY3RpdmUsXG4gICYuYWN0aXZlLFxuICAub3BlbiA+ICYuZHJvcGRvd24tdG9nZ2xlIHtcbiAgICBjb2xvcjogJGNvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkYmFja2dyb3VuZCwgMTAlKTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBkYXJrZW4oJGJvcmRlciwgMTIlKTtcblxuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyxcbiAgICAmLmZvY3VzIHtcbiAgICAgIGNvbG9yOiAkY29sb3I7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZW4oJGJhY2tncm91bmQsIDE3JSk7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBkYXJrZW4oJGJvcmRlciwgMjUlKTtcbiAgICB9XG4gIH1cbiAgJjphY3RpdmUsXG4gICYuYWN0aXZlLFxuICAub3BlbiA+ICYuZHJvcGRvd24tdG9nZ2xlIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICB9XG4gICYuZGlzYWJsZWQsXG4gICZbZGlzYWJsZWRdLFxuICBmaWVsZHNldFtkaXNhYmxlZF0gJiB7XG4gICAgJjpob3ZlcixcbiAgICAmOmZvY3VzLFxuICAgICYuZm9jdXMge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQ7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyO1xuICAgIH1cbiAgfVxuXG4gIC5iYWRnZSB7XG4gICAgY29sb3I6ICRiYWNrZ3JvdW5kO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbiAgfVxufVxuXG4vLyBCdXR0b24gc2l6ZXNcbkBtaXhpbiBidXR0b24tc2l6ZSgkcGFkZGluZy12ZXJ0aWNhbCwgJHBhZGRpbmctaG9yaXpvbnRhbCwgJGZvbnQtc2l6ZSwgJGxpbmUtaGVpZ2h0LCAkYm9yZGVyLXJhZGl1cykge1xuICBwYWRkaW5nOiAkcGFkZGluZy12ZXJ0aWNhbCAkcGFkZGluZy1ob3Jpem9udGFsO1xuICBmb250LXNpemU6ICRmb250LXNpemU7XG4gIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzO1xufVxuIiwiLy8gUGFuZWxzXG5cbkBtaXhpbiBwYW5lbC12YXJpYW50KCRib3JkZXIsICRoZWFkaW5nLXRleHQtY29sb3IsICRoZWFkaW5nLWJnLWNvbG9yLCAkaGVhZGluZy1ib3JkZXIpIHtcbiAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyO1xuXG4gICYgPiAucGFuZWwtaGVhZGluZyB7XG4gICAgY29sb3I6ICRoZWFkaW5nLXRleHQtY29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGhlYWRpbmctYmctY29sb3I7XG4gICAgYm9yZGVyLWNvbG9yOiAkaGVhZGluZy1ib3JkZXI7XG5cbiAgICArIC5wYW5lbC1jb2xsYXBzZSA+IC5wYW5lbC1ib2R5IHtcbiAgICAgIGJvcmRlci10b3AtY29sb3I6ICRib3JkZXI7XG4gICAgfVxuICAgIC5iYWRnZSB7XG4gICAgICBjb2xvcjogJGhlYWRpbmctYmctY29sb3I7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGVhZGluZy10ZXh0LWNvbG9yO1xuICAgIH1cbiAgfVxuICAmID4gLnBhbmVsLWZvb3RlciB7XG4gICAgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSB7XG4gICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkYm9yZGVyO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gUGFnaW5hdGlvblxuXG5AbWl4aW4gcGFnaW5hdGlvbi1zaXplKCRwYWRkaW5nLXZlcnRpY2FsLCAkcGFkZGluZy1ob3Jpem9udGFsLCAkZm9udC1zaXplLCAkbGluZS1oZWlnaHQsICRib3JkZXItcmFkaXVzKSB7XG4gID4gbGkge1xuICAgID4gYSxcbiAgICA+IHNwYW4ge1xuICAgICAgcGFkZGluZzogJHBhZGRpbmctdmVydGljYWwgJHBhZGRpbmctaG9yaXpvbnRhbDtcbiAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgfVxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgPiBhLFxuICAgICAgPiBzcGFuIHtcbiAgICAgICAgQGluY2x1ZGUgYm9yZGVyLWxlZnQtcmFkaXVzKCRib3JkZXItcmFkaXVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgID4gYSxcbiAgICAgID4gc3BhbiB7XG4gICAgICAgIEBpbmNsdWRlIGJvcmRlci1yaWdodC1yYWRpdXMoJGJvcmRlci1yYWRpdXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gTGlzdCBHcm91cHNcblxuQG1peGluIGxpc3QtZ3JvdXAtaXRlbS12YXJpYW50KCRzdGF0ZSwgJGJhY2tncm91bmQsICRjb2xvcikge1xuICAubGlzdC1ncm91cC1pdGVtLSN7JHN0YXRlfSB7XG4gICAgY29sb3I6ICRjb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZDtcblxuICAgIC8vIFtjb252ZXJ0ZXJdIGV4dHJhY3RlZCBhJiwgYnV0dG9uJiB0byBhLmxpc3QtZ3JvdXAtaXRlbS0jeyRzdGF0ZX0sIGJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tI3skc3RhdGV9XG4gIH1cblxuICBhLmxpc3QtZ3JvdXAtaXRlbS0jeyRzdGF0ZX0sXG4gIGJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0tI3skc3RhdGV9IHtcbiAgICBjb2xvcjogJGNvbG9yO1xuXG4gICAgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIH1cblxuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBjb2xvcjogJGNvbG9yO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2VuKCRiYWNrZ3JvdW5kLCA1JSk7XG4gICAgfVxuICAgICYuYWN0aXZlLFxuICAgICYuYWN0aXZlOmhvdmVyLFxuICAgICYuYWN0aXZlOmZvY3VzIHtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yO1xuICAgICAgYm9yZGVyLWNvbG9yOiAkY29sb3I7XG4gICAgfVxuICB9XG59XG4iLCIvLyBIb3Jpem9udGFsIGRpdmlkZXJzXG4vL1xuLy8gRGl2aWRlcnMgKGJhc2ljYWxseSBhbiBocikgd2l0aGluIGRyb3Bkb3ducyBhbmQgbmF2IGxpc3RzXG5cbkBtaXhpbiBuYXYtZGl2aWRlcigkY29sb3I6ICNlNWU1ZTUpIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIG1hcmdpbjogKCgkbGluZS1oZWlnaHQtY29tcHV0ZWQgLyAyKSAtIDEpIDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbn1cbiIsIi8vIEZvcm0gdmFsaWRhdGlvbiBzdGF0ZXNcbi8vXG4vLyBVc2VkIGluIGZvcm1zLmxlc3MgdG8gZ2VuZXJhdGUgdGhlIGZvcm0gdmFsaWRhdGlvbiBDU1MgZm9yIHdhcm5pbmdzLCBlcnJvcnMsXG4vLyBhbmQgc3VjY2Vzc2VzLlxuXG5AbWl4aW4gZm9ybS1jb250cm9sLXZhbGlkYXRpb24oJHRleHQtY29sb3I6ICM1NTUsICRib3JkZXItY29sb3I6ICNjY2MsICRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1KSB7XG4gIC8vIENvbG9yIHRoZSBsYWJlbCBhbmQgaGVscCB0ZXh0XG4gIC5oZWxwLWJsb2NrLFxuICAuY29udHJvbC1sYWJlbCxcbiAgLnJhZGlvLFxuICAuY2hlY2tib3gsXG4gIC5yYWRpby1pbmxpbmUsXG4gIC5jaGVja2JveC1pbmxpbmUsXG4gICYucmFkaW8gbGFiZWwsXG4gICYuY2hlY2tib3ggbGFiZWwsXG4gICYucmFkaW8taW5saW5lIGxhYmVsLFxuICAmLmNoZWNrYm94LWlubGluZSBsYWJlbCAge1xuICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcbiAgfVxuICAvLyBTZXQgdGhlIGJvcmRlciBhbmQgYm94IHNoYWRvdyBvbiBzcGVjaWZpYyBpbnB1dHMgdG8gbWF0Y2hcbiAgLmZvcm0tY29udHJvbCB7XG4gICAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yO1xuICAgIEBpbmNsdWRlIGJveC1zaGFkb3coaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSkpOyAvLyBSZWRlY2xhcmUgc28gdHJhbnNpdGlvbnMgd29ya1xuICAgICY6Zm9jdXMge1xuICAgICAgYm9yZGVyLWNvbG9yOiBkYXJrZW4oJGJvcmRlci1jb2xvciwgMTAlKTtcbiAgICAgICRzaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpLCAwIDAgNnB4IGxpZ2h0ZW4oJGJvcmRlci1jb2xvciwgMjAlKTtcbiAgICAgIEBpbmNsdWRlIGJveC1zaGFkb3coJHNoYWRvdyk7XG4gICAgfVxuICB9XG4gIC8vIFNldCB2YWxpZGF0aW9uIHN0YXRlcyBhbHNvIGZvciBhZGRvbnNcbiAgLmlucHV0LWdyb3VwLWFkZG9uIHtcbiAgICBjb2xvcjogJHRleHQtY29sb3I7XG4gICAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xuICB9XG4gIC8vIE9wdGlvbmFsIGZlZWRiYWNrIGljb25cbiAgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XG4gICAgY29sb3I6ICR0ZXh0LWNvbG9yO1xuICB9XG59XG5cblxuLy8gRm9ybSBjb250cm9sIGZvY3VzIHN0YXRlXG4vL1xuLy8gR2VuZXJhdGUgYSBjdXN0b21pemVkIGZvY3VzIHN0YXRlIGFuZCBmb3IgYW55IGlucHV0IHdpdGggdGhlIHNwZWNpZmllZCBjb2xvcixcbi8vIHdoaWNoIGRlZmF1bHRzIHRvIHRoZSBgJGlucHV0LWJvcmRlci1mb2N1c2AgdmFyaWFibGUuXG4vL1xuLy8gV2UgaGlnaGx5IGVuY291cmFnZSB5b3UgdG8gbm90IGN1c3RvbWl6ZSB0aGUgZGVmYXVsdCB2YWx1ZSwgYnV0IGluc3RlYWQgdXNlXG4vLyB0aGlzIHRvIHR3ZWFrIGNvbG9ycyBvbiBhbiBhcy1uZWVkZWQgYmFzaXMuIFRoaXMgYWVzdGhldGljIGNoYW5nZSBpcyBiYXNlZCBvblxuLy8gV2ViS2l0J3MgZGVmYXVsdCBzdHlsZXMsIGJ1dCBhcHBsaWNhYmxlIHRvIGEgd2lkZXIgcmFuZ2Ugb2YgYnJvd3NlcnMuIEl0c1xuLy8gdXNhYmlsaXR5IGFuZCBhY2Nlc3NpYmlsaXR5IHNob3VsZCBiZSB0YWtlbiBpbnRvIGFjY291bnQgd2l0aCBhbnkgY2hhbmdlLlxuLy9cbi8vIEV4YW1wbGUgdXNhZ2U6IGNoYW5nZSB0aGUgZGVmYXVsdCBibHVlIGJvcmRlciBhbmQgc2hhZG93IHRvIHdoaXRlIGZvciBiZXR0ZXJcbi8vIGNvbnRyYXN0IGFnYWluc3QgYSBkYXJrIGdyYXkgYmFja2dyb3VuZC5cbkBtaXhpbiBmb3JtLWNvbnRyb2wtZm9jdXMoJGNvbG9yOiAkaW5wdXQtYm9yZGVyLWZvY3VzKSB7XG4gICRjb2xvci1yZ2JhOiByZ2JhKHJlZCgkY29sb3IpLCBncmVlbigkY29sb3IpLCBibHVlKCRjb2xvciksIC42KTtcbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29sb3I7XG4gICAgb3V0bGluZTogMDtcbiAgICBAaW5jbHVkZSBib3gtc2hhZG93KGluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpLCAwIDAgOHB4ICRjb2xvci1yZ2JhKTtcbiAgfVxufVxuXG4vLyBGb3JtIGNvbnRyb2wgc2l6aW5nXG4vL1xuLy8gUmVsYXRpdmUgdGV4dCBzaXplLCBwYWRkaW5nLCBhbmQgYm9yZGVyLXJhZGlpIGNoYW5nZXMgZm9yIGZvcm0gY29udHJvbHMuIEZvclxuLy8gaG9yaXpvbnRhbCBzaXppbmcsIHdyYXAgY29udHJvbHMgaW4gdGhlIHByZWRlZmluZWQgZ3JpZCBjbGFzc2VzLiBgPHNlbGVjdD5gXG4vLyBlbGVtZW50IGdldHMgc3BlY2lhbCBsb3ZlIGJlY2F1c2UgaXQncyBzcGVjaWFsLCBhbmQgdGhhdCdzIGEgZmFjdCFcbi8vIFtjb252ZXJ0ZXJdICRwYXJlbnQgaGFja1xuQG1peGluIGlucHV0LXNpemUoJHBhcmVudCwgJGlucHV0LWhlaWdodCwgJHBhZGRpbmctdmVydGljYWwsICRwYWRkaW5nLWhvcml6b250YWwsICRmb250LXNpemUsICRsaW5lLWhlaWdodCwgJGJvcmRlci1yYWRpdXMpIHtcbiAgI3skcGFyZW50fSB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0O1xuICAgIHBhZGRpbmc6ICRwYWRkaW5nLXZlcnRpY2FsICRwYWRkaW5nLWhvcml6b250YWw7XG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplO1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXM7XG4gIH1cblxuICBzZWxlY3QjeyRwYXJlbnR9IHtcbiAgICBoZWlnaHQ6ICRpbnB1dC1oZWlnaHQ7XG4gICAgbGluZS1oZWlnaHQ6ICRpbnB1dC1oZWlnaHQ7XG4gIH1cblxuICB0ZXh0YXJlYSN7JHBhcmVudH0sXG4gIHNlbGVjdFttdWx0aXBsZV0jeyRwYXJlbnR9IHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbn1cbiIsIi8vIFByb2dyZXNzIGJhcnNcblxuQG1peGluIHByb2dyZXNzLWJhci12YXJpYW50KCRjb2xvcikge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG5cbiAgLy8gRGVwcmVjYXRlZCBwYXJlbnQgY2xhc3MgcmVxdWlyZW1lbnQgYXMgb2YgdjMuMi4wXG4gIC5wcm9ncmVzcy1zdHJpcGVkICYge1xuICAgIEBpbmNsdWRlIGdyYWRpZW50LXN0cmlwZWQ7XG4gIH1cbn1cbiIsIi8vIFRhYmxlc1xuXG5AbWl4aW4gdGFibGUtcm93LXZhcmlhbnQoJHN0YXRlLCAkYmFja2dyb3VuZCkge1xuICAvLyBFeGFjdCBzZWxlY3RvcnMgYmVsb3cgcmVxdWlyZWQgdG8gb3ZlcnJpZGUgYC50YWJsZS1zdHJpcGVkYCBhbmQgcHJldmVudFxuICAvLyBpbmhlcml0YW5jZSB0byBuZXN0ZWQgdGFibGVzLlxuICAudGFibGUgPiB0aGVhZCA+IHRyLFxuICAudGFibGUgPiB0Ym9keSA+IHRyLFxuICAudGFibGUgPiB0Zm9vdCA+IHRyIHtcbiAgICA+IHRkLiN7JHN0YXRlfSxcbiAgICA+IHRoLiN7JHN0YXRlfSxcbiAgICAmLiN7JHN0YXRlfSA+IHRkLFxuICAgICYuI3skc3RhdGV9ID4gdGgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQ7XG4gICAgfVxuICB9XG5cbiAgLy8gSG92ZXIgc3RhdGVzIGZvciBgLnRhYmxlLWhvdmVyYFxuICAvLyBOb3RlOiB0aGlzIGlzIG5vdCBhdmFpbGFibGUgZm9yIGNlbGxzIG9yIHJvd3Mgd2l0aGluIGB0aGVhZGAgb3IgYHRmb290YC5cbiAgLnRhYmxlLWhvdmVyID4gdGJvZHkgPiB0ciB7XG4gICAgPiB0ZC4jeyRzdGF0ZX06aG92ZXIsXG4gICAgPiB0aC4jeyRzdGF0ZX06aG92ZXIsXG4gICAgJi4jeyRzdGF0ZX06aG92ZXIgPiB0ZCxcbiAgICAmOmhvdmVyID4gLiN7JHN0YXRlfSxcbiAgICAmLiN7JHN0YXRlfTpob3ZlciA+IHRoIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkYmFja2dyb3VuZCwgNSUpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29udGV4dHVhbCBiYWNrZ3JvdW5kc1xuXG4vLyBbY29udmVydGVyXSAkcGFyZW50IGhhY2tcbkBtaXhpbiBiZy12YXJpYW50KCRwYXJlbnQsICRjb2xvcikge1xuICAjeyRwYXJlbnR9IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG4gIH1cbiAgYSN7JHBhcmVudH06aG92ZXIsXG4gIGEjeyRwYXJlbnR9OmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZW4oJGNvbG9yLCAxMCUpO1xuICB9XG59XG4iLCIvLyBTaW5nbGUgc2lkZSBib3JkZXItcmFkaXVzXG5cbkBtaXhpbiBib3JkZXItdG9wLXJhZGl1cygkcmFkaXVzKSB7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAkcmFkaXVzO1xuICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogJHJhZGl1cztcbn1cbkBtaXhpbiBib3JkZXItcmlnaHQtcmFkaXVzKCRyYWRpdXMpIHtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6ICRyYWRpdXM7XG4gICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAkcmFkaXVzO1xufVxuQG1peGluIGJvcmRlci1ib3R0b20tcmFkaXVzKCRyYWRpdXMpIHtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6ICRyYWRpdXM7XG4gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAkcmFkaXVzO1xufVxuQG1peGluIGJvcmRlci1sZWZ0LXJhZGl1cygkcmFkaXVzKSB7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6ICRyYWRpdXM7XG4gICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6ICRyYWRpdXM7XG59XG4iLCIvLyBHcmFkaWVudHNcblxuXG5cbi8vIEhvcml6b250YWwgZ3JhZGllbnQsIGZyb20gbGVmdCB0byByaWdodFxuLy9cbi8vIENyZWF0ZXMgdHdvIGNvbG9yIHN0b3BzLCBzdGFydCBhbmQgZW5kLCBieSBzcGVjaWZ5aW5nIGEgY29sb3IgYW5kIHBvc2l0aW9uIGZvciBlYWNoIGNvbG9yIHN0b3AuXG4vLyBDb2xvciBzdG9wcyBhcmUgbm90IGF2YWlsYWJsZSBpbiBJRTkgYW5kIGJlbG93LlxuQG1peGluIGdyYWRpZW50LWhvcml6b250YWwoJHN0YXJ0LWNvbG9yOiAjNTU1LCAkZW5kLWNvbG9yOiAjMzMzLCAkc3RhcnQtcGVyY2VudDogMCUsICRlbmQtcGVyY2VudDogMTAwJSkge1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAkc3RhcnQtY29sb3IgJHN0YXJ0LXBlcmNlbnQsICRlbmQtY29sb3IgJGVuZC1wZXJjZW50KTsgLy8gU2FmYXJpIDUuMS02LCBDaHJvbWUgMTArXG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudChsZWZ0LCAkc3RhcnQtY29sb3IgJHN0YXJ0LXBlcmNlbnQsICRlbmQtY29sb3IgJGVuZC1wZXJjZW50KTsgLy8gT3BlcmEgMTJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAkc3RhcnQtY29sb3IgJHN0YXJ0LXBlcmNlbnQsICRlbmQtY29sb3IgJGVuZC1wZXJjZW50KTsgLy8gU3RhbmRhcmQsIElFMTAsIEZpcmVmb3ggMTYrLCBPcGVyYSAxMi4xMCssIFNhZmFyaSA3KywgQ2hyb21lIDI2K1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyN7aWUtaGV4LXN0cigkc3RhcnQtY29sb3IpfScsIGVuZENvbG9yc3RyPScje2llLWhleC1zdHIoJGVuZC1jb2xvcil9JywgR3JhZGllbnRUeXBlPTEpOyAvLyBJRTkgYW5kIGRvd25cbn1cblxuLy8gVmVydGljYWwgZ3JhZGllbnQsIGZyb20gdG9wIHRvIGJvdHRvbVxuLy9cbi8vIENyZWF0ZXMgdHdvIGNvbG9yIHN0b3BzLCBzdGFydCBhbmQgZW5kLCBieSBzcGVjaWZ5aW5nIGEgY29sb3IgYW5kIHBvc2l0aW9uIGZvciBlYWNoIGNvbG9yIHN0b3AuXG4vLyBDb2xvciBzdG9wcyBhcmUgbm90IGF2YWlsYWJsZSBpbiBJRTkgYW5kIGJlbG93LlxuQG1peGluIGdyYWRpZW50LXZlcnRpY2FsKCRzdGFydC1jb2xvcjogIzU1NSwgJGVuZC1jb2xvcjogIzMzMywgJHN0YXJ0LXBlcmNlbnQ6IDAlLCAkZW5kLXBlcmNlbnQ6IDEwMCUpIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAkc3RhcnQtY29sb3IgJHN0YXJ0LXBlcmNlbnQsICRlbmQtY29sb3IgJGVuZC1wZXJjZW50KTsgIC8vIFNhZmFyaSA1LjEtNiwgQ2hyb21lIDEwK1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAkc3RhcnQtY29sb3IgJHN0YXJ0LXBlcmNlbnQsICRlbmQtY29sb3IgJGVuZC1wZXJjZW50KTsgIC8vIE9wZXJhIDEyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICRzdGFydC1jb2xvciAkc3RhcnQtcGVyY2VudCwgJGVuZC1jb2xvciAkZW5kLXBlcmNlbnQpOyAvLyBTdGFuZGFyZCwgSUUxMCwgRmlyZWZveCAxNissIE9wZXJhIDEyLjEwKywgU2FmYXJpIDcrLCBDaHJvbWUgMjYrXG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nI3tpZS1oZXgtc3RyKCRzdGFydC1jb2xvcil9JywgZW5kQ29sb3JzdHI9JyN7aWUtaGV4LXN0cigkZW5kLWNvbG9yKX0nLCBHcmFkaWVudFR5cGU9MCk7IC8vIElFOSBhbmQgZG93blxufVxuXG5AbWl4aW4gZ3JhZGllbnQtZGlyZWN0aW9uYWwoJHN0YXJ0LWNvbG9yOiAjNTU1LCAkZW5kLWNvbG9yOiAjMzMzLCAkZGVnOiA0NWRlZykge1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCRkZWcsICRzdGFydC1jb2xvciwgJGVuZC1jb2xvcik7IC8vIFNhZmFyaSA1LjEtNiwgQ2hyb21lIDEwK1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQoJGRlZywgJHN0YXJ0LWNvbG9yLCAkZW5kLWNvbG9yKTsgLy8gT3BlcmEgMTJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCRkZWcsICRzdGFydC1jb2xvciwgJGVuZC1jb2xvcik7IC8vIFN0YW5kYXJkLCBJRTEwLCBGaXJlZm94IDE2KywgT3BlcmEgMTIuMTArLCBTYWZhcmkgNyssIENocm9tZSAyNitcbn1cbkBtaXhpbiBncmFkaWVudC1ob3Jpem9udGFsLXRocmVlLWNvbG9ycygkc3RhcnQtY29sb3I6ICMwMGIzZWUsICRtaWQtY29sb3I6ICM3YTQzYjYsICRjb2xvci1zdG9wOiA1MCUsICRlbmQtY29sb3I6ICNjMzMyNWYpIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHN0YXJ0LWNvbG9yLCAkbWlkLWNvbG9yICRjb2xvci1zdG9wLCAkZW5kLWNvbG9yKTtcbiAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsICRzdGFydC1jb2xvciwgJG1pZC1jb2xvciAkY29sb3Itc3RvcCwgJGVuZC1jb2xvcik7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHN0YXJ0LWNvbG9yLCAkbWlkLWNvbG9yICRjb2xvci1zdG9wLCAkZW5kLWNvbG9yKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nI3tpZS1oZXgtc3RyKCRzdGFydC1jb2xvcil9JywgZW5kQ29sb3JzdHI9JyN7aWUtaGV4LXN0cigkZW5kLWNvbG9yKX0nLCBHcmFkaWVudFR5cGU9MSk7IC8vIElFOSBhbmQgZG93biwgZ2V0cyBubyBjb2xvci1zdG9wIGF0IGFsbCBmb3IgcHJvcGVyIGZhbGxiYWNrXG59XG5AbWl4aW4gZ3JhZGllbnQtdmVydGljYWwtdGhyZWUtY29sb3JzKCRzdGFydC1jb2xvcjogIzAwYjNlZSwgJG1pZC1jb2xvcjogIzdhNDNiNiwgJGNvbG9yLXN0b3A6IDUwJSwgJGVuZC1jb2xvcjogI2MzMzI1Zikge1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgkc3RhcnQtY29sb3IsICRtaWQtY29sb3IgJGNvbG9yLXN0b3AsICRlbmQtY29sb3IpO1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQoJHN0YXJ0LWNvbG9yLCAkbWlkLWNvbG9yICRjb2xvci1zdG9wLCAkZW5kLWNvbG9yKTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCRzdGFydC1jb2xvciwgJG1pZC1jb2xvciAkY29sb3Itc3RvcCwgJGVuZC1jb2xvcik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JzdHI9JyN7aWUtaGV4LXN0cigkc3RhcnQtY29sb3IpfScsIGVuZENvbG9yc3RyPScje2llLWhleC1zdHIoJGVuZC1jb2xvcil9JywgR3JhZGllbnRUeXBlPTApOyAvLyBJRTkgYW5kIGRvd24sIGdldHMgbm8gY29sb3Itc3RvcCBhdCBhbGwgZm9yIHByb3BlciBmYWxsYmFja1xufVxuQG1peGluIGdyYWRpZW50LXJhZGlhbCgkaW5uZXItY29sb3I6ICM1NTUsICRvdXRlci1jb2xvcjogIzMzMykge1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LXJhZGlhbC1ncmFkaWVudChjaXJjbGUsICRpbm5lci1jb2xvciwgJG91dGVyLWNvbG9yKTtcbiAgYmFja2dyb3VuZC1pbWFnZTogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgJGlubmVyLWNvbG9yLCAkb3V0ZXItY29sb3IpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuQG1peGluIGdyYWRpZW50LXN0cmlwZWQoJGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LC4xNSksICRhbmdsZTogNDVkZWcpIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoJGFuZ2xlLCAkY29sb3IgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgJGNvbG9yIDUwJSwgJGNvbG9yIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCgkYW5nbGUsICRjb2xvciAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCAkY29sb3IgNTAlLCAkY29sb3IgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCRhbmdsZSwgJGNvbG9yIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsICRjb2xvciA1MCUsICRjb2xvciA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xufVxuIiwiLy8gQ2xlYXJmaXhcbi8vXG4vLyBGb3IgbW9kZXJuIGJyb3dzZXJzXG4vLyAxLiBUaGUgc3BhY2UgY29udGVudCBpcyBvbmUgd2F5IHRvIGF2b2lkIGFuIE9wZXJhIGJ1ZyB3aGVuIHRoZVxuLy8gICAgY29udGVudGVkaXRhYmxlIGF0dHJpYnV0ZSBpcyBpbmNsdWRlZCBhbnl3aGVyZSBlbHNlIGluIHRoZSBkb2N1bWVudC5cbi8vICAgIE90aGVyd2lzZSBpdCBjYXVzZXMgc3BhY2UgdG8gYXBwZWFyIGF0IHRoZSB0b3AgYW5kIGJvdHRvbSBvZiBlbGVtZW50c1xuLy8gICAgdGhhdCBhcmUgY2xlYXJmaXhlZC5cbi8vIDIuIFRoZSB1c2Ugb2YgYHRhYmxlYCByYXRoZXIgdGhhbiBgYmxvY2tgIGlzIG9ubHkgbmVjZXNzYXJ5IGlmIHVzaW5nXG4vLyAgICBgOmJlZm9yZWAgdG8gY29udGFpbiB0aGUgdG9wLW1hcmdpbnMgb2YgY2hpbGQgZWxlbWVudHMuXG4vL1xuLy8gU291cmNlOiBodHRwOi8vbmljb2xhc2dhbGxhZ2hlci5jb20vbWljcm8tY2xlYXJmaXgtaGFjay9cblxuQG1peGluIGNsZWFyZml4KCkge1xuICAmOmJlZm9yZSxcbiAgJjphZnRlciB7XG4gICAgY29udGVudDogXCIgXCI7IC8vIDFcbiAgICBkaXNwbGF5OiB0YWJsZTsgLy8gMlxuICB9XG4gICY6YWZ0ZXIge1xuICAgIGNsZWFyOiBib3RoO1xuICB9XG59XG4iLCIvLyBDZW50ZXItYWxpZ24gYSBibG9jayBsZXZlbCBlbGVtZW50XG5cbkBtaXhpbiBjZW50ZXItYmxvY2soKSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuIiwiLy8gTmF2YmFyIHZlcnRpY2FsIGFsaWduXG4vL1xuLy8gVmVydGljYWxseSBjZW50ZXIgZWxlbWVudHMgaW4gdGhlIG5hdmJhci5cbi8vIEV4YW1wbGU6IGFuIGVsZW1lbnQgaGFzIGEgaGVpZ2h0IG9mIDMwcHgsIHNvIHdyaXRlIG91dCBgLm5hdmJhci12ZXJ0aWNhbC1hbGlnbigzMHB4KTtgIHRvIGNhbGN1bGF0ZSB0aGUgYXBwcm9wcmlhdGUgdG9wIG1hcmdpbi5cblxuQG1peGluIG5hdmJhci12ZXJ0aWNhbC1hbGlnbigkZWxlbWVudC1oZWlnaHQpIHtcbiAgbWFyZ2luLXRvcDogKCgkbmF2YmFyLWhlaWdodCAtICRlbGVtZW50LWhlaWdodCkgLyAyKTtcbiAgbWFyZ2luLWJvdHRvbTogKCgkbmF2YmFyLWhlaWdodCAtICRlbGVtZW50LWhlaWdodCkgLyAyKTtcbn1cbiIsIi8vIEZyYW1ld29yayBncmlkIGdlbmVyYXRpb25cbi8vXG4vLyBVc2VkIG9ubHkgYnkgQm9vdHN0cmFwIHRvIGdlbmVyYXRlIHRoZSBjb3JyZWN0IG51bWJlciBvZiBncmlkIGNsYXNzZXMgZ2l2ZW5cbi8vIGFueSB2YWx1ZSBvZiBgJGdyaWQtY29sdW1uc2AuXG5cbi8vIFtjb252ZXJ0ZXJdIFRoaXMgaXMgZGVmaW5lZCByZWN1cnNpdmVseSBpbiBMRVNTLCBidXQgU2FzcyBzdXBwb3J0cyByZWFsIGxvb3BzXG5AbWl4aW4gbWFrZS1ncmlkLWNvbHVtbnMoJGk6IDEsICRsaXN0OiBcIi5jb2wteHMtI3skaX0sIC5jb2wtc20tI3skaX0sIC5jb2wtbWQtI3skaX0sIC5jb2wtbGctI3skaX1cIikge1xuICBAZm9yICRpIGZyb20gKDEgKyAxKSB0aHJvdWdoICRncmlkLWNvbHVtbnMge1xuICAgICRsaXN0OiBcIiN7JGxpc3R9LCAuY29sLXhzLSN7JGl9LCAuY29sLXNtLSN7JGl9LCAuY29sLW1kLSN7JGl9LCAuY29sLWxnLSN7JGl9XCI7XG4gIH1cbiAgI3skbGlzdH0ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAvLyBQcmV2ZW50IGNvbHVtbnMgZnJvbSBjb2xsYXBzaW5nIHdoZW4gZW1wdHlcbiAgICBtaW4taGVpZ2h0OiAxcHg7XG4gICAgLy8gSW5uZXIgZ3V0dGVyIHZpYSBwYWRkaW5nXG4gICAgcGFkZGluZy1sZWZ0OiAgY2VpbCgoJGdyaWQtZ3V0dGVyLXdpZHRoIC8gMikpO1xuICAgIHBhZGRpbmctcmlnaHQ6IGZsb29yKCgkZ3JpZC1ndXR0ZXItd2lkdGggLyAyKSk7XG4gIH1cbn1cblxuXG4vLyBbY29udmVydGVyXSBUaGlzIGlzIGRlZmluZWQgcmVjdXJzaXZlbHkgaW4gTEVTUywgYnV0IFNhc3Mgc3VwcG9ydHMgcmVhbCBsb29wc1xuQG1peGluIGZsb2F0LWdyaWQtY29sdW1ucygkY2xhc3MsICRpOiAxLCAkbGlzdDogXCIuY29sLSN7JGNsYXNzfS0jeyRpfVwiKSB7XG4gIEBmb3IgJGkgZnJvbSAoMSArIDEpIHRocm91Z2ggJGdyaWQtY29sdW1ucyB7XG4gICAgJGxpc3Q6IFwiI3skbGlzdH0sIC5jb2wtI3skY2xhc3N9LSN7JGl9XCI7XG4gIH1cbiAgI3skbGlzdH0ge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG59XG5cblxuQG1peGluIGNhbGMtZ3JpZC1jb2x1bW4oJGluZGV4LCAkY2xhc3MsICR0eXBlKSB7XG4gIEBpZiAoJHR5cGUgPT0gd2lkdGgpIGFuZCAoJGluZGV4ID4gMCkge1xuICAgIC5jb2wtI3skY2xhc3N9LSN7JGluZGV4fSB7XG4gICAgICB3aWR0aDogcGVyY2VudGFnZSgoJGluZGV4IC8gJGdyaWQtY29sdW1ucykpO1xuICAgIH1cbiAgfVxuICBAaWYgKCR0eXBlID09IHB1c2gpIGFuZCAoJGluZGV4ID4gMCkge1xuICAgIC5jb2wtI3skY2xhc3N9LXB1c2gtI3skaW5kZXh9IHtcbiAgICAgIGxlZnQ6IHBlcmNlbnRhZ2UoKCRpbmRleCAvICRncmlkLWNvbHVtbnMpKTtcbiAgICB9XG4gIH1cbiAgQGlmICgkdHlwZSA9PSBwdXNoKSBhbmQgKCRpbmRleCA9PSAwKSB7XG4gICAgLmNvbC0jeyRjbGFzc30tcHVzaC0wIHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgfVxuICB9XG4gIEBpZiAoJHR5cGUgPT0gcHVsbCkgYW5kICgkaW5kZXggPiAwKSB7XG4gICAgLmNvbC0jeyRjbGFzc30tcHVsbC0jeyRpbmRleH0ge1xuICAgICAgcmlnaHQ6IHBlcmNlbnRhZ2UoKCRpbmRleCAvICRncmlkLWNvbHVtbnMpKTtcbiAgICB9XG4gIH1cbiAgQGlmICgkdHlwZSA9PSBwdWxsKSBhbmQgKCRpbmRleCA9PSAwKSB7XG4gICAgLmNvbC0jeyRjbGFzc30tcHVsbC0wIHtcbiAgICAgIHJpZ2h0OiBhdXRvO1xuICAgIH1cbiAgfVxuICBAaWYgKCR0eXBlID09IG9mZnNldCkge1xuICAgIC5jb2wtI3skY2xhc3N9LW9mZnNldC0jeyRpbmRleH0ge1xuICAgICAgbWFyZ2luLWxlZnQ6IHBlcmNlbnRhZ2UoKCRpbmRleCAvICRncmlkLWNvbHVtbnMpKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gW2NvbnZlcnRlcl0gVGhpcyBpcyBkZWZpbmVkIHJlY3Vyc2l2ZWx5IGluIExFU1MsIGJ1dCBTYXNzIHN1cHBvcnRzIHJlYWwgbG9vcHNcbkBtaXhpbiBsb29wLWdyaWQtY29sdW1ucygkY29sdW1ucywgJGNsYXNzLCAkdHlwZSkge1xuICBAZm9yICRpIGZyb20gMCB0aHJvdWdoICRjb2x1bW5zIHtcbiAgICBAaW5jbHVkZSBjYWxjLWdyaWQtY29sdW1uKCRpLCAkY2xhc3MsICR0eXBlKTtcbiAgfVxufVxuXG5cbi8vIENyZWF0ZSBncmlkIGZvciBzcGVjaWZpYyBjbGFzc1xuQG1peGluIG1ha2UtZ3JpZCgkY2xhc3MpIHtcbiAgQGluY2x1ZGUgZmxvYXQtZ3JpZC1jb2x1bW5zKCRjbGFzcyk7XG4gIEBpbmNsdWRlIGxvb3AtZ3JpZC1jb2x1bW5zKCRncmlkLWNvbHVtbnMsICRjbGFzcywgd2lkdGgpO1xuICBAaW5jbHVkZSBsb29wLWdyaWQtY29sdW1ucygkZ3JpZC1jb2x1bW5zLCAkY2xhc3MsIHB1bGwpO1xuICBAaW5jbHVkZSBsb29wLWdyaWQtY29sdW1ucygkZ3JpZC1jb2x1bW5zLCAkY2xhc3MsIHB1c2gpO1xuICBAaW5jbHVkZSBsb29wLWdyaWQtY29sdW1ucygkZ3JpZC1jb2x1bW5zLCAkY2xhc3MsIG9mZnNldCk7XG59XG4iLCIvLyBHcmlkIHN5c3RlbVxuLy9cbi8vIEdlbmVyYXRlIHNlbWFudGljIGdyaWQgY29sdW1ucyB3aXRoIHRoZXNlIG1peGlucy5cblxuLy8gQ2VudGVyZWQgY29udGFpbmVyIGVsZW1lbnRcbkBtaXhpbiBjb250YWluZXItZml4ZWQoJGd1dHRlcjogJGdyaWQtZ3V0dGVyLXdpZHRoKSB7XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIHBhZGRpbmctbGVmdDogIGZsb29yKCgkZ3V0dGVyIC8gMikpO1xuICBwYWRkaW5nLXJpZ2h0OiBjZWlsKCgkZ3V0dGVyIC8gMikpO1xuICBAaW5jbHVkZSBjbGVhcmZpeDtcbn1cblxuLy8gQ3JlYXRlcyBhIHdyYXBwZXIgZm9yIGEgc2VyaWVzIG9mIGNvbHVtbnNcbkBtaXhpbiBtYWtlLXJvdygkZ3V0dGVyOiAkZ3JpZC1ndXR0ZXItd2lkdGgpIHtcbiAgbWFyZ2luLWxlZnQ6ICBjZWlsKCgkZ3V0dGVyIC8gLTIpKTtcbiAgbWFyZ2luLXJpZ2h0OiBmbG9vcigoJGd1dHRlciAvIC0yKSk7XG4gIEBpbmNsdWRlIGNsZWFyZml4O1xufVxuXG4vLyBHZW5lcmF0ZSB0aGUgZXh0cmEgc21hbGwgY29sdW1uc1xuQG1peGluIG1ha2UteHMtY29sdW1uKCRjb2x1bW5zLCAkZ3V0dGVyOiAkZ3JpZC1ndXR0ZXItd2lkdGgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IHBlcmNlbnRhZ2UoKCRjb2x1bW5zIC8gJGdyaWQtY29sdW1ucykpO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIHBhZGRpbmctbGVmdDogICgkZ3V0dGVyIC8gMik7XG4gIHBhZGRpbmctcmlnaHQ6ICgkZ3V0dGVyIC8gMik7XG59XG5AbWl4aW4gbWFrZS14cy1jb2x1bW4tb2Zmc2V0KCRjb2x1bW5zKSB7XG4gIG1hcmdpbi1sZWZ0OiBwZXJjZW50YWdlKCgkY29sdW1ucyAvICRncmlkLWNvbHVtbnMpKTtcbn1cbkBtaXhpbiBtYWtlLXhzLWNvbHVtbi1wdXNoKCRjb2x1bW5zKSB7XG4gIGxlZnQ6IHBlcmNlbnRhZ2UoKCRjb2x1bW5zIC8gJGdyaWQtY29sdW1ucykpO1xufVxuQG1peGluIG1ha2UteHMtY29sdW1uLXB1bGwoJGNvbHVtbnMpIHtcbiAgcmlnaHQ6IHBlcmNlbnRhZ2UoKCRjb2x1bW5zIC8gJGdyaWQtY29sdW1ucykpO1xufVxuXG4vLyBHZW5lcmF0ZSB0aGUgc21hbGwgY29sdW1uc1xuQG1peGluIG1ha2Utc20tY29sdW1uKCRjb2x1bW5zLCAkZ3V0dGVyOiAkZ3JpZC1ndXR0ZXItd2lkdGgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIHBhZGRpbmctbGVmdDogICgkZ3V0dGVyIC8gMik7XG4gIHBhZGRpbmctcmlnaHQ6ICgkZ3V0dGVyIC8gMik7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgd2lkdGg6IHBlcmNlbnRhZ2UoKCRjb2x1bW5zIC8gJGdyaWQtY29sdW1ucykpO1xuICB9XG59XG5AbWl4aW4gbWFrZS1zbS1jb2x1bW4tb2Zmc2V0KCRjb2x1bW5zKSB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikge1xuICAgIG1hcmdpbi1sZWZ0OiBwZXJjZW50YWdlKCgkY29sdW1ucyAvICRncmlkLWNvbHVtbnMpKTtcbiAgfVxufVxuQG1peGluIG1ha2Utc20tY29sdW1uLXB1c2goJGNvbHVtbnMpIHtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSB7XG4gICAgbGVmdDogcGVyY2VudGFnZSgoJGNvbHVtbnMgLyAkZ3JpZC1jb2x1bW5zKSk7XG4gIH1cbn1cbkBtaXhpbiBtYWtlLXNtLWNvbHVtbi1wdWxsKCRjb2x1bW5zKSB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikge1xuICAgIHJpZ2h0OiBwZXJjZW50YWdlKCgkY29sdW1ucyAvICRncmlkLWNvbHVtbnMpKTtcbiAgfVxufVxuXG4vLyBHZW5lcmF0ZSB0aGUgbWVkaXVtIGNvbHVtbnNcbkBtaXhpbiBtYWtlLW1kLWNvbHVtbigkY29sdW1ucywgJGd1dHRlcjogJGdyaWQtZ3V0dGVyLXdpZHRoKSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMXB4O1xuICBwYWRkaW5nLWxlZnQ6ICAoJGd1dHRlciAvIDIpO1xuICBwYWRkaW5nLXJpZ2h0OiAoJGd1dHRlciAvIDIpO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLW1kLW1pbikge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiBwZXJjZW50YWdlKCgkY29sdW1ucyAvICRncmlkLWNvbHVtbnMpKTtcbiAgfVxufVxuQG1peGluIG1ha2UtbWQtY29sdW1uLW9mZnNldCgkY29sdW1ucykge1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1tZC1taW4pIHtcbiAgICBtYXJnaW4tbGVmdDogcGVyY2VudGFnZSgoJGNvbHVtbnMgLyAkZ3JpZC1jb2x1bW5zKSk7XG4gIH1cbn1cbkBtaXhpbiBtYWtlLW1kLWNvbHVtbi1wdXNoKCRjb2x1bW5zKSB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLW1kLW1pbikge1xuICAgIGxlZnQ6IHBlcmNlbnRhZ2UoKCRjb2x1bW5zIC8gJGdyaWQtY29sdW1ucykpO1xuICB9XG59XG5AbWl4aW4gbWFrZS1tZC1jb2x1bW4tcHVsbCgkY29sdW1ucykge1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1tZC1taW4pIHtcbiAgICByaWdodDogcGVyY2VudGFnZSgoJGNvbHVtbnMgLyAkZ3JpZC1jb2x1bW5zKSk7XG4gIH1cbn1cblxuLy8gR2VuZXJhdGUgdGhlIGxhcmdlIGNvbHVtbnNcbkBtaXhpbiBtYWtlLWxnLWNvbHVtbigkY29sdW1ucywgJGd1dHRlcjogJGdyaWQtZ3V0dGVyLXdpZHRoKSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMXB4O1xuICBwYWRkaW5nLWxlZnQ6ICAoJGd1dHRlciAvIDIpO1xuICBwYWRkaW5nLXJpZ2h0OiAoJGd1dHRlciAvIDIpO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLWxnLW1pbikge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiBwZXJjZW50YWdlKCgkY29sdW1ucyAvICRncmlkLWNvbHVtbnMpKTtcbiAgfVxufVxuQG1peGluIG1ha2UtbGctY29sdW1uLW9mZnNldCgkY29sdW1ucykge1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1sZy1taW4pIHtcbiAgICBtYXJnaW4tbGVmdDogcGVyY2VudGFnZSgoJGNvbHVtbnMgLyAkZ3JpZC1jb2x1bW5zKSk7XG4gIH1cbn1cbkBtaXhpbiBtYWtlLWxnLWNvbHVtbi1wdXNoKCRjb2x1bW5zKSB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLWxnLW1pbikge1xuICAgIGxlZnQ6IHBlcmNlbnRhZ2UoKCRjb2x1bW5zIC8gJGdyaWQtY29sdW1ucykpO1xuICB9XG59XG5AbWl4aW4gbWFrZS1sZy1jb2x1bW4tcHVsbCgkY29sdW1ucykge1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1sZy1taW4pIHtcbiAgICByaWdodDogcGVyY2VudGFnZSgoJGNvbHVtbnMgLyAkZ3JpZC1jb2x1bW5zKSk7XG4gIH1cbn1cbiIsIiRib290c3RyYXAtc2Fzcy1hc3NldC1oZWxwZXI6IGZhbHNlICFkZWZhdWx0O1xuLy9cbi8vIFZhcmlhYmxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLz09IENvbG9yc1xuLy9cbi8vIyMgR3JheSBhbmQgYnJhbmQgY29sb3JzIGZvciB1c2UgYWNyb3NzIEJvb3RzdHJhcC5cblxuJGdyYXktYmFzZTogICAgICAgICAgICAgICMwMDAgIWRlZmF1bHQ7XG4kZ3JheS1kYXJrZXI6ICAgICAgICAgICAgbGlnaHRlbigkZ3JheS1iYXNlLCAxMy41JSkgIWRlZmF1bHQ7IC8vICMyMjJcbiRncmF5LWRhcms6ICAgICAgICAgICAgICBsaWdodGVuKCRncmF5LWJhc2UsIDIwJSkgIWRlZmF1bHQ7ICAgLy8gIzMzM1xuJGdyYXk6ICAgICAgICAgICAgICAgICAgIGxpZ2h0ZW4oJGdyYXktYmFzZSwgMzMuNSUpICFkZWZhdWx0OyAvLyAjNTU1XG4kZ3JheS1saWdodDogICAgICAgICAgICAgbGlnaHRlbigkZ3JheS1iYXNlLCA0Ni43JSkgIWRlZmF1bHQ7IC8vICM3NzdcbiRncmF5LWxpZ2h0ZXI6ICAgICAgICAgICBsaWdodGVuKCRncmF5LWJhc2UsIDkzLjUlKSAhZGVmYXVsdDsgLy8gI2VlZVxuXG4kYnJhbmQtcHJpbWFyeTogICAgICAgICBkYXJrZW4oIzQyOGJjYSwgNi41JSkgIWRlZmF1bHQ7IC8vICMzMzdhYjdcbiRicmFuZC1zdWNjZXNzOiAgICAgICAgICM1Y2I4NWMgIWRlZmF1bHQ7XG4kYnJhbmQtaW5mbzogICAgICAgICAgICAjNWJjMGRlICFkZWZhdWx0O1xuJGJyYW5kLXdhcm5pbmc6ICAgICAgICAgI2YwYWQ0ZSAhZGVmYXVsdDtcbiRicmFuZC1kYW5nZXI6ICAgICAgICAgICNkOTUzNGYgIWRlZmF1bHQ7XG5cblxuLy89PSBTY2FmZm9sZGluZ1xuLy9cbi8vIyMgU2V0dGluZ3MgZm9yIHNvbWUgb2YgdGhlIG1vc3QgZ2xvYmFsIHN0eWxlcy5cblxuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIGZvciBgPGJvZHk+YC5cbiRib2R5LWJnOiAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4vLyoqIEdsb2JhbCB0ZXh0IGNvbG9yIG9uIGA8Ym9keT5gLlxuJHRleHQtY29sb3I6ICAgICAgICAgICAgJGdyYXktZGFyayAhZGVmYXVsdDtcblxuLy8qKiBHbG9iYWwgdGV4dHVhbCBsaW5rIGNvbG9yLlxuJGxpbmstY29sb3I6ICAgICAgICAgICAgJGJyYW5kLXByaW1hcnkgIWRlZmF1bHQ7XG4vLyoqIExpbmsgaG92ZXIgY29sb3Igc2V0IHZpYSBgZGFya2VuKClgIGZ1bmN0aW9uLlxuJGxpbmstaG92ZXItY29sb3I6ICAgICAgZGFya2VuKCRsaW5rLWNvbG9yLCAxNSUpICFkZWZhdWx0O1xuLy8qKiBMaW5rIGhvdmVyIGRlY29yYXRpb24uXG4kbGluay1ob3Zlci1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgIWRlZmF1bHQ7XG5cblxuLy89PSBUeXBvZ3JhcGh5XG4vL1xuLy8jIyBGb250LCBsaW5lLWhlaWdodCwgYW5kIGNvbG9yIGZvciBib2R5IHRleHQsIGhlYWRpbmdzLCBhbmQgbW9yZS5cblxuJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY6ICBcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYgIWRlZmF1bHQ7XG4kZm9udC1mYW1pbHktc2VyaWY6ICAgICAgIEdlb3JnaWEsIFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZiAhZGVmYXVsdDtcbi8vKiogRGVmYXVsdCBtb25vc3BhY2UgZm9udHMgZm9yIGA8Y29kZT5gLCBgPGtiZD5gLCBhbmQgYDxwcmU+YC5cbiRmb250LWZhbWlseS1tb25vc3BhY2U6ICAgTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFwiQ291cmllciBOZXdcIiwgbW9ub3NwYWNlICFkZWZhdWx0O1xuJGZvbnQtZmFtaWx5LWJhc2U6ICAgICAgICAkZm9udC1mYW1pbHktc2Fucy1zZXJpZiAhZGVmYXVsdDtcblxuJGZvbnQtc2l6ZS1iYXNlOiAgICAgICAgICAxNHB4ICFkZWZhdWx0O1xuJGZvbnQtc2l6ZS1sYXJnZTogICAgICAgICBjZWlsKCgkZm9udC1zaXplLWJhc2UgKiAxLjI1KSkgIWRlZmF1bHQ7IC8vIH4xOHB4XG4kZm9udC1zaXplLXNtYWxsOiAgICAgICAgIGNlaWwoKCRmb250LXNpemUtYmFzZSAqIDAuODUpKSAhZGVmYXVsdDsgLy8gfjEycHhcblxuJGZvbnQtc2l6ZS1oMTogICAgICAgICAgICBmbG9vcigoJGZvbnQtc2l6ZS1iYXNlICogMi42KSkgIWRlZmF1bHQ7IC8vIH4zNnB4XG4kZm9udC1zaXplLWgyOiAgICAgICAgICAgIGZsb29yKCgkZm9udC1zaXplLWJhc2UgKiAyLjE1KSkgIWRlZmF1bHQ7IC8vIH4zMHB4XG4kZm9udC1zaXplLWgzOiAgICAgICAgICAgIGNlaWwoKCRmb250LXNpemUtYmFzZSAqIDEuNykpICFkZWZhdWx0OyAvLyB+MjRweFxuJGZvbnQtc2l6ZS1oNDogICAgICAgICAgICBjZWlsKCgkZm9udC1zaXplLWJhc2UgKiAxLjI1KSkgIWRlZmF1bHQ7IC8vIH4xOHB4XG4kZm9udC1zaXplLWg1OiAgICAgICAgICAgICRmb250LXNpemUtYmFzZSAhZGVmYXVsdDtcbiRmb250LXNpemUtaDY6ICAgICAgICAgICAgY2VpbCgoJGZvbnQtc2l6ZS1iYXNlICogMC44NSkpICFkZWZhdWx0OyAvLyB+MTJweFxuXG4vLyoqIFVuaXQtbGVzcyBgbGluZS1oZWlnaHRgIGZvciB1c2UgaW4gY29tcG9uZW50cyBsaWtlIGJ1dHRvbnMuXG4kbGluZS1oZWlnaHQtYmFzZTogICAgICAgIDEuNDI4NTcxNDI5ICFkZWZhdWx0OyAvLyAyMC8xNFxuLy8qKiBDb21wdXRlZCBcImxpbmUtaGVpZ2h0XCIgKGBmb250LXNpemVgICogYGxpbmUtaGVpZ2h0YCkgZm9yIHVzZSB3aXRoIGBtYXJnaW5gLCBgcGFkZGluZ2AsIGV0Yy5cbiRsaW5lLWhlaWdodC1jb21wdXRlZDogICAgZmxvb3IoKCRmb250LXNpemUtYmFzZSAqICRsaW5lLWhlaWdodC1iYXNlKSkgIWRlZmF1bHQ7IC8vIH4yMHB4XG5cbi8vKiogQnkgZGVmYXVsdCwgdGhpcyBpbmhlcml0cyBmcm9tIHRoZSBgPGJvZHk+YC5cbiRoZWFkaW5ncy1mb250LWZhbWlseTogICAgaW5oZXJpdCAhZGVmYXVsdDtcbiRoZWFkaW5ncy1mb250LXdlaWdodDogICAgNTAwICFkZWZhdWx0O1xuJGhlYWRpbmdzLWxpbmUtaGVpZ2h0OiAgICAxLjEgIWRlZmF1bHQ7XG4kaGVhZGluZ3MtY29sb3I6ICAgICAgICAgIGluaGVyaXQgIWRlZmF1bHQ7XG5cblxuLy89PSBJY29ub2dyYXBoeVxuLy9cbi8vIyMgU3BlY2lmeSBjdXN0b20gbG9jYXRpb24gYW5kIGZpbGVuYW1lIG9mIHRoZSBpbmNsdWRlZCBHbHlwaGljb25zIGljb24gZm9udC4gVXNlZnVsIGZvciB0aG9zZSBpbmNsdWRpbmcgQm9vdHN0cmFwIHZpYSBCb3dlci5cblxuLy8qKiBMb2FkIGZvbnRzIGZyb20gdGhpcyBkaXJlY3RvcnkuXG5cbi8vIFtjb252ZXJ0ZXJdIElmICRib290c3RyYXAtc2Fzcy1hc3NldC1oZWxwZXIgaWYgdXNlZCwgcHJvdmlkZSBwYXRoIHJlbGF0aXZlIHRvIHRoZSBhc3NldHMgbG9hZCBwYXRoLlxuLy8gW2NvbnZlcnRlcl0gVGhpcyBpcyBiZWNhdXNlIHNvbWUgYXNzZXQgaGVscGVycywgc3VjaCBhcyBTcHJvY2tldHMsIGRvIG5vdCB3b3JrIHdpdGggZmlsZS1yZWxhdGl2ZSBwYXRocy5cbiRpY29uLWZvbnQtcGF0aDogaWYoJGJvb3RzdHJhcC1zYXNzLWFzc2V0LWhlbHBlciwgXCJib290c3RyYXAvXCIsIFwiLi4vZm9udHMvYm9vdHN0cmFwL1wiKSAhZGVmYXVsdDtcblxuLy8qKiBGaWxlIG5hbWUgZm9yIGFsbCBmb250IGZpbGVzLlxuJGljb24tZm9udC1uYW1lOiAgICAgICAgICBcImdseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXJcIiAhZGVmYXVsdDtcbi8vKiogRWxlbWVudCBJRCB3aXRoaW4gU1ZHIGljb24gZmlsZS5cbiRpY29uLWZvbnQtc3ZnLWlkOiAgICAgICAgXCJnbHlwaGljb25zX2hhbGZsaW5nc3JlZ3VsYXJcIiAhZGVmYXVsdDtcblxuXG4vLz09IENvbXBvbmVudHNcbi8vXG4vLyMjIERlZmluZSBjb21tb24gcGFkZGluZyBhbmQgYm9yZGVyIHJhZGl1cyBzaXplcyBhbmQgbW9yZS4gVmFsdWVzIGJhc2VkIG9uIDE0cHggdGV4dCBhbmQgMS40MjggbGluZS1oZWlnaHQgKH4yMHB4IHRvIHN0YXJ0KS5cblxuJHBhZGRpbmctYmFzZS12ZXJ0aWNhbDogICAgIDZweCAhZGVmYXVsdDtcbiRwYWRkaW5nLWJhc2UtaG9yaXpvbnRhbDogICAxMnB4ICFkZWZhdWx0O1xuXG4kcGFkZGluZy1sYXJnZS12ZXJ0aWNhbDogICAgMTBweCAhZGVmYXVsdDtcbiRwYWRkaW5nLWxhcmdlLWhvcml6b250YWw6ICAxNnB4ICFkZWZhdWx0O1xuXG4kcGFkZGluZy1zbWFsbC12ZXJ0aWNhbDogICAgNXB4ICFkZWZhdWx0O1xuJHBhZGRpbmctc21hbGwtaG9yaXpvbnRhbDogIDEwcHggIWRlZmF1bHQ7XG5cbiRwYWRkaW5nLXhzLXZlcnRpY2FsOiAgICAgICAxcHggIWRlZmF1bHQ7XG4kcGFkZGluZy14cy1ob3Jpem9udGFsOiAgICAgNXB4ICFkZWZhdWx0O1xuXG4kbGluZS1oZWlnaHQtbGFyZ2U6ICAgICAgICAgMS4zMzMzMzMzICFkZWZhdWx0OyAvLyBleHRyYSBkZWNpbWFscyBmb3IgV2luIDguMSBDaHJvbWVcbiRsaW5lLWhlaWdodC1zbWFsbDogICAgICAgICAxLjUgIWRlZmF1bHQ7XG5cbiRib3JkZXItcmFkaXVzLWJhc2U6ICAgICAgICA0cHggIWRlZmF1bHQ7XG4kYm9yZGVyLXJhZGl1cy1sYXJnZTogICAgICAgNnB4ICFkZWZhdWx0O1xuJGJvcmRlci1yYWRpdXMtc21hbGw6ICAgICAgIDNweCAhZGVmYXVsdDtcblxuLy8qKiBHbG9iYWwgY29sb3IgZm9yIGFjdGl2ZSBpdGVtcyAoZS5nLiwgbmF2cyBvciBkcm9wZG93bnMpLlxuJGNvbXBvbmVudC1hY3RpdmUtY29sb3I6ICAgICNmZmYgIWRlZmF1bHQ7XG4vLyoqIEdsb2JhbCBiYWNrZ3JvdW5kIGNvbG9yIGZvciBhY3RpdmUgaXRlbXMgKGUuZy4sIG5hdnMgb3IgZHJvcGRvd25zKS5cbiRjb21wb25lbnQtYWN0aXZlLWJnOiAgICAgICAkYnJhbmQtcHJpbWFyeSAhZGVmYXVsdDtcblxuLy8qKiBXaWR0aCBvZiB0aGUgYGJvcmRlcmAgZm9yIGdlbmVyYXRpbmcgY2FyZXRzIHRoYXQgaW5kaWNhdG9yIGRyb3Bkb3ducy5cbiRjYXJldC13aWR0aC1iYXNlOiAgICAgICAgICA0cHggIWRlZmF1bHQ7XG4vLyoqIENhcmV0cyBpbmNyZWFzZSBzbGlnaHRseSBpbiBzaXplIGZvciBsYXJnZXIgY29tcG9uZW50cy5cbiRjYXJldC13aWR0aC1sYXJnZTogICAgICAgICA1cHggIWRlZmF1bHQ7XG5cblxuLy89PSBUYWJsZXNcbi8vXG4vLyMjIEN1c3RvbWl6ZXMgdGhlIGAudGFibGVgIGNvbXBvbmVudCB3aXRoIGJhc2ljIHZhbHVlcywgZWFjaCB1c2VkIGFjcm9zcyBhbGwgdGFibGUgdmFyaWF0aW9ucy5cblxuLy8qKiBQYWRkaW5nIGZvciBgPHRoPmBzIGFuZCBgPHRkPmBzLlxuJHRhYmxlLWNlbGwtcGFkZGluZzogICAgICAgICAgICA4cHggIWRlZmF1bHQ7XG4vLyoqIFBhZGRpbmcgZm9yIGNlbGxzIGluIGAudGFibGUtY29uZGVuc2VkYC5cbiR0YWJsZS1jb25kZW5zZWQtY2VsbC1wYWRkaW5nOiAgNXB4ICFkZWZhdWx0O1xuXG4vLyoqIERlZmF1bHQgYmFja2dyb3VuZCBjb2xvciB1c2VkIGZvciBhbGwgdGFibGVzLlxuJHRhYmxlLWJnOiAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudCAhZGVmYXVsdDtcbi8vKiogQmFja2dyb3VuZCBjb2xvciB1c2VkIGZvciBgLnRhYmxlLXN0cmlwZWRgLlxuJHRhYmxlLWJnLWFjY2VudDogICAgICAgICAgICAgICAjZjlmOWY5ICFkZWZhdWx0O1xuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIHVzZWQgZm9yIGAudGFibGUtaG92ZXJgLlxuJHRhYmxlLWJnLWhvdmVyOiAgICAgICAgICAgICAgICAjZjVmNWY1ICFkZWZhdWx0O1xuJHRhYmxlLWJnLWFjdGl2ZTogICAgICAgICAgICAgICAkdGFibGUtYmctaG92ZXIgIWRlZmF1bHQ7XG5cbi8vKiogQm9yZGVyIGNvbG9yIGZvciB0YWJsZSBhbmQgY2VsbCBib3JkZXJzLlxuJHRhYmxlLWJvcmRlci1jb2xvcjogICAgICAgICAgICAjZGRkICFkZWZhdWx0O1xuXG5cbi8vPT0gQnV0dG9uc1xuLy9cbi8vIyMgRm9yIGVhY2ggb2YgQm9vdHN0cmFwJ3MgYnV0dG9ucywgZGVmaW5lIHRleHQsIGJhY2tncm91bmQgYW5kIGJvcmRlciBjb2xvci5cblxuJGJ0bi1mb250LXdlaWdodDogICAgICAgICAgICAgICAgbm9ybWFsICFkZWZhdWx0O1xuXG4kYnRuLWRlZmF1bHQtY29sb3I6ICAgICAgICAgICAgICAjMzMzICFkZWZhdWx0O1xuJGJ0bi1kZWZhdWx0LWJnOiAgICAgICAgICAgICAgICAgI2ZmZiAhZGVmYXVsdDtcbiRidG4tZGVmYXVsdC1ib3JkZXI6ICAgICAgICAgICAgICNjY2MgIWRlZmF1bHQ7XG5cbiRidG4tcHJpbWFyeS1jb2xvcjogICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kYnRuLXByaW1hcnktYmc6ICAgICAgICAgICAgICAgICAkYnJhbmQtcHJpbWFyeSAhZGVmYXVsdDtcbiRidG4tcHJpbWFyeS1ib3JkZXI6ICAgICAgICAgICAgIGRhcmtlbigkYnRuLXByaW1hcnktYmcsIDUlKSAhZGVmYXVsdDtcblxuJGJ0bi1zdWNjZXNzLWNvbG9yOiAgICAgICAgICAgICAgI2ZmZiAhZGVmYXVsdDtcbiRidG4tc3VjY2Vzcy1iZzogICAgICAgICAgICAgICAgICRicmFuZC1zdWNjZXNzICFkZWZhdWx0O1xuJGJ0bi1zdWNjZXNzLWJvcmRlcjogICAgICAgICAgICAgZGFya2VuKCRidG4tc3VjY2Vzcy1iZywgNSUpICFkZWZhdWx0O1xuXG4kYnRuLWluZm8tY29sb3I6ICAgICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuJGJ0bi1pbmZvLWJnOiAgICAgICAgICAgICAgICAgICAgJGJyYW5kLWluZm8gIWRlZmF1bHQ7XG4kYnRuLWluZm8tYm9yZGVyOiAgICAgICAgICAgICAgICBkYXJrZW4oJGJ0bi1pbmZvLWJnLCA1JSkgIWRlZmF1bHQ7XG5cbiRidG4td2FybmluZy1jb2xvcjogICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kYnRuLXdhcm5pbmctYmc6ICAgICAgICAgICAgICAgICAkYnJhbmQtd2FybmluZyAhZGVmYXVsdDtcbiRidG4td2FybmluZy1ib3JkZXI6ICAgICAgICAgICAgIGRhcmtlbigkYnRuLXdhcm5pbmctYmcsIDUlKSAhZGVmYXVsdDtcblxuJGJ0bi1kYW5nZXItY29sb3I6ICAgICAgICAgICAgICAgI2ZmZiAhZGVmYXVsdDtcbiRidG4tZGFuZ2VyLWJnOiAgICAgICAgICAgICAgICAgICRicmFuZC1kYW5nZXIgIWRlZmF1bHQ7XG4kYnRuLWRhbmdlci1ib3JkZXI6ICAgICAgICAgICAgICBkYXJrZW4oJGJ0bi1kYW5nZXItYmcsIDUlKSAhZGVmYXVsdDtcblxuJGJ0bi1saW5rLWRpc2FibGVkLWNvbG9yOiAgICAgICAgJGdyYXktbGlnaHQgIWRlZmF1bHQ7XG5cbi8vIEFsbG93cyBmb3IgY3VzdG9taXppbmcgYnV0dG9uIHJhZGl1cyBpbmRlcGVuZGVudGx5IGZyb20gZ2xvYmFsIGJvcmRlciByYWRpdXNcbiRidG4tYm9yZGVyLXJhZGl1cy1iYXNlOiAgICAgICAgICRib3JkZXItcmFkaXVzLWJhc2UgIWRlZmF1bHQ7XG4kYnRuLWJvcmRlci1yYWRpdXMtbGFyZ2U6ICAgICAgICAkYm9yZGVyLXJhZGl1cy1sYXJnZSAhZGVmYXVsdDtcbiRidG4tYm9yZGVyLXJhZGl1cy1zbWFsbDogICAgICAgICRib3JkZXItcmFkaXVzLXNtYWxsICFkZWZhdWx0O1xuXG5cbi8vPT0gRm9ybXNcbi8vXG4vLyMjXG5cbi8vKiogYDxpbnB1dD5gIGJhY2tncm91bmQgY29sb3JcbiRpbnB1dC1iZzogICAgICAgICAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4vLyoqIGA8aW5wdXQgZGlzYWJsZWQ+YCBiYWNrZ3JvdW5kIGNvbG9yXG4kaW5wdXQtYmctZGlzYWJsZWQ6ICAgICAgICAgICAgICAkZ3JheS1saWdodGVyICFkZWZhdWx0O1xuXG4vLyoqIFRleHQgY29sb3IgZm9yIGA8aW5wdXQ+YHNcbiRpbnB1dC1jb2xvcjogICAgICAgICAgICAgICAgICAgICRncmF5ICFkZWZhdWx0O1xuLy8qKiBgPGlucHV0PmAgYm9yZGVyIGNvbG9yXG4kaW5wdXQtYm9yZGVyOiAgICAgICAgICAgICAgICAgICAjY2NjICFkZWZhdWx0O1xuXG4vLyBUT0RPOiBSZW5hbWUgYCRpbnB1dC1ib3JkZXItcmFkaXVzYCB0byBgJGlucHV0LWJvcmRlci1yYWRpdXMtYmFzZWAgaW4gdjRcbi8vKiogRGVmYXVsdCBgLmZvcm0tY29udHJvbGAgYm9yZGVyIHJhZGl1c1xuLy8gVGhpcyBoYXMgbm8gZWZmZWN0IG9uIGA8c2VsZWN0PmBzIGluIHNvbWUgYnJvd3NlcnMsIGR1ZSB0byB0aGUgbGltaXRlZCBzdHlsYWJpbGl0eSBvZiBgPHNlbGVjdD5gcyBpbiBDU1MuXG4kaW5wdXQtYm9yZGVyLXJhZGl1czogICAgICAgICAgICAkYm9yZGVyLXJhZGl1cy1iYXNlICFkZWZhdWx0O1xuLy8qKiBMYXJnZSBgLmZvcm0tY29udHJvbGAgYm9yZGVyIHJhZGl1c1xuJGlucHV0LWJvcmRlci1yYWRpdXMtbGFyZ2U6ICAgICAgJGJvcmRlci1yYWRpdXMtbGFyZ2UgIWRlZmF1bHQ7XG4vLyoqIFNtYWxsIGAuZm9ybS1jb250cm9sYCBib3JkZXIgcmFkaXVzXG4kaW5wdXQtYm9yZGVyLXJhZGl1cy1zbWFsbDogICAgICAkYm9yZGVyLXJhZGl1cy1zbWFsbCAhZGVmYXVsdDtcblxuLy8qKiBCb3JkZXIgY29sb3IgZm9yIGlucHV0cyBvbiBmb2N1c1xuJGlucHV0LWJvcmRlci1mb2N1czogICAgICAgICAgICAgIzY2YWZlOSAhZGVmYXVsdDtcblxuLy8qKiBQbGFjZWhvbGRlciB0ZXh0IGNvbG9yXG4kaW5wdXQtY29sb3ItcGxhY2Vob2xkZXI6ICAgICAgICAjOTk5ICFkZWZhdWx0O1xuXG4vLyoqIERlZmF1bHQgYC5mb3JtLWNvbnRyb2xgIGhlaWdodFxuJGlucHV0LWhlaWdodC1iYXNlOiAgICAgICAgICAgICAgKCRsaW5lLWhlaWdodC1jb21wdXRlZCArICgkcGFkZGluZy1iYXNlLXZlcnRpY2FsICogMikgKyAyKSAhZGVmYXVsdDtcbi8vKiogTGFyZ2UgYC5mb3JtLWNvbnRyb2xgIGhlaWdodFxuJGlucHV0LWhlaWdodC1sYXJnZTogICAgICAgICAgICAgKGNlaWwoJGZvbnQtc2l6ZS1sYXJnZSAqICRsaW5lLWhlaWdodC1sYXJnZSkgKyAoJHBhZGRpbmctbGFyZ2UtdmVydGljYWwgKiAyKSArIDIpICFkZWZhdWx0O1xuLy8qKiBTbWFsbCBgLmZvcm0tY29udHJvbGAgaGVpZ2h0XG4kaW5wdXQtaGVpZ2h0LXNtYWxsOiAgICAgICAgICAgICAoZmxvb3IoJGZvbnQtc2l6ZS1zbWFsbCAqICRsaW5lLWhlaWdodC1zbWFsbCkgKyAoJHBhZGRpbmctc21hbGwtdmVydGljYWwgKiAyKSArIDIpICFkZWZhdWx0O1xuXG4vLyoqIGAuZm9ybS1ncm91cGAgbWFyZ2luXG4kZm9ybS1ncm91cC1tYXJnaW4tYm90dG9tOiAgICAgICAxNXB4ICFkZWZhdWx0O1xuXG4kbGVnZW5kLWNvbG9yOiAgICAgICAgICAgICAgICAgICAkZ3JheS1kYXJrICFkZWZhdWx0O1xuJGxlZ2VuZC1ib3JkZXItY29sb3I6ICAgICAgICAgICAgI2U1ZTVlNSAhZGVmYXVsdDtcblxuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIGZvciB0ZXh0dWFsIGlucHV0IGFkZG9uc1xuJGlucHV0LWdyb3VwLWFkZG9uLWJnOiAgICAgICAgICAgJGdyYXktbGlnaHRlciAhZGVmYXVsdDtcbi8vKiogQm9yZGVyIGNvbG9yIGZvciB0ZXh0dWFsIGlucHV0IGFkZG9uc1xuJGlucHV0LWdyb3VwLWFkZG9uLWJvcmRlci1jb2xvcjogJGlucHV0LWJvcmRlciAhZGVmYXVsdDtcblxuLy8qKiBEaXNhYmxlZCBjdXJzb3IgZm9yIGZvcm0gY29udHJvbHMgYW5kIGJ1dHRvbnMuXG4kY3Vyc29yLWRpc2FibGVkOiAgICAgICAgICAgICAgICBub3QtYWxsb3dlZCAhZGVmYXVsdDtcblxuXG4vLz09IERyb3Bkb3duc1xuLy9cbi8vIyMgRHJvcGRvd24gbWVudSBjb250YWluZXIgYW5kIGNvbnRlbnRzLlxuXG4vLyoqIEJhY2tncm91bmQgZm9yIHRoZSBkcm9wZG93biBtZW51LlxuJGRyb3Bkb3duLWJnOiAgICAgICAgICAgICAgICAgICAgI2ZmZiAhZGVmYXVsdDtcbi8vKiogRHJvcGRvd24gbWVudSBgYm9yZGVyLWNvbG9yYC5cbiRkcm9wZG93bi1ib3JkZXI6ICAgICAgICAgICAgICAgIHJnYmEoMCwwLDAsLjE1KSAhZGVmYXVsdDtcbi8vKiogRHJvcGRvd24gbWVudSBgYm9yZGVyLWNvbG9yYCAqKmZvciBJRTgqKi5cbiRkcm9wZG93bi1mYWxsYmFjay1ib3JkZXI6ICAgICAgICNjY2MgIWRlZmF1bHQ7XG4vLyoqIERpdmlkZXIgY29sb3IgZm9yIGJldHdlZW4gZHJvcGRvd24gaXRlbXMuXG4kZHJvcGRvd24tZGl2aWRlci1iZzogICAgICAgICAgICAjZTVlNWU1ICFkZWZhdWx0O1xuXG4vLyoqIERyb3Bkb3duIGxpbmsgdGV4dCBjb2xvci5cbiRkcm9wZG93bi1saW5rLWNvbG9yOiAgICAgICAgICAgICRncmF5LWRhcmsgIWRlZmF1bHQ7XG4vLyoqIEhvdmVyIGNvbG9yIGZvciBkcm9wZG93biBsaW5rcy5cbiRkcm9wZG93bi1saW5rLWhvdmVyLWNvbG9yOiAgICAgIGRhcmtlbigkZ3JheS1kYXJrLCA1JSkgIWRlZmF1bHQ7XG4vLyoqIEhvdmVyIGJhY2tncm91bmQgZm9yIGRyb3Bkb3duIGxpbmtzLlxuJGRyb3Bkb3duLWxpbmstaG92ZXItYmc6ICAgICAgICAgI2Y1ZjVmNSAhZGVmYXVsdDtcblxuLy8qKiBBY3RpdmUgZHJvcGRvd24gbWVudSBpdGVtIHRleHQgY29sb3IuXG4kZHJvcGRvd24tbGluay1hY3RpdmUtY29sb3I6ICAgICAkY29tcG9uZW50LWFjdGl2ZS1jb2xvciAhZGVmYXVsdDtcbi8vKiogQWN0aXZlIGRyb3Bkb3duIG1lbnUgaXRlbSBiYWNrZ3JvdW5kIGNvbG9yLlxuJGRyb3Bkb3duLWxpbmstYWN0aXZlLWJnOiAgICAgICAgJGNvbXBvbmVudC1hY3RpdmUtYmcgIWRlZmF1bHQ7XG5cbi8vKiogRGlzYWJsZWQgZHJvcGRvd24gbWVudSBpdGVtIGJhY2tncm91bmQgY29sb3IuXG4kZHJvcGRvd24tbGluay1kaXNhYmxlZC1jb2xvcjogICAkZ3JheS1saWdodCAhZGVmYXVsdDtcblxuLy8qKiBUZXh0IGNvbG9yIGZvciBoZWFkZXJzIHdpdGhpbiBkcm9wZG93biBtZW51cy5cbiRkcm9wZG93bi1oZWFkZXItY29sb3I6ICAgICAgICAgICRncmF5LWxpZ2h0ICFkZWZhdWx0O1xuXG4vLyoqIERlcHJlY2F0ZWQgYCRkcm9wZG93bi1jYXJldC1jb2xvcmAgYXMgb2YgdjMuMS4wXG4kZHJvcGRvd24tY2FyZXQtY29sb3I6ICAgICAgICAgICAjMDAwICFkZWZhdWx0O1xuXG5cbi8vLS0gWi1pbmRleCBtYXN0ZXIgbGlzdFxuLy9cbi8vIFdhcm5pbmc6IEF2b2lkIGN1c3RvbWl6aW5nIHRoZXNlIHZhbHVlcy4gVGhleSdyZSB1c2VkIGZvciBhIGJpcmQncyBleWUgdmlld1xuLy8gb2YgY29tcG9uZW50cyBkZXBlbmRlbnQgb24gdGhlIHotYXhpcyBhbmQgYXJlIGRlc2lnbmVkIHRvIGFsbCB3b3JrIHRvZ2V0aGVyLlxuLy9cbi8vIE5vdGU6IFRoZXNlIHZhcmlhYmxlcyBhcmUgbm90IGdlbmVyYXRlZCBpbnRvIHRoZSBDdXN0b21pemVyLlxuXG4kemluZGV4LW5hdmJhcjogICAgICAgICAgICAxMDAwICFkZWZhdWx0O1xuJHppbmRleC1kcm9wZG93bjogICAgICAgICAgMTAwMCAhZGVmYXVsdDtcbiR6aW5kZXgtcG9wb3ZlcjogICAgICAgICAgIDEwNjAgIWRlZmF1bHQ7XG4kemluZGV4LXRvb2x0aXA6ICAgICAgICAgICAxMDcwICFkZWZhdWx0O1xuJHppbmRleC1uYXZiYXItZml4ZWQ6ICAgICAgMTAzMCAhZGVmYXVsdDtcbiR6aW5kZXgtbW9kYWwtYmFja2dyb3VuZDogIDEwNDAgIWRlZmF1bHQ7XG4kemluZGV4LW1vZGFsOiAgICAgICAgICAgICAxMDUwICFkZWZhdWx0O1xuXG5cbi8vPT0gTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xuLy9cbi8vIyMgRGVmaW5lIHRoZSBicmVha3BvaW50cyBhdCB3aGljaCB5b3VyIGxheW91dCB3aWxsIGNoYW5nZSwgYWRhcHRpbmcgdG8gZGlmZmVyZW50IHNjcmVlbiBzaXplcy5cblxuLy8gRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmVcbi8vKiogRGVwcmVjYXRlZCBgJHNjcmVlbi14c2AgYXMgb2YgdjMuMC4xXG4kc2NyZWVuLXhzOiAgICAgICAgICAgICAgICAgIDQ4MHB4ICFkZWZhdWx0O1xuLy8qKiBEZXByZWNhdGVkIGAkc2NyZWVuLXhzLW1pbmAgYXMgb2YgdjMuMi4wXG4kc2NyZWVuLXhzLW1pbjogICAgICAgICAgICAgICRzY3JlZW4teHMgIWRlZmF1bHQ7XG4vLyoqIERlcHJlY2F0ZWQgYCRzY3JlZW4tcGhvbmVgIGFzIG9mIHYzLjAuMVxuJHNjcmVlbi1waG9uZTogICAgICAgICAgICAgICAkc2NyZWVuLXhzLW1pbiAhZGVmYXVsdDtcblxuLy8gU21hbGwgc2NyZWVuIC8gdGFibGV0XG4vLyoqIERlcHJlY2F0ZWQgYCRzY3JlZW4tc21gIGFzIG9mIHYzLjAuMVxuJHNjcmVlbi1zbTogICAgICAgICAgICAgICAgICA3NjhweCAhZGVmYXVsdDtcbiRzY3JlZW4tc20tbWluOiAgICAgICAgICAgICAgJHNjcmVlbi1zbSAhZGVmYXVsdDtcbi8vKiogRGVwcmVjYXRlZCBgJHNjcmVlbi10YWJsZXRgIGFzIG9mIHYzLjAuMVxuJHNjcmVlbi10YWJsZXQ6ICAgICAgICAgICAgICAkc2NyZWVuLXNtLW1pbiAhZGVmYXVsdDtcblxuLy8gTWVkaXVtIHNjcmVlbiAvIGRlc2t0b3Bcbi8vKiogRGVwcmVjYXRlZCBgJHNjcmVlbi1tZGAgYXMgb2YgdjMuMC4xXG4kc2NyZWVuLW1kOiAgICAgICAgICAgICAgICAgIDk5MnB4ICFkZWZhdWx0O1xuJHNjcmVlbi1tZC1taW46ICAgICAgICAgICAgICAkc2NyZWVuLW1kICFkZWZhdWx0O1xuLy8qKiBEZXByZWNhdGVkIGAkc2NyZWVuLWRlc2t0b3BgIGFzIG9mIHYzLjAuMVxuJHNjcmVlbi1kZXNrdG9wOiAgICAgICAgICAgICAkc2NyZWVuLW1kLW1pbiAhZGVmYXVsdDtcblxuLy8gTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wXG4vLyoqIERlcHJlY2F0ZWQgYCRzY3JlZW4tbGdgIGFzIG9mIHYzLjAuMVxuJHNjcmVlbi1sZzogICAgICAgICAgICAgICAgICAxMjAwcHggIWRlZmF1bHQ7XG4kc2NyZWVuLWxnLW1pbjogICAgICAgICAgICAgICRzY3JlZW4tbGcgIWRlZmF1bHQ7XG4vLyoqIERlcHJlY2F0ZWQgYCRzY3JlZW4tbGctZGVza3RvcGAgYXMgb2YgdjMuMC4xXG4kc2NyZWVuLWxnLWRlc2t0b3A6ICAgICAgICAgICRzY3JlZW4tbGctbWluICFkZWZhdWx0O1xuXG4vLyBTbyBtZWRpYSBxdWVyaWVzIGRvbid0IG92ZXJsYXAgd2hlbiByZXF1aXJlZCwgcHJvdmlkZSBhIG1heGltdW1cbiRzY3JlZW4teHMtbWF4OiAgICAgICAgICAgICAgKCRzY3JlZW4tc20tbWluIC0gMSkgIWRlZmF1bHQ7XG4kc2NyZWVuLXNtLW1heDogICAgICAgICAgICAgICgkc2NyZWVuLW1kLW1pbiAtIDEpICFkZWZhdWx0O1xuJHNjcmVlbi1tZC1tYXg6ICAgICAgICAgICAgICAoJHNjcmVlbi1sZy1taW4gLSAxKSAhZGVmYXVsdDtcblxuXG4vLz09IEdyaWQgc3lzdGVtXG4vL1xuLy8jIyBEZWZpbmUgeW91ciBjdXN0b20gcmVzcG9uc2l2ZSBncmlkLlxuXG4vLyoqIE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBncmlkLlxuJGdyaWQtY29sdW1uczogICAgICAgICAgICAgIDEyICFkZWZhdWx0O1xuLy8qKiBQYWRkaW5nIGJldHdlZW4gY29sdW1ucy4gR2V0cyBkaXZpZGVkIGluIGhhbGYgZm9yIHRoZSBsZWZ0IGFuZCByaWdodC5cbiRncmlkLWd1dHRlci13aWR0aDogICAgICAgICAzMHB4ICFkZWZhdWx0O1xuLy8gTmF2YmFyIGNvbGxhcHNlXG4vLyoqIFBvaW50IGF0IHdoaWNoIHRoZSBuYXZiYXIgYmVjb21lcyB1bmNvbGxhcHNlZC5cbiRncmlkLWZsb2F0LWJyZWFrcG9pbnQ6ICAgICAkc2NyZWVuLXNtLW1pbiAhZGVmYXVsdDtcbi8vKiogUG9pbnQgYXQgd2hpY2ggdGhlIG5hdmJhciBiZWdpbnMgY29sbGFwc2luZy5cbiRncmlkLWZsb2F0LWJyZWFrcG9pbnQtbWF4OiAoJGdyaWQtZmxvYXQtYnJlYWtwb2ludCAtIDEpICFkZWZhdWx0O1xuXG5cbi8vPT0gQ29udGFpbmVyIHNpemVzXG4vL1xuLy8jIyBEZWZpbmUgdGhlIG1heGltdW0gd2lkdGggb2YgYC5jb250YWluZXJgIGZvciBkaWZmZXJlbnQgc2NyZWVuIHNpemVzLlxuXG4vLyBTbWFsbCBzY3JlZW4gLyB0YWJsZXRcbiRjb250YWluZXItdGFibGV0OiAgICAgICAgICAgICAoNzIwcHggKyAkZ3JpZC1ndXR0ZXItd2lkdGgpICFkZWZhdWx0O1xuLy8qKiBGb3IgYCRzY3JlZW4tc20tbWluYCBhbmQgdXAuXG4kY29udGFpbmVyLXNtOiAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci10YWJsZXQgIWRlZmF1bHQ7XG5cbi8vIE1lZGl1bSBzY3JlZW4gLyBkZXNrdG9wXG4kY29udGFpbmVyLWRlc2t0b3A6ICAgICAgICAgICAgKDk0MHB4ICsgJGdyaWQtZ3V0dGVyLXdpZHRoKSAhZGVmYXVsdDtcbi8vKiogRm9yIGAkc2NyZWVuLW1kLW1pbmAgYW5kIHVwLlxuJGNvbnRhaW5lci1tZDogICAgICAgICAgICAgICAgICRjb250YWluZXItZGVza3RvcCAhZGVmYXVsdDtcblxuLy8gTGFyZ2Ugc2NyZWVuIC8gd2lkZSBkZXNrdG9wXG4kY29udGFpbmVyLWxhcmdlLWRlc2t0b3A6ICAgICAgKDExNDBweCArICRncmlkLWd1dHRlci13aWR0aCkgIWRlZmF1bHQ7XG4vLyoqIEZvciBgJHNjcmVlbi1sZy1taW5gIGFuZCB1cC5cbiRjb250YWluZXItbGc6ICAgICAgICAgICAgICAgICAkY29udGFpbmVyLWxhcmdlLWRlc2t0b3AgIWRlZmF1bHQ7XG5cblxuLy89PSBOYXZiYXJcbi8vXG4vLyMjXG5cbi8vIEJhc2ljcyBvZiBhIG5hdmJhclxuJG5hdmJhci1oZWlnaHQ6ICAgICAgICAgICAgICAgICAgICA1MHB4ICFkZWZhdWx0O1xuJG5hdmJhci1tYXJnaW4tYm90dG9tOiAgICAgICAgICAgICAkbGluZS1oZWlnaHQtY29tcHV0ZWQgIWRlZmF1bHQ7XG4kbmF2YmFyLWJvcmRlci1yYWRpdXM6ICAgICAgICAgICAgICRib3JkZXItcmFkaXVzLWJhc2UgIWRlZmF1bHQ7XG4kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDogICAgICAgIGZsb29yKCgkZ3JpZC1ndXR0ZXItd2lkdGggLyAyKSkgIWRlZmF1bHQ7XG4kbmF2YmFyLXBhZGRpbmctdmVydGljYWw6ICAgICAgICAgICgoJG5hdmJhci1oZWlnaHQgLSAkbGluZS1oZWlnaHQtY29tcHV0ZWQpIC8gMikgIWRlZmF1bHQ7XG4kbmF2YmFyLWNvbGxhcHNlLW1heC1oZWlnaHQ6ICAgICAgIDM0MHB4ICFkZWZhdWx0O1xuXG4kbmF2YmFyLWRlZmF1bHQtY29sb3I6ICAgICAgICAgICAgICM3NzcgIWRlZmF1bHQ7XG4kbmF2YmFyLWRlZmF1bHQtYmc6ICAgICAgICAgICAgICAgICNmOGY4ZjggIWRlZmF1bHQ7XG4kbmF2YmFyLWRlZmF1bHQtYm9yZGVyOiAgICAgICAgICAgIGRhcmtlbigkbmF2YmFyLWRlZmF1bHQtYmcsIDYuNSUpICFkZWZhdWx0O1xuXG4vLyBOYXZiYXIgbGlua3NcbiRuYXZiYXItZGVmYXVsdC1saW5rLWNvbG9yOiAgICAgICAgICAgICAgICAjNzc3ICFkZWZhdWx0O1xuJG5hdmJhci1kZWZhdWx0LWxpbmstaG92ZXItY29sb3I6ICAgICAgICAgICMzMzMgIWRlZmF1bHQ7XG4kbmF2YmFyLWRlZmF1bHQtbGluay1ob3Zlci1iZzogICAgICAgICAgICAgdHJhbnNwYXJlbnQgIWRlZmF1bHQ7XG4kbmF2YmFyLWRlZmF1bHQtbGluay1hY3RpdmUtY29sb3I6ICAgICAgICAgIzU1NSAhZGVmYXVsdDtcbiRuYXZiYXItZGVmYXVsdC1saW5rLWFjdGl2ZS1iZzogICAgICAgICAgICBkYXJrZW4oJG5hdmJhci1kZWZhdWx0LWJnLCA2LjUlKSAhZGVmYXVsdDtcbiRuYXZiYXItZGVmYXVsdC1saW5rLWRpc2FibGVkLWNvbG9yOiAgICAgICAjY2NjICFkZWZhdWx0O1xuJG5hdmJhci1kZWZhdWx0LWxpbmstZGlzYWJsZWQtYmc6ICAgICAgICAgIHRyYW5zcGFyZW50ICFkZWZhdWx0O1xuXG4vLyBOYXZiYXIgYnJhbmQgbGFiZWxcbiRuYXZiYXItZGVmYXVsdC1icmFuZC1jb2xvcjogICAgICAgICAgICAgICAkbmF2YmFyLWRlZmF1bHQtbGluay1jb2xvciAhZGVmYXVsdDtcbiRuYXZiYXItZGVmYXVsdC1icmFuZC1ob3Zlci1jb2xvcjogICAgICAgICBkYXJrZW4oJG5hdmJhci1kZWZhdWx0LWJyYW5kLWNvbG9yLCAxMCUpICFkZWZhdWx0O1xuJG5hdmJhci1kZWZhdWx0LWJyYW5kLWhvdmVyLWJnOiAgICAgICAgICAgIHRyYW5zcGFyZW50ICFkZWZhdWx0O1xuXG4vLyBOYXZiYXIgdG9nZ2xlXG4kbmF2YmFyLWRlZmF1bHQtdG9nZ2xlLWhvdmVyLWJnOiAgICAgICAgICAgI2RkZCAhZGVmYXVsdDtcbiRuYXZiYXItZGVmYXVsdC10b2dnbGUtaWNvbi1iYXItYmc6ICAgICAgICAjODg4ICFkZWZhdWx0O1xuJG5hdmJhci1kZWZhdWx0LXRvZ2dsZS1ib3JkZXItY29sb3I6ICAgICAgICNkZGQgIWRlZmF1bHQ7XG5cblxuLy89PT0gSW52ZXJ0ZWQgbmF2YmFyXG4vLyBSZXNldCBpbnZlcnRlZCBuYXZiYXIgYmFzaWNzXG4kbmF2YmFyLWludmVyc2UtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0ZW4oJGdyYXktbGlnaHQsIDE1JSkgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtYmc6ICAgICAgICAgICAgICAgICAgICAgICAgICMyMjIgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtYm9yZGVyOiAgICAgICAgICAgICAgICAgICAgIGRhcmtlbigkbmF2YmFyLWludmVyc2UtYmcsIDEwJSkgIWRlZmF1bHQ7XG5cbi8vIEludmVydGVkIG5hdmJhciBsaW5rc1xuJG5hdmJhci1pbnZlcnNlLWxpbmstY29sb3I6ICAgICAgICAgICAgICAgICBsaWdodGVuKCRncmF5LWxpZ2h0LCAxNSUpICFkZWZhdWx0O1xuJG5hdmJhci1pbnZlcnNlLWxpbmstaG92ZXItY29sb3I6ICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuJG5hdmJhci1pbnZlcnNlLWxpbmstaG92ZXItYmc6ICAgICAgICAgICAgICB0cmFuc3BhcmVudCAhZGVmYXVsdDtcbiRuYXZiYXItaW52ZXJzZS1saW5rLWFjdGl2ZS1jb2xvcjogICAgICAgICAgJG5hdmJhci1pbnZlcnNlLWxpbmstaG92ZXItY29sb3IgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtbGluay1hY3RpdmUtYmc6ICAgICAgICAgICAgIGRhcmtlbigkbmF2YmFyLWludmVyc2UtYmcsIDEwJSkgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtbGluay1kaXNhYmxlZC1jb2xvcjogICAgICAgICM0NDQgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtbGluay1kaXNhYmxlZC1iZzogICAgICAgICAgIHRyYW5zcGFyZW50ICFkZWZhdWx0O1xuXG4vLyBJbnZlcnRlZCBuYXZiYXIgYnJhbmQgbGFiZWxcbiRuYXZiYXItaW52ZXJzZS1icmFuZC1jb2xvcjogICAgICAgICAgICAgICAgJG5hdmJhci1pbnZlcnNlLWxpbmstY29sb3IgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtYnJhbmQtaG92ZXItY29sb3I6ICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtYnJhbmQtaG92ZXItYmc6ICAgICAgICAgICAgIHRyYW5zcGFyZW50ICFkZWZhdWx0O1xuXG4vLyBJbnZlcnRlZCBuYXZiYXIgdG9nZ2xlXG4kbmF2YmFyLWludmVyc2UtdG9nZ2xlLWhvdmVyLWJnOiAgICAgICAgICAgICMzMzMgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtdG9nZ2xlLWljb24tYmFyLWJnOiAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kbmF2YmFyLWludmVyc2UtdG9nZ2xlLWJvcmRlci1jb2xvcjogICAgICAgICMzMzMgIWRlZmF1bHQ7XG5cblxuLy89PSBOYXZzXG4vL1xuLy8jI1xuXG4vLz09PSBTaGFyZWQgbmF2IHN0eWxlc1xuJG5hdi1saW5rLXBhZGRpbmc6ICAgICAgICAgICAgICAgICAgICAgICAgICAxMHB4IDE1cHggIWRlZmF1bHQ7XG4kbmF2LWxpbmstaG92ZXItYmc6ICAgICAgICAgICAgICAgICAgICAgICAgICRncmF5LWxpZ2h0ZXIgIWRlZmF1bHQ7XG5cbiRuYXYtZGlzYWJsZWQtbGluay1jb2xvcjogICAgICAgICAgICAgICAgICAgJGdyYXktbGlnaHQgIWRlZmF1bHQ7XG4kbmF2LWRpc2FibGVkLWxpbmstaG92ZXItY29sb3I6ICAgICAgICAgICAgICRncmF5LWxpZ2h0ICFkZWZhdWx0O1xuXG4vLz09IFRhYnNcbiRuYXYtdGFicy1ib3JkZXItY29sb3I6ICAgICAgICAgICAgICAgICAgICAgI2RkZCAhZGVmYXVsdDtcblxuJG5hdi10YWJzLWxpbmstaG92ZXItYm9yZGVyLWNvbG9yOiAgICAgICAgICAkZ3JheS1saWdodGVyICFkZWZhdWx0O1xuXG4kbmF2LXRhYnMtYWN0aXZlLWxpbmstaG92ZXItYmc6ICAgICAgICAgICAgICRib2R5LWJnICFkZWZhdWx0O1xuJG5hdi10YWJzLWFjdGl2ZS1saW5rLWhvdmVyLWNvbG9yOiAgICAgICAgICAkZ3JheSAhZGVmYXVsdDtcbiRuYXYtdGFicy1hY3RpdmUtbGluay1ob3Zlci1ib3JkZXItY29sb3I6ICAgI2RkZCAhZGVmYXVsdDtcblxuJG5hdi10YWJzLWp1c3RpZmllZC1saW5rLWJvcmRlci1jb2xvcjogICAgICAgICAgICAjZGRkICFkZWZhdWx0O1xuJG5hdi10YWJzLWp1c3RpZmllZC1hY3RpdmUtbGluay1ib3JkZXItY29sb3I6ICAgICAkYm9keS1iZyAhZGVmYXVsdDtcblxuLy89PSBQaWxsc1xuJG5hdi1waWxscy1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgICAgICAkYm9yZGVyLXJhZGl1cy1iYXNlICFkZWZhdWx0O1xuJG5hdi1waWxscy1hY3RpdmUtbGluay1ob3Zlci1iZzogICAgICAgICAgICAkY29tcG9uZW50LWFjdGl2ZS1iZyAhZGVmYXVsdDtcbiRuYXYtcGlsbHMtYWN0aXZlLWxpbmstaG92ZXItY29sb3I6ICAgICAgICAgJGNvbXBvbmVudC1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG5cblxuLy89PSBQYWdpbmF0aW9uXG4vL1xuLy8jI1xuXG4kcGFnaW5hdGlvbi1jb2xvcjogICAgICAgICAgICAgICAgICAgICAkbGluay1jb2xvciAhZGVmYXVsdDtcbiRwYWdpbmF0aW9uLWJnOiAgICAgICAgICAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1ib3JkZXI6ICAgICAgICAgICAgICAgICAgICAjZGRkICFkZWZhdWx0O1xuXG4kcGFnaW5hdGlvbi1ob3Zlci1jb2xvcjogICAgICAgICAgICAgICAkbGluay1ob3Zlci1jb2xvciAhZGVmYXVsdDtcbiRwYWdpbmF0aW9uLWhvdmVyLWJnOiAgICAgICAgICAgICAgICAgICRncmF5LWxpZ2h0ZXIgIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1ob3Zlci1ib3JkZXI6ICAgICAgICAgICAgICAjZGRkICFkZWZhdWx0O1xuXG4kcGFnaW5hdGlvbi1hY3RpdmUtY29sb3I6ICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuJHBhZ2luYXRpb24tYWN0aXZlLWJnOiAgICAgICAgICAgICAgICAgJGJyYW5kLXByaW1hcnkgIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1hY3RpdmUtYm9yZGVyOiAgICAgICAgICAgICAkYnJhbmQtcHJpbWFyeSAhZGVmYXVsdDtcblxuJHBhZ2luYXRpb24tZGlzYWJsZWQtY29sb3I6ICAgICAgICAgICAgJGdyYXktbGlnaHQgIWRlZmF1bHQ7XG4kcGFnaW5hdGlvbi1kaXNhYmxlZC1iZzogICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuJHBhZ2luYXRpb24tZGlzYWJsZWQtYm9yZGVyOiAgICAgICAgICAgI2RkZCAhZGVmYXVsdDtcblxuXG4vLz09IFBhZ2VyXG4vL1xuLy8jI1xuXG4kcGFnZXItYmc6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFnaW5hdGlvbi1iZyAhZGVmYXVsdDtcbiRwYWdlci1ib3JkZXI6ICAgICAgICAgICAgICAgICAgICAgICAgICRwYWdpbmF0aW9uLWJvcmRlciAhZGVmYXVsdDtcbiRwYWdlci1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgICAgIDE1cHggIWRlZmF1bHQ7XG5cbiRwYWdlci1ob3Zlci1iZzogICAgICAgICAgICAgICAgICAgICAgICRwYWdpbmF0aW9uLWhvdmVyLWJnICFkZWZhdWx0O1xuXG4kcGFnZXItYWN0aXZlLWJnOiAgICAgICAgICAgICAgICAgICAgICAkcGFnaW5hdGlvbi1hY3RpdmUtYmcgIWRlZmF1bHQ7XG4kcGFnZXItYWN0aXZlLWNvbG9yOiAgICAgICAgICAgICAgICAgICAkcGFnaW5hdGlvbi1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG5cbiRwYWdlci1kaXNhYmxlZC1jb2xvcjogICAgICAgICAgICAgICAgICRwYWdpbmF0aW9uLWRpc2FibGVkLWNvbG9yICFkZWZhdWx0O1xuXG5cbi8vPT0gSnVtYm90cm9uXG4vL1xuLy8jI1xuXG4kanVtYm90cm9uLXBhZGRpbmc6ICAgICAgICAgICAgICAzMHB4ICFkZWZhdWx0O1xuJGp1bWJvdHJvbi1jb2xvcjogICAgICAgICAgICAgICAgaW5oZXJpdCAhZGVmYXVsdDtcbiRqdW1ib3Ryb24tYmc6ICAgICAgICAgICAgICAgICAgICRncmF5LWxpZ2h0ZXIgIWRlZmF1bHQ7XG4kanVtYm90cm9uLWhlYWRpbmctY29sb3I6ICAgICAgICBpbmhlcml0ICFkZWZhdWx0O1xuJGp1bWJvdHJvbi1mb250LXNpemU6ICAgICAgICAgICAgY2VpbCgoJGZvbnQtc2l6ZS1iYXNlICogMS41KSkgIWRlZmF1bHQ7XG4kanVtYm90cm9uLWhlYWRpbmctZm9udC1zaXplOiAgICBjZWlsKCgkZm9udC1zaXplLWJhc2UgKiA0LjUpKSAhZGVmYXVsdDtcblxuXG4vLz09IEZvcm0gc3RhdGVzIGFuZCBhbGVydHNcbi8vXG4vLyMjIERlZmluZSBjb2xvcnMgZm9yIGZvcm0gZmVlZGJhY2sgc3RhdGVzIGFuZCwgYnkgZGVmYXVsdCwgYWxlcnRzLlxuXG4kc3RhdGUtc3VjY2Vzcy10ZXh0OiAgICAgICAgICAgICAjM2M3NjNkICFkZWZhdWx0O1xuJHN0YXRlLXN1Y2Nlc3MtYmc6ICAgICAgICAgICAgICAgI2RmZjBkOCAhZGVmYXVsdDtcbiRzdGF0ZS1zdWNjZXNzLWJvcmRlcjogICAgICAgICAgIGRhcmtlbihhZGp1c3QtaHVlKCRzdGF0ZS1zdWNjZXNzLWJnLCAtMTApLCA1JSkgIWRlZmF1bHQ7XG5cbiRzdGF0ZS1pbmZvLXRleHQ6ICAgICAgICAgICAgICAgICMzMTcwOGYgIWRlZmF1bHQ7XG4kc3RhdGUtaW5mby1iZzogICAgICAgICAgICAgICAgICAjZDllZGY3ICFkZWZhdWx0O1xuJHN0YXRlLWluZm8tYm9yZGVyOiAgICAgICAgICAgICAgZGFya2VuKGFkanVzdC1odWUoJHN0YXRlLWluZm8tYmcsIC0xMCksIDclKSAhZGVmYXVsdDtcblxuJHN0YXRlLXdhcm5pbmctdGV4dDogICAgICAgICAgICAgIzhhNmQzYiAhZGVmYXVsdDtcbiRzdGF0ZS13YXJuaW5nLWJnOiAgICAgICAgICAgICAgICNmY2Y4ZTMgIWRlZmF1bHQ7XG4kc3RhdGUtd2FybmluZy1ib3JkZXI6ICAgICAgICAgICBkYXJrZW4oYWRqdXN0LWh1ZSgkc3RhdGUtd2FybmluZy1iZywgLTEwKSwgNSUpICFkZWZhdWx0O1xuXG4kc3RhdGUtZGFuZ2VyLXRleHQ6ICAgICAgICAgICAgICAjYTk0NDQyICFkZWZhdWx0O1xuJHN0YXRlLWRhbmdlci1iZzogICAgICAgICAgICAgICAgI2YyZGVkZSAhZGVmYXVsdDtcbiRzdGF0ZS1kYW5nZXItYm9yZGVyOiAgICAgICAgICAgIGRhcmtlbihhZGp1c3QtaHVlKCRzdGF0ZS1kYW5nZXItYmcsIC0xMCksIDUlKSAhZGVmYXVsdDtcblxuXG4vLz09IFRvb2x0aXBzXG4vL1xuLy8jI1xuXG4vLyoqIFRvb2x0aXAgbWF4IHdpZHRoXG4kdG9vbHRpcC1tYXgtd2lkdGg6ICAgICAgICAgICAyMDBweCAhZGVmYXVsdDtcbi8vKiogVG9vbHRpcCB0ZXh0IGNvbG9yXG4kdG9vbHRpcC1jb2xvcjogICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuLy8qKiBUb29sdGlwIGJhY2tncm91bmQgY29sb3JcbiR0b29sdGlwLWJnOiAgICAgICAgICAgICAgICAgICMwMDAgIWRlZmF1bHQ7XG4kdG9vbHRpcC1vcGFjaXR5OiAgICAgICAgICAgICAuOSAhZGVmYXVsdDtcblxuLy8qKiBUb29sdGlwIGFycm93IHdpZHRoXG4kdG9vbHRpcC1hcnJvdy13aWR0aDogICAgICAgICA1cHggIWRlZmF1bHQ7XG4vLyoqIFRvb2x0aXAgYXJyb3cgY29sb3JcbiR0b29sdGlwLWFycm93LWNvbG9yOiAgICAgICAgICR0b29sdGlwLWJnICFkZWZhdWx0O1xuXG5cbi8vPT0gUG9wb3ZlcnNcbi8vXG4vLyMjXG5cbi8vKiogUG9wb3ZlciBib2R5IGJhY2tncm91bmQgY29sb3JcbiRwb3BvdmVyLWJnOiAgICAgICAgICAgICAgICAgICAgICAgICAgI2ZmZiAhZGVmYXVsdDtcbi8vKiogUG9wb3ZlciBtYXhpbXVtIHdpZHRoXG4kcG9wb3Zlci1tYXgtd2lkdGg6ICAgICAgICAgICAgICAgICAgIDI3NnB4ICFkZWZhdWx0O1xuLy8qKiBQb3BvdmVyIGJvcmRlciBjb2xvclxuJHBvcG92ZXItYm9yZGVyLWNvbG9yOiAgICAgICAgICAgICAgICByZ2JhKDAsMCwwLC4yKSAhZGVmYXVsdDtcbi8vKiogUG9wb3ZlciBmYWxsYmFjayBib3JkZXIgY29sb3JcbiRwb3BvdmVyLWZhbGxiYWNrLWJvcmRlci1jb2xvcjogICAgICAgI2NjYyAhZGVmYXVsdDtcblxuLy8qKiBQb3BvdmVyIHRpdGxlIGJhY2tncm91bmQgY29sb3JcbiRwb3BvdmVyLXRpdGxlLWJnOiAgICAgICAgICAgICAgICAgICAgZGFya2VuKCRwb3BvdmVyLWJnLCAzJSkgIWRlZmF1bHQ7XG5cbi8vKiogUG9wb3ZlciBhcnJvdyB3aWR0aFxuJHBvcG92ZXItYXJyb3ctd2lkdGg6ICAgICAgICAgICAgICAgICAxMHB4ICFkZWZhdWx0O1xuLy8qKiBQb3BvdmVyIGFycm93IGNvbG9yXG4kcG9wb3Zlci1hcnJvdy1jb2xvcjogICAgICAgICAgICAgICAgICRwb3BvdmVyLWJnICFkZWZhdWx0O1xuXG4vLyoqIFBvcG92ZXIgb3V0ZXIgYXJyb3cgd2lkdGhcbiRwb3BvdmVyLWFycm93LW91dGVyLXdpZHRoOiAgICAgICAgICAgKCRwb3BvdmVyLWFycm93LXdpZHRoICsgMSkgIWRlZmF1bHQ7XG4vLyoqIFBvcG92ZXIgb3V0ZXIgYXJyb3cgY29sb3JcbiRwb3BvdmVyLWFycm93LW91dGVyLWNvbG9yOiAgICAgICAgICAgZmFkZV9pbigkcG9wb3Zlci1ib3JkZXItY29sb3IsIDAuMDUpICFkZWZhdWx0O1xuLy8qKiBQb3BvdmVyIG91dGVyIGFycm93IGZhbGxiYWNrIGNvbG9yXG4kcG9wb3Zlci1hcnJvdy1vdXRlci1mYWxsYmFjay1jb2xvcjogIGRhcmtlbigkcG9wb3Zlci1mYWxsYmFjay1ib3JkZXItY29sb3IsIDIwJSkgIWRlZmF1bHQ7XG5cblxuLy89PSBMYWJlbHNcbi8vXG4vLyMjXG5cbi8vKiogRGVmYXVsdCBsYWJlbCBiYWNrZ3JvdW5kIGNvbG9yXG4kbGFiZWwtZGVmYXVsdC1iZzogICAgICAgICAgICAkZ3JheS1saWdodCAhZGVmYXVsdDtcbi8vKiogUHJpbWFyeSBsYWJlbCBiYWNrZ3JvdW5kIGNvbG9yXG4kbGFiZWwtcHJpbWFyeS1iZzogICAgICAgICAgICAkYnJhbmQtcHJpbWFyeSAhZGVmYXVsdDtcbi8vKiogU3VjY2VzcyBsYWJlbCBiYWNrZ3JvdW5kIGNvbG9yXG4kbGFiZWwtc3VjY2Vzcy1iZzogICAgICAgICAgICAkYnJhbmQtc3VjY2VzcyAhZGVmYXVsdDtcbi8vKiogSW5mbyBsYWJlbCBiYWNrZ3JvdW5kIGNvbG9yXG4kbGFiZWwtaW5mby1iZzogICAgICAgICAgICAgICAkYnJhbmQtaW5mbyAhZGVmYXVsdDtcbi8vKiogV2FybmluZyBsYWJlbCBiYWNrZ3JvdW5kIGNvbG9yXG4kbGFiZWwtd2FybmluZy1iZzogICAgICAgICAgICAkYnJhbmQtd2FybmluZyAhZGVmYXVsdDtcbi8vKiogRGFuZ2VyIGxhYmVsIGJhY2tncm91bmQgY29sb3JcbiRsYWJlbC1kYW5nZXItYmc6ICAgICAgICAgICAgICRicmFuZC1kYW5nZXIgIWRlZmF1bHQ7XG5cbi8vKiogRGVmYXVsdCBsYWJlbCB0ZXh0IGNvbG9yXG4kbGFiZWwtY29sb3I6ICAgICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuLy8qKiBEZWZhdWx0IHRleHQgY29sb3Igb2YgYSBsaW5rZWQgbGFiZWxcbiRsYWJlbC1saW5rLWhvdmVyLWNvbG9yOiAgICAgICNmZmYgIWRlZmF1bHQ7XG5cblxuLy89PSBNb2RhbHNcbi8vXG4vLyMjXG5cbi8vKiogUGFkZGluZyBhcHBsaWVkIHRvIHRoZSBtb2RhbCBib2R5XG4kbW9kYWwtaW5uZXItcGFkZGluZzogICAgICAgICAxNXB4ICFkZWZhdWx0O1xuXG4vLyoqIFBhZGRpbmcgYXBwbGllZCB0byB0aGUgbW9kYWwgdGl0bGVcbiRtb2RhbC10aXRsZS1wYWRkaW5nOiAgICAgICAgIDE1cHggIWRlZmF1bHQ7XG4vLyoqIE1vZGFsIHRpdGxlIGxpbmUtaGVpZ2h0XG4kbW9kYWwtdGl0bGUtbGluZS1oZWlnaHQ6ICAgICAkbGluZS1oZWlnaHQtYmFzZSAhZGVmYXVsdDtcblxuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIG1vZGFsIGNvbnRlbnQgYXJlYVxuJG1vZGFsLWNvbnRlbnQtYmc6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuLy8qKiBNb2RhbCBjb250ZW50IGJvcmRlciBjb2xvclxuJG1vZGFsLWNvbnRlbnQtYm9yZGVyLWNvbG9yOiAgICAgICAgICAgICAgICAgICByZ2JhKDAsMCwwLC4yKSAhZGVmYXVsdDtcbi8vKiogTW9kYWwgY29udGVudCBib3JkZXIgY29sb3IgKipmb3IgSUU4KipcbiRtb2RhbC1jb250ZW50LWZhbGxiYWNrLWJvcmRlci1jb2xvcjogICAgICAgICAgIzk5OSAhZGVmYXVsdDtcblxuLy8qKiBNb2RhbCBiYWNrZHJvcCBiYWNrZ3JvdW5kIGNvbG9yXG4kbW9kYWwtYmFja2Ryb3AtYmc6ICAgICAgICAgICAjMDAwICFkZWZhdWx0O1xuLy8qKiBNb2RhbCBiYWNrZHJvcCBvcGFjaXR5XG4kbW9kYWwtYmFja2Ryb3Atb3BhY2l0eTogICAgICAuNSAhZGVmYXVsdDtcbi8vKiogTW9kYWwgaGVhZGVyIGJvcmRlciBjb2xvclxuJG1vZGFsLWhlYWRlci1ib3JkZXItY29sb3I6ICAgI2U1ZTVlNSAhZGVmYXVsdDtcbi8vKiogTW9kYWwgZm9vdGVyIGJvcmRlciBjb2xvclxuJG1vZGFsLWZvb3Rlci1ib3JkZXItY29sb3I6ICAgJG1vZGFsLWhlYWRlci1ib3JkZXItY29sb3IgIWRlZmF1bHQ7XG5cbiRtb2RhbC1sZzogICAgICAgICAgICAgICAgICAgIDkwMHB4ICFkZWZhdWx0O1xuJG1vZGFsLW1kOiAgICAgICAgICAgICAgICAgICAgNjAwcHggIWRlZmF1bHQ7XG4kbW9kYWwtc206ICAgICAgICAgICAgICAgICAgICAzMDBweCAhZGVmYXVsdDtcblxuXG4vLz09IEFsZXJ0c1xuLy9cbi8vIyMgRGVmaW5lIGFsZXJ0IGNvbG9ycywgYm9yZGVyIHJhZGl1cywgYW5kIHBhZGRpbmcuXG5cbiRhbGVydC1wYWRkaW5nOiAgICAgICAgICAgICAgIDE1cHggIWRlZmF1bHQ7XG4kYWxlcnQtYm9yZGVyLXJhZGl1czogICAgICAgICAkYm9yZGVyLXJhZGl1cy1iYXNlICFkZWZhdWx0O1xuJGFsZXJ0LWxpbmstZm9udC13ZWlnaHQ6ICAgICAgYm9sZCAhZGVmYXVsdDtcblxuJGFsZXJ0LXN1Y2Nlc3MtYmc6ICAgICAgICAgICAgJHN0YXRlLXN1Y2Nlc3MtYmcgIWRlZmF1bHQ7XG4kYWxlcnQtc3VjY2Vzcy10ZXh0OiAgICAgICAgICAkc3RhdGUtc3VjY2Vzcy10ZXh0ICFkZWZhdWx0O1xuJGFsZXJ0LXN1Y2Nlc3MtYm9yZGVyOiAgICAgICAgJHN0YXRlLXN1Y2Nlc3MtYm9yZGVyICFkZWZhdWx0O1xuXG4kYWxlcnQtaW5mby1iZzogICAgICAgICAgICAgICAkc3RhdGUtaW5mby1iZyAhZGVmYXVsdDtcbiRhbGVydC1pbmZvLXRleHQ6ICAgICAgICAgICAgICRzdGF0ZS1pbmZvLXRleHQgIWRlZmF1bHQ7XG4kYWxlcnQtaW5mby1ib3JkZXI6ICAgICAgICAgICAkc3RhdGUtaW5mby1ib3JkZXIgIWRlZmF1bHQ7XG5cbiRhbGVydC13YXJuaW5nLWJnOiAgICAgICAgICAgICRzdGF0ZS13YXJuaW5nLWJnICFkZWZhdWx0O1xuJGFsZXJ0LXdhcm5pbmctdGV4dDogICAgICAgICAgJHN0YXRlLXdhcm5pbmctdGV4dCAhZGVmYXVsdDtcbiRhbGVydC13YXJuaW5nLWJvcmRlcjogICAgICAgICRzdGF0ZS13YXJuaW5nLWJvcmRlciAhZGVmYXVsdDtcblxuJGFsZXJ0LWRhbmdlci1iZzogICAgICAgICAgICAgJHN0YXRlLWRhbmdlci1iZyAhZGVmYXVsdDtcbiRhbGVydC1kYW5nZXItdGV4dDogICAgICAgICAgICRzdGF0ZS1kYW5nZXItdGV4dCAhZGVmYXVsdDtcbiRhbGVydC1kYW5nZXItYm9yZGVyOiAgICAgICAgICRzdGF0ZS1kYW5nZXItYm9yZGVyICFkZWZhdWx0O1xuXG5cbi8vPT0gUHJvZ3Jlc3MgYmFyc1xuLy9cbi8vIyNcblxuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSB3aG9sZSBwcm9ncmVzcyBjb21wb25lbnRcbiRwcm9ncmVzcy1iZzogICAgICAgICAgICAgICAgICNmNWY1ZjUgIWRlZmF1bHQ7XG4vLyoqIFByb2dyZXNzIGJhciB0ZXh0IGNvbG9yXG4kcHJvZ3Jlc3MtYmFyLWNvbG9yOiAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuLy8qKiBWYXJpYWJsZSBmb3Igc2V0dGluZyByb3VuZGVkIGNvcm5lcnMgb24gcHJvZ3Jlc3MgYmFyLlxuJHByb2dyZXNzLWJvcmRlci1yYWRpdXM6ICAgICAgJGJvcmRlci1yYWRpdXMtYmFzZSAhZGVmYXVsdDtcblxuLy8qKiBEZWZhdWx0IHByb2dyZXNzIGJhciBjb2xvclxuJHByb2dyZXNzLWJhci1iZzogICAgICAgICAgICAgJGJyYW5kLXByaW1hcnkgIWRlZmF1bHQ7XG4vLyoqIFN1Y2Nlc3MgcHJvZ3Jlc3MgYmFyIGNvbG9yXG4kcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3MtYmc6ICAgICAkYnJhbmQtc3VjY2VzcyAhZGVmYXVsdDtcbi8vKiogV2FybmluZyBwcm9ncmVzcyBiYXIgY29sb3JcbiRwcm9ncmVzcy1iYXItd2FybmluZy1iZzogICAgICRicmFuZC13YXJuaW5nICFkZWZhdWx0O1xuLy8qKiBEYW5nZXIgcHJvZ3Jlc3MgYmFyIGNvbG9yXG4kcHJvZ3Jlc3MtYmFyLWRhbmdlci1iZzogICAgICAkYnJhbmQtZGFuZ2VyICFkZWZhdWx0O1xuLy8qKiBJbmZvIHByb2dyZXNzIGJhciBjb2xvclxuJHByb2dyZXNzLWJhci1pbmZvLWJnOiAgICAgICAgJGJyYW5kLWluZm8gIWRlZmF1bHQ7XG5cblxuLy89PSBMaXN0IGdyb3VwXG4vL1xuLy8jI1xuXG4vLyoqIEJhY2tncm91bmQgY29sb3Igb24gYC5saXN0LWdyb3VwLWl0ZW1gXG4kbGlzdC1ncm91cC1iZzogICAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4vLyoqIGAubGlzdC1ncm91cC1pdGVtYCBib3JkZXIgY29sb3JcbiRsaXN0LWdyb3VwLWJvcmRlcjogICAgICAgICAgICAgI2RkZCAhZGVmYXVsdDtcbi8vKiogTGlzdCBncm91cCBib3JkZXIgcmFkaXVzXG4kbGlzdC1ncm91cC1ib3JkZXItcmFkaXVzOiAgICAgICRib3JkZXItcmFkaXVzLWJhc2UgIWRlZmF1bHQ7XG5cbi8vKiogQmFja2dyb3VuZCBjb2xvciBvZiBzaW5nbGUgbGlzdCBpdGVtcyBvbiBob3ZlclxuJGxpc3QtZ3JvdXAtaG92ZXItYmc6ICAgICAgICAgICAjZjVmNWY1ICFkZWZhdWx0O1xuLy8qKiBUZXh0IGNvbG9yIG9mIGFjdGl2ZSBsaXN0IGl0ZW1zXG4kbGlzdC1ncm91cC1hY3RpdmUtY29sb3I6ICAgICAgICRjb21wb25lbnQtYWN0aXZlLWNvbG9yICFkZWZhdWx0O1xuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIGFjdGl2ZSBsaXN0IGl0ZW1zXG4kbGlzdC1ncm91cC1hY3RpdmUtYmc6ICAgICAgICAgICRjb21wb25lbnQtYWN0aXZlLWJnICFkZWZhdWx0O1xuLy8qKiBCb3JkZXIgY29sb3Igb2YgYWN0aXZlIGxpc3QgZWxlbWVudHNcbiRsaXN0LWdyb3VwLWFjdGl2ZS1ib3JkZXI6ICAgICAgJGxpc3QtZ3JvdXAtYWN0aXZlLWJnICFkZWZhdWx0O1xuLy8qKiBUZXh0IGNvbG9yIGZvciBjb250ZW50IHdpdGhpbiBhY3RpdmUgbGlzdCBpdGVtc1xuJGxpc3QtZ3JvdXAtYWN0aXZlLXRleHQtY29sb3I6ICBsaWdodGVuKCRsaXN0LWdyb3VwLWFjdGl2ZS1iZywgNDAlKSAhZGVmYXVsdDtcblxuLy8qKiBUZXh0IGNvbG9yIG9mIGRpc2FibGVkIGxpc3QgaXRlbXNcbiRsaXN0LWdyb3VwLWRpc2FibGVkLWNvbG9yOiAgICAgICRncmF5LWxpZ2h0ICFkZWZhdWx0O1xuLy8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIGRpc2FibGVkIGxpc3QgaXRlbXNcbiRsaXN0LWdyb3VwLWRpc2FibGVkLWJnOiAgICAgICAgICRncmF5LWxpZ2h0ZXIgIWRlZmF1bHQ7XG4vLyoqIFRleHQgY29sb3IgZm9yIGNvbnRlbnQgd2l0aGluIGRpc2FibGVkIGxpc3QgaXRlbXNcbiRsaXN0LWdyb3VwLWRpc2FibGVkLXRleHQtY29sb3I6ICRsaXN0LWdyb3VwLWRpc2FibGVkLWNvbG9yICFkZWZhdWx0O1xuXG4kbGlzdC1ncm91cC1saW5rLWNvbG9yOiAgICAgICAgICM1NTUgIWRlZmF1bHQ7XG4kbGlzdC1ncm91cC1saW5rLWhvdmVyLWNvbG9yOiAgICRsaXN0LWdyb3VwLWxpbmstY29sb3IgIWRlZmF1bHQ7XG4kbGlzdC1ncm91cC1saW5rLWhlYWRpbmctY29sb3I6ICMzMzMgIWRlZmF1bHQ7XG5cblxuLy89PSBQYW5lbHNcbi8vXG4vLyMjXG5cbiRwYW5lbC1iZzogICAgICAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kcGFuZWwtYm9keS1wYWRkaW5nOiAgICAgICAgICAxNXB4ICFkZWZhdWx0O1xuJHBhbmVsLWhlYWRpbmctcGFkZGluZzogICAgICAgMTBweCAxNXB4ICFkZWZhdWx0O1xuJHBhbmVsLWZvb3Rlci1wYWRkaW5nOiAgICAgICAgJHBhbmVsLWhlYWRpbmctcGFkZGluZyAhZGVmYXVsdDtcbiRwYW5lbC1ib3JkZXItcmFkaXVzOiAgICAgICAgICRib3JkZXItcmFkaXVzLWJhc2UgIWRlZmF1bHQ7XG5cbi8vKiogQm9yZGVyIGNvbG9yIGZvciBlbGVtZW50cyB3aXRoaW4gcGFuZWxzXG4kcGFuZWwtaW5uZXItYm9yZGVyOiAgICAgICAgICAjZGRkICFkZWZhdWx0O1xuJHBhbmVsLWZvb3Rlci1iZzogICAgICAgICAgICAgI2Y1ZjVmNSAhZGVmYXVsdDtcblxuJHBhbmVsLWRlZmF1bHQtdGV4dDogICAgICAgICAgJGdyYXktZGFyayAhZGVmYXVsdDtcbiRwYW5lbC1kZWZhdWx0LWJvcmRlcjogICAgICAgICNkZGQgIWRlZmF1bHQ7XG4kcGFuZWwtZGVmYXVsdC1oZWFkaW5nLWJnOiAgICAjZjVmNWY1ICFkZWZhdWx0O1xuXG4kcGFuZWwtcHJpbWFyeS10ZXh0OiAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuJHBhbmVsLXByaW1hcnktYm9yZGVyOiAgICAgICAgJGJyYW5kLXByaW1hcnkgIWRlZmF1bHQ7XG4kcGFuZWwtcHJpbWFyeS1oZWFkaW5nLWJnOiAgICAkYnJhbmQtcHJpbWFyeSAhZGVmYXVsdDtcblxuJHBhbmVsLXN1Y2Nlc3MtdGV4dDogICAgICAgICAgJHN0YXRlLXN1Y2Nlc3MtdGV4dCAhZGVmYXVsdDtcbiRwYW5lbC1zdWNjZXNzLWJvcmRlcjogICAgICAgICRzdGF0ZS1zdWNjZXNzLWJvcmRlciAhZGVmYXVsdDtcbiRwYW5lbC1zdWNjZXNzLWhlYWRpbmctYmc6ICAgICRzdGF0ZS1zdWNjZXNzLWJnICFkZWZhdWx0O1xuXG4kcGFuZWwtaW5mby10ZXh0OiAgICAgICAgICAgICAkc3RhdGUtaW5mby10ZXh0ICFkZWZhdWx0O1xuJHBhbmVsLWluZm8tYm9yZGVyOiAgICAgICAgICAgJHN0YXRlLWluZm8tYm9yZGVyICFkZWZhdWx0O1xuJHBhbmVsLWluZm8taGVhZGluZy1iZzogICAgICAgJHN0YXRlLWluZm8tYmcgIWRlZmF1bHQ7XG5cbiRwYW5lbC13YXJuaW5nLXRleHQ6ICAgICAgICAgICRzdGF0ZS13YXJuaW5nLXRleHQgIWRlZmF1bHQ7XG4kcGFuZWwtd2FybmluZy1ib3JkZXI6ICAgICAgICAkc3RhdGUtd2FybmluZy1ib3JkZXIgIWRlZmF1bHQ7XG4kcGFuZWwtd2FybmluZy1oZWFkaW5nLWJnOiAgICAkc3RhdGUtd2FybmluZy1iZyAhZGVmYXVsdDtcblxuJHBhbmVsLWRhbmdlci10ZXh0OiAgICAgICAgICAgJHN0YXRlLWRhbmdlci10ZXh0ICFkZWZhdWx0O1xuJHBhbmVsLWRhbmdlci1ib3JkZXI6ICAgICAgICAgJHN0YXRlLWRhbmdlci1ib3JkZXIgIWRlZmF1bHQ7XG4kcGFuZWwtZGFuZ2VyLWhlYWRpbmctYmc6ICAgICAkc3RhdGUtZGFuZ2VyLWJnICFkZWZhdWx0O1xuXG5cbi8vPT0gVGh1bWJuYWlsc1xuLy9cbi8vIyNcblxuLy8qKiBQYWRkaW5nIGFyb3VuZCB0aGUgdGh1bWJuYWlsIGltYWdlXG4kdGh1bWJuYWlsLXBhZGRpbmc6ICAgICAgICAgICA0cHggIWRlZmF1bHQ7XG4vLyoqIFRodW1ibmFpbCBiYWNrZ3JvdW5kIGNvbG9yXG4kdGh1bWJuYWlsLWJnOiAgICAgICAgICAgICAgICAkYm9keS1iZyAhZGVmYXVsdDtcbi8vKiogVGh1bWJuYWlsIGJvcmRlciBjb2xvclxuJHRodW1ibmFpbC1ib3JkZXI6ICAgICAgICAgICAgI2RkZCAhZGVmYXVsdDtcbi8vKiogVGh1bWJuYWlsIGJvcmRlciByYWRpdXNcbiR0aHVtYm5haWwtYm9yZGVyLXJhZGl1czogICAgICRib3JkZXItcmFkaXVzLWJhc2UgIWRlZmF1bHQ7XG5cbi8vKiogQ3VzdG9tIHRleHQgY29sb3IgZm9yIHRodW1ibmFpbCBjYXB0aW9uc1xuJHRodW1ibmFpbC1jYXB0aW9uLWNvbG9yOiAgICAgJHRleHQtY29sb3IgIWRlZmF1bHQ7XG4vLyoqIFBhZGRpbmcgYXJvdW5kIHRoZSB0aHVtYm5haWwgY2FwdGlvblxuJHRodW1ibmFpbC1jYXB0aW9uLXBhZGRpbmc6ICAgOXB4ICFkZWZhdWx0O1xuXG5cbi8vPT0gV2VsbHNcbi8vXG4vLyMjXG5cbiR3ZWxsLWJnOiAgICAgICAgICAgICAgICAgICAgICNmNWY1ZjUgIWRlZmF1bHQ7XG4kd2VsbC1ib3JkZXI6ICAgICAgICAgICAgICAgICBkYXJrZW4oJHdlbGwtYmcsIDclKSAhZGVmYXVsdDtcblxuXG4vLz09IEJhZGdlc1xuLy9cbi8vIyNcblxuJGJhZGdlLWNvbG9yOiAgICAgICAgICAgICAgICAgI2ZmZiAhZGVmYXVsdDtcbi8vKiogTGlua2VkIGJhZGdlIHRleHQgY29sb3Igb24gaG92ZXJcbiRiYWRnZS1saW5rLWhvdmVyLWNvbG9yOiAgICAgICNmZmYgIWRlZmF1bHQ7XG4kYmFkZ2UtYmc6ICAgICAgICAgICAgICAgICAgICAkZ3JheS1saWdodCAhZGVmYXVsdDtcblxuLy8qKiBCYWRnZSB0ZXh0IGNvbG9yIGluIGFjdGl2ZSBuYXYgbGlua1xuJGJhZGdlLWFjdGl2ZS1jb2xvcjogICAgICAgICAgJGxpbmstY29sb3IgIWRlZmF1bHQ7XG4vLyoqIEJhZGdlIGJhY2tncm91bmQgY29sb3IgaW4gYWN0aXZlIG5hdiBsaW5rXG4kYmFkZ2UtYWN0aXZlLWJnOiAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuXG4kYmFkZ2UtZm9udC13ZWlnaHQ6ICAgICAgICAgICBib2xkICFkZWZhdWx0O1xuJGJhZGdlLWxpbmUtaGVpZ2h0OiAgICAgICAgICAgMSAhZGVmYXVsdDtcbiRiYWRnZS1ib3JkZXItcmFkaXVzOiAgICAgICAgIDEwcHggIWRlZmF1bHQ7XG5cblxuLy89PSBCcmVhZGNydW1ic1xuLy9cbi8vIyNcblxuJGJyZWFkY3J1bWItcGFkZGluZy12ZXJ0aWNhbDogICA4cHggIWRlZmF1bHQ7XG4kYnJlYWRjcnVtYi1wYWRkaW5nLWhvcml6b250YWw6IDE1cHggIWRlZmF1bHQ7XG4vLyoqIEJyZWFkY3J1bWIgYmFja2dyb3VuZCBjb2xvclxuJGJyZWFkY3J1bWItYmc6ICAgICAgICAgICAgICAgICAjZjVmNWY1ICFkZWZhdWx0O1xuLy8qKiBCcmVhZGNydW1iIHRleHQgY29sb3JcbiRicmVhZGNydW1iLWNvbG9yOiAgICAgICAgICAgICAgI2NjYyAhZGVmYXVsdDtcbi8vKiogVGV4dCBjb2xvciBvZiBjdXJyZW50IHBhZ2UgaW4gdGhlIGJyZWFkY3J1bWJcbiRicmVhZGNydW1iLWFjdGl2ZS1jb2xvcjogICAgICAgJGdyYXktbGlnaHQgIWRlZmF1bHQ7XG4vLyoqIFRleHR1YWwgc2VwYXJhdG9yIGZvciBiZXR3ZWVuIGJyZWFkY3J1bWIgZWxlbWVudHNcbiRicmVhZGNydW1iLXNlcGFyYXRvcjogICAgICAgICAgXCIvXCIgIWRlZmF1bHQ7XG5cblxuLy89PSBDYXJvdXNlbFxuLy9cbi8vIyNcblxuJGNhcm91c2VsLXRleHQtc2hhZG93OiAgICAgICAgICAgICAgICAgICAgICAgIDAgMXB4IDJweCByZ2JhKDAsMCwwLC42KSAhZGVmYXVsdDtcblxuJGNhcm91c2VsLWNvbnRyb2wtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kY2Fyb3VzZWwtY29udHJvbC13aWR0aDogICAgICAgICAgICAgICAgICAgICAgMTUlICFkZWZhdWx0O1xuJGNhcm91c2VsLWNvbnRyb2wtb3BhY2l0eTogICAgICAgICAgICAgICAgICAgIC41ICFkZWZhdWx0O1xuJGNhcm91c2VsLWNvbnRyb2wtZm9udC1zaXplOiAgICAgICAgICAgICAgICAgIDIwcHggIWRlZmF1bHQ7XG5cbiRjYXJvdXNlbC1pbmRpY2F0b3ItYWN0aXZlLWJnOiAgICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuJGNhcm91c2VsLWluZGljYXRvci1ib3JkZXItY29sb3I6ICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG5cbiRjYXJvdXNlbC1jYXB0aW9uLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgICAjZmZmICFkZWZhdWx0O1xuXG5cbi8vPT0gQ2xvc2Vcbi8vXG4vLyMjXG5cbiRjbG9zZS1mb250LXdlaWdodDogICAgICAgICAgIGJvbGQgIWRlZmF1bHQ7XG4kY2xvc2UtY29sb3I6ICAgICAgICAgICAgICAgICAjMDAwICFkZWZhdWx0O1xuJGNsb3NlLXRleHQtc2hhZG93OiAgICAgICAgICAgMCAxcHggMCAjZmZmICFkZWZhdWx0O1xuXG5cbi8vPT0gQ29kZVxuLy9cbi8vIyNcblxuJGNvZGUtY29sb3I6ICAgICAgICAgICAgICAgICAgI2M3MjU0ZSAhZGVmYXVsdDtcbiRjb2RlLWJnOiAgICAgICAgICAgICAgICAgICAgICNmOWYyZjQgIWRlZmF1bHQ7XG5cbiRrYmQtY29sb3I6ICAgICAgICAgICAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4ka2JkLWJnOiAgICAgICAgICAgICAgICAgICAgICAjMzMzICFkZWZhdWx0O1xuXG4kcHJlLWJnOiAgICAgICAgICAgICAgICAgICAgICAjZjVmNWY1ICFkZWZhdWx0O1xuJHByZS1jb2xvcjogICAgICAgICAgICAgICAgICAgJGdyYXktZGFyayAhZGVmYXVsdDtcbiRwcmUtYm9yZGVyLWNvbG9yOiAgICAgICAgICAgICNjY2MgIWRlZmF1bHQ7XG4kcHJlLXNjcm9sbGFibGUtbWF4LWhlaWdodDogICAzNDBweCAhZGVmYXVsdDtcblxuXG4vLz09IFR5cGVcbi8vXG4vLyMjXG5cbi8vKiogSG9yaXpvbnRhbCBvZmZzZXQgZm9yIGZvcm1zIGFuZCBsaXN0cy5cbiRjb21wb25lbnQtb2Zmc2V0LWhvcml6b250YWw6IDE4MHB4ICFkZWZhdWx0O1xuLy8qKiBUZXh0IG11dGVkIGNvbG9yXG4kdGV4dC1tdXRlZDogICAgICAgICAgICAgICAgICAkZ3JheS1saWdodCAhZGVmYXVsdDtcbi8vKiogQWJicmV2aWF0aW9ucyBhbmQgYWNyb255bXMgYm9yZGVyIGNvbG9yXG4kYWJici1ib3JkZXItY29sb3I6ICAgICAgICAgICAkZ3JheS1saWdodCAhZGVmYXVsdDtcbi8vKiogSGVhZGluZ3Mgc21hbGwgY29sb3JcbiRoZWFkaW5ncy1zbWFsbC1jb2xvcjogICAgICAgICRncmF5LWxpZ2h0ICFkZWZhdWx0O1xuLy8qKiBCbG9ja3F1b3RlIHNtYWxsIGNvbG9yXG4kYmxvY2txdW90ZS1zbWFsbC1jb2xvcjogICAgICAkZ3JheS1saWdodCAhZGVmYXVsdDtcbi8vKiogQmxvY2txdW90ZSBmb250IHNpemVcbiRibG9ja3F1b3RlLWZvbnQtc2l6ZTogICAgICAgICgkZm9udC1zaXplLWJhc2UgKiAxLjI1KSAhZGVmYXVsdDtcbi8vKiogQmxvY2txdW90ZSBib3JkZXIgY29sb3JcbiRibG9ja3F1b3RlLWJvcmRlci1jb2xvcjogICAgICRncmF5LWxpZ2h0ZXIgIWRlZmF1bHQ7XG4vLyoqIFBhZ2UgaGVhZGVyIGJvcmRlciBjb2xvclxuJHBhZ2UtaGVhZGVyLWJvcmRlci1jb2xvcjogICAgJGdyYXktbGlnaHRlciAhZGVmYXVsdDtcbi8vKiogV2lkdGggb2YgaG9yaXpvbnRhbCBkZXNjcmlwdGlvbiBsaXN0IHRpdGxlc1xuJGRsLWhvcml6b250YWwtb2Zmc2V0OiAgICAgICAgJGNvbXBvbmVudC1vZmZzZXQtaG9yaXpvbnRhbCAhZGVmYXVsdDtcbi8vKiogUG9pbnQgYXQgd2hpY2ggLmRsLWhvcml6b250YWwgYmVjb21lcyBob3Jpem9udGFsXG4kZGwtaG9yaXpvbnRhbC1icmVha3BvaW50OiAgICAkZ3JpZC1mbG9hdC1icmVha3BvaW50ICFkZWZhdWx0O1xuLy8qKiBIb3Jpem9udGFsIGxpbmUgY29sb3IuXG4kaHItYm9yZGVyOiAgICAgICAgICAgICAgICAgICAkZ3JheS1saWdodGVyICFkZWZhdWx0O1xuIiwiLyohIG5vcm1hbGl6ZS5jc3MgdjMuMC4zIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vL1xuLy8gMS4gU2V0IGRlZmF1bHQgZm9udCBmYW1pbHkgdG8gc2Fucy1zZXJpZi5cbi8vIDIuIFByZXZlbnQgaU9TIGFuZCBJRSB0ZXh0IHNpemUgYWRqdXN0IGFmdGVyIGRldmljZSBvcmllbnRhdGlvbiBjaGFuZ2UsXG4vLyAgICB3aXRob3V0IGRpc2FibGluZyB1c2VyIHpvb20uXG4vL1xuXG5odG1sIHtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IC8vIDFcbiAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8vIDJcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvLyAyXG59XG5cbi8vXG4vLyBSZW1vdmUgZGVmYXVsdCBtYXJnaW4uXG4vL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vLyBIVE1MNSBkaXNwbGF5IGRlZmluaXRpb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vL1xuLy8gQ29ycmVjdCBgYmxvY2tgIGRpc3BsYXkgbm90IGRlZmluZWQgZm9yIGFueSBIVE1MNSBlbGVtZW50IGluIElFIDgvOS5cbi8vIENvcnJlY3QgYGJsb2NrYCBkaXNwbGF5IG5vdCBkZWZpbmVkIGZvciBgZGV0YWlsc2Agb3IgYHN1bW1hcnlgIGluIElFIDEwLzExXG4vLyBhbmQgRmlyZWZveC5cbi8vIENvcnJlY3QgYGJsb2NrYCBkaXNwbGF5IG5vdCBkZWZpbmVkIGZvciBgbWFpbmAgaW4gSUUgMTEuXG4vL1xuXG5hcnRpY2xlLFxuYXNpZGUsXG5kZXRhaWxzLFxuZmlnY2FwdGlvbixcbmZpZ3VyZSxcbmZvb3RlcixcbmhlYWRlcixcbmhncm91cCxcbm1haW4sXG5tZW51LFxubmF2LFxuc2VjdGlvbixcbnN1bW1hcnkge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLy9cbi8vIDEuIENvcnJlY3QgYGlubGluZS1ibG9ja2AgZGlzcGxheSBub3QgZGVmaW5lZCBpbiBJRSA4LzkuXG4vLyAyLiBOb3JtYWxpemUgdmVydGljYWwgYWxpZ25tZW50IG9mIGBwcm9ncmVzc2AgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4vL1xuXG5hdWRpbyxcbmNhbnZhcyxcbnByb2dyZXNzLFxudmlkZW8ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IC8vIDFcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvLyAyXG59XG5cbi8vXG4vLyBQcmV2ZW50IG1vZGVybiBicm93c2VycyBmcm9tIGRpc3BsYXlpbmcgYGF1ZGlvYCB3aXRob3V0IGNvbnRyb2xzLlxuLy8gUmVtb3ZlIGV4Y2VzcyBoZWlnaHQgaW4gaU9TIDUgZGV2aWNlcy5cbi8vXG5cbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGhlaWdodDogMDtcbn1cblxuLy9cbi8vIEFkZHJlc3MgYFtoaWRkZW5dYCBzdHlsaW5nIG5vdCBwcmVzZW50IGluIElFIDgvOS8xMC5cbi8vIEhpZGUgdGhlIGB0ZW1wbGF0ZWAgZWxlbWVudCBpbiBJRSA4LzkvMTAvMTEsIFNhZmFyaSwgYW5kIEZpcmVmb3ggPCAyMi5cbi8vXG5cbltoaWRkZW5dLFxudGVtcGxhdGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vLyBMaW5rc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy9cbi8vIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuLy9cblxuYSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4vL1xuLy8gSW1wcm92ZSByZWFkYWJpbGl0eSBvZiBmb2N1c2VkIGVsZW1lbnRzIHdoZW4gdGhleSBhcmUgYWxzbyBpbiBhblxuLy8gYWN0aXZlL2hvdmVyIHN0YXRlLlxuLy9cblxuYTphY3RpdmUsXG5hOmhvdmVyIHtcbiAgb3V0bGluZTogMDtcbn1cblxuLy8gVGV4dC1sZXZlbCBzZW1hbnRpY3Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vXG4vLyBBZGRyZXNzIHN0eWxpbmcgbm90IHByZXNlbnQgaW4gSUUgOC85LzEwLzExLCBTYWZhcmksIGFuZCBDaHJvbWUuXG4vL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQ7XG59XG5cbi8vXG4vLyBBZGRyZXNzIHN0eWxlIHNldCB0byBgYm9sZGVyYCBpbiBGaXJlZm94IDQrLCBTYWZhcmksIGFuZCBDaHJvbWUuXG4vL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi8vXG4vLyBBZGRyZXNzIHN0eWxpbmcgbm90IHByZXNlbnQgaW4gU2FmYXJpIGFuZCBDaHJvbWUuXG4vL1xuXG5kZm4ge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi8vXG4vLyBBZGRyZXNzIHZhcmlhYmxlIGBoMWAgZm9udC1zaXplIGFuZCBtYXJnaW4gd2l0aGluIGBzZWN0aW9uYCBhbmQgYGFydGljbGVgXG4vLyBjb250ZXh0cyBpbiBGaXJlZm94IDQrLCBTYWZhcmksIGFuZCBDaHJvbWUuXG4vL1xuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBtYXJnaW46IDAuNjdlbSAwO1xufVxuXG4vL1xuLy8gQWRkcmVzcyBzdHlsaW5nIG5vdCBwcmVzZW50IGluIElFIDgvOS5cbi8vXG5cbm1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmYwO1xuICBjb2xvcjogIzAwMDtcbn1cblxuLy9cbi8vIEFkZHJlc3MgaW5jb25zaXN0ZW50IGFuZCB2YXJpYWJsZSBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuLy9cblxuc21hbGwge1xuICBmb250LXNpemU6IDgwJTtcbn1cblxuLy9cbi8vIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGFmZmVjdGluZyBgbGluZS1oZWlnaHRgIGluIGFsbCBicm93c2Vycy5cbi8vXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1cCB7XG4gIHRvcDogLTAuNWVtO1xufVxuXG5zdWIge1xuICBib3R0b206IC0wLjI1ZW07XG59XG5cbi8vIEVtYmVkZGVkIGNvbnRlbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vXG4vLyBSZW1vdmUgYm9yZGVyIHdoZW4gaW5zaWRlIGBhYCBlbGVtZW50IGluIElFIDgvOS8xMC5cbi8vXG5cbmltZyB7XG4gIGJvcmRlcjogMDtcbn1cblxuLy9cbi8vIENvcnJlY3Qgb3ZlcmZsb3cgbm90IGhpZGRlbiBpbiBJRSA5LzEwLzExLlxuLy9cblxuc3ZnOm5vdCg6cm9vdCkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vLyBHcm91cGluZyBjb250ZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vL1xuLy8gQWRkcmVzcyBtYXJnaW4gbm90IHByZXNlbnQgaW4gSUUgOC85IGFuZCBTYWZhcmkuXG4vL1xuXG5maWd1cmUge1xuICBtYXJnaW46IDFlbSA0MHB4O1xufVxuXG4vL1xuLy8gQWRkcmVzcyBkaWZmZXJlbmNlcyBiZXR3ZWVuIEZpcmVmb3ggYW5kIG90aGVyIGJyb3dzZXJzLlxuLy9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgaGVpZ2h0OiAwO1xufVxuXG4vL1xuLy8gQ29udGFpbiBvdmVyZmxvdyBpbiBhbGwgYnJvd3NlcnMuXG4vL1xuXG5wcmUge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLy9cbi8vIEFkZHJlc3Mgb2RkIGBlbWAtdW5pdCBmb250IHNpemUgcmVuZGVyaW5nIGluIGFsbCBicm93c2Vycy5cbi8vXG5cbmNvZGUsXG5rYmQsXG5wcmUsXG5zYW1wIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlO1xuICBmb250LXNpemU6IDFlbTtcbn1cblxuLy8gRm9ybXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vXG4vLyBLbm93biBsaW1pdGF0aW9uOiBieSBkZWZhdWx0LCBDaHJvbWUgYW5kIFNhZmFyaSBvbiBPUyBYIGFsbG93IHZlcnkgbGltaXRlZFxuLy8gc3R5bGluZyBvZiBgc2VsZWN0YCwgdW5sZXNzIGEgYGJvcmRlcmAgcHJvcGVydHkgaXMgc2V0LlxuLy9cblxuLy9cbi8vIDEuIENvcnJlY3QgY29sb3Igbm90IGJlaW5nIGluaGVyaXRlZC5cbi8vICAgIEtub3duIGlzc3VlOiBhZmZlY3RzIGNvbG9yIG9mIGRpc2FibGVkIGVsZW1lbnRzLlxuLy8gMi4gQ29ycmVjdCBmb250IHByb3BlcnRpZXMgbm90IGJlaW5nIGluaGVyaXRlZC5cbi8vIDMuIEFkZHJlc3MgbWFyZ2lucyBzZXQgZGlmZmVyZW50bHkgaW4gRmlyZWZveCA0KywgU2FmYXJpLCBhbmQgQ2hyb21lLlxuLy9cblxuYnV0dG9uLFxuaW5wdXQsXG5vcHRncm91cCxcbnNlbGVjdCxcbnRleHRhcmVhIHtcbiAgY29sb3I6IGluaGVyaXQ7IC8vIDFcbiAgZm9udDogaW5oZXJpdDsgLy8gMlxuICBtYXJnaW46IDA7IC8vIDNcbn1cblxuLy9cbi8vIEFkZHJlc3MgYG92ZXJmbG93YCBzZXQgdG8gYGhpZGRlbmAgaW4gSUUgOC85LzEwLzExLlxuLy9cblxuYnV0dG9uIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi8vXG4vLyBBZGRyZXNzIGluY29uc2lzdGVudCBgdGV4dC10cmFuc2Zvcm1gIGluaGVyaXRhbmNlIGZvciBgYnV0dG9uYCBhbmQgYHNlbGVjdGAuXG4vLyBBbGwgb3RoZXIgZm9ybSBjb250cm9sIGVsZW1lbnRzIGRvIG5vdCBpbmhlcml0IGB0ZXh0LXRyYW5zZm9ybWAgdmFsdWVzLlxuLy8gQ29ycmVjdCBgYnV0dG9uYCBzdHlsZSBpbmhlcml0YW5jZSBpbiBGaXJlZm94LCBJRSA4LzkvMTAvMTEsIGFuZCBPcGVyYS5cbi8vIENvcnJlY3QgYHNlbGVjdGAgc3R5bGUgaW5oZXJpdGFuY2UgaW4gRmlyZWZveC5cbi8vXG5cbmJ1dHRvbixcbnNlbGVjdCB7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vL1xuLy8gMS4gQXZvaWQgdGhlIFdlYktpdCBidWcgaW4gQW5kcm9pZCA0LjAuKiB3aGVyZSAoMikgZGVzdHJveXMgbmF0aXZlIGBhdWRpb2Bcbi8vICAgIGFuZCBgdmlkZW9gIGNvbnRyb2xzLlxuLy8gMi4gQ29ycmVjdCBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIGBpbnB1dGAgdHlwZXMgaW4gaU9TLlxuLy8gMy4gSW1wcm92ZSB1c2FiaWxpdHkgYW5kIGNvbnNpc3RlbmN5IG9mIGN1cnNvciBzdHlsZSBiZXR3ZWVuIGltYWdlLXR5cGVcbi8vICAgIGBpbnB1dGAgYW5kIG90aGVycy5cbi8vXG5cbmJ1dHRvbixcbmh0bWwgaW5wdXRbdHlwZT1cImJ1dHRvblwiXSwgLy8gMVxuaW5wdXRbdHlwZT1cInJlc2V0XCJdLFxuaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvLyAyXG4gIGN1cnNvcjogcG9pbnRlcjsgLy8gM1xufVxuXG4vL1xuLy8gUmUtc2V0IGRlZmF1bHQgY3Vyc29yIGZvciBkaXNhYmxlZCBlbGVtZW50cy5cbi8vXG5cbmJ1dHRvbltkaXNhYmxlZF0sXG5odG1sIGlucHV0W2Rpc2FibGVkXSB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLy9cbi8vIFJlbW92ZSBpbm5lciBwYWRkaW5nIGFuZCBib3JkZXIgaW4gRmlyZWZveCA0Ky5cbi8vXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcbmlucHV0OjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vL1xuLy8gQWRkcmVzcyBGaXJlZm94IDQrIHNldHRpbmcgYGxpbmUtaGVpZ2h0YCBvbiBgaW5wdXRgIHVzaW5nIGAhaW1wb3J0YW50YCBpblxuLy8gdGhlIFVBIHN0eWxlc2hlZXQuXG4vL1xuXG5pbnB1dCB7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG59XG5cbi8vXG4vLyBJdCdzIHJlY29tbWVuZGVkIHRoYXQgeW91IGRvbid0IGF0dGVtcHQgdG8gc3R5bGUgdGhlc2UgZWxlbWVudHMuXG4vLyBGaXJlZm94J3MgaW1wbGVtZW50YXRpb24gZG9lc24ndCByZXNwZWN0IGJveC1zaXppbmcsIHBhZGRpbmcsIG9yIHdpZHRoLlxuLy9cbi8vIDEuIEFkZHJlc3MgYm94IHNpemluZyBzZXQgdG8gYGNvbnRlbnQtYm94YCBpbiBJRSA4LzkvMTAuXG4vLyAyLiBSZW1vdmUgZXhjZXNzIHBhZGRpbmcgaW4gSUUgOC85LzEwLlxuLy9cblxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLFxuaW5wdXRbdHlwZT1cInJhZGlvXCJdIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLy8gMVxuICBwYWRkaW5nOiAwOyAvLyAyXG59XG5cbi8vXG4vLyBGaXggdGhlIGN1cnNvciBzdHlsZSBmb3IgQ2hyb21lJ3MgaW5jcmVtZW50L2RlY3JlbWVudCBidXR0b25zLiBGb3IgY2VydGFpblxuLy8gYGZvbnQtc2l6ZWAgdmFsdWVzIG9mIHRoZSBgaW5wdXRgLCBpdCBjYXVzZXMgdGhlIGN1cnNvciBzdHlsZSBvZiB0aGVcbi8vIGRlY3JlbWVudCBidXR0b24gdG8gY2hhbmdlIGZyb20gYGRlZmF1bHRgIHRvIGB0ZXh0YC5cbi8vXG5cbmlucHV0W3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5pbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4vL1xuLy8gMS4gQWRkcmVzcyBgYXBwZWFyYW5jZWAgc2V0IHRvIGBzZWFyY2hmaWVsZGAgaW4gU2FmYXJpIGFuZCBDaHJvbWUuXG4vLyAyLiBBZGRyZXNzIGBib3gtc2l6aW5nYCBzZXQgdG8gYGJvcmRlci1ib3hgIGluIFNhZmFyaSBhbmQgQ2hyb21lLlxuLy9cblxuaW5wdXRbdHlwZT1cInNlYXJjaFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvLyAxXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvLzJcbn1cblxuLy9cbi8vIFJlbW92ZSBpbm5lciBwYWRkaW5nIGFuZCBzZWFyY2ggY2FuY2VsIGJ1dHRvbiBpbiBTYWZhcmkgYW5kIENocm9tZSBvbiBPUyBYLlxuLy8gU2FmYXJpIChidXQgbm90IENocm9tZSkgY2xpcHMgdGhlIGNhbmNlbCBidXR0b24gd2hlbiB0aGUgc2VhcmNoIGlucHV0IGhhc1xuLy8gcGFkZGluZyAoYW5kIGB0ZXh0ZmllbGRgIGFwcGVhcmFuY2UpLlxuLy9cblxuaW5wdXRbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcbmlucHV0W3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8vXG4vLyBEZWZpbmUgY29uc2lzdGVudCBib3JkZXIsIG1hcmdpbiwgYW5kIHBhZGRpbmcuXG4vL1xuXG5maWVsZHNldCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjMGMwYzA7XG4gIG1hcmdpbjogMCAycHg7XG4gIHBhZGRpbmc6IDAuMzVlbSAwLjYyNWVtIDAuNzVlbTtcbn1cblxuLy9cbi8vIDEuIENvcnJlY3QgYGNvbG9yYCBub3QgYmVpbmcgaW5oZXJpdGVkIGluIElFIDgvOS8xMC8xMS5cbi8vIDIuIFJlbW92ZSBwYWRkaW5nIHNvIHBlb3BsZSBhcmVuJ3QgY2F1Z2h0IG91dCBpZiB0aGV5IHplcm8gb3V0IGZpZWxkc2V0cy5cbi8vXG5cbmxlZ2VuZCB7XG4gIGJvcmRlcjogMDsgLy8gMVxuICBwYWRkaW5nOiAwOyAvLyAyXG59XG5cbi8vXG4vLyBSZW1vdmUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgOC85LzEwLzExLlxuLy9cblxudGV4dGFyZWEge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLy9cbi8vIERvbid0IGluaGVyaXQgdGhlIGBmb250LXdlaWdodGAgKGFwcGxpZWQgYnkgYSBydWxlIGFib3ZlKS5cbi8vIE5PVEU6IHRoZSBkZWZhdWx0IGNhbm5vdCBzYWZlbHkgYmUgY2hhbmdlZCBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBPUyBYLlxuLy9cblxub3B0Z3JvdXAge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLy8gVGFibGVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vL1xuLy8gUmVtb3ZlIG1vc3Qgc3BhY2luZyBiZXR3ZWVuIHRhYmxlIGNlbGxzLlxuLy9cblxudGFibGUge1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItc3BhY2luZzogMDtcbn1cblxudGQsXG50aCB7XG4gIHBhZGRpbmc6IDA7XG59XG4iLCIvKiEgU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vaDVicC9odG1sNS1ib2lsZXJwbGF0ZS9ibG9iL21hc3Rlci9zcmMvY3NzL21haW4uY3NzICovXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBQcmludCBzdHlsZXMuXG4vLyBJbmxpbmVkIHRvIGF2b2lkIHRoZSBhZGRpdGlvbmFsIEhUVFAgcmVxdWVzdDogaDVicC5jb20vclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuQG1lZGlhIHByaW50IHtcbiAgICAqLFxuICAgICo6YmVmb3JlLFxuICAgICo6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50OyAvLyBCbGFjayBwcmludHMgZmFzdGVyOiBoNWJwLmNvbS9zXG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgdGV4dC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICBhLFxuICAgIGE6dmlzaXRlZCB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIH1cblxuICAgIGFbaHJlZl06YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIiAoXCIgYXR0cihocmVmKSBcIilcIjtcbiAgICB9XG5cbiAgICBhYmJyW3RpdGxlXTphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIChcIiBhdHRyKHRpdGxlKSBcIilcIjtcbiAgICB9XG5cbiAgICAvLyBEb24ndCBzaG93IGxpbmtzIHRoYXQgYXJlIGZyYWdtZW50IGlkZW50aWZpZXJzLFxuICAgIC8vIG9yIHVzZSB0aGUgYGphdmFzY3JpcHQ6YCBwc2V1ZG8gcHJvdG9jb2xcbiAgICBhW2hyZWZePVwiI1wiXTphZnRlcixcbiAgICBhW2hyZWZePVwiamF2YXNjcmlwdDpcIl06YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgIH1cblxuICAgIHByZSxcbiAgICBibG9ja3F1b3RlIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcbiAgICAgICAgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkO1xuICAgIH1cblxuICAgIHRoZWFkIHtcbiAgICAgICAgZGlzcGxheTogdGFibGUtaGVhZGVyLWdyb3VwOyAvLyBoNWJwLmNvbS90XG4gICAgfVxuXG4gICAgdHIsXG4gICAgaW1nIHtcbiAgICAgICAgcGFnZS1icmVhay1pbnNpZGU6IGF2b2lkO1xuICAgIH1cblxuICAgIGltZyB7XG4gICAgICAgIG1heC13aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIHAsXG4gICAgaDIsXG4gICAgaDMge1xuICAgICAgICBvcnBoYW5zOiAzO1xuICAgICAgICB3aWRvd3M6IDM7XG4gICAgfVxuXG4gICAgaDIsXG4gICAgaDMge1xuICAgICAgICBwYWdlLWJyZWFrLWFmdGVyOiBhdm9pZDtcbiAgICB9XG5cbiAgICAvLyBCb290c3RyYXAgc3BlY2lmaWMgY2hhbmdlcyBzdGFydFxuXG4gICAgLy8gQm9vdHN0cmFwIGNvbXBvbmVudHNcbiAgICAubmF2YmFyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLmJ0bixcbiAgICAuZHJvcHVwID4gLmJ0biB7XG4gICAgICAgID4gLmNhcmV0IHtcbiAgICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6ICMwMDAgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAubGFiZWwge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuICAgIH1cblxuICAgIC50YWJsZSB7XG4gICAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2UgIWltcG9ydGFudDtcblxuICAgICAgICB0ZCxcbiAgICAgICAgdGgge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIC50YWJsZS1ib3JkZXJlZCB7XG4gICAgICAgIHRoLFxuICAgICAgICB0ZCB7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCb290c3RyYXAgc3BlY2lmaWMgY2hhbmdlcyBlbmRcbn1cbiIsIi8vXG4vLyBHbHlwaGljb25zIGZvciBCb290c3RyYXBcbi8vXG4vLyBTaW5jZSBpY29ucyBhcmUgZm9udHMsIHRoZXkgY2FuIGJlIHBsYWNlZCBhbnl3aGVyZSB0ZXh0IGlzIHBsYWNlZCBhbmQgYXJlXG4vLyB0aHVzIGF1dG9tYXRpY2FsbHkgc2l6ZWQgdG8gbWF0Y2ggdGhlIHN1cnJvdW5kaW5nIGNoaWxkLiBUbyB1c2UsIGNyZWF0ZSBhblxuLy8gaW5saW5lIGVsZW1lbnQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2xhc3NlcywgbGlrZSBzbzpcbi8vXG4vLyA8YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1zdGFyXCI+PC9zcGFuPiBTdGFyPC9hPlxuXG5AYXQtcm9vdCB7XG4gIC8vIEltcG9ydCB0aGUgZm9udHNcbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdHbHlwaGljb25zIEhhbGZsaW5ncyc7XG4gICAgc3JjOiB1cmwoaWYoJGJvb3RzdHJhcC1zYXNzLWFzc2V0LWhlbHBlciwgdHdicy1mb250LXBhdGgoJyN7JGljb24tZm9udC1wYXRofSN7JGljb24tZm9udC1uYW1lfS5lb3QnKSwgJyN7JGljb24tZm9udC1wYXRofSN7JGljb24tZm9udC1uYW1lfS5lb3QnKSk7XG4gICAgc3JjOiB1cmwoaWYoJGJvb3RzdHJhcC1zYXNzLWFzc2V0LWhlbHBlciwgdHdicy1mb250LXBhdGgoJyN7JGljb24tZm9udC1wYXRofSN7JGljb24tZm9udC1uYW1lfS5lb3Q/I2llZml4JyksICcjeyRpY29uLWZvbnQtcGF0aH0jeyRpY29uLWZvbnQtbmFtZX0uZW90PyNpZWZpeCcpKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXG4gICAgICAgICB1cmwoaWYoJGJvb3RzdHJhcC1zYXNzLWFzc2V0LWhlbHBlciwgdHdicy1mb250LXBhdGgoJyN7JGljb24tZm9udC1wYXRofSN7JGljb24tZm9udC1uYW1lfS53b2ZmMicpLCAnI3skaWNvbi1mb250LXBhdGh9I3skaWNvbi1mb250LW5hbWV9LndvZmYyJykpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgIHVybChpZigkYm9vdHN0cmFwLXNhc3MtYXNzZXQtaGVscGVyLCB0d2JzLWZvbnQtcGF0aCgnI3skaWNvbi1mb250LXBhdGh9I3skaWNvbi1mb250LW5hbWV9LndvZmYnKSwgJyN7JGljb24tZm9udC1wYXRofSN7JGljb24tZm9udC1uYW1lfS53b2ZmJykpIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgdXJsKGlmKCRib290c3RyYXAtc2Fzcy1hc3NldC1oZWxwZXIsIHR3YnMtZm9udC1wYXRoKCcjeyRpY29uLWZvbnQtcGF0aH0jeyRpY29uLWZvbnQtbmFtZX0udHRmJyksICcjeyRpY29uLWZvbnQtcGF0aH0jeyRpY29uLWZvbnQtbmFtZX0udHRmJykpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcbiAgICAgICAgIHVybChpZigkYm9vdHN0cmFwLXNhc3MtYXNzZXQtaGVscGVyLCB0d2JzLWZvbnQtcGF0aCgnI3skaWNvbi1mb250LXBhdGh9I3skaWNvbi1mb250LW5hbWV9LnN2ZyMjeyRpY29uLWZvbnQtc3ZnLWlkfScpLCAnI3skaWNvbi1mb250LXBhdGh9I3skaWNvbi1mb250LW5hbWV9LnN2ZyMjeyRpY29uLWZvbnQtc3ZnLWlkfScpKSBmb3JtYXQoJ3N2ZycpO1xuICB9XG59XG5cbi8vIENhdGNoYWxsIGJhc2VjbGFzc1xuLmdseXBoaWNvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAxcHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1mYW1pbHk6ICdHbHlwaGljb25zIEhhbGZsaW5ncyc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuXG4vLyBJbmRpdmlkdWFsIGljb25zXG4uZ2x5cGhpY29uLWFzdGVyaXNrICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFwwMDJhXCI7IH0gfVxuLmdseXBoaWNvbi1wbHVzICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcMDAyYlwiOyB9IH1cbi5nbHlwaGljb24tZXVybyxcbi5nbHlwaGljb24tZXVyICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXDIwYWNcIjsgfSB9XG4uZ2x5cGhpY29uLW1pbnVzICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFwyMjEyXCI7IH0gfVxuLmdseXBoaWNvbi1jbG91ZCAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcMjYwMVwiOyB9IH1cbi5nbHlwaGljb24tZW52ZWxvcGUgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXDI3MDlcIjsgfSB9XG4uZ2x5cGhpY29uLXBlbmNpbCAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFwyNzBmXCI7IH0gfVxuLmdseXBoaWNvbi1nbGFzcyAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAwMVwiOyB9IH1cbi5nbHlwaGljb24tbXVzaWMgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMDJcIjsgfSB9XG4uZ2x5cGhpY29uLXNlYXJjaCAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDAzXCI7IH0gfVxuLmdseXBoaWNvbi1oZWFydCAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAwNVwiOyB9IH1cbi5nbHlwaGljb24tc3RhciAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMDZcIjsgfSB9XG4uZ2x5cGhpY29uLXN0YXItZW1wdHkgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDA3XCI7IH0gfVxuLmdseXBoaWNvbi11c2VyICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAwOFwiOyB9IH1cbi5nbHlwaGljb24tZmlsbSAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMDlcIjsgfSB9XG4uZ2x5cGhpY29uLXRoLWxhcmdlICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDEwXCI7IH0gfVxuLmdseXBoaWNvbi10aCAgICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAxMVwiOyB9IH1cbi5nbHlwaGljb24tdGgtbGlzdCAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMTJcIjsgfSB9XG4uZ2x5cGhpY29uLW9rICAgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDEzXCI7IH0gfVxuLmdseXBoaWNvbi1yZW1vdmUgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAxNFwiOyB9IH1cbi5nbHlwaGljb24tem9vbS1pbiAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMTVcIjsgfSB9XG4uZ2x5cGhpY29uLXpvb20tb3V0ICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDE2XCI7IH0gfVxuLmdseXBoaWNvbi1vZmYgICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAxN1wiOyB9IH1cbi5nbHlwaGljb24tc2lnbmFsICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMThcIjsgfSB9XG4uZ2x5cGhpY29uLWNvZyAgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDE5XCI7IH0gfVxuLmdseXBoaWNvbi10cmFzaCAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAyMFwiOyB9IH1cbi5nbHlwaGljb24taG9tZSAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMjFcIjsgfSB9XG4uZ2x5cGhpY29uLWZpbGUgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDIyXCI7IH0gfVxuLmdseXBoaWNvbi10aW1lICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAyM1wiOyB9IH1cbi5nbHlwaGljb24tcm9hZCAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMjRcIjsgfSB9XG4uZ2x5cGhpY29uLWRvd25sb2FkLWFsdCAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDI1XCI7IH0gfVxuLmdseXBoaWNvbi1kb3dubG9hZCAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAyNlwiOyB9IH1cbi5nbHlwaGljb24tdXBsb2FkICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMjdcIjsgfSB9XG4uZ2x5cGhpY29uLWluYm94ICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDI4XCI7IH0gfVxuLmdseXBoaWNvbi1wbGF5LWNpcmNsZSAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAyOVwiOyB9IH1cbi5nbHlwaGljb24tcmVwZWF0ICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMzBcIjsgfSB9XG4uZ2x5cGhpY29uLXJlZnJlc2ggICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDMxXCI7IH0gfVxuLmdseXBoaWNvbi1saXN0LWFsdCAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAzMlwiOyB9IH1cbi5nbHlwaGljb24tbG9jayAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMzNcIjsgfSB9XG4uZ2x5cGhpY29uLWZsYWcgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDM0XCI7IH0gfVxuLmdseXBoaWNvbi1oZWFkcGhvbmVzICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAzNVwiOyB9IH1cbi5nbHlwaGljb24tdm9sdW1lLW9mZiAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMzZcIjsgfSB9XG4uZ2x5cGhpY29uLXZvbHVtZS1kb3duICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDM3XCI7IH0gfVxuLmdseXBoaWNvbi12b2x1bWUtdXAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTAzOFwiOyB9IH1cbi5nbHlwaGljb24tcXJjb2RlICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwMzlcIjsgfSB9XG4uZ2x5cGhpY29uLWJhcmNvZGUgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDQwXCI7IH0gfVxuLmdseXBoaWNvbi10YWcgICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA0MVwiOyB9IH1cbi5nbHlwaGljb24tdGFncyAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNDJcIjsgfSB9XG4uZ2x5cGhpY29uLWJvb2sgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDQzXCI7IH0gfVxuLmdseXBoaWNvbi1ib29rbWFyayAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA0NFwiOyB9IH1cbi5nbHlwaGljb24tcHJpbnQgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNDVcIjsgfSB9XG4uZ2x5cGhpY29uLWNhbWVyYSAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDQ2XCI7IH0gfVxuLmdseXBoaWNvbi1mb250ICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA0N1wiOyB9IH1cbi5nbHlwaGljb24tYm9sZCAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNDhcIjsgfSB9XG4uZ2x5cGhpY29uLWl0YWxpYyAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDQ5XCI7IH0gfVxuLmdseXBoaWNvbi10ZXh0LWhlaWdodCAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA1MFwiOyB9IH1cbi5nbHlwaGljb24tdGV4dC13aWR0aCAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNTFcIjsgfSB9XG4uZ2x5cGhpY29uLWFsaWduLWxlZnQgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDUyXCI7IH0gfVxuLmdseXBoaWNvbi1hbGlnbi1jZW50ZXIgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA1M1wiOyB9IH1cbi5nbHlwaGljb24tYWxpZ24tcmlnaHQgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNTRcIjsgfSB9XG4uZ2x5cGhpY29uLWFsaWduLWp1c3RpZnkgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDU1XCI7IH0gfVxuLmdseXBoaWNvbi1saXN0ICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA1NlwiOyB9IH1cbi5nbHlwaGljb24taW5kZW50LWxlZnQgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNTdcIjsgfSB9XG4uZ2x5cGhpY29uLWluZGVudC1yaWdodCAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDU4XCI7IH0gfVxuLmdseXBoaWNvbi1mYWNldGltZS12aWRlbyAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA1OVwiOyB9IH1cbi5nbHlwaGljb24tcGljdHVyZSAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNjBcIjsgfSB9XG4uZ2x5cGhpY29uLW1hcC1tYXJrZXIgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDYyXCI7IH0gfVxuLmdseXBoaWNvbi1hZGp1c3QgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA2M1wiOyB9IH1cbi5nbHlwaGljb24tdGludCAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNjRcIjsgfSB9XG4uZ2x5cGhpY29uLWVkaXQgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDY1XCI7IH0gfVxuLmdseXBoaWNvbi1zaGFyZSAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA2NlwiOyB9IH1cbi5nbHlwaGljb24tY2hlY2sgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNjdcIjsgfSB9XG4uZ2x5cGhpY29uLW1vdmUgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDY4XCI7IH0gfVxuLmdseXBoaWNvbi1zdGVwLWJhY2t3YXJkICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA2OVwiOyB9IH1cbi5nbHlwaGljb24tZmFzdC1iYWNrd2FyZCAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNzBcIjsgfSB9XG4uZ2x5cGhpY29uLWJhY2t3YXJkICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDcxXCI7IH0gfVxuLmdseXBoaWNvbi1wbGF5ICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA3MlwiOyB9IH1cbi5nbHlwaGljb24tcGF1c2UgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNzNcIjsgfSB9XG4uZ2x5cGhpY29uLXN0b3AgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDc0XCI7IH0gfVxuLmdseXBoaWNvbi1mb3J3YXJkICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA3NVwiOyB9IH1cbi5nbHlwaGljb24tZmFzdC1mb3J3YXJkICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNzZcIjsgfSB9XG4uZ2x5cGhpY29uLXN0ZXAtZm9yd2FyZCAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDc3XCI7IH0gfVxuLmdseXBoaWNvbi1lamVjdCAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA3OFwiOyB9IH1cbi5nbHlwaGljb24tY2hldnJvbi1sZWZ0ICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwNzlcIjsgfSB9XG4uZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDgwXCI7IH0gfVxuLmdseXBoaWNvbi1wbHVzLXNpZ24gICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA4MVwiOyB9IH1cbi5nbHlwaGljb24tbWludXMtc2lnbiAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwODJcIjsgfSB9XG4uZ2x5cGhpY29uLXJlbW92ZS1zaWduICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDgzXCI7IH0gfVxuLmdseXBoaWNvbi1vay1zaWduICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA4NFwiOyB9IH1cbi5nbHlwaGljb24tcXVlc3Rpb24tc2lnbiAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwODVcIjsgfSB9XG4uZ2x5cGhpY29uLWluZm8tc2lnbiAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDg2XCI7IH0gfVxuLmdseXBoaWNvbi1zY3JlZW5zaG90ICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA4N1wiOyB9IH1cbi5nbHlwaGljb24tcmVtb3ZlLWNpcmNsZSAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwODhcIjsgfSB9XG4uZ2x5cGhpY29uLW9rLWNpcmNsZSAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDg5XCI7IH0gfVxuLmdseXBoaWNvbi1iYW4tY2lyY2xlICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA5MFwiOyB9IH1cbi5nbHlwaGljb24tYXJyb3ctbGVmdCAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwOTFcIjsgfSB9XG4uZ2x5cGhpY29uLWFycm93LXJpZ2h0ICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDkyXCI7IH0gfVxuLmdseXBoaWNvbi1hcnJvdy11cCAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA5M1wiOyB9IH1cbi5nbHlwaGljb24tYXJyb3ctZG93biAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwOTRcIjsgfSB9XG4uZ2x5cGhpY29uLXNoYXJlLWFsdCAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMDk1XCI7IH0gfVxuLmdseXBoaWNvbi1yZXNpemUtZnVsbCAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTA5NlwiOyB9IH1cbi5nbHlwaGljb24tcmVzaXplLXNtYWxsICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUwOTdcIjsgfSB9XG4uZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ24gICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTAxXCI7IH0gfVxuLmdseXBoaWNvbi1naWZ0ICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEwMlwiOyB9IH1cbi5nbHlwaGljb24tbGVhZiAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMDNcIjsgfSB9XG4uZ2x5cGhpY29uLWZpcmUgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTA0XCI7IH0gfVxuLmdseXBoaWNvbi1leWUtb3BlbiAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEwNVwiOyB9IH1cbi5nbHlwaGljb24tZXllLWNsb3NlICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMDZcIjsgfSB9XG4uZ2x5cGhpY29uLXdhcm5pbmctc2lnbiAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTA3XCI7IH0gfVxuLmdseXBoaWNvbi1wbGFuZSAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEwOFwiOyB9IH1cbi5nbHlwaGljb24tY2FsZW5kYXIgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMDlcIjsgfSB9XG4uZ2x5cGhpY29uLXJhbmRvbSAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTEwXCI7IH0gfVxuLmdseXBoaWNvbi1jb21tZW50ICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTExMVwiOyB9IH1cbi5nbHlwaGljb24tbWFnbmV0ICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMTJcIjsgfSB9XG4uZ2x5cGhpY29uLWNoZXZyb24tdXAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTEzXCI7IH0gfVxuLmdseXBoaWNvbi1jaGV2cm9uLWRvd24gICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTExNFwiOyB9IH1cbi5nbHlwaGljb24tcmV0d2VldCAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMTVcIjsgfSB9XG4uZ2x5cGhpY29uLXNob3BwaW5nLWNhcnQgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTE2XCI7IH0gfVxuLmdseXBoaWNvbi1mb2xkZXItY2xvc2UgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTExN1wiOyB9IH1cbi5nbHlwaGljb24tZm9sZGVyLW9wZW4gICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMThcIjsgfSB9XG4uZ2x5cGhpY29uLXJlc2l6ZS12ZXJ0aWNhbCAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTE5XCI7IH0gfVxuLmdseXBoaWNvbi1yZXNpemUtaG9yaXpvbnRhbCAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEyMFwiOyB9IH1cbi5nbHlwaGljb24taGRkICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMjFcIjsgfSB9XG4uZ2x5cGhpY29uLWJ1bGxob3JuICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTIyXCI7IH0gfVxuLmdseXBoaWNvbi1iZWxsICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEyM1wiOyB9IH1cbi5nbHlwaGljb24tY2VydGlmaWNhdGUgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMjRcIjsgfSB9XG4uZ2x5cGhpY29uLXRodW1icy11cCAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTI1XCI7IH0gfVxuLmdseXBoaWNvbi10aHVtYnMtZG93biAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEyNlwiOyB9IH1cbi5nbHlwaGljb24taGFuZC1yaWdodCAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMjdcIjsgfSB9XG4uZ2x5cGhpY29uLWhhbmQtbGVmdCAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTI4XCI7IH0gfVxuLmdseXBoaWNvbi1oYW5kLXVwICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEyOVwiOyB9IH1cbi5nbHlwaGljb24taGFuZC1kb3duICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMzBcIjsgfSB9XG4uZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1yaWdodCAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTMxXCI7IH0gfVxuLmdseXBoaWNvbi1jaXJjbGUtYXJyb3ctbGVmdCAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEzMlwiOyB9IH1cbi5nbHlwaGljb24tY2lyY2xlLWFycm93LXVwICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMzNcIjsgfSB9XG4uZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1kb3duICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTM0XCI7IH0gfVxuLmdseXBoaWNvbi1nbG9iZSAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEzNVwiOyB9IH1cbi5nbHlwaGljb24td3JlbmNoICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMzZcIjsgfSB9XG4uZ2x5cGhpY29uLXRhc2tzICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTM3XCI7IH0gfVxuLmdseXBoaWNvbi1maWx0ZXIgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTEzOFwiOyB9IH1cbi5nbHlwaGljb24tYnJpZWZjYXNlICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxMzlcIjsgfSB9XG4uZ2x5cGhpY29uLWZ1bGxzY3JlZW4gICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTQwXCI7IH0gfVxuLmdseXBoaWNvbi1kYXNoYm9hcmQgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE0MVwiOyB9IH1cbi5nbHlwaGljb24tcGFwZXJjbGlwICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNDJcIjsgfSB9XG4uZ2x5cGhpY29uLWhlYXJ0LWVtcHR5ICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTQzXCI7IH0gfVxuLmdseXBoaWNvbi1saW5rICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE0NFwiOyB9IH1cbi5nbHlwaGljb24tcGhvbmUgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNDVcIjsgfSB9XG4uZ2x5cGhpY29uLXB1c2hwaW4gICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTQ2XCI7IH0gfVxuLmdseXBoaWNvbi11c2QgICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE0OFwiOyB9IH1cbi5nbHlwaGljb24tZ2JwICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNDlcIjsgfSB9XG4uZ2x5cGhpY29uLXNvcnQgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTUwXCI7IH0gfVxuLmdseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0ICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE1MVwiOyB9IH1cbi5nbHlwaGljb24tc29ydC1ieS1hbHBoYWJldC1hbHQgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNTJcIjsgfSB9XG4uZ2x5cGhpY29uLXNvcnQtYnktb3JkZXIgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTUzXCI7IH0gfVxuLmdseXBoaWNvbi1zb3J0LWJ5LW9yZGVyLWFsdCAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE1NFwiOyB9IH1cbi5nbHlwaGljb24tc29ydC1ieS1hdHRyaWJ1dGVzICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNTVcIjsgfSB9XG4uZ2x5cGhpY29uLXNvcnQtYnktYXR0cmlidXRlcy1hbHQgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTU2XCI7IH0gfVxuLmdseXBoaWNvbi11bmNoZWNrZWQgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE1N1wiOyB9IH1cbi5nbHlwaGljb24tZXhwYW5kICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNThcIjsgfSB9XG4uZ2x5cGhpY29uLWNvbGxhcHNlLWRvd24gICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTU5XCI7IH0gfVxuLmdseXBoaWNvbi1jb2xsYXBzZS11cCAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE2MFwiOyB9IH1cbi5nbHlwaGljb24tbG9nLWluICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNjFcIjsgfSB9XG4uZ2x5cGhpY29uLWZsYXNoICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTYyXCI7IH0gfVxuLmdseXBoaWNvbi1sb2ctb3V0ICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE2M1wiOyB9IH1cbi5nbHlwaGljb24tbmV3LXdpbmRvdyAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNjRcIjsgfSB9XG4uZ2x5cGhpY29uLXJlY29yZCAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTY1XCI7IH0gfVxuLmdseXBoaWNvbi1zYXZlICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE2NlwiOyB9IH1cbi5nbHlwaGljb24tb3BlbiAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNjdcIjsgfSB9XG4uZ2x5cGhpY29uLXNhdmVkICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTY4XCI7IH0gfVxuLmdseXBoaWNvbi1pbXBvcnQgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE2OVwiOyB9IH1cbi5nbHlwaGljb24tZXhwb3J0ICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNzBcIjsgfSB9XG4uZ2x5cGhpY29uLXNlbmQgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTcxXCI7IH0gfVxuLmdseXBoaWNvbi1mbG9wcHktZGlzayAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE3MlwiOyB9IH1cbi5nbHlwaGljb24tZmxvcHB5LXNhdmVkICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNzNcIjsgfSB9XG4uZ2x5cGhpY29uLWZsb3BweS1yZW1vdmUgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTc0XCI7IH0gfVxuLmdseXBoaWNvbi1mbG9wcHktc2F2ZSAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE3NVwiOyB9IH1cbi5nbHlwaGljb24tZmxvcHB5LW9wZW4gICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNzZcIjsgfSB9XG4uZ2x5cGhpY29uLWNyZWRpdC1jYXJkICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTc3XCI7IH0gfVxuLmdseXBoaWNvbi10cmFuc2ZlciAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE3OFwiOyB9IH1cbi5nbHlwaGljb24tY3V0bGVyeSAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxNzlcIjsgfSB9XG4uZ2x5cGhpY29uLWhlYWRlciAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTgwXCI7IH0gfVxuLmdseXBoaWNvbi1jb21wcmVzc2VkICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE4MVwiOyB9IH1cbi5nbHlwaGljb24tZWFycGhvbmUgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxODJcIjsgfSB9XG4uZ2x5cGhpY29uLXBob25lLWFsdCAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTgzXCI7IH0gfVxuLmdseXBoaWNvbi10b3dlciAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE4NFwiOyB9IH1cbi5nbHlwaGljb24tc3RhdHMgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxODVcIjsgfSB9XG4uZ2x5cGhpY29uLXNkLXZpZGVvICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTg2XCI7IH0gfVxuLmdseXBoaWNvbi1oZC12aWRlbyAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE4N1wiOyB9IH1cbi5nbHlwaGljb24tc3VidGl0bGVzICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxODhcIjsgfSB9XG4uZ2x5cGhpY29uLXNvdW5kLXN0ZXJlbyAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTg5XCI7IH0gfVxuLmdseXBoaWNvbi1zb3VuZC1kb2xieSAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE5MFwiOyB9IH1cbi5nbHlwaGljb24tc291bmQtNS0xICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxOTFcIjsgfSB9XG4uZ2x5cGhpY29uLXNvdW5kLTYtMSAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTkyXCI7IH0gfVxuLmdseXBoaWNvbi1zb3VuZC03LTEgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE5M1wiOyB9IH1cbi5nbHlwaGljb24tY29weXJpZ2h0LW1hcmsgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxOTRcIjsgfSB9XG4uZ2x5cGhpY29uLXJlZ2lzdHJhdGlvbi1tYXJrICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTk1XCI7IH0gfVxuLmdseXBoaWNvbi1jbG91ZC1kb3dubG9hZCAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTE5N1wiOyB9IH1cbi5nbHlwaGljb24tY2xvdWQtdXBsb2FkICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUxOThcIjsgfSB9XG4uZ2x5cGhpY29uLXRyZWUtY29uaWZlciAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMTk5XCI7IH0gfVxuLmdseXBoaWNvbi10cmVlLWRlY2lkdW91cyAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIwMFwiOyB9IH1cbi5nbHlwaGljb24tY2QgICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMDFcIjsgfSB9XG4uZ2x5cGhpY29uLXNhdmUtZmlsZSAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjAyXCI7IH0gfVxuLmdseXBoaWNvbi1vcGVuLWZpbGUgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIwM1wiOyB9IH1cbi5nbHlwaGljb24tbGV2ZWwtdXAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMDRcIjsgfSB9XG4uZ2x5cGhpY29uLWNvcHkgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjA1XCI7IH0gfVxuLmdseXBoaWNvbi1wYXN0ZSAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIwNlwiOyB9IH1cbi8vIFRoZSBmb2xsb3dpbmcgMiBHbHlwaGljb25zIGFyZSBvbWl0dGVkIGZvciB0aGUgdGltZSBiZWluZyBiZWNhdXNlXG4vLyB0aGV5IGN1cnJlbnRseSB1c2UgVW5pY29kZSBjb2RlcG9pbnRzIHRoYXQgYXJlIG91dHNpZGUgdGhlXG4vLyBCYXNpYyBNdWx0aWxpbmd1YWwgUGxhbmUgKEJNUCkuIE9sZGVyIGJ1Z2d5IHZlcnNpb25zIG9mIFdlYktpdCBjYW4ndCBoYW5kbGVcbi8vIG5vbi1CTVAgY29kZXBvaW50cyBpbiBDU1Mgc3RyaW5nIGVzY2FwZXMsIGFuZCB0aHVzIGNhbid0IGRpc3BsYXkgdGhlc2UgdHdvIGljb25zLlxuLy8gTm90YWJseSwgdGhlIGJ1ZyBhZmZlY3RzIHNvbWUgb2xkZXIgdmVyc2lvbnMgb2YgdGhlIEFuZHJvaWQgQnJvd3Nlci5cbi8vIE1vcmUgaW5mbzogaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xMDEwNlxuLy8gLmdseXBoaWNvbi1kb29yICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcMWY2YWFcIjsgfSB9XG4vLyAuZ2x5cGhpY29uLWtleSAgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFwxZjUxMVwiOyB9IH1cbi5nbHlwaGljb24tYWxlcnQgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMDlcIjsgfSB9XG4uZ2x5cGhpY29uLWVxdWFsaXplciAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjEwXCI7IH0gfVxuLmdseXBoaWNvbi1raW5nICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIxMVwiOyB9IH1cbi5nbHlwaGljb24tcXVlZW4gICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMTJcIjsgfSB9XG4uZ2x5cGhpY29uLXBhd24gICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjEzXCI7IH0gfVxuLmdseXBoaWNvbi1iaXNob3AgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIxNFwiOyB9IH1cbi5nbHlwaGljb24ta25pZ2h0ICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMTVcIjsgfSB9XG4uZ2x5cGhpY29uLWJhYnktZm9ybXVsYSAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjE2XCI7IH0gfVxuLmdseXBoaWNvbi10ZW50ICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcMjZmYVwiOyB9IH1cbi5nbHlwaGljb24tYmxhY2tib2FyZCAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMThcIjsgfSB9XG4uZ2x5cGhpY29uLWJlZCAgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjE5XCI7IH0gfVxuLmdseXBoaWNvbi1hcHBsZSAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZjhmZlwiOyB9IH1cbi5nbHlwaGljb24tZXJhc2UgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMjFcIjsgfSB9XG4uZ2x5cGhpY29uLWhvdXJnbGFzcyAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFwyMzFiXCI7IH0gfVxuLmdseXBoaWNvbi1sYW1wICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIyM1wiOyB9IH1cbi5nbHlwaGljb24tZHVwbGljYXRlICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMjRcIjsgfSB9XG4uZ2x5cGhpY29uLXBpZ2d5LWJhbmsgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjI1XCI7IH0gfVxuLmdseXBoaWNvbi1zY2lzc29ycyAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIyNlwiOyB9IH1cbi5nbHlwaGljb24tYml0Y29pbiAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMjdcIjsgfSB9XG4uZ2x5cGhpY29uLWJ0YyAgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjI3XCI7IH0gfVxuLmdseXBoaWNvbi14YnQgICAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIyN1wiOyB9IH1cbi5nbHlwaGljb24teWVuICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXDAwYTVcIjsgfSB9XG4uZ2x5cGhpY29uLWpweSAgICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFwwMGE1XCI7IH0gfVxuLmdseXBoaWNvbi1ydWJsZSAgICAgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcMjBiZFwiOyB9IH1cbi5nbHlwaGljb24tcnViICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXDIwYmRcIjsgfSB9XG4uZ2x5cGhpY29uLXNjYWxlICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjMwXCI7IH0gfVxuLmdseXBoaWNvbi1pY2UtbG9sbHkgICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIzMVwiOyB9IH1cbi5nbHlwaGljb24taWNlLWxvbGx5LXRhc3RlZCAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMzJcIjsgfSB9XG4uZ2x5cGhpY29uLWVkdWNhdGlvbiAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjMzXCI7IH0gfVxuLmdseXBoaWNvbi1vcHRpb24taG9yaXpvbnRhbCAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIzNFwiOyB9IH1cbi5nbHlwaGljb24tb3B0aW9uLXZlcnRpY2FsICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMzVcIjsgfSB9XG4uZ2x5cGhpY29uLW1lbnUtaGFtYnVyZ2VyICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjM2XCI7IH0gfVxuLmdseXBoaWNvbi1tb2RhbC13aW5kb3cgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTIzN1wiOyB9IH1cbi5nbHlwaGljb24tb2lsICAgICAgICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyMzhcIjsgfSB9XG4uZ2x5cGhpY29uLWdyYWluICAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjM5XCI7IH0gfVxuLmdseXBoaWNvbi1zdW5nbGFzc2VzICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI0MFwiOyB9IH1cbi5nbHlwaGljb24tdGV4dC1zaXplICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNDFcIjsgfSB9XG4uZ2x5cGhpY29uLXRleHQtY29sb3IgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjQyXCI7IH0gfVxuLmdseXBoaWNvbi10ZXh0LWJhY2tncm91bmQgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI0M1wiOyB9IH1cbi5nbHlwaGljb24tb2JqZWN0LWFsaWduLXRvcCAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNDRcIjsgfSB9XG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi1ib3R0b20gICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjQ1XCI7IH0gfVxuLmdseXBoaWNvbi1vYmplY3QtYWxpZ24taG9yaXpvbnRhbHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI0NlwiOyB9IH1cbi5nbHlwaGljb24tb2JqZWN0LWFsaWduLWxlZnQgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNDdcIjsgfSB9XG4uZ2x5cGhpY29uLW9iamVjdC1hbGlnbi12ZXJ0aWNhbCAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjQ4XCI7IH0gfVxuLmdseXBoaWNvbi1vYmplY3QtYWxpZ24tcmlnaHQgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI0OVwiOyB9IH1cbi5nbHlwaGljb24tdHJpYW5nbGUtcmlnaHQgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNTBcIjsgfSB9XG4uZ2x5cGhpY29uLXRyaWFuZ2xlLWxlZnQgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjUxXCI7IH0gfVxuLmdseXBoaWNvbi10cmlhbmdsZS1ib3R0b20gICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI1MlwiOyB9IH1cbi5nbHlwaGljb24tdHJpYW5nbGUtdG9wICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNTNcIjsgfSB9XG4uZ2x5cGhpY29uLWNvbnNvbGUgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjU0XCI7IH0gfVxuLmdseXBoaWNvbi1zdXBlcnNjcmlwdCAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI1NVwiOyB9IH1cbi5nbHlwaGljb24tc3Vic2NyaXB0ICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNTZcIjsgfSB9XG4uZ2x5cGhpY29uLW1lbnUtbGVmdCAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjU3XCI7IH0gfVxuLmdseXBoaWNvbi1tZW51LXJpZ2h0ICAgICAgICAgICAgIHsgJjpiZWZvcmUgeyBjb250ZW50OiBcIlxcZTI1OFwiOyB9IH1cbi5nbHlwaGljb24tbWVudS1kb3duICAgICAgICAgICAgICB7ICY6YmVmb3JlIHsgY29udGVudDogXCJcXGUyNTlcIjsgfSB9XG4uZ2x5cGhpY29uLW1lbnUtdXAgICAgICAgICAgICAgICAgeyAmOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxlMjYwXCI7IH0gfVxuIiwiLy9cbi8vIFNjYWZmb2xkaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIFJlc2V0IHRoZSBib3gtc2l6aW5nXG4vL1xuLy8gSGVhZHMgdXAhIFRoaXMgcmVzZXQgbWF5IGNhdXNlIGNvbmZsaWN0cyB3aXRoIHNvbWUgdGhpcmQtcGFydHkgd2lkZ2V0cy5cbi8vIEZvciByZWNvbW1lbmRhdGlvbnMgb24gcmVzb2x2aW5nIHN1Y2ggY29uZmxpY3RzLCBzZWVcbi8vIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2dldHRpbmctc3RhcnRlZC8jdGhpcmQtYm94LXNpemluZ1xuKiB7XG4gIEBpbmNsdWRlIGJveC1zaXppbmcoYm9yZGVyLWJveCk7XG59XG4qOmJlZm9yZSxcbio6YWZ0ZXIge1xuICBAaW5jbHVkZSBib3gtc2l6aW5nKGJvcmRlci1ib3gpO1xufVxuXG5cbi8vIEJvZHkgcmVzZXRcblxuaHRtbCB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsMCwwLDApO1xufVxuXG5ib2R5IHtcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS1iYXNlO1xuICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcbiAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodC1iYXNlO1xuICBjb2xvcjogJHRleHQtY29sb3I7XG4gIGJhY2tncm91bmQtY29sb3I6ICRib2R5LWJnO1xufVxuXG4vLyBSZXNldCBmb250cyBmb3IgcmVsZXZhbnQgZWxlbWVudHNcbmlucHV0LFxuYnV0dG9uLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbn1cblxuXG4vLyBMaW5rc1xuXG5hIHtcbiAgY29sb3I6ICRsaW5rLWNvbG9yO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgY29sb3I6ICRsaW5rLWhvdmVyLWNvbG9yO1xuICAgIHRleHQtZGVjb3JhdGlvbjogJGxpbmstaG92ZXItZGVjb3JhdGlvbjtcbiAgfVxuXG4gICY6Zm9jdXMge1xuICAgIEBpbmNsdWRlIHRhYi1mb2N1cztcbiAgfVxufVxuXG5cbi8vIEZpZ3VyZXNcbi8vXG4vLyBXZSByZXNldCB0aGlzIGhlcmUgYmVjYXVzZSBwcmV2aW91c2x5IE5vcm1hbGl6ZSBoYWQgbm8gYGZpZ3VyZWAgbWFyZ2lucy4gVGhpc1xuLy8gZW5zdXJlcyB3ZSBkb24ndCBicmVhayBhbnlvbmUncyB1c2Ugb2YgdGhlIGVsZW1lbnQuXG5cbmZpZ3VyZSB7XG4gIG1hcmdpbjogMDtcbn1cblxuXG4vLyBJbWFnZXNcblxuaW1nIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLy8gUmVzcG9uc2l2ZSBpbWFnZXMgKGVuc3VyZSBpbWFnZXMgZG9uJ3Qgc2NhbGUgYmV5b25kIHRoZWlyIHBhcmVudHMpXG4uaW1nLXJlc3BvbnNpdmUge1xuICBAaW5jbHVkZSBpbWctcmVzcG9uc2l2ZTtcbn1cblxuLy8gUm91bmRlZCBjb3JuZXJzXG4uaW1nLXJvdW5kZWQge1xuICBib3JkZXItcmFkaXVzOiAkYm9yZGVyLXJhZGl1cy1sYXJnZTtcbn1cblxuLy8gSW1hZ2UgdGh1bWJuYWlsc1xuLy9cbi8vIEhlYWRzIHVwISBUaGlzIGlzIG1peGluLWVkIGludG8gdGh1bWJuYWlscy5sZXNzIGZvciBgLnRodW1ibmFpbGAuXG4uaW1nLXRodW1ibmFpbCB7XG4gIHBhZGRpbmc6ICR0aHVtYm5haWwtcGFkZGluZztcbiAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodC1iYXNlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkdGh1bWJuYWlsLWJnO1xuICBib3JkZXI6IDFweCBzb2xpZCAkdGh1bWJuYWlsLWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogJHRodW1ibmFpbC1ib3JkZXItcmFkaXVzO1xuICBAaW5jbHVkZSB0cmFuc2l0aW9uKGFsbCAuMnMgZWFzZS1pbi1vdXQpO1xuXG4gIC8vIEtlZXAgdGhlbSBhdCBtb3N0IDEwMCUgd2lkZVxuICBAaW5jbHVkZSBpbWctcmVzcG9uc2l2ZShpbmxpbmUtYmxvY2spO1xufVxuXG4vLyBQZXJmZWN0IGNpcmNsZVxuLmltZy1jaXJjbGUge1xuICBib3JkZXItcmFkaXVzOiA1MCU7IC8vIHNldCByYWRpdXMgaW4gcGVyY2VudHNcbn1cblxuXG4vLyBIb3Jpem9udGFsIHJ1bGVzXG5cbmhyIHtcbiAgbWFyZ2luLXRvcDogICAgJGxpbmUtaGVpZ2h0LWNvbXB1dGVkO1xuICBtYXJnaW4tYm90dG9tOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICRoci1ib3JkZXI7XG59XG5cblxuLy8gT25seSBkaXNwbGF5IGNvbnRlbnQgdG8gc2NyZWVuIHJlYWRlcnNcbi8vXG4vLyBTZWU6IGh0dHA6Ly9hMTF5cHJvamVjdC5jb20vcG9zdHMvaG93LXRvLWhpZGUtY29udGVudC9cblxuLnNyLW9ubHkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxcHg7XG4gIGhlaWdodDogMXB4O1xuICBtYXJnaW46IC0xcHg7XG4gIHBhZGRpbmc6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNsaXA6IHJlY3QoMCwwLDAsMCk7XG4gIGJvcmRlcjogMDtcbn1cblxuLy8gVXNlIGluIGNvbmp1bmN0aW9uIHdpdGggLnNyLW9ubHkgdG8gb25seSBkaXNwbGF5IGNvbnRlbnQgd2hlbiBpdCdzIGZvY3VzZWQuXG4vLyBVc2VmdWwgZm9yIFwiU2tpcCB0byBtYWluIGNvbnRlbnRcIiBsaW5rczsgc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTMvTk9URS1XQ0FHMjAtVEVDSFMtMjAxMzA5MDUvRzFcbi8vIENyZWRpdDogSFRNTDUgQm9pbGVycGxhdGVcblxuLnNyLW9ubHktZm9jdXNhYmxlIHtcbiAgJjphY3RpdmUsXG4gICY6Zm9jdXMge1xuICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbjogMDtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICBjbGlwOiBhdXRvO1xuICB9XG59XG5cblxuLy8gaU9TIFwiY2xpY2thYmxlIGVsZW1lbnRzXCIgZml4IGZvciByb2xlPVwiYnV0dG9uXCJcbi8vXG4vLyBGaXhlcyBcImNsaWNrYWJpbGl0eVwiIGlzc3VlIChhbmQgbW9yZSBnZW5lcmFsbHksIHRoZSBmaXJpbmcgb2YgZXZlbnRzIHN1Y2ggYXMgZm9jdXMgYXMgd2VsbClcbi8vIGZvciB0cmFkaXRpb25hbGx5IG5vbi1mb2N1c2FibGUgZWxlbWVudHMgd2l0aCByb2xlPVwiYnV0dG9uXCJcbi8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvY2xpY2sjU2FmYXJpX01vYmlsZVxuXG5bcm9sZT1cImJ1dHRvblwiXSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbiIsIi8vXG4vLyBUeXBvZ3JhcGh5XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEhlYWRpbmdzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsXG4uaDEsIC5oMiwgLmgzLCAuaDQsIC5oNSwgLmg2IHtcbiAgZm9udC1mYW1pbHk6ICRoZWFkaW5ncy1mb250LWZhbWlseTtcbiAgZm9udC13ZWlnaHQ6ICRoZWFkaW5ncy1mb250LXdlaWdodDtcbiAgbGluZS1oZWlnaHQ6ICRoZWFkaW5ncy1saW5lLWhlaWdodDtcbiAgY29sb3I6ICRoZWFkaW5ncy1jb2xvcjtcblxuICBzbWFsbCxcbiAgLnNtYWxsIHtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgIGNvbG9yOiAkaGVhZGluZ3Mtc21hbGwtY29sb3I7XG4gIH1cbn1cblxuaDEsIC5oMSxcbmgyLCAuaDIsXG5oMywgLmgzIHtcbiAgbWFyZ2luLXRvcDogJGxpbmUtaGVpZ2h0LWNvbXB1dGVkO1xuICBtYXJnaW4tYm90dG9tOiAoJGxpbmUtaGVpZ2h0LWNvbXB1dGVkIC8gMik7XG5cbiAgc21hbGwsXG4gIC5zbWFsbCB7XG4gICAgZm9udC1zaXplOiA2NSU7XG4gIH1cbn1cbmg0LCAuaDQsXG5oNSwgLmg1LFxuaDYsIC5oNiB7XG4gIG1hcmdpbi10b3A6ICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgLyAyKTtcbiAgbWFyZ2luLWJvdHRvbTogKCRsaW5lLWhlaWdodC1jb21wdXRlZCAvIDIpO1xuXG4gIHNtYWxsLFxuICAuc21hbGwge1xuICAgIGZvbnQtc2l6ZTogNzUlO1xuICB9XG59XG5cbmgxLCAuaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cbmgyLCAuaDIgeyBmb250LXNpemU6ICRmb250LXNpemUtaDI7IH1cbmgzLCAuaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cbmg0LCAuaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cbmg1LCAuaDUgeyBmb250LXNpemU6ICRmb250LXNpemUtaDU7IH1cbmg2LCAuaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cblxuXG4vLyBCb2R5IHRleHRcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucCB7XG4gIG1hcmdpbjogMCAwICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgLyAyKTtcbn1cblxuLmxlYWQge1xuICBtYXJnaW4tYm90dG9tOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGZvbnQtc2l6ZTogZmxvb3IoKCRmb250LXNpemUtYmFzZSAqIDEuMTUpKTtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIHtcbiAgICBmb250LXNpemU6ICgkZm9udC1zaXplLWJhc2UgKiAxLjUpO1xuICB9XG59XG5cblxuLy8gRW1waGFzaXMgJiBtaXNjXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEV4OiAoMTJweCBzbWFsbCBmb250IC8gMTRweCBiYXNlIGZvbnQpICogMTAwJSA9IGFib3V0IDg1JVxuc21hbGwsXG4uc21hbGwge1xuICBmb250LXNpemU6IGZsb29yKCgxMDAlICogJGZvbnQtc2l6ZS1zbWFsbCAvICRmb250LXNpemUtYmFzZSkpO1xufVxuXG5tYXJrLFxuLm1hcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc3RhdGUtd2FybmluZy1iZztcbiAgcGFkZGluZzogLjJlbTtcbn1cblxuLy8gQWxpZ25tZW50XG4udGV4dC1sZWZ0ICAgICAgICAgICB7IHRleHQtYWxpZ246IGxlZnQ7IH1cbi50ZXh0LXJpZ2h0ICAgICAgICAgIHsgdGV4dC1hbGlnbjogcmlnaHQ7IH1cbi50ZXh0LWNlbnRlciAgICAgICAgIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4udGV4dC1qdXN0aWZ5ICAgICAgICB7IHRleHQtYWxpZ246IGp1c3RpZnk7IH1cbi50ZXh0LW5vd3JhcCAgICAgICAgIHsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuXG4vLyBUcmFuc2Zvcm1hdGlvblxuLnRleHQtbG93ZXJjYXNlICAgICAgeyB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlOyB9XG4udGV4dC11cHBlcmNhc2UgICAgICB7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IH1cbi50ZXh0LWNhcGl0YWxpemUgICAgIHsgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7IH1cblxuLy8gQ29udGV4dHVhbCBjb2xvcnNcbi50ZXh0LW11dGVkIHtcbiAgY29sb3I6ICR0ZXh0LW11dGVkO1xufVxuXG5AaW5jbHVkZSB0ZXh0LWVtcGhhc2lzLXZhcmlhbnQoJy50ZXh0LXByaW1hcnknLCAkYnJhbmQtcHJpbWFyeSk7XG5cbkBpbmNsdWRlIHRleHQtZW1waGFzaXMtdmFyaWFudCgnLnRleHQtc3VjY2VzcycsICRzdGF0ZS1zdWNjZXNzLXRleHQpO1xuXG5AaW5jbHVkZSB0ZXh0LWVtcGhhc2lzLXZhcmlhbnQoJy50ZXh0LWluZm8nLCAkc3RhdGUtaW5mby10ZXh0KTtcblxuQGluY2x1ZGUgdGV4dC1lbXBoYXNpcy12YXJpYW50KCcudGV4dC13YXJuaW5nJywgJHN0YXRlLXdhcm5pbmctdGV4dCk7XG5cbkBpbmNsdWRlIHRleHQtZW1waGFzaXMtdmFyaWFudCgnLnRleHQtZGFuZ2VyJywgJHN0YXRlLWRhbmdlci10ZXh0KTtcblxuLy8gQ29udGV4dHVhbCBiYWNrZ3JvdW5kc1xuLy8gRm9yIG5vdyB3ZSdsbCBsZWF2ZSB0aGVzZSBhbG9uZ3NpZGUgdGhlIHRleHQgY2xhc3NlcyB1bnRpbCB2NCB3aGVuIHdlIGNhblxuLy8gc2FmZWx5IHNoaWZ0IHRoaW5ncyBhcm91bmQgKHBlciBTZW1WZXIgcnVsZXMpLlxuLmJnLXByaW1hcnkge1xuICAvLyBHaXZlbiB0aGUgY29udHJhc3QgaGVyZSwgdGhpcyBpcyB0aGUgb25seSBjbGFzcyB0byBoYXZlIGl0cyBjb2xvciBpbnZlcnRlZFxuICAvLyBhdXRvbWF0aWNhbGx5LlxuICBjb2xvcjogI2ZmZjtcbn1cbkBpbmNsdWRlIGJnLXZhcmlhbnQoJy5iZy1wcmltYXJ5JywgJGJyYW5kLXByaW1hcnkpO1xuXG5AaW5jbHVkZSBiZy12YXJpYW50KCcuYmctc3VjY2VzcycsICRzdGF0ZS1zdWNjZXNzLWJnKTtcblxuQGluY2x1ZGUgYmctdmFyaWFudCgnLmJnLWluZm8nLCAkc3RhdGUtaW5mby1iZyk7XG5cbkBpbmNsdWRlIGJnLXZhcmlhbnQoJy5iZy13YXJuaW5nJywgJHN0YXRlLXdhcm5pbmctYmcpO1xuXG5AaW5jbHVkZSBiZy12YXJpYW50KCcuYmctZGFuZ2VyJywgJHN0YXRlLWRhbmdlci1iZyk7XG5cblxuLy8gUGFnZSBoZWFkZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLnBhZ2UtaGVhZGVyIHtcbiAgcGFkZGluZy1ib3R0b206ICgoJGxpbmUtaGVpZ2h0LWNvbXB1dGVkIC8gMikgLSAxKTtcbiAgbWFyZ2luOiAoJGxpbmUtaGVpZ2h0LWNvbXB1dGVkICogMikgMCAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkcGFnZS1oZWFkZXItYm9yZGVyLWNvbG9yO1xufVxuXG5cbi8vIExpc3RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFVub3JkZXJlZCBhbmQgT3JkZXJlZCBsaXN0c1xudWwsXG5vbCB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206ICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgLyAyKTtcbiAgdWwsXG4gIG9sIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi8vIExpc3Qgb3B0aW9uc1xuXG4vLyBbY29udmVydGVyXSBleHRyYWN0ZWQgZnJvbSBgLmxpc3QtdW5zdHlsZWRgIGZvciBsaWJzYXNzIGNvbXBhdGliaWxpdHlcbkBtaXhpbiBsaXN0LXVuc3R5bGVkIHtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuLy8gW2NvbnZlcnRlcl0gZXh0cmFjdGVkIGFzIGBAbWl4aW4gbGlzdC11bnN0eWxlZGAgZm9yIGxpYnNhc3MgY29tcGF0aWJpbGl0eVxuLmxpc3QtdW5zdHlsZWQge1xuICBAaW5jbHVkZSBsaXN0LXVuc3R5bGVkO1xufVxuXG5cbi8vIElubGluZSB0dXJucyBsaXN0IGl0ZW1zIGludG8gaW5saW5lLWJsb2NrXG4ubGlzdC1pbmxpbmUge1xuICBAaW5jbHVkZSBsaXN0LXVuc3R5bGVkO1xuICBtYXJnaW4tbGVmdDogLTVweDtcblxuICA+IGxpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xuICB9XG59XG5cbi8vIERlc2NyaXB0aW9uIExpc3RzXG5kbCB7XG4gIG1hcmdpbi10b3A6IDA7IC8vIFJlbW92ZSBicm93c2VyIGRlZmF1bHRcbiAgbWFyZ2luLWJvdHRvbTogJGxpbmUtaGVpZ2h0LWNvbXB1dGVkO1xufVxuZHQsXG5kZCB7XG4gIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtYmFzZTtcbn1cbmR0IHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5kZCB7XG4gIG1hcmdpbi1sZWZ0OiAwOyAvLyBVbmRvIGJyb3dzZXIgZGVmYXVsdFxufVxuXG4vLyBIb3Jpem9udGFsIGRlc2NyaXB0aW9uIGxpc3RzXG4vL1xuLy8gRGVmYXVsdHMgdG8gYmVpbmcgc3RhY2tlZCB3aXRob3V0IGFueSBvZiB0aGUgYmVsb3cgc3R5bGVzIGFwcGxpZWQsIHVudGlsIHRoZVxuLy8gZ3JpZCBicmVha3BvaW50IGlzIHJlYWNoZWQgKGRlZmF1bHQgb2Ygfjc2OHB4KS5cblxuLmRsLWhvcml6b250YWwge1xuICBkZCB7XG4gICAgQGluY2x1ZGUgY2xlYXJmaXg7IC8vIENsZWFyIHRoZSBmbG9hdGVkIGBkdGAgaWYgYW4gZW1wdHkgYGRkYCBpcyBwcmVzZW50XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogJGRsLWhvcml6b250YWwtYnJlYWtwb2ludCkge1xuICAgIGR0IHtcbiAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgd2lkdGg6ICgkZGwtaG9yaXpvbnRhbC1vZmZzZXQgLSAyMCk7XG4gICAgICBjbGVhcjogbGVmdDtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgQGluY2x1ZGUgdGV4dC1vdmVyZmxvdztcbiAgICB9XG4gICAgZGQge1xuICAgICAgbWFyZ2luLWxlZnQ6ICRkbC1ob3Jpem9udGFsLW9mZnNldDtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBNaXNjXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEFiYnJldmlhdGlvbnMgYW5kIGFjcm9ueW1zXG5hYmJyW3RpdGxlXSxcbi8vIEFkZCBkYXRhLSogYXR0cmlidXRlIHRvIGhlbHAgb3V0IG91ciB0b29sdGlwIHBsdWdpbiwgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvNTI1N1xuYWJicltkYXRhLW9yaWdpbmFsLXRpdGxlXSB7XG4gIGN1cnNvcjogaGVscDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAkYWJici1ib3JkZXItY29sb3I7XG59XG4uaW5pdGlhbGlzbSB7XG4gIGZvbnQtc2l6ZTogOTAlO1xuICBAZXh0ZW5kIC50ZXh0LXVwcGVyY2FzZTtcbn1cblxuLy8gQmxvY2txdW90ZXNcbmJsb2NrcXVvdGUge1xuICBwYWRkaW5nOiAoJGxpbmUtaGVpZ2h0LWNvbXB1dGVkIC8gMikgJGxpbmUtaGVpZ2h0LWNvbXB1dGVkO1xuICBtYXJnaW46IDAgMCAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGZvbnQtc2l6ZTogJGJsb2NrcXVvdGUtZm9udC1zaXplO1xuICBib3JkZXItbGVmdDogNXB4IHNvbGlkICRibG9ja3F1b3RlLWJvcmRlci1jb2xvcjtcblxuICBwLFxuICB1bCxcbiAgb2wge1xuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbiAgfVxuXG4gIC8vIE5vdGU6IERlcHJlY2F0ZWQgc21hbGwgYW5kIC5zbWFsbCBhcyBvZiB2My4xLjBcbiAgLy8gQ29udGV4dDogaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xMTY2MFxuICBmb290ZXIsXG4gIHNtYWxsLFxuICAuc21hbGwge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogODAlOyAvLyBiYWNrIHRvIGRlZmF1bHQgZm9udC1zaXplXG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodC1iYXNlO1xuICAgIGNvbG9yOiAkYmxvY2txdW90ZS1zbWFsbC1jb2xvcjtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICdcXDIwMTQgXFwwMEEwJzsgLy8gZW0gZGFzaCwgbmJzcFxuICAgIH1cbiAgfVxufVxuXG4vLyBPcHBvc2l0ZSBhbGlnbm1lbnQgb2YgYmxvY2txdW90ZVxuLy9cbi8vIEhlYWRzIHVwOiBgYmxvY2txdW90ZS5wdWxsLXJpZ2h0YCBoYXMgYmVlbiBkZXByZWNhdGVkIGFzIG9mIHYzLjEuMC5cbi5ibG9ja3F1b3RlLXJldmVyc2UsXG5ibG9ja3F1b3RlLnB1bGwtcmlnaHQge1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIGJvcmRlci1yaWdodDogNXB4IHNvbGlkICRibG9ja3F1b3RlLWJvcmRlci1jb2xvcjtcbiAgYm9yZGVyLWxlZnQ6IDA7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuXG4gIC8vIEFjY291bnQgZm9yIGNpdGF0aW9uXG4gIGZvb3RlcixcbiAgc21hbGwsXG4gIC5zbWFsbCB7XG4gICAgJjpiZWZvcmUgeyBjb250ZW50OiAnJzsgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgY29udGVudDogJ1xcMDBBMCBcXDIwMTQnOyAvLyBuYnNwLCBlbSBkYXNoXG4gICAgfVxuICB9XG59XG5cbi8vIEFkZHJlc3Nlc1xuYWRkcmVzcyB7XG4gIG1hcmdpbi1ib3R0b206ICRsaW5lLWhlaWdodC1jb21wdXRlZDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWJhc2U7XG59XG4iLCIvL1xuLy8gQ29kZSAoaW5saW5lIGFuZCBibG9jaylcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gSW5saW5lIGFuZCBibG9jayBjb2RlIHN0eWxlc1xuY29kZSxcbmtiZCxcbnByZSxcbnNhbXAge1xuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LW1vbm9zcGFjZTtcbn1cblxuLy8gSW5saW5lIGNvZGVcbmNvZGUge1xuICBwYWRkaW5nOiAycHggNHB4O1xuICBmb250LXNpemU6IDkwJTtcbiAgY29sb3I6ICRjb2RlLWNvbG9yO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29kZS1iZztcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZTtcbn1cblxuLy8gVXNlciBpbnB1dCB0eXBpY2FsbHkgZW50ZXJlZCB2aWEga2V5Ym9hcmRcbmtiZCB7XG4gIHBhZGRpbmc6IDJweCA0cHg7XG4gIGZvbnQtc2l6ZTogOTAlO1xuICBjb2xvcjogJGtiZC1jb2xvcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGtiZC1iZztcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtc21hbGw7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgLTFweCAwIHJnYmEoMCwwLDAsLjI1KTtcblxuICBrYmQge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC1zaXplOiAxMDAlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cbn1cblxuLy8gQmxvY2tzIG9mIGNvZGVcbnByZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAoKCRsaW5lLWhlaWdodC1jb21wdXRlZCAtIDEpIC8gMik7XG4gIG1hcmdpbjogMCAwICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgLyAyKTtcbiAgZm9udC1zaXplOiAoJGZvbnQtc2l6ZS1iYXNlIC0gMSk7IC8vIDE0cHggdG8gMTNweFxuICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWJhc2U7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBjb2xvcjogJHByZS1jb2xvcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHByZS1iZztcbiAgYm9yZGVyOiAxcHggc29saWQgJHByZS1ib3JkZXItY29sb3I7XG4gIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzLWJhc2U7XG5cbiAgLy8gQWNjb3VudCBmb3Igc29tZSBjb2RlIG91dHB1dHMgdGhhdCBwbGFjZSBjb2RlIHRhZ3MgaW4gcHJlIHRhZ3NcbiAgY29kZSB7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cbn1cblxuLy8gRW5hYmxlIHNjcm9sbGFibGUgYmxvY2tzIG9mIGNvZGVcbi5wcmUtc2Nyb2xsYWJsZSB7XG4gIG1heC1oZWlnaHQ6ICRwcmUtc2Nyb2xsYWJsZS1tYXgtaGVpZ2h0O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG4iLCIvL1xuLy8gR3JpZCBzeXN0ZW1cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gQ29udGFpbmVyIHdpZHRoc1xuLy9cbi8vIFNldCB0aGUgY29udGFpbmVyIHdpZHRoLCBhbmQgb3ZlcnJpZGUgaXQgZm9yIGZpeGVkIG5hdmJhcnMgaW4gbWVkaWEgcXVlcmllcy5cblxuLmNvbnRhaW5lciB7XG4gIEBpbmNsdWRlIGNvbnRhaW5lci1maXhlZDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIHtcbiAgICB3aWR0aDogJGNvbnRhaW5lci1zbTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1tZC1taW4pIHtcbiAgICB3aWR0aDogJGNvbnRhaW5lci1tZDtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1sZy1taW4pIHtcbiAgICB3aWR0aDogJGNvbnRhaW5lci1sZztcbiAgfVxufVxuXG5cbi8vIEZsdWlkIGNvbnRhaW5lclxuLy9cbi8vIFV0aWxpemVzIHRoZSBtaXhpbiBtZWFudCBmb3IgZml4ZWQgd2lkdGggY29udGFpbmVycywgYnV0IHdpdGhvdXQgYW55IGRlZmluZWRcbi8vIHdpZHRoIGZvciBmbHVpZCwgZnVsbCB3aWR0aCBsYXlvdXRzLlxuXG4uY29udGFpbmVyLWZsdWlkIHtcbiAgQGluY2x1ZGUgY29udGFpbmVyLWZpeGVkO1xufVxuXG5cbi8vIFJvd1xuLy9cbi8vIFJvd3MgY29udGFpbiBhbmQgY2xlYXIgdGhlIGZsb2F0cyBvZiB5b3VyIGNvbHVtbnMuXG5cbi5yb3cge1xuICBAaW5jbHVkZSBtYWtlLXJvdztcbn1cblxuXG4vLyBDb2x1bW5zXG4vL1xuLy8gQ29tbW9uIHN0eWxlcyBmb3Igc21hbGwgYW5kIGxhcmdlIGdyaWQgY29sdW1uc1xuXG5AaW5jbHVkZSBtYWtlLWdyaWQtY29sdW1ucztcblxuXG4vLyBFeHRyYSBzbWFsbCBncmlkXG4vL1xuLy8gQ29sdW1ucywgb2Zmc2V0cywgcHVzaGVzLCBhbmQgcHVsbHMgZm9yIGV4dHJhIHNtYWxsIGRldmljZXMgbGlrZVxuLy8gc21hcnRwaG9uZXMuXG5cbkBpbmNsdWRlIG1ha2UtZ3JpZCh4cyk7XG5cblxuLy8gU21hbGwgZ3JpZFxuLy9cbi8vIENvbHVtbnMsIG9mZnNldHMsIHB1c2hlcywgYW5kIHB1bGxzIGZvciB0aGUgc21hbGwgZGV2aWNlIHJhbmdlLCBmcm9tIHBob25lc1xuLy8gdG8gdGFibGV0cy5cblxuQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSB7XG4gIEBpbmNsdWRlIG1ha2UtZ3JpZChzbSk7XG59XG5cblxuLy8gTWVkaXVtIGdyaWRcbi8vXG4vLyBDb2x1bW5zLCBvZmZzZXRzLCBwdXNoZXMsIGFuZCBwdWxscyBmb3IgdGhlIGRlc2t0b3AgZGV2aWNlIHJhbmdlLlxuXG5AbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1tZC1taW4pIHtcbiAgQGluY2x1ZGUgbWFrZS1ncmlkKG1kKTtcbn1cblxuXG4vLyBMYXJnZSBncmlkXG4vL1xuLy8gQ29sdW1ucywgb2Zmc2V0cywgcHVzaGVzLCBhbmQgcHVsbHMgZm9yIHRoZSBsYXJnZSBkZXNrdG9wIGRldmljZSByYW5nZS5cblxuQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tbGctbWluKSB7XG4gIEBpbmNsdWRlIG1ha2UtZ3JpZChsZyk7XG59XG4iLCIvL1xuLy8gVGFibGVzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbnRhYmxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHRhYmxlLWJnO1xufVxuY2FwdGlvbiB7XG4gIHBhZGRpbmctdG9wOiAkdGFibGUtY2VsbC1wYWRkaW5nO1xuICBwYWRkaW5nLWJvdHRvbTogJHRhYmxlLWNlbGwtcGFkZGluZztcbiAgY29sb3I6ICR0ZXh0LW11dGVkO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxudGgge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG5cbi8vIEJhc2VsaW5lIHN0eWxlc1xuXG4udGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIC8vIENlbGxzXG4gID4gdGhlYWQsXG4gID4gdGJvZHksXG4gID4gdGZvb3Qge1xuICAgID4gdHIge1xuICAgICAgPiB0aCxcbiAgICAgID4gdGQge1xuICAgICAgICBwYWRkaW5nOiAkdGFibGUtY2VsbC1wYWRkaW5nO1xuICAgICAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWJhc2U7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAkdGFibGUtYm9yZGVyLWNvbG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBCb3R0b20gYWxpZ24gZm9yIGNvbHVtbiBoZWFkaW5nc1xuICA+IHRoZWFkID4gdHIgPiB0aCB7XG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgJHRhYmxlLWJvcmRlci1jb2xvcjtcbiAgfVxuICAvLyBSZW1vdmUgdG9wIGJvcmRlciBmcm9tIHRoZWFkIGJ5IGRlZmF1bHRcbiAgPiBjYXB0aW9uICsgdGhlYWQsXG4gID4gY29sZ3JvdXAgKyB0aGVhZCxcbiAgPiB0aGVhZDpmaXJzdC1jaGlsZCB7XG4gICAgPiB0cjpmaXJzdC1jaGlsZCB7XG4gICAgICA+IHRoLFxuICAgICAgPiB0ZCB7XG4gICAgICAgIGJvcmRlci10b3A6IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIEFjY291bnQgZm9yIG11bHRpcGxlIHRib2R5IGluc3RhbmNlc1xuICA+IHRib2R5ICsgdGJvZHkge1xuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCAkdGFibGUtYm9yZGVyLWNvbG9yO1xuICB9XG5cbiAgLy8gTmVzdGluZ1xuICAudGFibGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRib2R5LWJnO1xuICB9XG59XG5cblxuLy8gQ29uZGVuc2VkIHRhYmxlIHcvIGhhbGYgcGFkZGluZ1xuXG4udGFibGUtY29uZGVuc2VkIHtcbiAgPiB0aGVhZCxcbiAgPiB0Ym9keSxcbiAgPiB0Zm9vdCB7XG4gICAgPiB0ciB7XG4gICAgICA+IHRoLFxuICAgICAgPiB0ZCB7XG4gICAgICAgIHBhZGRpbmc6ICR0YWJsZS1jb25kZW5zZWQtY2VsbC1wYWRkaW5nO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbi8vIEJvcmRlcmVkIHZlcnNpb25cbi8vXG4vLyBBZGQgYm9yZGVycyBhbGwgYXJvdW5kIHRoZSB0YWJsZSBhbmQgYmV0d2VlbiBhbGwgdGhlIGNvbHVtbnMuXG5cbi50YWJsZS1ib3JkZXJlZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICR0YWJsZS1ib3JkZXItY29sb3I7XG4gID4gdGhlYWQsXG4gID4gdGJvZHksXG4gID4gdGZvb3Qge1xuICAgID4gdHIge1xuICAgICAgPiB0aCxcbiAgICAgID4gdGQge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkdGFibGUtYm9yZGVyLWNvbG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICA+IHRoZWFkID4gdHIge1xuICAgID4gdGgsXG4gICAgPiB0ZCB7XG4gICAgICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XG4gICAgfVxuICB9XG59XG5cblxuLy8gWmVicmEtc3RyaXBpbmdcbi8vXG4vLyBEZWZhdWx0IHplYnJhLXN0cmlwZSBzdHlsZXMgKGFsdGVybmF0aW5nIGdyYXkgYW5kIHRyYW5zcGFyZW50IGJhY2tncm91bmRzKVxuXG4udGFibGUtc3RyaXBlZCB7XG4gID4gdGJvZHkgPiB0cjpudGgtb2YtdHlwZShvZGQpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdGFibGUtYmctYWNjZW50O1xuICB9XG59XG5cblxuLy8gSG92ZXIgZWZmZWN0XG4vL1xuLy8gUGxhY2VkIGhlcmUgc2luY2UgaXQgaGFzIHRvIGNvbWUgYWZ0ZXIgdGhlIHBvdGVudGlhbCB6ZWJyYSBzdHJpcGluZ1xuXG4udGFibGUtaG92ZXIge1xuICA+IHRib2R5ID4gdHI6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR0YWJsZS1iZy1ob3ZlcjtcbiAgfVxufVxuXG5cbi8vIFRhYmxlIGNlbGwgc2l6aW5nXG4vL1xuLy8gUmVzZXQgZGVmYXVsdCB0YWJsZSBiZWhhdmlvclxuXG50YWJsZSBjb2xbY2xhc3MqPVwiY29sLVwiXSB7XG4gIHBvc2l0aW9uOiBzdGF0aWM7IC8vIFByZXZlbnQgYm9yZGVyIGhpZGluZyBpbiBGaXJlZm94IGFuZCBJRTktMTEgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzExNjIzKVxuICBmbG9hdDogbm9uZTtcbiAgZGlzcGxheTogdGFibGUtY29sdW1uO1xufVxudGFibGUge1xuICB0ZCxcbiAgdGgge1xuICAgICZbY2xhc3MqPVwiY29sLVwiXSB7XG4gICAgICBwb3NpdGlvbjogc3RhdGljOyAvLyBQcmV2ZW50IGJvcmRlciBoaWRpbmcgaW4gRmlyZWZveCBhbmQgSUU5LTExIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xMTYyMylcbiAgICAgIGZsb2F0OiBub25lO1xuICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBUYWJsZSBiYWNrZ3JvdW5kc1xuLy9cbi8vIEV4YWN0IHNlbGVjdG9ycyBiZWxvdyByZXF1aXJlZCB0byBvdmVycmlkZSBgLnRhYmxlLXN0cmlwZWRgIGFuZCBwcmV2ZW50XG4vLyBpbmhlcml0YW5jZSB0byBuZXN0ZWQgdGFibGVzLlxuXG4vLyBHZW5lcmF0ZSB0aGUgY29udGV4dHVhbCB2YXJpYW50c1xuQGluY2x1ZGUgdGFibGUtcm93LXZhcmlhbnQoJ2FjdGl2ZScsICR0YWJsZS1iZy1hY3RpdmUpO1xuQGluY2x1ZGUgdGFibGUtcm93LXZhcmlhbnQoJ3N1Y2Nlc3MnLCAkc3RhdGUtc3VjY2Vzcy1iZyk7XG5AaW5jbHVkZSB0YWJsZS1yb3ctdmFyaWFudCgnaW5mbycsICRzdGF0ZS1pbmZvLWJnKTtcbkBpbmNsdWRlIHRhYmxlLXJvdy12YXJpYW50KCd3YXJuaW5nJywgJHN0YXRlLXdhcm5pbmctYmcpO1xuQGluY2x1ZGUgdGFibGUtcm93LXZhcmlhbnQoJ2RhbmdlcicsICRzdGF0ZS1kYW5nZXItYmcpO1xuXG5cbi8vIFJlc3BvbnNpdmUgdGFibGVzXG4vL1xuLy8gV3JhcCB5b3VyIHRhYmxlcyBpbiBgLnRhYmxlLXJlc3BvbnNpdmVgIGFuZCB3ZSdsbCBtYWtlIHRoZW0gbW9iaWxlIGZyaWVuZGx5XG4vLyBieSBlbmFibGluZyBob3Jpem9udGFsIHNjcm9sbGluZy4gT25seSBhcHBsaWVzIDw3NjhweC4gRXZlcnl0aGluZyBhYm92ZSB0aGF0XG4vLyB3aWxsIGRpc3BsYXkgbm9ybWFsbHkuXG5cbi50YWJsZS1yZXNwb25zaXZlIHtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgbWluLWhlaWdodDogMC4wMSU7IC8vIFdvcmthcm91bmQgZm9yIElFOSBidWcgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzE0ODM3KVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRzY3JlZW4teHMtbWF4KSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogKCRsaW5lLWhlaWdodC1jb21wdXRlZCAqIDAuNzUpO1xuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAtbXMtb3ZlcmZsb3ctc3R5bGU6IC1tcy1hdXRvaGlkaW5nLXNjcm9sbGJhcjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkdGFibGUtYm9yZGVyLWNvbG9yO1xuXG4gICAgLy8gVGlnaHRlbiB1cCBzcGFjaW5nXG4gICAgPiAudGFibGUge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcblxuICAgICAgLy8gRW5zdXJlIHRoZSBjb250ZW50IGRvZXNuJ3Qgd3JhcFxuICAgICAgPiB0aGVhZCxcbiAgICAgID4gdGJvZHksXG4gICAgICA+IHRmb290IHtcbiAgICAgICAgPiB0ciB7XG4gICAgICAgICAgPiB0aCxcbiAgICAgICAgICA+IHRkIHtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3BlY2lhbCBvdmVycmlkZXMgZm9yIHRoZSBib3JkZXJlZCB0YWJsZXNcbiAgICA+IC50YWJsZS1ib3JkZXJlZCB7XG4gICAgICBib3JkZXI6IDA7XG5cbiAgICAgIC8vIE51a2UgdGhlIGFwcHJvcHJpYXRlIGJvcmRlcnMgc28gdGhhdCB0aGUgcGFyZW50IGNhbiBoYW5kbGUgdGhlbVxuICAgICAgPiB0aGVhZCxcbiAgICAgID4gdGJvZHksXG4gICAgICA+IHRmb290IHtcbiAgICAgICAgPiB0ciB7XG4gICAgICAgICAgPiB0aDpmaXJzdC1jaGlsZCxcbiAgICAgICAgICA+IHRkOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICA+IHRoOmxhc3QtY2hpbGQsXG4gICAgICAgICAgPiB0ZDpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT25seSBudWtlIHRoZSBsYXN0IHJvdydzIGJvdHRvbS1ib3JkZXIgaW4gYHRib2R5YCBhbmQgYHRmb290YCBzaW5jZVxuICAgICAgLy8gY2hhbmNlcyBhcmUgdGhlcmUgd2lsbCBiZSBvbmx5IG9uZSBgdHJgIGluIGEgYHRoZWFkYCBhbmQgdGhhdCB3b3VsZFxuICAgICAgLy8gcmVtb3ZlIHRoZSBib3JkZXIgYWx0b2dldGhlci5cbiAgICAgID4gdGJvZHksXG4gICAgICA+IHRmb290IHtcbiAgICAgICAgPiB0cjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICA+IHRoLFxuICAgICAgICAgID4gdGQge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cbiAgfVxufVxuIiwiLy9cbi8vIEZvcm1zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIE5vcm1hbGl6ZSBub24tY29udHJvbHNcbi8vXG4vLyBSZXN0eWxlIGFuZCBiYXNlbGluZSBub24tY29udHJvbCBmb3JtIGVsZW1lbnRzLlxuXG5maWVsZHNldCB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyOiAwO1xuICAvLyBDaHJvbWUgYW5kIEZpcmVmb3ggc2V0IGEgYG1pbi13aWR0aDogbWluLWNvbnRlbnQ7YCBvbiBmaWVsZHNldHMsXG4gIC8vIHNvIHdlIHJlc2V0IHRoYXQgdG8gZW5zdXJlIGl0IGJlaGF2ZXMgbW9yZSBsaWtlIGEgc3RhbmRhcmQgYmxvY2sgZWxlbWVudC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMTIzNTkuXG4gIG1pbi13aWR0aDogMDtcbn1cblxubGVnZW5kIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGZvbnQtc2l6ZTogKCRmb250LXNpemUtYmFzZSAqIDEuNSk7XG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICBjb2xvcjogJGxlZ2VuZC1jb2xvcjtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGxlZ2VuZC1ib3JkZXItY29sb3I7XG59XG5cbmxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXgtd2lkdGg6IDEwMCU7IC8vIEZvcmNlIElFOCB0byB3cmFwIGxvbmcgY29udGVudCAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMTMxNDEpXG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cblxuLy8gTm9ybWFsaXplIGZvcm0gY29udHJvbHNcbi8vXG4vLyBXaGlsZSBtb3N0IG9mIG91ciBmb3JtIHN0eWxlcyByZXF1aXJlIGV4dHJhIGNsYXNzZXMsIHNvbWUgYmFzaWMgbm9ybWFsaXphdGlvblxuLy8gaXMgcmVxdWlyZWQgdG8gZW5zdXJlIG9wdGltdW0gZGlzcGxheSB3aXRoIG9yIHdpdGhvdXQgdGhvc2UgY2xhc3NlcyB0byBiZXR0ZXJcbi8vIGFkZHJlc3MgYnJvd3NlciBpbmNvbnNpc3RlbmNpZXMuXG5cbi8vIE92ZXJyaWRlIGNvbnRlbnQtYm94IGluIE5vcm1hbGl6ZSAoKiBpc24ndCBzcGVjaWZpYyBlbm91Z2gpXG5pbnB1dFt0eXBlPVwic2VhcmNoXCJdIHtcbiAgQGluY2x1ZGUgYm94LXNpemluZyhib3JkZXItYm94KTtcbn1cblxuLy8gUG9zaXRpb24gcmFkaW9zIGFuZCBjaGVja2JveGVzIGJldHRlclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdLFxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdIHtcbiAgbWFyZ2luOiA0cHggMCAwO1xuICBtYXJnaW4tdG9wOiAxcHggXFw5OyAvLyBJRTgtOVxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xufVxuXG5pbnB1dFt0eXBlPVwiZmlsZVwiXSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vLyBNYWtlIHJhbmdlIGlucHV0cyBiZWhhdmUgbGlrZSB0ZXh0dWFsIGZvcm0gY29udHJvbHNcbmlucHV0W3R5cGU9XCJyYW5nZVwiXSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLy8gTWFrZSBtdWx0aXBsZSBzZWxlY3QgZWxlbWVudHMgaGVpZ2h0IG5vdCBmaXhlZFxuc2VsZWN0W211bHRpcGxlXSxcbnNlbGVjdFtzaXplXSB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLy8gRm9jdXMgZm9yIGZpbGUsIHJhZGlvLCBhbmQgY2hlY2tib3hcbmlucHV0W3R5cGU9XCJmaWxlXCJdOmZvY3VzLFxuaW5wdXRbdHlwZT1cInJhZGlvXCJdOmZvY3VzLFxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmZvY3VzIHtcbiAgQGluY2x1ZGUgdGFiLWZvY3VzO1xufVxuXG4vLyBBZGp1c3Qgb3V0cHV0IGVsZW1lbnRcbm91dHB1dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nLXRvcDogKCRwYWRkaW5nLWJhc2UtdmVydGljYWwgKyAxKTtcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLWJhc2U7XG4gIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtYmFzZTtcbiAgY29sb3I6ICRpbnB1dC1jb2xvcjtcbn1cblxuXG4vLyBDb21tb24gZm9ybSBjb250cm9sc1xuLy9cbi8vIFNoYXJlZCBzaXplIGFuZCB0eXBlIHJlc2V0cyBmb3IgZm9ybSBjb250cm9scy4gQXBwbHkgYC5mb3JtLWNvbnRyb2xgIHRvIGFueVxuLy8gb2YgdGhlIGZvbGxvd2luZyBmb3JtIGNvbnRyb2xzOlxuLy9cbi8vIHNlbGVjdFxuLy8gdGV4dGFyZWFcbi8vIGlucHV0W3R5cGU9XCJ0ZXh0XCJdXG4vLyBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl1cbi8vIGlucHV0W3R5cGU9XCJkYXRldGltZVwiXVxuLy8gaW5wdXRbdHlwZT1cImRhdGV0aW1lLWxvY2FsXCJdXG4vLyBpbnB1dFt0eXBlPVwiZGF0ZVwiXVxuLy8gaW5wdXRbdHlwZT1cIm1vbnRoXCJdXG4vLyBpbnB1dFt0eXBlPVwidGltZVwiXVxuLy8gaW5wdXRbdHlwZT1cIndlZWtcIl1cbi8vIGlucHV0W3R5cGU9XCJudW1iZXJcIl1cbi8vIGlucHV0W3R5cGU9XCJlbWFpbFwiXVxuLy8gaW5wdXRbdHlwZT1cInVybFwiXVxuLy8gaW5wdXRbdHlwZT1cInNlYXJjaFwiXVxuLy8gaW5wdXRbdHlwZT1cInRlbFwiXVxuLy8gaW5wdXRbdHlwZT1cImNvbG9yXCJdXG5cbi5mb3JtLWNvbnRyb2wge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogJGlucHV0LWhlaWdodC1iYXNlOyAvLyBNYWtlIGlucHV0cyBhdCBsZWFzdCB0aGUgaGVpZ2h0IG9mIHRoZWlyIGJ1dHRvbiBjb3VudGVycGFydCAoYmFzZSBsaW5lLWhlaWdodCArIHBhZGRpbmcgKyBib3JkZXIpXG4gIHBhZGRpbmc6ICRwYWRkaW5nLWJhc2UtdmVydGljYWwgJHBhZGRpbmctYmFzZS1ob3Jpem9udGFsO1xuICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcbiAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodC1iYXNlO1xuICBjb2xvcjogJGlucHV0LWNvbG9yO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkaW5wdXQtYmc7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7IC8vIFJlc2V0IHVudXN1YWwgRmlyZWZveC1vbi1BbmRyb2lkIGRlZmF1bHQgc3R5bGU7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzL2lzc3Vlcy8yMTRcbiAgYm9yZGVyOiAxcHggc29saWQgJGlucHV0LWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogJGlucHV0LWJvcmRlci1yYWRpdXM7IC8vIE5vdGU6IFRoaXMgaGFzIG5vIGVmZmVjdCBvbiA8c2VsZWN0PnMgaW4gc29tZSBicm93c2VycywgZHVlIHRvIHRoZSBsaW1pdGVkIHN0eWxhYmlsaXR5IG9mIDxzZWxlY3Q+cyBpbiBDU1MuXG4gIEBpbmNsdWRlIGJveC1zaGFkb3coaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSkpO1xuICBAaW5jbHVkZSB0cmFuc2l0aW9uKGJvcmRlci1jb2xvciBlYXNlLWluLW91dCAuMTVzLCBib3gtc2hhZG93IGVhc2UtaW4tb3V0IC4xNXMpO1xuXG4gIC8vIEN1c3RvbWl6ZSB0aGUgYDpmb2N1c2Agc3RhdGUgdG8gaW1pdGF0ZSBuYXRpdmUgV2ViS2l0IHN0eWxlcy5cbiAgQGluY2x1ZGUgZm9ybS1jb250cm9sLWZvY3VzO1xuXG4gIC8vIFBsYWNlaG9sZGVyXG4gIEBpbmNsdWRlIHBsYWNlaG9sZGVyO1xuXG4gIC8vIFVuc3R5bGUgdGhlIGNhcmV0IG9uIGA8c2VsZWN0PmBzIGluIElFMTArLlxuICAmOjotbXMtZXhwYW5kIHtcbiAgICBib3JkZXI6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAvLyBEaXNhYmxlZCBhbmQgcmVhZC1vbmx5IGlucHV0c1xuICAvL1xuICAvLyBIVE1MNSBzYXlzIHRoYXQgY29udHJvbHMgdW5kZXIgYSBmaWVsZHNldCA+IGxlZ2VuZDpmaXJzdC1jaGlsZCB3b24ndCBiZVxuICAvLyBkaXNhYmxlZCBpZiB0aGUgZmllbGRzZXQgaXMgZGlzYWJsZWQuIER1ZSB0byBpbXBsZW1lbnRhdGlvbiBkaWZmaWN1bHR5LCB3ZVxuICAvLyBkb24ndCBob25vciB0aGF0IGVkZ2UgY2FzZTsgd2Ugc3R5bGUgdGhlbSBhcyBkaXNhYmxlZCBhbnl3YXkuXG4gICZbZGlzYWJsZWRdLFxuICAmW3JlYWRvbmx5XSxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRpbnB1dC1iZy1kaXNhYmxlZDtcbiAgICBvcGFjaXR5OiAxOyAvLyBpT1MgZml4IGZvciB1bnJlYWRhYmxlIGRpc2FibGVkIGNvbnRlbnQ7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzExNjU1XG4gIH1cblxuICAmW2Rpc2FibGVkXSxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgIGN1cnNvcjogJGN1cnNvci1kaXNhYmxlZDtcbiAgfVxuXG4gIC8vIFtjb252ZXJ0ZXJdIGV4dHJhY3RlZCB0ZXh0YXJlYSYgdG8gdGV4dGFyZWEuZm9ybS1jb250cm9sXG59XG5cbi8vIFJlc2V0IGhlaWdodCBmb3IgYHRleHRhcmVhYHNcbnRleHRhcmVhLmZvcm0tY29udHJvbCB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuXG4vLyBTZWFyY2ggaW5wdXRzIGluIGlPU1xuLy9cbi8vIFRoaXMgb3ZlcnJpZGVzIHRoZSBleHRyYSByb3VuZGVkIGNvcm5lcnMgb24gc2VhcmNoIGlucHV0cyBpbiBpT1Mgc28gdGhhdCBvdXJcbi8vIGAuZm9ybS1jb250cm9sYCBjbGFzcyBjYW4gcHJvcGVybHkgc3R5bGUgdGhlbS4gTm90ZSB0aGF0IHRoaXMgY2Fubm90IHNpbXBseVxuLy8gYmUgYWRkZWQgdG8gYC5mb3JtLWNvbnRyb2xgIGFzIGl0J3Mgbm90IHNwZWNpZmljIGVub3VnaC4gRm9yIGRldGFpbHMsIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xMTU4Ni5cblxuaW5wdXRbdHlwZT1cInNlYXJjaFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuXG4vLyBTcGVjaWFsIHN0eWxlcyBmb3IgaU9TIHRlbXBvcmFsIGlucHV0c1xuLy9cbi8vIEluIE1vYmlsZSBTYWZhcmksIHNldHRpbmcgYGRpc3BsYXk6IGJsb2NrYCBvbiB0ZW1wb3JhbCBpbnB1dHMgY2F1c2VzIHRoZVxuLy8gdGV4dCB3aXRoaW4gdGhlIGlucHV0IHRvIGJlY29tZSB2ZXJ0aWNhbGx5IG1pc2FsaWduZWQuIEFzIGEgd29ya2Fyb3VuZCwgd2Vcbi8vIHNldCBhIHBpeGVsIGxpbmUtaGVpZ2h0IHRoYXQgbWF0Y2hlcyB0aGUgZ2l2ZW4gaGVpZ2h0IG9mIHRoZSBpbnB1dCwgYnV0IG9ubHlcbi8vIGZvciBTYWZhcmkuIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM5ODQ4XG4vL1xuLy8gTm90ZSB0aGF0IGFzIG9mIDguMywgaU9TIGRvZXNuJ3Qgc3VwcG9ydCBgZGF0ZXRpbWVgIG9yIGB3ZWVrYC5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMCkge1xuICBpbnB1dFt0eXBlPVwiZGF0ZVwiXSxcbiAgaW5wdXRbdHlwZT1cInRpbWVcIl0sXG4gIGlucHV0W3R5cGU9XCJkYXRldGltZS1sb2NhbFwiXSxcbiAgaW5wdXRbdHlwZT1cIm1vbnRoXCJdIHtcbiAgICAmLmZvcm0tY29udHJvbCB7XG4gICAgICBsaW5lLWhlaWdodDogJGlucHV0LWhlaWdodC1iYXNlO1xuICAgIH1cblxuICAgICYuaW5wdXQtc20sXG4gICAgLmlucHV0LWdyb3VwLXNtICYge1xuICAgICAgbGluZS1oZWlnaHQ6ICRpbnB1dC1oZWlnaHQtc21hbGw7XG4gICAgfVxuXG4gICAgJi5pbnB1dC1sZyxcbiAgICAuaW5wdXQtZ3JvdXAtbGcgJiB7XG4gICAgICBsaW5lLWhlaWdodDogJGlucHV0LWhlaWdodC1sYXJnZTtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBGb3JtIGdyb3Vwc1xuLy9cbi8vIERlc2lnbmVkIHRvIGhlbHAgd2l0aCB0aGUgb3JnYW5pemF0aW9uIGFuZCBzcGFjaW5nIG9mIHZlcnRpY2FsIGZvcm1zLiBGb3Jcbi8vIGhvcml6b250YWwgZm9ybXMsIHVzZSB0aGUgcHJlZGVmaW5lZCBncmlkIGNsYXNzZXMuXG5cbi5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogJGZvcm0tZ3JvdXAtbWFyZ2luLWJvdHRvbTtcbn1cblxuXG4vLyBDaGVja2JveGVzIGFuZCByYWRpb3Ncbi8vXG4vLyBJbmRlbnQgdGhlIGxhYmVscyB0byBwb3NpdGlvbiByYWRpb3MvY2hlY2tib3hlcyBhcyBoYW5naW5nIGNvbnRyb2xzLlxuXG4ucmFkaW8sXG4uY2hlY2tib3gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuXG4gIGxhYmVsIHtcbiAgICBtaW4taGVpZ2h0OiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7IC8vIEVuc3VyZSB0aGUgaW5wdXQgZG9lc24ndCBqdW1wIHdoZW4gdGhlcmUgaXMgbm8gdGV4dFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59XG4ucmFkaW8gaW5wdXRbdHlwZT1cInJhZGlvXCJdLFxuLnJhZGlvLWlubGluZSBpbnB1dFt0eXBlPVwicmFkaW9cIl0sXG4uY2hlY2tib3ggaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLFxuLmNoZWNrYm94LWlubGluZSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG1hcmdpbi1sZWZ0OiAtMjBweDtcbiAgbWFyZ2luLXRvcDogNHB4IFxcOTtcbn1cblxuLnJhZGlvICsgLnJhZGlvLFxuLmNoZWNrYm94ICsgLmNoZWNrYm94IHtcbiAgbWFyZ2luLXRvcDogLTVweDsgLy8gTW92ZSB1cCBzaWJsaW5nIHJhZGlvcyBvciBjaGVja2JveGVzIGZvciB0aWdodGVyIHNwYWNpbmdcbn1cblxuLy8gUmFkaW9zIGFuZCBjaGVja2JveGVzIG9uIHNhbWUgbGluZVxuLnJhZGlvLWlubGluZSxcbi5jaGVja2JveC1pbmxpbmUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4ucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbi5jaGVja2JveC1pbmxpbmUgKyAuY2hlY2tib3gtaW5saW5lIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7IC8vIHNwYWNlIG91dCBjb25zZWN1dGl2ZSBpbmxpbmUgY29udHJvbHNcbn1cblxuLy8gQXBwbHkgc2FtZSBkaXNhYmxlZCBjdXJzb3IgdHdlYWsgYXMgZm9yIGlucHV0c1xuLy8gU29tZSBzcGVjaWFsIGNhcmUgaXMgbmVlZGVkIGJlY2F1c2UgPGxhYmVsPnMgZG9uJ3QgaW5oZXJpdCB0aGVpciBwYXJlbnQncyBgY3Vyc29yYC5cbi8vXG4vLyBOb3RlOiBOZWl0aGVyIHJhZGlvcyBub3IgY2hlY2tib3hlcyBjYW4gYmUgcmVhZG9ubHkuXG5pbnB1dFt0eXBlPVwicmFkaW9cIl0sXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0ge1xuICAmW2Rpc2FibGVkXSxcbiAgJi5kaXNhYmxlZCxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgIGN1cnNvcjogJGN1cnNvci1kaXNhYmxlZDtcbiAgfVxufVxuLy8gVGhlc2UgY2xhc3NlcyBhcmUgdXNlZCBkaXJlY3RseSBvbiA8bGFiZWw+c1xuLnJhZGlvLWlubGluZSxcbi5jaGVja2JveC1pbmxpbmUge1xuICAmLmRpc2FibGVkLFxuICBmaWVsZHNldFtkaXNhYmxlZF0gJiB7XG4gICAgY3Vyc29yOiAkY3Vyc29yLWRpc2FibGVkO1xuICB9XG59XG4vLyBUaGVzZSBjbGFzc2VzIGFyZSB1c2VkIG9uIGVsZW1lbnRzIHdpdGggPGxhYmVsPiBkZXNjZW5kYW50c1xuLnJhZGlvLFxuLmNoZWNrYm94IHtcbiAgJi5kaXNhYmxlZCxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgIGxhYmVsIHtcbiAgICAgIGN1cnNvcjogJGN1cnNvci1kaXNhYmxlZDtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBTdGF0aWMgZm9ybSBjb250cm9sIHRleHRcbi8vXG4vLyBBcHBseSBjbGFzcyB0byBhIGBwYCBlbGVtZW50IHRvIG1ha2UgYW55IHN0cmluZyBvZiB0ZXh0IGFsaWduIHdpdGggbGFiZWxzIGluXG4vLyBhIGhvcml6b250YWwgZm9ybSBsYXlvdXQuXG5cbi5mb3JtLWNvbnRyb2wtc3RhdGljIHtcbiAgLy8gU2l6ZSBpdCBhcHByb3ByaWF0ZWx5IG5leHQgdG8gcmVhbCBmb3JtIGNvbnRyb2xzXG4gIHBhZGRpbmctdG9wOiAoJHBhZGRpbmctYmFzZS12ZXJ0aWNhbCArIDEpO1xuICBwYWRkaW5nLWJvdHRvbTogKCRwYWRkaW5nLWJhc2UtdmVydGljYWwgKyAxKTtcbiAgLy8gUmVtb3ZlIGRlZmF1bHQgbWFyZ2luIGZyb20gYHBgXG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIG1pbi1oZWlnaHQ6ICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgKyAkZm9udC1zaXplLWJhc2UpO1xuXG4gICYuaW5wdXQtbGcsXG4gICYuaW5wdXQtc20ge1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICB9XG59XG5cblxuLy8gRm9ybSBjb250cm9sIHNpemluZ1xuLy9cbi8vIEJ1aWxkIG9uIGAuZm9ybS1jb250cm9sYCB3aXRoIG1vZGlmaWVyIGNsYXNzZXMgdG8gZGVjcmVhc2Ugb3IgaW5jcmVhc2UgdGhlXG4vLyBoZWlnaHQgYW5kIGZvbnQtc2l6ZSBvZiBmb3JtIGNvbnRyb2xzLlxuLy9cbi8vIFRoZSBgLmZvcm0tZ3JvdXAtKiBmb3JtLWNvbnRyb2xgIHZhcmlhdGlvbnMgYXJlIHNhZGx5IGR1cGxpY2F0ZWQgdG8gYXZvaWQgdGhlXG4vLyBpc3N1ZSBkb2N1bWVudGVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMTUwNzQuXG5cbkBpbmNsdWRlIGlucHV0LXNpemUoJy5pbnB1dC1zbScsICRpbnB1dC1oZWlnaHQtc21hbGwsICRwYWRkaW5nLXNtYWxsLXZlcnRpY2FsLCAkcGFkZGluZy1zbWFsbC1ob3Jpem9udGFsLCAkZm9udC1zaXplLXNtYWxsLCAkbGluZS1oZWlnaHQtc21hbGwsICRpbnB1dC1ib3JkZXItcmFkaXVzLXNtYWxsKTtcbi5mb3JtLWdyb3VwLXNtIHtcbiAgLmZvcm0tY29udHJvbCB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LXNtYWxsO1xuICAgIHBhZGRpbmc6ICRwYWRkaW5nLXNtYWxsLXZlcnRpY2FsICRwYWRkaW5nLXNtYWxsLWhvcml6b250YWw7XG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplLXNtYWxsO1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtc21hbGw7XG4gICAgYm9yZGVyLXJhZGl1czogJGlucHV0LWJvcmRlci1yYWRpdXMtc21hbGw7XG4gIH1cbiAgc2VsZWN0LmZvcm0tY29udHJvbCB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LXNtYWxsO1xuICAgIGxpbmUtaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LXNtYWxsO1xuICB9XG4gIHRleHRhcmVhLmZvcm0tY29udHJvbCxcbiAgc2VsZWN0W211bHRpcGxlXS5mb3JtLWNvbnRyb2wge1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxuICAuZm9ybS1jb250cm9sLXN0YXRpYyB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LXNtYWxsO1xuICAgIG1pbi1oZWlnaHQ6ICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgKyAkZm9udC1zaXplLXNtYWxsKTtcbiAgICBwYWRkaW5nOiAoJHBhZGRpbmctc21hbGwtdmVydGljYWwgKyAxKSAkcGFkZGluZy1zbWFsbC1ob3Jpem9udGFsO1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LXNtYWxsO1xuICB9XG59XG5cbkBpbmNsdWRlIGlucHV0LXNpemUoJy5pbnB1dC1sZycsICRpbnB1dC1oZWlnaHQtbGFyZ2UsICRwYWRkaW5nLWxhcmdlLXZlcnRpY2FsLCAkcGFkZGluZy1sYXJnZS1ob3Jpem9udGFsLCAkZm9udC1zaXplLWxhcmdlLCAkbGluZS1oZWlnaHQtbGFyZ2UsICRpbnB1dC1ib3JkZXItcmFkaXVzLWxhcmdlKTtcbi5mb3JtLWdyb3VwLWxnIHtcbiAgLmZvcm0tY29udHJvbCB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LWxhcmdlO1xuICAgIHBhZGRpbmc6ICRwYWRkaW5nLWxhcmdlLXZlcnRpY2FsICRwYWRkaW5nLWxhcmdlLWhvcml6b250YWw7XG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplLWxhcmdlO1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtbGFyZ2U7XG4gICAgYm9yZGVyLXJhZGl1czogJGlucHV0LWJvcmRlci1yYWRpdXMtbGFyZ2U7XG4gIH1cbiAgc2VsZWN0LmZvcm0tY29udHJvbCB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LWxhcmdlO1xuICAgIGxpbmUtaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LWxhcmdlO1xuICB9XG4gIHRleHRhcmVhLmZvcm0tY29udHJvbCxcbiAgc2VsZWN0W211bHRpcGxlXS5mb3JtLWNvbnRyb2wge1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxuICAuZm9ybS1jb250cm9sLXN0YXRpYyB7XG4gICAgaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LWxhcmdlO1xuICAgIG1pbi1oZWlnaHQ6ICgkbGluZS1oZWlnaHQtY29tcHV0ZWQgKyAkZm9udC1zaXplLWxhcmdlKTtcbiAgICBwYWRkaW5nOiAoJHBhZGRpbmctbGFyZ2UtdmVydGljYWwgKyAxKSAkcGFkZGluZy1sYXJnZS1ob3Jpem9udGFsO1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWxhcmdlO1xuICB9XG59XG5cblxuLy8gRm9ybSBjb250cm9sIGZlZWRiYWNrIHN0YXRlc1xuLy9cbi8vIEFwcGx5IGNvbnRleHR1YWwgYW5kIHNlbWFudGljIHN0YXRlcyB0byBpbmRpdmlkdWFsIGZvcm0gY29udHJvbHMuXG5cbi5oYXMtZmVlZGJhY2sge1xuICAvLyBFbmFibGUgYWJzb2x1dGUgcG9zaXRpb25pbmdcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIC8vIEVuc3VyZSBpY29ucyBkb24ndCBvdmVybGFwIHRleHRcbiAgLmZvcm0tY29udHJvbCB7XG4gICAgcGFkZGluZy1yaWdodDogKCRpbnB1dC1oZWlnaHQtYmFzZSAqIDEuMjUpO1xuICB9XG59XG4vLyBGZWVkYmFjayBpY29uIChyZXF1aXJlcyAuZ2x5cGhpY29uIGNsYXNzZXMpXG4uZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAyOyAvLyBFbnN1cmUgaWNvbiBpcyBhYm92ZSBpbnB1dCBncm91cHNcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAkaW5wdXQtaGVpZ2h0LWJhc2U7XG4gIGhlaWdodDogJGlucHV0LWhlaWdodC1iYXNlO1xuICBsaW5lLWhlaWdodDogJGlucHV0LWhlaWdodC1iYXNlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmlucHV0LWxnICsgLmZvcm0tY29udHJvbC1mZWVkYmFjayxcbi5pbnB1dC1ncm91cC1sZyArIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2ssXG4uZm9ybS1ncm91cC1sZyAuZm9ybS1jb250cm9sICsgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XG4gIHdpZHRoOiAkaW5wdXQtaGVpZ2h0LWxhcmdlO1xuICBoZWlnaHQ6ICRpbnB1dC1oZWlnaHQtbGFyZ2U7XG4gIGxpbmUtaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LWxhcmdlO1xufVxuLmlucHV0LXNtICsgLmZvcm0tY29udHJvbC1mZWVkYmFjayxcbi5pbnB1dC1ncm91cC1zbSArIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2ssXG4uZm9ybS1ncm91cC1zbSAuZm9ybS1jb250cm9sICsgLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XG4gIHdpZHRoOiAkaW5wdXQtaGVpZ2h0LXNtYWxsO1xuICBoZWlnaHQ6ICRpbnB1dC1oZWlnaHQtc21hbGw7XG4gIGxpbmUtaGVpZ2h0OiAkaW5wdXQtaGVpZ2h0LXNtYWxsO1xufVxuXG4vLyBGZWVkYmFjayBzdGF0ZXNcbi5oYXMtc3VjY2VzcyB7XG4gIEBpbmNsdWRlIGZvcm0tY29udHJvbC12YWxpZGF0aW9uKCRzdGF0ZS1zdWNjZXNzLXRleHQsICRzdGF0ZS1zdWNjZXNzLXRleHQsICRzdGF0ZS1zdWNjZXNzLWJnKTtcbn1cbi5oYXMtd2FybmluZyB7XG4gIEBpbmNsdWRlIGZvcm0tY29udHJvbC12YWxpZGF0aW9uKCRzdGF0ZS13YXJuaW5nLXRleHQsICRzdGF0ZS13YXJuaW5nLXRleHQsICRzdGF0ZS13YXJuaW5nLWJnKTtcbn1cbi5oYXMtZXJyb3Ige1xuICBAaW5jbHVkZSBmb3JtLWNvbnRyb2wtdmFsaWRhdGlvbigkc3RhdGUtZGFuZ2VyLXRleHQsICRzdGF0ZS1kYW5nZXItdGV4dCwgJHN0YXRlLWRhbmdlci1iZyk7XG59XG5cbi8vIFJlcG9zaXRpb24gZmVlZGJhY2sgaWNvbiBpZiBpbnB1dCBoYXMgdmlzaWJsZSBsYWJlbCBhYm92ZVxuLmhhcy1mZWVkYmFjayBsYWJlbCB7XG5cbiAgJiB+IC5mb3JtLWNvbnRyb2wtZmVlZGJhY2sge1xuICAgIHRvcDogKCRsaW5lLWhlaWdodC1jb21wdXRlZCArIDUpOyAvLyBIZWlnaHQgb2YgdGhlIGBsYWJlbGAgYW5kIGl0cyBtYXJnaW5cbiAgfVxuICAmLnNyLW9ubHkgfiAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcbiAgICB0b3A6IDA7XG4gIH1cbn1cblxuXG4vLyBIZWxwIHRleHRcbi8vXG4vLyBBcHBseSB0byBhbnkgZWxlbWVudCB5b3Ugd2lzaCB0byBjcmVhdGUgbGlnaHQgdGV4dCBmb3IgcGxhY2VtZW50IGltbWVkaWF0ZWx5XG4vLyBiZWxvdyBhIGZvcm0gY29udHJvbC4gVXNlIGZvciBnZW5lcmFsIGhlbHAsIGZvcm1hdHRpbmcsIG9yIGluc3RydWN0aW9uYWwgdGV4dC5cblxuLmhlbHAtYmxvY2sge1xuICBkaXNwbGF5OiBibG9jazsgLy8gYWNjb3VudCBmb3IgYW55IGVsZW1lbnQgdXNpbmcgaGVscC1ibG9ja1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGNvbG9yOiBsaWdodGVuKCR0ZXh0LWNvbG9yLCAyNSUpOyAvLyBsaWdodGVuIHRoZSB0ZXh0IHNvbWUgZm9yIGNvbnRyYXN0XG59XG5cblxuLy8gSW5saW5lIGZvcm1zXG4vL1xuLy8gTWFrZSBmb3JtcyBhcHBlYXIgaW5saW5lKC1ibG9jaykgYnkgYWRkaW5nIHRoZSBgLmZvcm0taW5saW5lYCBjbGFzcy4gSW5saW5lXG4vLyBmb3JtcyBiZWdpbiBzdGFja2VkIG9uIGV4dHJhIHNtYWxsIChtb2JpbGUpIGRldmljZXMgYW5kIHRoZW4gZ28gaW5saW5lIHdoZW5cbi8vIHZpZXdwb3J0cyByZWFjaCA8NzY4cHguXG4vL1xuLy8gUmVxdWlyZXMgd3JhcHBpbmcgaW5wdXRzIGFuZCBsYWJlbHMgd2l0aCBgLmZvcm0tZ3JvdXBgIGZvciBwcm9wZXIgZGlzcGxheSBvZlxuLy8gZGVmYXVsdCBIVE1MIGZvcm0gY29udHJvbHMgYW5kIG91ciBjdXN0b20gZm9ybSBjb250cm9scyAoZS5nLiwgaW5wdXQgZ3JvdXBzKS5cbi8vXG4vLyBIZWFkcyB1cCEgVGhpcyBpcyBtaXhpbi1lZCBpbnRvIGAubmF2YmFyLWZvcm1gIGluIG5hdmJhcnMubGVzcy5cblxuLy8gW2NvbnZlcnRlcl0gZXh0cmFjdGVkIGZyb20gYC5mb3JtLWlubGluZWAgZm9yIGxpYnNhc3MgY29tcGF0aWJpbGl0eVxuQG1peGluIGZvcm0taW5saW5lIHtcblxuICAvLyBLaWNrIGluIHRoZSBpbmxpbmVcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSB7XG4gICAgLy8gSW5saW5lLWJsb2NrIGFsbCB0aGUgdGhpbmdzIGZvciBcImlubGluZVwiXG4gICAgLmZvcm0tZ3JvdXAge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgfVxuXG4gICAgLy8gSW4gbmF2YmFyLWZvcm0sIGFsbG93IGZvbGtzIHRvICpub3QqIHVzZSBgLmZvcm0tZ3JvdXBgXG4gICAgLmZvcm0tY29udHJvbCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB3aWR0aDogYXV0bzsgLy8gUHJldmVudCBsYWJlbHMgZnJvbSBzdGFja2luZyBhYm92ZSBpbnB1dHMgaW4gYC5mb3JtLWdyb3VwYFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN0YXRpYyBjb250cm9scyBiZWhhdmUgbGlrZSByZWd1bGFyIG9uZXNcbiAgICAuZm9ybS1jb250cm9sLXN0YXRpYyB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuXG4gICAgLmlucHV0LWdyb3VwIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS10YWJsZTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cbiAgICAgIC5pbnB1dC1ncm91cC1hZGRvbixcbiAgICAgIC5pbnB1dC1ncm91cC1idG4sXG4gICAgICAuZm9ybS1jb250cm9sIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5wdXQgZ3JvdXBzIG5lZWQgdGhhdCAxMDAlIHdpZHRoIHRob3VnaFxuICAgIC5pbnB1dC1ncm91cCA+IC5mb3JtLWNvbnRyb2wge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLmNvbnRyb2wtbGFiZWwge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGRlZmF1bHQgbWFyZ2luIG9uIHJhZGlvcy9jaGVja2JveGVzIHRoYXQgd2VyZSB1c2VkIGZvciBzdGFja2luZywgYW5kXG4gICAgLy8gdGhlbiB1bmRvIHRoZSBmbG9hdGluZyBvZiByYWRpb3MgYW5kIGNoZWNrYm94ZXMgdG8gbWF0Y2guXG4gICAgLnJhZGlvLFxuICAgIC5jaGVja2JveCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cbiAgICAgIGxhYmVsIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgfVxuICAgIH1cbiAgICAucmFkaW8gaW5wdXRbdHlwZT1cInJhZGlvXCJdLFxuICAgIC5jaGVja2JveCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0ge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgfVxuXG4gICAgLy8gUmUtb3ZlcnJpZGUgdGhlIGZlZWRiYWNrIGljb24uXG4gICAgLmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcbiAgICAgIHRvcDogMDtcbiAgICB9XG4gIH1cbn1cbi8vIFtjb252ZXJ0ZXJdIGV4dHJhY3RlZCBhcyBgQG1peGluIGZvcm0taW5saW5lYCBmb3IgbGlic2FzcyBjb21wYXRpYmlsaXR5XG4uZm9ybS1pbmxpbmUge1xuICBAaW5jbHVkZSBmb3JtLWlubGluZTtcbn1cblxuXG5cbi8vIEhvcml6b250YWwgZm9ybXNcbi8vXG4vLyBIb3Jpem9udGFsIGZvcm1zIGFyZSBidWlsdCBvbiBncmlkIGNsYXNzZXMgYW5kIGFsbG93IHlvdSB0byBjcmVhdGUgZm9ybXMgd2l0aFxuLy8gbGFiZWxzIG9uIHRoZSBsZWZ0IGFuZCBpbnB1dHMgb24gdGhlIHJpZ2h0LlxuXG4uZm9ybS1ob3Jpem9udGFsIHtcblxuICAvLyBDb25zaXN0ZW50IHZlcnRpY2FsIGFsaWdubWVudCBvZiByYWRpb3MgYW5kIGNoZWNrYm94ZXNcbiAgLy9cbiAgLy8gTGFiZWxzIGFsc28gZ2V0IHNvbWUgcmVzZXQgc3R5bGVzLCBidXQgdGhhdCBpcyBzY29wZWQgdG8gYSBtZWRpYSBxdWVyeSBiZWxvdy5cbiAgLnJhZGlvLFxuICAuY2hlY2tib3gsXG4gIC5yYWRpby1pbmxpbmUsXG4gIC5jaGVja2JveC1pbmxpbmUge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICBwYWRkaW5nLXRvcDogKCRwYWRkaW5nLWJhc2UtdmVydGljYWwgKyAxKTsgLy8gRGVmYXVsdCBwYWRkaW5nIHBsdXMgYSBib3JkZXJcbiAgfVxuICAvLyBBY2NvdW50IGZvciBwYWRkaW5nIHdlJ3JlIGFkZGluZyB0byBlbnN1cmUgdGhlIGFsaWdubWVudCBhbmQgb2YgaGVscCB0ZXh0XG4gIC8vIGFuZCBvdGhlciBjb250ZW50IGJlbG93IGl0ZW1zXG4gIC5yYWRpbyxcbiAgLmNoZWNrYm94IHtcbiAgICBtaW4taGVpZ2h0OiAoJGxpbmUtaGVpZ2h0LWNvbXB1dGVkICsgKCRwYWRkaW5nLWJhc2UtdmVydGljYWwgKyAxKSk7XG4gIH1cblxuICAvLyBNYWtlIGZvcm0gZ3JvdXBzIGJlaGF2ZSBsaWtlIHJvd3NcbiAgLmZvcm0tZ3JvdXAge1xuICAgIEBpbmNsdWRlIG1ha2Utcm93O1xuICB9XG5cbiAgLy8gUmVzZXQgc3BhY2luZyBhbmQgcmlnaHQgYWxpZ24gbGFiZWxzLCBidXQgc2NvcGUgdG8gbWVkaWEgcXVlcmllcyBzbyB0aGF0XG4gIC8vIGxhYmVscyBvbiBuYXJyb3cgdmlld3BvcnRzIHN0YWNrIHRoZSBzYW1lIGFzIGEgZGVmYXVsdCBmb3JtIGV4YW1wbGUuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikge1xuICAgIC5jb250cm9sLWxhYmVsIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIHBhZGRpbmctdG9wOiAoJHBhZGRpbmctYmFzZS12ZXJ0aWNhbCArIDEpOyAvLyBEZWZhdWx0IHBhZGRpbmcgcGx1cyBhIGJvcmRlclxuICAgIH1cbiAgfVxuXG4gIC8vIFZhbGlkYXRpb24gc3RhdGVzXG4gIC8vXG4gIC8vIFJlcG9zaXRpb24gdGhlIGljb24gYmVjYXVzZSBpdCdzIG5vdyB3aXRoaW4gYSBncmlkIGNvbHVtbiBhbmQgY29sdW1ucyBoYXZlXG4gIC8vIGBwb3NpdGlvbjogcmVsYXRpdmU7YCBvbiB0aGVtLiBBbHNvIGFjY291bnRzIGZvciB0aGUgZ3JpZCBndXR0ZXIgcGFkZGluZy5cbiAgLmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHtcbiAgICByaWdodDogZmxvb3IoKCRncmlkLWd1dHRlci13aWR0aCAvIDIpKTtcbiAgfVxuXG4gIC8vIEZvcm0gZ3JvdXAgc2l6ZXNcbiAgLy9cbiAgLy8gUXVpY2sgdXRpbGl0eSBjbGFzcyBmb3IgYXBwbHlpbmcgYC5pbnB1dC1sZ2AgYW5kIGAuaW5wdXQtc21gIHN0eWxlcyB0byB0aGVcbiAgLy8gaW5wdXRzIGFuZCBsYWJlbHMgd2l0aGluIGEgYC5mb3JtLWdyb3VwYC5cbiAgLmZvcm0tZ3JvdXAtbGcge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikge1xuICAgICAgLmNvbnRyb2wtbGFiZWwge1xuICAgICAgICBwYWRkaW5nLXRvcDogKCRwYWRkaW5nLWxhcmdlLXZlcnRpY2FsICsgMSk7XG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLmZvcm0tZ3JvdXAtc20ge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikge1xuICAgICAgLmNvbnRyb2wtbGFiZWwge1xuICAgICAgICBwYWRkaW5nLXRvcDogKCRwYWRkaW5nLXNtYWxsLXZlcnRpY2FsICsgMSk7XG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vXG4vLyBCdXR0b25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEJhc2Ugc3R5bGVzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4uYnRuIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiAwOyAvLyBGb3IgaW5wdXQuYnRuXG4gIGZvbnQtd2VpZ2h0OiAkYnRuLWZvbnQtd2VpZ2h0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7IC8vIFJlc2V0IHVudXN1YWwgRmlyZWZveC1vbi1BbmRyb2lkIGRlZmF1bHQgc3R5bGU7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzL2lzc3Vlcy8yMTRcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIEBpbmNsdWRlIGJ1dHRvbi1zaXplKCRwYWRkaW5nLWJhc2UtdmVydGljYWwsICRwYWRkaW5nLWJhc2UtaG9yaXpvbnRhbCwgJGZvbnQtc2l6ZS1iYXNlLCAkbGluZS1oZWlnaHQtYmFzZSwgJGJ0bi1ib3JkZXItcmFkaXVzLWJhc2UpO1xuICBAaW5jbHVkZSB1c2VyLXNlbGVjdChub25lKTtcblxuICAmLFxuICAmOmFjdGl2ZSxcbiAgJi5hY3RpdmUge1xuICAgICY6Zm9jdXMsXG4gICAgJi5mb2N1cyB7XG4gICAgICBAaW5jbHVkZSB0YWItZm9jdXM7XG4gICAgfVxuICB9XG5cbiAgJjpob3ZlcixcbiAgJjpmb2N1cyxcbiAgJi5mb2N1cyB7XG4gICAgY29sb3I6ICRidG4tZGVmYXVsdC1jb2xvcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cblxuICAmOmFjdGl2ZSxcbiAgJi5hY3RpdmUge1xuICAgIG91dGxpbmU6IDA7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgICBAaW5jbHVkZSBib3gtc2hhZG93KGluc2V0IDAgM3B4IDVweCByZ2JhKDAsMCwwLC4xMjUpKTtcbiAgfVxuXG4gICYuZGlzYWJsZWQsXG4gICZbZGlzYWJsZWRdLFxuICBmaWVsZHNldFtkaXNhYmxlZF0gJiB7XG4gICAgY3Vyc29yOiAkY3Vyc29yLWRpc2FibGVkO1xuICAgIEBpbmNsdWRlIG9wYWNpdHkoLjY1KTtcbiAgICBAaW5jbHVkZSBib3gtc2hhZG93KG5vbmUpO1xuICB9XG5cbiAgLy8gW2NvbnZlcnRlcl0gZXh0cmFjdGVkIGEmIHRvIGEuYnRuXG59XG5cbmEuYnRuIHtcbiAgJi5kaXNhYmxlZCxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyAvLyBGdXR1cmUtcHJvb2YgZGlzYWJsaW5nIG9mIGNsaWNrcyBvbiBgPGE+YCBlbGVtZW50c1xuICB9XG59XG5cblxuLy8gQWx0ZXJuYXRlIGJ1dHRvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5idG4tZGVmYXVsdCB7XG4gIEBpbmNsdWRlIGJ1dHRvbi12YXJpYW50KCRidG4tZGVmYXVsdC1jb2xvciwgJGJ0bi1kZWZhdWx0LWJnLCAkYnRuLWRlZmF1bHQtYm9yZGVyKTtcbn1cbi5idG4tcHJpbWFyeSB7XG4gIEBpbmNsdWRlIGJ1dHRvbi12YXJpYW50KCRidG4tcHJpbWFyeS1jb2xvciwgJGJ0bi1wcmltYXJ5LWJnLCAkYnRuLXByaW1hcnktYm9yZGVyKTtcbn1cbi8vIFN1Y2Nlc3MgYXBwZWFycyBhcyBncmVlblxuLmJ0bi1zdWNjZXNzIHtcbiAgQGluY2x1ZGUgYnV0dG9uLXZhcmlhbnQoJGJ0bi1zdWNjZXNzLWNvbG9yLCAkYnRuLXN1Y2Nlc3MtYmcsICRidG4tc3VjY2Vzcy1ib3JkZXIpO1xufVxuLy8gSW5mbyBhcHBlYXJzIGFzIGJsdWUtZ3JlZW5cbi5idG4taW5mbyB7XG4gIEBpbmNsdWRlIGJ1dHRvbi12YXJpYW50KCRidG4taW5mby1jb2xvciwgJGJ0bi1pbmZvLWJnLCAkYnRuLWluZm8tYm9yZGVyKTtcbn1cbi8vIFdhcm5pbmcgYXBwZWFycyBhcyBvcmFuZ2Vcbi5idG4td2FybmluZyB7XG4gIEBpbmNsdWRlIGJ1dHRvbi12YXJpYW50KCRidG4td2FybmluZy1jb2xvciwgJGJ0bi13YXJuaW5nLWJnLCAkYnRuLXdhcm5pbmctYm9yZGVyKTtcbn1cbi8vIERhbmdlciBhbmQgZXJyb3IgYXBwZWFyIGFzIHJlZFxuLmJ0bi1kYW5nZXIge1xuICBAaW5jbHVkZSBidXR0b24tdmFyaWFudCgkYnRuLWRhbmdlci1jb2xvciwgJGJ0bi1kYW5nZXItYmcsICRidG4tZGFuZ2VyLWJvcmRlcik7XG59XG5cblxuLy8gTGluayBidXR0b25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIE1ha2UgYSBidXR0b24gbG9vayBhbmQgYmVoYXZlIGxpa2UgYSBsaW5rXG4uYnRuLWxpbmsge1xuICBjb2xvcjogJGxpbmstY29sb3I7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG5cbiAgJixcbiAgJjphY3RpdmUsXG4gICYuYWN0aXZlLFxuICAmW2Rpc2FibGVkXSxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIEBpbmNsdWRlIGJveC1zaGFkb3cobm9uZSk7XG4gIH1cbiAgJixcbiAgJjpob3ZlcixcbiAgJjpmb2N1cyxcbiAgJjphY3RpdmUge1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgY29sb3I6ICRsaW5rLWhvdmVyLWNvbG9yO1xuICAgIHRleHQtZGVjb3JhdGlvbjogJGxpbmstaG92ZXItZGVjb3JhdGlvbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuICAmW2Rpc2FibGVkXSxcbiAgZmllbGRzZXRbZGlzYWJsZWRdICYge1xuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBjb2xvcjogJGJ0bi1saW5rLWRpc2FibGVkLWNvbG9yO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIEJ1dHRvbiBTaXplc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLmJ0bi1sZyB7XG4gIC8vIGxpbmUtaGVpZ2h0OiBlbnN1cmUgZXZlbi1udW1iZXJlZCBoZWlnaHQgb2YgYnV0dG9uIG5leHQgdG8gbGFyZ2UgaW5wdXRcbiAgQGluY2x1ZGUgYnV0dG9uLXNpemUoJHBhZGRpbmctbGFyZ2UtdmVydGljYWwsICRwYWRkaW5nLWxhcmdlLWhvcml6b250YWwsICRmb250LXNpemUtbGFyZ2UsICRsaW5lLWhlaWdodC1sYXJnZSwgJGJ0bi1ib3JkZXItcmFkaXVzLWxhcmdlKTtcbn1cbi5idG4tc20ge1xuICAvLyBsaW5lLWhlaWdodDogZW5zdXJlIHByb3BlciBoZWlnaHQgb2YgYnV0dG9uIG5leHQgdG8gc21hbGwgaW5wdXRcbiAgQGluY2x1ZGUgYnV0dG9uLXNpemUoJHBhZGRpbmctc21hbGwtdmVydGljYWwsICRwYWRkaW5nLXNtYWxsLWhvcml6b250YWwsICRmb250LXNpemUtc21hbGwsICRsaW5lLWhlaWdodC1zbWFsbCwgJGJ0bi1ib3JkZXItcmFkaXVzLXNtYWxsKTtcbn1cbi5idG4teHMge1xuICBAaW5jbHVkZSBidXR0b24tc2l6ZSgkcGFkZGluZy14cy12ZXJ0aWNhbCwgJHBhZGRpbmcteHMtaG9yaXpvbnRhbCwgJGZvbnQtc2l6ZS1zbWFsbCwgJGxpbmUtaGVpZ2h0LXNtYWxsLCAkYnRuLWJvcmRlci1yYWRpdXMtc21hbGwpO1xufVxuXG5cbi8vIEJsb2NrIGJ1dHRvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLmJ0bi1ibG9jayB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLy8gVmVydGljYWxseSBzcGFjZSBvdXQgbXVsdGlwbGUgYmxvY2sgYnV0dG9uc1xuLmJ0bi1ibG9jayArIC5idG4tYmxvY2sge1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi8vIFNwZWNpZmljaXR5IG92ZXJyaWRlc1xuaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSxcbmlucHV0W3R5cGU9XCJyZXNldFwiXSxcbmlucHV0W3R5cGU9XCJidXR0b25cIl0ge1xuICAmLmJ0bi1ibG9jayB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbiIsIi8vXG4vLyBDb21wb25lbnQgYW5pbWF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSGVhZHMgdXAhXG4vL1xuLy8gV2UgZG9uJ3QgdXNlIHRoZSBgLm9wYWNpdHkoKWAgbWl4aW4gaGVyZSBzaW5jZSBpdCBjYXVzZXMgYSBidWcgd2l0aCB0ZXh0XG4vLyBmaWVsZHMgaW4gSUU3LTguIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL3B1bGwvMzU1Mi5cblxuLmZhZGUge1xuICBvcGFjaXR5OiAwO1xuICBAaW5jbHVkZSB0cmFuc2l0aW9uKG9wYWNpdHkgLjE1cyBsaW5lYXIpO1xuICAmLmluIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbi5jb2xsYXBzZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG5cbiAgJi5pbiAgICAgIHsgZGlzcGxheTogYmxvY2s7IH1cbiAgLy8gW2NvbnZlcnRlcl0gZXh0cmFjdGVkIHRyJi5pbiB0byB0ci5jb2xsYXBzZS5pblxuICAvLyBbY29udmVydGVyXSBleHRyYWN0ZWQgdGJvZHkmLmluIHRvIHRib2R5LmNvbGxhcHNlLmluXG59XG5cbnRyLmNvbGxhcHNlLmluICAgIHsgZGlzcGxheTogdGFibGUtcm93OyB9XG5cbnRib2R5LmNvbGxhcHNlLmluIHsgZGlzcGxheTogdGFibGUtcm93LWdyb3VwOyB9XG5cbi5jb2xsYXBzaW5nIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIEBpbmNsdWRlIHRyYW5zaXRpb24tcHJvcGVydHkoaGVpZ2h0LCB2aXNpYmlsaXR5KTtcbiAgQGluY2x1ZGUgdHJhbnNpdGlvbi1kdXJhdGlvbiguMzVzKTtcbiAgQGluY2x1ZGUgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24oZWFzZSk7XG59XG4iLCIvL1xuLy8gRHJvcGRvd24gbWVudXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gRHJvcGRvd24gYXJyb3cvY2FyZXRcbi5jYXJldCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgYm9yZGVyLXRvcDogICAkY2FyZXQtd2lkdGgtYmFzZSBkYXNoZWQ7XG4gIGJvcmRlci10b3A6ICAgJGNhcmV0LXdpZHRoLWJhc2Ugc29saWQgXFw5OyAvLyBJRThcbiAgYm9yZGVyLXJpZ2h0OiAkY2FyZXQtd2lkdGgtYmFzZSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWxlZnQ6ICAkY2FyZXQtd2lkdGgtYmFzZSBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuLy8gVGhlIGRyb3Bkb3duIHdyYXBwZXIgKGRpdilcbi5kcm9wdXAsXG4uZHJvcGRvd24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi8vIFByZXZlbnQgdGhlIGZvY3VzIG9uIHRoZSBkcm9wZG93biB0b2dnbGUgd2hlbiBjbG9zaW5nIGRyb3Bkb3duc1xuLmRyb3Bkb3duLXRvZ2dsZTpmb2N1cyB7XG4gIG91dGxpbmU6IDA7XG59XG5cbi8vIFRoZSBkcm9wZG93biBtZW51ICh1bClcbi5kcm9wZG93bi1tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwMCU7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6ICR6aW5kZXgtZHJvcGRvd247XG4gIGRpc3BsYXk6IG5vbmU7IC8vIG5vbmUgYnkgZGVmYXVsdCwgYnV0IGJsb2NrIG9uIFwib3BlblwiIG9mIHRoZSBtZW51XG4gIGZsb2F0OiBsZWZ0O1xuICBtaW4td2lkdGg6IDE2MHB4O1xuICBwYWRkaW5nOiA1cHggMDtcbiAgbWFyZ2luOiAycHggMCAwOyAvLyBvdmVycmlkZSBkZWZhdWx0IHVsXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlO1xuICB0ZXh0LWFsaWduOiBsZWZ0OyAvLyBFbnN1cmVzIHByb3BlciBhbGlnbm1lbnQgaWYgcGFyZW50IGhhcyBpdCBjaGFuZ2VkIChlLmcuLCBtb2RhbCBmb290ZXIpXG4gIGJhY2tncm91bmQtY29sb3I6ICRkcm9wZG93bi1iZztcbiAgYm9yZGVyOiAxcHggc29saWQgJGRyb3Bkb3duLWZhbGxiYWNrLWJvcmRlcjsgLy8gSUU4IGZhbGxiYWNrXG4gIGJvcmRlcjogMXB4IHNvbGlkICRkcm9wZG93bi1ib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzLWJhc2U7XG4gIEBpbmNsdWRlIGJveC1zaGFkb3coMCA2cHggMTJweCByZ2JhKDAsMCwwLC4xNzUpKTtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcblxuICAvLyBBbGlnbnMgdGhlIGRyb3Bkb3duIG1lbnUgdG8gcmlnaHRcbiAgLy9cbiAgLy8gRGVwcmVjYXRlZCBhcyBvZiAzLjEuMCBpbiBmYXZvciBvZiBgLmRyb3Bkb3duLW1lbnUtW2Rpcl1gXG4gICYucHVsbC1yaWdodCB7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogYXV0bztcbiAgfVxuXG4gIC8vIERpdmlkZXJzIChiYXNpY2FsbHkgYW4gaHIpIHdpdGhpbiB0aGUgZHJvcGRvd25cbiAgLmRpdmlkZXIge1xuICAgIEBpbmNsdWRlIG5hdi1kaXZpZGVyKCRkcm9wZG93bi1kaXZpZGVyLWJnKTtcbiAgfVxuXG4gIC8vIExpbmtzIHdpdGhpbiB0aGUgZHJvcGRvd24gbWVudVxuICA+IGxpID4gYSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogM3B4IDIwcHg7XG4gICAgY2xlYXI6IGJvdGg7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWJhc2U7XG4gICAgY29sb3I6ICRkcm9wZG93bi1saW5rLWNvbG9yO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IC8vIHByZXZlbnQgbGlua3MgZnJvbSByYW5kb21seSBicmVha2luZyBvbnRvIG5ldyBsaW5lc1xuICB9XG59XG5cbi8vIEhvdmVyL0ZvY3VzIHN0YXRlXG4uZHJvcGRvd24tbWVudSA+IGxpID4gYSB7XG4gICY6aG92ZXIsXG4gICY6Zm9jdXMge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogJGRyb3Bkb3duLWxpbmstaG92ZXItY29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRyb3Bkb3duLWxpbmstaG92ZXItYmc7XG4gIH1cbn1cblxuLy8gQWN0aXZlIHN0YXRlXG4uZHJvcGRvd24tbWVudSA+IC5hY3RpdmUgPiBhIHtcbiAgJixcbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgY29sb3I6ICRkcm9wZG93bi1saW5rLWFjdGl2ZS1jb2xvcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZHJvcGRvd24tbGluay1hY3RpdmUtYmc7XG4gIH1cbn1cblxuLy8gRGlzYWJsZWQgc3RhdGVcbi8vXG4vLyBHcmF5IG91dCB0ZXh0IGFuZCBlbnN1cmUgdGhlIGhvdmVyL2ZvY3VzIHN0YXRlIHJlbWFpbnMgZ3JheVxuXG4uZHJvcGRvd24tbWVudSA+IC5kaXNhYmxlZCA+IGEge1xuICAmLFxuICAmOmhvdmVyLFxuICAmOmZvY3VzIHtcbiAgICBjb2xvcjogJGRyb3Bkb3duLWxpbmstZGlzYWJsZWQtY29sb3I7XG4gIH1cblxuICAvLyBOdWtlIGhvdmVyL2ZvY3VzIGVmZmVjdHNcbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7IC8vIFJlbW92ZSBDU1MgZ3JhZGllbnRcbiAgICBAaW5jbHVkZSByZXNldC1maWx0ZXI7XG4gICAgY3Vyc29yOiAkY3Vyc29yLWRpc2FibGVkO1xuICB9XG59XG5cbi8vIE9wZW4gc3RhdGUgZm9yIHRoZSBkcm9wZG93blxuLm9wZW4ge1xuICAvLyBTaG93IHRoZSBtZW51XG4gID4gLmRyb3Bkb3duLW1lbnUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgLy8gUmVtb3ZlIHRoZSBvdXRsaW5lIHdoZW4gOmZvY3VzIGlzIHRyaWdnZXJlZFxuICA+IGEge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbn1cblxuLy8gTWVudSBwb3NpdGlvbmluZ1xuLy9cbi8vIEFkZCBleHRyYSBjbGFzcyB0byBgLmRyb3Bkb3duLW1lbnVgIHRvIGZsaXAgdGhlIGFsaWdubWVudCBvZiB0aGUgZHJvcGRvd25cbi8vIG1lbnUgd2l0aCB0aGUgcGFyZW50LlxuLmRyb3Bkb3duLW1lbnUtcmlnaHQge1xuICBsZWZ0OiBhdXRvOyAvLyBSZXNldCB0aGUgZGVmYXVsdCBmcm9tIGAuZHJvcGRvd24tbWVudWBcbiAgcmlnaHQ6IDA7XG59XG4vLyBXaXRoIHYzLCB3ZSBlbmFibGVkIGF1dG8tZmxpcHBpbmcgaWYgeW91IGhhdmUgYSBkcm9wZG93biB3aXRoaW4gYSByaWdodFxuLy8gYWxpZ25lZCBuYXYgY29tcG9uZW50LiBUbyBlbmFibGUgdGhlIHVuZG9pbmcgb2YgdGhhdCwgd2UgcHJvdmlkZSBhbiBvdmVycmlkZVxuLy8gdG8gcmVzdG9yZSB0aGUgZGVmYXVsdCBkcm9wZG93biBtZW51IGFsaWdubWVudC5cbi8vXG4vLyBUaGlzIGlzIG9ubHkgZm9yIGxlZnQtYWxpZ25pbmcgYSBkcm9wZG93biBtZW51IHdpdGhpbiBhIGAubmF2YmFyLXJpZ2h0YCBvclxuLy8gYC5wdWxsLXJpZ2h0YCBuYXYgY29tcG9uZW50LlxuLmRyb3Bkb3duLW1lbnUtbGVmdCB7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiBhdXRvO1xufVxuXG4vLyBEcm9wZG93biBzZWN0aW9uIGhlYWRlcnNcbi5kcm9wZG93bi1oZWFkZXIge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogM3B4IDIwcHg7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcbiAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodC1iYXNlO1xuICBjb2xvcjogJGRyb3Bkb3duLWhlYWRlci1jb2xvcjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgLy8gYXMgd2l0aCA+IGxpID4gYVxufVxuXG4vLyBCYWNrZHJvcCB0byBjYXRjaCBib2R5IGNsaWNrcyBvbiBtb2JpbGUsIGV0Yy5cbi5kcm9wZG93bi1iYWNrZHJvcCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiAoJHppbmRleC1kcm9wZG93biAtIDEwKTtcbn1cblxuLy8gUmlnaHQgYWxpZ25lZCBkcm9wZG93bnNcbi5wdWxsLXJpZ2h0ID4gLmRyb3Bkb3duLW1lbnUge1xuICByaWdodDogMDtcbiAgbGVmdDogYXV0bztcbn1cblxuLy8gQWxsb3cgZm9yIGRyb3Bkb3ducyB0byBnbyBib3R0b20gdXAgKGFrYSwgZHJvcHVwLW1lbnUpXG4vL1xuLy8gSnVzdCBhZGQgLmRyb3B1cCBhZnRlciB0aGUgc3RhbmRhcmQgLmRyb3Bkb3duIGNsYXNzIGFuZCB5b3UncmUgc2V0LCBicm8uXG4vLyBUT0RPOiBhYnN0cmFjdCB0aGlzIHNvIHRoYXQgdGhlIG5hdmJhciBmaXhlZCBzdHlsZXMgYXJlIG5vdCBwbGFjZWQgaGVyZT9cblxuLmRyb3B1cCxcbi5uYXZiYXItZml4ZWQtYm90dG9tIC5kcm9wZG93biB7XG4gIC8vIFJldmVyc2UgdGhlIGNhcmV0XG4gIC5jYXJldCB7XG4gICAgYm9yZGVyLXRvcDogMDtcbiAgICBib3JkZXItYm90dG9tOiAkY2FyZXQtd2lkdGgtYmFzZSBkYXNoZWQ7XG4gICAgYm9yZGVyLWJvdHRvbTogJGNhcmV0LXdpZHRoLWJhc2Ugc29saWQgXFw5OyAvLyBJRThcbiAgICBjb250ZW50OiBcIlwiO1xuICB9XG4gIC8vIERpZmZlcmVudCBwb3NpdGlvbmluZyBmb3IgYm90dG9tIHVwIG1lbnVcbiAgLmRyb3Bkb3duLW1lbnUge1xuICAgIHRvcDogYXV0bztcbiAgICBib3R0b206IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICB9XG59XG5cblxuLy8gQ29tcG9uZW50IGFsaWdubWVudFxuLy9cbi8vIFJlaXRlcmF0ZSBwZXIgbmF2YmFyLmxlc3MgYW5kIHRoZSBtb2RpZmllZCBjb21wb25lbnQgYWxpZ25tZW50IHRoZXJlLlxuXG5AbWVkaWEgKG1pbi13aWR0aDogJGdyaWQtZmxvYXQtYnJlYWtwb2ludCkge1xuICAubmF2YmFyLXJpZ2h0IHtcbiAgICAuZHJvcGRvd24tbWVudSB7XG4gICAgICByaWdodDogMDsgbGVmdDogYXV0bztcbiAgICB9XG4gICAgLy8gTmVjZXNzYXJ5IGZvciBvdmVycmlkZXMgb2YgdGhlIGRlZmF1bHQgcmlnaHQgYWxpZ25lZCBtZW51LlxuICAgIC8vIFdpbGwgcmVtb3ZlIGNvbWUgdjQgaW4gYWxsIGxpa2VsaWhvb2QuXG4gICAgLmRyb3Bkb3duLW1lbnUtbGVmdCB7XG4gICAgICBsZWZ0OiAwOyByaWdodDogYXV0bztcbiAgICB9XG4gIH1cbn1cbiIsIi8vXG4vLyBCdXR0b24gZ3JvdXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBNYWtlIHRoZSBkaXYgYmVoYXZlIGxpa2UgYSBidXR0b25cbi5idG4tZ3JvdXAsXG4uYnRuLWdyb3VwLXZlcnRpY2FsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IC8vIG1hdGNoIC5idG4gYWxpZ25tZW50IGdpdmVuIGZvbnQtc2l6ZSBoYWNrIGFib3ZlXG4gID4gLmJ0biB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIC8vIEJyaW5nIHRoZSBcImFjdGl2ZVwiIGJ1dHRvbiB0byB0aGUgZnJvbnRcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMsXG4gICAgJjphY3RpdmUsXG4gICAgJi5hY3RpdmUge1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG4gIH1cbn1cblxuLy8gUHJldmVudCBkb3VibGUgYm9yZGVycyB3aGVuIGJ1dHRvbnMgYXJlIG5leHQgdG8gZWFjaCBvdGhlclxuLmJ0bi1ncm91cCB7XG4gIC5idG4gKyAuYnRuLFxuICAuYnRuICsgLmJ0bi1ncm91cCxcbiAgLmJ0bi1ncm91cCArIC5idG4sXG4gIC5idG4tZ3JvdXAgKyAuYnRuLWdyb3VwIHtcbiAgICBtYXJnaW4tbGVmdDogLTFweDtcbiAgfVxufVxuXG4vLyBPcHRpb25hbDogR3JvdXAgbXVsdGlwbGUgYnV0dG9uIGdyb3VwcyB0b2dldGhlciBmb3IgYSB0b29sYmFyXG4uYnRuLXRvb2xiYXIge1xuICBtYXJnaW4tbGVmdDogLTVweDsgLy8gT2Zmc2V0IHRoZSBmaXJzdCBjaGlsZCdzIG1hcmdpblxuICBAaW5jbHVkZSBjbGVhcmZpeDtcblxuICAuYnRuLFxuICAuYnRuLWdyb3VwLFxuICAuaW5wdXQtZ3JvdXAge1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG4gID4gLmJ0bixcbiAgPiAuYnRuLWdyb3VwLFxuICA+IC5pbnB1dC1ncm91cCB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgfVxufVxuXG4uYnRuLWdyb3VwID4gLmJ0bjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpOm5vdCguZHJvcGRvd24tdG9nZ2xlKSB7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG59XG5cbi8vIFNldCBjb3JuZXJzIGluZGl2aWR1YWwgYmVjYXVzZSBzb21ldGltZXMgYSBzaW5nbGUgYnV0dG9uIGNhbiBiZSBpbiBhIC5idG4tZ3JvdXAgYW5kIHdlIG5lZWQgOmZpcnN0LWNoaWxkIGFuZCA6bGFzdC1jaGlsZCB0byBib3RoIG1hdGNoXG4uYnRuLWdyb3VwID4gLmJ0bjpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICAmOm5vdCg6bGFzdC1jaGlsZCk6bm90KC5kcm9wZG93bi10b2dnbGUpIHtcbiAgICBAaW5jbHVkZSBib3JkZXItcmlnaHQtcmFkaXVzKDApO1xuICB9XG59XG4vLyBOZWVkIC5kcm9wZG93bi10b2dnbGUgc2luY2UgOmxhc3QtY2hpbGQgZG9lc24ndCBhcHBseSBnaXZlbiBhIC5kcm9wZG93bi1tZW51IGltbWVkaWF0ZWx5IGFmdGVyIGl0XG4uYnRuLWdyb3VwID4gLmJ0bjpsYXN0LWNoaWxkOm5vdCg6Zmlyc3QtY2hpbGQpLFxuLmJ0bi1ncm91cCA+IC5kcm9wZG93bi10b2dnbGU6bm90KDpmaXJzdC1jaGlsZCkge1xuICBAaW5jbHVkZSBib3JkZXItbGVmdC1yYWRpdXMoMCk7XG59XG5cbi8vIEN1c3RvbSBlZGl0cyBmb3IgaW5jbHVkaW5nIGJ0bi1ncm91cHMgd2l0aGluIGJ0bi1ncm91cHMgKHVzZWZ1bCBmb3IgaW5jbHVkaW5nIGRyb3Bkb3duIGJ1dHRvbnMgd2l0aGluIGEgYnRuLWdyb3VwKVxuLmJ0bi1ncm91cCA+IC5idG4tZ3JvdXAge1xuICBmbG9hdDogbGVmdDtcbn1cbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCkgPiAuYnRuIHtcbiAgYm9yZGVyLXJhZGl1czogMDtcbn1cbi5idG4tZ3JvdXAgPiAuYnRuLWdyb3VwOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCkge1xuICA+IC5idG46bGFzdC1jaGlsZCxcbiAgPiAuZHJvcGRvd24tdG9nZ2xlIHtcbiAgICBAaW5jbHVkZSBib3JkZXItcmlnaHQtcmFkaXVzKDApO1xuICB9XG59XG4uYnRuLWdyb3VwID4gLmJ0bi1ncm91cDpsYXN0LWNoaWxkOm5vdCg6Zmlyc3QtY2hpbGQpID4gLmJ0bjpmaXJzdC1jaGlsZCB7XG4gIEBpbmNsdWRlIGJvcmRlci1sZWZ0LXJhZGl1cygwKTtcbn1cblxuLy8gT24gYWN0aXZlIGFuZCBvcGVuLCBkb24ndCBzaG93IG91dGxpbmVcbi5idG4tZ3JvdXAgLmRyb3Bkb3duLXRvZ2dsZTphY3RpdmUsXG4uYnRuLWdyb3VwLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZSB7XG4gIG91dGxpbmU6IDA7XG59XG5cblxuLy8gU2l6aW5nXG4vL1xuLy8gUmVtaXggdGhlIGRlZmF1bHQgYnV0dG9uIHNpemluZyBjbGFzc2VzIGludG8gbmV3IG9uZXMgZm9yIGVhc2llciBtYW5pcHVsYXRpb24uXG5cbi5idG4tZ3JvdXAteHMgPiAuYnRuIHsgQGV4dGVuZCAuYnRuLXhzOyB9XG4uYnRuLWdyb3VwLXNtID4gLmJ0biB7IEBleHRlbmQgLmJ0bi1zbTsgfVxuLmJ0bi1ncm91cC1sZyA+IC5idG4geyBAZXh0ZW5kIC5idG4tbGc7IH1cblxuXG4vLyBTcGxpdCBidXR0b24gZHJvcGRvd25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEdpdmUgdGhlIGxpbmUgYmV0d2VlbiBidXR0b25zIHNvbWUgZGVwdGhcbi5idG4tZ3JvdXAgPiAuYnRuICsgLmRyb3Bkb3duLXRvZ2dsZSB7XG4gIHBhZGRpbmctbGVmdDogOHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG59XG4uYnRuLWdyb3VwID4gLmJ0bi1sZyArIC5kcm9wZG93bi10b2dnbGUge1xuICBwYWRkaW5nLWxlZnQ6IDEycHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEycHg7XG59XG5cbi8vIFRoZSBjbGlja2FibGUgYnV0dG9uIGZvciB0b2dnbGluZyB0aGUgbWVudVxuLy8gUmVtb3ZlIHRoZSBncmFkaWVudCBhbmQgc2V0IHRoZSBzYW1lIGluc2V0IHNoYWRvdyBhcyB0aGUgOmFjdGl2ZSBzdGF0ZVxuLmJ0bi1ncm91cC5vcGVuIC5kcm9wZG93bi10b2dnbGUge1xuICBAaW5jbHVkZSBib3gtc2hhZG93KGluc2V0IDAgM3B4IDVweCByZ2JhKDAsMCwwLC4xMjUpKTtcblxuICAvLyBTaG93IG5vIHNoYWRvdyBmb3IgYC5idG4tbGlua2Agc2luY2UgaXQgaGFzIG5vIG90aGVyIGJ1dHRvbiBzdHlsZXMuXG4gICYuYnRuLWxpbmsge1xuICAgIEBpbmNsdWRlIGJveC1zaGFkb3cobm9uZSk7XG4gIH1cbn1cblxuXG4vLyBSZXBvc2l0aW9uIHRoZSBjYXJldFxuLmJ0biAuY2FyZXQge1xuICBtYXJnaW4tbGVmdDogMDtcbn1cbi8vIENhcmV0cyBpbiBvdGhlciBidXR0b24gc2l6ZXNcbi5idG4tbGcgLmNhcmV0IHtcbiAgYm9yZGVyLXdpZHRoOiAkY2FyZXQtd2lkdGgtbGFyZ2UgJGNhcmV0LXdpZHRoLWxhcmdlIDA7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG59XG4vLyBVcHNpZGUgZG93biBjYXJldHMgZm9yIC5kcm9wdXBcbi5kcm9wdXAgLmJ0bi1sZyAuY2FyZXQge1xuICBib3JkZXItd2lkdGg6IDAgJGNhcmV0LXdpZHRoLWxhcmdlICRjYXJldC13aWR0aC1sYXJnZTtcbn1cblxuXG4vLyBWZXJ0aWNhbCBidXR0b24gZ3JvdXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5idG4tZ3JvdXAtdmVydGljYWwge1xuICA+IC5idG4sXG4gID4gLmJ0bi1ncm91cCxcbiAgPiAuYnRuLWdyb3VwID4gLmJ0biB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZmxvYXQ6IG5vbmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLy8gQ2xlYXIgZmxvYXRzIHNvIGRyb3Bkb3duIG1lbnVzIGNhbiBiZSBwcm9wZXJseSBwbGFjZWRcbiAgPiAuYnRuLWdyb3VwIHtcbiAgICBAaW5jbHVkZSBjbGVhcmZpeDtcbiAgICA+IC5idG4ge1xuICAgICAgZmxvYXQ6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgPiAuYnRuICsgLmJ0bixcbiAgPiAuYnRuICsgLmJ0bi1ncm91cCxcbiAgPiAuYnRuLWdyb3VwICsgLmJ0bixcbiAgPiAuYnRuLWdyb3VwICsgLmJ0bi1ncm91cCB7XG4gICAgbWFyZ2luLXRvcDogLTFweDtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgfVxufVxuXG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0biB7XG4gICY6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgfVxuICAmOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIEBpbmNsdWRlIGJvcmRlci10b3AtcmFkaXVzKCRidG4tYm9yZGVyLXJhZGl1cy1iYXNlKTtcbiAgICBAaW5jbHVkZSBib3JkZXItYm90dG9tLXJhZGl1cygwKTtcbiAgfVxuICAmOmxhc3QtY2hpbGQ6bm90KDpmaXJzdC1jaGlsZCkge1xuICAgIEBpbmNsdWRlIGJvcmRlci10b3AtcmFkaXVzKDApO1xuICAgIEBpbmNsdWRlIGJvcmRlci1ib3R0b20tcmFkaXVzKCRidG4tYm9yZGVyLXJhZGl1cy1iYXNlKTtcbiAgfVxufVxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKSA+IC5idG4ge1xuICBib3JkZXItcmFkaXVzOiAwO1xufVxuLmJ0bi1ncm91cC12ZXJ0aWNhbCA+IC5idG4tZ3JvdXA6Zmlyc3QtY2hpbGQ6bm90KDpsYXN0LWNoaWxkKSB7XG4gID4gLmJ0bjpsYXN0LWNoaWxkLFxuICA+IC5kcm9wZG93bi10b2dnbGUge1xuICAgIEBpbmNsdWRlIGJvcmRlci1ib3R0b20tcmFkaXVzKDApO1xuICB9XG59XG4uYnRuLWdyb3VwLXZlcnRpY2FsID4gLmJ0bi1ncm91cDpsYXN0LWNoaWxkOm5vdCg6Zmlyc3QtY2hpbGQpID4gLmJ0bjpmaXJzdC1jaGlsZCB7XG4gIEBpbmNsdWRlIGJvcmRlci10b3AtcmFkaXVzKDApO1xufVxuXG5cbi8vIEp1c3RpZmllZCBidXR0b24gZ3JvdXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5idG4tZ3JvdXAtanVzdGlmaWVkIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIHdpZHRoOiAxMDAlO1xuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xuICA+IC5idG4sXG4gID4gLmJ0bi1ncm91cCB7XG4gICAgZmxvYXQ6IG5vbmU7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB3aWR0aDogMSU7XG4gIH1cbiAgPiAuYnRuLWdyb3VwIC5idG4ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgPiAuYnRuLWdyb3VwIC5kcm9wZG93bi1tZW51IHtcbiAgICBsZWZ0OiBhdXRvO1xuICB9XG59XG5cblxuLy8gQ2hlY2tib3ggYW5kIHJhZGlvIG9wdGlvbnNcbi8vXG4vLyBJbiBvcmRlciB0byBzdXBwb3J0IHRoZSBicm93c2VyJ3MgZm9ybSB2YWxpZGF0aW9uIGZlZWRiYWNrLCBwb3dlcmVkIGJ5IHRoZVxuLy8gYHJlcXVpcmVkYCBhdHRyaWJ1dGUsIHdlIGhhdmUgdG8gXCJoaWRlXCIgdGhlIGlucHV0cyB2aWEgYGNsaXBgLiBXZSBjYW5ub3QgdXNlXG4vLyBgZGlzcGxheTogbm9uZTtgIG9yIGB2aXNpYmlsaXR5OiBoaWRkZW47YCBhcyB0aGF0IGFsc28gaGlkZXMgdGhlIHBvcG92ZXIuXG4vLyBTaW1wbHkgdmlzdWFsbHkgaGlkaW5nIHRoZSBpbnB1dHMgdmlhIGBvcGFjaXR5YCB3b3VsZCBsZWF2ZSB0aGVtIGNsaWNrYWJsZSBpblxuLy8gY2VydGFpbiBjYXNlcyB3aGljaCBpcyBwcmV2ZW50ZWQgYnkgdXNpbmcgYGNsaXBgIGFuZCBgcG9pbnRlci1ldmVudHNgLlxuLy8gVGhpcyB3YXksIHdlIGVuc3VyZSBhIERPTSBlbGVtZW50IGlzIHZpc2libGUgdG8gcG9zaXRpb24gdGhlIHBvcG92ZXIgZnJvbS5cbi8vXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL3B1bGwvMTI3OTQgYW5kXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvcHVsbC8xNDU1OSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXSB7XG4gID4gLmJ0bixcbiAgPiAuYnRuLWdyb3VwID4gLmJ0biB7XG4gICAgaW5wdXRbdHlwZT1cInJhZGlvXCJdLFxuICAgIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBjbGlwOiByZWN0KDAsMCwwLDApO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG59XG4iLCIvL1xuLy8gSW5wdXQgZ3JvdXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBCYXNlIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLmlucHV0LWdyb3VwIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyAvLyBGb3IgZHJvcGRvd25zXG4gIGRpc3BsYXk6IHRhYmxlO1xuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlOyAvLyBwcmV2ZW50IGlucHV0IGdyb3VwcyBmcm9tIGluaGVyaXRpbmcgYm9yZGVyIHN0eWxlcyBmcm9tIHRhYmxlIGNlbGxzIHdoZW4gcGxhY2VkIHdpdGhpbiBhIHRhYmxlXG5cbiAgLy8gVW5kbyBwYWRkaW5nIGFuZCBmbG9hdCBvZiBncmlkIGNsYXNzZXNcbiAgJltjbGFzcyo9XCJjb2wtXCJdIHtcbiAgICBmbG9hdDogbm9uZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgcGFkZGluZy1yaWdodDogMDtcbiAgfVxuXG4gIC5mb3JtLWNvbnRyb2wge1xuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBpbnB1dCBpcyBhbHdheXMgYWJvdmUgdGhlICphcHBlbmRlZCogYWRkb24gYnV0dG9uIGZvclxuICAgIC8vIHByb3BlciBib3JkZXIgY29sb3JzLlxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAyO1xuXG4gICAgLy8gSUU5IGZ1YmFycyB0aGUgcGxhY2Vob2xkZXIgYXR0cmlidXRlIGluIHRleHQgaW5wdXRzIGFuZCB0aGUgYXJyb3dzIG9uXG4gICAgLy8gc2VsZWN0IGVsZW1lbnRzIGluIGlucHV0IGdyb3Vwcy4gVG8gZml4IGl0LCB3ZSBmbG9hdCB0aGUgaW5wdXQuIERldGFpbHM6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xMTU2MSNpc3N1ZWNvbW1lbnQtMjg5MzY4NTVcbiAgICBmbG9hdDogbGVmdDtcblxuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgXG4gICAgJjpmb2N1cyB7XG4gICAgICB6LWluZGV4OiAzO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTaXppbmcgb3B0aW9uc1xuLy9cbi8vIFJlbWl4IHRoZSBkZWZhdWx0IGZvcm0gY29udHJvbCBzaXppbmcgY2xhc3NlcyBpbnRvIG5ldyBvbmVzIGZvciBlYXNpZXJcbi8vIG1hbmlwdWxhdGlvbi5cblxuLmlucHV0LWdyb3VwLWxnID4gLmZvcm0tY29udHJvbCxcbi5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1hZGRvbixcbi5pbnB1dC1ncm91cC1sZyA+IC5pbnB1dC1ncm91cC1idG4gPiAuYnRuIHtcbiAgQGV4dGVuZCAuaW5wdXQtbGc7XG59XG4uaW5wdXQtZ3JvdXAtc20gPiAuZm9ybS1jb250cm9sLFxuLmlucHV0LWdyb3VwLXNtID4gLmlucHV0LWdyb3VwLWFkZG9uLFxuLmlucHV0LWdyb3VwLXNtID4gLmlucHV0LWdyb3VwLWJ0biA+IC5idG4ge1xuICBAZXh0ZW5kIC5pbnB1dC1zbTtcbn1cblxuXG4vLyBEaXNwbGF5IGFzIHRhYmxlLWNlbGxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5pbnB1dC1ncm91cC1hZGRvbixcbi5pbnB1dC1ncm91cC1idG4sXG4uaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbCB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG5cbiAgJjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICB9XG59XG4vLyBBZGRvbiBhbmQgYWRkb24gd3JhcHBlciBmb3IgYnV0dG9uc1xuLmlucHV0LWdyb3VwLWFkZG9uLFxuLmlucHV0LWdyb3VwLWJ0biB7XG4gIHdpZHRoOiAxJTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgLy8gTWF0Y2ggdGhlIGlucHV0c1xufVxuXG4vLyBUZXh0IGlucHV0IGdyb3Vwc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLmlucHV0LWdyb3VwLWFkZG9uIHtcbiAgcGFkZGluZzogJHBhZGRpbmctYmFzZS12ZXJ0aWNhbCAkcGFkZGluZy1iYXNlLWhvcml6b250YWw7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY29sb3I6ICRpbnB1dC1jb2xvcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkaW5wdXQtZ3JvdXAtYWRkb24tYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRpbnB1dC1ncm91cC1hZGRvbi1ib3JkZXItY29sb3I7XG4gIGJvcmRlci1yYWRpdXM6ICRpbnB1dC1ib3JkZXItcmFkaXVzO1xuXG4gIC8vIFNpemluZ1xuICAmLmlucHV0LXNtIHtcbiAgICBwYWRkaW5nOiAkcGFkZGluZy1zbWFsbC12ZXJ0aWNhbCAkcGFkZGluZy1zbWFsbC1ob3Jpem9udGFsO1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcbiAgICBib3JkZXItcmFkaXVzOiAkaW5wdXQtYm9yZGVyLXJhZGl1cy1zbWFsbDtcbiAgfVxuICAmLmlucHV0LWxnIHtcbiAgICBwYWRkaW5nOiAkcGFkZGluZy1sYXJnZS12ZXJ0aWNhbCAkcGFkZGluZy1sYXJnZS1ob3Jpem9udGFsO1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1sYXJnZTtcbiAgICBib3JkZXItcmFkaXVzOiAkaW5wdXQtYm9yZGVyLXJhZGl1cy1sYXJnZTtcbiAgfVxuXG4gIC8vIE51a2UgZGVmYXVsdCBtYXJnaW5zIGZyb20gY2hlY2tib3hlcyBhbmQgcmFkaW9zIHRvIHZlcnRpY2FsbHkgY2VudGVyIHdpdGhpbi5cbiAgaW5wdXRbdHlwZT1cInJhZGlvXCJdLFxuICBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0ge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cbn1cblxuLy8gUmVzZXQgcm91bmRlZCBjb3JuZXJzXG4uaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbDpmaXJzdC1jaGlsZCxcbi5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCxcbi5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQgPiAuYnRuLFxuLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZCA+IC5idG4tZ3JvdXAgPiAuYnRuLFxuLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZCA+IC5kcm9wZG93bi10b2dnbGUsXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuOm5vdCg6bGFzdC1jaGlsZCk6bm90KC5kcm9wZG93bi10b2dnbGUpLFxuLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkID4gLmJ0bi1ncm91cDpub3QoOmxhc3QtY2hpbGQpID4gLmJ0biB7XG4gIEBpbmNsdWRlIGJvcmRlci1yaWdodC1yYWRpdXMoMCk7XG59XG4uaW5wdXQtZ3JvdXAtYWRkb246Zmlyc3QtY2hpbGQge1xuICBib3JkZXItcmlnaHQ6IDA7XG59XG4uaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbDpsYXN0LWNoaWxkLFxuLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQsXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuYnRuLFxuLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkID4gLmJ0bi1ncm91cCA+IC5idG4sXG4uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQgPiAuZHJvcGRvd24tdG9nZ2xlLFxuLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZCA+IC5idG46bm90KDpmaXJzdC1jaGlsZCksXG4uaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkID4gLmJ0bi1ncm91cDpub3QoOmZpcnN0LWNoaWxkKSA+IC5idG4ge1xuICBAaW5jbHVkZSBib3JkZXItbGVmdC1yYWRpdXMoMCk7XG59XG4uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZCB7XG4gIGJvcmRlci1sZWZ0OiAwO1xufVxuXG4vLyBCdXR0b24gaW5wdXQgZ3JvdXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4uaW5wdXQtZ3JvdXAtYnRuIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAvLyBKYW5raWx5IHByZXZlbnQgaW5wdXQgYnV0dG9uIGdyb3VwcyBmcm9tIHdyYXBwaW5nIHdpdGggYHdoaXRlLXNwYWNlYCBhbmRcbiAgLy8gYGZvbnQtc2l6ZWAgaW4gY29tYmluYXRpb24gd2l0aCBgaW5saW5lLWJsb2NrYCBvbiBidXR0b25zLlxuICBmb250LXNpemU6IDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgLy8gTmVnYXRpdmUgbWFyZ2luIGZvciBzcGFjaW5nLCBwb3NpdGlvbiBmb3IgYnJpbmdpbmcgaG92ZXJlZC9mb2N1c2VkL2FjdGl2ZWRcbiAgLy8gZWxlbWVudCBhYm92ZSB0aGUgc2libGluZ3MuXG4gID4gLmJ0biB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICsgLmJ0biB7XG4gICAgICBtYXJnaW4tbGVmdDogLTFweDtcbiAgICB9XG4gICAgLy8gQnJpbmcgdGhlIFwiYWN0aXZlXCIgYnV0dG9uIHRvIHRoZSBmcm9udFxuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyxcbiAgICAmOmFjdGl2ZSB7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cbiAgfVxuXG4gIC8vIE5lZ2F0aXZlIG1hcmdpbiB0byBvbmx5IGhhdmUgYSAxcHggYm9yZGVyIGJldHdlZW4gdGhlIHR3b1xuICAmOmZpcnN0LWNoaWxkIHtcbiAgICA+IC5idG4sXG4gICAgPiAuYnRuLWdyb3VwIHtcbiAgICAgIG1hcmdpbi1yaWdodDogLTFweDtcbiAgICB9XG4gIH1cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICA+IC5idG4sXG4gICAgPiAuYnRuLWdyb3VwIHtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgICBtYXJnaW4tbGVmdDogLTFweDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vXG4vLyBOYXZzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEJhc2UgY2xhc3Ncbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5uYXYge1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDA7IC8vIE92ZXJyaWRlIGRlZmF1bHQgdWwvb2xcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgQGluY2x1ZGUgY2xlYXJmaXg7XG5cbiAgPiBsaSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgPiBhIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogJG5hdi1saW5rLXBhZGRpbmc7XG4gICAgICAmOmhvdmVyLFxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdi1saW5rLWhvdmVyLWJnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERpc2FibGVkIHN0YXRlIHNldHMgdGV4dCB0byBncmF5IGFuZCBudWtlcyBob3Zlci90YWIgZWZmZWN0c1xuICAgICYuZGlzYWJsZWQgPiBhIHtcbiAgICAgIGNvbG9yOiAkbmF2LWRpc2FibGVkLWxpbmstY29sb3I7XG5cbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgY29sb3I6ICRuYXYtZGlzYWJsZWQtbGluay1ob3Zlci1jb2xvcjtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgY3Vyc29yOiAkY3Vyc29yLWRpc2FibGVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW4gZHJvcGRvd25zXG4gIC5vcGVuID4gYSB7XG4gICAgJixcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdi1saW5rLWhvdmVyLWJnO1xuICAgICAgYm9yZGVyLWNvbG9yOiAkbGluay1jb2xvcjtcbiAgICB9XG4gIH1cblxuICAvLyBOYXYgZGl2aWRlcnMgKGRlcHJlY2F0ZWQgd2l0aCB2My4wLjEpXG4gIC8vXG4gIC8vIFRoaXMgc2hvdWxkIGhhdmUgYmVlbiByZW1vdmVkIGluIHYzIHdpdGggdGhlIGRyb3BwaW5nIG9mIGAubmF2LWxpc3RgLCBidXRcbiAgLy8gd2UgbWlzc2VkIGl0LiBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCB0aGlzIGFueXdoZXJlLCBidXQgaW4gdGhlIGludGVyZXN0XG4gIC8vIG9mIG1haW50YWluaW5nIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgaW4gY2FzZSB5b3UgdXNlIGl0LCBpdCdzIGRlcHJlY2F0ZWQuXG4gIC5uYXYtZGl2aWRlciB7XG4gICAgQGluY2x1ZGUgbmF2LWRpdmlkZXI7XG4gIH1cblxuICAvLyBQcmV2ZW50IElFOCBmcm9tIG1pc3BsYWNpbmcgaW1nc1xuICAvL1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2g1YnAvaHRtbDUtYm9pbGVycGxhdGUvaXNzdWVzLzk4NCNpc3N1ZWNvbW1lbnQtMzk4NTk4OVxuICA+IGxpID4gYSA+IGltZyB7XG4gICAgbWF4LXdpZHRoOiBub25lO1xuICB9XG59XG5cblxuLy8gVGFic1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBHaXZlIHRoZSB0YWJzIHNvbWV0aGluZyB0byBzaXQgb25cbi5uYXYtdGFicyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkbmF2LXRhYnMtYm9yZGVyLWNvbG9yO1xuICA+IGxpIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICAvLyBNYWtlIHRoZSBsaXN0LWl0ZW1zIG92ZXJsYXkgdGhlIGJvdHRvbSBib3JkZXJcbiAgICBtYXJnaW4tYm90dG9tOiAtMXB4O1xuXG4gICAgLy8gQWN0dWFsIHRhYnMgKGFzIGxpbmtzKVxuICAgID4gYSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDJweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtYmFzZTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZSAkYm9yZGVyLXJhZGl1cy1iYXNlIDAgMDtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBib3JkZXItY29sb3I6ICRuYXYtdGFicy1saW5rLWhvdmVyLWJvcmRlci1jb2xvciAkbmF2LXRhYnMtbGluay1ob3Zlci1ib3JkZXItY29sb3IgJG5hdi10YWJzLWJvcmRlci1jb2xvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBY3RpdmUgc3RhdGUsIGFuZCBpdHMgOmhvdmVyIHRvIG92ZXJyaWRlIG5vcm1hbCA6aG92ZXJcbiAgICAmLmFjdGl2ZSA+IGEge1xuICAgICAgJixcbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgY29sb3I6ICRuYXYtdGFicy1hY3RpdmUtbGluay1ob3Zlci1jb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdi10YWJzLWFjdGl2ZS1saW5rLWhvdmVyLWJnO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkbmF2LXRhYnMtYWN0aXZlLWxpbmstaG92ZXItYm9yZGVyLWNvbG9yO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBwdWxsaW5nIHRoaXMgaW4gbWFpbmx5IGZvciBsZXNzIHNob3J0aGFuZFxuICAmLm5hdi1qdXN0aWZpZWQge1xuICAgIEBleHRlbmQgLm5hdi1qdXN0aWZpZWQ7XG4gICAgQGV4dGVuZCAubmF2LXRhYnMtanVzdGlmaWVkO1xuICB9XG59XG5cblxuLy8gUGlsbHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5uYXYtcGlsbHMge1xuICA+IGxpIHtcbiAgICBmbG9hdDogbGVmdDtcblxuICAgIC8vIExpbmtzIHJlbmRlcmVkIGFzIHBpbGxzXG4gICAgPiBhIHtcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRuYXYtcGlsbHMtYm9yZGVyLXJhZGl1cztcbiAgICB9XG4gICAgKyBsaSB7XG4gICAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgIH1cblxuICAgIC8vIEFjdGl2ZSBzdGF0ZVxuICAgICYuYWN0aXZlID4gYSB7XG4gICAgICAmLFxuICAgICAgJjpob3ZlcixcbiAgICAgICY6Zm9jdXMge1xuICAgICAgICBjb2xvcjogJG5hdi1waWxscy1hY3RpdmUtbGluay1ob3Zlci1jb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdi1waWxscy1hY3RpdmUtbGluay1ob3Zlci1iZztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG4vLyBTdGFja2VkIHBpbGxzXG4ubmF2LXN0YWNrZWQge1xuICA+IGxpIHtcbiAgICBmbG9hdDogbm9uZTtcbiAgICArIGxpIHtcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwOyAvLyBubyBuZWVkIGZvciB0aGlzIGdhcCBiZXR3ZWVuIG5hdiBpdGVtc1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIE5hdiB2YXJpYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBKdXN0aWZpZWQgbmF2IGxpbmtzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5uYXYtanVzdGlmaWVkIHtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgPiBsaSB7XG4gICAgZmxvYXQ6IG5vbmU7XG4gICAgPiBhIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICB9XG4gIH1cblxuICA+IC5kcm9wZG93biAuZHJvcGRvd24tbWVudSB7XG4gICAgdG9wOiBhdXRvO1xuICAgIGxlZnQ6IGF1dG87XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIHtcbiAgICA+IGxpIHtcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgICB3aWR0aDogMSU7XG4gICAgICA+IGEge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBNb3ZlIGJvcmRlcnMgdG8gYW5jaG9ycyBpbnN0ZWFkIG9mIGJvdHRvbSBvZiBsaXN0XG4vL1xuLy8gTWl4aW4gZm9yIGFkZGluZyBvbiB0b3AgdGhlIHNoYXJlZCBgLm5hdi1qdXN0aWZpZWRgIHN0eWxlcyBmb3Igb3VyIHRhYnNcbi5uYXYtdGFicy1qdXN0aWZpZWQge1xuICBib3JkZXItYm90dG9tOiAwO1xuXG4gID4gbGkgPiBhIHtcbiAgICAvLyBPdmVycmlkZSBtYXJnaW4gZnJvbSAubmF2LXRhYnNcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZTtcbiAgfVxuXG4gID4gLmFjdGl2ZSA+IGEsXG4gID4gLmFjdGl2ZSA+IGE6aG92ZXIsXG4gID4gLmFjdGl2ZSA+IGE6Zm9jdXMge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICRuYXYtdGFicy1qdXN0aWZpZWQtbGluay1ib3JkZXItY29sb3I7XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIHtcbiAgICA+IGxpID4gYSB7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJG5hdi10YWJzLWp1c3RpZmllZC1saW5rLWJvcmRlci1jb2xvcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzLWJhc2UgJGJvcmRlci1yYWRpdXMtYmFzZSAwIDA7XG4gICAgfVxuICAgID4gLmFjdGl2ZSA+IGEsXG4gICAgPiAuYWN0aXZlID4gYTpob3ZlcixcbiAgICA+IC5hY3RpdmUgPiBhOmZvY3VzIHtcbiAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICRuYXYtdGFicy1qdXN0aWZpZWQtYWN0aXZlLWxpbmstYm9yZGVyLWNvbG9yO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIFRhYmJhYmxlIHRhYnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSGlkZSB0YWJiYWJsZSBwYW5lcyB0byBzdGFydCwgc2hvdyB0aGVtIHdoZW4gYC5hY3RpdmVgXG4udGFiLWNvbnRlbnQge1xuICA+IC50YWItcGFuZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuICA+IC5hY3RpdmUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG59XG5cblxuLy8gRHJvcGRvd25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFNwZWNpZmljIGRyb3Bkb3duc1xuLm5hdi10YWJzIC5kcm9wZG93bi1tZW51IHtcbiAgLy8gbWFrZSBkcm9wZG93biBib3JkZXIgb3ZlcmxhcCB0YWIgYm9yZGVyXG4gIG1hcmdpbi10b3A6IC0xcHg7XG4gIC8vIFJlbW92ZSB0aGUgdG9wIHJvdW5kZWQgY29ybmVycyBoZXJlIHNpbmNlIHRoZXJlIGlzIGEgaGFyZCBlZGdlIGFib3ZlIHRoZSBtZW51XG4gIEBpbmNsdWRlIGJvcmRlci10b3AtcmFkaXVzKDApO1xufVxuIiwiLy9cbi8vIE5hdmJhcnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gV3JhcHBlciBhbmQgYmFzZSBjbGFzc1xuLy9cbi8vIFByb3ZpZGUgYSBzdGF0aWMgbmF2YmFyIGZyb20gd2hpY2ggd2UgZXhwYW5kIHRvIGNyZWF0ZSBmdWxsLXdpZHRoLCBmaXhlZCwgYW5kXG4vLyBvdGhlciBuYXZiYXIgdmFyaWF0aW9ucy5cblxuLm5hdmJhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogJG5hdmJhci1oZWlnaHQ7IC8vIEVuc3VyZSBhIG5hdmJhciBhbHdheXMgc2hvd3MgKGUuZy4sIHdpdGhvdXQgYSAubmF2YmFyLWJyYW5kIGluIGNvbGxhcHNlZCBtb2RlKVxuICBtYXJnaW4tYm90dG9tOiAkbmF2YmFyLW1hcmdpbi1ib3R0b207XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuXG4gIC8vIFByZXZlbnQgZmxvYXRzIGZyb20gYnJlYWtpbmcgdGhlIG5hdmJhclxuICBAaW5jbHVkZSBjbGVhcmZpeDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogJGdyaWQtZmxvYXQtYnJlYWtwb2ludCkge1xuICAgIGJvcmRlci1yYWRpdXM6ICRuYXZiYXItYm9yZGVyLXJhZGl1cztcbiAgfVxufVxuXG5cbi8vIE5hdmJhciBoZWFkaW5nXG4vL1xuLy8gR3JvdXBzIGAubmF2YmFyLWJyYW5kYCBhbmQgYC5uYXZiYXItdG9nZ2xlYCBpbnRvIGEgc2luZ2xlIGNvbXBvbmVudCBmb3IgZWFzeVxuLy8gc3R5bGluZyBvZiByZXNwb25zaXZlIGFzcGVjdHMuXG5cbi5uYXZiYXItaGVhZGVyIHtcbiAgQGluY2x1ZGUgY2xlYXJmaXg7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICRncmlkLWZsb2F0LWJyZWFrcG9pbnQpIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxufVxuXG5cbi8vIE5hdmJhciBjb2xsYXBzZSAoYm9keSlcbi8vXG4vLyBHcm91cCB5b3VyIG5hdmJhciBjb250ZW50IGludG8gdGhpcyBmb3IgZWFzeSBjb2xsYXBzaW5nIGFuZCBleHBhbmRpbmcgYWNyb3NzXG4vLyB2YXJpb3VzIGRldmljZSBzaXplcy4gQnkgZGVmYXVsdCwgdGhpcyBjb250ZW50IGlzIGNvbGxhcHNlZCB3aGVuIDw3NjhweCwgYnV0XG4vLyB3aWxsIGV4cGFuZCBwYXN0IHRoYXQgZm9yIGEgaG9yaXpvbnRhbCBkaXNwbGF5LlxuLy9cbi8vIFRvIHN0YXJ0IChvbiBtb2JpbGUgZGV2aWNlcykgdGhlIG5hdmJhciBsaW5rcywgZm9ybXMsIGFuZCBidXR0b25zIGFyZSBzdGFja2VkXG4vLyB2ZXJ0aWNhbGx5IGFuZCBpbmNsdWRlIGEgYG1heC1oZWlnaHRgIHRvIG92ZXJmbG93IGluIGNhc2UgeW91IGhhdmUgdG9vIG11Y2hcbi8vIGNvbnRlbnQgZm9yIHRoZSB1c2VyJ3Mgdmlld3BvcnQuXG5cbi5uYXZiYXItY29sbGFwc2Uge1xuICBvdmVyZmxvdy14OiB2aXNpYmxlO1xuICBwYWRkaW5nLXJpZ2h0OiAkbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDtcbiAgcGFkZGluZy1sZWZ0OiAgJG5hdmJhci1wYWRkaW5nLWhvcml6b250YWw7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LC4xKTtcbiAgQGluY2x1ZGUgY2xlYXJmaXg7XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcblxuICAmLmluIHtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICRncmlkLWZsb2F0LWJyZWFrcG9pbnQpIHtcbiAgICB3aWR0aDogYXV0bztcbiAgICBib3JkZXItdG9wOiAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG5cbiAgICAmLmNvbGxhcHNlIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAwOyAvLyBPdmVycmlkZSBkZWZhdWx0IHNldHRpbmdcbiAgICAgIG92ZXJmbG93OiB2aXNpYmxlICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgJi5pbiB7XG4gICAgICBvdmVyZmxvdy15OiB2aXNpYmxlO1xuICAgIH1cblxuICAgIC8vIFVuZG8gdGhlIGNvbGxhcHNlIHNpZGUgcGFkZGluZyBmb3IgbmF2YmFycyB3aXRoIGNvbnRhaW5lcnMgdG8gZW5zdXJlXG4gICAgLy8gYWxpZ25tZW50IG9mIHJpZ2h0LWFsaWduZWQgY29udGVudHMuXG4gICAgLm5hdmJhci1maXhlZC10b3AgJixcbiAgICAubmF2YmFyLXN0YXRpYy10b3AgJixcbiAgICAubmF2YmFyLWZpeGVkLWJvdHRvbSAmIHtcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuICB9XG59XG5cbi5uYXZiYXItZml4ZWQtdG9wLFxuLm5hdmJhci1maXhlZC1ib3R0b20ge1xuICAubmF2YmFyLWNvbGxhcHNlIHtcbiAgICBtYXgtaGVpZ2h0OiAkbmF2YmFyLWNvbGxhcHNlLW1heC1oZWlnaHQ7XG5cbiAgICBAbWVkaWEgKG1heC1kZXZpY2Utd2lkdGg6ICRzY3JlZW4teHMtbWluKSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIEJvdGggbmF2YmFyIGhlYWRlciBhbmQgY29sbGFwc2Vcbi8vXG4vLyBXaGVuIGEgY29udGFpbmVyIGlzIHByZXNlbnQsIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgdGhlIGhlYWRlciBhbmQgY29sbGFwc2UuXG5cbi5jb250YWluZXIsXG4uY29udGFpbmVyLWZsdWlkIHtcbiAgPiAubmF2YmFyLWhlYWRlcixcbiAgPiAubmF2YmFyLWNvbGxhcHNlIHtcbiAgICBtYXJnaW4tcmlnaHQ6IC0kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDtcbiAgICBtYXJnaW4tbGVmdDogIC0kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkZ3JpZC1mbG9hdC1icmVha3BvaW50KSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICBtYXJnaW4tbGVmdDogIDA7XG4gICAgfVxuICB9XG59XG5cblxuLy9cbi8vIE5hdmJhciBhbGlnbm1lbnQgb3B0aW9uc1xuLy9cbi8vIERpc3BsYXkgdGhlIG5hdmJhciBhY3Jvc3MgdGhlIGVudGlyZXR5IG9mIHRoZSBwYWdlIG9yIGZpeGVkIGl0IHRvIHRoZSB0b3Agb3Jcbi8vIGJvdHRvbSBvZiB0aGUgcGFnZS5cblxuLy8gU3RhdGljIHRvcCAodW5maXhlZCwgYnV0IDEwMCUgd2lkZSkgbmF2YmFyXG4ubmF2YmFyLXN0YXRpYy10b3Age1xuICB6LWluZGV4OiAkemluZGV4LW5hdmJhcjtcbiAgYm9yZGVyLXdpZHRoOiAwIDAgMXB4O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkZ3JpZC1mbG9hdC1icmVha3BvaW50KSB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgfVxufVxuXG4vLyBGaXggdGhlIHRvcC9ib3R0b20gbmF2YmFycyB3aGVuIHNjcmVlbiByZWFsIGVzdGF0ZSBzdXBwb3J0cyBpdFxuLm5hdmJhci1maXhlZC10b3AsXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6ICR6aW5kZXgtbmF2YmFyLWZpeGVkO1xuXG4gIC8vIFVuZG8gdGhlIHJvdW5kZWQgY29ybmVyc1xuICBAbWVkaWEgKG1pbi13aWR0aDogJGdyaWQtZmxvYXQtYnJlYWtwb2ludCkge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cbn1cbi5uYXZiYXItZml4ZWQtdG9wIHtcbiAgdG9wOiAwO1xuICBib3JkZXItd2lkdGg6IDAgMCAxcHg7XG59XG4ubmF2YmFyLWZpeGVkLWJvdHRvbSB7XG4gIGJvdHRvbTogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDsgLy8gb3ZlcnJpZGUgLm5hdmJhciBkZWZhdWx0c1xuICBib3JkZXItd2lkdGg6IDFweCAwIDA7XG59XG5cblxuLy8gQnJhbmQvcHJvamVjdCBuYW1lXG5cbi5uYXZiYXItYnJhbmQge1xuICBmbG9hdDogbGVmdDtcbiAgcGFkZGluZzogJG5hdmJhci1wYWRkaW5nLXZlcnRpY2FsICRuYXZiYXItcGFkZGluZy1ob3Jpem9udGFsO1xuICBmb250LXNpemU6ICRmb250LXNpemUtbGFyZ2U7XG4gIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGhlaWdodDogJG5hdmJhci1oZWlnaHQ7XG5cbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB9XG5cbiAgPiBpbWcge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICRncmlkLWZsb2F0LWJyZWFrcG9pbnQpIHtcbiAgICAubmF2YmFyID4gLmNvbnRhaW5lciAmLFxuICAgIC5uYXZiYXIgPiAuY29udGFpbmVyLWZsdWlkICYge1xuICAgICAgbWFyZ2luLWxlZnQ6IC0kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBOYXZiYXIgdG9nZ2xlXG4vL1xuLy8gQ3VzdG9tIGJ1dHRvbiBmb3IgdG9nZ2xpbmcgdGhlIGAubmF2YmFyLWNvbGxhcHNlYCwgcG93ZXJlZCBieSB0aGUgY29sbGFwc2Vcbi8vIEphdmFTY3JpcHQgcGx1Z2luLlxuXG4ubmF2YmFyLXRvZ2dsZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6ICRuYXZiYXItcGFkZGluZy1ob3Jpem9udGFsO1xuICBwYWRkaW5nOiA5cHggMTBweDtcbiAgQGluY2x1ZGUgbmF2YmFyLXZlcnRpY2FsLWFsaWduKDM0cHgpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTsgLy8gUmVzZXQgdW51c3VhbCBGaXJlZm94LW9uLUFuZHJvaWQgZGVmYXVsdCBzdHlsZTsgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MvaXNzdWVzLzIxNFxuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZTtcblxuICAvLyBXZSByZW1vdmUgdGhlIGBvdXRsaW5lYCBoZXJlLCBidXQgbGF0ZXIgY29tcGVuc2F0ZSBieSBhdHRhY2hpbmcgYDpob3ZlcmBcbiAgLy8gc3R5bGVzIHRvIGA6Zm9jdXNgLlxuICAmOmZvY3VzIHtcbiAgICBvdXRsaW5lOiAwO1xuICB9XG5cbiAgLy8gQmFyc1xuICAuaWNvbi1iYXIge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAyMnB4O1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgfVxuICAuaWNvbi1iYXIgKyAuaWNvbi1iYXIge1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkZ3JpZC1mbG9hdC1icmVha3BvaW50KSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuXG5cbi8vIE5hdmJhciBuYXYgbGlua3Ncbi8vXG4vLyBCdWlsZHMgb24gdG9wIG9mIHRoZSBgLm5hdmAgY29tcG9uZW50cyB3aXRoIGl0cyBvd24gbW9kaWZpZXIgY2xhc3MgdG8gbWFrZVxuLy8gdGhlIG5hdiB0aGUgZnVsbCBoZWlnaHQgb2YgdGhlIGhvcml6b250YWwgbmF2IChhYm92ZSA3NjhweCkuXG5cbi5uYXZiYXItbmF2IHtcbiAgbWFyZ2luOiAoJG5hdmJhci1wYWRkaW5nLXZlcnRpY2FsIC8gMikgKC0kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbCk7XG5cbiAgPiBsaSA+IGEge1xuICAgIHBhZGRpbmctdG9wOiAgICAxMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIH1cblxuICBAbWVkaWEgKG1heC13aWR0aDogJGdyaWQtZmxvYXQtYnJlYWtwb2ludC1tYXgpIHtcbiAgICAvLyBEcm9wZG93bnMgZ2V0IGN1c3RvbSBkaXNwbGF5IHdoZW4gY29sbGFwc2VkXG4gICAgLm9wZW4gLmRyb3Bkb3duLW1lbnUge1xuICAgICAgcG9zaXRpb246IHN0YXRpYztcbiAgICAgIGZsb2F0OiBub25lO1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgPiBsaSA+IGEsXG4gICAgICAuZHJvcGRvd24taGVhZGVyIHtcbiAgICAgICAgcGFkZGluZzogNXB4IDE1cHggNXB4IDI1cHg7XG4gICAgICB9XG4gICAgICA+IGxpID4gYSB7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gICAgICAgICY6aG92ZXIsXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBVbmNvbGxhcHNlIHRoZSBuYXZcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRncmlkLWZsb2F0LWJyZWFrcG9pbnQpIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBtYXJnaW46IDA7XG5cbiAgICA+IGxpIHtcbiAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgPiBhIHtcbiAgICAgICAgcGFkZGluZy10b3A6ICAgICRuYXZiYXItcGFkZGluZy12ZXJ0aWNhbDtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICRuYXZiYXItcGFkZGluZy12ZXJ0aWNhbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG4vLyBOYXZiYXIgZm9ybVxuLy9cbi8vIEV4dGVuc2lvbiBvZiB0aGUgYC5mb3JtLWlubGluZWAgd2l0aCBzb21lIGV4dHJhIGZsYXZvciBmb3Igb3B0aW11bSBkaXNwbGF5IGluXG4vLyBvdXIgbmF2YmFycy5cblxuLm5hdmJhci1mb3JtIHtcbiAgbWFyZ2luLWxlZnQ6IC0kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDtcbiAgbWFyZ2luLXJpZ2h0OiAtJG5hdmJhci1wYWRkaW5nLWhvcml6b250YWw7XG4gIHBhZGRpbmc6IDEwcHggJG5hdmJhci1wYWRkaW5nLWhvcml6b250YWw7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAkc2hhZG93OiBpbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjEpLCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjEpO1xuICBAaW5jbHVkZSBib3gtc2hhZG93KCRzaGFkb3cpO1xuXG4gIC8vIE1peGluIGJlaGF2aW9yIGZvciBvcHRpbXVtIGRpc3BsYXlcbiAgQGluY2x1ZGUgZm9ybS1pbmxpbmU7XG5cbiAgLmZvcm0tZ3JvdXAge1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAkZ3JpZC1mbG9hdC1icmVha3BvaW50LW1heCkge1xuICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuXG4gICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFZlcnRpY2FsbHkgY2VudGVyIGluIGV4cGFuZGVkLCBob3Jpem9udGFsIG5hdmJhclxuICBAaW5jbHVkZSBuYXZiYXItdmVydGljYWwtYWxpZ24oJGlucHV0LWhlaWdodC1iYXNlKTtcblxuICAvLyBVbmRvIDEwMCUgd2lkdGggZm9yIHB1bGwgY2xhc3Nlc1xuICBAbWVkaWEgKG1pbi13aWR0aDogJGdyaWQtZmxvYXQtYnJlYWtwb2ludCkge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIGJvcmRlcjogMDtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgcGFkZGluZy10b3A6IDA7XG4gICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgQGluY2x1ZGUgYm94LXNoYWRvdyhub25lKTtcbiAgfVxufVxuXG5cbi8vIERyb3Bkb3duIG1lbnVzXG5cbi8vIE1lbnUgcG9zaXRpb24gYW5kIG1lbnUgY2FyZXRzXG4ubmF2YmFyLW5hdiA+IGxpID4gLmRyb3Bkb3duLW1lbnUge1xuICBtYXJnaW4tdG9wOiAwO1xuICBAaW5jbHVkZSBib3JkZXItdG9wLXJhZGl1cygwKTtcbn1cbi8vIE1lbnUgcG9zaXRpb24gYW5kIG1lbnUgY2FyZXQgc3VwcG9ydCBmb3IgZHJvcHVwcyB2aWEgZXh0cmEgZHJvcHVwIGNsYXNzXG4ubmF2YmFyLWZpeGVkLWJvdHRvbSAubmF2YmFyLW5hdiA+IGxpID4gLmRyb3Bkb3duLW1lbnUge1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBAaW5jbHVkZSBib3JkZXItdG9wLXJhZGl1cygkbmF2YmFyLWJvcmRlci1yYWRpdXMpO1xuICBAaW5jbHVkZSBib3JkZXItYm90dG9tLXJhZGl1cygwKTtcbn1cblxuXG4vLyBCdXR0b25zIGluIG5hdmJhcnNcbi8vXG4vLyBWZXJ0aWNhbGx5IGNlbnRlciBhIGJ1dHRvbiB3aXRoaW4gYSBuYXZiYXIgKHdoZW4gKm5vdCogaW4gYSBmb3JtKS5cblxuLm5hdmJhci1idG4ge1xuICBAaW5jbHVkZSBuYXZiYXItdmVydGljYWwtYWxpZ24oJGlucHV0LWhlaWdodC1iYXNlKTtcblxuICAmLmJ0bi1zbSB7XG4gICAgQGluY2x1ZGUgbmF2YmFyLXZlcnRpY2FsLWFsaWduKCRpbnB1dC1oZWlnaHQtc21hbGwpO1xuICB9XG4gICYuYnRuLXhzIHtcbiAgICBAaW5jbHVkZSBuYXZiYXItdmVydGljYWwtYWxpZ24oMjIpO1xuICB9XG59XG5cblxuLy8gVGV4dCBpbiBuYXZiYXJzXG4vL1xuLy8gQWRkIGEgY2xhc3MgdG8gbWFrZSBhbnkgZWxlbWVudCBwcm9wZXJseSBhbGlnbiBpdHNlbGYgdmVydGljYWxseSB3aXRoaW4gdGhlIG5hdmJhcnMuXG5cbi5uYXZiYXItdGV4dCB7XG4gIEBpbmNsdWRlIG5hdmJhci12ZXJ0aWNhbC1hbGlnbigkbGluZS1oZWlnaHQtY29tcHV0ZWQpO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAkZ3JpZC1mbG9hdC1icmVha3BvaW50KSB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgbWFyZ2luLWxlZnQ6ICRuYXZiYXItcGFkZGluZy1ob3Jpem9udGFsO1xuICAgIG1hcmdpbi1yaWdodDogJG5hdmJhci1wYWRkaW5nLWhvcml6b250YWw7XG4gIH1cbn1cblxuXG4vLyBDb21wb25lbnQgYWxpZ25tZW50XG4vL1xuLy8gUmVwdXJwb3NlIHRoZSBwdWxsIHV0aWxpdGllcyBhcyB0aGVpciBvd24gbmF2YmFyIHV0aWxpdGllcyB0byBhdm9pZCBzcGVjaWZpY2l0eVxuLy8gaXNzdWVzIHdpdGggcGFyZW50cyBhbmQgY2hhaW5pbmcuIE9ubHkgZG8gdGhpcyB3aGVuIHRoZSBuYXZiYXIgaXMgdW5jb2xsYXBzZWRcbi8vIHRob3VnaCBzbyB0aGF0IG5hdmJhciBjb250ZW50cyBwcm9wZXJseSBzdGFjayBhbmQgYWxpZ24gaW4gbW9iaWxlLlxuLy9cbi8vIERlY2xhcmVkIGFmdGVyIHRoZSBuYXZiYXIgY29tcG9uZW50cyB0byBlbnN1cmUgbW9yZSBzcGVjaWZpY2l0eSBvbiB0aGUgbWFyZ2lucy5cblxuQG1lZGlhIChtaW4td2lkdGg6ICRncmlkLWZsb2F0LWJyZWFrcG9pbnQpIHtcbiAgLm5hdmJhci1sZWZ0IHtcbiAgICBmbG9hdDogbGVmdCAhaW1wb3J0YW50O1xuICB9XG4gIC5uYXZiYXItcmlnaHQge1xuICAgIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IC0kbmF2YmFyLXBhZGRpbmctaG9yaXpvbnRhbDtcblxuICAgIH4gLm5hdmJhci1yaWdodCB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuICB9XG59XG5cblxuLy8gQWx0ZXJuYXRlIG5hdmJhcnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIERlZmF1bHQgbmF2YmFyXG4ubmF2YmFyLWRlZmF1bHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtYmc7XG4gIGJvcmRlci1jb2xvcjogJG5hdmJhci1kZWZhdWx0LWJvcmRlcjtcblxuICAubmF2YmFyLWJyYW5kIHtcbiAgICBjb2xvcjogJG5hdmJhci1kZWZhdWx0LWJyYW5kLWNvbG9yO1xuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBjb2xvcjogJG5hdmJhci1kZWZhdWx0LWJyYW5kLWhvdmVyLWNvbG9yO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1kZWZhdWx0LWJyYW5kLWhvdmVyLWJnO1xuICAgIH1cbiAgfVxuXG4gIC5uYXZiYXItdGV4dCB7XG4gICAgY29sb3I6ICRuYXZiYXItZGVmYXVsdC1jb2xvcjtcbiAgfVxuXG4gIC5uYXZiYXItbmF2IHtcbiAgICA+IGxpID4gYSB7XG4gICAgICBjb2xvcjogJG5hdmJhci1kZWZhdWx0LWxpbmstY29sb3I7XG5cbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWhvdmVyLWNvbG9yO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1ob3Zlci1iZztcbiAgICAgIH1cbiAgICB9XG4gICAgPiAuYWN0aXZlID4gYSB7XG4gICAgICAmLFxuICAgICAgJjpob3ZlcixcbiAgICAgICY6Zm9jdXMge1xuICAgICAgICBjb2xvcjogJG5hdmJhci1kZWZhdWx0LWxpbmstYWN0aXZlLWNvbG9yO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1hY3RpdmUtYmc7XG4gICAgICB9XG4gICAgfVxuICAgID4gLmRpc2FibGVkID4gYSB7XG4gICAgICAmLFxuICAgICAgJjpob3ZlcixcbiAgICAgICY6Zm9jdXMge1xuICAgICAgICBjb2xvcjogJG5hdmJhci1kZWZhdWx0LWxpbmstZGlzYWJsZWQtY29sb3I7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWRpc2FibGVkLWJnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5uYXZiYXItdG9nZ2xlIHtcbiAgICBib3JkZXItY29sb3I6ICRuYXZiYXItZGVmYXVsdC10b2dnbGUtYm9yZGVyLWNvbG9yO1xuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtdG9nZ2xlLWhvdmVyLWJnO1xuICAgIH1cbiAgICAuaWNvbi1iYXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1kZWZhdWx0LXRvZ2dsZS1pY29uLWJhci1iZztcbiAgICB9XG4gIH1cblxuICAubmF2YmFyLWNvbGxhcHNlLFxuICAubmF2YmFyLWZvcm0ge1xuICAgIGJvcmRlci1jb2xvcjogJG5hdmJhci1kZWZhdWx0LWJvcmRlcjtcbiAgfVxuXG4gIC8vIERyb3Bkb3duIG1lbnUgaXRlbXNcbiAgLm5hdmJhci1uYXYge1xuICAgIC8vIFJlbW92ZSBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gb3BlbiBkcm9wZG93blxuICAgID4gLm9wZW4gPiBhIHtcbiAgICAgICYsXG4gICAgICAmOmhvdmVyLFxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWFjdGl2ZS1iZztcbiAgICAgICAgY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWFjdGl2ZS1jb2xvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogJGdyaWQtZmxvYXQtYnJlYWtwb2ludC1tYXgpIHtcbiAgICAgIC8vIERyb3Bkb3ducyBnZXQgY3VzdG9tIGRpc3BsYXkgd2hlbiBjb2xsYXBzZWRcbiAgICAgIC5vcGVuIC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgPiBsaSA+IGEge1xuICAgICAgICAgIGNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1jb2xvcjtcbiAgICAgICAgICAmOmhvdmVyLFxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWhvdmVyLWNvbG9yO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1kZWZhdWx0LWxpbmstaG92ZXItYmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgID4gLmFjdGl2ZSA+IGEge1xuICAgICAgICAgICYsXG4gICAgICAgICAgJjpob3ZlcixcbiAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIGNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1hY3RpdmUtY29sb3I7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1hY3RpdmUtYmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgID4gLmRpc2FibGVkID4gYSB7XG4gICAgICAgICAgJixcbiAgICAgICAgICAmOmhvdmVyLFxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWRpc2FibGVkLWNvbG9yO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1kZWZhdWx0LWxpbmstZGlzYWJsZWQtYmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyBMaW5rcyBpbiBuYXZiYXJzXG4gIC8vXG4gIC8vIEFkZCBhIGNsYXNzIHRvIGVuc3VyZSBsaW5rcyBvdXRzaWRlIHRoZSBuYXZiYXIgbmF2IGFyZSBjb2xvcmVkIGNvcnJlY3RseS5cblxuICAubmF2YmFyLWxpbmsge1xuICAgIGNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1jb2xvcjtcbiAgICAmOmhvdmVyIHtcbiAgICAgIGNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1ob3Zlci1jb2xvcjtcbiAgICB9XG4gIH1cblxuICAuYnRuLWxpbmsge1xuICAgIGNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1jb2xvcjtcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgY29sb3I6ICRuYXZiYXItZGVmYXVsdC1saW5rLWhvdmVyLWNvbG9yO1xuICAgIH1cbiAgICAmW2Rpc2FibGVkXSxcbiAgICBmaWVsZHNldFtkaXNhYmxlZF0gJiB7XG4gICAgICAmOmhvdmVyLFxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGNvbG9yOiAkbmF2YmFyLWRlZmF1bHQtbGluay1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gSW52ZXJzZSBuYXZiYXJcblxuLm5hdmJhci1pbnZlcnNlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1pbnZlcnNlLWJnO1xuICBib3JkZXItY29sb3I6ICRuYXZiYXItaW52ZXJzZS1ib3JkZXI7XG5cbiAgLm5hdmJhci1icmFuZCB7XG4gICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1icmFuZC1jb2xvcjtcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1icmFuZC1ob3Zlci1jb2xvcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRuYXZiYXItaW52ZXJzZS1icmFuZC1ob3Zlci1iZztcbiAgICB9XG4gIH1cblxuICAubmF2YmFyLXRleHQge1xuICAgIGNvbG9yOiAkbmF2YmFyLWludmVyc2UtY29sb3I7XG4gIH1cblxuICAubmF2YmFyLW5hdiB7XG4gICAgPiBsaSA+IGEge1xuICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWNvbG9yO1xuXG4gICAgICAmOmhvdmVyLFxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1ob3Zlci1jb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1pbnZlcnNlLWxpbmstaG92ZXItYmc7XG4gICAgICB9XG4gICAgfVxuICAgID4gLmFjdGl2ZSA+IGEge1xuICAgICAgJixcbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWFjdGl2ZS1jb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1pbnZlcnNlLWxpbmstYWN0aXZlLWJnO1xuICAgICAgfVxuICAgIH1cbiAgICA+IC5kaXNhYmxlZCA+IGEge1xuICAgICAgJixcbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWRpc2FibGVkLWNvbG9yO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1kaXNhYmxlZC1iZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBEYXJrZW4gdGhlIHJlc3BvbnNpdmUgbmF2IHRvZ2dsZVxuICAubmF2YmFyLXRvZ2dsZSB7XG4gICAgYm9yZGVyLWNvbG9yOiAkbmF2YmFyLWludmVyc2UtdG9nZ2xlLWJvcmRlci1jb2xvcjtcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1pbnZlcnNlLXRvZ2dsZS1ob3Zlci1iZztcbiAgICB9XG4gICAgLmljb24tYmFyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRuYXZiYXItaW52ZXJzZS10b2dnbGUtaWNvbi1iYXItYmc7XG4gICAgfVxuICB9XG5cbiAgLm5hdmJhci1jb2xsYXBzZSxcbiAgLm5hdmJhci1mb3JtIHtcbiAgICBib3JkZXItY29sb3I6IGRhcmtlbigkbmF2YmFyLWludmVyc2UtYmcsIDclKTtcbiAgfVxuXG4gIC8vIERyb3Bkb3duc1xuICAubmF2YmFyLW5hdiB7XG4gICAgPiAub3BlbiA+IGEge1xuICAgICAgJixcbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1pbnZlcnNlLWxpbmstYWN0aXZlLWJnO1xuICAgICAgICBjb2xvcjogJG5hdmJhci1pbnZlcnNlLWxpbmstYWN0aXZlLWNvbG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAkZ3JpZC1mbG9hdC1icmVha3BvaW50LW1heCkge1xuICAgICAgLy8gRHJvcGRvd25zIGdldCBjdXN0b20gZGlzcGxheVxuICAgICAgLm9wZW4gLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICA+IC5kcm9wZG93bi1oZWFkZXIge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJG5hdmJhci1pbnZlcnNlLWJvcmRlcjtcbiAgICAgICAgfVxuICAgICAgICAuZGl2aWRlciB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG5hdmJhci1pbnZlcnNlLWJvcmRlcjtcbiAgICAgICAgfVxuICAgICAgICA+IGxpID4gYSB7XG4gICAgICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWNvbG9yO1xuICAgICAgICAgICY6aG92ZXIsXG4gICAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBjb2xvcjogJG5hdmJhci1pbnZlcnNlLWxpbmstaG92ZXItY29sb3I7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1ob3Zlci1iZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgPiAuYWN0aXZlID4gYSB7XG4gICAgICAgICAgJixcbiAgICAgICAgICAmOmhvdmVyLFxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWFjdGl2ZS1jb2xvcjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWFjdGl2ZS1iZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgPiAuZGlzYWJsZWQgPiBhIHtcbiAgICAgICAgICAmLFxuICAgICAgICAgICY6aG92ZXIsXG4gICAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBjb2xvcjogJG5hdmJhci1pbnZlcnNlLWxpbmstZGlzYWJsZWQtY29sb3I7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1kaXNhYmxlZC1iZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubmF2YmFyLWxpbmsge1xuICAgIGNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1jb2xvcjtcbiAgICAmOmhvdmVyIHtcbiAgICAgIGNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1ob3Zlci1jb2xvcjtcbiAgICB9XG4gIH1cblxuICAuYnRuLWxpbmsge1xuICAgIGNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1jb2xvcjtcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgY29sb3I6ICRuYXZiYXItaW52ZXJzZS1saW5rLWhvdmVyLWNvbG9yO1xuICAgIH1cbiAgICAmW2Rpc2FibGVkXSxcbiAgICBmaWVsZHNldFtkaXNhYmxlZF0gJiB7XG4gICAgICAmOmhvdmVyLFxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGNvbG9yOiAkbmF2YmFyLWludmVyc2UtbGluay1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vXG4vLyBCcmVhZGNydW1ic1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4uYnJlYWRjcnVtYiB7XG4gIHBhZGRpbmc6ICRicmVhZGNydW1iLXBhZGRpbmctdmVydGljYWwgJGJyZWFkY3J1bWItcGFkZGluZy1ob3Jpem9udGFsO1xuICBtYXJnaW4tYm90dG9tOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICRicmVhZGNydW1iLWJnO1xuICBib3JkZXItcmFkaXVzOiAkYm9yZGVyLXJhZGl1cy1iYXNlO1xuXG4gID4gbGkge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgICsgbGk6YmVmb3JlIHtcbiAgICAgIC8vIFtjb252ZXJ0ZXJdIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL2xpYnNhc3MvaXNzdWVzLzExMTVcbiAgICAgICRuYnNwOiBcIlxcMDBhMFwiO1xuICAgICAgY29udGVudDogXCIjeyRicmVhZGNydW1iLXNlcGFyYXRvcn0jeyRuYnNwfVwiOyAvLyBVbmljb2RlIHNwYWNlIGFkZGVkIHNpbmNlIGlubGluZS1ibG9jayBtZWFucyBub24tY29sbGFwc2luZyB3aGl0ZS1zcGFjZVxuICAgICAgcGFkZGluZzogMCA1cHg7XG4gICAgICBjb2xvcjogJGJyZWFkY3J1bWItY29sb3I7XG4gICAgfVxuICB9XG5cbiAgPiAuYWN0aXZlIHtcbiAgICBjb2xvcjogJGJyZWFkY3J1bWItYWN0aXZlLWNvbG9yO1xuICB9XG59XG4iLCIvL1xuLy8gUGFnaW5hdGlvbiAobXVsdGlwbGUgcGFnZXMpXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLnBhZ2luYXRpb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgbWFyZ2luOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQgMDtcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZTtcblxuICA+IGxpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmU7IC8vIFJlbW92ZSBsaXN0LXN0eWxlIGFuZCBibG9jay1sZXZlbCBkZWZhdWx0c1xuICAgID4gYSxcbiAgICA+IHNwYW4ge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZmxvYXQ6IGxlZnQ7IC8vIENvbGxhcHNlIHdoaXRlLXNwYWNlXG4gICAgICBwYWRkaW5nOiAkcGFkZGluZy1iYXNlLXZlcnRpY2FsICRwYWRkaW5nLWJhc2UtaG9yaXpvbnRhbDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQtYmFzZTtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIGNvbG9yOiAkcGFnaW5hdGlvbi1jb2xvcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwYWdpbmF0aW9uLWJnO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHBhZ2luYXRpb24tYm9yZGVyO1xuICAgICAgbWFyZ2luLWxlZnQ6IC0xcHg7XG4gICAgfVxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgPiBhLFxuICAgICAgPiBzcGFuIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgIEBpbmNsdWRlIGJvcmRlci1sZWZ0LXJhZGl1cygkYm9yZGVyLXJhZGl1cy1iYXNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgID4gYSxcbiAgICAgID4gc3BhbiB7XG4gICAgICAgIEBpbmNsdWRlIGJvcmRlci1yaWdodC1yYWRpdXMoJGJvcmRlci1yYWRpdXMtYmFzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgPiBsaSA+IGEsXG4gID4gbGkgPiBzcGFuIHtcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgei1pbmRleDogMjtcbiAgICAgIGNvbG9yOiAkcGFnaW5hdGlvbi1ob3Zlci1jb2xvcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwYWdpbmF0aW9uLWhvdmVyLWJnO1xuICAgICAgYm9yZGVyLWNvbG9yOiAkcGFnaW5hdGlvbi1ob3Zlci1ib3JkZXI7XG4gICAgfVxuICB9XG5cbiAgPiAuYWN0aXZlID4gYSxcbiAgPiAuYWN0aXZlID4gc3BhbiB7XG4gICAgJixcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgei1pbmRleDogMztcbiAgICAgIGNvbG9yOiAkcGFnaW5hdGlvbi1hY3RpdmUtY29sb3I7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGFnaW5hdGlvbi1hY3RpdmUtYmc7XG4gICAgICBib3JkZXItY29sb3I6ICRwYWdpbmF0aW9uLWFjdGl2ZS1ib3JkZXI7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgfVxuICB9XG5cbiAgPiAuZGlzYWJsZWQge1xuICAgID4gc3BhbixcbiAgICA+IHNwYW46aG92ZXIsXG4gICAgPiBzcGFuOmZvY3VzLFxuICAgID4gYSxcbiAgICA+IGE6aG92ZXIsXG4gICAgPiBhOmZvY3VzIHtcbiAgICAgIGNvbG9yOiAkcGFnaW5hdGlvbi1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwYWdpbmF0aW9uLWRpc2FibGVkLWJnO1xuICAgICAgYm9yZGVyLWNvbG9yOiAkcGFnaW5hdGlvbi1kaXNhYmxlZC1ib3JkZXI7XG4gICAgICBjdXJzb3I6ICRjdXJzb3ItZGlzYWJsZWQ7XG4gICAgfVxuICB9XG59XG5cbi8vIFNpemluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gTGFyZ2Vcbi5wYWdpbmF0aW9uLWxnIHtcbiAgQGluY2x1ZGUgcGFnaW5hdGlvbi1zaXplKCRwYWRkaW5nLWxhcmdlLXZlcnRpY2FsLCAkcGFkZGluZy1sYXJnZS1ob3Jpem9udGFsLCAkZm9udC1zaXplLWxhcmdlLCAkbGluZS1oZWlnaHQtbGFyZ2UsICRib3JkZXItcmFkaXVzLWxhcmdlKTtcbn1cblxuLy8gU21hbGxcbi5wYWdpbmF0aW9uLXNtIHtcbiAgQGluY2x1ZGUgcGFnaW5hdGlvbi1zaXplKCRwYWRkaW5nLXNtYWxsLXZlcnRpY2FsLCAkcGFkZGluZy1zbWFsbC1ob3Jpem9udGFsLCAkZm9udC1zaXplLXNtYWxsLCAkbGluZS1oZWlnaHQtc21hbGwsICRib3JkZXItcmFkaXVzLXNtYWxsKTtcbn1cbiIsIi8vXG4vLyBQYWdlciBwYWdpbmF0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi5wYWdlciB7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgbWFyZ2luOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQgMDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBAaW5jbHVkZSBjbGVhcmZpeDtcbiAgbGkge1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICA+IGEsXG4gICAgPiBzcGFuIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHBhZGRpbmc6IDVweCAxNHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHBhZ2VyLWJnO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHBhZ2VyLWJvcmRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRwYWdlci1ib3JkZXItcmFkaXVzO1xuICAgIH1cblxuICAgID4gYTpob3ZlcixcbiAgICA+IGE6Zm9jdXMge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHBhZ2VyLWhvdmVyLWJnO1xuICAgIH1cbiAgfVxuXG4gIC5uZXh0IHtcbiAgICA+IGEsXG4gICAgPiBzcGFuIHtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICB9XG4gIH1cblxuICAucHJldmlvdXMge1xuICAgID4gYSxcbiAgICA+IHNwYW4ge1xuICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgfVxuICB9XG5cbiAgLmRpc2FibGVkIHtcbiAgICA+IGEsXG4gICAgPiBhOmhvdmVyLFxuICAgID4gYTpmb2N1cyxcbiAgICA+IHNwYW4ge1xuICAgICAgY29sb3I6ICRwYWdlci1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwYWdlci1iZztcbiAgICAgIGN1cnNvcjogJGN1cnNvci1kaXNhYmxlZDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vXG4vLyBMYWJlbHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgcGFkZGluZzogLjJlbSAuNmVtIC4zZW07XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGNvbG9yOiAkbGFiZWwtY29sb3I7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICBib3JkZXItcmFkaXVzOiAuMjVlbTtcblxuICAvLyBbY29udmVydGVyXSBleHRyYWN0ZWQgYSYgdG8gYS5sYWJlbFxuXG4gIC8vIEVtcHR5IGxhYmVscyBjb2xsYXBzZSBhdXRvbWF0aWNhbGx5IChub3QgYXZhaWxhYmxlIGluIElFOClcbiAgJjplbXB0eSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIC8vIFF1aWNrIGZpeCBmb3IgbGFiZWxzIGluIGJ1dHRvbnNcbiAgLmJ0biAmIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtMXB4O1xuICB9XG59XG5cbi8vIEFkZCBob3ZlciBlZmZlY3RzLCBidXQgb25seSBmb3IgbGlua3NcbmEubGFiZWwge1xuICAmOmhvdmVyLFxuICAmOmZvY3VzIHtcbiAgICBjb2xvcjogJGxhYmVsLWxpbmstaG92ZXItY29sb3I7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxufVxuXG4vLyBDb2xvcnNcbi8vIENvbnRleHR1YWwgdmFyaWF0aW9ucyAobGlua2VkIGxhYmVscyBnZXQgZGFya2VyIG9uIDpob3ZlcilcblxuLmxhYmVsLWRlZmF1bHQge1xuICBAaW5jbHVkZSBsYWJlbC12YXJpYW50KCRsYWJlbC1kZWZhdWx0LWJnKTtcbn1cblxuLmxhYmVsLXByaW1hcnkge1xuICBAaW5jbHVkZSBsYWJlbC12YXJpYW50KCRsYWJlbC1wcmltYXJ5LWJnKTtcbn1cblxuLmxhYmVsLXN1Y2Nlc3Mge1xuICBAaW5jbHVkZSBsYWJlbC12YXJpYW50KCRsYWJlbC1zdWNjZXNzLWJnKTtcbn1cblxuLmxhYmVsLWluZm8ge1xuICBAaW5jbHVkZSBsYWJlbC12YXJpYW50KCRsYWJlbC1pbmZvLWJnKTtcbn1cblxuLmxhYmVsLXdhcm5pbmcge1xuICBAaW5jbHVkZSBsYWJlbC12YXJpYW50KCRsYWJlbC13YXJuaW5nLWJnKTtcbn1cblxuLmxhYmVsLWRhbmdlciB7XG4gIEBpbmNsdWRlIGxhYmVsLXZhcmlhbnQoJGxhYmVsLWRhbmdlci1iZyk7XG59XG4iLCIvL1xuLy8gQmFkZ2VzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEJhc2UgY2xhc3Ncbi5iYWRnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWluLXdpZHRoOiAxMHB4O1xuICBwYWRkaW5nOiAzcHggN3B4O1xuICBmb250LXNpemU6ICRmb250LXNpemUtc21hbGw7XG4gIGZvbnQtd2VpZ2h0OiAkYmFkZ2UtZm9udC13ZWlnaHQ7XG4gIGNvbG9yOiAkYmFkZ2UtY29sb3I7XG4gIGxpbmUtaGVpZ2h0OiAkYmFkZ2UtbGluZS1oZWlnaHQ7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJhZGdlLWJnO1xuICBib3JkZXItcmFkaXVzOiAkYmFkZ2UtYm9yZGVyLXJhZGl1cztcblxuICAvLyBFbXB0eSBiYWRnZXMgY29sbGFwc2UgYXV0b21hdGljYWxseSAobm90IGF2YWlsYWJsZSBpbiBJRTgpXG4gICY6ZW1wdHkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAvLyBRdWljayBmaXggZm9yIGJhZGdlcyBpbiBidXR0b25zXG4gIC5idG4gJiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogLTFweDtcbiAgfVxuXG4gIC5idG4teHMgJixcbiAgLmJ0bi1ncm91cC14cyA+IC5idG4gJiB7XG4gICAgdG9wOiAwO1xuICAgIHBhZGRpbmc6IDFweCA1cHg7XG4gIH1cblxuICAvLyBbY29udmVydGVyXSBleHRyYWN0ZWQgYSYgdG8gYS5iYWRnZVxuXG4gIC8vIEFjY291bnQgZm9yIGJhZGdlcyBpbiBuYXZzXG4gIC5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlID4gJixcbiAgLm5hdi1waWxscyA+IC5hY3RpdmUgPiBhID4gJiB7XG4gICAgY29sb3I6ICRiYWRnZS1hY3RpdmUtY29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhZGdlLWFjdGl2ZS1iZztcbiAgfVxuXG4gIC5saXN0LWdyb3VwLWl0ZW0gPiAmIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gIH1cblxuICAubGlzdC1ncm91cC1pdGVtID4gJiArICYge1xuICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICB9XG5cbiAgLm5hdi1waWxscyA+IGxpID4gYSA+ICYge1xuICAgIG1hcmdpbi1sZWZ0OiAzcHg7XG4gIH1cbn1cblxuLy8gSG92ZXIgc3RhdGUsIGJ1dCBvbmx5IGZvciBsaW5rc1xuYS5iYWRnZSB7XG4gICY6aG92ZXIsXG4gICY6Zm9jdXMge1xuICAgIGNvbG9yOiAkYmFkZ2UtbGluay1ob3Zlci1jb2xvcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59XG4iLCIvL1xuLy8gSnVtYm90cm9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi5qdW1ib3Ryb24ge1xuICBwYWRkaW5nLXRvcDogICAgJGp1bWJvdHJvbi1wYWRkaW5nO1xuICBwYWRkaW5nLWJvdHRvbTogJGp1bWJvdHJvbi1wYWRkaW5nO1xuICBtYXJnaW4tYm90dG9tOiAkanVtYm90cm9uLXBhZGRpbmc7XG4gIGNvbG9yOiAkanVtYm90cm9uLWNvbG9yO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkanVtYm90cm9uLWJnO1xuXG4gIGgxLFxuICAuaDEge1xuICAgIGNvbG9yOiAkanVtYm90cm9uLWhlYWRpbmctY29sb3I7XG4gIH1cblxuICBwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAoJGp1bWJvdHJvbi1wYWRkaW5nIC8gMik7XG4gICAgZm9udC1zaXplOiAkanVtYm90cm9uLWZvbnQtc2l6ZTtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICB9XG5cbiAgPiBociB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogZGFya2VuKCRqdW1ib3Ryb24tYmcsIDEwJSk7XG4gIH1cblxuICAuY29udGFpbmVyICYsXG4gIC5jb250YWluZXItZmx1aWQgJiB7XG4gICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtbGFyZ2U7IC8vIE9ubHkgcm91bmQgY29ybmVycyBhdCBoaWdoZXIgcmVzb2x1dGlvbnMgaWYgY29udGFpbmVkIGluIGEgY29udGFpbmVyXG4gICAgcGFkZGluZy1sZWZ0OiAgKCRncmlkLWd1dHRlci13aWR0aCAvIDIpO1xuICAgIHBhZGRpbmctcmlnaHQ6ICgkZ3JpZC1ndXR0ZXItd2lkdGggLyAyKTtcbiAgfVxuXG4gIC5jb250YWluZXIge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSB7XG4gICAgcGFkZGluZy10b3A6ICAgICgkanVtYm90cm9uLXBhZGRpbmcgKiAxLjYpO1xuICAgIHBhZGRpbmctYm90dG9tOiAoJGp1bWJvdHJvbi1wYWRkaW5nICogMS42KTtcblxuICAgIC5jb250YWluZXIgJixcbiAgICAuY29udGFpbmVyLWZsdWlkICYge1xuICAgICAgcGFkZGluZy1sZWZ0OiAgKCRqdW1ib3Ryb24tcGFkZGluZyAqIDIpO1xuICAgICAgcGFkZGluZy1yaWdodDogKCRqdW1ib3Ryb24tcGFkZGluZyAqIDIpO1xuICAgIH1cblxuICAgIGgxLFxuICAgIC5oMSB7XG4gICAgICBmb250LXNpemU6ICRqdW1ib3Ryb24taGVhZGluZy1mb250LXNpemU7XG4gICAgfVxuICB9XG59XG4iLCIvL1xuLy8gVGh1bWJuYWlsc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBNaXhpbiBhbmQgYWRqdXN0IHRoZSByZWd1bGFyIGltYWdlIGNsYXNzXG4udGh1bWJuYWlsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6ICR0aHVtYm5haWwtcGFkZGluZztcbiAgbWFyZ2luLWJvdHRvbTogJGxpbmUtaGVpZ2h0LWNvbXB1dGVkO1xuICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LWJhc2U7XG4gIGJhY2tncm91bmQtY29sb3I6ICR0aHVtYm5haWwtYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICR0aHVtYm5haWwtYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiAkdGh1bWJuYWlsLWJvcmRlci1yYWRpdXM7XG4gIEBpbmNsdWRlIHRyYW5zaXRpb24oYm9yZGVyIC4ycyBlYXNlLWluLW91dCk7XG5cbiAgPiBpbWcsXG4gIGEgPiBpbWcge1xuICAgIEBpbmNsdWRlIGltZy1yZXNwb25zaXZlO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxuXG4gIC8vIFtjb252ZXJ0ZXJdIGV4dHJhY3RlZCBhJjpob3ZlciwgYSY6Zm9jdXMsIGEmLmFjdGl2ZSB0byBhLnRodW1ibmFpbDpob3ZlciwgYS50aHVtYm5haWw6Zm9jdXMsIGEudGh1bWJuYWlsLmFjdGl2ZVxuXG4gIC8vIEltYWdlIGNhcHRpb25zXG4gIC5jYXB0aW9uIHtcbiAgICBwYWRkaW5nOiAkdGh1bWJuYWlsLWNhcHRpb24tcGFkZGluZztcbiAgICBjb2xvcjogJHRodW1ibmFpbC1jYXB0aW9uLWNvbG9yO1xuICB9XG59XG5cbi8vIEFkZCBhIGhvdmVyIHN0YXRlIGZvciBsaW5rZWQgdmVyc2lvbnMgb25seVxuYS50aHVtYm5haWw6aG92ZXIsXG5hLnRodW1ibmFpbDpmb2N1cyxcbmEudGh1bWJuYWlsLmFjdGl2ZSB7XG4gIGJvcmRlci1jb2xvcjogJGxpbmstY29sb3I7XG59XG4iLCIvL1xuLy8gQWxlcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEJhc2Ugc3R5bGVzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi5hbGVydCB7XG4gIHBhZGRpbmc6ICRhbGVydC1wYWRkaW5nO1xuICBtYXJnaW4tYm90dG9tOiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAkYWxlcnQtYm9yZGVyLXJhZGl1cztcblxuICAvLyBIZWFkaW5ncyBmb3IgbGFyZ2VyIGFsZXJ0c1xuICBoNCB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICAvLyBTcGVjaWZpZWQgZm9yIHRoZSBoNCB0byBwcmV2ZW50IGNvbmZsaWN0cyBvZiBjaGFuZ2luZyAkaGVhZGluZ3MtY29sb3JcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgfVxuXG4gIC8vIFByb3ZpZGUgY2xhc3MgZm9yIGxpbmtzIHRoYXQgbWF0Y2ggYWxlcnRzXG4gIC5hbGVydC1saW5rIHtcbiAgICBmb250LXdlaWdodDogJGFsZXJ0LWxpbmstZm9udC13ZWlnaHQ7XG4gIH1cblxuICAvLyBJbXByb3ZlIGFsaWdubWVudCBhbmQgc3BhY2luZyBvZiBpbm5lciBjb250ZW50XG4gID4gcCxcbiAgPiB1bCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gID4gcCArIHAge1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgfVxufVxuXG4vLyBEaXNtaXNzaWJsZSBhbGVydHNcbi8vXG4vLyBFeHBhbmQgdGhlIHJpZ2h0IHBhZGRpbmcgYW5kIGFjY291bnQgZm9yIHRoZSBjbG9zZSBidXR0b24ncyBwb3NpdGlvbmluZy5cblxuLmFsZXJ0LWRpc21pc3NhYmxlLCAvLyBUaGUgbWlzc3BlbGxlZCAuYWxlcnQtZGlzbWlzc2FibGUgd2FzIGRlcHJlY2F0ZWQgaW4gMy4yLjAuXG4uYWxlcnQtZGlzbWlzc2libGUge1xuICBwYWRkaW5nLXJpZ2h0OiAoJGFsZXJ0LXBhZGRpbmcgKyAyMCk7XG5cbiAgLy8gQWRqdXN0IGNsb3NlIGxpbmsgcG9zaXRpb25cbiAgLmNsb3NlIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtMnB4O1xuICAgIHJpZ2h0OiAtMjFweDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgfVxufVxuXG4vLyBBbHRlcm5hdGUgc3R5bGVzXG4vL1xuLy8gR2VuZXJhdGUgY29udGV4dHVhbCBtb2RpZmllciBjbGFzc2VzIGZvciBjb2xvcml6aW5nIHRoZSBhbGVydC5cblxuLmFsZXJ0LXN1Y2Nlc3Mge1xuICBAaW5jbHVkZSBhbGVydC12YXJpYW50KCRhbGVydC1zdWNjZXNzLWJnLCAkYWxlcnQtc3VjY2Vzcy1ib3JkZXIsICRhbGVydC1zdWNjZXNzLXRleHQpO1xufVxuXG4uYWxlcnQtaW5mbyB7XG4gIEBpbmNsdWRlIGFsZXJ0LXZhcmlhbnQoJGFsZXJ0LWluZm8tYmcsICRhbGVydC1pbmZvLWJvcmRlciwgJGFsZXJ0LWluZm8tdGV4dCk7XG59XG5cbi5hbGVydC13YXJuaW5nIHtcbiAgQGluY2x1ZGUgYWxlcnQtdmFyaWFudCgkYWxlcnQtd2FybmluZy1iZywgJGFsZXJ0LXdhcm5pbmctYm9yZGVyLCAkYWxlcnQtd2FybmluZy10ZXh0KTtcbn1cblxuLmFsZXJ0LWRhbmdlciB7XG4gIEBpbmNsdWRlIGFsZXJ0LXZhcmlhbnQoJGFsZXJ0LWRhbmdlci1iZywgJGFsZXJ0LWRhbmdlci1ib3JkZXIsICRhbGVydC1kYW5nZXItdGV4dCk7XG59XG4iLCIvL1xuLy8gUHJvZ3Jlc3MgYmFyc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBCYXIgYW5pbWF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBXZWJLaXRcbkAtd2Via2l0LWtleWZyYW1lcyBwcm9ncmVzcy1iYXItc3RyaXBlcyB7XG4gIGZyb20gIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogNDBweCAwOyB9XG4gIHRvICAgIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwOyB9XG59XG5cbi8vIFNwZWMgYW5kIElFMTArXG5Aa2V5ZnJhbWVzIHByb2dyZXNzLWJhci1zdHJpcGVzIHtcbiAgZnJvbSAgeyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0MHB4IDA7IH1cbiAgdG8gICAgeyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7IH1cbn1cblxuXG4vLyBCYXIgaXRzZWxmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIE91dGVyIGNvbnRhaW5lclxuLnByb2dyZXNzIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiAkbGluZS1oZWlnaHQtY29tcHV0ZWQ7XG4gIG1hcmdpbi1ib3R0b206ICRsaW5lLWhlaWdodC1jb21wdXRlZDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHByb2dyZXNzLWJnO1xuICBib3JkZXItcmFkaXVzOiAkcHJvZ3Jlc3MtYm9yZGVyLXJhZGl1cztcbiAgQGluY2x1ZGUgYm94LXNoYWRvdyhpbnNldCAwIDFweCAycHggcmdiYSgwLDAsMCwuMSkpO1xufVxuXG4vLyBCYXIgb2YgcHJvZ3Jlc3Ncbi5wcm9ncmVzcy1iYXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcbiAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodC1jb21wdXRlZDtcbiAgY29sb3I6ICRwcm9ncmVzcy1iYXItY29sb3I7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHByb2dyZXNzLWJhci1iZztcbiAgQGluY2x1ZGUgYm94LXNoYWRvdyhpbnNldCAwIC0xcHggMCByZ2JhKDAsMCwwLC4xNSkpO1xuICBAaW5jbHVkZSB0cmFuc2l0aW9uKHdpZHRoIC42cyBlYXNlKTtcbn1cblxuLy8gU3RyaXBlZCBiYXJzXG4vL1xuLy8gYC5wcm9ncmVzcy1zdHJpcGVkIC5wcm9ncmVzcy1iYXJgIGlzIGRlcHJlY2F0ZWQgYXMgb2YgdjMuMi4wIGluIGZhdm9yIG9mIHRoZVxuLy8gYC5wcm9ncmVzcy1iYXItc3RyaXBlZGAgY2xhc3MsIHdoaWNoIHlvdSBqdXN0IGFkZCB0byBhbiBleGlzdGluZ1xuLy8gYC5wcm9ncmVzcy1iYXJgLlxuLnByb2dyZXNzLXN0cmlwZWQgLnByb2dyZXNzLWJhcixcbi5wcm9ncmVzcy1iYXItc3RyaXBlZCB7XG4gIEBpbmNsdWRlIGdyYWRpZW50LXN0cmlwZWQ7XG4gIGJhY2tncm91bmQtc2l6ZTogNDBweCA0MHB4O1xufVxuXG4vLyBDYWxsIGFuaW1hdGlvbiBmb3IgdGhlIGFjdGl2ZSBvbmVcbi8vXG4vLyBgLnByb2dyZXNzLmFjdGl2ZSAucHJvZ3Jlc3MtYmFyYCBpcyBkZXByZWNhdGVkIGFzIG9mIHYzLjIuMCBpbiBmYXZvciBvZiB0aGVcbi8vIGAucHJvZ3Jlc3MtYmFyLmFjdGl2ZWAgYXBwcm9hY2guXG4ucHJvZ3Jlc3MuYWN0aXZlIC5wcm9ncmVzcy1iYXIsXG4ucHJvZ3Jlc3MtYmFyLmFjdGl2ZSB7XG4gIEBpbmNsdWRlIGFuaW1hdGlvbihwcm9ncmVzcy1iYXItc3RyaXBlcyAycyBsaW5lYXIgaW5maW5pdGUpO1xufVxuXG5cbi8vIFZhcmlhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLnByb2dyZXNzLWJhci1zdWNjZXNzIHtcbiAgQGluY2x1ZGUgcHJvZ3Jlc3MtYmFyLXZhcmlhbnQoJHByb2dyZXNzLWJhci1zdWNjZXNzLWJnKTtcbn1cblxuLnByb2dyZXNzLWJhci1pbmZvIHtcbiAgQGluY2x1ZGUgcHJvZ3Jlc3MtYmFyLXZhcmlhbnQoJHByb2dyZXNzLWJhci1pbmZvLWJnKTtcbn1cblxuLnByb2dyZXNzLWJhci13YXJuaW5nIHtcbiAgQGluY2x1ZGUgcHJvZ3Jlc3MtYmFyLXZhcmlhbnQoJHByb2dyZXNzLWJhci13YXJuaW5nLWJnKTtcbn1cblxuLnByb2dyZXNzLWJhci1kYW5nZXIge1xuICBAaW5jbHVkZSBwcm9ncmVzcy1iYXItdmFyaWFudCgkcHJvZ3Jlc3MtYmFyLWRhbmdlci1iZyk7XG59XG4iLCIubWVkaWEge1xuICAvLyBQcm9wZXIgc3BhY2luZyBiZXR3ZWVuIGluc3RhbmNlcyBvZiAubWVkaWFcbiAgbWFyZ2luLXRvcDogMTVweDtcblxuICAmOmZpcnN0LWNoaWxkIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG59XG5cbi5tZWRpYSxcbi5tZWRpYS1ib2R5IHtcbiAgem9vbTogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLm1lZGlhLWJvZHkge1xuICB3aWR0aDogMTAwMDBweDtcbn1cblxuLm1lZGlhLW9iamVjdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuXG4gIC8vIEZpeCBjb2xsYXBzZSBpbiB3ZWJraXQgZnJvbSBtYXgtd2lkdGg6IDEwMCUgYW5kIGRpc3BsYXk6IHRhYmxlLWNlbGwuXG4gICYuaW1nLXRodW1ibmFpbCB7XG4gICAgbWF4LXdpZHRoOiBub25lO1xuICB9XG59XG5cbi5tZWRpYS1yaWdodCxcbi5tZWRpYSA+IC5wdWxsLXJpZ2h0IHtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xufVxuXG4ubWVkaWEtbGVmdCxcbi5tZWRpYSA+IC5wdWxsLWxlZnQge1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuXG4ubWVkaWEtbGVmdCxcbi5tZWRpYS1yaWdodCxcbi5tZWRpYS1ib2R5IHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuLm1lZGlhLW1pZGRsZSB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5tZWRpYS1ib3R0b20ge1xuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xufVxuXG4vLyBSZXNldCBtYXJnaW5zIG9uIGhlYWRpbmdzIGZvciB0aWdodGVyIGRlZmF1bHQgc3BhY2luZ1xuLm1lZGlhLWhlYWRpbmcge1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi8vIE1lZGlhIGxpc3QgdmFyaWF0aW9uXG4vL1xuLy8gVW5kbyBkZWZhdWx0IHVsL29sIHN0eWxlc1xuLm1lZGlhLWxpc3Qge1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG4iLCIvL1xuLy8gTGlzdCBncm91cHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gQmFzZSBjbGFzc1xuLy9cbi8vIEVhc2lseSB1c2FibGUgb24gPHVsPiwgPG9sPiwgb3IgPGRpdj4uXG5cbi5saXN0LWdyb3VwIHtcbiAgLy8gTm8gbmVlZCB0byBzZXQgbGlzdC1zdHlsZTogbm9uZTsgc2luY2UgLmxpc3QtZ3JvdXAtaXRlbSBpcyBibG9jayBsZXZlbFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDA7IC8vIHJlc2V0IHBhZGRpbmcgYmVjYXVzZSB1bCBhbmQgb2xcbn1cblxuXG4vLyBJbmRpdmlkdWFsIGxpc3QgaXRlbXNcbi8vXG4vLyBVc2Ugb24gYGxpYHMgb3IgYGRpdmBzIHdpdGhpbiB0aGUgYC5saXN0LWdyb3VwYCBwYXJlbnQuXG5cbi5saXN0LWdyb3VwLWl0ZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIC8vIFBsYWNlIHRoZSBib3JkZXIgb24gdGhlIGxpc3QgaXRlbXMgYW5kIG5lZ2F0aXZlIG1hcmdpbiB1cCBmb3IgYmV0dGVyIHN0eWxpbmdcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGxpc3QtZ3JvdXAtYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRsaXN0LWdyb3VwLWJvcmRlcjtcblxuICAvLyBSb3VuZCB0aGUgZmlyc3QgYW5kIGxhc3QgaXRlbXNcbiAgJjpmaXJzdC1jaGlsZCB7XG4gICAgQGluY2x1ZGUgYm9yZGVyLXRvcC1yYWRpdXMoJGxpc3QtZ3JvdXAtYm9yZGVyLXJhZGl1cyk7XG4gIH1cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIEBpbmNsdWRlIGJvcmRlci1ib3R0b20tcmFkaXVzKCRsaXN0LWdyb3VwLWJvcmRlci1yYWRpdXMpO1xuICB9XG59XG5cblxuLy8gSW50ZXJhY3RpdmUgbGlzdCBpdGVtc1xuLy9cbi8vIFVzZSBhbmNob3Igb3IgYnV0dG9uIGVsZW1lbnRzIGluc3RlYWQgb2YgYGxpYHMgb3IgYGRpdmBzIHRvIGNyZWF0ZSBpbnRlcmFjdGl2ZSBpdGVtcy5cbi8vIEluY2x1ZGVzIGFuIGV4dHJhIGAuYWN0aXZlYCBtb2RpZmllciBjbGFzcyBmb3Igc2hvd2luZyBzZWxlY3RlZCBpdGVtcy5cblxuYS5saXN0LWdyb3VwLWl0ZW0sXG5idXR0b24ubGlzdC1ncm91cC1pdGVtIHtcbiAgY29sb3I6ICRsaXN0LWdyb3VwLWxpbmstY29sb3I7XG5cbiAgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcbiAgICBjb2xvcjogJGxpc3QtZ3JvdXAtbGluay1oZWFkaW5nLWNvbG9yO1xuICB9XG5cbiAgLy8gSG92ZXIgc3RhdGVcbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAkbGlzdC1ncm91cC1saW5rLWhvdmVyLWNvbG9yO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRsaXN0LWdyb3VwLWhvdmVyLWJnO1xuICB9XG59XG5cbmJ1dHRvbi5saXN0LWdyb3VwLWl0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmxpc3QtZ3JvdXAtaXRlbSB7XG4gIC8vIERpc2FibGVkIHN0YXRlXG4gICYuZGlzYWJsZWQsXG4gICYuZGlzYWJsZWQ6aG92ZXIsXG4gICYuZGlzYWJsZWQ6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRsaXN0LWdyb3VwLWRpc2FibGVkLWJnO1xuICAgIGNvbG9yOiAkbGlzdC1ncm91cC1kaXNhYmxlZC1jb2xvcjtcbiAgICBjdXJzb3I6ICRjdXJzb3ItZGlzYWJsZWQ7XG5cbiAgICAvLyBGb3JjZSBjb2xvciB0byBpbmhlcml0IGZvciBjdXN0b20gY29udGVudFxuICAgIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyB7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB9XG4gICAgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0IHtcbiAgICAgIGNvbG9yOiAkbGlzdC1ncm91cC1kaXNhYmxlZC10ZXh0LWNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFjdGl2ZSBjbGFzcyBvbiBpdGVtIGl0c2VsZiwgbm90IHBhcmVudFxuICAmLmFjdGl2ZSxcbiAgJi5hY3RpdmU6aG92ZXIsXG4gICYuYWN0aXZlOmZvY3VzIHtcbiAgICB6LWluZGV4OiAyOyAvLyBQbGFjZSBhY3RpdmUgaXRlbXMgYWJvdmUgdGhlaXIgc2libGluZ3MgZm9yIHByb3BlciBib3JkZXIgc3R5bGluZ1xuICAgIGNvbG9yOiAkbGlzdC1ncm91cC1hY3RpdmUtY29sb3I7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGxpc3QtZ3JvdXAtYWN0aXZlLWJnO1xuICAgIGJvcmRlci1jb2xvcjogJGxpc3QtZ3JvdXAtYWN0aXZlLWJvcmRlcjtcblxuICAgIC8vIEZvcmNlIGNvbG9yIHRvIGluaGVyaXQgZm9yIGN1c3RvbSBjb250ZW50XG4gICAgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLFxuICAgIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyA+IHNtYWxsLFxuICAgIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZyA+IC5zbWFsbCB7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB9XG4gICAgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0IHtcbiAgICAgIGNvbG9yOiAkbGlzdC1ncm91cC1hY3RpdmUtdGV4dC1jb2xvcjtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBDb250ZXh0dWFsIHZhcmlhbnRzXG4vL1xuLy8gQWRkIG1vZGlmaWVyIGNsYXNzZXMgdG8gY2hhbmdlIHRleHQgYW5kIGJhY2tncm91bmQgY29sb3Igb24gaW5kaXZpZHVhbCBpdGVtcy5cbi8vIE9yZ2FuaXphdGlvbmFsbHksIHRoaXMgbXVzdCBjb21lIGFmdGVyIHRoZSBgOmhvdmVyYCBzdGF0ZXMuXG5cbkBpbmNsdWRlIGxpc3QtZ3JvdXAtaXRlbS12YXJpYW50KHN1Y2Nlc3MsICRzdGF0ZS1zdWNjZXNzLWJnLCAkc3RhdGUtc3VjY2Vzcy10ZXh0KTtcbkBpbmNsdWRlIGxpc3QtZ3JvdXAtaXRlbS12YXJpYW50KGluZm8sICRzdGF0ZS1pbmZvLWJnLCAkc3RhdGUtaW5mby10ZXh0KTtcbkBpbmNsdWRlIGxpc3QtZ3JvdXAtaXRlbS12YXJpYW50KHdhcm5pbmcsICRzdGF0ZS13YXJuaW5nLWJnLCAkc3RhdGUtd2FybmluZy10ZXh0KTtcbkBpbmNsdWRlIGxpc3QtZ3JvdXAtaXRlbS12YXJpYW50KGRhbmdlciwgJHN0YXRlLWRhbmdlci1iZywgJHN0YXRlLWRhbmdlci10ZXh0KTtcblxuXG4vLyBDdXN0b20gY29udGVudCBvcHRpb25zXG4vL1xuLy8gRXh0cmEgY2xhc3NlcyBmb3IgY3JlYXRpbmcgd2VsbC1mb3JtYXR0ZWQgY29udGVudCB3aXRoaW4gYC5saXN0LWdyb3VwLWl0ZW1gcy5cblxuLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuLmxpc3QtZ3JvdXAtaXRlbS10ZXh0IHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbGluZS1oZWlnaHQ6IDEuMztcbn1cbiIsIi8vXG4vLyBQYW5lbHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLy8gQmFzZSBjbGFzc1xuLnBhbmVsIHtcbiAgbWFyZ2luLWJvdHRvbTogJGxpbmUtaGVpZ2h0LWNvbXB1dGVkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGFuZWwtYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAkcGFuZWwtYm9yZGVyLXJhZGl1cztcbiAgQGluY2x1ZGUgYm94LXNoYWRvdygwIDFweCAxcHggcmdiYSgwLDAsMCwuMDUpKTtcbn1cblxuLy8gUGFuZWwgY29udGVudHNcbi5wYW5lbC1ib2R5IHtcbiAgcGFkZGluZzogJHBhbmVsLWJvZHktcGFkZGluZztcbiAgQGluY2x1ZGUgY2xlYXJmaXg7XG59XG5cbi8vIE9wdGlvbmFsIGhlYWRpbmdcbi5wYW5lbC1oZWFkaW5nIHtcbiAgcGFkZGluZzogJHBhbmVsLWhlYWRpbmctcGFkZGluZztcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBAaW5jbHVkZSBib3JkZXItdG9wLXJhZGl1cygoJHBhbmVsLWJvcmRlci1yYWRpdXMgLSAxKSk7XG5cbiAgPiAuZHJvcGRvd24gLmRyb3Bkb3duLXRvZ2dsZSB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cbn1cblxuLy8gV2l0aGluIGhlYWRpbmcsIHN0cmlwIGFueSBgaCpgIHRhZyBvZiBpdHMgZGVmYXVsdCBtYXJnaW5zIGZvciBzcGFjaW5nLlxuLnBhbmVsLXRpdGxlIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgZm9udC1zaXplOiBjZWlsKCgkZm9udC1zaXplLWJhc2UgKiAxLjEyNSkpO1xuICBjb2xvcjogaW5oZXJpdDtcblxuICA+IGEsXG4gID4gc21hbGwsXG4gID4gLnNtYWxsLFxuICA+IHNtYWxsID4gYSxcbiAgPiAuc21hbGwgPiBhIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgfVxufVxuXG4vLyBPcHRpb25hbCBmb290ZXIgKHN0YXlzIGdyYXkgaW4gZXZlcnkgbW9kaWZpZXIgY2xhc3MpXG4ucGFuZWwtZm9vdGVyIHtcbiAgcGFkZGluZzogJHBhbmVsLWZvb3Rlci1wYWRkaW5nO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGFuZWwtZm9vdGVyLWJnO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgJHBhbmVsLWlubmVyLWJvcmRlcjtcbiAgQGluY2x1ZGUgYm9yZGVyLWJvdHRvbS1yYWRpdXMoKCRwYW5lbC1ib3JkZXItcmFkaXVzIC0gMSkpO1xufVxuXG5cbi8vIExpc3QgZ3JvdXBzIGluIHBhbmVsc1xuLy9cbi8vIEJ5IGRlZmF1bHQsIHNwYWNlIG91dCBsaXN0IGdyb3VwIGNvbnRlbnQgZnJvbSBwYW5lbCBoZWFkaW5ncyB0byBhY2NvdW50IGZvclxuLy8gYW55IGtpbmQgb2YgY3VzdG9tIGNvbnRlbnQgYmV0d2VlbiB0aGUgdHdvLlxuXG4ucGFuZWwge1xuICA+IC5saXN0LWdyb3VwLFxuICA+IC5wYW5lbC1jb2xsYXBzZSA+IC5saXN0LWdyb3VwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuXG4gICAgLmxpc3QtZ3JvdXAtaXRlbSB7XG4gICAgICBib3JkZXItd2lkdGg6IDFweCAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICB9XG5cbiAgICAvLyBBZGQgYm9yZGVyIHRvcCByYWRpdXMgZm9yIGZpcnN0IG9uZVxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgLmxpc3QtZ3JvdXAtaXRlbTpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci10b3A6IDA7XG4gICAgICAgIEBpbmNsdWRlIGJvcmRlci10b3AtcmFkaXVzKCgkcGFuZWwtYm9yZGVyLXJhZGl1cyAtIDEpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgYm9yZGVyIGJvdHRvbSByYWRpdXMgZm9yIGxhc3Qgb25lXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIC5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgIEBpbmNsdWRlIGJvcmRlci1ib3R0b20tcmFkaXVzKCgkcGFuZWwtYm9yZGVyLXJhZGl1cyAtIDEpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgPiAucGFuZWwtaGVhZGluZyArIC5wYW5lbC1jb2xsYXBzZSA+IC5saXN0LWdyb3VwIHtcbiAgICAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcbiAgICAgIEBpbmNsdWRlIGJvcmRlci10b3AtcmFkaXVzKDApO1xuICAgIH1cbiAgfVxufVxuLy8gQ29sbGFwc2Ugc3BhY2UgYmV0d2VlbiB3aGVuIHRoZXJlJ3Mgbm8gYWRkaXRpb25hbCBjb250ZW50LlxuLnBhbmVsLWhlYWRpbmcgKyAubGlzdC1ncm91cCB7XG4gIC5saXN0LWdyb3VwLWl0ZW06Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci10b3Atd2lkdGg6IDA7XG4gIH1cbn1cbi5saXN0LWdyb3VwICsgLnBhbmVsLWZvb3RlciB7XG4gIGJvcmRlci10b3Atd2lkdGg6IDA7XG59XG5cbi8vIFRhYmxlcyBpbiBwYW5lbHNcbi8vXG4vLyBQbGFjZSBhIG5vbi1ib3JkZXJlZCBgLnRhYmxlYCB3aXRoaW4gYSBwYW5lbCAobm90IHdpdGhpbiBhIGAucGFuZWwtYm9keWApIGFuZFxuLy8gd2F0Y2ggaXQgZ28gZnVsbCB3aWR0aC5cblxuLnBhbmVsIHtcbiAgPiAudGFibGUsXG4gID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUsXG4gID4gLnBhbmVsLWNvbGxhcHNlID4gLnRhYmxlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuXG4gICAgY2FwdGlvbiB7XG4gICAgICBwYWRkaW5nLWxlZnQ6ICRwYW5lbC1ib2R5LXBhZGRpbmc7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAkcGFuZWwtYm9keS1wYWRkaW5nO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgYm9yZGVyIHRvcCByYWRpdXMgZm9yIGZpcnN0IG9uZVxuICA+IC50YWJsZTpmaXJzdC1jaGlsZCxcbiAgPiAudGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZCA+IC50YWJsZTpmaXJzdC1jaGlsZCB7XG4gICAgQGluY2x1ZGUgYm9yZGVyLXRvcC1yYWRpdXMoKCRwYW5lbC1ib3JkZXItcmFkaXVzIC0gMSkpO1xuXG4gICAgPiB0aGVhZDpmaXJzdC1jaGlsZCxcbiAgICA+IHRib2R5OmZpcnN0LWNoaWxkIHtcbiAgICAgID4gdHI6Zmlyc3QtY2hpbGQge1xuICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAoJHBhbmVsLWJvcmRlci1yYWRpdXMgLSAxKTtcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6ICgkcGFuZWwtYm9yZGVyLXJhZGl1cyAtIDEpO1xuXG4gICAgICAgIHRkOmZpcnN0LWNoaWxkLFxuICAgICAgICB0aDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogKCRwYW5lbC1ib3JkZXItcmFkaXVzIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGQ6bGFzdC1jaGlsZCxcbiAgICAgICAgdGg6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6ICgkcGFuZWwtYm9yZGVyLXJhZGl1cyAtIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIEFkZCBib3JkZXIgYm90dG9tIHJhZGl1cyBmb3IgbGFzdCBvbmVcbiAgPiAudGFibGU6bGFzdC1jaGlsZCxcbiAgPiAudGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkID4gLnRhYmxlOmxhc3QtY2hpbGQge1xuICAgIEBpbmNsdWRlIGJvcmRlci1ib3R0b20tcmFkaXVzKCgkcGFuZWwtYm9yZGVyLXJhZGl1cyAtIDEpKTtcblxuICAgID4gdGJvZHk6bGFzdC1jaGlsZCxcbiAgICA+IHRmb290Omxhc3QtY2hpbGQge1xuICAgICAgPiB0cjpsYXN0LWNoaWxkIHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogKCRwYW5lbC1ib3JkZXItcmFkaXVzIC0gMSk7XG4gICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAoJHBhbmVsLWJvcmRlci1yYWRpdXMgLSAxKTtcblxuICAgICAgICB0ZDpmaXJzdC1jaGlsZCxcbiAgICAgICAgdGg6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6ICgkcGFuZWwtYm9yZGVyLXJhZGl1cyAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRkOmxhc3QtY2hpbGQsXG4gICAgICAgIHRoOmxhc3QtY2hpbGQge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAoJHBhbmVsLWJvcmRlci1yYWRpdXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICA+IC5wYW5lbC1ib2R5ICsgLnRhYmxlLFxuICA+IC5wYW5lbC1ib2R5ICsgLnRhYmxlLXJlc3BvbnNpdmUsXG4gID4gLnRhYmxlICsgLnBhbmVsLWJvZHksXG4gID4gLnRhYmxlLXJlc3BvbnNpdmUgKyAucGFuZWwtYm9keSB7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR0YWJsZS1ib3JkZXItY29sb3I7XG4gIH1cbiAgPiAudGFibGUgPiB0Ym9keTpmaXJzdC1jaGlsZCA+IHRyOmZpcnN0LWNoaWxkIHRoLFxuICA+IC50YWJsZSA+IHRib2R5OmZpcnN0LWNoaWxkID4gdHI6Zmlyc3QtY2hpbGQgdGQge1xuICAgIGJvcmRlci10b3A6IDA7XG4gIH1cbiAgPiAudGFibGUtYm9yZGVyZWQsXG4gID4gLnRhYmxlLXJlc3BvbnNpdmUgPiAudGFibGUtYm9yZGVyZWQge1xuICAgIGJvcmRlcjogMDtcbiAgICA+IHRoZWFkLFxuICAgID4gdGJvZHksXG4gICAgPiB0Zm9vdCB7XG4gICAgICA+IHRyIHtcbiAgICAgICAgPiB0aDpmaXJzdC1jaGlsZCxcbiAgICAgICAgPiB0ZDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgYm9yZGVyLWxlZnQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgPiB0aDpsYXN0LWNoaWxkLFxuICAgICAgICA+IHRkOmxhc3QtY2hpbGQge1xuICAgICAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICA+IHRoZWFkLFxuICAgID4gdGJvZHkge1xuICAgICAgPiB0cjpmaXJzdC1jaGlsZCB7XG4gICAgICAgID4gdGQsXG4gICAgICAgID4gdGgge1xuICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgPiB0Ym9keSxcbiAgICA+IHRmb290IHtcbiAgICAgID4gdHI6bGFzdC1jaGlsZCB7XG4gICAgICAgID4gdGQsXG4gICAgICAgID4gdGgge1xuICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgPiAudGFibGUtcmVzcG9uc2l2ZSB7XG4gICAgYm9yZGVyOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbn1cblxuXG4vLyBDb2xsYXBzYWJsZSBwYW5lbHMgKGFrYSwgYWNjb3JkaW9uKVxuLy9cbi8vIFdyYXAgYSBzZXJpZXMgb2YgcGFuZWxzIGluIGAucGFuZWwtZ3JvdXBgIHRvIHR1cm4gdGhlbSBpbnRvIGFuIGFjY29yZGlvbiB3aXRoXG4vLyB0aGUgaGVscCBvZiBvdXIgY29sbGFwc2UgSmF2YVNjcmlwdCBwbHVnaW4uXG5cbi5wYW5lbC1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206ICRsaW5lLWhlaWdodC1jb21wdXRlZDtcblxuICAvLyBUaWdodGVuIHVwIG1hcmdpbiBzbyBpdCdzIG9ubHkgYmV0d2VlbiBwYW5lbHNcbiAgLnBhbmVsIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6ICRwYW5lbC1ib3JkZXItcmFkaXVzO1xuXG4gICAgKyAucGFuZWwge1xuICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIH1cbiAgfVxuXG4gIC5wYW5lbC1oZWFkaW5nIHtcbiAgICBib3JkZXItYm90dG9tOiAwO1xuXG4gICAgKyAucGFuZWwtY29sbGFwc2UgPiAucGFuZWwtYm9keSxcbiAgICArIC5wYW5lbC1jb2xsYXBzZSA+IC5saXN0LWdyb3VwIHtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAkcGFuZWwtaW5uZXItYm9yZGVyO1xuICAgIH1cbiAgfVxuXG4gIC5wYW5lbC1mb290ZXIge1xuICAgIGJvcmRlci10b3A6IDA7XG4gICAgKyAucGFuZWwtY29sbGFwc2UgLnBhbmVsLWJvZHkge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRwYW5lbC1pbm5lci1ib3JkZXI7XG4gICAgfVxuICB9XG59XG5cblxuLy8gQ29udGV4dHVhbCB2YXJpYXRpb25zXG4ucGFuZWwtZGVmYXVsdCB7XG4gIEBpbmNsdWRlIHBhbmVsLXZhcmlhbnQoJHBhbmVsLWRlZmF1bHQtYm9yZGVyLCAkcGFuZWwtZGVmYXVsdC10ZXh0LCAkcGFuZWwtZGVmYXVsdC1oZWFkaW5nLWJnLCAkcGFuZWwtZGVmYXVsdC1ib3JkZXIpO1xufVxuLnBhbmVsLXByaW1hcnkge1xuICBAaW5jbHVkZSBwYW5lbC12YXJpYW50KCRwYW5lbC1wcmltYXJ5LWJvcmRlciwgJHBhbmVsLXByaW1hcnktdGV4dCwgJHBhbmVsLXByaW1hcnktaGVhZGluZy1iZywgJHBhbmVsLXByaW1hcnktYm9yZGVyKTtcbn1cbi5wYW5lbC1zdWNjZXNzIHtcbiAgQGluY2x1ZGUgcGFuZWwtdmFyaWFudCgkcGFuZWwtc3VjY2Vzcy1ib3JkZXIsICRwYW5lbC1zdWNjZXNzLXRleHQsICRwYW5lbC1zdWNjZXNzLWhlYWRpbmctYmcsICRwYW5lbC1zdWNjZXNzLWJvcmRlcik7XG59XG4ucGFuZWwtaW5mbyB7XG4gIEBpbmNsdWRlIHBhbmVsLXZhcmlhbnQoJHBhbmVsLWluZm8tYm9yZGVyLCAkcGFuZWwtaW5mby10ZXh0LCAkcGFuZWwtaW5mby1oZWFkaW5nLWJnLCAkcGFuZWwtaW5mby1ib3JkZXIpO1xufVxuLnBhbmVsLXdhcm5pbmcge1xuICBAaW5jbHVkZSBwYW5lbC12YXJpYW50KCRwYW5lbC13YXJuaW5nLWJvcmRlciwgJHBhbmVsLXdhcm5pbmctdGV4dCwgJHBhbmVsLXdhcm5pbmctaGVhZGluZy1iZywgJHBhbmVsLXdhcm5pbmctYm9yZGVyKTtcbn1cbi5wYW5lbC1kYW5nZXIge1xuICBAaW5jbHVkZSBwYW5lbC12YXJpYW50KCRwYW5lbC1kYW5nZXItYm9yZGVyLCAkcGFuZWwtZGFuZ2VyLXRleHQsICRwYW5lbC1kYW5nZXItaGVhZGluZy1iZywgJHBhbmVsLWRhbmdlci1ib3JkZXIpO1xufVxuIiwiLy9cbi8vIFdlbGxzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEJhc2UgY2xhc3Ncbi53ZWxsIHtcbiAgbWluLWhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMTlweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHdlbGwtYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICR3ZWxsLWJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZTtcbiAgQGluY2x1ZGUgYm94LXNoYWRvdyhpbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDUpKTtcbiAgYmxvY2txdW90ZSB7XG4gICAgYm9yZGVyLWNvbG9yOiAjZGRkO1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgwLDAsMCwuMTUpO1xuICB9XG59XG5cbi8vIFNpemVzXG4ud2VsbC1sZyB7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzLWxhcmdlO1xufVxuLndlbGwtc20ge1xuICBwYWRkaW5nOiA5cHg7XG4gIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzLXNtYWxsO1xufVxuIiwiLy8gRW1iZWRzIHJlc3BvbnNpdmVcbi8vXG4vLyBDcmVkaXQ6IE5pY29sYXMgR2FsbGFnaGVyIGFuZCBTVUlUIENTUy5cblxuLmVtYmVkLXJlc3BvbnNpdmUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgLmVtYmVkLXJlc3BvbnNpdmUtaXRlbSxcbiAgaWZyYW1lLFxuICBlbWJlZCxcbiAgb2JqZWN0LFxuICB2aWRlbyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyOiAwO1xuICB9XG59XG5cbi8vIE1vZGlmaWVyIGNsYXNzIGZvciAxNjo5IGFzcGVjdCByYXRpb1xuLmVtYmVkLXJlc3BvbnNpdmUtMTZieTkge1xuICBwYWRkaW5nLWJvdHRvbTogNTYuMjUlO1xufVxuXG4vLyBNb2RpZmllciBjbGFzcyBmb3IgNDozIGFzcGVjdCByYXRpb1xuLmVtYmVkLXJlc3BvbnNpdmUtNGJ5MyB7XG4gIHBhZGRpbmctYm90dG9tOiA3NSU7XG59XG4iLCIvL1xuLy8gQ2xvc2UgaWNvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLmNsb3NlIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBmb250LXNpemU6ICgkZm9udC1zaXplLWJhc2UgKiAxLjUpO1xuICBmb250LXdlaWdodDogJGNsb3NlLWZvbnQtd2VpZ2h0O1xuICBsaW5lLWhlaWdodDogMTtcbiAgY29sb3I6ICRjbG9zZS1jb2xvcjtcbiAgdGV4dC1zaGFkb3c6ICRjbG9zZS10ZXh0LXNoYWRvdztcbiAgQGluY2x1ZGUgb3BhY2l0eSguMik7XG5cbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgY29sb3I6ICRjbG9zZS1jb2xvcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIEBpbmNsdWRlIG9wYWNpdHkoLjUpO1xuICB9XG5cbiAgLy8gW2NvbnZlcnRlcl0gZXh0cmFjdGVkIGJ1dHRvbiYgdG8gYnV0dG9uLmNsb3NlXG59XG5cbi8vIEFkZGl0aW9uYWwgcHJvcGVydGllcyBmb3IgYnV0dG9uIHZlcnNpb25cbi8vIGlPUyByZXF1aXJlcyB0aGUgYnV0dG9uIGVsZW1lbnQgaW5zdGVhZCBvZiBhbiBhbmNob3IgdGFnLlxuLy8gSWYgeW91IHdhbnQgdGhlIGFuY2hvciB2ZXJzaW9uLCBpdCByZXF1aXJlcyBgaHJlZj1cIiNcImAuXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzL2NsaWNrI1NhZmFyaV9Nb2JpbGVcbmJ1dHRvbi5jbG9zZSB7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMDtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuIiwiLy9cbi8vIE1vZGFsc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gLm1vZGFsLW9wZW4gICAgICAtIGJvZHkgY2xhc3MgZm9yIGtpbGxpbmcgdGhlIHNjcm9sbFxuLy8gLm1vZGFsICAgICAgICAgICAtIGNvbnRhaW5lciB0byBzY3JvbGwgd2l0aGluXG4vLyAubW9kYWwtZGlhbG9nICAgIC0gcG9zaXRpb25pbmcgc2hlbGwgZm9yIHRoZSBhY3R1YWwgbW9kYWxcbi8vIC5tb2RhbC1jb250ZW50ICAgLSBhY3R1YWwgbW9kYWwgdy8gYmcgYW5kIGNvcm5lcnMgYW5kIHNoaXRcblxuLy8gS2lsbCB0aGUgc2Nyb2xsIG9uIHRoZSBib2R5XG4ubW9kYWwtb3BlbiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi8vIENvbnRhaW5lciB0aGF0IHRoZSBtb2RhbCBzY3JvbGxzIHdpdGhpblxuLm1vZGFsIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6ICR6aW5kZXgtbW9kYWw7XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcblxuICAvLyBQcmV2ZW50IENocm9tZSBvbiBXaW5kb3dzIGZyb20gYWRkaW5nIGEgZm9jdXMgb3V0bGluZS4gRm9yIGRldGFpbHMsIHNlZVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvcHVsbC8xMDk1MS5cbiAgb3V0bGluZTogMDtcblxuICAvLyBXaGVuIGZhZGluZyBpbiB0aGUgbW9kYWwsIGFuaW1hdGUgaXQgdG8gc2xpZGUgZG93blxuICAmLmZhZGUgLm1vZGFsLWRpYWxvZyB7XG4gICAgQGluY2x1ZGUgdHJhbnNsYXRlKDAsIC0yNSUpO1xuICAgIEBpbmNsdWRlIHRyYW5zaXRpb24tdHJhbnNmb3JtKDAuM3MgZWFzZS1vdXQpO1xuICB9XG4gICYuaW4gLm1vZGFsLWRpYWxvZyB7IEBpbmNsdWRlIHRyYW5zbGF0ZSgwLCAwKSB9XG59XG4ubW9kYWwtb3BlbiAubW9kYWwge1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi8vIFNoZWxsIGRpdiB0byBwb3NpdGlvbiB0aGUgbW9kYWwgd2l0aCBib3R0b20gcGFkZGluZ1xuLm1vZGFsLWRpYWxvZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IGF1dG87XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLy8gQWN0dWFsIG1vZGFsXG4ubW9kYWwtY29udGVudCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJG1vZGFsLWNvbnRlbnQtYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRtb2RhbC1jb250ZW50LWZhbGxiYWNrLWJvcmRlci1jb2xvcjsgLy9vbGQgYnJvd3NlcnMgZmFsbGJhY2sgKGllOCBldGMpXG4gIGJvcmRlcjogMXB4IHNvbGlkICRtb2RhbC1jb250ZW50LWJvcmRlci1jb2xvcjtcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtbGFyZ2U7XG4gIEBpbmNsdWRlIGJveC1zaGFkb3coMCAzcHggOXB4IHJnYmEoMCwwLDAsLjUpKTtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgLy8gUmVtb3ZlIGZvY3VzIG91dGxpbmUgZnJvbSBvcGVuZWQgbW9kYWxcbiAgb3V0bGluZTogMDtcbn1cblxuLy8gTW9kYWwgYmFja2dyb3VuZFxuLm1vZGFsLWJhY2tkcm9wIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6ICR6aW5kZXgtbW9kYWwtYmFja2dyb3VuZDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJG1vZGFsLWJhY2tkcm9wLWJnO1xuICAvLyBGYWRlIGZvciBiYWNrZHJvcFxuICAmLmZhZGUgeyBAaW5jbHVkZSBvcGFjaXR5KDApOyB9XG4gICYuaW4geyBAaW5jbHVkZSBvcGFjaXR5KCRtb2RhbC1iYWNrZHJvcC1vcGFjaXR5KTsgfVxufVxuXG4vLyBNb2RhbCBoZWFkZXJcbi8vIFRvcCBzZWN0aW9uIG9mIHRoZSBtb2RhbCB3LyB0aXRsZSBhbmQgZGlzbWlzc1xuLm1vZGFsLWhlYWRlciB7XG4gIHBhZGRpbmc6ICRtb2RhbC10aXRsZS1wYWRkaW5nO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJG1vZGFsLWhlYWRlci1ib3JkZXItY29sb3I7XG4gIEBpbmNsdWRlIGNsZWFyZml4O1xufVxuLy8gQ2xvc2UgaWNvblxuLm1vZGFsLWhlYWRlciAuY2xvc2Uge1xuICBtYXJnaW4tdG9wOiAtMnB4O1xufVxuXG4vLyBUaXRsZSB0ZXh0IHdpdGhpbiBoZWFkZXJcbi5tb2RhbC10aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgbGluZS1oZWlnaHQ6ICRtb2RhbC10aXRsZS1saW5lLWhlaWdodDtcbn1cblxuLy8gTW9kYWwgYm9keVxuLy8gV2hlcmUgYWxsIG1vZGFsIGNvbnRlbnQgcmVzaWRlcyAoc2libGluZyBvZiAubW9kYWwtaGVhZGVyIGFuZCAubW9kYWwtZm9vdGVyKVxuLm1vZGFsLWJvZHkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmc6ICRtb2RhbC1pbm5lci1wYWRkaW5nO1xufVxuXG4vLyBGb290ZXIgKGZvciBhY3Rpb25zKVxuLm1vZGFsLWZvb3RlciB7XG4gIHBhZGRpbmc6ICRtb2RhbC1pbm5lci1wYWRkaW5nO1xuICB0ZXh0LWFsaWduOiByaWdodDsgLy8gcmlnaHQgYWxpZ24gYnV0dG9uc1xuICBib3JkZXItdG9wOiAxcHggc29saWQgJG1vZGFsLWZvb3Rlci1ib3JkZXItY29sb3I7XG4gIEBpbmNsdWRlIGNsZWFyZml4OyAvLyBjbGVhciBpdCBpbiBjYXNlIGZvbGtzIHVzZSAucHVsbC0qIGNsYXNzZXMgb24gYnV0dG9uc1xuXG4gIC8vIFByb3Blcmx5IHNwYWNlIG91dCBidXR0b25zXG4gIC5idG4gKyAuYnRuIHtcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDA7IC8vIGFjY291bnQgZm9yIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0gd2hpY2ggZ2V0cyB0aGUgYm90dG9tIG1hcmdpbiBsaWtlIGFsbCBvdGhlciBpbnB1dHNcbiAgfVxuICAvLyBidXQgb3ZlcnJpZGUgdGhhdCBmb3IgYnV0dG9uIGdyb3Vwc1xuICAuYnRuLWdyb3VwIC5idG4gKyAuYnRuIHtcbiAgICBtYXJnaW4tbGVmdDogLTFweDtcbiAgfVxuICAvLyBhbmQgb3ZlcnJpZGUgaXQgZm9yIGJsb2NrIGJ1dHRvbnMgYXMgd2VsbFxuICAuYnRuLWJsb2NrICsgLmJ0bi1ibG9jayB7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gIH1cbn1cblxuLy8gTWVhc3VyZSBzY3JvbGxiYXIgd2lkdGggZm9yIHBhZGRpbmcgYm9keSBkdXJpbmcgbW9kYWwgc2hvdy9oaWRlXG4ubW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTk5OTlweDtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cblxuLy8gU2NhbGUgdXAgdGhlIG1vZGFsXG5AbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIHtcbiAgLy8gQXV0b21hdGljYWxseSBzZXQgbW9kYWwncyB3aWR0aCBmb3IgbGFyZ2VyIHZpZXdwb3J0c1xuICAubW9kYWwtZGlhbG9nIHtcbiAgICB3aWR0aDogJG1vZGFsLW1kO1xuICAgIG1hcmdpbjogMzBweCBhdXRvO1xuICB9XG4gIC5tb2RhbC1jb250ZW50IHtcbiAgICBAaW5jbHVkZSBib3gtc2hhZG93KDAgNXB4IDE1cHggcmdiYSgwLDAsMCwuNSkpO1xuICB9XG5cbiAgLy8gTW9kYWwgc2l6ZXNcbiAgLm1vZGFsLXNtIHsgd2lkdGg6ICRtb2RhbC1zbTsgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1tZC1taW4pIHtcbiAgLm1vZGFsLWxnIHsgd2lkdGg6ICRtb2RhbC1sZzsgfVxufVxuIiwiLy9cbi8vIFRvb2x0aXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEJhc2UgY2xhc3Ncbi50b29sdGlwIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAkemluZGV4LXRvb2x0aXA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICAvLyBPdXIgcGFyZW50IGVsZW1lbnQgY2FuIGJlIGFyYml0cmFyeSBzaW5jZSB0b29sdGlwcyBhcmUgYnkgZGVmYXVsdCBpbnNlcnRlZCBhcyBhIHNpYmxpbmcgb2YgdGhlaXIgdGFyZ2V0IGVsZW1lbnQuXG4gIC8vIFNvIHJlc2V0IG91ciBmb250IGFuZCB0ZXh0IHByb3BlcnRpZXMgdG8gYXZvaWQgaW5oZXJpdGluZyB3ZWlyZCB2YWx1ZXMuXG4gIEBpbmNsdWRlIHJlc2V0LXRleHQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1zbWFsbDtcblxuICBAaW5jbHVkZSBvcGFjaXR5KDApO1xuXG4gICYuaW4gICAgIHsgQGluY2x1ZGUgb3BhY2l0eSgkdG9vbHRpcC1vcGFjaXR5KTsgfVxuICAmLnRvcCAgICB7IG1hcmdpbi10b3A6ICAtM3B4OyBwYWRkaW5nOiAkdG9vbHRpcC1hcnJvdy13aWR0aCAwOyB9XG4gICYucmlnaHQgIHsgbWFyZ2luLWxlZnQ6ICAzcHg7IHBhZGRpbmc6IDAgJHRvb2x0aXAtYXJyb3ctd2lkdGg7IH1cbiAgJi5ib3R0b20geyBtYXJnaW4tdG9wOiAgIDNweDsgcGFkZGluZzogJHRvb2x0aXAtYXJyb3ctd2lkdGggMDsgfVxuICAmLmxlZnQgICB7IG1hcmdpbi1sZWZ0OiAtM3B4OyBwYWRkaW5nOiAwICR0b29sdGlwLWFycm93LXdpZHRoOyB9XG59XG5cbi8vIFdyYXBwZXIgZm9yIHRoZSB0b29sdGlwIGNvbnRlbnRcbi50b29sdGlwLWlubmVyIHtcbiAgbWF4LXdpZHRoOiAkdG9vbHRpcC1tYXgtd2lkdGg7XG4gIHBhZGRpbmc6IDNweCA4cHg7XG4gIGNvbG9yOiAkdG9vbHRpcC1jb2xvcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkdG9vbHRpcC1iZztcbiAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXMtYmFzZTtcbn1cblxuLy8gQXJyb3dzXG4udG9vbHRpcC1hcnJvdyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbn1cbi8vIE5vdGU6IERlcHJlY2F0ZWQgLnRvcC1sZWZ0LCAudG9wLXJpZ2h0LCAuYm90dG9tLWxlZnQsIGFuZCAuYm90dG9tLXJpZ2h0IGFzIG9mIHYzLjMuMVxuLnRvb2x0aXAge1xuICAmLnRvcCAudG9vbHRpcC1hcnJvdyB7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tbGVmdDogLSR0b29sdGlwLWFycm93LXdpZHRoO1xuICAgIGJvcmRlci13aWR0aDogJHRvb2x0aXAtYXJyb3ctd2lkdGggJHRvb2x0aXAtYXJyb3ctd2lkdGggMDtcbiAgICBib3JkZXItdG9wLWNvbG9yOiAkdG9vbHRpcC1hcnJvdy1jb2xvcjtcbiAgfVxuICAmLnRvcC1sZWZ0IC50b29sdGlwLWFycm93IHtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6ICR0b29sdGlwLWFycm93LXdpZHRoO1xuICAgIG1hcmdpbi1ib3R0b206IC0kdG9vbHRpcC1hcnJvdy13aWR0aDtcbiAgICBib3JkZXItd2lkdGg6ICR0b29sdGlwLWFycm93LXdpZHRoICR0b29sdGlwLWFycm93LXdpZHRoIDA7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogJHRvb2x0aXAtYXJyb3ctY29sb3I7XG4gIH1cbiAgJi50b3AtcmlnaHQgLnRvb2x0aXAtYXJyb3cge1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAkdG9vbHRpcC1hcnJvdy13aWR0aDtcbiAgICBtYXJnaW4tYm90dG9tOiAtJHRvb2x0aXAtYXJyb3ctd2lkdGg7XG4gICAgYm9yZGVyLXdpZHRoOiAkdG9vbHRpcC1hcnJvdy13aWR0aCAkdG9vbHRpcC1hcnJvdy13aWR0aCAwO1xuICAgIGJvcmRlci10b3AtY29sb3I6ICR0b29sdGlwLWFycm93LWNvbG9yO1xuICB9XG4gICYucmlnaHQgLnRvb2x0aXAtYXJyb3cge1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDA7XG4gICAgbWFyZ2luLXRvcDogLSR0b29sdGlwLWFycm93LXdpZHRoO1xuICAgIGJvcmRlci13aWR0aDogJHRvb2x0aXAtYXJyb3ctd2lkdGggJHRvb2x0aXAtYXJyb3ctd2lkdGggJHRvb2x0aXAtYXJyb3ctd2lkdGggMDtcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICR0b29sdGlwLWFycm93LWNvbG9yO1xuICB9XG4gICYubGVmdCAudG9vbHRpcC1hcnJvdyB7XG4gICAgdG9wOiA1MCU7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLXRvcDogLSR0b29sdGlwLWFycm93LXdpZHRoO1xuICAgIGJvcmRlci13aWR0aDogJHRvb2x0aXAtYXJyb3ctd2lkdGggMCAkdG9vbHRpcC1hcnJvdy13aWR0aCAkdG9vbHRpcC1hcnJvdy13aWR0aDtcbiAgICBib3JkZXItbGVmdC1jb2xvcjogJHRvb2x0aXAtYXJyb3ctY29sb3I7XG4gIH1cbiAgJi5ib3R0b20gLnRvb2x0aXAtYXJyb3cge1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiA1MCU7XG4gICAgbWFyZ2luLWxlZnQ6IC0kdG9vbHRpcC1hcnJvdy13aWR0aDtcbiAgICBib3JkZXItd2lkdGg6IDAgJHRvb2x0aXAtYXJyb3ctd2lkdGggJHRvb2x0aXAtYXJyb3ctd2lkdGg7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHRvb2x0aXAtYXJyb3ctY29sb3I7XG4gIH1cbiAgJi5ib3R0b20tbGVmdCAudG9vbHRpcC1hcnJvdyB7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAkdG9vbHRpcC1hcnJvdy13aWR0aDtcbiAgICBtYXJnaW4tdG9wOiAtJHRvb2x0aXAtYXJyb3ctd2lkdGg7XG4gICAgYm9yZGVyLXdpZHRoOiAwICR0b29sdGlwLWFycm93LXdpZHRoICR0b29sdGlwLWFycm93LXdpZHRoO1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICR0b29sdGlwLWFycm93LWNvbG9yO1xuICB9XG4gICYuYm90dG9tLXJpZ2h0IC50b29sdGlwLWFycm93IHtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogJHRvb2x0aXAtYXJyb3ctd2lkdGg7XG4gICAgbWFyZ2luLXRvcDogLSR0b29sdGlwLWFycm93LXdpZHRoO1xuICAgIGJvcmRlci13aWR0aDogMCAkdG9vbHRpcC1hcnJvdy13aWR0aCAkdG9vbHRpcC1hcnJvdy13aWR0aDtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkdG9vbHRpcC1hcnJvdy1jb2xvcjtcbiAgfVxufVxuIiwiLy9cbi8vIFBvcG92ZXJzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi5wb3BvdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6ICR6aW5kZXgtcG9wb3ZlcjtcbiAgZGlzcGxheTogbm9uZTtcbiAgbWF4LXdpZHRoOiAkcG9wb3Zlci1tYXgtd2lkdGg7XG4gIHBhZGRpbmc6IDFweDtcbiAgLy8gT3VyIHBhcmVudCBlbGVtZW50IGNhbiBiZSBhcmJpdHJhcnkgc2luY2UgcG9wb3ZlcnMgYXJlIGJ5IGRlZmF1bHQgaW5zZXJ0ZWQgYXMgYSBzaWJsaW5nIG9mIHRoZWlyIHRhcmdldCBlbGVtZW50LlxuICAvLyBTbyByZXNldCBvdXIgZm9udCBhbmQgdGV4dCBwcm9wZXJ0aWVzIHRvIGF2b2lkIGluaGVyaXRpbmcgd2VpcmQgdmFsdWVzLlxuICBAaW5jbHVkZSByZXNldC10ZXh0O1xuICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkcG9wb3Zlci1iZztcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHBvcG92ZXItZmFsbGJhY2stYm9yZGVyLWNvbG9yO1xuICBib3JkZXI6IDFweCBzb2xpZCAkcG9wb3Zlci1ib3JkZXItY29sb3I7XG4gIGJvcmRlci1yYWRpdXM6ICRib3JkZXItcmFkaXVzLWxhcmdlO1xuICBAaW5jbHVkZSBib3gtc2hhZG93KDAgNXB4IDEwcHggcmdiYSgwLDAsMCwuMikpO1xuXG4gIC8vIE9mZnNldCB0aGUgcG9wb3ZlciB0byBhY2NvdW50IGZvciB0aGUgcG9wb3ZlciBhcnJvd1xuICAmLnRvcCAgICAgeyBtYXJnaW4tdG9wOiAtJHBvcG92ZXItYXJyb3ctd2lkdGg7IH1cbiAgJi5yaWdodCAgIHsgbWFyZ2luLWxlZnQ6ICRwb3BvdmVyLWFycm93LXdpZHRoOyB9XG4gICYuYm90dG9tICB7IG1hcmdpbi10b3A6ICRwb3BvdmVyLWFycm93LXdpZHRoOyB9XG4gICYubGVmdCAgICB7IG1hcmdpbi1sZWZ0OiAtJHBvcG92ZXItYXJyb3ctd2lkdGg7IH1cbn1cblxuLnBvcG92ZXItdGl0bGUge1xuICBtYXJnaW46IDA7IC8vIHJlc2V0IGhlYWRpbmcgbWFyZ2luXG4gIHBhZGRpbmc6IDhweCAxNHB4O1xuICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHBvcG92ZXItdGl0bGUtYmc7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBkYXJrZW4oJHBvcG92ZXItdGl0bGUtYmcsIDUlKTtcbiAgYm9yZGVyLXJhZGl1czogKCRib3JkZXItcmFkaXVzLWxhcmdlIC0gMSkgKCRib3JkZXItcmFkaXVzLWxhcmdlIC0gMSkgMCAwO1xufVxuXG4ucG9wb3Zlci1jb250ZW50IHtcbiAgcGFkZGluZzogOXB4IDE0cHg7XG59XG5cbi8vIEFycm93c1xuLy9cbi8vIC5hcnJvdyBpcyBvdXRlciwgLmFycm93OmFmdGVyIGlzIGlubmVyXG5cbi5wb3BvdmVyID4gLmFycm93IHtcbiAgJixcbiAgJjphZnRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIH1cbn1cbi5wb3BvdmVyID4gLmFycm93IHtcbiAgYm9yZGVyLXdpZHRoOiAkcG9wb3Zlci1hcnJvdy1vdXRlci13aWR0aDtcbn1cbi5wb3BvdmVyID4gLmFycm93OmFmdGVyIHtcbiAgYm9yZGVyLXdpZHRoOiAkcG9wb3Zlci1hcnJvdy13aWR0aDtcbiAgY29udGVudDogXCJcIjtcbn1cblxuLnBvcG92ZXIge1xuICAmLnRvcCA+IC5hcnJvdyB7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtJHBvcG92ZXItYXJyb3ctb3V0ZXItd2lkdGg7XG4gICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcbiAgICBib3JkZXItdG9wLWNvbG9yOiAkcG9wb3Zlci1hcnJvdy1vdXRlci1mYWxsYmFjay1jb2xvcjsgLy8gSUU4IGZhbGxiYWNrXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogJHBvcG92ZXItYXJyb3ctb3V0ZXItY29sb3I7XG4gICAgYm90dG9tOiAtJHBvcG92ZXItYXJyb3ctb3V0ZXItd2lkdGg7XG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgIGJvdHRvbTogMXB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IC0kcG9wb3Zlci1hcnJvdy13aWR0aDtcbiAgICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG4gICAgICBib3JkZXItdG9wLWNvbG9yOiAkcG9wb3Zlci1hcnJvdy1jb2xvcjtcbiAgICB9XG4gIH1cbiAgJi5yaWdodCA+IC5hcnJvdyB7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogLSRwb3BvdmVyLWFycm93LW91dGVyLXdpZHRoO1xuICAgIG1hcmdpbi10b3A6IC0kcG9wb3Zlci1hcnJvdy1vdXRlci13aWR0aDtcbiAgICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICRwb3BvdmVyLWFycm93LW91dGVyLWZhbGxiYWNrLWNvbG9yOyAvLyBJRTggZmFsbGJhY2tcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICRwb3BvdmVyLWFycm93LW91dGVyLWNvbG9yO1xuICAgICY6YWZ0ZXIge1xuICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICBsZWZ0OiAxcHg7XG4gICAgICBib3R0b206IC0kcG9wb3Zlci1hcnJvdy13aWR0aDtcbiAgICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAwO1xuICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAkcG9wb3Zlci1hcnJvdy1jb2xvcjtcbiAgICB9XG4gIH1cbiAgJi5ib3R0b20gPiAuYXJyb3cge1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tbGVmdDogLSRwb3BvdmVyLWFycm93LW91dGVyLXdpZHRoO1xuICAgIGJvcmRlci10b3Atd2lkdGg6IDA7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHBvcG92ZXItYXJyb3ctb3V0ZXItZmFsbGJhY2stY29sb3I7IC8vIElFOCBmYWxsYmFja1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICRwb3BvdmVyLWFycm93LW91dGVyLWNvbG9yO1xuICAgIHRvcDogLSRwb3BvdmVyLWFycm93LW91dGVyLXdpZHRoO1xuICAgICY6YWZ0ZXIge1xuICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICB0b3A6IDFweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtJHBvcG92ZXItYXJyb3ctd2lkdGg7XG4gICAgICBib3JkZXItdG9wLXdpZHRoOiAwO1xuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHBvcG92ZXItYXJyb3ctY29sb3I7XG4gICAgfVxuICB9XG5cbiAgJi5sZWZ0ID4gLmFycm93IHtcbiAgICB0b3A6IDUwJTtcbiAgICByaWdodDogLSRwb3BvdmVyLWFycm93LW91dGVyLXdpZHRoO1xuICAgIG1hcmdpbi10b3A6IC0kcG9wb3Zlci1hcnJvdy1vdXRlci13aWR0aDtcbiAgICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICRwb3BvdmVyLWFycm93LW91dGVyLWZhbGxiYWNrLWNvbG9yOyAvLyBJRTggZmFsbGJhY2tcbiAgICBib3JkZXItbGVmdC1jb2xvcjogJHBvcG92ZXItYXJyb3ctb3V0ZXItY29sb3I7XG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgIHJpZ2h0OiAxcHg7XG4gICAgICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG4gICAgICBib3JkZXItbGVmdC1jb2xvcjogJHBvcG92ZXItYXJyb3ctY29sb3I7XG4gICAgICBib3R0b206IC0kcG9wb3Zlci1hcnJvdy13aWR0aDtcbiAgICB9XG4gIH1cbn1cbiIsIi8vXG4vLyBDYXJvdXNlbFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBXcmFwcGVyIGZvciB0aGUgc2xpZGUgY29udGFpbmVyIGFuZCBpbmRpY2F0b3JzXG4uY2Fyb3VzZWwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5jYXJvdXNlbC1pbm5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgPiAuaXRlbSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgQGluY2x1ZGUgdHJhbnNpdGlvbiguNnMgZWFzZS1pbi1vdXQgbGVmdCk7XG5cbiAgICAvLyBBY2NvdW50IGZvciBqYW5raXR1ZGUgb24gaW1hZ2VzXG4gICAgPiBpbWcsXG4gICAgPiBhID4gaW1nIHtcbiAgICAgIEBpbmNsdWRlIGltZy1yZXNwb25zaXZlO1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgfVxuXG4gICAgLy8gV2ViS2l0IENTUzMgdHJhbnNmb3JtcyBmb3Igc3VwcG9ydGVkIGRldmljZXNcbiAgICBAbWVkaWEgYWxsIGFuZCAodHJhbnNmb3JtLTNkKSwgKC13ZWJraXQtdHJhbnNmb3JtLTNkKSB7XG4gICAgICBAaW5jbHVkZSB0cmFuc2l0aW9uLXRyYW5zZm9ybSgwLjZzIGVhc2UtaW4tb3V0KTtcbiAgICAgIEBpbmNsdWRlIGJhY2tmYWNlLXZpc2liaWxpdHkoaGlkZGVuKTtcbiAgICAgIEBpbmNsdWRlIHBlcnNwZWN0aXZlKDEwMDBweCk7XG5cbiAgICAgICYubmV4dCxcbiAgICAgICYuYWN0aXZlLnJpZ2h0IHtcbiAgICAgICAgQGluY2x1ZGUgdHJhbnNsYXRlM2QoMTAwJSwgMCwgMCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICB9XG4gICAgICAmLnByZXYsXG4gICAgICAmLmFjdGl2ZS5sZWZ0IHtcbiAgICAgICAgQGluY2x1ZGUgdHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgfVxuICAgICAgJi5uZXh0LmxlZnQsXG4gICAgICAmLnByZXYucmlnaHQsXG4gICAgICAmLmFjdGl2ZSB7XG4gICAgICAgIEBpbmNsdWRlIHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gID4gLmFjdGl2ZSxcbiAgPiAubmV4dCxcbiAgPiAucHJldiB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cblxuICA+IC5hY3RpdmUge1xuICAgIGxlZnQ6IDA7XG4gIH1cblxuICA+IC5uZXh0LFxuICA+IC5wcmV2IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgPiAubmV4dCB7XG4gICAgbGVmdDogMTAwJTtcbiAgfVxuICA+IC5wcmV2IHtcbiAgICBsZWZ0OiAtMTAwJTtcbiAgfVxuICA+IC5uZXh0LmxlZnQsXG4gID4gLnByZXYucmlnaHQge1xuICAgIGxlZnQ6IDA7XG4gIH1cblxuICA+IC5hY3RpdmUubGVmdCB7XG4gICAgbGVmdDogLTEwMCU7XG4gIH1cbiAgPiAuYWN0aXZlLnJpZ2h0IHtcbiAgICBsZWZ0OiAxMDAlO1xuICB9XG5cbn1cblxuLy8gTGVmdC9yaWdodCBjb250cm9scyBmb3IgbmF2XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLmNhcm91c2VsLWNvbnRyb2wge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogJGNhcm91c2VsLWNvbnRyb2wtd2lkdGg7XG4gIEBpbmNsdWRlIG9wYWNpdHkoJGNhcm91c2VsLWNvbnRyb2wtb3BhY2l0eSk7XG4gIGZvbnQtc2l6ZTogJGNhcm91c2VsLWNvbnRyb2wtZm9udC1zaXplO1xuICBjb2xvcjogJGNhcm91c2VsLWNvbnRyb2wtY29sb3I7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1zaGFkb3c6ICRjYXJvdXNlbC10ZXh0LXNoYWRvdztcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTsgLy8gRml4IElFOSBjbGljay10aHJ1IGJ1Z1xuICAvLyBXZSBjYW4ndCBoYXZlIHRoaXMgdHJhbnNpdGlvbiBoZXJlIGJlY2F1c2UgV2ViS2l0IGNhbmNlbHMgdGhlIGNhcm91c2VsXG4gIC8vIGFuaW1hdGlvbiBpZiB5b3UgdHJpcCB0aGlzIHdoaWxlIGluIHRoZSBtaWRkbGUgb2YgYW5vdGhlciBhbmltYXRpb24uXG5cbiAgLy8gU2V0IGdyYWRpZW50cyBmb3IgYmFja2dyb3VuZHNcbiAgJi5sZWZ0IHtcbiAgICBAaW5jbHVkZSBncmFkaWVudC1ob3Jpem9udGFsKCRzdGFydC1jb2xvcjogcmdiYSgwLDAsMCwuNSksICRlbmQtY29sb3I6IHJnYmEoMCwwLDAsLjAwMDEpKTtcbiAgfVxuICAmLnJpZ2h0IHtcbiAgICBsZWZ0OiBhdXRvO1xuICAgIHJpZ2h0OiAwO1xuICAgIEBpbmNsdWRlIGdyYWRpZW50LWhvcml6b250YWwoJHN0YXJ0LWNvbG9yOiByZ2JhKDAsMCwwLC4wMDAxKSwgJGVuZC1jb2xvcjogcmdiYSgwLDAsMCwuNSkpO1xuICB9XG5cbiAgLy8gSG92ZXIvZm9jdXMgc3RhdGVcbiAgJjpob3ZlcixcbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogMDtcbiAgICBjb2xvcjogJGNhcm91c2VsLWNvbnRyb2wtY29sb3I7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIEBpbmNsdWRlIG9wYWNpdHkoLjkpO1xuICB9XG5cbiAgLy8gVG9nZ2xlc1xuICAuaWNvbi1wcmV2LFxuICAuaWNvbi1uZXh0LFxuICAuZ2x5cGhpY29uLWNoZXZyb24tbGVmdCxcbiAgLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgei1pbmRleDogNTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbiAgLmljb24tcHJldixcbiAgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnQge1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XG4gIH1cbiAgLmljb24tbmV4dCxcbiAgLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0IHtcbiAgICByaWdodDogNTAlO1xuICAgIG1hcmdpbi1yaWdodDogLTEwcHg7XG4gIH1cbiAgLmljb24tcHJldixcbiAgLmljb24tbmV4dCB7XG4gICAgd2lkdGg6ICAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBmb250LWZhbWlseTogc2VyaWY7XG4gIH1cblxuXG4gIC5pY29uLXByZXYge1xuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICdcXDIwMzknOy8vIFNJTkdMRSBMRUZULVBPSU5USU5HIEFOR0xFIFFVT1RBVElPTiBNQVJLIChVKzIwMzkpXG4gICAgfVxuICB9XG4gIC5pY29uLW5leHQge1xuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICdcXDIwM2EnOy8vIFNJTkdMRSBSSUdIVC1QT0lOVElORyBBTkdMRSBRVU9UQVRJT04gTUFSSyAoVSsyMDNBKVxuICAgIH1cbiAgfVxufVxuXG4vLyBPcHRpb25hbCBpbmRpY2F0b3IgcGlwc1xuLy9cbi8vIEFkZCBhbiB1bm9yZGVyZWQgbGlzdCB3aXRoIHRoZSBmb2xsb3dpbmcgY2xhc3MgYW5kIGFkZCBhIGxpc3QgaXRlbSBmb3IgZWFjaFxuLy8gc2xpZGUgeW91ciBjYXJvdXNlbCBob2xkcy5cblxuLmNhcm91c2VsLWluZGljYXRvcnMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTBweDtcbiAgbGVmdDogNTAlO1xuICB6LWluZGV4OiAxNTtcbiAgd2lkdGg6IDYwJTtcbiAgbWFyZ2luLWxlZnQ6IC0zMCU7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIGxpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6ICAxMHB4O1xuICAgIGhlaWdodDogMTBweDtcbiAgICBtYXJnaW46IDFweDtcbiAgICB0ZXh0LWluZGVudDogLTk5OXB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICRjYXJvdXNlbC1pbmRpY2F0b3ItYm9yZGVyLWNvbG9yO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgLy8gSUU4LTkgaGFjayBmb3IgZXZlbnQgaGFuZGxpbmdcbiAgICAvL1xuICAgIC8vIEludGVybmV0IEV4cGxvcmVyIDgtOSBkb2VzIG5vdCBzdXBwb3J0IGNsaWNrcyBvbiBlbGVtZW50cyB3aXRob3V0IGEgc2V0XG4gICAgLy8gYGJhY2tncm91bmQtY29sb3JgLiBXZSBjYW5ub3QgdXNlIGBmaWx0ZXJgIHNpbmNlIHRoYXQncyBub3Qgdmlld2VkIGFzIGFcbiAgICAvLyBiYWNrZ3JvdW5kIGNvbG9yIGJ5IHRoZSBicm93c2VyLiBUaHVzLCBhIGhhY2sgaXMgbmVlZGVkLlxuICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvY2xpY2sjSW50ZXJuZXRfRXhwbG9yZXJcbiAgICAvL1xuICAgIC8vIEZvciBJRTgsIHdlIHNldCBzb2xpZCBibGFjayBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgYHJnYmEoKWAuIEZvciBJRTksIHdlXG4gICAgLy8gc2V0IGFscGhhIHRyYW5zcGFyZW5jeSBmb3IgdGhlIGJlc3QgcmVzdWx0cyBwb3NzaWJsZS5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwIFxcOTsgLy8gSUU4XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwKTsgLy8gSUU5XG4gIH1cbiAgLmFjdGl2ZSB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHdpZHRoOiAgMTJweDtcbiAgICBoZWlnaHQ6IDEycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNhcm91c2VsLWluZGljYXRvci1hY3RpdmUtYmc7XG4gIH1cbn1cblxuLy8gT3B0aW9uYWwgY2FwdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBIaWRkZW4gYnkgZGVmYXVsdCBmb3Igc21hbGxlciB2aWV3cG9ydHNcbi5jYXJvdXNlbC1jYXB0aW9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAxNSU7XG4gIHJpZ2h0OiAxNSU7XG4gIGJvdHRvbTogMjBweDtcbiAgei1pbmRleDogMTA7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgY29sb3I6ICRjYXJvdXNlbC1jYXB0aW9uLWNvbG9yO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtc2hhZG93OiAkY2Fyb3VzZWwtdGV4dC1zaGFkb3c7XG4gICYgLmJ0biB7XG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7IC8vIE5vIHNoYWRvdyBmb3IgYnV0dG9uIGVsZW1lbnRzIGluIGNhcm91c2VsLWNhcHRpb25cbiAgfVxufVxuXG5cbi8vIFNjYWxlIHVwIGNvbnRyb2xzIGZvciB0YWJsZXRzIGFuZCB1cFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIHtcblxuICAvLyBTY2FsZSB1cCB0aGUgY29udHJvbHMgYSBzbWlkZ2VcbiAgLmNhcm91c2VsLWNvbnRyb2wge1xuICAgIC5nbHlwaGljb24tY2hldnJvbi1sZWZ0LFxuICAgIC5nbHlwaGljb24tY2hldnJvbi1yaWdodCxcbiAgICAuaWNvbi1wcmV2LFxuICAgIC5pY29uLW5leHQge1xuICAgICAgd2lkdGg6ICgkY2Fyb3VzZWwtY29udHJvbC1mb250LXNpemUgKiAxLjUpO1xuICAgICAgaGVpZ2h0OiAoJGNhcm91c2VsLWNvbnRyb2wtZm9udC1zaXplICogMS41KTtcbiAgICAgIG1hcmdpbi10b3A6ICgkY2Fyb3VzZWwtY29udHJvbC1mb250LXNpemUgLyAtMik7XG4gICAgICBmb250LXNpemU6ICgkY2Fyb3VzZWwtY29udHJvbC1mb250LXNpemUgKiAxLjUpO1xuICAgIH1cbiAgICAuZ2x5cGhpY29uLWNoZXZyb24tbGVmdCxcbiAgICAuaWNvbi1wcmV2IHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAoJGNhcm91c2VsLWNvbnRyb2wtZm9udC1zaXplIC8gLTIpO1xuICAgIH1cbiAgICAuZ2x5cGhpY29uLWNoZXZyb24tcmlnaHQsXG4gICAgLmljb24tbmV4dCB7XG4gICAgICBtYXJnaW4tcmlnaHQ6ICgkY2Fyb3VzZWwtY29udHJvbC1mb250LXNpemUgLyAtMik7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdyBhbmQgbGVmdCBhbGlnbiB0aGUgY2FwdGlvbnNcbiAgLmNhcm91c2VsLWNhcHRpb24ge1xuICAgIGxlZnQ6IDIwJTtcbiAgICByaWdodDogMjAlO1xuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xuICB9XG5cbiAgLy8gTW92ZSB1cCB0aGUgaW5kaWNhdG9yc1xuICAuY2Fyb3VzZWwtaW5kaWNhdG9ycyB7XG4gICAgYm90dG9tOiAyMHB4O1xuICB9XG59XG4iLCIvL1xuLy8gVXRpbGl0eSBjbGFzc2VzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIEZsb2F0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4uY2xlYXJmaXgge1xuICBAaW5jbHVkZSBjbGVhcmZpeDtcbn1cbi5jZW50ZXItYmxvY2sge1xuICBAaW5jbHVkZSBjZW50ZXItYmxvY2s7XG59XG4ucHVsbC1yaWdodCB7XG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xufVxuLnB1bGwtbGVmdCB7XG4gIGZsb2F0OiBsZWZ0ICFpbXBvcnRhbnQ7XG59XG5cblxuLy8gVG9nZ2xpbmcgY29udGVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBOb3RlOiBEZXByZWNhdGVkIC5oaWRlIGluIGZhdm9yIG9mIC5oaWRkZW4gb3IgLnNyLW9ubHkgKGFzIGFwcHJvcHJpYXRlKSBpbiB2My4wLjFcbi5oaWRlIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuLnNob3cge1xuICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xufVxuLmludmlzaWJsZSB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi50ZXh0LWhpZGUge1xuICBAaW5jbHVkZSB0ZXh0LWhpZGU7XG59XG5cblxuLy8gSGlkZSBmcm9tIHNjcmVlbnJlYWRlcnMgYW5kIGJyb3dzZXJzXG4vL1xuLy8gQ3JlZGl0OiBIVE1MNSBCb2lsZXJwbGF0ZVxuXG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG5cbi8vIEZvciBBZmZpeCBwbHVnaW5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLmFmZml4IHtcbiAgcG9zaXRpb246IGZpeGVkO1xufVxuIiwiLy9cbi8vIFJlc3BvbnNpdmU6IFV0aWxpdHkgY2xhc3Nlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBJRTEwIGluIFdpbmRvd3MgKFBob25lKSA4XG4vL1xuLy8gU3VwcG9ydCBmb3IgcmVzcG9uc2l2ZSB2aWV3cyB2aWEgbWVkaWEgcXVlcmllcyBpcyBraW5kIG9mIGJvcmtlZCBpbiBJRTEwLCBmb3Jcbi8vIFN1cmZhY2UvZGVza3RvcCBpbiBzcGxpdCB2aWV3IGFuZCBmb3IgV2luZG93cyBQaG9uZSA4LiBUaGlzIHBhcnRpY3VsYXIgZml4XG4vLyBtdXN0IGJlIGFjY29tcGFuaWVkIGJ5IGEgc25pcHBldCBvZiBKYXZhU2NyaXB0IHRvIHNuaWZmIHRoZSB1c2VyIGFnZW50IGFuZFxuLy8gYXBwbHkgc29tZSBjb25kaXRpb25hbCBDU1MgdG8gKm9ubHkqIHRoZSBTdXJmYWNlL2Rlc2t0b3AgV2luZG93cyA4LiBMb29rIGF0XG4vLyBvdXIgR2V0dGluZyBTdGFydGVkIHBhZ2UgZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhpcyBidWcuXG4vL1xuLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgZm9sbG93aW5nOlxuLy9cbi8vIElzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzEwNDk3XG4vLyBEb2NzOiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9nZXR0aW5nLXN0YXJ0ZWQvI3N1cHBvcnQtaWUxMC13aWR0aFxuLy8gU291cmNlOiBodHRwOi8vdGlta2FkbGVjLmNvbS8yMDEzLzAxL3dpbmRvd3MtcGhvbmUtOC1hbmQtZGV2aWNlLXdpZHRoL1xuLy8gU291cmNlOiBodHRwOi8vdGlta2FkbGVjLmNvbS8yMDEyLzEwL2llMTAtc25hcC1tb2RlLWFuZC1yZXNwb25zaXZlLWRlc2lnbi9cblxuQGF0LXJvb3Qge1xuICBALW1zLXZpZXdwb3J0IHtcbiAgICB3aWR0aDogZGV2aWNlLXdpZHRoO1xuICB9XG59XG5cblxuLy8gVmlzaWJpbGl0eSB1dGlsaXRpZXNcbi8vIE5vdGU6IERlcHJlY2F0ZWQgLnZpc2libGUteHMsIC52aXNpYmxlLXNtLCAudmlzaWJsZS1tZCwgYW5kIC52aXNpYmxlLWxnIGFzIG9mIHYzLjIuMFxuXG5AaW5jbHVkZSByZXNwb25zaXZlLWludmlzaWJpbGl0eSgnLnZpc2libGUteHMnKTtcbkBpbmNsdWRlIHJlc3BvbnNpdmUtaW52aXNpYmlsaXR5KCcudmlzaWJsZS1zbScpO1xuQGluY2x1ZGUgcmVzcG9uc2l2ZS1pbnZpc2liaWxpdHkoJy52aXNpYmxlLW1kJyk7XG5AaW5jbHVkZSByZXNwb25zaXZlLWludmlzaWJpbGl0eSgnLnZpc2libGUtbGcnKTtcblxuLnZpc2libGUteHMtYmxvY2ssXG4udmlzaWJsZS14cy1pbmxpbmUsXG4udmlzaWJsZS14cy1pbmxpbmUtYmxvY2ssXG4udmlzaWJsZS1zbS1ibG9jayxcbi52aXNpYmxlLXNtLWlubGluZSxcbi52aXNpYmxlLXNtLWlubGluZS1ibG9jayxcbi52aXNpYmxlLW1kLWJsb2NrLFxuLnZpc2libGUtbWQtaW5saW5lLFxuLnZpc2libGUtbWQtaW5saW5lLWJsb2NrLFxuLnZpc2libGUtbGctYmxvY2ssXG4udmlzaWJsZS1sZy1pbmxpbmUsXG4udmlzaWJsZS1sZy1pbmxpbmUtYmxvY2sge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAkc2NyZWVuLXhzLW1heCkge1xuICBAaW5jbHVkZSByZXNwb25zaXZlLXZpc2liaWxpdHkoJy52aXNpYmxlLXhzJyk7XG59XG4udmlzaWJsZS14cy1ibG9jayB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAkc2NyZWVuLXhzLW1heCkge1xuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi52aXNpYmxlLXhzLWlubGluZSB7XG4gIEBtZWRpYSAobWF4LXdpZHRoOiAkc2NyZWVuLXhzLW1heCkge1xuICAgIGRpc3BsYXk6IGlubGluZSAhaW1wb3J0YW50O1xuICB9XG59XG4udmlzaWJsZS14cy1pbmxpbmUtYmxvY2sge1xuICBAbWVkaWEgKG1heC13aWR0aDogJHNjcmVlbi14cy1tYXgpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcbiAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1zbS1taW4pIGFuZCAobWF4LXdpZHRoOiAkc2NyZWVuLXNtLW1heCkge1xuICBAaW5jbHVkZSByZXNwb25zaXZlLXZpc2liaWxpdHkoJy52aXNpYmxlLXNtJyk7XG59XG4udmlzaWJsZS1zbS1ibG9jayB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikgYW5kIChtYXgtd2lkdGg6ICRzY3JlZW4tc20tbWF4KSB7XG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgfVxufVxuLnZpc2libGUtc20taW5saW5lIHtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSBhbmQgKG1heC13aWR0aDogJHNjcmVlbi1zbS1tYXgpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcbiAgfVxufVxuLnZpc2libGUtc20taW5saW5lLWJsb2NrIHtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tc20tbWluKSBhbmQgKG1heC13aWR0aDogJHNjcmVlbi1zbS1tYXgpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcbiAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1tZC1taW4pIGFuZCAobWF4LXdpZHRoOiAkc2NyZWVuLW1kLW1heCkge1xuICBAaW5jbHVkZSByZXNwb25zaXZlLXZpc2liaWxpdHkoJy52aXNpYmxlLW1kJyk7XG59XG4udmlzaWJsZS1tZC1ibG9jayB7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLW1kLW1pbikgYW5kIChtYXgtd2lkdGg6ICRzY3JlZW4tbWQtbWF4KSB7XG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgfVxufVxuLnZpc2libGUtbWQtaW5saW5lIHtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tbWQtbWluKSBhbmQgKG1heC13aWR0aDogJHNjcmVlbi1tZC1tYXgpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcbiAgfVxufVxuLnZpc2libGUtbWQtaW5saW5lLWJsb2NrIHtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tbWQtbWluKSBhbmQgKG1heC13aWR0aDogJHNjcmVlbi1tZC1tYXgpIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcbiAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1sZy1taW4pIHtcbiAgQGluY2x1ZGUgcmVzcG9uc2l2ZS12aXNpYmlsaXR5KCcudmlzaWJsZS1sZycpO1xufVxuLnZpc2libGUtbGctYmxvY2sge1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1sZy1taW4pIHtcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICB9XG59XG4udmlzaWJsZS1sZy1pbmxpbmUge1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHNjcmVlbi1sZy1taW4pIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcbiAgfVxufVxuLnZpc2libGUtbGctaW5saW5lLWJsb2NrIHtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICRzY3JlZW4tbGctbWluKSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6ICRzY3JlZW4teHMtbWF4KSB7XG4gIEBpbmNsdWRlIHJlc3BvbnNpdmUtaW52aXNpYmlsaXR5KCcuaGlkZGVuLXhzJyk7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLXNtLW1pbikgYW5kIChtYXgtd2lkdGg6ICRzY3JlZW4tc20tbWF4KSB7XG4gIEBpbmNsdWRlIHJlc3BvbnNpdmUtaW52aXNpYmlsaXR5KCcuaGlkZGVuLXNtJyk7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLW1kLW1pbikgYW5kIChtYXgtd2lkdGg6ICRzY3JlZW4tbWQtbWF4KSB7XG4gIEBpbmNsdWRlIHJlc3BvbnNpdmUtaW52aXNpYmlsaXR5KCcuaGlkZGVuLW1kJyk7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAkc2NyZWVuLWxnLW1pbikge1xuICBAaW5jbHVkZSByZXNwb25zaXZlLWludmlzaWJpbGl0eSgnLmhpZGRlbi1sZycpO1xufVxuXG5cbi8vIFByaW50IHV0aWxpdGllc1xuLy9cbi8vIE1lZGlhIHF1ZXJpZXMgYXJlIHBsYWNlZCBvbiB0aGUgaW5zaWRlIHRvIGJlIG1peGluLWZyaWVuZGx5LlxuXG4vLyBOb3RlOiBEZXByZWNhdGVkIC52aXNpYmxlLXByaW50IGFzIG9mIHYzLjIuMFxuXG5AaW5jbHVkZSByZXNwb25zaXZlLWludmlzaWJpbGl0eSgnLnZpc2libGUtcHJpbnQnKTtcblxuQG1lZGlhIHByaW50IHtcbiAgQGluY2x1ZGUgcmVzcG9uc2l2ZS12aXNpYmlsaXR5KCcudmlzaWJsZS1wcmludCcpO1xufVxuLnZpc2libGUtcHJpbnQtYmxvY2sge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgQG1lZGlhIHByaW50IHtcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICB9XG59XG4udmlzaWJsZS1wcmludC1pbmxpbmUge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgQG1lZGlhIHByaW50IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcbiAgfVxufVxuLnZpc2libGUtcHJpbnQtaW5saW5lLWJsb2NrIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXG4gIEBtZWRpYSBwcmludCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuQG1lZGlhIHByaW50IHtcbiAgQGluY2x1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QUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFNBQVMsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsRUFBRSxBQUFBLFVBQVUsQ0FBMWhCO0VBQ0UsUUFBUSxFQUFFLFFBQVM7RUFFbkIsVUFBVSxFQUFFLEdBQUk7RUFFaEIsWUFBWSxFQUFHLElBQUk7RUFDbkIsYUFBYSxFQUFFLElBQUssR0FDckI7O0FBU0QsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxTQUFTLEVBQUUsQUFBQSxVQUFVLEVBQUUsQUFBQSxVQUFVLEVBQUUsQUFBQSxVQUFVLENBQXJJO0VBQ0UsS0FBSyxFQUFFLElBQUssR0FDYjs7QUFNQyxBQUFBLFNBQVMsQ0FBVDtFQUNFLEtBQUssRUFBRSxRQUFVLEdBQ2xCOztBQUZELEFBQUEsU0FBUyxDQUFUO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxTQUFTLENBQVQ7RUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjs7QUFGRCxBQUFBLFNBQVMsQ0FBVDtFQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCOztBQUZELEFBQUEsU0FBUyxDQUFUO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxTQUFTLENBQVQ7RUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjs7QUFGRCxBQUFBLFNBQVMsQ0FBVDtFQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCOztBQUZELEFBQUEsU0FBUyxDQUFUO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxTQUFTLENBQVQ7RUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjs7QUFGRCxBQUFBLFVBQVUsQ0FBVjtFQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCOztBQUZELEFBQUEsVUFBVSxDQUFWO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxVQUFVLENBQVY7RUFDRSxLQUFLLEVBQUUsSUFBVSxHQUNsQjs7QUFrQkQsQUFBQSxjQUFjLENBQWQ7RUFDRSxLQUFLLEVBQUUsSUFBSyxHQUNiOztBQVBELEFBQUEsY0FBYyxDQUFkO0VBQ0UsS0FBSyxFQUFFLFFBQVUsR0FDbEI7O0FBRkQsQUFBQSxjQUFjLENBQWQ7RUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjs7QUFGRCxBQUFBLGNBQWMsQ0FBZDtFQUNFLEtBQUssRUFBRSxHQUFVLEdBQ2xCOztBQUZELEFBQUEsY0FBYyxDQUFkO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxjQUFjLENBQWQ7RUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjs7QUFGRCxBQUFBLGNBQWMsQ0FBZDtFQUNFLEtBQUssRUFBRSxHQUFVLEdBQ2xCOztBQUZELEFBQUEsY0FBYyxDQUFkO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxjQUFjLENBQWQ7RUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjs7QUFGRCxBQUFBLGNBQWMsQ0FBZDtFQUNFLEtBQUssRUFBRSxHQUFVLEdBQ2xCOztBQUZELEFBQUEsZUFBZSxDQUFmO0VBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7O0FBRkQsQUFBQSxlQUFlLENBQWY7RUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjs7QUFGRCxBQUFB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LEVBQUUsR0FBVSxHQUNsQjtFQUZELEFBQUEsU0FBUyxDQUFUO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLFNBQVMsQ0FBVDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxTQUFTLENBQVQ7SUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjtFQUZELEFBQUEsVUFBVSxDQUFWO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLFVBQVUsQ0FBVjtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxVQUFVLENBQVY7SUFDRSxLQUFLLEVBQUUsSUFBVSxHQUNsQjtFQWtCRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxJQUFLLEdBQ2I7RUFQRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxRQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLEdBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLEdBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLEdBQVUsR0FDbEI7RUFGRCxBQUFBLGVBQWUsQ0FBZjtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxlQUFlLENBQWY7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsZUFBZSxDQUFmO0lBQ0UsS0FBSyxFQUFFLElBQVUsR0FDbEI7RUFQRCxBQUFB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LFNBQVMsQ0FBVDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxTQUFTLENBQVQ7SUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjtFQUZELEFBQUEsVUFBVSxDQUFWO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLFVBQVUsQ0FBVjtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxVQUFVLENBQVY7SUFDRSxLQUFLLEVBQUUsSUFBVSxHQUNsQjtFQWtCRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxJQUFLLEdBQ2I7RUFQRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxRQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLEdBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLEdBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLEdBQVUsR0FDbEI7RUFGRCxBQUFBLGVBQWUsQ0FBZjtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxlQUFlLENBQWY7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsZUFBZSxDQUFmO0lBQ0UsS0FBSyxFQUFFLElBQVUsR0FDbEI7RUFQRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLElBQUksRUFBRSxJQUFLLEdBQ1o7RUFQRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLElBQUksRUFBRSxR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RSxHQUFVLEdBQ2xCO0VBRkQsQUFBQSxVQUFVLENBQVY7SUFDRSxLQUFLLEVBQUUsU0FBVSxHQUNsQjtFQUZELEFBQUEsVUFBVSxDQUFWO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLFVBQVUsQ0FBVjtJQUNFLEtBQUssRUFBRSxJQUFVLEdBQ2xCO0VBa0JELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLElBQUssR0FDYjtFQVBELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLFFBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjtFQUZELEFBQUEsY0FBYyxDQUFkO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxjQUFjLENBQWQ7SUFDRSxLQUFLLEVBQUUsR0FBVSxHQUNsQjtFQUZELEFBQUEsZUFBZSxDQUFmO0lBQ0UsS0FBSyxFQUFFLFNBQVUsR0FDbEI7RUFGRCxBQUFBLGVBQWUsQ0FBZjtJQUNFLEtBQUssRUFBRSxTQUFVLEdBQ2xCO0VBRkQsQUFBQSxlQUFlLENBQWY7SUFDRSxLQUFLLEVBQUUsSUFBVSxHQUNsQjtFQVBELEFBQUEsY0FBYyxDQUFkO0lBQ0UsSUFBSSxFQUFFLElBQUssR0FDWjtFQVBELEFBQUEsY0FBYyxDQUFkO0lBQ0UsSUFBSSxFQUFFLFFBQVUsR0FDakI7RUFGRCxBQUFBLGNBQWMsQ0FBZDtJQUNFLElBQUksRUFBRSxTQUFVLEdBQ2pCO0VBRkQsQUFBQSxjQUFj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 */", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

	}.call(window));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f4769f9bdb7466be65088239c12046d1.eot";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "448c34a56d699c29117adc64c43affeb.woff2";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fa2772327f55d8198301fdb8bcfc8158.woff";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e18bbf611f2a2e43afc071aa2f4e1512.ttf";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "89889688147bd7575d6327160d64e760.svg";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__ (13);
	__webpack_require__ (14);
	__webpack_require__ (15);
	__webpack_require__ (16);
	__webpack_require__ (17);
	__webpack_require__ (18);
	__webpack_require__ (19);
	__webpack_require__ (20);
	__webpack_require__ (21);
	__webpack_require__ (22);
	__webpack_require__ (23);
	__webpack_require__ (24);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: transition.js v3.3.6
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================

	  function transitionEnd() {
	    var el = document.createElement('bootstrap')

	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    }

	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }

	    return false // explicit for ie8 (  ._.)
	  }

	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false
	    var $el = this
	    $(this).one('bsTransitionEnd', function () { called = true })
	    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	    setTimeout(callback, duration)
	    return this
	  }

	  $(function () {
	    $.support.transition = transitionEnd()

	    if (!$.support.transition) return

	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function (e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	      }
	    }
	  })

	}(jQuery);

	}.call(window));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: alert.js v3.3.6
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // ALERT CLASS DEFINITION
	  // ======================

	  var dismiss = '[data-dismiss="alert"]'
	  var Alert   = function (el) {
	    $(el).on('click', dismiss, this.close)
	  }

	  Alert.VERSION = '3.3.6'

	  Alert.TRANSITION_DURATION = 150

	  Alert.prototype.close = function (e) {
	    var $this    = $(this)
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = $(selector)

	    if (e) e.preventDefault()

	    if (!$parent.length) {
	      $parent = $this.closest('.alert')
	    }

	    $parent.trigger(e = $.Event('close.bs.alert'))

	    if (e.isDefaultPrevented()) return

	    $parent.removeClass('in')

	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove()
	    }

	    $.support.transition && $parent.hasClass('fade') ?
	      $parent
	        .one('bsTransitionEnd', removeElement)
	        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
	      removeElement()
	  }


	  // ALERT PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.alert')

	      if (!data) $this.data('bs.alert', (data = new Alert(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.alert

	  $.fn.alert             = Plugin
	  $.fn.alert.Constructor = Alert


	  // ALERT NO CONFLICT
	  // =================

	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old
	    return this
	  }


	  // ALERT DATA-API
	  // ==============

	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

	}(jQuery);

	}.call(window));

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: button.js v3.3.6
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================

	  var Button = function (element, options) {
	    this.$element  = $(element)
	    this.options   = $.extend({}, Button.DEFAULTS, options)
	    this.isLoading = false
	  }

	  Button.VERSION  = '3.3.6'

	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  }

	  Button.prototype.setState = function (state) {
	    var d    = 'disabled'
	    var $el  = this.$element
	    var val  = $el.is('input') ? 'val' : 'html'
	    var data = $el.data()

	    state += 'Text'

	    if (data.resetText == null) $el.data('resetText', $el[val]())

	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state])

	      if (state == 'loadingText') {
	        this.isLoading = true
	        $el.addClass(d).attr(d, d)
	      } else if (this.isLoading) {
	        this.isLoading = false
	        $el.removeClass(d).removeAttr(d)
	      }
	    }, this), 0)
	  }

	  Button.prototype.toggle = function () {
	    var changed = true
	    var $parent = this.$element.closest('[data-toggle="buttons"]')

	    if ($parent.length) {
	      var $input = this.$element.find('input')
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked')) changed = false
	        $parent.find('.active').removeClass('active')
	        this.$element.addClass('active')
	      } else if ($input.prop('type') == 'checkbox') {
	        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
	        this.$element.toggleClass('active')
	      }
	      $input.prop('checked', this.$element.hasClass('active'))
	      if (changed) $input.trigger('change')
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
	      this.$element.toggleClass('active')
	    }
	  }


	  // BUTTON PLUGIN DEFINITION
	  // ========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.button')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.button', (data = new Button(this, options)))

	      if (option == 'toggle') data.toggle()
	      else if (option) data.setState(option)
	    })
	  }

	  var old = $.fn.button

	  $.fn.button             = Plugin
	  $.fn.button.Constructor = Button


	  // BUTTON NO CONFLICT
	  // ==================

	  $.fn.button.noConflict = function () {
	    $.fn.button = old
	    return this
	  }


	  // BUTTON DATA-API
	  // ===============

	  $(document)
	    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      var $btn = $(e.target)
	      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
	      Plugin.call($btn, 'toggle')
	      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
	    })
	    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	    })

	}(jQuery);

	}.call(window));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: carousel.js v3.3.6
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CAROUSEL CLASS DEFINITION
	  // =========================

	  var Carousel = function (element, options) {
	    this.$element    = $(element)
	    this.$indicators = this.$element.find('.carousel-indicators')
	    this.options     = options
	    this.paused      = null
	    this.sliding     = null
	    this.interval    = null
	    this.$active     = null
	    this.$items      = null

	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
	      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
	      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	  }

	  Carousel.VERSION  = '3.3.6'

	  Carousel.TRANSITION_DURATION = 600

	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  }

	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return
	    switch (e.which) {
	      case 37: this.prev(); break
	      case 39: this.next(); break
	      default: return
	    }

	    e.preventDefault()
	  }

	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false)

	    this.interval && clearInterval(this.interval)

	    this.options.interval
	      && !this.paused
	      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

	    return this
	  }

	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item')
	    return this.$items.index(item || this.$active)
	  }

	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active)
	    var willWrap = (direction == 'prev' && activeIndex === 0)
	                || (direction == 'next' && activeIndex == (this.$items.length - 1))
	    if (willWrap && !this.options.wrap) return active
	    var delta = direction == 'prev' ? -1 : 1
	    var itemIndex = (activeIndex + delta) % this.$items.length
	    return this.$items.eq(itemIndex)
	  }

	  Carousel.prototype.to = function (pos) {
	    var that        = this
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

	    if (pos > (this.$items.length - 1) || pos < 0) return

	    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle()

	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	  }

	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true)

	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end)
	      this.cycle(true)
	    }

	    this.interval = clearInterval(this.interval)

	    return this
	  }

	  Carousel.prototype.next = function () {
	    if (this.sliding) return
	    return this.slide('next')
	  }

	  Carousel.prototype.prev = function () {
	    if (this.sliding) return
	    return this.slide('prev')
	  }

	  Carousel.prototype.slide = function (type, next) {
	    var $active   = this.$element.find('.item.active')
	    var $next     = next || this.getItemForDirection(type, $active)
	    var isCycling = this.interval
	    var direction = type == 'next' ? 'left' : 'right'
	    var that      = this

	    if ($next.hasClass('active')) return (this.sliding = false)

	    var relatedTarget = $next[0]
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    })
	    this.$element.trigger(slideEvent)
	    if (slideEvent.isDefaultPrevented()) return

	    this.sliding = true

	    isCycling && this.pause()

	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active')
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
	      $nextIndicator && $nextIndicator.addClass('active')
	    }

	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type)
	      $next[0].offsetWidth // force reflow
	      $active.addClass(direction)
	      $next.addClass(direction)
	      $active
	        .one('bsTransitionEnd', function () {
	          $next.removeClass([type, direction].join(' ')).addClass('active')
	          $active.removeClass(['active', direction].join(' '))
	          that.sliding = false
	          setTimeout(function () {
	            that.$element.trigger(slidEvent)
	          }, 0)
	        })
	        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
	    } else {
	      $active.removeClass('active')
	      $next.addClass('active')
	      this.sliding = false
	      this.$element.trigger(slidEvent)
	    }

	    isCycling && this.cycle()

	    return this
	  }


	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.carousel')
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var action  = typeof option == 'string' ? option : options.slide

	      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
	      if (typeof option == 'number') data.to(option)
	      else if (action) data[action]()
	      else if (options.interval) data.pause().cycle()
	    })
	  }

	  var old = $.fn.carousel

	  $.fn.carousel             = Plugin
	  $.fn.carousel.Constructor = Carousel


	  // CAROUSEL NO CONFLICT
	  // ====================

	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old
	    return this
	  }


	  // CAROUSEL DATA-API
	  // =================

	  var clickHandler = function (e) {
	    var href
	    var $this   = $(this)
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
	    if (!$target.hasClass('carousel')) return
	    var options = $.extend({}, $target.data(), $this.data())
	    var slideIndex = $this.attr('data-slide-to')
	    if (slideIndex) options.interval = false

	    Plugin.call($target, options)

	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex)
	    }

	    e.preventDefault()
	  }

	  $(document)
	    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
	    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this)
	      Plugin.call($carousel, $carousel.data())
	    })
	  })

	}(jQuery);

	}.call(window));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: collapse.js v3.3.6
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================

	  var Collapse = function (element, options) {
	    this.$element      = $(element)
	    this.options       = $.extend({}, Collapse.DEFAULTS, options)
	    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	    this.transitioning = null

	    if (this.options.parent) {
	      this.$parent = this.getParent()
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	    }

	    if (this.options.toggle) this.toggle()
	  }

	  Collapse.VERSION  = '3.3.6'

	  Collapse.TRANSITION_DURATION = 350

	  Collapse.DEFAULTS = {
	    toggle: true
	  }

	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width')
	    return hasWidth ? 'width' : 'height'
	  }

	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return

	    var activesData
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse')
	      if (activesData && activesData.transitioning) return
	    }

	    var startEvent = $.Event('show.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide')
	      activesData || actives.data('bs.collapse', null)
	    }

	    var dimension = this.dimension()

	    this.$element
	      .removeClass('collapse')
	      .addClass('collapsing')[dimension](0)
	      .attr('aria-expanded', true)

	    this.$trigger
	      .removeClass('collapsed')
	      .attr('aria-expanded', true)

	    this.transitioning = 1

	    var complete = function () {
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse in')[dimension]('')
	      this.transitioning = 0
	      this.$element
	        .trigger('shown.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

	    this.$element
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	  }

	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return

	    var startEvent = $.Event('hide.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    var dimension = this.dimension()

	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

	    this.$element
	      .addClass('collapsing')
	      .removeClass('collapse in')
	      .attr('aria-expanded', false)

	    this.$trigger
	      .addClass('collapsed')
	      .attr('aria-expanded', false)

	    this.transitioning = 1

	    var complete = function () {
	      this.transitioning = 0
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse')
	        .trigger('hidden.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    this.$element
	      [dimension](0)
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	  }

	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']()
	  }

	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent)
	      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
	      .each($.proxy(function (i, element) {
	        var $element = $(element)
	        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
	      }, this))
	      .end()
	  }

	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in')

	    $element.attr('aria-expanded', isOpen)
	    $trigger
	      .toggleClass('collapsed', !isOpen)
	      .attr('aria-expanded', isOpen)
	  }

	  function getTargetFromTrigger($trigger) {
	    var href
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

	    return $(target)
	  }


	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.collapse')
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
	      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.collapse

	  $.fn.collapse             = Plugin
	  $.fn.collapse.Constructor = Collapse


	  // COLLAPSE NO CONFLICT
	  // ====================

	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old
	    return this
	  }


	  // COLLAPSE DATA-API
	  // =================

	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this   = $(this)

	    if (!$this.attr('data-target')) e.preventDefault()

	    var $target = getTargetFromTrigger($this)
	    var data    = $target.data('bs.collapse')
	    var option  = data ? 'toggle' : $this.data()

	    Plugin.call($target, option)
	  })

	}(jQuery);

	}.call(window));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.6
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // DROPDOWN CLASS DEFINITION
	  // =========================

	  var backdrop = '.dropdown-backdrop'
	  var toggle   = '[data-toggle="dropdown"]'
	  var Dropdown = function (element) {
	    $(element).on('click.bs.dropdown', this.toggle)
	  }

	  Dropdown.VERSION = '3.3.6'

	  function getParent($this) {
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = selector && $(selector)

	    return $parent && $parent.length ? $parent : $this.parent()
	  }

	  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(backdrop).remove()
	    $(toggle).each(function () {
	      var $this         = $(this)
	      var $parent       = getParent($this)
	      var relatedTarget = { relatedTarget: this }

	      if (!$parent.hasClass('open')) return

	      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this.attr('aria-expanded', 'false')
	      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
	    })
	  }

	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this)

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    clearMenus()

	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $(document.createElement('div'))
	          .addClass('dropdown-backdrop')
	          .insertAfter($(this))
	          .on('click', clearMenus)
	      }

	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')

	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))
	    }

	    return false
	  }

	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

	    var $this = $(this)

	    e.preventDefault()
	    e.stopPropagation()

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    if (!isActive && e.which != 27 || isActive && e.which == 27) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus')
	      return $this.trigger('click')
	    }

	    var desc = ' li:not(.disabled):visible a'
	    var $items = $parent.find('.dropdown-menu' + desc)

	    if (!$items.length) return

	    var index = $items.index(e.target)

	    if (e.which == 38 && index > 0)                 index--         // up
	    if (e.which == 40 && index < $items.length - 1) index++         // down
	    if (!~index)                                    index = 0

	    $items.eq(index).trigger('focus')
	  }


	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.dropdown')

	      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.dropdown

	  $.fn.dropdown             = Plugin
	  $.fn.dropdown.Constructor = Dropdown


	  // DROPDOWN NO CONFLICT
	  // ====================

	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old
	    return this
	  }


	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================

	  $(document)
	    .on('click.bs.dropdown.data-api', clearMenus)
	    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

	}(jQuery);

	}.call(window));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.6
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // MODAL CLASS DEFINITION
	  // ======================

	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false

	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }

	  Modal.VERSION  = '3.3.6'

	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150

	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }

	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }

	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

	    this.$element.trigger(e)

	    if (this.isShown || e.isDefaultPrevented()) return

	    this.isShown = true

	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')

	    this.escape()
	    this.resize()

	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })

	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')

	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }

	      that.$element
	        .show()
	        .scrollTop(0)

	      that.adjustDialog()

	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }

	      that.$element.addClass('in')

	      that.enforceFocus()

	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }

	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()

	    e = $.Event('hide.bs.modal')

	    this.$element.trigger(e)

	    if (!this.isShown || e.isDefaultPrevented()) return

	    this.isShown = false

	    this.escape()
	    this.resize()

	    $(document).off('focusin.bs.modal')

	    this.$element
	      .removeClass('in')
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')

	    this.$dialog.off('mousedown.dismiss.bs.modal')

	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }

	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }

	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }

	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }

	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }

	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }

	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''

	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate

	      this.$backdrop = $(document.createElement('div'))
	        .addClass('modal-backdrop ' + animate)
	        .appendTo(this.$body)

	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))

	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	      this.$backdrop.addClass('in')

	      if (!callback) return

	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()

	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')

	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()

	    } else if (callback) {
	      callback()
	    }
	  }

	  // these following methods are used to handle overflowing modals

	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }

	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    })
	  }

	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    })
	  }

	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }

	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }

	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }

	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }


	  // MODAL PLUGIN DEFINITION
	  // =======================

	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }

	  var old = $.fn.modal

	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal


	  // MODAL NO CONFLICT
	  // =================

	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }


	  // MODAL DATA-API
	  // ==============

	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	    if ($this.is('a')) e.preventDefault()

	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })

	}(jQuery);

	}.call(window));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.6
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================

	  var Tooltip = function (element, options) {
	    this.type       = null
	    this.options    = null
	    this.enabled    = null
	    this.timeout    = null
	    this.hoverState = null
	    this.$element   = null
	    this.inState    = null

	    this.init('tooltip', element, options)
	  }

	  Tooltip.VERSION  = '3.3.6'

	  Tooltip.TRANSITION_DURATION = 150

	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }

	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
	    this.inState   = { click: false, hover: false, focus: false }

	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
	    }

	    var triggers = this.options.trigger.split(' ')

	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]

	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }

	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }

	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }

	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }

	    return options
	  }

	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()

	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })

	    return options
	  }

	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
	    }

	    if (self.tip().hasClass('in') || self.hoverState == 'in') {
	      self.hoverState = 'in'
	      return
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'in'

	    if (!self.options.delay || !self.options.delay.show) return self.show()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }

	  Tooltip.prototype.isInStateTrue = function () {
	    for (var key in this.inState) {
	      if (this.inState[key]) return true
	    }

	    return false
	  }

	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
	    }

	    if (self.isInStateTrue()) return

	    clearTimeout(self.timeout)

	    self.hoverState = 'out'

	    if (!self.options.delay || !self.options.delay.hide) return self.hide()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }

	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)

	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)

	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this

	      var $tip = this.tip()

	      var tipId = this.getUID(this.type)

	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)

	      if (this.options.animation) $tip.addClass('fade')

	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement

	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)

	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
	      this.$element.trigger('inserted.bs.' + this.type)

	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight

	      if (autoPlace) {
	        var orgPlacement = placement
	        var viewportDim = this.getPosition(this.$viewport)

	        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
	                    placement

	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }

	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

	      this.applyPlacement(calculatedOffset, placement)

	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null

	        if (prevHoverState == 'out') that.leave(that)
	      }

	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }

	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight

	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)

	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0

	    offset.top  += marginTop
	    offset.left += marginLeft

	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)

	    $tip.addClass('in')

	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight

	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }

	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top

	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }

	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow()
	      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isVertical ? 'top' : 'left', '')
	  }

	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()

	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }

	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = $(this.$tip)
	    var e    = $.Event('hide.bs.' + this.type)

	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      that.$element
	        .removeAttr('aria-describedby')
	        .trigger('hidden.bs.' + that.type)
	      callback && callback()
	    }

	    this.$element.trigger(e)

	    if (e.isDefaultPrevented()) return

	    $tip.removeClass('in')

	    $.support.transition && $tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()

	    this.hoverState = null

	    return this
	  }

	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }

	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }

	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element

	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'

	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }

	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

	  }

	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta

	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)

	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }

	    return delta
	  }

	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options

	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

	    return title
	  }

	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }

	  Tooltip.prototype.tip = function () {
	    if (!this.$tip) {
	      this.$tip = $(this.options.template)
	      if (this.$tip.length != 1) {
	        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
	      }
	    }
	    return this.$tip
	  }

	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }

	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }

	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }

	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }

	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }

	    if (e) {
	      self.inState.click = !self.inState.click
	      if (self.isInStateTrue()) self.enter(self)
	      else self.leave(self)
	    } else {
	      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	    }
	  }

	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	      if (that.$tip) {
	        that.$tip.detach()
	      }
	      that.$tip = null
	      that.$arrow = null
	      that.$viewport = null
	    })
	  }


	  // TOOLTIP PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.tooltip')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tooltip

	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip


	  // TOOLTIP NO CONFLICT
	  // ===================

	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }

	}(jQuery);

	}.call(window));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: popover.js v3.3.6
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================

	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }

	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

	  Popover.VERSION  = '3.3.6'

	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })


	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================

	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

	  Popover.prototype.constructor = Popover

	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }

	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()

	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)

	    $tip.removeClass('fade top bottom left right in')

	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }

	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }

	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options

	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }

	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }


	  // POPOVER PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.popover')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.popover

	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover


	  // POPOVER NO CONFLICT
	  // ===================

	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }

	}(jQuery);

	}.call(window));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.6
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // SCROLLSPY CLASS DEFINITION
	  // ==========================

	  function ScrollSpy(element, options) {
	    this.$body          = $(document.body)
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target || '') + ' .nav li > a'
	    this.offsets        = []
	    this.targets        = []
	    this.activeTarget   = null
	    this.scrollHeight   = 0

	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
	    this.refresh()
	    this.process()
	  }

	  ScrollSpy.VERSION  = '3.3.6'

	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }

	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	  }

	  ScrollSpy.prototype.refresh = function () {
	    var that          = this
	    var offsetMethod  = 'offset'
	    var offsetBase    = 0

	    this.offsets      = []
	    this.targets      = []
	    this.scrollHeight = this.getScrollHeight()

	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position'
	      offsetBase   = this.$scrollElement.scrollTop()
	    }

	    this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)

	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        that.offsets.push(this[0])
	        that.targets.push(this[1])
	      })
	  }

	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.getScrollHeight()
	    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i

	    if (this.scrollHeight != scrollHeight) {
	      this.refresh()
	    }

	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
	    }

	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null
	      return this.clear()
	    }

	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i])
	    }
	  }

	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target

	    this.clear()

	    var selector = this.selector +
	      '[data-target="' + target + '"],' +
	      this.selector + '[href="' + target + '"]'

	    var active = $(selector)
	      .parents('li')
	      .addClass('active')

	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }

	    active.trigger('activate.bs.scrollspy')
	  }

	  ScrollSpy.prototype.clear = function () {
	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')
	  }


	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.scrollspy

	  $.fn.scrollspy             = Plugin
	  $.fn.scrollspy.Constructor = ScrollSpy


	  // SCROLLSPY NO CONFLICT
	  // =====================

	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }


	  // SCROLLSPY DATA-API
	  // ==================

	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      Plugin.call($spy, $spy.data())
	    })
	  })

	}(jQuery);

	}.call(window));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: tab.js v3.3.6
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TAB CLASS DEFINITION
	  // ====================

	  var Tab = function (element) {
	    // jscs:disable requireDollarBeforejQueryAssignment
	    this.element = $(element)
	    // jscs:enable requireDollarBeforejQueryAssignment
	  }

	  Tab.VERSION = '3.3.6'

	  Tab.TRANSITION_DURATION = 150

	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    if ($this.parent('li').hasClass('active')) return

	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })

	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)

	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

	    var $target = $(selector)

	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }

	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)

	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)

	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }

	      if (element.parent('.dropdown-menu').length) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }

	      callback && callback()
	    }

	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()

	    $active.removeClass('in')
	  }


	  // TAB PLUGIN DEFINITION
	  // =====================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')

	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tab

	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab


	  // TAB NO CONFLICT
	  // ===============

	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }


	  // TAB DATA-API
	  // ============

	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }

	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

	}(jQuery);

	}.call(window));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/* ========================================================================
	 * Bootstrap: affix.js v3.3.6
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // AFFIX CLASS DEFINITION
	  // ======================

	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)

	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null

	    this.checkPosition()
	  }

	  Affix.VERSION  = '3.3.6'

	  Affix.RESET    = 'affix affix-top affix-bottom'

	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }

	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()

	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }

	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height

	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

	    return false
	  }

	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }

	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }

	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return

	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = Math.max($(document).height(), $(document.body).height())

	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')

	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')

	      this.$element.trigger(e)

	      if (e.isDefaultPrevented()) return

	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }

	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }


	  // AFFIX PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.affix

	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix


	  // AFFIX NO CONFLICT
	  // =================

	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }


	  // AFFIX DATA-API
	  // ==============

	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()

	      data.offset = data.offset || {}

	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

	      Plugin.call($spy, data)
	    })
	  })

	}(jQuery);

	}.call(window));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: red; }\n", ""]);

	// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	'use strict';

	module.exports = __webpack_require__(28);

	}.call(window));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	var _assign = __webpack_require__(30);

	var ReactChildren = __webpack_require__(31);
	var ReactComponent = __webpack_require__(42);
	var ReactClass = __webpack_require__(53);
	var ReactDOMFactories = __webpack_require__(58);
	var ReactElement = __webpack_require__(34);
	var ReactElementValidator = __webpack_require__(59);
	var ReactPropTypes = __webpack_require__(61);
	var ReactVersion = __webpack_require__(62);

	var onlyChild = __webpack_require__(63);
	var warning = __webpack_require__(36);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };

	}.call(window));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	}.call(window));

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(32);
	var ReactElement = __webpack_require__(34);

	var emptyFunction = __webpack_require__(37);
	var traverseAllChildren = __webpack_require__(39);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;
	}.call(window));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var invariant = __webpack_require__(33);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var _assign = __webpack_require__(30);

	var ReactCurrentOwner = __webpack_require__(35);

	var warning = __webpack_require__(36);
	var canDefineProperty = __webpack_require__(38);

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(
	      /* eslint-disable no-proto */
	      config.__proto__ == null || config.__proto__ === Object.prototype,
	      /* eslint-enable no-proto */
	      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
	      ref = !config.hasOwnProperty('ref') || Object.getOwnPropertyDescriptor(config, 'ref').get ? null : config.ref;
	      key = !config.hasOwnProperty('key') || Object.getOwnPropertyDescriptor(config, 'key').get ? null : '' + config.key;
	    } else {
	      ref = config.ref === undefined ? null : config.ref;
	      key = config.key === undefined ? null : '' + config.key;
	    }
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // Create dummy `key` and `ref` property to `props` to warn users
	    // against its use
	    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	      if (!props.hasOwnProperty('key')) {
	        Object.defineProperty(props, 'key', {
	          get: function () {
	            if (!specialPropKeyWarningShown) {
	              specialPropKeyWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	      if (!props.hasOwnProperty('ref')) {
	        Object.defineProperty(props, 'ref', {
	          get: function () {
	            if (!specialPropRefWarningShown) {
	              specialPropRefWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(
	      /* eslint-disable no-proto */
	      config.__proto__ == null || config.__proto__ === Object.prototype,
	      /* eslint-enable no-proto */
	      'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
	    }
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */

	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;
	}.call(window));

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(37);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  warning = function warning(condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;
	}.call(window));

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule canDefineProperty
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(35);
	var ReactElement = __webpack_require__(34);

	var getIteratorFn = __webpack_require__(40);
	var invariant = __webpack_require__(33);
	var KeyEscapeUtils = __webpack_require__(41);
	var warning = __webpack_require__(36);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;
	}.call(window));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule KeyEscapeUtils
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {*} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;
	}.call(window));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var ReactNoopUpdateQueue = __webpack_require__(43);
	var ReactInstrumentation = __webpack_require__(44);

	var canDefineProperty = __webpack_require__(38);
	var emptyObject = __webpack_require__(52);
	var invariant = __webpack_require__(33);
	var warning = __webpack_require__(36);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : void 0;
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onSetState();
	    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
	  }
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */

	'use strict';

	var warning = __webpack_require__(36);

	function warnTDZ(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnTDZ(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnTDZ(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnTDZ(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstrumentation
	 */

	'use strict';

	var ReactDebugTool = __webpack_require__(45);

	module.exports = { debugTool: ReactDebugTool };
	}.call(window));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDebugTool
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(46);

	var performanceNow = __webpack_require__(47);
	var warning = __webpack_require__(36);

	var eventHandlers = [];
	var handlerDoesThrowForEvent = {};

	function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
	  if (process.env.NODE_ENV !== 'production') {
	    eventHandlers.forEach(function (handler) {
	      try {
	        if (handler[handlerFunctionName]) {
	          handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
	        }
	      } catch (e) {
	        process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
	        handlerDoesThrowForEvent[handlerFunctionName] = true;
	      }
	    });
	  }
	}

	var isProfiling = false;
	var flushHistory = [];
	var currentFlushNesting = 0;
	var currentFlushMeasurements = null;
	var currentFlushStartTime = null;
	var currentTimerDebugID = null;
	var currentTimerStartTime = null;
	var currentTimerType = null;

	function clearHistory() {
	  ReactComponentTreeDevtool.purgeUnmountedComponents();
	  ReactNativeOperationHistoryDevtool.clearHistory();
	}

	function getTreeSnapshot(registeredIDs) {
	  return registeredIDs.reduce(function (tree, id) {
	    var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
	    var parentID = ReactComponentTreeDevtool.getParentID(id);
	    tree[id] = {
	      displayName: ReactComponentTreeDevtool.getDisplayName(id),
	      text: ReactComponentTreeDevtool.getText(id),
	      updateCount: ReactComponentTreeDevtool.getUpdateCount(id),
	      childIDs: ReactComponentTreeDevtool.getChildIDs(id),
	      // Text nodes don't have owners but this is close enough.
	      ownerID: ownerID || ReactComponentTreeDevtool.getOwnerID(parentID),
	      parentID: parentID
	    };
	    return tree;
	  }, {});
	}

	function resetMeasurements() {
	  if (process.env.NODE_ENV !== 'production') {
	    var previousStartTime = currentFlushStartTime;
	    var previousMeasurements = currentFlushMeasurements || [];
	    var previousOperations = ReactNativeOperationHistoryDevtool.getHistory();

	    if (!isProfiling || currentFlushNesting === 0) {
	      currentFlushStartTime = null;
	      currentFlushMeasurements = null;
	      clearHistory();
	      return;
	    }

	    if (previousMeasurements.length || previousOperations.length) {
	      var registeredIDs = ReactComponentTreeDevtool.getRegisteredIDs();
	      flushHistory.push({
	        duration: performanceNow() - previousStartTime,
	        measurements: previousMeasurements || [],
	        operations: previousOperations || [],
	        treeSnapshot: getTreeSnapshot(registeredIDs)
	      });
	    }

	    clearHistory();
	    currentFlushStartTime = performanceNow();
	    currentFlushMeasurements = [];
	  }
	}

	function checkDebugID(debugID) {
	  process.env.NODE_ENV !== 'production' ? warning(debugID, 'ReactDebugTool: debugID may not be empty.') : void 0;
	}

	var ReactDebugTool = {
	  addDevtool: function (devtool) {
	    eventHandlers.push(devtool);
	  },
	  removeDevtool: function (devtool) {
	    for (var i = 0; i < eventHandlers.length; i++) {
	      if (eventHandlers[i] === devtool) {
	        eventHandlers.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  beginProfiling: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling) {
	        return;
	      }

	      isProfiling = true;
	      flushHistory.length = 0;
	      resetMeasurements();
	    }
	  },
	  endProfiling: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!isProfiling) {
	        return;
	      }

	      isProfiling = false;
	      resetMeasurements();
	    }
	  },
	  getFlushHistory: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      return flushHistory;
	    }
	  },
	  onBeginFlush: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      currentFlushNesting++;
	      resetMeasurements();
	    }
	    emitEvent('onBeginFlush');
	  },
	  onEndFlush: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      resetMeasurements();
	      currentFlushNesting--;
	    }
	    emitEvent('onEndFlush');
	  },
	  onBeginLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling && currentFlushNesting > 0) {
	        process.env.NODE_ENV !== 'production' ? warning(!currentTimerType, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	        currentTimerStartTime = performanceNow();
	        currentTimerDebugID = debugID;
	        currentTimerType = timerType;
	      }
	    }
	  },
	  onEndLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling && currentFlushNesting > 0) {
	        process.env.NODE_ENV !== 'production' ? warning(currentTimerType === timerType, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	        currentFlushMeasurements.push({
	          timerType: timerType,
	          instanceID: debugID,
	          duration: performanceNow() - currentTimerStartTime
	        });
	        currentTimerStartTime = null;
	        currentTimerDebugID = null;
	        currentTimerType = null;
	      }
	    }
	    emitEvent('onEndLifeCycleTimer', debugID, timerType);
	  },
	  onBeginReconcilerTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginReconcilerTimer', debugID, timerType);
	  },
	  onEndReconcilerTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onEndReconcilerTimer', debugID, timerType);
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onNativeOperation: function (debugID, type, payload) {
	    checkDebugID(debugID);
	    emitEvent('onNativeOperation', debugID, type, payload);
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onSetDisplayName: function (debugID, displayName) {
	    checkDebugID(debugID);
	    emitEvent('onSetDisplayName', debugID, displayName);
	  },
	  onSetChildren: function (debugID, childDebugIDs) {
	    checkDebugID(debugID);
	    emitEvent('onSetChildren', debugID, childDebugIDs);
	  },
	  onSetOwner: function (debugID, ownerDebugID) {
	    checkDebugID(debugID);
	    emitEvent('onSetOwner', debugID, ownerDebugID);
	  },
	  onSetText: function (debugID, text) {
	    checkDebugID(debugID);
	    emitEvent('onSetText', debugID, text);
	  },
	  onMountRootComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onMountRootComponent', debugID);
	  },
	  onMountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onMountComponent', debugID);
	  },
	  onUpdateComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onUpdateComponent', debugID);
	  },
	  onUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onUnmountComponent', debugID);
	  }
	};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactInvalidSetStateWarningDevTool = __webpack_require__(49);
	  var ReactNativeOperationHistoryDevtool = __webpack_require__(50);
	  var ReactComponentTreeDevtool = __webpack_require__(51);
	  ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
	  ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
	  ReactDebugTool.addDevtool(ReactNativeOperationHistoryDevtool);
	  var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
	  if (/[?&]react_perf\b/.test(url)) {
	    ReactDebugTool.beginProfiling();
	  }
	}

	module.exports = ReactDebugTool;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;
	}.call(window));

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var performance = __webpack_require__(48);

	var performanceNow;

	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (performance.now) {
	  performanceNow = function performanceNow() {
	    return performance.now();
	  };
	} else {
	  performanceNow = function performanceNow() {
	    return Date.now();
	  };
	}

	module.exports = performanceNow;
	}.call(window));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(46);

	var performance;

	if (ExecutionEnvironment.canUseDOM) {
	  performance = window.performance || window.msPerformance || window.webkitPerformance;
	}

	module.exports = performance || {};
	}.call(window));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInvalidSetStateWarningDevTool
	 */

	'use strict';

	var warning = __webpack_require__(36);

	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;

	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}

	var ReactInvalidSetStateWarningDevTool = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};

	module.exports = ReactInvalidSetStateWarningDevTool;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNativeOperationHistoryDevtool
	 */

	'use strict';

	var history = [];

	var ReactNativeOperationHistoryDevtool = {
	  onNativeOperation: function (debugID, type, payload) {
	    history.push({
	      instanceID: debugID,
	      type: type,
	      payload: payload
	    });
	  },
	  clearHistory: function () {
	    if (ReactNativeOperationHistoryDevtool._preventClearing) {
	      // Should only be used for tests.
	      return;
	    }

	    history = [];
	  },
	  getHistory: function () {
	    return history;
	  }
	};

	module.exports = ReactNativeOperationHistoryDevtool;
	}.call(window));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentTreeDevtool
	 */

	'use strict';

	var invariant = __webpack_require__(33);

	var tree = {};
	var rootIDs = [];

	function updateTree(id, update) {
	  if (!tree[id]) {
	    tree[id] = {
	      parentID: null,
	      ownerID: null,
	      text: null,
	      childIDs: [],
	      displayName: 'Unknown',
	      isMounted: false,
	      updateCount: 0
	    };
	  }
	  update(tree[id]);
	}

	function purgeDeep(id) {
	  var item = tree[id];
	  if (item) {
	    var childIDs = item.childIDs;

	    delete tree[id];
	    childIDs.forEach(purgeDeep);
	  }
	}

	var ReactComponentTreeDevtool = {
	  onSetDisplayName: function (id, displayName) {
	    updateTree(id, function (item) {
	      return item.displayName = displayName;
	    });
	  },
	  onSetChildren: function (id, nextChildIDs) {
	    updateTree(id, function (item) {
	      var prevChildIDs = item.childIDs;
	      item.childIDs = nextChildIDs;

	      nextChildIDs.forEach(function (nextChildID) {
	        var nextChild = tree[nextChildID];
	        !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected devtool events to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !(nextChild.displayName != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !(nextChild.childIDs != null || nextChild.text != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;

	        if (prevChildIDs.indexOf(nextChildID) === -1) {
	          nextChild.parentID = id;
	        }
	      });
	    });
	  },
	  onSetOwner: function (id, ownerID) {
	    updateTree(id, function (item) {
	      return item.ownerID = ownerID;
	    });
	  },
	  onSetText: function (id, text) {
	    updateTree(id, function (item) {
	      return item.text = text;
	    });
	  },
	  onMountComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.isMounted = true;
	    });
	  },
	  onMountRootComponent: function (id) {
	    rootIDs.push(id);
	  },
	  onUpdateComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.updateCount++;
	    });
	  },
	  onUnmountComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.isMounted = false;
	    });
	    rootIDs = rootIDs.filter(function (rootID) {
	      return rootID !== id;
	    });
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeDevtool._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    Object.keys(tree).filter(function (id) {
	      return !tree[id].isMounted;
	    }).forEach(purgeDeep);
	  },
	  isMounted: function (id) {
	    var item = tree[id];
	    return item ? item.isMounted : false;
	  },
	  getChildIDs: function (id) {
	    var item = tree[id];
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var item = tree[id];
	    return item ? item.displayName : 'Unknown';
	  },
	  getOwnerID: function (id) {
	    var item = tree[id];
	    return item ? item.ownerID : null;
	  },
	  getParentID: function (id) {
	    var item = tree[id];
	    return item ? item.parentID : null;
	  },
	  getText: function (id) {
	    var item = tree[id];
	    return item ? item.text : null;
	  },
	  getUpdateCount: function (id) {
	    var item = tree[id];
	    return item ? item.updateCount : 0;
	  },
	  getRootIDs: function () {
	    return rootIDs;
	  },
	  getRegisteredIDs: function () {
	    return Object.keys(tree);
	  }
	};

	module.exports = ReactComponentTreeDevtool;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */

	'use strict';

	var _assign = __webpack_require__(30);

	var ReactComponent = __webpack_require__(42);
	var ReactElement = __webpack_require__(34);
	var ReactPropTypeLocations = __webpack_require__(54);
	var ReactPropTypeLocationNames = __webpack_require__(56);
	var ReactNoopUpdateQueue = __webpack_require__(43);

	var emptyObject = __webpack_require__(52);
	var invariant = __webpack_require__(33);
	var keyMirror = __webpack_require__(55);
	var keyOf = __webpack_require__(57);
	var warning = __webpack_require__(36);

	var MIXINS_KEY = keyOf({ mixins: null });

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	// noop
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.') : invariant(false) : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    var Constructor = function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : void 0;

	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(55);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;
	}.call(window));

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(33);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;
	}.call(window));

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */

	'use strict';

	var ReactElement = __webpack_require__(34);
	var ReactElementValidator = __webpack_require__(59);

	var mapObject = __webpack_require__(60);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if (process.env.NODE_ENV !== 'production') {
	    return ReactElementValidator.createFactory(tag);
	  }
	  return ReactElement.createFactory(tag);
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hgroup: 'hgroup',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',

	  // SVG
	  circle: 'circle',
	  clipPath: 'clipPath',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  image: 'image',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'

	}, createDOMFactory);

	module.exports = ReactDOMFactories;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactElement = __webpack_require__(34);
	var ReactPropTypeLocations = __webpack_require__(54);
	var ReactPropTypeLocationNames = __webpack_require__(56);
	var ReactCurrentOwner = __webpack_require__(35);

	var canDefineProperty = __webpack_require__(38);
	var getIteratorFn = __webpack_require__(40);
	var invariant = __webpack_require__(33);
	var warning = __webpack_require__(36);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	var loggedTypeFailures = {};

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
	  if (addenda === null) {
	    // we already showed the warning
	    return;
	  }
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : void 0;
	}

	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} messageType A key used for de-duping warnings.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 * @returns {?object} A set of addenda to use in the warning message, or null
	 * if the warning has already been shown before (and shouldn't be shown again).
	 */
	function getAddendaForKeyUse(messageType, element, parentType) {
	  var addendum = getDeclarationErrorAddendum();
	  if (!addendum) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      addendum = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }

	  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
	  if (memoizer[addendum]) {
	    return null;
	  }
	  memoizer[addendum] = true;

	  var addenda = {
	    parentOrOwner: addendum,
	    url: ' See https://fb.me/react-warning-keys for more information.',
	    childOwner: null
	  };

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  return addenda;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var addendum = getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : void 0;
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;
	}.call(window));

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(34);
	var ReactPropTypeLocationNames = __webpack_require__(56);

	var emptyFunction = __webpack_require__(37);
	var getIteratorFn = __webpack_require__(40);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!ReactElement.isValidElement(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;
	}.call(window));

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */

	'use strict';

	module.exports = '15.1.0';
	}.call(window));

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*** IMPORTS FROM imports-loader ***/
	var jQuery = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	(function() {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var ReactElement = __webpack_require__(34);

	var invariant = __webpack_require__(33);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : void 0;
	  return children;
	}

	module.exports = onlyChild;
	}.call(window));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }
/******/ ]);