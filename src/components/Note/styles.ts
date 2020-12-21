import styled from 'styled-components';

interface ContainerProps {
  bodySize: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 24rem;
  min-height: 10rem;
  max-height: 42rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  margin: 0.4rem;

  #note {
    display: flex;
    flex-direction: column;
    padding: 2rem;

    strong {
      font-family: 'Roboto';
      font-size: 1.6rem;
      font-weight: 700;
      cursor: default;
    }

    span {
      font-family: 'Roboto';
      font-size: ${props => (props.bodySize > 100 ? '1.4rem' : '1.8rem')};
      margin-top: 1rem;
      cursor: default;
    }
  }

  #options {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: auto;
    padding: 0.4rem;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);

    #options {
      opacity: 1;
    }
  }
`;
