import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface CircularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<IconBaseProps>;
  iconSize?: number;
  containerSize?: number;
  hoverColor?: string;
  visibility?: string;
}

const CircularButton: React.FC<CircularButtonProps> = ({
  icon: Icon,
  iconSize = 24,
  containerSize = 4.8,
  hoverColor = '#f0f0f0',
  visibility = 'visible',
}) => {
  return (
    <Container
      containerSize={containerSize}
      hoverColor={hoverColor}
      type="button"
      visibility={visibility}
    >
      {Icon && <Icon size={iconSize} />}
    </Container>
  );
};

export default CircularButton;
