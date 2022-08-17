import React, {useRef, useState} from 'react'
// Styles
import './Search.scss'
// Libraries
import {v4 as uuid} from 'uuid'
// Firestore
import {collection, getDocs} from 'firebase/firestore'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {occurredSearchError} from '../../redux/features/errorsSlice'
// Assets
import search from '../../Assets/search.svg'
import searchDark from '../../Assets/search-dark.svg'
import sea from '../../Assets/sea.png'
import seaDark from '../../Assets/sea-dark.png'
// Children
import SearchedUser from '../SearchedUser/SearchedUser'
import {Link} from 'react-router-dom'

const Search = () => {

    const [result, setResult] = useState([])
    const database = useSelector(state => state.firebase.database)
    const searchInputRef = useRef()
    const currentTheme = useSelector(state => state.theme.theme)
    const currentUserId = useSelector(state => state.userData.userID)
    const searchError = useSelector(state => state.errors.searchError)
    const dispatch = useDispatch()
    const [isTouched, setIsTouched] = useState(false)

    async function handleSearch() {
        if ([...searchInputRef.current.value].length > 1) {
            document.getElementsByClassName('ph')[0].style.display = 'none'
            setIsTouched(true)
            setResult([])
            const querySnapshot = await getDocs(collection(database, 'usersData'))
            querySnapshot.forEach((doc) => {
                if (doc.data().userID !== currentUserId && compareStrings(doc.data().userName, searchInputRef.current.value)) {
                    const data = doc.data()
                    setResult(prevState => [...prevState, data])
                }
            })
            dispatch(occurredSearchError(''))
        } else {
            dispatch(occurredSearchError('At least 2 characters'))
        }
    }

    function compareStrings(str, sub) {
        sub = sub.toLowerCase()
        return str.toLowerCase().startsWith(sub.slice(0, Math.max(str.length - 1, 1))
        )
    }

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
                        ref={searchInputRef}
                    />
                    {searchError && <p className={'search__error'}>{searchError}</p>}
                    <span
                        className="search__placeholder"
                        onClick={() => document.getElementById('search__username').focus()}
                    >
                        Search via Username
                    </span>
                    <button className={'search__button'} onClick={handleSearch}>
                        {currentTheme === 'dark'
                            ? <img src={search} alt="search" style={{transform: 'rotateY(180deg)'}}/>
                            : <img src={searchDark} alt="search" style={{transform: 'rotateY(180deg)'}}/>}
                    </button>
                </div>
                {!result.length && (currentTheme === 'dark'
                    ? <div className="search__image-wrapper">
                        <img src={sea} alt="search" className={'search__image'}/>
                    </div>
                    : <div className="search__image-wrapper">
                        <img src={seaDark} alt="search" className={'search__image'}/>
                    </div>)
                }

                <div className="search__result">
                    {result.length !== 0 ? result.map(user => {
                            return <SearchedUser key={uuid()} user={user}/>
                        })
                        : isTouched && <p>User with this username does not exist. Please try another</p>
                    }
                    <p className={'ph'} style={{textAlign: 'center'}}>Here are some placeholder users: <br/>
                        <Link
                            to={'/user/03fe150d-dde3-4c2b-8b06-edc5b07ef6d1'}
                            className={'search__example'}
                        > bloom
                        </Link>,
                        <Link to={'/user/LiqNpcTNI7TEj3lK1V0PNfPEwXj2'} className={'search__example'}> bloon1k</Link>,
                        <Link to={'/user/labUJePrePQTcmeDKgdZprZhiWp2'} className={'search__example'}> bloonik</Link>,
                        <Link
                            to={'/user/e1f9c0ce-db8b-4a9d-bbac-a1dcca40dfc6'}
                            className={'search__example'}> bunny
                        </Link>
                        <br/>
                        You can follow, see their posts or message them</p>
                </div>
            </div>

        </section>
    )
}

export default Search