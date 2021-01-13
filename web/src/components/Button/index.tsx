import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...rest
}) => (
  <Container loading={loading} disabled={loading} type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
