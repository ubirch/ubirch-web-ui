# Ubirch Widgets

## Project structure

- `dist` - folder with Webpack build output
- `index.html` - widgets list page template
- `webpack.config.js` - Webpack configuration file
- `{{widget}}` - widgets' folders, e.g. `verification`
  - `index.ts` - widget entry point
  - `index.html` - widget usage instructions and examples
  - any other files required for the widget

## NPM scripts

### Using with Webpack Dev Server

Run

```
npm run serve:dev
```

or

```
npm run serve:demo
```

or

```
npm run serve:prod
```
...dependently on which environment you are going to use.

### Build

Run

```
npm run build:dev
```

or

```
npm run build:demo
```

or

```
npm run build:prod
```
...dependently on which environment you are going to use.

Widgets will be build into the `./dist` folder. This folder can be safely moved to any other location after the build, accordingly to project needs.

## Distribution folder

Project is building into the `./dist` folder. The folder contains:

- `index.html` - list of all the widgets with demo pages
- `{{widget}}.js` - widgets' files, e.g. `verification.js`
- `{{widget}}.html` - widgets' demo pages, e.g. `verification.html`

Each widget demo page contains an instructions and example of using the widget.

## Envirionments and configurations

- widget could be configured through `environment.{{stage}}.ts` file, e.g. `./verification/environment.demo.ts`.
- each configuration file name should contain _stage_ for which it would be used: `environment.demo.ts`, `environment.dev.ts`, `environment.prod.ts`
- to use Webpack with some stage configuration, you should run it with `--env.STAGE` flag, e.g.:
    ```
    webpack-dev-server --env.STAGE dev
    ```

    ```
    webpack --env.STAGE prod
    ```
- by default, Webpack will run with `demo` stage

### Deploy

On deploy, some values in the environment files could be replaced. Currently, they contains a placeholder like

```
seal_icon_url: '@@UBIRCH_SEAL_ICON_URL@@'
```

...to easily find and change with data you need.

## Adding / removing widgets

To add a widget, you need:

- create widgets folder in the root folder
  - create `index.ts` file inside widget's folder to use it as Webpack module entry point
  - create `index.html` file inside widget's folder to provide instructions and an example of using the widget
  - other files (like environment files, style files etc.) aren't required
- update `webpack.config.js` folder with adding the new entry point into `entry` field and new HTML page with `HtmlWebpackPlugin` in `plugins` field

To remove a widget, you need:

- remove widget folder
- remove widget entry point and HTML file from `webpack.config.js`
