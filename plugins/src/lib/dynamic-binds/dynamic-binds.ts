import { PromiseExecutor } from '@nx/devkit';
import { DynamicBindsExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<DynamicBindsExecutorSchema> = async (
  options
) => {
  console.log('Executor ran for DynamicBinds', options);
  return {
    success: true,
  };
};

export default runExecutor;
