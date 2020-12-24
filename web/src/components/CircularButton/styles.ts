import styled from 'styled-components';

interface ContainerProps {
  containerSize: number;
  visibility: string;
}

export const Container = styled.button<ContainerProps>`
  width: ${props => props.containerSize}rem;
  height: ${props => props.containerSize}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-icon-base);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  visibility: ${props => props.visibility};

  svg {
    color: #202124;
  }

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }
`;
