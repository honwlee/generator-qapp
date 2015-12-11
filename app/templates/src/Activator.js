define([
    "qscript/lang/Class",
    "utilhub/osgi/IBundleActivator",
    "utilhub/osgi/BundleContext"
], function(Class, IBundleActivator, BundleContext) {
    var Activator = Class.declare({
        "-parent-": Class,
        "-interfaces-": [IBundleActivator],
        "-protected-": {
            "-fields-": {
                "_": {}
            },
            "-methods-": {

            }
        },

        "-public-": {
            "-attributes-": {},
            "-methods-": {
                "start": function( /*BundleContext*/ context) {
                    //TODO
                },

                "stop": function( /*BundleContext*/ context) {
                    //TODO
                }

            }
        },
        "-constructor-": {
            "initialize": function() {}
        }
    });
    return Activator;
});
