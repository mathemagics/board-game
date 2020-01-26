import styled from 'styled-components';

const HEIGHT = 148;
const WIDTH = 148;
const OUTER_BORDER_RADIUS = 20;
const INNER_BORDER_RADIUS = 10;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  border: 6px solid ${({theme}) => theme.colors.black};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  background-color: ${({theme}) => theme.colors.black};
  color: ${({theme}) => theme.colors.white};
  border-top-left-radius: ${INNER_BORDER_RADIUS}px;
  border-top-right-radius: ${INNER_BORDER_RADIUS}px;

  font-size: ${({theme}) => theme.fontSizes.large}
`;

export const Multiplier = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${({theme}) => theme.fontSizes.xxLarge};
  color: ${({theme}) => theme.colors.grey};
`;
