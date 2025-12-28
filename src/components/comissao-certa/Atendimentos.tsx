"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Calendar, Clock, User, Building2, CheckCircle, AlertCircle, Download } from "lucide-react";

interface AtendimentosProps {
  user: any;
}

export default function Atendimentos({ user }: AtendimentosProps) {
  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [atendimentoAtual, setAtendimentoAtual] = useState<any>(null);

  // Form states
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [imovelSelecionado, setImovelSelecionado] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    carregarDados();
  }, [user.id]);

  const carregarDados = () => {
    const atendimentosSalvos = JSON.parse(
      localStorage.getItem(`atendimentos_${user.id}`) || "[]"
    );
    const clientesSalvos = JSON.parse(
      localStorage.getItem(`clientes_${user.id}`) || "[]"
    );
    const imoveisSalvos = JSON.parse(
      localStorage.getItem(`imoveis_${user.id}`) || "[]"
    );

    setAtendimentos(atendimentosSalvos);
    setClientes(clientesSalvos);
    setImoveis(imoveisSalvos);
  };

  const verificarLimitePlano = () => {
    if (user.plano === "teste" && atendimentos.length >= 5) {
      return false;
    }
    return true;
  };

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificarLimitePlano()) {
      alert("Limite de atendimentos atingido! Faça upgrade do seu plano.");
      return;
    }

    const cliente = clientes.find((c) => c.id === clienteSelecionado);
    const imovel = imoveis.find((i) => i.id === imovelSelecionado);

    const novoAtendimento = {
      id: Date.now().toString(),
      clienteId: clienteSelecionado,
      clienteNome: cliente?.nome,
      imovelId: imovelSelecionado,
      imovelTipo: imovel?.tipo,
      imovelEndereco: imovel?.endereco,
      observacoes,
      dataHora: new Date().toISOString(),
      confirmado: false,
    };

    setAtendimentoAtual(novoAtendimento);
    setMostrarForm(false);
    setMostrarConfirmacao(true);
  };

  const handleConfirmarAtendimento = () => {
    const atendimentosAtuais = JSON.parse(
      localStorage.getItem(`atendimentos_${user.id}`) || "[]"
    );

    const atendimentoConfirmado = {
      ...atendimentoAtual,
      confirmado: true,
      dataConfirmacao: new Date().toISOString(),
    };

    atendimentosAtuais.push(atendimentoConfirmado);
    localStorage.setItem(
      `atendimentos_${user.id}`,
      JSON.stringify(atendimentosAtuais)
    );

    limparForm();
    carregarDados();
    setMostrarConfirmacao(false);
  };

  const limparForm = () => {
    setClienteSelecionado("");
    setImovelSelecionado("");
    setObservacoes("");
    setMostrarForm(false);
    setAtendimentoAtual(null);
  };

  const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora);
    return {
      data: data.toLocaleDateString("pt-BR"),
      hora: data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const handleExportarRelatorio = () => {
    // Simular exportação de relatório
    const relatorio = atendimentos.map((a) => {
      const { data, hora } = formatarDataHora(a.dataHora);
      return `
Cliente: ${a.clienteNome}
Imóvel: ${a.imovelTipo} - ${a.imovelEndereco}
Data: ${data} às ${hora}
Confirmado: ${a.confirmado ? "Sim" : "Não"}
Observações: ${a.observacoes || "Nenhuma"}
-------------------
      `;
    }).join("\n");

    const blob = new Blob([`COMPROVAÇÃO DE ATENDIMENTO\nCorretor: ${user.nome}\nCRECI: ${user.creci}\n\n${relatorio}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprovacao-atendimentos-${new Date().toLocaleDateString("pt-BR")}.txt`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Registrar Atendimento
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Este registro comprova que você apresentou este imóvel ao cliente nesta data.
        </p>

        {/* Botões */}
        <div className="space-y-3">
          <button
            onClick={() => {
              if (!verificarLimitePlano()) {
                alert("Limite de atendimentos atingido! Faça upgrade do seu plano.");
                return;
              }
              setMostrarForm(true);
            }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
          >
            🟢 Registrar Atendimento
          </button>

          {atendimentos.length > 0 && (
            <button
              onClick={handleExportarRelatorio}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              <Download className="w-5 h-5" />
              📄 Gerar Relatório
            </button>
          )}
        </div>
      </div>

      {/* Alerta de limite */}
      {user.plano === "teste" && atendimentos.length >= 5 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 mb-1">Limite Atingido</p>
            <p className="text-sm text-red-800">
              Você atingiu o limite de 5 atendimentos do Plano Teste. Faça upgrade para continuar registrando.
            </p>
          </div>
        </div>
      )}

      {/* Formulário de Registro */}
      {mostrarForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Novo Atendimento
          </h3>

          <form onSubmit={handleRegistrar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente *
              </label>
              <select
                value={clienteSelecionado}
                onChange={(e) => setClienteSelecionado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
              {clientes.length === 0 && (
                <p className="text-sm text-amber-600 mt-1">
                  Cadastre clientes primeiro na aba "Clientes"
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imóvel *
              </label>
              <select
                value={imovelSelecionado}
                onChange={(e) => setImovelSelecionado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o imóvel</option>
                {imoveis.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.tipo} - {i.endereco.substring(0, 50)}...
                  </option>
                ))}
              </select>
              {imoveis.length === 0 && (
                <p className="text-sm text-amber-600 mt-1">
                  Cadastre imóveis primeiro na aba "Imóveis"
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detalhes do atendimento..."
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📌 Aqui o app grava data e hora automaticamente.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={limparForm}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={clientes.length === 0 || imoveis.length === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tela de Confirmação do Cliente */}
      {mostrarConfirmacao && atendimentoAtual && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Confirmação do Cliente
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <p className="text-center text-lg text-gray-800 mb-4 leading-relaxed font-medium">
              Confirmo que fui atendido por este corretor neste imóvel na data de hoje.
            </p>

            <p className="text-center text-sm text-gray-600 mb-6">
              Esta confirmação serve apenas para registrar o atendimento.
            </p>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span><strong>Cliente:</strong> {atendimentoAtual.clienteNome}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span><strong>Imóvel:</strong> {atendimentoAtual.imovelTipo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span><strong>Data:</strong> {new Date().toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span><strong>Hora:</strong> {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setMostrarConfirmacao(false);
                setMostrarForm(true);
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={handleConfirmarAtendimento}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
            >
              ✅ Confirmar Atendimento
            </button>
          </div>
        </div>
      )}

      {/* Histórico de Atendimentos */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Histórico de Atendimentos
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Aqui ficam registrados todos os seus atendimentos, organizados por data.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-amber-900 font-medium">
            📌 Os registros não podem ser apagados, apenas consultados.
          </p>
        </div>

        {atendimentos.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum atendimento registrado ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {atendimentos
              .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
              .map((atendimento) => {
                const { data, hora } = formatarDataHora(atendimento.dataHora);
                return (
                  <div
                    key={atendimento.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {atendimento.confirmado ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-600" />
                        )}
                        <span className={`text-sm font-semibold ${atendimento.confirmado ? "text-green-700" : "text-amber-700"}`}>
                          {atendimento.confirmado ? "Confirmado" : "Pendente"}
                        </span>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{data}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{hora}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <span className="text-gray-500">Cliente:</span>
                          <p className="font-semibold text-gray-800">{atendimento.clienteNome}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <span className="text-gray-500">Imóvel:</span>
                          <p className="font-semibold text-gray-800">{atendimento.imovelTipo}</p>
                          <p className="text-gray-600 text-xs">{atendimento.imovelEndereco}</p>
                        </div>
                      </div>

                      {atendimento.observacoes && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-2">
                          <p className="text-gray-700 text-xs italic">{atendimento.observacoes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
