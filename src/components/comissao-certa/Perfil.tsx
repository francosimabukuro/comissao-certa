"use client";

import { LogOut, User, Mail, Phone, CreditCard, Calendar, Shield, TrendingUp } from "lucide-react";

interface PerfilProps {
  user: any;
  onLogout: () => void;
}

export default function Perfil({ user, onLogout }: PerfilProps) {
  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString("pt-BR");
  };

  const calcularDiasRestantes = () => {
    if (user.plano !== "teste") return null;
    
    const dataInicio = new Date(user.dataInicioPlanao);
    const dataFim = new Date(dataInicio);
    dataFim.setDate(dataFim.getDate() + 7);
    
    const hoje = new Date();
    const diasRestantes = Math.ceil((dataFim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    return diasRestantes > 0 ? diasRestantes : 0;
  };

  const diasRestantes = calcularDiasRestantes();

  return (
    <div className="space-y-4">
      {/* Header com Avatar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.nome}</h2>
            <p className="text-blue-100">CRECI: {user.creci}</p>
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800">Meu Perfil</h2>
      </div>

      {/* Informações do Plano */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Plano Atual</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Plano Ativo</p>
            <p className="text-2xl font-bold text-blue-600">
              {user.plano === "teste"
                ? "Plano Teste"
                : user.plano === "profissional"
                ? "Plano Profissional"
                : "Plano Imobiliária"}
            </p>
          </div>

          {user.plano === "teste" && diasRestantes !== null && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800 mb-1">Período de Teste</p>
              <p className="text-lg font-bold text-amber-900">
                {diasRestantes} {diasRestantes === 1 ? "dia restante" : "dias restantes"}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Membro desde {formatarData(user.dataCadastro)}</span>
          </div>
        </div>

        {user.plano === "teste" && (
          <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            🔼 Alterar Plano
          </button>
        )}
      </div>

      {/* Dados Pessoais */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Dados Pessoais</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Nome</label>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-800 font-medium">{user.nome}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">CRECI</label>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-800 font-medium">{user.creci}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block flex items-center gap-2">
              <Mail className="w-4 h-4" />
              E-mail
            </label>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Celular
            </label>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-800 font-medium">{user.celular}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aviso Legal */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1 text-sm">Aviso Legal</p>
            <p className="text-xs text-blue-800">
              O COMISSÃO CERTA é uma ferramenta de registro de atendimentos imobiliários.
              Não substitui contratos e não garante pagamento de comissão,
              servindo como meio auxiliar de comprovação da atuação profissional.
            </p>
          </div>
        </div>
      </div>

      {/* Botão Sair */}
      <button
        onClick={onLogout}
        className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Sair da Conta
      </button>
    </div>
  );
}
