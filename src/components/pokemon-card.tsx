'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonCardProps extends HTMLAttributes<HTMLDivElement> {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon, className, ...props }: PokemonCardProps) {
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all  hover:shadow-lg',
        className
      )}
      {...props}
    >
    <CardHeader>
          <CardTitle className="text-2xl"><h3 className="font-semibold text-lg">{capitalizedName}</h3></CardTitle>
          <CardDescription>
          <span className="text-sm text-muted-foreground">#{pokemon.id.toString()}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Image
          src={pokemon.sprites.front_default}
          alt={`${capitalizedName} sprite`}
          width={150}
          height={150}
        />
        </CardContent>
    </Card>
  );
}