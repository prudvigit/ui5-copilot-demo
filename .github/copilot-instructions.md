# Project guidance
This is an OpenUI5 1.120 sample using MVC, XML views, and a JSONModel.
Keep UI code in webapp, pure task rules in webapp/model/taskRules.js, and tests in test.
Use UI5 controls and text bindings; do not render user input as raw HTML.
Preserve keyboard access, input labels, error feedback, and responsive layout.
Run npm run check and npm test for changes. No npm dependencies are required.
During review, prioritize bugs, model/view synchronization, validation, accessibility,
and missing regression coverage. Identify the affected file and explain impact.
Do not add credentials, external services, or unrelated dependencies.
