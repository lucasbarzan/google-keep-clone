import styled from 'styled-components';
import { Styles as ModalStyles } from 'react-modal';

export const Container = styled.div``;

export const Contents = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

interface BarAndNotesProps {
  showSidebar: boolean;
}

export const BarAndNotes = styled.div<BarAndNotesProps>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.showSidebar ? 'calc(100% - 28rem)' : '100%')};
  margin-left: ${props => (props.showSidebar ? '28rem' : '0')};
  margin-top: 6.5rem;
  align-content: center;
  text-align: center;
  transition: margin-left 0.12s ease-in-out;
`;

export const Bar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3.6rem auto;
`;

export const Notes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 85%;
  margin: 2.4rem auto;
  justify-content: center;
  text-align: left;
`;

export const NoNotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > svg {
    margin-bottom: 2rem;
    color: var(--color-icon-light);
  }

  span {
    font-size: 2rem;
    color: var(--color-text-secondary);
    text-align: left;
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
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 0,
    borderRadius: '0.8rem',
  },
};
