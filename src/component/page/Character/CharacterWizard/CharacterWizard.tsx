import * as React from 'react';
import {Form} from '@rocketseat/unform';
import {useQuery} from '@apollo/react-hooks';

import CharacterBasic from './CharacterBasic';

import {GET_SPECIES} from './query';

import {SpeciesType} from './type';

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

  // TODO: This will pass data into the wizard.
  // TODO: Probably figure out all initial values here
  // TODO: Handle errors.
  const {loading, error: _error, data} = useQuery(GET_SPECIES);
  const species = data && data.listSpecies.map(
    ({name}: SpeciesType) => ({id: name, title: name}),
  );
  console.log('species data', species);
  const initialValues = {species};
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
          {!loading && (
            <>
              <div>{currentPageData.label}</div>
              <CurrentComponent initialValues={initialValues} />
            </>
          )}
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
