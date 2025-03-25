'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { PokemonListResponse, Pokemon } from '@/types/pokemon';

interface UsePokemonListResult {
  pokemons: Pokemon[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const usePokemonList = (): UsePokemonListResult => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = pageParam * 20;
      const response = await api.get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=20`);
      
      const detailedPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detailResponse = await api.get<Pokemon>(pokemon.url);
          return detailResponse.data;
        })
      );
      
      return {
        pokemons: detailedPokemons,
        nextPage: offset + 20 < response.data.count ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const pokemons = data?.pages.flatMap((page) => page.pokemons) || [];

  return {
    pokemons,
    isLoading,
    isError,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};