# Angular 2 in ASP.NET Core 1.0 using Visual Studio Code and TypeScript

## NOTE: NOT FINISHED
 - I found this started template by Fabian Gosebrink: https://github.com/FabianGosebrink/ASPNET-Core-Angular2-StarterTemplate
 - I think it is better for now if I use it

## This is a summary of the tutorial by Mithun Pattankar from http://www.mithunvp.com/angular-2-asp-net-core-visual-studio-code-typescript/
### NOTE: some of the parts of the tutorial are outdated. So this summary might not be exactly the same as the one in the link.

## Step 1: Create ASP.NET Core 1.0 web app using ASPNET Yeoman generator 

### Ensure NPM, Yeoman, Visual Studio Code is installed

#### (from https://docs.npmjs.com/getting-started/installing-node) 
If you're using OS X or Windows, the best way to install Node.js is to use one of the installers from the Node.js download page - https://nodejs.org/en/download/

Test: Run `node -v`

Node comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.
```
npm install npm -g
```

Test: Run `npm -v`

Installing npm manually - For more advanced users. -> The npm module is available for download at https://registry.npmjs.org/npm/-/npm-{VERSION}.tgz.

#### (from http://yeoman.io/learning/)
Yeoman is a generic scaffolding system allowing the creation of any kind of app. It allows for rapidly getting started on new projects and streamlines the maintenance of existing projects.

Yeoman is language agnostic. It can generate projects in any language (Web, Java, Python, C#, etc.)

Yeoman by itself doesn't make any decisions. Every decision is made by generators which are basically plugins in the Yeoman environment. There's a lot of publicly available generators and its easy to create a new one to match any workflow. Yeoman is always the right choice for your scaffolding needs.

Installing yo [and some generators] (using npm)
```
npm install -g yo
```

### Install ASPNET Yeoman generator

```
npm install -g generator-aspnet
```

Recommended reading: https://www.npmjs.com/package/generator-aspnet

### Create ASP.NET Core 1.0 empty web application using Yeoman generator

There are two ways to create ASP.NET Core 1.0 applications using Yeoman generators itself
#### 1. Command line option
```
yo aspnet
```
- a. select Empty Application
- b. name it DemoApp
- c. `cd DemoApp`

#### 2. Visual Studio Code  yo extension option.

- a. Install `yo` extension using the Extensions tab in VS Code or from here - https://marketplace.visualstudio.com/items?itemName=samverschueren.yo
- b. Type `yo`
- c. select `aspnet`
- d. select `* app`
- e. select `Web Application`

### Add Static Files packages and restore

ASP.NET Core 1.0 works on adding packages as needed, add static files package in “project.json” and open Startup.cs class “Configure” method to add following code
```
    "Microsoft.AspNetCore.StaticFiles": "1.0.0",
```
```
public void Configure(IApplicationBuilder app)
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}
```
After adding “StaticFiles” middleware in dependencies of project.json, then click “Restore” to perform DNU restore.

```
dotnet restore
```

### Creating index.html file and run application using lite-server

``` HTML
<head>
   <title>Demo App</title>
</head>
<body>
    <h1>Hello there.. I'm Jboy</h1>
</body>
```
```
dotnet run
```


## Step 2: Create package.json, add Angular 2 and other packages then run npm install

``` JSON
{
    "version": "0.0.0",
    "name": "Angular2AspNetCoreDemo",
    "dependencies": {
        "@angular/common": "2.0.0-rc.1",
        "@angular/compiler": "2.0.0-rc.1",
        "@angular/core": "2.0.0-rc.1",
        "@angular/http": "2.0.0-rc.1",
        "@angular/platform-browser": "2.0.0-rc.1",
        "@angular/platform-browser-dynamic": "2.0.0-rc.1",
        "@angular/router": "2.0.0-rc.1",
        "@angular/router-deprecated": "2.0.0-rc.1",
        "@angular/upgrade": "2.0.0-rc.1",

        "systemjs": "0.19.27",
        "es6-shim": "^0.35.0",
        "reflect-metadata": "^0.1.3",
        "rxjs": "5.0.0-beta.6",
        "zone.js": "^0.6.12",

        "angular2-in-memory-web-api": "0.0.7",
        "bootstrap": "^3.3.6"
    },
    "devDependencies": {
        "typescript": "^1.8.10",
        "gulp": "^3.9.1",
        "path": "^0.12.7",
        "gulp-clean": "^0.3.2",
        "fs": "^0.0.2",
        "gulp-concat": "^2.6.0",
        "gulp-typescript": "^2.13.1",
        "lite-server": "^2.2.0",
        "typings": "^0.8.1",
        "gulp-tsc": "^1.1.5"
    }
}
```

## Step 3: Moving Angular 2 files to wwwroot using Gulp tasks

In ASP.NET Core 1.0 the wwwroot folder acts website root folder, so all static files like scripts, images, CSS etc should be placed this folder.

Now that Angular 2 packages were downloaded into node_modules folder, which contains numerous files. We are not really interested to include them project as well final deployment related files.

With this intention in mind, we will move files from node_modules to wwwroot using GULP tasks. It will automate copying of the files.

The code is provided in following steps, please refer Step 6

## Step 4: Creating TypeScript project using tsconfig.json

> 
tsconfig.json is TypeScript configuration file which does tell compiler what needs to be with TS files.