import * as React from 'react';

import {Container} from './Label.style';

export const Label: React.FC = ({children, ...rest}) => {
  return <Container {...rest}>{children}</Container>;
};
