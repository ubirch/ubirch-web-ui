# ubirch-web-ui
ubirch web based user interface
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

## Preparation for Different Tenants

### Keycloak configuration

For each tenant we have to create a new tenant realm in the keycloak 
and connect it with the ubirch-2.0 centralised login realm (for single sign on).

A script in the keycloak/realm-templates folder can create the import files for that. 
Call create-new-tenant-realm4import.sh with the following parameters:

1. the name of the tenant realm
2. the server url with protocol and port if needed
    
Example:

     ./create-new-tenant-realm4import.sh test-tenant-realm http://localhost:8080

It will create two files:
 * <REALM_NAME>-import.json
 * <REALM_NAME>-connector-import.json
 
TODO:

1. in your keycloak instance create a new realm from file <REALM_NAME>-import.json
2. in your ubirch-2.0 realm create a new client from file <REALM_NAME>-connector-import.json 
to connect your ubirch-2.0 realm with your new realm in your keycloak instance for single sign on
3. regenerate a new secret for the connector client in ubrich-2.0 realm
4. add this secret to OpenId Connect Config of the IdentityProvider in your new tenant realm

You also have to regenerate a new secret for the ubirch-2.0-user-access client in the new tenant realm:
Add this secret to the environment settings of the app (see next section)


### Tenant Resources

For each tenant create a folder with the tenants name in the ./resources/clients folder with the following structure:

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

## Device Types

To Add a new device type for a tenant:

* create a new group in tenant realm of keycloak with name <DEVICE_TYPE>_DeviceConfigGroup
* add an attribute with key "attributesDeviceGroup" to the new group
* value of attribute "attributesDeviceGroup" is JSON in the following structure (about icons, see below):


    { "type": "<DEVICE_TYPE>",
      "name": "<DEVICE_TYPE_NAME>",
      "iconId": "<NAME_OF_IONICON>"
    }     

### Adding your own deviceType icons

There are two possibilities:

1. You can use any ionicon from: https://ionicons.com 
 -> you add the name of the ionicon to the property "iconId" of the device type


    { "type": "light_sensor",
      "name": "Lichtsensor",
      "iconId": "lamp"
    }     

2. You can add your own svg icon
 -> add the icon into your resources folder under "assets/icons/" 
and add the filename to the property "iconFileName" of the device type


       { "type": "default_type",
         "name": "Sensor",
         "iconFileName": "default_sensor.svg"
       }


Run preprocessor shell script to copy environment files, assets - images, icon,... - and the theme folder 
from resources folder to src folder (as a preparation to serve, build or deploy the project):

```
    ./preprocess4client.sh <CLIENT_NAME>
```

## Run App locally

### Test in Web Browser

Enter the root directory and call the run-local script:

without parameter the app is started with the test-realm tenant configuration
(requires the keycloak running on localhost:8080 with realm "test-realm" existing)

```
    ./run-local.sh
```

If you want to start another tenant configuration append the name of the tenant from resources folder

Example:

```
    ./run-local.sh ubirch-default-realm
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
