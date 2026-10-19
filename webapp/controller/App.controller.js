sap.ui.define([
  "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast", "demo/tasks/model/taskRules"
], function (Controller, JSONModel, MessageToast, taskRules) {
  "use strict";
  return Controller.extend("demo.tasks.controller.App", {
    onInit: function () {
      this.getView().setModel(new JSONModel({
        newTitle: "", completed: 0, total: 2,
        tasks: [
          { title: "Run the UI5 sample locally", done: false },
          { title: "Open a PR and request Copilot review", done: false }
        ]
      }));
    },
    onAdd: function () {
      var model = this.getView().getModel();
      var input = this.byId("taskTitle");
      var title = model.getProperty("/newTitle");
      var error = taskRules.validateTitle(title);
      input.setValueState(error ? "Error" : "None");
      input.setValueStateText(error);
      if (error) { input.focus(); return; }
      model.setProperty("/tasks", model.getProperty("/tasks").concat([
        { title: title.trim(), done: false }
      ]));
      model.setProperty("/newTitle", "");
      this.updateCounts();
      MessageToast.show("Task added");
      input.focus();
    },
    onToggle: function (event) {
      var context = event.getSource().getBindingContext();
      context.getModel().setProperty(context.getPath() + "/done", event.getParameter("selected"));
      this.updateCounts();
    },
    onClearCompleted: function () {
      var model = this.getView().getModel();
      model.setProperty("/tasks", taskRules.clearCompleted(model.getProperty("/tasks")));
      this.updateCounts();
      MessageToast.show("Completed tasks cleared");
    },
    updateCounts: function () {
      var model = this.getView().getModel();
      var tasks = model.getProperty("/tasks");
      model.setProperty("/total", tasks.length);
      model.setProperty("/completed", taskRules.countCompleted(tasks));
    }
  });
});
