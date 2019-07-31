# UBIRCH WEB UI

## Used Versions

* [Angular: 7.2.2](https://angular.io/)
* [Angular CLI: 7.3.8](https://cli.angular.io/)
* [ionic/angular-toolkit: 1.5.1](https://ionicframework.com)

## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/)


## Run App locally

### Test in Web Browser

Enter the root directory and call the run-local script

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
