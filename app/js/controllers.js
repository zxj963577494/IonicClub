/**
 * 控制器
 */
angular.module('IonicClub.controllers', [])
    // 主题列表
    .controller('TopicsCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicModal', 'localStorageService', 'IonicService', 'TabService', function ($scope, $stateParams, $state, $ionicLoading, $ionicModal, localStorageService, IonicService, TabService) {

        // 主题列表参数
        $scope.postData = {
            page: 1,
            tab: 'all',
            limit: 20
        };

        // 新增主题参数
        $scope.topicsData = {
            accesstoken: '',
            title: '',
            tab: '',
            content: ''
        }

        // 获取参数
        if ($stateParams.tab != '') {
            $scope.postData.tab = $stateParams.tab;
        }

        var User = JSON.parse(localStorageService.get('User'));
        if (User) {
            $scope.topicsData.accesstoken = User.accesstoken;
        }

        $scope.topics = [];
        $scope.more = true;
        $scope.loadMore = function () {
            try {
                IonicService.getTopics($scope.postData).then(function (data) {
                    angular.forEach(data.data, function (item) {
                        $scope.topics.push(item);
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.postData.page++;
                });
            }
            catch (ex) {
                $scope.more = false;
            }
        };

        // 下拉刷新
        $scope.doRefresh = function () {
            $scope.postData.page = 1;
            $scope.postData.tab = 'all';
            $scope.topics = [];
            IonicService.getTopics($scope.postData).then(function (data) {
                angular.forEach(data.data, function (item) {
                    $scope.topics.push(item);
                });
                $scope.postData.page++;
            });
            $scope.$broadcast('scroll.refreshComplete');
        };

        $ionicModal.fromTemplateUrl('templates/Area/topicsAdd.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.oModal = modal;
            $scope.tabs = TabService.getTabs();
        });

        $scope.openModal = function () {
            $scope.oModal.show();
        };

        $scope.closeModal = function () {
            $scope.oModal.hide();
        };

        // 创建主题
        $scope.createTopics = function () {
            $scope.oModal.hide();
            if (User) {
                IonicService.postTopic($scope.topicsData).then(function (data) {
                    if (data.success) {
                        $ionicLoading.show({template: '发表成功', duration: 500});
                        $state.go('tab.topicDetail', {topicId: data.topic_id});
                    }
                });
            } else {
                $ionicLoading.show({template: '请先登录再发表', duration: 1000});
            }
        };
    }])

    // 主题详情
    .controller('TopicDetailCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'localStorageService', 'ShareService', 'IonicService', function ($scope, $stateParams, $ionicLoading, $ionicScrollDelegate, localStorageService, ShareService, IonicService) {

        // 加载中
        $ionicLoading.show({
            content: 'Loading Data',
            animation: 'fade-in',
            showBackdrop: false,
            showDelay: 100
        });

        // 评论参数
        $scope.replyData = {
            accesstoken: '',
            content: '',
            reply_id: ''
        }

        // 收藏参数
        $scope.collectData = {
            accesstoken: '',
            topic_id: $stateParams.topicId
        }

        $scope.shareData = {
            message: '',
            subject: '',
            link: ''
        };

        var User = JSON.parse(localStorageService.get('User'));
        if (User) {
            $scope.replyData.accesstoken = User.accesstoken;
            $scope.collectData.accesstoken = User.accesstoken;
        }

        IonicService.getTopicById($stateParams.topicId).then(function (data) {
            $scope.topicDetail = data.data;
            $scope.shareData.message = data.data.content;
            $scope.shareData.subject = data.data.title;
            $scope.shareData.link = 'http://ionichina.com/topic/' + data.data.id;
            $ionicLoading.hide();
        });

        // 点赞
        $scope.replieUps = function (replyId) {
            IonicService.postReplieUps(replyId, $scope.replyData.accesstoken).then(function (data) {
                if (data.success) {
                    if (data.action == 'up') {
                        $ionicLoading.show({template: '赞一个', duration: 500});
                    } else {
                        $ionicLoading.show({template: '取消点赞', duration: 500});
                    }
                } else {
                    $ionicLoading.show({template: data.error_msg, duration: 500});
                }
            });
        }

        // 回复评论
        $scope.reReply = function (replyId, loginname) {
            $scope.replyData.content = '@' + loginname + ' ';
            $scope.replyData.reply_id = replyId;
        }

        // 提交评论
        $scope.saveReply = function () {
            if ($scope.replyData.content.indexOf('@') < 0) {
                $scope.replyData.reply_id = '';
            }
            IonicService.postReplie($stateParams.topicId, $scope.replyData).then(function (data) {
                if (data.success) {
                    $ionicLoading.show({template: '评论成功', duration: 500})
                    $scope.replyData.content = '';

                    //立刻显示评论
                    IonicService.getTopicById($stateParams.topicId).then(function (data) {
                        $scope.topicDetail.replies = data.data.replies;

                        // 滚动到最后，查看自己评论
                        // $ionicScrollDelegate.scrollBottom();
                    });
                }
            });
        }

        // 收藏
        $scope.collect = function () {
            IonicService.postTopicCollect($scope.collectData).then(function (data) {
                if (data.success) {
                    $ionicLoading.show({template: '收藏成功', duration: 500});
                }
            });
        }

        // 分享
        $scope.share = function () {
            ShareService.share($scope.shareData);
        }
    }])

    //登录
    .controller('LoginCtrl', ['$scope', '$ionicPopup', '$ionicHistory', '$state', '$cordovaBarcodeScanner', 'localStorageService', 'AppVersionService', 'IonicService', function ($scope, $ionicPopup, $ionicHistory, $state, $cordovaBarcodeScanner, localStorageService, AppVersionService, IonicService) {
        /*        AppVersionService.getVersionNumber().then(function (data) {
         $scope.appVersion = data;
         });*/

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $scope.login = function () {
            $ionicPopup.show({
                template: 'PC登录 http://ionichina.com后，扫描设置页面的Access Token二维码即可完成登录',
                title: '扫码登录',
                scope: $scope,
                cssClass: 'positive',
                buttons: [
                    {
                        text: '<b>我知道了</b>',
                        type: 'button-positive'
                    }
                ]
            }).then(function () {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function (barcodeData) {
                        var User = {
                            accesstoken: '',
                            loginname: ''
                        }
                        User.accesstoken = barcodeData.text;
                        IonicService.postUserLogin(User.accesstoken).then(function (data) {
                            User.loginname = data.loginname;
                            localStorageService.set('User', JSON.stringify(User));
                            $state.go('tab.account');
                        });
                    })
            })
        }
    }])

    // 个人中心
    .controller('AccountCtrl', ['$scope', '$ionicHistory', '$state', '$ionicModal', '$ionicLoading', 'localStorageService', 'AppVersionService', 'IonicService', function ($scope, $ionicHistory, $state, $ionicModal, $ionicLoading, localStorageService, AppVersionService, IonicService) {

        /*AppVersionService.getVersionNumber().then(function (data) {
         $scope.appVersion = data;
         });*/

        // 取消收藏参数
        $scope.deCollectData = {
            accesstoken: '',
            topic_id: ''
        }

        var User = JSON.parse(localStorageService.get('User'));
        if (User) {
            $scope.deCollectData.accesstoken = User.accesstoken;
            IonicService.getUserByName(User.loginname).then(function (data) {
                $scope.Account = data.data;
            })
            IonicService.getMessages(User.accesstoken).then(function (data) {
                $scope.messages = data.data;
            })
        } else {
            $state.go('tab.login');
        }


/*        // 设为已读
        $scope.setHasRead = function () {
            IonicService.postMessageMark_all(User.accesstoken).then(function (data) {
                if (data.success) {
                    $ionicLoading.show({template: '设置成功', duration: 500});
                }
            });
        }*/


        // 取消收藏
        $scope.deCollect = function (topicId) {
            $scope.deCollectData.topic_id = topicId;
            IonicService.postTopicDeCollect($scope.deCollectData).then(function (data) {
                if (data.success) {
                    $ionicLoading.show({template: '取消收藏成功', duration: 500})
                }
            });
        }


        // 收藏
        $ionicModal.fromTemplateUrl('templates/Area/favorites.html', {
            id: '1',
            scope: $scope
        }).then(function (modal) {
            $scope.oModal1 = modal;
        });

        // 消息
        $ionicModal.fromTemplateUrl('templates/Area/messages.html', {
            id: '2',
            scope: $scope
        }).then(function (modal) {
            $scope.oModal2 = modal;
        });

        // 创建的话题
        $ionicModal.fromTemplateUrl('templates/Area/createTopics.html', {
            id: '3',
            scope: $scope
        }).then(function (modal) {
            $scope.oModal3 = modal;
        });

        // 参与的话题
        $ionicModal.fromTemplateUrl('templates/Area/joinTopics.html', {
            id: '4',
            scope: $scope
        }).then(function (modal) {
            $scope.oModal4 = modal;
        });

        $scope.openModal = function (index) {
            switch (index) {
                case 1:
                    $scope.oModal1.show();
                    break;
                case  2:
                    $scope.oModal2.show().then(function(){
                        IonicService.postMessageMark_all(User.accesstoken).then(function (data) {
                            if (data.success) {
                                $scope.badges.message = 0;
                            }
                        });
                    });
                    break;
                case  3:
                    $scope.oModal3.show();
                    break;
                case  4:
                    $scope.oModal4.show();
                    break;
            }
        };

        $scope.closeModal = function (index) {
            switch (index) {
                case 1:
                    $scope.oModal1.hide();
                    break;
                case  2:
                    $scope.oModal2.hide();
                    break;
                case  3:
                    $scope.oModal3.hide();
                    break;
                case  4:
                    $scope.oModal4.hide();
                    break;
            }
        };
    }])

    // 个人详细
    .controller('AccountDetailCtrl', ['$scope', '$ionicHistory', '$state', 'localStorageService', 'IonicService', function ($scope, $ionicHistory, $state, localStorageService, IonicService) {
        var User = JSON.parse(localStorageService.get('User'));
        if (User) {
            IonicService.getUserByName(User.loginname).then(function (data) {
                $scope.Account = data.data;
            })
        }
        $scope.loginOut = function () {
            localStorageService.remove('User');
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go("tab.login");
        }
    }])

    // 用户详情
    .controller('UserCtrl', ['$scope', '$stateParams', 'IonicService', function ($scope, $stateParams, IonicService) {
        IonicService.getUserByName($stateParams.loginname).then(function (data) {
            $scope.Account = data.data;
        })
    }])

    .controller('IndexCtrl', ['$scope', 'localStorageService', 'IonicService', 'TabService', function ($scope, localStorageService, IonicService, TabService) {
        $scope.badges = {
            message: 0
        };

        $scope.tabs = TabService.getTabs()

        var User = JSON.parse(localStorageService.get('User'));
        if (User) {
            IonicService.getMessageCount(User.accesstoken).then(function (data) {
                $scope.badges.message = data.data;
            })
        }
    }])
