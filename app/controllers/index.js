function doClick(e) {
	alert($.label.text);
	require("/cloudMessaging").registerFirebase();
}

$.index.open();
