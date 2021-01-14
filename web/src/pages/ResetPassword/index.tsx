import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
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

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const queryParams = queryString.parse(useLocation().search);

  const token = queryParams.token as string;

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setIsLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .min(6, 'A senha deve ter pelo menos 6 dígitos')
            .required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await api.resetUserPassword({
          token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso!',
          description: 'Agora é só entrar na plataforma.',
        });

        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao resetar a sua senha. Cheque seus dados.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, history, token],
  );

  return (
    <Container>
      <Link to="/">
        <img id="logo" src={Logo} alt="Google Keep Clone Logo" />
      </Link>
      <h1>Resetar minha senha</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="password_confirmation"
          type="password"
          placeholder="Confirme a nova senha"
        />
        <Button type="submit" loading={isLoading}>
          Salvar nova senha
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
