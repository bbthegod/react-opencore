import shell from 'shelljs';
import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './component';
import { containerGenerator } from './container';
interface PrettifyCustomActionData {
  path: string;
}

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as PrettifyCustomActionData;
    console.log(`Running: yarn prettify --write ${data.path} && yarn prettify src/types && yarn prettify src/store`);
    shell.exec(`yarn prettify --write ${data.path} && yarn prettify src/types && yarn prettify src/store`, {
      silent: true,
    });
    return '';
  });
}
