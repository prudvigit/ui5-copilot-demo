(function (factory) {
  "use strict";
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    sap.ui.define([], factory);
  }
}(function () {
  "use strict";
  return {
    validateTitle: function (value) {
      if (typeof value !== "string" || !value.trim()) {
        return "Enter a task title.";
      }
      if (value.trim().length > 120) {
        return "Use 120 characters or fewer.";
      }
      return "";
    },
    countCompleted: function (tasks) {
      return tasks.filter(function (task) { return task.done === true; }).length;
    }
  };
}));
