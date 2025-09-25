import { ExecutorContext } from '@nx/devkit';

import { ConfigHandlerExecutorOptions } from './schema';
import runExecutor from './config-handler';

const options: ConfigHandlerExecutorOptions = {
  config: 'default-config',
};
const context: ExecutorContext = {
  root: '',
  projectName: 'jest-test',
  cwd: process.cwd(),
  isVerbose: false,
  projectGraph: {
    nodes: {},
    dependencies: {},
  },
  projectsConfigurations: {
    projects: {},
    version: 2,
  },
  nxJsonConfiguration: {},
};

describe('ConfigHandler Executor', () => {
  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
