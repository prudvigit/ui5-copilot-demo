# UI5 + Codex + Copilot sample
A small task tracker built with OpenUI5, the open-source counterpart of SAPUI5.
Uses the Horizon theme, MVC, XML views, and a JSONModel. No backend, login, or persistence.
UI5 loads from its public CDN, so the browser needs internet access. The sample pins
1.120.0 for reproducibility; select a supported patched release before production use.

## Run
Install Node.js 22 or later. No npm install is needed.

```sh
npm start
```
Open http://localhost:8080. Add a task, try a blank title, and mark a task complete.
Refresh resets the sample data.

```sh
npm run check
npm test
```
Node tests verify validation and counts; they do not run UI5 in a browser.

## Put the baseline on GitHub
Create an **empty** repository named `ui5-copilot-demo` at https://github.com/new.
Do not initialize it with a README, license, or gitignore. In this folder run:

```sh
git init -b master
git add .
git commit -m "Add OpenUI5 task tracker and review workflow"
git remote add origin https://github.com/YOUR_USERNAME/ui5-copilot-demo.git
git push -u origin master
```
Authenticate through your normal GitHub credential manager or `gh auth login`.
Never put a token in the source or remote URL.

## Have Codex make the first feature PR
Connect this repository in your Codex environment, or open its checkout in Codex.
Use this prompt:

> Create a branch named feat/clear-completed. Add a Clear completed button that
> removes completed tasks, preserves unfinished tasks, updates both counts, and
> is disabled when no tasks are complete. Follow AGENTS.md. Add regression tests
> for the removal rule, run the checks, and open a PR against master. Do not merge.

The baseline intentionally does not include that feature, so the PR has a real diff.
Codex cloud configuration and local Codex configuration use different interfaces;
select this repository through the interface you use and grant access if prompted.

## Request Copilot review
1. Ensure your account has Copilot code review access and your organization allows
   it for this repository. Check current eligibility in GitHub billing/settings;
   this repository does not activate a subscription.
2. Open the ready-for-review PR on GitHub.
3. In the sidebar, open **Reviewers** and select **Copilot**, if available.
4. Wait for the review to appear. Check its findings rather than accepting blindly.
5. Ask Codex: "Read the Copilot review on this PR, fix valid findings, explain any
   disagreement, and rerun the checks. Push fixes to the same branch."
6. Request another review if needed. Inspect the final diff and checks before merging.

Posting `@copilot review` as an ordinary comment is not a substitute for requesting
Copilot through the supported review UI.

## Optional automatic reviews
After a successful manual review, an administrator can inspect repository
**Settings → Rules → Rulesets**. Where supported, create a branch ruleset targeting
`master` and enable **Automatically request Copilot code review**. Review the available
options for new pushes and draft PRs. Labels and availability can vary by plan and
organization policy. Do not enable unrelated restrictions just to request reviews.
This setting lives on GitHub; the Actions workflow only runs checks, not Copilot.

## Troubleshooting
- No Copilot reviewer: check plan eligibility, organization policy, and repository access.
- UI does not load: check browser console/network access to sdk.openui5.org.
- Checks pass but UI breaks: run the browser smoke test; syntax tests cannot verify rendering.
- GitHub cannot access this repo from Codex: update the GitHub connection's allowed repositories.
