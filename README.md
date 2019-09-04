# UBIRCH WEB UI

## Used Versions

* [Angular: 7.2.2](https://angular.io/)
* [Angular CLI: 7.3.8](https://cli.angular.io/)
* [ionic/angular-toolkit: 1.5.1](https://ionicframework.com)

## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/)
* [ionic framework](https://ionicframework.com/getting-started):


        npm install -g ionic

## Preparation for Different Clients

For each client create a folder with the clients name in the ./resources/clients folder with the following structure:

  > 
    > environments
         > environment.ts
         > environment.prod.ts
    > assets
         > icon
              > favicon.ico
              > ... add device type icon files here if you wanna use them
         > images
              > logo.svg
              > start_img.svg
         > md
              > description.md
    > theme
         > client_style.scss

If you name the files differently, you have to add the filenames in the properties in environment.ts and environment.prod.ts.

### Adding your own deviceType icons

There are two possibilities:

1. You can use any ionicon from: https://ionicons.com 
 -> you add the name of the ionicon to the property "iconId" of the device type

2. You can add your own svg icon
 -> add the icon into your resources folder under "assets/icons/" 
and add the filename to the property "iconFileName" of the device type

Run preprocessor shell script to copy environment files, assets - images, icon,... - and the theme folder 
from resources folder to src folder (as a preparation to serve, build or deploy the project):

```
    ./preprocess4client.sh <CLIENT_NAME>
```

## Run App locally

### Test in Web Browser

Enter the root directory and call the run-local script
(requires the keycloak running on localhost:8080 with realm "test-realm" existing)

```
    ./run-local.sh
```

### Test on Mobile Device

Install ionic devapp
(from AppStore on your phone or via apk)

Create an account at https://ionicframework.com .

Start the app at your mobile phone and log in.

Add Cordova iOS and Android Platforms

	ionic cordova platform add ios
	ionic cordova platform add android

Sometimes it’s necessary to add also:

	ionic cordova prepare android

Run the App:

	ionic serve --devapp

Important !!!!!! -> you need to be connected via the same WIFI as the computer on which the app is started !!

The devapp scans the network for apps on port 4100 and lists them if found some.
