import * as React from 'react';
import {Form} from '@rocketseat/unform';

import CharacterBasic from './CharacterBasic';

// TODO: Build pages
const Page1 = () => (<div>Playbook</div>);
const Page2 = () => (<div>Page2</div>);
const Page3 = () => (<div>Page3</div>);

// TODO: import pageData
const pageData = [
  {pageNumber: 0, component: CharacterBasic, label: 'Basics'},
  {pageNumber: 1, component: Page1, label: 'page 1'},
  {pageNumber: 2, component: Page2, label: 'page 2'},
  {pageNumber: 3, component: Page3, label: 'Appearance'},
];

export default () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const currentPageData = React.useMemo(
    () => pageData.find((page) => page.pageNumber === currentPage),
    [currentPage],
  );
  const CurrentComponent = currentPageData.component;

  return (
    <Form onSubmit={() => {}}>
      <div>
        <div>
          {pageData.map(({label, pageNumber}) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setCurrentPage(pageNumber)}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          <div>{currentPageData.label}</div>
          <CurrentComponent />
        </div>
      </div>
      <div>
        {currentPage !== 0 && (
          <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
            back
          </button>
        )}
        {(currentPage !== pageData.length - 1) && (
          <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
            next
          </button>
        )}
      </div>
    </Form>
  );
};
