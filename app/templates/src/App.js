define([
    "utilhub/Application",
    "qscriptx/store/odb/ArrayStore",
    "dojo/i18n!utilhub/front/system/nls/apps",
    "bundle!dependencies/services/task_srv",
    "dojo/text!./data/tasks.json",
    "./controls/Layout"
], function(_App, Memory, nlsApps, taskSrv, taskJson, Layout) {
    return Class.declare({
        "-parent-": _App,
        "-module-": "Task/App",
        "-protected-": {
            "-fields-": {
                isDeferred: true,
                winMaxed: false,
                width: 860,
                height: 570,
                title: nlsApps["Task"] || "Task"
            }
        },

        "-public-": {
            "-methods-": {
                init: function(args) {
                    this.overrided();
                    var self = this;
                    if (runtime.nodeStarted) {
                        this.initWithData(new Memory({
                            data: JSON.parse(taskJson)
                        }));
                        self.deferred.resolve();
                    } else {
                        taskSrv.init().then(function(memory) {
                            self.initWithData(memory);
                            self.deferred.resolve();
                        });
                    }
                    return this.deferred.promise;
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
