import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasFocusedBefore: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f1f3f4;
  border-radius: 0.8rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  max-width: 72rem;
  height: 4.6rem;
  border: 1px solid transparent;
  box-shadow: 0;
  transition: box-shadow 0.2s;

  ${props =>
    props.isFocused &&
    css`
      background-color: #ffffff;
      box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
        0 1px 3px 1px rgba(65, 69, 73, 0.15);
    `}

  > input {
    border: 0;
    background-color: transparent;
    font-size: 1.5rem;
    width: 100%;
    height: 4.8rem;
    padding: 1.1rem 0;
    margin-left: 0.8rem;
  }
`;
