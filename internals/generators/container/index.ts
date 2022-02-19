/*
 *
 * Container Generator
 *
 */

import { Actions, PlopGeneratorConfig } from 'node-plop';
import path from 'path';

import { pathExists } from '../utils';
import { baseGeneratorPath } from '../paths';

export enum ContainerProptNames {
  'containerName' = 'containerName',
}

type Answers = { [P in ContainerProptNames]: string };

export const rootStatePath = path.join(__dirname, '../../../src/types/RootState.d.ts');
export const rootReducerSagaPath = path.join(__dirname, '../../../src/store/rootReducerSaga.ts');

export const containerGenerator: PlopGeneratorConfig = {
  description: 'Add a container',
  prompts: [
    {
      type: 'input',
      name: ContainerProptNames.containerName,
      message: 'What should it be called?',
    },
  ],
  actions: data => {
    const answers = data as Answers;

    const containerPath = `${baseGeneratorPath}/containers/{{properCase ${ContainerProptNames.containerName}}}`;
    const actualContainerPath = `${baseGeneratorPath}/containers/${answers.containerName}`;
    const slicePath = `${baseGeneratorPath}/containers/${answers.containerName}/slice`;

    if (pathExists(actualContainerPath)) {
      throw new Error(`Container '${answers.containerName}' already exists`);
    }

    const actions: Actions = [];
    actions.push({
      type: 'add',
      path: `${containerPath}/index.tsx`,
      templateFile: './container/index.tsx.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: `${containerPath}/loadable.tsx`,
      templateFile: './container/loadable.tsx.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: `${slicePath}/index.ts`,
      templateFile: './container/index.ts.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: `${slicePath}/selectors.ts`,
      templateFile: './container/selectors.ts.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: `${slicePath}/types.ts`,
      templateFile: './container/types.ts.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: `${slicePath}/saga.ts`,
      templateFile: './container/saga.ts.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: `${rootStatePath}`,
      pattern: /(\/\/ GENERATE NEW CONTAINER STATE ABOVE, DO NOT DELETE IT)/g,
      templateFile: './container/state/importContainerState.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: `${rootStatePath}`,
      pattern: /(\/\/ GENERATE NEW REDUCER KEY ABOVE, DO NOT DELETE IT)/g,
      templateFile: './container/state/appendRootState.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: `${rootReducerSagaPath}`,
      pattern: /(\/\/ GENERATE NEW IMPORT ABOVE, DO NOT DELETE IT)/g,
      templateFile: './container/slice/importSlice.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: `${rootReducerSagaPath}`,
      pattern: /(\/\/ GENERATE NEW SLICE ABOVE, DO NOT DELETE IT)/g,
      templateFile: './container/slice/appendSlice.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'prettify',
      data: { path: `${actualContainerPath}/**` },
    });
    return actions;
  },
};
