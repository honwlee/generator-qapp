define([
    "qscript/lang/Class",
    "qfacex/dijit/container/ContentPane",
    "utilhub/front/comctrls/ExplorerBench",
    "i18n!../nls/app"
], function(Class, ContentPane, ExplorerBench, nlsApp) {
    var Layout = Class.declare({
        "-parent-": ExplorerBench,
        "-interfaces-": [],
        "-protected-": {
            "-fields-": {
                baseClass: "welcome",
                nls: nlsApp
            },

            "-methods-": {
                composite: function() {
                   this.header = new ContentPane({
                      content: "<div class=\"text\">this is header pane with height 60px</div>",
                      class: "header"
                   });

                   this.footer = new ContentPane({
                      content: "<div class=\"text\">this is footer pane with height 60px</div>",
                      class: "footer"
                   });

                   this.navbar = new ContentPane({
                      content: "<div class=\"text\">this is navbar pane with width 200px</div>",
                      class: "navbar"
                   });

                   this.mainPane = new ContentPane({
                      content: "<div class=\"text\">" + nlsApp.welcome + "</div>",
                      class: "main"
                   });

                   this.detailsPane = new ContentPane({
                      content: "<div class=\"text\">this is details pane with width 200px</div>",
                      class: "details"
                   });

                }
            }
        },

        "-public-": {
            "-attributes-": { },

            "-methods-": {

            }
        }
    });
    return Layout;
});
