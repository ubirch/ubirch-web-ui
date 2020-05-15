# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- things state:
  * add things state to deviceStubs and display state on things list
  * display state on things list as spark line
- verification tree: add action
  * check if hash is successfully anchored in blockchain: show different upp icons depending on if anchored or not
  * replace icons with designed ones


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
