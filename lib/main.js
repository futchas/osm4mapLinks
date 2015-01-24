var self = require("sdk/self");
var tabs = require("sdk/tabs");

tabs.on('ready', function(tab) {
  worker = tab.attach({
    contentScriptFile: self.data.url("my-script.js")
  });
  worker.port.emit("checkURL", tab.url);
});
