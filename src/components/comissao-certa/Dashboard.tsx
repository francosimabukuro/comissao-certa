"use client";

import { useEffect, useState } from "react";
import { Users, Building2, FileText, CreditCard, Plus } from "lucide-react";

interface DashboardProps {
  user: any;
  onNovoAtendimento?: () => void;
}

export default function Dashboard({ user, onNovoAtendimento }: DashboardProps) {
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalImoveis: 0,
    totalAtendimentos: 0,
  });

  useEffect(() => {
    // Carregar estatísticas
    const clientes = JSON.parse(localStorage.getItem(`clientes_${user.id}`) || "[]");
    const imoveis = JSON.parse(localStorage.getItem(`imoveis_${user.id}`) || "[]");
    const atendimentos = JSON.parse(localStorage.getItem(`atendimentos_${user.id}`) || "[]");

    setStats({
      totalClientes: clientes.length,
      totalImoveis: imoveis.length,
      totalAtendimentos: atendimentos.length,
    });
  }, [user.id]);

  // Verificar limite do plano teste
  const isPlanoTeste = user.plano === "teste";
  const limiteAtingido = isPlanoTeste && stats.totalAtendimentos >= 5;

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Painel do Corretor
        </h2>
      </div>

      {/* Botão GRANDE Novo Atendimento */}
      <button
        onClick={onNovoAtendimento}
        disabled={limiteAtingido}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-8 rounded-2xl font-bold text-2xl flex items-center justify-center gap-4 hover:from-green-700 hover:to-green-800 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-10 h-10" />
        Novo Atendimento
      </button>

      {/* Cards de Estatísticas - Botões grandes */}
      <div className="grid grid-cols-1 gap-4">
        <button className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white text-left hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-10 h-10 opacity-80" />
            <p className="text-4xl font-bold">{stats.totalClientes}</p>
          </div>
          <p className="text-xl font-semibold">Clientes</p>
        </button>

        <button className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white text-left hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <Building2 className="w-10 h-10 opacity-80" />
            <p className="text-4xl font-bold">{stats.totalImoveis}</p>
          </div>
          <p className="text-xl font-semibold">Imóveis</p>
        </button>

        <button className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white text-left hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <FileText className="w-10 h-10 opacity-80" />
            <p className="text-4xl font-bold">{stats.totalAtendimentos}</p>
          </div>
          <p className="text-xl font-semibold">Histórico / Relatórios</p>
        </button>

        <button className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white text-left hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <CreditCard className="w-10 h-10 opacity-80" />
          </div>
          <p className="text-xl font-semibold">Planos</p>
        </button>
      </div>

      {/* Texto curto abaixo */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
        <p className="text-gray-700 text-base">
          Registre seus atendimentos em poucos segundos, direto no celular.
        </p>
      </div>
    </div>
  );
}
