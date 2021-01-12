import styled from 'styled-components';

export const tagOptionIconSize = 12;
export const tagOptionContainerSize = 2.4;

export const optionIconSize = 18;
export const optionContainerSize = 3.6;

interface ContainerProps {
  bodySize: number;
  noteColor: string;
  isModal: boolean;
}

interface NoteAreaProps {
  bodySize: number;
  isModal: boolean;
}

interface TagOptionsProps {
  expand: boolean;
}

interface OptionsProps {
  isModal: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.isModal ? '60rem' : '24rem')};
  min-height: ${props => (props.isModal ? '18rem' : '10rem')};
  max-height: 42rem;
  border: 1px solid ${props => (props.isModal ? 'transparent' : '#e0e0e0')};
  border-radius: 0.8rem;
  margin: ${props => (props.isModal ? '0rem' : '0.4rem')};
  background-color: ${props => props.noteColor};
  box-shadow: ${props =>
    props.isModal
      ? '0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)'
      : ''};

  &:hover {
    box-shadow: ${props =>
      props.isModal
        ? ''
        : '0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 1px 3px 1px rgba(60, 64, 67, 0.149)'};

    #options {
      opacity: 1;
    }
  }
`;

export const NoteArea = styled.div<NoteAreaProps>`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  strong {
    font-family: 'Roboto';
    font-size: 1.6rem;
    font-weight: 700;
    cursor: ${props => (props.isModal ? 'text' : 'default')};
  }

  span {
    font-family: 'Roboto';
    font-size: ${props => (props.bodySize > 100 ? '1.4rem' : '1.8rem')};
    margin-top: 1rem;
    cursor: ${props => (props.isModal ? 'text' : 'default')};
  }
`;

export const TagOptions = styled.div<TagOptionsProps>`
  display: ${props => (props.expand ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  height: 2.4rem;
  width: fit-content;
  max-width: 8rem;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 1.2rem;
  padding: 0.8rem 0rem 0.8rem 0.8rem;
  margin: 1rem;

  > span {
    font-size: 1.1rem;
    font-family: 'Roboto';
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 0.2rem;
  }
`;

export const Options = styled.div<OptionsProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding: 0.4rem;
  opacity: ${props => (props.isModal ? 1 : 0)};
  transition: opacity 0.4s;

  #close {
    display: ${props => (props.isModal ? 'block' : 'none')};
    border: 0;
    border-radius: 0.4rem;
    background-color: transparent;
    margin: 0 0 0 auto;
    padding: 0.8rem 2.4rem;
    font-size: 1.4rem;

    &:hover {
      background-color: rgba(95, 99, 104, 0.039);
    }

    &:active {
      background-color: rgba(95, 99, 104, 0.161);
    }
  }
`;
