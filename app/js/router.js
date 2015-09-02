/**
 * 路由
 */
angular.module('IonicClub.router', [])
    .config(['$provide', '$stateProvider', '$urlRouterProvider', function ($provide, $stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tab.topics', {
                url: '/topics/:tab',
                views: {
                    'tab': {
                        templateUrl: 'templates/tab-topics.html',
                        controller: 'TopicsCtrl'
                    }
                }
            })
            .state('tab.topicDetail', {
                url: '/topicDetail/:topicId',
                views: {
                    'tab': {
                        templateUrl: 'templates/tab-topicDetail.html',
                        controller: 'TopicDetailCtrl'
                    }
                }
            })
            .state('tab.login', {
                url: '/login',
                views: {
                    'account': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl'
                    }
                },
                resolve: {
                    validater: ['$location', 'localStorageService', function ($location, localStorageService) {
                        var loginInfo = localStorageService.get('User');
                        if (loginInfo) {
                            $location.path('/tab/account');
                        }
                    }]
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                },
                resolve: {
                    validater: ['$location', 'localStorageService', function ($location, localStorageService) {
                        var loginInfo = localStorageService.get('User');
                        if (!loginInfo) {
                            $location.path('/tab/login');
                        }
                    }]
                }
            })
            .state('tab.account-detail', {
                url: '/account/detail',
                views: {
                    'account': {
                        templateUrl: 'templates/tab-account-detail.html',
                        controller: 'AccountDetailCtrl'
                    }
                }
            })
            .state('user', {
                url: '/user/:loginname',
                templateUrl: 'templates/user.html',
                controller: 'UserCtrl'
            })
        $urlRouterProvider.otherwise('tab/topics/');
    }])