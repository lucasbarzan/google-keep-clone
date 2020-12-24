import styled from 'styled-components';
import { Styles as ModalStyles } from 'react-modal';

export const Container = styled.div``;

export const Contents = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const BarAndNotes = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
