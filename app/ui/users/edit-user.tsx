"use client";

import { useActionState } from "react";
import { UpdateUser } from "@/app/lib/actions/user_actions";
import {
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/app/ui/button";
import { Session } from "next-auth";

export default function UpdateUserForm({
  session,
}: {
  session: Session | null;
}) {
  const [state, formAction] = useActionState(UpdateUser, {
    message: null,
    errors: {},
  });

  if (!session?.user) {
    return (
      <p className="text-red-500 text-center font-medium">
        Você precisa estar logado para editar sua conta.
      </p>
    );
  }

  const labelStyles =
    "block text-sm font-medium text-slate-600 mb-1";

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none";

  const iconStyles =
    "h-5 w-5 text-slate-400 absolute right-4 top-9";

  return (
    <form action={formAction} className="flex justify-center">
      <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-100 shadow-lg p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-slate-800">
            Atualizar Conta
          </h2>
          <p className="text-sm text-slate-500">
            Gerencie suas informações pessoais
          </p>
        </div>

        <input type="hidden" name="userId" value={session.user.id} />

        {/* NAME */}
        <div className="relative">
          <label className={labelStyles} htmlFor="name">
            Nome
          </label>
          <input
            className={inputStyles}
            id="name"
            name="name"
            type="text"
            defaultValue={session.user.name || ""}
            required
          />
          <UserIcon className={iconStyles} />

          {state.errors?.name && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="relative">
          <label className={labelStyles} htmlFor="email">
            Email
          </label>
          <input
            className={`${inputStyles} bg-slate-50 cursor-not-allowed`}
            id="email"
            name="email"
            type="email"
            defaultValue={session.user.email || ""}
            disabled
          />
          <AtSymbolIcon className={iconStyles} />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <label className={labelStyles} htmlFor="password">
            Nova Senha
          </label>
          <input
            className={inputStyles}
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <KeyIcon className={iconStyles} />

          {state.errors?.password && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <label className={labelStyles} htmlFor="confirmPassword">
            Confirmar Senha
          </label>
          <input
            className={inputStyles}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
          <KeyIcon className={iconStyles} />

          {state.errors?.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* ROLE */}
        <div className="relative">
          <label className={labelStyles} htmlFor="role">
            Tipo de Conta
          </label>
          <select
            className={inputStyles}
            id="role"
            name="role"
            defaultValue={session.user.role || "customer"}
              disabled
          >
            <option value="customer">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <IdentificationIcon className={iconStyles} />
        </div>

        {/* BUTTON */}
        <div className="pt-2">
          <Button variant="primary" className="w-full py-2.5 text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition">
            Atualizar Conta
          </Button>
        </div>

      </div>
    </form>
  );
}