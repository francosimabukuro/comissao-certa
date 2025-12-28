"use client";

import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

interface LoginProps {
  onLogin: (user: any) => void;
  onCadastro: () => void;
}

export default function Login({ onLogin, onCadastro }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    // Buscar usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    
    const usuario = usuarios.find(
      (u: any) => u.email === email && u.senha === senha
    );

    if (usuario) {
      onLogin(usuario);
    } else {
      setErro("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
            <LogIn className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Bem-vindo ao Comissão Certa</h1>
          <p className="text-blue-100 text-lg">Registre seus atendimentos e proteja sua atuação profissional como corretor.</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Entrar</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {erro}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-3">Ainda não tem conta?</p>
            <button
              onClick={onCadastro}
              className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Criar Conta
            </button>
          </div>
        </div>

        {/* Texto abaixo do cadastro */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-sm text-center">
          <p className="leading-relaxed">
            O Comissão Certa registra atendimentos imobiliários com data, hora e confirmação do cliente.
            Não substitui contratos nem garante pagamento de comissão.
          </p>
        </div>
      </div>
    </div>
  );
}
