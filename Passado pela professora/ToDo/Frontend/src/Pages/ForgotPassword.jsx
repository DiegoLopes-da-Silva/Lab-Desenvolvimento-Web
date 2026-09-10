import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgot } from "../api/Todo.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    //Manda o e-mail pro backend verificar se existe um usuário cadastrado
    try {
      const response = await forgot({ email });

      //O backend retorna uma mensagem genérica para informar se o e-mail existe ou não
      setMessage(
        response.data?.message ||
          "Se o e-mail estiver cadastrado, um link será enviado."
      );

      setSent(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Não foi possível solicitar a recuperação da senha."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {!sent ? (
          <>
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
                    d="M16 12H8m8-4H8m4 12a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Recuperar acesso
              </h2>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Informe o e-mail associado à sua conta. Caso ele esteja
                cadastrado, enviaremos as instruções para redefinir sua senha.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>

                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : "Enviar instruções"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Voltar para o login
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-7 w-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Verifique seu e-mail
            </h2>

            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              {message}
            </p>

            <p className="text-xs text-gray-400 mt-4">
              O link de recuperação possui validade limitada.
            </p>

            <div className="mt-7">
              <Link
                to="/login"
                className="inline-block w-full py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Voltar para o login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}