import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import PokemonName from "../components/pokemonName";
import PokemonInfo from "../components/pokemonInfo";
import CapacityButton from "../components/capacityButton";
import ImageGroup from "../components/imageGroup";
import { getPokemonData, preloadPokemonData } from "../services/pokemonApi";
import { usePokemonData } from "../hooks/usePokemon";
import classNames from "classnames";

export default function Pokedex({ initialPokemonData }) {
  const [id, setId] = useState(1);
  const [primaryType, setPrimaryType] = useState(
    initialPokemonData.types[0] || "grass"
  );
  const { loading, error, data = initialPokemonData } = usePokemonData(id);

  // --------------------------- Type Color ---------------------------

  useEffect(() => {
    if (data) {
      setPrimaryType(data.types[0] || "grass");
    }
  }, [data]);

  const getTypeColors = (type) => {
    const primaryClass = `primary${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    const secondaryTextClass = `secondaryText${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    const secondaryBackgroundClass = `secondaryBackground${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;
    return { primaryClass, secondaryTextClass, secondaryBackgroundClass };
  };

  const { primaryClass, secondaryTextClass, secondaryBackgroundClass } =
    getTypeColors(primaryType);
  const dynamicPrimaryColorClass = classNames(
    "w-screen",
    "h-screen",
    "tracking-wide",
    primaryClass
  );

  // ------------------------------------------------------

  return (
    <div className={dynamicPrimaryColorClass}>
      <ImageGroup id={id} color={secondaryTextClass} />
      <div className="flex flex-shrink justify-between mt-7">
        <PokemonName id={id} />
        <CapacityButton color={secondaryBackgroundClass} />
      </div>
      <PokemonInfo id={id} />
      <button
        onClick={() => {
          if (id < 1281) {
            setId(id + 1);
          }
          if (id < 1280) {
            preloadPokemonData(id + 2);
          }
        }}
      >
        Pokemon suivant
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const initialPokemonData = await getPokemonData(1);

  return {
    props: {
      initialPokemonData,
    },
  };
}
