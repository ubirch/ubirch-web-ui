# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- tenant profile form
- change user account to become a pro user
- token management
  * token revocation
- token handling in verification widget
- verify signature in verification widget

## [0.9.0] - 2021-11-03

### Added

### Changed
- UNG-3487 - fixed: verification via widget for testkits was broken on demo and prod (stage was hard coded set to 'dev')

### Removed

## [0.8.8] - 2021-01-12

### Added
- verification widget
  * added flag NO_LINK_TO_CONSOLE to avoid opening the ubrich web ui from widget on mobile devices

### Changed
- token management
  * adjusted datepicker for Desktop use
- fixed alert size

### Removed

## [0.8.7] - 2020-12-17

### Added
- token management
  * added token area, opened from main menu
  * create new token
  * list of all tokens
  * every token in the list is displayed with:
    + button to copy token id to clipboard
    + button to open Token QRCode Popup

### Changed
- fixed: link to console of stage in keycloak login header

### Removed
- Deactivate Tenant Profile temporarily

## [0.8.6] - 2020-12-15

### Added

### Changed
- internationalisation
  * replaced icon
- fixed missing language string if things search is empty
- keycloak theme with dynamic console link on login template

### Removed

## [0.8.5] - 2020-11-30

### Added
- internationalisation
  * added language select button to switch between English and German
  * added German translation
  * browser language is detected and used initially

### Changed

### Removed

## [0.8.4] - 2020-11-20

### Added
- verification widget
    * added property OPEN_CONSOLE_IN_SAME_TARGET (needed for clean integration of widget in webUI console)

### Changed

### Removed

## [0.8.3] - 2020-11-20

### Added

### Changed

### Removed
- keycloak secret is not needed any more because web frontends should always use public keycloak client for authentication
- removed test-realm resource settings (not used any more)

## [0.8.2] - 2020-11-17

### Added
- added translation branch

### Changed
- fixed: auto focus of searchbars on verification tab and things list page
- fixed: styling hazzle with info text and quick info on verification page

### Removed

## [0.8.1] - 2020-11-12

### Added
- integrate verificaiton widget in accordion to ThingsData tab
- added tenant profile
    * added tab
    * tab only visible for pro users
    * if user has a pro account and didn't fill out tenant profile form she cannot access the rest of the webUI console
    * TODO: tenant form
- verification widget
    * new public function formatJSON: prepares JSON (by sort and trim) for anchoring hash generation

### Changed
- optimize spinner
- fixed: added bloxberg icon to verification widget webpack config
- fixed: fixed timestamp format on verification tab to a science compatible format

### Removed

## [0.8.0] - 2020-10-19

### Added
- verification quick info
- integration of anchoring with individual blockchain anchoring intervals into verification graph view
- added ThingsData tab to things details, only visible for things with tag "testkit"
- new tab for last hash (upp) with button openVerification of hash
- display current device on verification page if set by query param in a special header
- integrate ngx-translate
- added spinner/loader service
- new blockchain bloxberg integrated
- verification widget
    * english version
    * Added option to highlight whole page red or green after verification
     (integration of widget into digitales-corona-gesundheitszertifikat page)
- keycloak
    * initial ubirch-CI theme created
- angular and Ionic upgrade
    * upgrade to angular10
    * upgrade to Ionic5 
    * uninstall ngx-chips because incompatible with new Ionic/Angular versions
    * create new component tag-list-input for replacement of ngx-chips

### Changed
- delete button in things list and in things details only available IF thing can be deleted (e.g. NOT for testkit devices)
- fix menu style and ubirch brand for small screens
- fixed: timestamps in verification graph have been displayed incorrect
- changed gov-digital settings
- fixed: things list polling wasn't stopped when things details has been opened
- fixed Unit test
- verification widget
    * blockchain icon AND blockchain explorer settings moved from a class constant into a global settings file
    for webUi console verification tab and verification widget
    * form field check only of param CHECK_FORM_FILLED is set to true

