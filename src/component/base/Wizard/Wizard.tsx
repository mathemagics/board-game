import * as React from 'react';

import {PageType} from './type';

interface WizardProps {
  pages: PageType[],
  childProps: any,
}

// TODO abstract character wizard logic here for reuseable wizard
export default ({pages, childProps}: WizardProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const currentPageData = React.useMemo(
    () => pages.find((page) => page.pageNumber === currentPage),
    [currentPage],
  );

  const CurrentComponent = currentPageData.component;

  return (
    <div>
      <div>Wizard!</div>
      <div>
        {pages.map(({label, pageNumber}) => (
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
        <CurrentComponent {...childProps} />
      </div>
      <div>
        {currentPage !== 0 && (
          <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
            back
          </button>
        )}
        {(currentPage !== pages.length - 1) && (
          <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
            next
          </button>
        )}
      </div>
    </div>
  );
};
