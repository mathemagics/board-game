import * as React from 'react';

import {Container, ChildElement} from './SpacedContent.style';

export const SpacedContent = React.forwardRef(
  ({center, children, header = 0, trailer = 0, space = 2, horizontal}, ref) => {
    const count = React.Children.count(children);
    return (
      <Container horizontal={horizontal} center={center} ref={ref}>
        {React.Children.map(children, (child, i) => {
          const isHeader = i === 0;
          const isTrailer = i === count - 1;
          return (
            <ChildElement
              isHeader={isHeader}
              isTrailer={isTrailer}
              header={header}
              trailer={trailer}
              space={space}
              horizontal={horizontal}
            >
              {child}
            </ChildElement>
          );
        })}
      </Container>
    );
  }
);
