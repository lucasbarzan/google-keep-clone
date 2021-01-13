import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  loading: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: var(--color-primary);
  height: 5.6rem;
  border-radius: 1rem;
  border: 0;
  padding: 0 1.6rem;
  color: #fff;
  width: 100%;
  font-weight: 700;
  margin-top: 1.6rem;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.12, '#ffba00')};
  }

  &:disabled {
    background: ${shade(0.12, '#ffba00')};
    cursor: progress;
  }
`;
