import * as React from 'react';

import {Container} from './Button.style';

export const Button = ({children, ...rest}) => (
  <Container {...rest}>{children}</Container>
);
