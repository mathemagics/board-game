import * as React from 'react';

import {Container, ChildElement} from './SpacedContent.style';

interface SpacedContentProps {
  children: React.ReactNode;
  center?: boolean;
  grow?: boolean;
  header?: number;
  horizontal?: boolean;
  space?: number;
  trailer?: number;
}

export const SpacedContent = React.forwardRef<
  HTMLDivElement,
  SpacedContentProps
>(
  (
    {center, children, grow, header = 0, trailer = 0, space = 2, horizontal},
    ref
  ) => {
    const count = React.Children.count(children);
    return (
      <Container horizontal={horizontal} center={center} ref={ref}>
        {React.Children.map(children, (child, i) => {
          const isHeader = i === 0;
          const isTrailer = i === count - 1;
          return (
            <ChildElement
              grow={grow}
              header={header}
              horizontal={horizontal}
              isHeader={isHeader}
              isTrailer={isTrailer}
              space={space}
              trailer={trailer}
            >
              {child}
            </ChildElement>
          );
        })}
      </Container>
    );
  }
);
