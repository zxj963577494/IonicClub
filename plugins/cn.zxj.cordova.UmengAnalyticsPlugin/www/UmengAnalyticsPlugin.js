var UmengAnalyticsPlugin = function () {
};

UmengAnalyticsPlugin.prototype.error_callback = function (msg) {
    console.log("Javascript Callback Error: " + msg)
}

UmengAnalyticsPlugin.prototype.call_native = function (name, args, callback) {
    ret = cordova.exec(callback, this.error_callback, 'UmengAnalyticsPlugin', name, args);
    return ret;
}

UmengAnalyticsPlugin.prototype.init = function () {
    data = [];
    this.call_native("init", data, null);
};

UmengAnalyticsPlugin.prototype.setDebugMode = function (mode) {
    this.call_native("setDebugMode", [mode], null);
}

UmengAnalyticsPlugin.prototype.onKillProcess = function () {
    data = []
    this.call_native("onKillProcess", data, null);
}

UmengAnalyticsPlugin.prototype.onResume = function () {
    data = []
    this.call_native("onResume", data, null);
}
UmengAnalyticsPlugin.prototype.onPause = function () {
    data = []
    this.call_native("onPause", data, null);
}

if (!window.plugins) {
    window.plugins = {};
}

if (!window.plugins.umengAnalyticsPlugin) {
    window.plugins.umengAnalyticsPlugin = new UmengAnalyticsPlugin();
}

module.exports = new UmengAnalyticsPlugin();