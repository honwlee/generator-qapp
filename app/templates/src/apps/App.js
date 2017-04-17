define([
    "utilhub/front/apps/App",
    "../controls/Layout"
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
                    this.content = new Layout();
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
