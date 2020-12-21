import styled from 'styled-components';

interface ContainerProps {
  expand: boolean;
}

interface OptionsProps {
  expand: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  min-height: 4.6rem;
  border-radius: 0.8rem;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);

  #note-title {
    display: ${props => (props.expand ? 'block' : 'none')};
    width: 100%;
    min-height: 4.6rem;
    border-radius: 0.8rem;
    border: 0;
    font-family: 'Roboto';
    padding: 1.6rem;
  }

  #note-body {
    display: border-box;
    width: 100%;
    height: auto;
    min-height: 4rem;
    max-height: 50rem;
    border-radius: 0.8rem;
    border: 0;
    font-size: ${props => (props.expand ? '1.4rem' : '1.6rem')};
    padding: 1.6rem;
  }

  @media (min-width: 1024px) {
    width: 60rem;
  }
`;

export const Options = styled.div<OptionsProps>`
  display: flex;
  flex-direction: row;
  margin: ${props => (props.expand ? '0.4rem' : '0')};

  button {
    display: ${props => (props.expand ? 'block' : 'none')};
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
