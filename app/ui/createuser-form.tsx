"use client";

import { createUser } from "../lib/actions/user_actions";
import { useActionState } from "react";
import {
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./button";

export default function CreateUserForm() {
  const [state, formAction] = useActionState(createUser, {
    message: null,
    errors: {},
  });

  const labelStyles =
    "block text-sm font-medium text-slate-700 mb-1";

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const iconStyles =
    "h-5 w-5 text-slate-400 absolute right-4 top-10";

  return (
    <form action={formAction} className="flex justify-center">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-lg border border-slate-100">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Criar conta
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Preencha os dados abaixo para criar seu usuário
          </p>
        </div>

        {/* Name */}
        <div className="relative mb-5">
          <label className={labelStyles} htmlFor="name">
            Nome completo
          </label>
          <input
            className={inputStyles}
            id="name"
            name="name"
            type="text"
            placeholder="Ex: João Silva"
            required
          />
          <UserIcon className={iconStyles} />

          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <label className={labelStyles} htmlFor="email">
            E-mail
          </label>
          <input
            className={inputStyles}
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            required
          />
          <AtSymbolIcon className={iconStyles} />

          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <label className={labelStyles} htmlFor="password">
            Senha
          </label>
          <input
            className={inputStyles}
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          <KeyIcon className={iconStyles} />

          {state.errors?.password && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-5">
          <label className={labelStyles} htmlFor="confirmPassword">
            Confirmar senha
          </label>
          <input
            className={inputStyles}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          <KeyIcon className={iconStyles} />

          {state.errors?.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="relative mb-6">
          <label className={labelStyles} htmlFor="role">
            Tipo de conta
          </label>

          <select
            className={inputStyles}
            id="role"
            name="role"
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="customer">Cliente</option>
            <option value="admin">Administrador</option>
          </select>

          <IdentificationIcon className={iconStyles} />

          {state.errors?.role && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.role[0]}
            </p>
          )}
        </div>

        {/* Button */}
        <Button variant="primary" className="w-full py-3 rounded-xl">
          Criar conta
        </Button>
      </div>
    </form>
  );
}