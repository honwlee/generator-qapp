define([
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-construct",
    "qscript/lang/Class",
    "udesktop/system/controls/BaseUi",
    "udesktop/system/modules/FontAwesome",
    "dojo/i18n!../nls/app",
    "dojo/text!../templates/layout.html",
    "qface/controls/container/BorderContainer",
    "qface/controls/container/ContentPane"
], function(domStyle, domClass, domConstruct, Class, BaseUi, FontAwesome, nlsApp, template) {
    return Class.declare({
        "-parent-": BaseUi,
        "-protected-": {
            "-fields-": {
                "$$contentTemplate": template,
                baseClass: '<%= appnameClass %>',
                fontAwesome: FontAwesome,
                nls: nlsApp
            },

            "-handlers-": {
                contentNode_click: function(e) {
                    alert(this.nls.hello + ":" + this.nls.world + "!");
                }
            },

            "-methods-": {
                init: function() {
                    this["super"]();
                }
            }
        },

        "-public-": {
            "-attributes-": {

            },
            "-methods-": {

            }
        },

        "-constructor-": {
            initialize: function(params, srcNodeRef) {
                this["super"](params, srcNodeRef);
                this.init();
            }
        }
    });
});
