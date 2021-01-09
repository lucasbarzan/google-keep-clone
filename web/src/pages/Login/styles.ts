import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 4rem;
    height: 4rem;
    margin-bottom: 2rem;
  }

  > h1 {
    font-size: 2rem;
    color: var(--color-text-logo);
    line-height: 24px;
    margin-bottom: 2rem;
  }

  form {
    width: 34rem;
    text-align: center;
  }
`;
