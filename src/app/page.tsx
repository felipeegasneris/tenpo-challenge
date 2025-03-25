'use client';

import { PokemonList } from '@/components/pokemon-list';
import { signOut } from 'next-auth/react';

export default function Home() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/login' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between py-8 border-b px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-2">Pokédex</h1>
          <p className="text-muted-foreground">Explora el mundo Pokémon</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="h-[calc(100vh-16rem)]">
          <PokemonList />
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Datos proporcionados por <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">PokeAPI</a></p>
        </div>
      </footer>
    </div>
  );
}