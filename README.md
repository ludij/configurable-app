# Configurable App

This repository demonstrates how to build multiple variants of a single Angular application using configuration files, without changing any import statements.

The setup uses a dynamic aliasing system to resolve components and elements at build time, allowing you to create variations of one app and swap out elements and components per configuration.

Please note that this is a work in progress and only for demonstration purposes at the moment.

## Project Structure

```
.
├── apps/
│   ├── configurable-app         # Main Angular app
│   └── configurable-app-e2e     # End-to-end testing app
│
├── libs/
│   ├── shared/
│   │   └── ui                # Default (fallback) elements/components
│   └── custom/
│       ├── custom-1          # Custom elements/components variants 1 (overrides)
│       └── custom-2          # Custom elements/components variants 2 (overrides)
│
├── configs/                  # Configuration folders defining which elements/components to use
│
└── tools/
    ├── config-handler        # NX executor that manages alias-resolver tool based on config
    └── alias-resolver        # Generated export layer to resolve elements/components aliases
```

## How It Works

The app (`configurable-app`), elements and components always imports elements and components via stable aliases `@elements` and `@components`. These aliases point to the `alias-resolver` tool, which exports the actual element and component implementations from libraries.

When running the `config-handler` plugin, it reads a config file and updates the `alias-resolver` tool to resolve to the elements and components accordingly.

## Run tasks

To run the dev server for your app, use:

```sh
npx nx run configurable-app:serve
```

To change the configuration first, and then serve:

```sh
npx nx run configurable-app:serve --config=your-config-folder
```

To change the configuration only:

```sh
npx nx run configure-handler:configure --config=your-config-folder
```

To create a production bundle:

```sh
npx nx run configurable-app:build
```

To see all available targets to run for a project, run:

```sh
npx nx show project configurable-app
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.
