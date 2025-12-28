"use client";

import { useState } from "react";
import { Check, Crown, Sparkles, Building } from "lucide-react";

interface PlanosProps {
  user: any;
}

export default function Planos({ user }: PlanosProps) {
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState("");

  const handleAssinar = (plano: string, valor: number) => {
    if (plano === "imobiliaria") {
      alert("Plano Imobiliária em breve! Aguarde novidades.");
      return;
    }

    setPlanoSelecionado(plano);
    setProcessandoPagamento(true);

    // Simular processamento de pagamento
    setTimeout(() => {
      // Atualizar plano do usuário
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const usuarioAtualizado = usuarios.map((u: any) => {
        if (u.id === user.id) {
          return {
            ...u,
            plano: plano,
            dataInicioPlanao: new Date().toISOString(),
          };
        }
        return u;
      });

      localStorage.setItem("usuarios", JSON.stringify(usuarioAtualizado));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, plano: plano })
      );

      setProcessandoPagamento(false);
      alert(`Parabéns! Você agora está no ${plano === "profissional" ? "Plano Profissional" : "Plano Imobiliária"}!`);
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Escolha seu Plano</h2>
      </div>

      {/* Plano Teste */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-green-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-800">🟢 Plano Teste</h3>
          </div>
          <p className="text-gray-700 mb-1">Gratuito por 7 dias</p>
          <p className="text-gray-600 text-sm">Até 5 atendimentos registrados</p>
        </div>

        <div className="p-6">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Até 5 atendimentos</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Cadastro de clientes e imóveis</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Confirmação digital</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Histórico de atendimentos</span>
            </li>
          </ul>

          {user.plano === "teste" ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-semibold">Plano Ativo</p>
            </div>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              🔘 Usar plano teste
            </button>
          )}
        </div>
      </div>

      {/* Plano Profissional */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-500">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">🔵 Plano Profissional</h3>
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mb-1">R$ 49,90 / mês</p>
        </div>

        <div className="p-6">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 font-semibold">✔ Atendimentos ilimitados</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">✔ Histórico completo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 font-semibold">✔ Relatórios de comprovação</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Clientes e imóveis ilimitados</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Confirmação digital</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Suporte prioritário</span>
            </li>
          </ul>

          {user.plano === "profissional" ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-semibold">Plano Ativo</p>
            </div>
          ) : (
            <button
              onClick={() => handleAssinar("profissional", 49.9)}
              disabled={processandoPagamento}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50"
            >
              {processandoPagamento && planoSelecionado === "profissional"
                ? "Processando..."
                : "🔘 Assinar agora"}
            </button>
          )}
        </div>
      </div>

      {/* Plano Imobiliária */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden opacity-75">
        <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">⚪ Plano Imobiliária</h3>
            <Building className="w-6 h-6" />
          </div>
          <p className="text-gray-100 text-lg">Em breve</p>
        </div>

        <div className="p-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="font-semibold text-amber-900 text-center">Em Breve</p>
          </div>

          <ul className="space-y-3 mb-6 opacity-60">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Tudo do Plano Profissional</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 font-semibold">Até 10 corretores</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Dashboard gerencial</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Relatórios consolidados</span>
            </li>
          </ul>

          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-semibold cursor-not-allowed"
          >
            Em Breve
          </button>
        </div>
      </div>

      {/* Texto no rodapé */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
        <p className="text-sm text-blue-900 leading-relaxed">
          O Comissão Certa não garante pagamento de comissão e não substitui contratos formais.
          É uma ferramenta de apoio à comprovação de atendimentos.
        </p>
      </div>
    </div>
  );
}
