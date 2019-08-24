cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-keyboard.keyboard",
      "file": "plugins/cordova-plugin-keyboard/www/keyboard.js",
      "pluginId": "cordova-plugin-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-keyboard": "1.2.0",
    "cordova-plugin-whitelist": "1.3.3"
  };
});