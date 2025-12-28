"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Phone, Mail, X } from "lucide-react";

interface ClientesProps {
  user: any;
}

export default function Clientes({ user }: ClientesProps) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState<any>(null);

  // Form states
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    carregarClientes();
  }, [user.id]);

  const carregarClientes = () => {
    const clientesSalvos = JSON.parse(
      localStorage.getItem(`clientes_${user.id}`) || "[]"
    );
    setClientes(clientesSalvos);
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    const clientesAtuais = JSON.parse(
      localStorage.getItem(`clientes_${user.id}`) || "[]"
    );

    if (editando) {
      // Editar cliente existente
      const clientesAtualizados = clientesAtuais.map((c: any) =>
        c.id === editando.id ? { ...c, nome, telefone, email } : c
      );
      localStorage.setItem(
        `clientes_${user.id}`,
        JSON.stringify(clientesAtualizados)
      );
    } else {
      // Adicionar novo cliente
      const novoCliente = {
        id: Date.now().toString(),
        nome,
        telefone,
        email,
        dataCadastro: new Date().toISOString(),
      };
      clientesAtuais.push(novoCliente);
      localStorage.setItem(
        `clientes_${user.id}`,
        JSON.stringify(clientesAtuais)
      );
    }

    limparForm();
    carregarClientes();
  };

  const limparForm = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    setMostrarForm(false);
    setEditando(null);
  };

  const handleEditar = (cliente: any) => {
    setEditando(cliente);
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setEmail(cliente.email || "");
    setMostrarForm(true);
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone.includes(busca)
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Cliente</h2>
        <p className="text-gray-600 text-sm mb-4">Cadastre o cliente para vincular o atendimento ao seu nome.</p>

        {/* Busca */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Botão Adicionar */}
        <button
          onClick={() => setMostrarForm(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Adicionar Cliente
        </button>
      </div>

      {/* Formulário */}
      {mostrarForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {editando ? "Editar Cliente" : "Novo Cliente"}
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
                Nome do cliente
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome do cliente"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail (opcional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemplo.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
            >
              ✅ Salvar Cliente
            </button>
          </form>
        </div>
      )}

      {/* Lista de Clientes */}
      <div className="space-y-3">
        {clientesFiltrados.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">
              {busca ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado ainda"}
            </p>
          </div>
        ) : (
          clientesFiltrados.map((cliente) => (
            <div
              key={cliente.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">
                    {cliente.nome}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{cliente.telefone}</span>
                    </div>
                    {cliente.email && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>{cliente.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleEditar(cliente)}
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
