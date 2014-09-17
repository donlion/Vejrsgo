Boilerplate NodeJS
==================
This is a new version of frontend build system based on NodeJS. 

### Setup your environment
Follow these steps:
  1. Download and install Git: http://git-scm.com/download/win (**IMPORTANT**: in the "Adjusting your PATH environment" step choose "Use Git from the Windows Command Prompt"). After installation open Cmd and write `git --version` to make sure it's installed correctly.
  2. Download and install NodeJS: http://nodejs.org/ . To make sure NodeJS is installed correctly, open CMD and write `node -v` (should output NodeJS version)
  3. Install Bower: `npm install -g bower`
  5. Install Gulp: `npm install -g gulp`

Your environment is now set up. 

### Setup a frontend project
Every NodeJS frontend project will **NOT** contain any dependencies in source control, therefore you will have to get them yourself, but it's a piece of cake :)

In order to get Bower dependencies (ie. vendors like Foundation, jQuery, AngularJS, etc.) do the following:
  1. Navigate to project's `src/` dir in Cmd
  2. Run `bower install`
  3. After couple of moments you should see `bower_components/` directory with dependencies in it.

In order to get NodeJS modules (for building the project), do the following:
  1. Navigate to project's `src/` dir in Cmd
  2. Run `npm install`
  3. After couple of moments you should see `node_modules/` directory with modules in it.

That's it!

#### Useful commands
**Build:** `gulp build` (builds the project and creates `resources/` dir under the project's root). 

**Package:** `gulp package` (runs `build` + produces minified app.min.js and app.min.css).

#### Notes
Directories `src/bower_components`, `src/node_modules` and `resources/` shall and will **NOT** be included in Visual Studio project. Which means that every developer will have to get all the dependencies from their sources and build the frontend project himself.

