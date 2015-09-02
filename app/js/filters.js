/**
 * 过滤器
 */
angular.module('IonicClub.filters', [])
    .filter('tabName', ['TabService', function (TabService) {
        var Tabs = TabService.getTabs();
        return function (tab) {
            for (var i in Tabs) {
                if (Tabs[i].value === tab) {
                    return Tabs[i].label;
                }
            }
        };
    }])
    .filter('link', ['$sce', function ($sce) {
        return function (content) {
            if (typeof content === 'string') {
                var userLinkRegex = /href="\/user\/([\S]+)"/gi;
                var noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
                var externalLinkRegex = /href="((?!#\/user\/)[\S]+)"/gi;
                return $sce.trustAsHtml(
                    content
                        .replace(userLinkRegex, 'href="#/user/$1"')
                        .replace(noProtocolSrcRegex, 'src="https://$1"')
                        .replace(externalLinkRegex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"")
                );
            }
            return content;
        };
    }])
    .filter('protocol', function () {
        return function (src) {
            // add https protocol
            if (/^\/\//gi.test(src)) {
                return 'https:' + src;
            } else {
                return src;
            }
        };
    })
    .filter('avatarFilter', function () {
        return function (src) {
            // add https protocol
            if (src) {
                src = src.replace("https://avatars.githubusercontent.com", "http://7xj5bc.com1.z0.glb.clouddn.com");
                src = src + "&imageView2/2/w/120";
            }
            return src;
        };
    })

