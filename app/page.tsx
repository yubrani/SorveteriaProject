import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* NAVBAR */}
      <header className="flex justify-between items-center p-6">
   
        <h1 className="text-xl font-bold text-red-500">FoodApp</h1>

        <div className="flex gap-4">
          <Link href="/login" className="text-gray-600">
            Login
          </Link>
          <Link
            href="/dashboard"
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Abrir app
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 mt-12">
        <h2 className="text-4xl font-bold max-w-xl">
          Pide comida fácil y rápido 🍔🚀
        </h2>

        <p className="text-gray-500 mt-4 max-w-md">
          Descubre restaurantes, pide en segundos y recibe en tu puerta.
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/dashboard"
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Empezar ahora
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded-xl"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>
       
      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 p-10 mt-16">
        
        <div className="p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold text-lg">Entrega rápida</h3>
          <p className="text-gray-500 mt-2">
            Recibe tu pedido en minutos.
          </p>
        </div>
       

        <div className="p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold text-lg">Muchos restaurantes</h3>
          <p className="text-gray-500 mt-2">
            Elige entre cientos de opciones.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold text-lg">Pago fácil</h3>
          <p className="text-gray-500 mt-2">
            Métodos de pago rápidos y seguros.
          </p>
        </div>

      </section>

      {/* CTA FINAL */}
      <section className="text-center p-10 bg-red-500 text-white mt-16">
        <h2 className="text-3xl font-bold">
          ¿Listo para pedir?
        </h2>

        <Link
          href="/dashboard"
          className="inline-block mt-6 bg-white text-red-500 px-6 py-3 rounded-xl"
        >
          Ir a la app
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center p-6 text-gray-400">
        © 2026 FoodApp - Proyecto Portafolio
      </footer>
    </main>
  );
}