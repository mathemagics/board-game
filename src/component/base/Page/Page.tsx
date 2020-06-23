import * as React from "react";

import { Container } from "./Page.style";

interface PageProps {
  children: React.ReactNode;
}

export default ({ children }: PageProps) => <Container>{children}</Container>;
