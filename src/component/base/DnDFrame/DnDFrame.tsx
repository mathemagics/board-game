import * as React from 'react';
import {StyleSheetManager} from 'styled-components';
import FrameComponent, {FrameContextConsumer} from 'react-frame-component';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {GlobalStyles} from '../../root/GlobalStyles';

export const DnDFrame = ({children, ...rest}) => (
  <FrameComponent {...rest}>
    <FrameContextConsumer>
      {({window, document}) => (
        <>
          <StyleSheetManager target={document.head}>
            <DndProvider backend={HTML5Backend} context={window}>
              <GlobalStyles />
              {children}
            </DndProvider>
          </StyleSheetManager>
        </>
      )}
    </FrameContextConsumer>
  </FrameComponent>
);
