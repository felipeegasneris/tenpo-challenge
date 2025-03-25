'use client';

import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PokemonCard } from '@/components/pokemon-card';
import { usePokemonList } from '@/hooks/usePokemonList';

export function PokemonList() {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const { pokemons, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonList();

  const virtualizer = useVirtualizer({
    count: pokemons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5,
  });

  React.useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= pokemons.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), pokemons.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex items-center justify-center p-4 text-destructive">
        Error al cargar los Pokémon. Por favor, intente nuevamente.
      </div>
    );
  }

  if (!pokemons.length && isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        Cargando Pokémon...
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-full overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            className="absolute top-0 left-0 w-full px-4"
            style={{
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <PokemonCard pokemon={pokemons[virtualItem.index]} />
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center p-4">
          Cargando más Pokémon...
        </div>
      )}
    </div>
  );
}