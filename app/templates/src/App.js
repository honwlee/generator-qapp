define([
    "utilhub/Application",
    "dojo/i18n!utilhub/front/system/nls/apps",
    "dojo/text!./data/tasks.json",
    "./controls/Layout"
], function(_App, nlsApps, taskJson, Layout) {
    return Class.declare({
        "-parent-": _App,
        "-module-": "Task/App",
        "-protected-": {
            "-fields-": {
                winMaxed: false,
                // width: 800,
                // height: 500,
                width: 860,
                height: 570,
                title: nlsApps["Task"] || "Task"
            }
        },

        "-public-": {
            "-methods-": {
                init: function(args) {
                    this.overrided();
                    self.initWithData(JSON.parse(taskJson));
                },
                initWithData: function(data) {
                    this.mainLayout = new Layout({
                        app: this,
                        memory: data
                    });
                }
            }
        },

        "-constructor-": {
            initialize: function(args) {
                this.overrided(args);
            }
        }
    });
});
