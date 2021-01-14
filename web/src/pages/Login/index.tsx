import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Logo from '../../assets/logo.png';
import { Container } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setIsLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string()
            .min(6, 'A senha deve ter pelo menos 6 dígitos')
            .required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/');
      } catch (err) {
        console.log(err);

        setIsLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login. Cheque seus dados.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Link to="/">
        <img id="logo" src={Logo} alt="Google Keep Clone Logo" />
      </Link>
      <h1>Entrar</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="email" type="text" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <Button type="submit" loading={isLoading}>
          Entrar
        </Button>
      </Form>
      <Link id="forgot-password" to="/forgot-password">
        Esqueci minha senha
      </Link>
      <Link id="signup" to="/signup">
        Quero criar uma conta
      </Link>
    </Container>
  );
};

export default Login;
