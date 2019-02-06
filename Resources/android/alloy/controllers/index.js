var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
	var arg = null;
	if (obj) {
		arg = obj[key] || null;
	}
	return arg;
}

function Controller() {

	require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
	this.__controllerPath = 'index';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.index = Ti.UI.createWindow(
	{ backgroundColor: "white", id: "index" });

	$.__views.index && $.addTopLevelView($.__views.index);
	$.__views.label = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#000", font: { fontSize: 12 }, text: 'Hello, World', id: "label" });

	$.__views.index.add($.__views.label);
	doClick ? $.addListener($.__views.label, 'click', doClick) : __defers['$.__views.label!click!doClick'] = true;exports.destroy = function () {};




	_.extend($, $.__views);


	function doClick(e) {
		alert($.label.text);
		require("/cloudMessaging").registerFirebase();
	}

	$.index.open();





	__defers['$.__views.label!click!doClick'] && $.addListener($.__views.label, 'click', doClick);



	_.extend($, exports);
}

module.exports = Controller;