import { useEffect, useState } from 'react';
import './PokemonList.css';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList (){
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon?limit=20"
    const [pokemonList, setPokemonList] = useState([]);

    const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);

    const [nextUrl , setNextUrl] = useState(DEFAULT_URL);
    const [prevUrl, setPrivUrl] = useState(DEFAULT_URL);

    async function  downloadPokemons(){
        const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL );

        const pokemonResults = response.data.results;

        setNextUrl(response.data.next);
        setPrivUrl(response.data.previous);

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        
        const pokemonListData = await axios.all(pokemonPromise);
        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id:pokemon.id,
                name : pokemon.name,
                image : pokemon.sprites.other.dream_world.front_default,
                types : pokemon.types
            }
        });
        setPokemonList(pokemonFinalList);
        console.log(pokemonFinalList);

    }
    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className='pokemon-list-wrapper'>
            <div id='pokemon-list-header'>
                <h1>Pokemon List</h1>
            </div>
            <div className='page-control'>
                <button onClick={()=> setPokedexUrl(prevUrl)}>Priv</button>
                <button onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
            </div>
            <div className='pokemon-list'>
                {pokemonList.map(pokemon => (
                    <Pokemon
                        key={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        id={pokemon.id}
                        
                    />
                ))}
            </div>
        </div>
    )
}

export default PokemonList;