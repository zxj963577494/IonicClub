// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('IonicClub', ['ionic', 'IonicClub.router', 'IonicClub.controllers', 'IonicClub.services', 'IonicClub.filters', 'IonicClub.directives', 'IonicClub.pluginServices', 'ngCordova', 'LocalStorageModule', 'pasvaz.bindonce', 'angularMoment'])

    .run(['$ionicPlatform', '$rootScope', '$state', '$timeout', '$ionicHistory', '$cordovaAppVersion', '$ionicPopup', '$ionicLoading', '$cordovaFileTransfer', '$cordovaFile', '$cordovaFileOpener2', '$cordovaProgress', 'ToastService', 'SplashscreenService', 'UmengService', 'amMoment', function ($ionicPlatform, $rootScope, $state, $timeout, $ionicHistory, $cordovaAppVersion, $ionicPopup, $ionicLoading, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2, $cordovaProgress, ToastService, SplashscreenService, UmengService, amMoment) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }


            // 启动友盟统计
            UmengService.init();


            // 隐藏启动画面
            SplashscreenService.hide();

            // set moment locale
            amMoment.changeLocale('zh-cn');
        });

        // 双击退出
        $ionicPlatform.registerBackButtonAction(function (e) {
            if ($state.includes('tab.topics')) {
                if ($rootScope.backButtonPressedOnceToExit) {
                    //退出前保存统计数据
                    window.plugins.umengAnalyticsPlugin.onKillProcess();
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    ToastService.showShortTop('再按一次退出系统');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            } else if ($state.includes('tab.account') || $state.includes('tab.login')) {
                $state.go('tab.topics');
            }
            else if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                if ($rootScope.backButtonPressedOnceToExit) {
                    //退出前保存统计数据
                    window.plugins.umengAnalyticsPlugin.onKillProcess();
                    ionic.Platform.exitApp();
                }
                $rootScope.backButtonPressedOnceToExit = true;
                ToastService.showShortTop('再按一次退出系统');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
            e.preventDefault();
            return false;
        }, 101);
    }])

    .config(['$ionicConfigProvider', 'localStorageServiceProvider', function ($ionicConfigProvider, localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix('ZxjIonicClub');

        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.views.transition('no');

        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            };

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        };
    }])
