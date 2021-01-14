import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';
import Logo from '../../assets/logo.png';
import { Container } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setIsLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.forgotUserPassword({
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Verifique seu e-mail',
          description: 'Enviamos um link para recuperação da sua senha.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar recuperar sua senha. Cheque seu e-mail.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Link to="/">
        <img id="logo" src={Logo} alt="Google Keep Clone Logo" />
      </Link>
      <h1>Esqueci minha senha</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input autoFocus name="email" type="text" placeholder="E-mail" />
        <Button type="submit" loading={isLoading}>
          Recuperar
        </Button>
      </Form>
      <Link to="/login">Me lembrei!</Link>
    </Container>
  );
};

export default ForgotPassword;
