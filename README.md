# UBIRCH WEB UI

Web frontend for managing your ubirch devices

## Used Versions

* [Angular: 8.1.3](https://angular.io/)
* [Angular CLI: 8.1.3](https://cli.angular.io/)
* [ionic/angular-toolkit: 6.2.2](https://ionicframework.com)

## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/)
* [ionic framework](https://ionicframework.com/getting-started):


        npm install -g ionic

## Preparation for Different Tenants

If you need to create the ubirch 2.0 central login realm, see at the end of this ReadMe.

### Keycloak configuration

For each tenant we have to create a new tenant realm in the keycloak 
and connect it with the ubirch-2.0 centralised login realm (for single sign on).

A script in the root folder can create the import files for that. 
Call create-new-tenant-realm4import.sh with the following parameters:

1. the name of the tenant realm
2. the server url with protocol and port if needed
3. the web app url of the ubirch web ui with protocol and port if needed
    
Examples:

     ./create-new-tenant-realm4import.sh test-tenant-realm http://localhost:8080 http://localhost:9101
     
     ./create-new-tenant-realm4import.sh ubirch-default-realm https://id.dev.ubirch.com https://console.dev.ubirch.com

It will create two files:
 * <REALM_NAME>-import.json
 * <REALM_NAME>-connector-import.json
 
TODO:

1. in your keycloak instance create a new realm from file <REALM_NAME>-import.json
1. in your ubirch-2.0 realm create a new client from file <REALM_NAME>-connector-import.json 

1. To connect your ubirch-2.0 realm with your new realm in your keycloak instance for single sign on
    1. regenerate a new secret for the connector client in ubrich-2.0 realm
    1. add this secret to OpenId Connect Config of the IdentityProvider in your new tenant realm

1. You also have to regenerate a new secret for the ubirch-2.0-user-access client in the new tenant realm:
Add this secret to the environment settings of the app (see next section)

#### JWT activation
Check JWT set - Call:


    https://<SERVER_URL>/auth/realms/ubirch-default-realm/protocol/openid-connect/certs
    
   Check if this contains part like this (important: starts with "kid": and contains "ES256"):
    

    {"kid":"Dwk8zeyJ9NN5eHsJNYXLVx5BT6Vm_CHFPeHMZfzWzTE","kty":"EC","alg":"ES256","use":"sig","crv":"P-256","x":"w2uHSuiDtRleMDWLSakPBuA_sgd_a8KVoWK7Pl2BN40","y":"UY61aOUXYJ_tIsMaXE72vGqA_zds1lTBO09wDi8p07E"}

   If not you need to create JWT manually (see documentation)
  
#### Settings for Device Authentication
For changing the settings for the device authentication edit 
 * in the tenant realm
 * in the group "<TENANT_REALM_NAME>_API_CONFIG_default"
 * in the Attributes tab
 * in the "apiConfig" Attribute
    * the "password" (create e.g. a new UUID)
    * the url to the "keyService"
    * the url to "niomon"
    * the url to send "data" to
    
 Example:
 
    {  "password": "00c13ace-9b6a-4735-8688-1a34728bfe4f",  
       "keyService": "https://key.prod.ubirch.com/api/keyService/v1/pubkey/mpack",
       "niomon": "https://niomon.prod.ubirch.com/",
       "data": "https://data.prod.ubirch.com/v1/msgPack"  }
    

### Tenant Resources

For each tenant create a folder with the tenants name in the ./resources/clients folder with the following structure:

  > 
    > environments
         > environment.ts
         > environment.local.ts
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

### Keycloak Secrets

The Keycloak Secret is no longer needed for this version of the ubirch-web-ui.

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
## Adding additional Blockchains

1. Add icon to

        src/assets/app-icons
    
2. Add icon path to resources/blockchain-settings.json as <code>nodeIcon</code> property
 of the blockchain (see next example)
          
3. Add blockchain explorer test link also to resources/blockchain-settings.json as <code>explorerUrl</code>.
The structure has to be the same as in the blockchain anchor:


        {
          'ethereum-classic': {
                nodeIcon: 'assets/app-icons/Ethereum-Classic_verify_right.png',
                explorerUrl: {
                  testnet: {
                    url: 'https://kottiexplorer.ethernode.io/search?q='
                  },
                  mainnet: {
                    url: 'https://gastracker.io/search?q='
                  }
                }
            },
            'my-blockchain-name': {
                nodeIcon: 'assets/app-icons/my-blockchain-icon.png'
                explorerUrl: {
                  net-name: {
                    url: 'https://my-used-blockchain-explorer/xyz/'
                  }
                }
            }
          }

4. Don't forget to restart app by calling ./run-local.sh or start deployment with right realm settings
 (in this step the constants are copied to the right position)


## Run App locally

### Test in Web Browser

Enter the root directory and call the run-local script:

without parameter the app is started with access to the keycloak on id.dev.ubirch.com with the ubirch-default-realm tenant configuration.

(you do not need to set the keycloak-secrects any more)

```
    ./run-local.sh
```

If you want to start another tenant configuration append the name of the tenant from resources folder

Example:

```
    ./run-local.sh tenant-xy-realm
```

If you want to use a local keycloak, you can add the "local" as second parameter for staging
(requires the keycloak running on localhost:8080 with realm "ubirch-default-realm" existing)

```
    ./run-local.sh ubirch-default-realm local
```

Open in a web browser:

    http://localhost:9101


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

## Deployment

### 

Call:

    ionic build --prod

The code will be generated to folder:

    /www

## ubirch 2.0 central login realm

can be created from keycloak/realm-templates/ubirch_2.0_REALM-export.json:

1. login as administrator in your keycloak instance
2. click 'create a new realm'
3. select keycloak/realm-templates/ubirch_2.0_REALM-export.json as import file
4. create

## Ubirch Widgets

### Ubirch Verification Widget

Documentation how to install Ubirch Verification Widget can be found 
[here](https://github.com/ubirch/ubirch-web-ui/tree/dev/widgets/verification).

Example with documentation how to use it can be found
[here](https://github.com/ubirch/ubirch-verify-widget).

