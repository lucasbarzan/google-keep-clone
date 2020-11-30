import styled from 'styled-components';

interface ContainerProps {
  hoverColor: string;
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

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;
