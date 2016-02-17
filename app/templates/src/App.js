define([
    "utilhub/Application",
    "./controls/Layout"
], function(_App, Layout) {
    return Class.declare({
        "-parent-": _App,
        "-protected-": {
            "-fields-": {
                width: 860,
                height: 570,
                title: "[TODO: ]"
            }
        },

        "-public-": {
            "-methods-": {
                prepare: function(args) {
                    this.overrided();
                    this.mainLayout = new Layout({
                        app: this
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
