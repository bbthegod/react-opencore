import { Actions } from 'node-plop';
import path from 'path';
import { componentExists } from '../utils';

export enum ComponentProptNames {
  'ComponentName' = 'ComponentName',
  'wantLoadable' = 'wantLoadable',
}
const componentsPath = path.join(__dirname, '../../../src/app/components');

export const componentGenerator = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: ComponentProptNames.ComponentName,
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantLoadable,
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: (data: { [P in ComponentProptNames]: string }) => {
    const containerPath = `${componentsPath}/{{properCase ${ComponentProptNames.ComponentName}}}`;

    const actions: Actions = [
      {
        type: 'add',
        path: `${containerPath}/index.tsx`,
        templateFile: './component/index.tsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${containerPath}/Loadable.ts`,
        templateFile: './component/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${componentsPath}/${data.ComponentName}/**` },
    });

    return actions;
  },
};
