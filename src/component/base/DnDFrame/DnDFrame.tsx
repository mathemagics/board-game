import * as React from 'react';
import {StyleSheetManager, withTheme, ThemeProvider} from 'styled-components';
import FrameComponent, {FrameContextConsumer} from 'react-frame-component';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {GlobalStyles} from '../../root/GlobalStyles';

export const DnDFrame = withTheme(({children, theme, ...rest}) => (
  <FrameComponent {...rest}>
    <FrameContextConsumer>
      {({window, document}) => (
        <DndProvider backend={HTML5Backend} context={window}>
          <StyleSheetManager target={document.head}>
            <>
              <GlobalStyles />
              {theme ? (
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              ) : (
                children
              )}
            </>
          </StyleSheetManager>
        </DndProvider>
      )}
    </FrameContextConsumer>
  </FrameComponent>
));
