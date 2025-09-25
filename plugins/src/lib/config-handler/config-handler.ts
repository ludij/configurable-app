import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import { AppConfig, ConfigHandlerExecutorOptions as ConfigHandlerExecutorOptions } from './schema';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const runExecutor: PromiseExecutor<ConfigHandlerExecutorOptions> = async (
  options: ConfigHandlerExecutorOptions,
  context: ExecutorContext,
): Promise<{ success: boolean }> => {

  if (!context.projectName) {
    console.error(`❌ This executor must be run in a project`);
    return { success: false };
  }

  const configPath = join(context.root, 'configs', options.config, 'config.json');
  if (!existsSync(configPath)) {
    console.error(`❌ Config file not found at: ${configPath}`);
    return { success: false };
  }

  const configJson: AppConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

  const componentExportsPath = join(context.root, 'tools', 'alias-resolver', 'components.ts');
  const elementExportsPath = join(context.root, 'tools', 'alias-resolver', 'elements.ts');

  const componentExports: string[] = [];
  const elementExports: string[] = [];

  Object.entries(configJson).forEach(([alias, path]: [string, string]) => {
    if (alias.endsWith('Component')) {
      componentExports.push(`export { ${alias} } from '${path}';`);
    } else if (alias.endsWith('Element')) {
      elementExports.push(`export { ${alias} } from '${path}';`);
    }
  });

  if (!existsSync(componentExportsPath)) {
    const componentExportsDir = dirname(componentExportsPath);
    if (!existsSync(componentExportsDir)) {
      mkdirSync(componentExportsDir, { recursive: true });
    }
  }
  writeFileSync(componentExportsPath, componentExports.join('\n'));

  if (!existsSync(elementExportsPath)) {
    const elementExportsDir = dirname(elementExportsPath);
    if (!existsSync(elementExportsDir)) {
      mkdirSync(elementExportsDir, { recursive: true });
    }
  }
  writeFileSync(elementExportsPath, elementExports.join('\n'));

  return {
    success: true,
  };

};

export default runExecutor;