### Removed
- removed secondaryIndex from BEDevice

## [0.7.0] - 2020-07-27

### Added
- display device tags via ngx-chips control in creation of devices and in device settings
- verification widget
    * added new class UbirchFormVerification with additional functions for form handling 
    * added test hash algorythm selection to verification page
    * added optional parameter to set separator for params explicitly
    

### Changed

### Removed
- removed ngx-chips for tags from creation of new devices because of bad UX

## [0.6.2] - 2020-06-16

### Added

- verification widget
    * setup that the verification widget gets deployed during console deployment
    * setup that the verification widget can be used from ubirch website
    * added input fields for testing verification to widget index.html page

### Changed

### Removed

## [0.6.1] - 2020-06-09

### Added
- Unit tests for components, models, services, ...
- claiming process added for devices with imsi
- file import
- testkit support:
    * during claiming of things tags can be defined
    * in device details of testkit things in a new tab a grafana dashboard with data sent by this device
- verification widget
    * set up a webpack sub project for the verification widget
    * generating the verification.js that can be included in other pages to handle verification of a hash
     and display the verification result
    * add link to verification page of the webUI console to verification result, handle hash as url parameter

### Changed

### Removed

## [0.5] - 2019-12-13

### Added

### Changed
Verification Tree:
    * Lower Blockchain Nodes doesn't Overlap Other Nodes any more (shifted lowest master tree node to the left)
    * Timestamps are moved together with Blockchain Nodes

### Removed

## [0.4.9] - 2019-12-12

### Added

### Changed
removed deprecated IONIC attributes

### Removed

## [0.4.8] - 2019-12-12

### Added
- keycloak
    * added test setup to test prod keycloak on localhost

### Changed
- UX
    * Searchbar in Header on full width
    * Fixed problem with too long inputs into verification search bar (maximum height for verified hash set)
    * start verify request when user presses Enter
    * verified hash and search hash are still visible after tab change
- Device Details:
    * Fixed Bug: if device cannot be loaded, the device details from last loaded device has been displayed (is reset now)
    * Handle error when device cannot be loaded -> user is routed back to things list and gets an error displayed

### Removed

## [0.4.7] - 2019-12-11

### Added
- Verification
  * open blockchain explorer in separate tab when user clicks on blockchain node
  * add timestamps to blockchain nodes (displayed at the bottom under the blockchain nodes)
  * display coloed areas around upper and lower blockchain anchors
- adapted documentation about realm creation for new tenant

### Changed

### Removed

## [0.4.6] - 2019-12-05

### Added

### Changed
- Verification
    * cytoscape graph is now always rendered without fit and center
    * BUT on changing between areas (home <-> verfication <-> things) zoom factor and pan position will be restored

### Removed

## [0.4.5] - 2019-11-29

### Added
- Verification
    * added a text view which displays the respond in JSON format
    * remember the inserted and verified hash -> after user switched between tabs (e.g. Verification <-> Home)
     the inserted hash and loaded data is still there
- get version number which is posted on console by app.component from package.json

### Changed

### Removed

## [0.4.4] - 2019-11-25

### Added

### Changed
Fixed Bug: when user logs in after logout the logout page isn't displayed first any more but the dashboard instead;
all other pages are displayed on reload

### Removed

## [0.4.3] - 2019-11-25

### Added
- things state:
  * things states again displayed in things list and things details on state tab
    
    -> states are now loaded separately after current page of things list ist loaded *AND displayed* 
  * errors handles:
    
    - if states request responds with an error "state not available" is displayed (in list and details)
    - same behavior if states are responded in a wrong format
  * "loading states" is displayed while states request is pending

### Changed

### Removed

## [0.4.2] - 2019-11-22

### Added

### Changed

