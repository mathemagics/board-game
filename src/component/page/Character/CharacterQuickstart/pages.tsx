import * as React from 'react';

import CharacterBasic from './CharacterBasic';

// TODO: Build pages
const Page2 = () => (<div>Page2</div>);
const Page3 = () => (<div>Page3</div>);

export default [
  {pageNumber: 0, component: CharacterBasic, label: 'Basics'},
  {pageNumber: 1, component: Page2, label: 'Playbook Things'},
  {pageNumber: 2, component: Page3, label: 'Appearance'},
];
