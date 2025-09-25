export interface ConfigHandlerExecutorOptions {
  config: string;
}

export interface AppConfig {
  [componentName: string]: string; // e.g. "Custom1Button": "@custom/custom-1/components"
}
