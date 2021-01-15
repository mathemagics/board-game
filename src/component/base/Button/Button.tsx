import React from 'react';

import {Container} from './Button.style';

export const Button: React.FC = ({children, ...rest}) => (
  <Container {...rest}>{children}</Container>
);
