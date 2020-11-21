import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";


const Search = () => {
    return (
        <div className="Search">
            <input type="search" placeholder='Czego szukasz?' className="Search__input"/>
            <FontAwesomeIcon className='Search__icon' icon={faSearch} />
        </div>
    )
}

export default Search;