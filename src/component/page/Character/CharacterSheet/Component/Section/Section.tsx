import * as React from 'react';

import {
  Container, Title, Label, HorizontalRule,
} from './Section.style';

interface SectionProps {
  title: string,
  children: React.ReactNode,
}

export default ({title, children}: SectionProps) => (
  <Container>
    <Title>
      <HorizontalRule />
      <Label>{title}</Label>
      <HorizontalRule />
    </Title>
    <div>{children}</div>
  </Container>
);
