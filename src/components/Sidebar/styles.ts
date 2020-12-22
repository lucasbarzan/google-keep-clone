import styled from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: calc(100vh - 8rem);
  margin-top: 0.8rem;

  overflow: hidden;
  max-width: ${props => (props.show ? '28rem' : '0rem')};
  transition: max-width 0.12s ease-in-out;

  p {
    margin: auto 0 1rem 2.4rem;
    font-family: 'Roboto';
    font-size: 1.4rem;

    a {
      color: var(--color-primary);
      text-decoration: none;
    }
  }
`;

interface SidebarItemProps {
  selected?: boolean;
}

export const SidebarItem = styled.div<SidebarItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  padding-left: 1.2rem;
  background-color: ${props =>
    props.selected ? 'var(--color-primary-light)' : 'transparent'};
  border-radius: 0 2.5rem 2.5rem 0;
  cursor: pointer;

  svg {
    fill: var(--color-icon-base);
    margin: 0 1.2rem;
  }

  span {
    margin-left: 2rem;
    margin-right: 1rem;
    font-size: 1.4rem;
    font-family: 'Roboto';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: ${props =>
      props.selected ? 'var(--color-primary-light)' : '#f1f3f4'};
  }
`;
