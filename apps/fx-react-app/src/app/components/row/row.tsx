import React, { ReactNode } from "react";

import styled from "@emotion/styled";

export interface RowProps {
  children: ReactNode;
  justifyContent?: 'flex-end' | 'center';
}

const StyledRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: RowProps) => props.justifyContent || 'flex-start'};
  height: 60px;
  width: 100%;
`;

export const Row = ({ children, ...rest }: RowProps) => (
  <StyledRow {...rest}>{children}</StyledRow>
);
