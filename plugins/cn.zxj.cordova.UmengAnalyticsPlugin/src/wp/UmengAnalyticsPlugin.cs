using System;
using System.Windows;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;
using Windows.ApplicationModel;
using System.Xml.Linq;
using UmengSDK;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class UmengAnalyticsPlugin : BaseCommand
    {
        public void init(string data)
        {
            UmengAnalytics.Init("YOUR_APP_KEY");
        }
    }
}