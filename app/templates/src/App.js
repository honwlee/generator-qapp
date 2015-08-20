define([
    "qface/application/Application",
    "dojo/i18n!./nls/apps",
    "qscript/lang/Class",<% if(jsLibs) { %>
    "udesktop/services/Bootstrap", <% } %>
    "./controls/Layout"
], function(Application, nls, Class,<% if(jsLibs) { %> Bootstrap, <% } %> Layout) {
    return Class.declare({
        "-parent-": Application,
        "-protected-": {
            "-fields-": {<% if (jsLibs) { %>
                isDeferred: true,<% } %>
                title: null,<% if(jsLibs) { %>
                jsLibs: [],<% } %>
                cssLinks: []
            },

            "-methods-": {
                init: function() {<% if(jsLibs) { %>
                    var self = this;
                    Bootstrap.initLibs(this.jsLibs).then(function() {
                        self.content = new Layout();
                        self.deferred.resolve();
                    });
                    return this.deferred.promise;
                <% } else { %>
                   this.content = new Layout();<% } %>
                }
            }
        },

        "-public-": {
            "-attributes-": {

            },

            "-methods-": {
                // blockade the app's Interval or some other things
                blockade: function() {

                },

                // start app's Interval or some other things
                unblock: function() {

                }
            }
        },

        "-constructor-": {
            initialize: function(args) {
                this["super"](args);
            }
        }
    });
});
