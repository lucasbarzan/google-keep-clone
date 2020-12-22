import styled from 'styled-components';

export const iconSize = 18;
export const containerSize = 3.6;

export const Container = styled.div`
  min-width: 30rem;
  padding: 2rem;
  overflow: scroll;

  svg {
    color: var(--color-icon-base);
  }

  strong {
    font-family: 'Roboto';
    font-size: 1.6rem;
  }

  input {
    width: 100%;
    height: 2.5rem;
    margin-right: 1.2rem;
    font-family: 'Roboto';
    font-size: 1.4rem;
    border: 0;
    border-bottom: 1px solid var(--color-text-secondary);
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.2rem;
  }

  > button {
    display: block;
    border: 0;
    border-radius: 0.4rem;
    background-color: transparent;
    margin: 1rem -1rem -1rem auto;
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

export const TagItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;

  span {
    width: 100%;
    font-family: 'Roboto';
    font-size: 1.4rem;
    margin: 0 0.6rem;
    padding: 0.2rem 0;
    border-bottom: 1px solid transparent;

    &:focus {
      border-bottom: 1px solid var(--color-text-secondary);
    }
  }
`;
