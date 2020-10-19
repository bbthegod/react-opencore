import { Actions } from 'node-plop';
import path from 'path';
import { containerExists } from '../utils';

export enum ContainerProptNames {
  'ComponentName' = 'ComponentName',
  'wantHeaders' = 'wantHeaders',
  'wantReduxSaga' = 'wantReduxSaga',
  'wantLoadable' = 'wantLoadable',
}

const containersPath = path.join(__dirname, '../../../src/app/containers');
const rootStatePath = path.join(__dirname, '../../../src/types/RootState.ts');

export const containerGenerator = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: ContainerProptNames.ComponentName,
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return containerExists(value)
            ? 'A container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: ContainerProptNames.wantHeaders,
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: ContainerProptNames.wantReduxSaga,
      default: true,
      message: 'Do you want a redux-saga for this container?',
    },
    {
      type: 'confirm',
      name: ContainerProptNames.wantLoadable,
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: (data: { [P in ContainerProptNames]: string }) => {
    const containerPath = `${containersPath}/{{properCase ${ContainerProptNames.ComponentName}}}`;

    const actions: Actions = [
      {
        type: 'add',
        path: `${containerPath}/index.tsx`,
        templateFile: './container/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantReduxSaga) {
      actions.push({
        type: 'add',
        path: `${containerPath}/slice.ts`,
        templateFile: './container/slice.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${containerPath}/selectors.ts`,
        templateFile: './container/selectors.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${containerPath}/types.ts`,
        templateFile: './container/types.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${containerPath}/saga.ts`,
        templateFile: './container/saga.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: `${rootStatePath}`,
        pattern: /(import { .*State } from 'app\/containers\/.*\/types';\n)+/g,
        templateFile: './container/state/importContainerState.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: `${rootStatePath}`,
        pattern: /(.*?: .*State;\n)+/g,
        templateFile: './container/state/appendRootState.hbs',
        abortOnFail: true,
      });
    }
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${containerPath}/Loadable.ts`,
        templateFile: './container/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${containersPath}/${data.ComponentName}/**` },
    });

    return actions;
  },
};
