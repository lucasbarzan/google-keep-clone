import styled from 'styled-components';
import { Styles as ModalStyles } from 'react-modal';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: calc(100vh - 6.5rem);
  margin-top: 7.3rem;
  background-color: var(--color-background);
  overflow: hidden;
  max-width: ${props => (props.show ? '28rem' : '0rem')};
  transition: max-width 0.12s ease-in-out;

  a {
    text-decoration: none;
    color: var(--color-text-base);
  }

  p {
    margin: auto auto 2rem auto;
    font-family: 'Roboto';
    font-size: 1.4rem;

    a {
      color: var(--color-primary);
      text-decoration: none;
    }
  }

  @media (max-width: 320px) {
    position: absolute;
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

export const modalStyle: ModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(32, 33, 36, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 0,
  },
};
