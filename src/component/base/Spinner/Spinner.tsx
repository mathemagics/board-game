import * as React from 'react';
import {FaSpinner} from 'react-icons/fa';

import {Container} from './Spinner.style';

export const Spinner = () => {
  return (
    <Container>
      <FaSpinner />
    </Container>
  );
};
