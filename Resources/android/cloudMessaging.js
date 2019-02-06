exports.registerFirebase = function () {

	var core = require('firebase.core');
	var fcm = require('firebase.cloudmessaging');
	var isAndroid = 'android' === 'android';

	core.configure();

	fcm.addEventListener('didRefreshRegistrationToken', onToken);

	fcm.addEventListener('didReceiveMessage', onMessage);

	function onToken(e) {
		Ti.API.info('Token', e.fcmToken);
	}

	function onMessage(e) {
		Ti.API.info('Message===================', e.message);
	}

	if (isAndroid) {
		fcm.createNotificationChannel({
			sound: 'warn_sound',
			channelId: 'general',
			channelName: 'General Notifications',
			importance: 'high' });
		fcm.registerForPushNotifications();
	} else {
		Ti.App.iOS.addEventListener('usernotificationsettings', function eventUserNotificationSettings() {
			Ti.App.iOS.removeEventListener('usernotificationsettings', eventUserNotificationSettings);

			Ti.Network.registerForPushNotifications({
				success: function () {},
				error: function () {},
				callback: function () {} });
		});

		Ti.App.iOS.registerUserNotificationSettings({
			types: [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
		});
	}

	if (fcm.fcmToken !== null) {
		Ti.API.info('FCM-Token', fcm.fcmToken);
	} else {
		Ti.API.info('Token is empty. Waiting for the token callback ...');
	}

	fcm.subscribeToTopic('testTopic');
};