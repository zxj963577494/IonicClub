angular.module('IonicClub.pluginServices', ['ngCordova'])
    .service('NetworkService', ['$q', '$cordovaNetwork', function ($q, $cordovaNetwork) {
        return {
            // 获取网络类型
            getNetworkType: function () {
                /*
                 Connection.UNKNOWN
                 Connection.ETHERNET //以太网
                 Connection.WIFI	WiFi
                 Connection.CELL_2G
                 Connection.CELL_3G
                 Connection.CELL_4G
                 Connection.CELL  //蜂窝网络
                 Connection.NONE
                 */
                var deferred = $q.defer();
                document.addEventListener("deviceready", function () {
                    deferred.resolve($cordovaNetwork.getNetwork())
                }, false);
                return deferred.promise;
            },
            // 是否启用网络
            isOnline: function () {
                var deferred = $q.defer();
                document.addEventListener("deviceready", function () {
                    deferred.resolve($cordovaNetwork.isOnline());
                }, false);
                return deferred.promise;
            }
        }
    }])
    .service('DeviceService', ['$q', '$cordovaDevice', function ($q, $cordovaDevice) {
        return {
            //获取用户设备信息
            getDeviceInfo: function () {
                var deferred = $q.defer();
                document.addEventListener("deviceready", function () {
                    deferred.resolve("设备名称:" + $cordovaDevice.getModel() + ";运行环境:" + $cordovaDevice.getPlatform() + " " + $cordovaDevice.getVersion());
                }, false);
                return deferred.promise;
            }
        }
    }])
    // Toast服务
    .service('ToastService', ['$cordovaToast', function ($cordovaToast) {
        return {
            showShortTop: function (message) {
                $cordovaToast.showShortTop(message);
            },
            showShortCenter: function (message) {
                $cordovaToast.showShortCenter(message);
            },
            showShortBottom: function (message) {
                $cordovaToast.showShortBottom(message);
            },
            showLongTop: function (message) {
                $cordovaToast.showLongTop(message);
            },
            showLongCenter: function (message) {
                $cordovaToast.showLongCenter(message);
            },
            showLongBottom: function (message) {
                $cordovaToast.showLongBottom(message);
            }
        }
    }])
    // 启动画面服务
    .service('SplashscreenService', ['$cordovaSplashscreen', function ($cordovaSplashscreen) {
        return {
            hide: function () {
                $cordovaSplashscreen.hide();
            },
            show: function () {
                $cordovaSplashscreen.show();
            }
        }
    }])
    // 统计服务
    .service('UmengService', ['$q', '$window', function ($q, $window) {
        return {
            init: function () {
                var deferred = $q.defer();
                $window.plugins.umengAnalyticsPlugin.init();
                deferred.resolve(null);
                return deferred.promise;
            }
        }
    }])
    // APP 版本服务
    .service('AppVersionService', ['$q', '$cordovaAppVersion', function ($q, $cordovaAppVersion) {
        return {
            getVersionNumber: function () {
                var deferred = $q.defer();
                $cordovaAppVersion.getVersionNumber().then(function (version) {
                    deferred.resolve(version);
                });
                return deferred.promise;
            },
            getVersionCode: function () {
                var deferred = $q.defer();
                $cordovaAppVersion.getVersionCode().then(function (build) {
                    deferred.resolve(build);
                });
                return deferred.promise;
            }
        }
    }])

    // 社交分享服务
    .service('ShareService', ['$q', '$cordovaSocialSharing', function ($q, $cordovaSocialSharing) {
        return {
            share: function (data) {
                $cordovaSocialSharing
                    .share(data.message, data.subject, null, data.link);
            }
        }
    }])
