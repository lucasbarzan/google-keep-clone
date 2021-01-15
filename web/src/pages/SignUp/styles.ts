import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  #logo {
    width: 8rem;
    height: 8rem;
    margin-bottom: 2.4rem;
  }

  > h1 {
    font-size: 2.4rem;
    color: var(--color-text-logo);
    line-height: 24px;
    margin-bottom: 2.4rem;
  }

  form {
    width: 80%;
    max-width: 34rem;
    text-align: center;
    margin-bottom: 3.2rem;
  }

  > a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 700;
  }
`;
