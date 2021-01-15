import * as React from 'react';
import {FaSpinner} from 'react-icons/fa';

import {Container} from './Spinner.style';

export const Spinner: React.FC = () => {
  return (
    <Container>
      <FaSpinner />
    </Container>
  );
};
