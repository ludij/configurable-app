# alias-resolver

The alias-resolver tool serves as a generated export layer for components and elements from libraries. It does not contain any implementations itself. Instead, it provides stable alias paths to import from (`@components` and `@elements`).

The config-handler plugin manages which components and elements are exported through this library by updating the export paths based on a configuration file. This makes it possible to build multiple variants of one app, without changing any import statements.
