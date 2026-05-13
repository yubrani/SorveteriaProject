'use client';
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { authenticate } from "../lib/actions/user_actions";
import { useSearchParams } from "next/navigation";
import { Button } from "./button"
import { useActionState } from "react";
import Link from "next/link";
export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

    return (
        <form action={formAction} className="space-y-4">
            <div className="flex-1 rounded-3x1 bg-white px-8 pb-10 pt-10 shadow-sm border border-slate-100">
                <p className="mb-8 text-sm text-center text-slate-500 italic">
                    Porfavor faça login para acessar o sistema. Use um email válido e uma senha com pelo menos 6 caracteres.
                </p>

                
                <div className="w-full space-y-6">

                    <div className="group">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Coloque seu email"
                            required
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <AtSymbolIcon className="h-5 w-5 text-slate-400 absolute right-3 top-[38px]" />
                    </div>
                    <div className="group">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Coloque sua senha"
                            required
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <Button type="submit">
                        Entrar
                    </Button>
                    <div className="">
                     <Link href="/login/create" className="text-blue-500 hover:underline">
                        Nao tem conta? Crie uma aqui.
                    </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}