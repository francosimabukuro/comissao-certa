"use client";

import { useState, useEffect } from "react";
import { Home, Users, Building2, FileText, CreditCard, User as UserIcon, LogOut } from "lucide-react";
import Dashboard from "@/components/comissao-certa/Dashboard";
import Clientes from "@/components/comissao-certa/Clientes";
import Imoveis from "@/components/comissao-certa/Imoveis";
import Atendimentos from "@/components/comissao-certa/Atendimentos";
import Planos from "@/components/comissao-certa/Planos";
import Perfil from "@/components/comissao-certa/Perfil";
import Login from "@/components/comissao-certa/Login";
import Cadastro from "@/components/comissao-certa/Cadastro";

export default function ComissaoCerta() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
      setCurrentScreen("dashboard");
    }
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
    setCurrentScreen("login");
  };

  const handleCadastro = () => {
    setCurrentScreen("cadastro");
  };

  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  const handleNovoAtendimento = () => {
    setCurrentScreen("atendimentos");
  };

  if (!isAuthenticated) {
    if (currentScreen === "cadastro") {
      return <Cadastro onBack={handleBackToLogin} onCadastroSuccess={handleLogin} />;
    }
    return <Login onLogin={handleLogin} onCadastro={handleCadastro} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard user={currentUser} onNovoAtendimento={handleNovoAtendimento} />;
      case "clientes":
        return <Clientes user={currentUser} />;
      case "imoveis":
        return <Imoveis user={currentUser} />;
      case "atendimentos":
        return <Atendimentos user={currentUser} />;
      case "planos":
        return <Planos user={currentUser} />;
      case "perfil":
        return <Perfil user={currentUser} onLogout={handleLogout} />;
      default:
        return <Dashboard user={currentUser} onNovoAtendimento={handleNovoAtendimento} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center">COMISSÃO CERTA</h1>
          <p className="text-xs text-center text-blue-100 mt-1">Registro Profissional de Atendimentos</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-4">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-6 gap-1">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              currentScreen === "dashboard"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Início</span>
          </button>

          <button
            onClick={() => setCurrentScreen("clientes")}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              currentScreen === "clientes"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Clientes</span>
          </button>

          <button
            onClick={() => setCurrentScreen("imoveis")}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              currentScreen === "imoveis"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <Building2 className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Imóveis</span>
          </button>

          <button
            onClick={() => setCurrentScreen("atendimentos")}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              currentScreen === "atendimentos"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Registros</span>
          </button>

          <button
            onClick={() => setCurrentScreen("planos")}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              currentScreen === "planos"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Planos</span>
          </button>

          <button
            onClick={() => setCurrentScreen("perfil")}
            className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              currentScreen === "perfil"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
