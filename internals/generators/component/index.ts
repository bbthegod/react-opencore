/*
 *
 * Component Generator
 *
 */

import { Actions, PlopGeneratorConfig } from 'node-plop';

import { pathExists } from '../utils';
import { baseGeneratorPath } from '../paths';

export enum ComponentProptNames {
  componentName = 'componentName',
}

type Answers = { [P in ComponentProptNames]: string };

export const componentGenerator: PlopGeneratorConfig = {
  description: 'Add a component',
  prompts: [
    {
      type: 'input',
      name: ComponentProptNames.componentName,
      message: 'What should it be called?',
    },
  ],
  actions: data => {
    const answers = data as Answers;

    const componentPath = `${baseGeneratorPath}/components/{{properCase ${ComponentProptNames.componentName}}}`;
    const actualComponentPath = `${baseGeneratorPath}/components/${answers.componentName}`;

    if (pathExists(actualComponentPath)) {
      throw new Error(`Component '${answers.componentName}' already exists`);
    }
    const actions: Actions = [
      {
        type: 'add',
        path: `${componentPath}/index.tsx`,
        templateFile: './component/index.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${componentPath}/loadable.tsx`,
        templateFile: './component/loadable.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'prettify',
        data: { path: `${actualComponentPath}/**` },
      },
    ];
    return actions;
  },
};
