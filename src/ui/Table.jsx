import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const tableContext = createContext(null);

export default function Table({ children, columns }) {
  return (
    <tableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </tableContext.Provider>
  );
}

Table.Header = function Header({ children }) {
  const { columns } = useContext(tableContext);
  return (
    <StyledHeader $columns={columns} role="row" as={"header"}>
      {children}
    </StyledHeader>
  );
};

Table.Body = function Body({
  data,
  render,
  children,
  emptyMessage = "No data to show",
}) {
  if (data && render) {
    if (!data.length) return <Empty>{emptyMessage}</Empty>;
    return <StyledBody>{data.map(render)}</StyledBody>;
  }
  return <StyledBody>{children}</StyledBody>;
};

Table.Row = function Row({ children }) {
  const { columns } = useContext(tableContext);

  return (
    <StyledRow $columns={columns} role="row">
      {children}
    </StyledRow>
  );
};

Table.Footer = function TableFooter({ children }) {
  return <Footer>{children}</Footer>;
};

Table.Empty = function TableEmpty({ children }) {
  return <Empty>{children}</Empty>;
};
