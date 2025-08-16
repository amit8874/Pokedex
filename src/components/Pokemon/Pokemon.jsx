import { Link } from "react-router-dom";

// src/components/Pokemon/Pokemon.jsx
function Pokemon({ name, image , id }) {
    return (
        
            <div className='pokemon-card'>
                <Link to={`/pokemon/${id}`} className="pokemon-wrapper">               
                    <h3>{name}</h3>
                    <img src={image} alt={name} />
                </Link> 
            </div>
    );
}

export default Pokemon;
