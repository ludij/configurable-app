import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import { AppConfig, ConfigHandlerExecutorOptions as ConfigHandlerExecutorOptions } from './schema';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

// import { Project } from 'ts-morph';


// Resolve the real file that exports a symbol
// function resolveExportedClass(importPath: string, className: string): string | null {
//   const project = new Project();

//   // Map "@shared/ui" to the index.ts path
//   const libBase = importPath.replace(/^@/, 'libs/').replace(/\//g, '/');
//   const indexFilePath = path.resolve(libBase, 'src/index.ts');

//   const sourceFile = project.addSourceFileAtPath(indexFilePath);
//   const exports = sourceFile.getExportedDeclarations();

//   const declaration = exports.get(className)?.[0];
//   if (!declaration) return null;

//   const sourceFilePath = declaration.getSourceFile().getFilePath();

//   // Convert to relative TS import path (and strip .ts)
//   return path
//     .relative(path.resolve('libs/shared/component-aliases/src/lib'), sourceFilePath)
//     .replace(/\.ts$/, '')
//     .replace(/\\/g, '/');
// }

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

  const componentExportsPath = join(context.root, 'libs', 'alias-resolver', 'src', 'components.ts');
  const elementExportsPath = join(context.root, 'libs', 'alias-resolver', 'src', 'elements.ts');

  const componentExports: string[] = [];
  const elementExports: string[] = [];

  Object.entries(configJson).forEach(([alias, path]: [string, string]) => {


    // resolveExportedClass

    if (alias.endsWith('Component')) {
      componentExports.push(`export { ${alias} } from '${path}';`);
    } else if (alias.endsWith('Element')) {
      elementExports.push(`export { ${alias} } from '${path}';`);
    }
  });

  writeFileSync(componentExportsPath, componentExports.join('\n'));
  writeFileSync(elementExportsPath, elementExports.join('\n'));

  return {
    success: true,
  };

};

export default runExecutor;