### Removed
- things state:
  * things states are no longer loaded for things list
   (states have been loaded separately after current page of things list ist loaded
    -> doesn't work if states request takes more time than polling interval)

## [0.4.1] - 2019-11-20

### Added

### Changed
- fixed bug: Verification Tree edges missing if master tree is anchored in more than one blockchain
- fixed bug: Verification Tree: Foundation and Master Tree icons missing in Firefox
- Replaced blockchain and upp icons with smaller files (-> 512x512pixels)
- removed labels from most nodes in verification tree

### Removed


## [0.4] - 2019-11-18

### Added
- things state:
  * display colored badges with number of UPPs in the last minute, hour, day in device details > state tab

### Changed

### Removed


## [0.3.6] - 2019-11-18

### Added
- things state:
  * things states are loaded and displayed into things list
   (states are loaded separately after current page of things list ist loaded)

### Changed
- fixed bug: ethereum icon has not been displayed in verification tree

### Removed

## [0.3.5] - 2019-11-15

### Added

### Changed
- fixed bug: try to stop cascading loaders when polling is faster than response

### Removed

## [0.3.4] - 2019-11-15

### Added
- things state:
  * load state of a thing in things details

### Changed

### Removed

## [0.3.3] - 2019-11-13

### Added
- always open console with dashboard after user login 
    
    -> keycloak remembers last opened page => mostly logout page - äh! :(

### Changed

### Removed

## [0.3.2] - 2019-11-13

### Added

### Changed
- fixed bug: error is handled and loader is removed if error occurred on load things list

### Removed

## [0.3.1] - 2019-11-12

### Added

### Changed
- verification tree: simple version showing complete verification tree
- fixed bug: when user searches in things list and search starts during typing (because user types to slow) the spinner
 popped up, the screen was locked and the search lost its focus
 -> solved by no longer displaying a spinner when search is active 

### Removed

## [0.3.0] - 2019-11-07

### Added
- verification tree: first simple version of verification tree

### Changed

### Removed

## [0.2.1] - 2019-11-04

### Added

### Changed
- fixed bug: spinner was shown on every polling -> problems with focus and nerves

### Removed

## [0.2] - 2019-10-25

### Added
- Display List of PubKeys of Thing

### Changed
- added tabs to things details:
  * settings
  * pubKeys

### Removed


## [0.1.4] - 2019-10-02

### Added

### Changed
- fixed bug: unify attribute names: numberDevices, total_device_size, totalItems => numberOfDevices

### Removed
- button 'Change User Profile' removed (out commented) because account management is currently not yet available

## [0.1.2] - 2019-09-27

### Added
- added a real-creation file for creating the ubirch 2.0 central login realm
- added documentation screenshots

### Changed
- fixed bug: apiConfig and deviceConfig attributes has been renamed on REST endpoint
- fixed bug: if user had no devices userAccount creation ran into an endless loop

### Removed

## [0.1.1] - 2019-09-25

### Added
- device list filter
- add device creation date

### Changed

### Removed

## [0.1] - 2019-09-24
First styled functional complete version (just filtering devices list missing)

### Added
- handle failed bulk creation of devices
   * display list of devices with creation state if returned
   * handle e.g. http-404 error with toast
- adapt ui design: styled

### Changed
- renamed several labels in UI:
    * hwDeviceId -> ID
    * device -> thing
    * create -> register 

### Removed
- static device creation date dummy (no creation date displayed currently)

## [0.0.4] - 2019-09-16
### Added
- changelog
- Creation process for new tenant -> create keycoak configuration/import files for new tenant
- theme for ubirch centralised login realm
- device list pagination

### Changed

### Removed

## [0.0.3] - 2019-09-10
### Added
- update existing device

### Changed
- docker properties in environment.prod.ts

### Removed

## [0.0.2] - 2019-09-10
### Added
- keycloak integration for test-realm
- preprocessor to prepare app for special tenant
- general bootstrapping for side menu
- add logout functionality
- added models for devices
- list of own devices (complete)
- load device details
- bulk creation of devices
- handle successful return with list from bulk creation
- delete device with user concern dialog

### Changed
- all devices get the device type default-type

### Removed
- group handling
- device type handling
