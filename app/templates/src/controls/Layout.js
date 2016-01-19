define([
    "qfacex/dijit/ITemplated",
    "utilhub/ItemsControl",
    "qscript/lang/Class",
    "dojo/text!../templates/layout.html",
    "dojo/i18n!../nls/app"
], function(ITemplated, ItemsControl, Class,
    template, nlsApp) {
    var Layout = Class.declare({
        "-parent-": ItemsControl,
        "-interfaces-": [ITemplated],
        "-protected-": {
            "-fields-": {
                templateString: template,
                baseClass: "example",
                nls: nlsApp
            },

            "-methods-": {
                init: function() {

                }
            }
        },

        "-public-": {
            "-attributes-": { },

            "-methods-": {

            }
        },

        "-constructor-": {
            initialize: function(params, srcNodeRef) {
                this.overrided(params, srcNodeRef);
                this.init();
            }
        }
    });
    return Layout;
});
