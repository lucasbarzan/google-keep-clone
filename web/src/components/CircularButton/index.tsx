import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface CircularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<IconBaseProps>;
  iconSize?: number;
  containerSize?: number;
  hoverColor?: string;
  visibility?: string;
  onClick?: () => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({
  icon: Icon,
  iconSize = 24,
  containerSize = 4.8,
  visibility = 'visible',
  onClick,
}) => {
  return (
    <Container
      containerSize={containerSize}
      type="button"
      visibility={visibility}
      onClick={onClick}
    >
      {Icon && <Icon size={iconSize} />}
    </Container>
  );
};

export default CircularButton;
