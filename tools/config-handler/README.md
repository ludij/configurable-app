# config-handler

The config-handler tool is an NX executor plugin and manages which components and elements are exported through the alias-resolver by updating the export paths based on a configuration file. This makes it possible to build multiple variants of one app, without changing any import statements.

## Execute

Run `nx run config-handler:configure --config={config-folder}` to execute the plugin. Replace `{config-folder}` with the folder name of your desired configuration.

## Building

Run `nx build config-handler` to build the library.

## Running unit tests

Run `nx test config-handler` to execute the unit tests via [Jest](https://jestjs.io).
