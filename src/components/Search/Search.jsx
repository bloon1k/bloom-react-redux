import React from 'react'
// Styles
import './Search.scss'

const Search = () => {
    return (
        <section className={'search'}>

            <div className="search__content">

                <div className="search__input-wrapper">
                    <input
                        type="text"
                        name="search__username"
                        id="search__username"
                        className={'search__input'}
                        onFocus={() => document.getElementsByClassName('search__placeholder')[0].classList.add('search__placeholder-move')}
                    />
                    <span
                        className="search__placeholder"
                        onClick={() => document.getElementById('search__username').focus()}
                    >
                    Search via Username
                </span>
                </div>

                <div className="search__result">
                    sum search results
                </div>
            </div>

        </section>
    )
}

export default Search