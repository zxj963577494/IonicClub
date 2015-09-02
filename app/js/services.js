/**
 * 服务
 */
angular.module('IonicClub.services', [])
    // Ionic
    .service('IonicService', ['$http', '$q', 'ConfigService', function ($http, $q, ConfigService) {
        return {
            // 获取主题
            getTopics: function (data) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/topics";
                $http({
                    method: 'GET',
                    url: url,
                    params: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 通过ID获取主题详情
            getTopicById: function (id) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/topic/" + id;
                $http.get(url).success(
                    function (data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            // 新增主题
            postTopic: function (data) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/topics";
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 收藏主题
            postTopicCollect: function (data) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/topic/collect";
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 取消收藏主题
            postTopicDeCollect: function (data) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/topic/de_collect";
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 新建评论
            postReplie: function (id, data) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/topic/" + id + "/replies";
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 为评论点赞
            postReplieUps: function (reply_id, accesstoken) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/reply/" + reply_id + "/ups?accesstoken=" + accesstoken;
                $http({
                    method: 'POST',
                    url: url
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 获取用户详情
            getUserByName: function (loginname) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/user/" + loginname;
                $http.get(url).success(
                    function (data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            // 验证 accessToken 的正确性
            postUserLogin: function (accesstoken) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/accesstoken?accesstoken=" + accesstoken;
                $http({
                    method: 'POST',
                    url: url
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // 获取未读消息数
            getMessageCount: function (accessToken) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/message/count?accesstoken=" + accessToken;
                $http.get(url).success(
                    function (data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            // 获取消息
            getMessages: function (accessToken) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/messages?accesstoken=" + accessToken;
                $http.get(url).success(
                    function (data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            },
            // 标记全部已读
            postMessageMark_all: function (accessToken) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + "/api/v1/message/mark_all?accesstoken=" + accessToken;
                $http({
                    method: 'POST',
                    url: url
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            }
        }
    }])
    .service('ConfigService', [function () {
        var hostURL = "http://ionichina.com";

        var service = {
            getHost: function () {
                return hostURL;
            }
        }
        return service;
    }])
    .service('TabService', function () {
        var tabs = [{
            value: 'share',
            label: '分享'
        }, {
            value: 'ask',
            label: '问答'
        }, {
            value: 'job',
            label: '招聘'
        }, {
            value: 'bb',
            label: '吐槽'
        }];

        var service = {
            getTabs: function () {
                return tabs;
            }
        }
        return service;
    })


