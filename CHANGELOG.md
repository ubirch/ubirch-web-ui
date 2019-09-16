# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- handle failed bulk creation of devices
   * display list of devices with creation state if returned
   * handle e.g. http-404 error with toast
- device list filter
- add spinner while loading data
- adapt ui design

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
