define([
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "qfacex/dijit/ITemplated",
    "utilhub/ItemsControl",
    "qscript/lang/Class",
    "dojo/text!../templates/layout.html",
    "dojo/i18n!../nls/app",
    "bundle!dependencies/services/task_srv"
], function(on, domClass, domStyle, domConstruct, ITemplated, ItemsControl, Class,
    template, nlsApp, taskSrv) {
    var Layout = Class.declare({
        "-parent-": ItemsControl,
        "-interfaces-": [ITemplated],
        "-protected-": {
            "-fields-": {
                templateString: template,
                baseClass: "Task",
                fontAwesome: FontAwesome,
                memory: null,
                app: null,
                nls: nlsApp,
                remainingCount: 0,
                completedCount: 0
            },

            "-methods-": {
                init: function() {
                    this.overrided();
                    var self = this;
                    on(this.addNode, "click", function() {
                        var title = self.titleValue;
                        if (title === "") {
                            qfaceDialog.alert({
                                message: "Task can't be empty!"
                            });
                        } else {
                            self.addTask(title, false, null, true);
                        }
                    });
                    this.memory.query({}).forEach(Function.hitch(this, "initItem"));
                },

                initItem: function(item) {
                    var self = this,
                        node;
                    if (item.completed) {
                        node = this.completedContentNode;
                        this.completedCount += 1;
                    } else {
                        node = this.remainContentNode;
                        this.remainingCount += 1;
                    }
                    var li = domConstruct.create("li", {
                            "class": "task-item"
                        }, node),
                        p = domConstruct.create("p", {
                            innerHTML: item.title,
                            contenteditable: !item.completed
                        }, li),
                        span = domConstruct.create("span", {
                            "class": "action"
                        }, li);

                    on(li, "mouseover", function() {
                        domClass.add(span, "active");
                    });

                    on(li, "mouseout", function() {
                        domClass.remove(span, "active");
                    });

                    domConstruct.create("a", {
                        innerHTML: "<i class=\"" + this.fontAwesome.taskRemove + "\"></i>",
                        "class": "delete",
                        title: "Delete",
                        onclick: function() {
                            self.removeTask(node, li, item);
                        }
                    }, span);

                    var icon = item.completed ? this.fontAwesome.taskUndo : this.fontAwesome.mark;
                    domConstruct.create("a", {
                        innerHTML: "<i class=\"" + icon + "\"></i>",
                        "class": "complete",
                        title: "Complete",
                        onclick: function() {
                            self.markTask(node, li, item);
                        }
                    }, span);
                    this.updateTaskInfo();
                },

                removeItem: function(node, li, item) {
                    node.removeChild(li);
                    if (item.completed) {
                        this.completedCount -= 1;
                    } else {
                        this.remainingCount -= 1;
                    }
                    this.updateTaskInfo();
                }
            }
        },

        "-public-": {
            "-attributes-": {
                titleValue: {
                    getter: function() {
                        return this.taskInputNode.value.trim();
                    }
                }
            },

            "-methods-": {
                addTask: function() {
                    var self = this;
                    taskSrv.save({
                        title: this.titleValue,
                        startAt: new Date(),
                        endAt: new Date()
                    }).then(function(cbData) {
                        self.initItem(cbData);
                        self.taskInputNode.value = "";
                    });
                },

                editTask: function() {

                },

                markTask: function(node, li, item) {
                    // 0 uncompleted, 1 doing, 2 completed
                    var self = this;
                    item.status = item.completed ? 0 : 2;
                    item.startAt = new Date();
                    item.endAt = new Date();
                    taskSrv.save(item).then(function(cbData) {
                        self.removeItem(node, li, item);
                        self.initItem(cbData);
                    });
                },

                removeTask: function(node, li, item) {
                    var self = this;
                    taskSrv.del(item.id).then(function() {
                        self.removeItem(node, li, item);
                    });
                },

                updateTaskInfo: function() {
                    var totalCount = this.remainingCount + this.completedCount;
                    var remainString = "— " + this.remainingCount.toString() + " / " + totalCount.toString();
                    if (totalCount > 0) {
                        var remainPercent = Math.round(this.remainingCount / totalCount * 100, 2);
                        remainString += " (" + remainPercent.toString() + "%)";
                    }
                    this.remainInfoNode.innerHTML = remainString;
                    var completedString = "— " + this.completedCount.toString() + " / " + totalCount.toString();
                    if (totalCount > 0) {
                        var completedPercent = Math.round(this.completedCount / totalCount * 100, 2);
                        completedString += " (" + completedPercent.toString() + "%)";
                    }
                    this.completedInfoNode.innerHTML = completedString;
                }
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
