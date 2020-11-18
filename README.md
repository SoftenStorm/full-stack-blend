# Boilerplate for StackBlend Platform

The purpose of this repository is for forking and being used with StackBlend platform. The forked repository will be your assets under the MIT License ([read more on terms of service, section 2: Use License](https://www.softenstorm.com/stackblend-policy-and-terms)).

Please go to https://www.stackblend.org to get started. Please note that a dedicated GitHub account for StackBlend is recommended while it is underdevelopment.

## Running boilerplate on local machine

You might clone the repository and run it on your local machine for advanced debugging. We recommend to do it, because you can reverse changes or merge conflicts, can change a part of code and see what will be happening, can lint and fix code bugs before deploying, and can install new modules via npm package managing.

1. Signup and Login to GitHub.
2. Create a project and name it.
3. Open a terminal, run "git clone git@github.com:SoftenStorm/boilerplate.git".
4. run "cd boilerplate".
5. run "git remote rename origin boilerplate".
6. run "git remote add origin git@github.com:YOUR_ALIAS/YOUR_PROJECT_NAME.git".
7. run "git checkout -b staging".
8. run "git push --set-upstream origin staging --force".
7. run "git checkout -b develop".
8. run "git push --set-upstream origin develop --force".
9. run "git checkout -b feature/YOUR_NEW_FEATURE_NAME".
10. run "git push --set-upstream origin feature/YOUR_NEW_FEATURE_NAME --force".
11. run "npm install".
12. Please take a note of the new branch name and connect the repository with StackBlend (see the instruction below).
13. From StackBlend editor, click save button to push changes to feature/YOUR_NEW_FEATURE_NAME" including new auto-generated files.
14. From the terminal, run "git reset --hard & git pull".
15. run "npm run build".
16. run "npm run watch".

## Running boilerplate on Heroku

This repository has been designed to be working on Heroku, a cloud platform as a service (PaaS) supporting several programming languages, including Node.js. You may following with these instruction to get it works on Heroku.

1. Signup and Login to Heroku.
2. Create a new pipeline and connect the pipeline to the GitHub account.
3. On the pipeline page, add an app for staging environment.
4. On the app's resource page, create a new add-on "MySQL".
5. On the app's settings page, add a config variable "RELATIONAL_DATABASE_KEY" and assign the key name to its value.
6. Configure an automatic deploy or deploy a staging branch.
7. Please take a note of the running URL.

## Connect the repository with StackBlend

Whatever you are a full-stack engineer or not, StackBlend will helps you cope with front-end, back-end, UI/UX, and content in a single one editor. You may design the user interface right from the editor, configure their properties and data dot notations, link them to fully customizable server-side scripts, and get the results back on the client-side using less than 10 lines of code, where the rests are auto-generated by the editor.

To get started:

1. Signup and Login to StackBlend at https://www.stackblend.org/account/authenticate.
2. Go to Settings at https://www.stackblend.org/account/settings.
3. Connect to a newly created GitHub account (dedicatedly for StackBlend platform).
4. From Organization Or User Alias, enter "YOUR_ALIAS".
5. From Project Name, enter "YOUR_GITHUB_PROJECT_NAME".
6. From Feature Branch, enter "feature/YOUR_NEW_FEATURE_NAME".
7. From Develop Branch, enter "develop".
8. From Staging Branch, enter "staging".
9. From Endpoint, enter "https://localhost".

## Questions?

For any questions, please send an email to [jatupon@softenstorm.com](mailto:jatupon@softenstorm.com).
