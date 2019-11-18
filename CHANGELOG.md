# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- things state:
  * add things state to deviceStubs and display state on things list
  * display state on things list as spark line
- verification tree: add action
  * open verification window when user clicks on blockchain node
  * check if hash is successfully anchored in blockchain: show different upp icons depending on if anchored or not
  * display timestamp areas around upper and lower blockchain anchors
  * replace icons with designed ones

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
