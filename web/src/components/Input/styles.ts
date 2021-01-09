import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f1f3f4;
  border-radius: 0.8rem;
  padding: 0 1rem;
  width: 100%;
  max-width: 72rem;
  height: 4.6rem;
  border: 1px solid transparent;
  box-shadow: 0;
  transition: box-shadow 0.2s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.8rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--color-primary);
      border-color: var(--color-primary);
      background-color: #ffffff;
      box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
        0 1px 3px 1px rgba(65, 69, 73, 0.15);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--color-primary);
    `}

  input {
    flex: 1;
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    width: 100%;
    height: 4.8rem;
    padding: 1.1rem 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 1.6rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
