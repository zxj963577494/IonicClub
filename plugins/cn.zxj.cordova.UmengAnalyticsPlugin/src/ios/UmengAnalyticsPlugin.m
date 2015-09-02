#import "UmengAnalyticsPlugin.h"
#import "MobClick.h"
#import <Cordova/CDVPluginResult.h>

@implementation UmengAnalyticsPlugin

- (void)init:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    [MobClick startWithAppkey:@"YOU_APP_KEY" reportPolicy:BATCH   channelId:@"Web"];

    CDVPluginResult* pluginResult = nil;
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

@end
