import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0.8rem 1.2rem;

  > img {
    width: 4rem;
    height: 4rem;
    margin-left: 0.4rem;
  }

  > h1 {
    font-size: 2rem;
    color: var(--color-text-logo);
    line-height: 24px;
    margin-left: 0.75rem;
    margin-right: 2.5rem;
  }

  > form {
    width: 100%;
    max-width: 72rem;
  }
`;
