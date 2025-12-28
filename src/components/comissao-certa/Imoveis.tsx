"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, MapPin, Home, X } from "lucide-react";

interface ImoveisProps {
  user: any;
}

export default function Imoveis({ user }: ImoveisProps) {
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState<any>(null);

  // Form states
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const tiposImovel = [
    "Apartamento",
    "Casa",
    "Terreno",
    "Sala Comercial",
    "Galpão",
    "Chácara",
    "Cobertura",
    "Kitnet",
    "Sobrado",
    "Outro",
  ];

  useEffect(() => {
    carregarImoveis();
  }, [user.id]);

  const carregarImoveis = () => {
    const imoveisSalvos = JSON.parse(
      localStorage.getItem(`imoveis_${user.id}`) || "[]"
    );
    setImoveis(imoveisSalvos);
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    const imoveisAtuais = JSON.parse(
      localStorage.getItem(`imoveis_${user.id}`) || "[]"
    );

    if (editando) {
      // Editar imóvel existente
      const imoveisAtualizados = imoveisAtuais.map((i: any) =>
        i.id === editando.id ? { ...i, tipo, endereco, observacoes } : i
      );
      localStorage.setItem(
        `imoveis_${user.id}`,
        JSON.stringify(imoveisAtualizados)
      );
    } else {
      // Adicionar novo imóvel
      const novoImovel = {
        id: Date.now().toString(),
        tipo,
        endereco,
        observacoes,
        dataCadastro: new Date().toISOString(),
      };
      imoveisAtuais.push(novoImovel);
      localStorage.setItem(
        `imoveis_${user.id}`,
        JSON.stringify(imoveisAtuais)
      );
    }

    limparForm();
    carregarImoveis();
  };

  const limparForm = () => {
    setTipo("");
    setEndereco("");
    setObservacoes("");
    setMostrarForm(false);
    setEditando(null);
  };

  const handleEditar = (imovel: any) => {
    setEditando(imovel);
    setTipo(imovel.tipo);
    setEndereco(imovel.endereco);
    setObservacoes(imovel.observacoes || "");
    setMostrarForm(true);
  };

  const imoveisFiltrados = imoveis.filter(
    (i) =>
      i.tipo.toLowerCase().includes(busca.toLowerCase()) ||
      i.endereco.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Imóvel</h2>
        <p className="text-gray-600 text-sm mb-4">Informe os dados do imóvel apresentado ao cliente.</p>

        {/* Busca */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar imóvel..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Botão Adicionar */}
        <button
          onClick={() => setMostrarForm(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Adicionar Imóvel
        </button>
      </div>

      {/* Formulário */}
      {mostrarForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {editando ? "Editar Imóvel" : "Novo Imóvel"}
            </h3>
            <button
              onClick={limparForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSalvar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo do imóvel
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o tipo</option>
                {tiposImovel.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <textarea
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Rua, número, bairro, cidade, estado"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Informações adicionais sobre o imóvel"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
            >
              ✅ Salvar Imóvel
            </button>
          </form>
        </div>
      )}

      {/* Lista de Imóveis */}
      <div className="space-y-3">
        {imoveisFiltrados.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">
              {busca ? "Nenhum imóvel encontrado" : "Nenhum imóvel cadastrado ainda"}
            </p>
          </div>
        ) : (
          imoveisFiltrados.map((imovel) => (
            <div
              key={imovel.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Home className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {imovel.tipo}
                    </h3>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{imovel.endereco}</span>
                  </div>
                  {imovel.observacoes && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      {imovel.observacoes}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleEditar(imovel)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
