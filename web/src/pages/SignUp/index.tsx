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
import api from '../../services/api';

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.createUser({
          email: data.email,
          password: data.password,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Agora é só entrar na plataforma.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro. Cheque seus dados.',
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
      <h1>Criar uma conta</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="email" type="text" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Button type="submit" loading={isLoading}>
          Cadastrar
        </Button>
      </Form>
      <Link to="/login">Já tenho uma conta</Link>
    </Container>
  );
};

export default SignUp;
