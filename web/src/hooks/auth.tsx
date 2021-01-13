import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { AxiosError } from 'axios';
import api from '../services/api';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@KeepClone:token');
    const user = localStorage.getItem('@KeepClone:user');

    if (token && user) {
      api.axiosInstance.defaults.headers.authorization = `Bearer ${token}`;

      api.axiosInstance.interceptors.response.use(
        response =>
          // Return a successful response back to the calling service
          response,
        (error: AxiosError) => {
          // Logout user if token expired
          if (error.response?.status === 401) {
            // SIGN OUT
            localStorage.removeItem('@KeepClone:token');
            localStorage.removeItem('@KeepClone:user');
            setData({} as AuthState);

            return new Promise((resolve, reject) => {
              reject(error);
            });
          }
          // Return any error which is not due to authentication back to the calling service
          return new Promise((resolve, reject) => {
            reject(error);
          });
        },
      );

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { data: loginRes } = await api.login({
      email,
      password,
    });

    const { token, user } = loginRes;

    localStorage.setItem('@KeepClone:token', token);
    localStorage.setItem('@KeepClone:user', JSON.stringify(user));

    api.axiosInstance.defaults.headers.authorization = `Bearer ${token}`;

    api.axiosInstance.interceptors.response.use(
      response =>
        // Return a successful response back to the calling service
        response,
      (error: AxiosError) => {
        // Logout user if token expired
        if (error.response?.status === 401) {
          // SIGN OUT
          localStorage.removeItem('@KeepClone:token');
          localStorage.removeItem('@KeepClone:user');
          setData({} as AuthState);

          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        // Return any error which is not due to authentication back to the calling service
        return new Promise((resolve, reject) => {
          reject(error);
        });
      },
    );

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@KeepClone:token');
    localStorage.removeItem('@KeepClone:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@KeepClone:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
