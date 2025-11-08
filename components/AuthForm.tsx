
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Modal } from './Modal';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    if (isLogin) {
      login(email);
    } else {
      register(email);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isLogin ? 'Login' : 'Cadastro'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
        <p className="text-sm text-center">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-secondary hover:text-primary ml-1"
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
      </form>
    </Modal>
  );
};
