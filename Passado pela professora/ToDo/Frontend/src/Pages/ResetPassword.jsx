import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { reset } from "../api/Todo.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!token) {
      setMessage("O link de recuperação é inválido ou está incompleto.");
      return;
    }

    //Confere se as duas senhas são iguais antes de enviar
    if (novaSenha !== confirmarSenha) {
      setMessage("As senhas informadas não coincidem.");
      return;
    }

    setLoading(true);

    //O token vem pela URL e é enviado junto com a nova senha para o backend validar
    try {
      const response = await reset({
        token,
        novaSenha,
      });

      setSuccess(true);

      setMessage(
        response.data?.message ||
          "Senha redefinida com sucesso!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Não foi possível redefinir sua senha."
      );
    } finally {
      setLoading(false);
    }
  };

  //Verifica se o token foi enviado no link antes de tentar chamar o backend
  if (!token) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-7 w-7 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Link inválido
          </h2>

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Não encontramos um código de recuperação neste link.
            Solicite uma nova recuperação de senha para continuar.
          </p>

          <div className="mt-7 space-y-3">
            <Link
              to="/forgot"
              className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Solicitar novo link
            </Link>

            <Link
              to="/login"
              className="block w-full py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="mb-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2zm8-7V9a4 4 0 00-8 0v3h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Escolha uma nova senha
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Crie uma nova senha para recuperar o acesso à sua conta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nova senha
            </label>

            <input
              type="password"
              required
              minLength={6}
              disabled={loading}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirme sua nova senha
            </label>

            <input
              type="password"
              required
              minLength={6}
              disabled={loading}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
            />
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
            <p className="text-xs text-gray-500">
              A nova senha deve conter pelo menos 6 caracteres.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Atualizando senha..." : "Atualizar senha"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-5 rounded-lg border p-3 ${
              success
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            <p
              className={`text-sm text-center ${
                success ? "text-green-700" : "text-red-700"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}