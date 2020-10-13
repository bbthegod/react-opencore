import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './component';
import { containerGenerator } from './container';
import shell from 'shelljs';

interface CustomActionData {
  path: string;
  file?: string;
}

export const BACKUPFILE_EXTENSION = 'rbgen';

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as CustomActionData;
    shell.exec(`npm run prettify -- "${data.path}"`, { silent: true });
    shell.exec('npm run prettify -- "src/types/RootState.ts"', {
      silent: true,
    });
    return '';
  });
}
