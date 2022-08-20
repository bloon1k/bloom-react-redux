import React, {useEffect, useState, useRef} from 'react'
// Styles
import './Dialogue.scss'
// Libraries
import {v4 as uuid} from 'uuid'
import {doc, updateDoc, setDoc} from 'firebase/firestore'
import {useNavigate, useParams, Link} from 'react-router-dom'
import getUserDataByID from '../../utils/getUserDataByID'
// Redux
import {useDispatch, useSelector} from 'react-redux'
import getUserDialoguesByID from '../../utils/getUserDialoguesByID'
// Assets
import backArrow from '../../Assets/back-arrow.png'
import backArrowDark from '../../Assets/back-arrow-dark.png'
import guest from '../../Assets/guest.png'
// Children
import Message from '../Message/Message'
import {occurredSendMessageError} from '../../redux/features/errorsSlice'

const Dialogue = () => {

    const {userId} = useParams()
    const currentTheme = useSelector(state => state.theme.theme)
    const myUserId = useSelector(state => state.userData.userID)
    const database = useSelector(state => state.firebase.database)
    const [userData, setUserData] = useState({})
    const [dialogueData, setDialogueData] = useState({
        messages: []
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sendMessageError = useSelector(state => state.errors.sendMessageError)

    useEffect(() => {
        getUserDataByID(database, userId)
            .then(userData => setUserData(userData))
        getUserDialoguesByID(database, myUserId)
            .then(dialoguesList => {
                let foundDialogue = {}
                dialoguesList.forEach(dialogue => {
                    if (dialogue.between.includes(userId)) {
                        setDialogueData(dialogue)
                        foundDialogue = dialogue
                    }
                })
                // create dialogue if it never existed
                setTimeout(() => {
                    if (Object.keys(foundDialogue).length === 0) {
                        let dialogueId = uuid()
                        setDoc(doc(database, 'dialogues', dialogueId), {
                            between: [myUserId, userId],
                            messages: []
                        }).then(() => 1)
                        setDialogueData({
                            between: [myUserId, userId],
                            messages: [],
                            dialogueId: dialogueId
                        })
                    } else {
                        let elem = document.getElementsByClassName('dialogue__messages')[0]
                        elem.scrollTop = elem.scrollHeight
                    }
                    document.addEventListener('keypress', check)
                }, 10)
            })

        let beforeMessagesCount = dialogueData.messages.length
        let afterMessagesCount = 0

        let updatesInterval = setInterval(() => {
            console.log('request')
            getUserDialoguesByID(database, myUserId)
                .then(dialoguesList => {
                    dialoguesList.forEach(dialogue => {
                        if (dialogue.between.includes(userId)) {
                            setDialogueData(dialogue)
                            afterMessagesCount = dialogue.messages.length
                        }
                    })
                    setTimeout(() => {
                        let elem = document.getElementsByClassName('dialogue__messages')[0]
                        if (beforeMessagesCount < afterMessagesCount) {
                            beforeMessagesCount = afterMessagesCount
                            elem.scrollTop = elem.scrollHeight
                        }
                    }, 10)
                })
        }, 5000)
        return () => {
            document.removeEventListener('keypress', check)
            clearInterval(updatesInterval)
        }

        // eslint-disable-next-line
    }, [userId])

    function check(e) {
        if (e.key === 'Enter') {
            document.getElementsByClassName('dialogue__send')[0].click()
        }
    }

    const inputRef = useRef()

    function sendMessage() {
        dispatch(occurredSendMessageError(''))
        if ([...inputRef.current.value].length <= 200 && [...inputRef.current.value].length > 0) {
            updateDoc(doc(database, 'dialogues', dialogueData.dialogueId), {
                messages: [
                    ...dialogueData.messages,
                    {
                        senderID: myUserId,
                        text: inputRef.current.value,
                        sentAt: {seconds: Math.floor(Date.now() / 1000)},
                    },
                ]
            }).then(() => {
                const newMessages = [
                    ...dialogueData.messages,
                    {
                        senderID: myUserId,
                        text: inputRef.current.value,
                        sentAt: {seconds: Math.floor(Date.now() / 1000)},
                    }
                ]
                const newData = {
                    ...dialogueData,
                    messages: newMessages,
                }
                setDialogueData(newData)
                setTimeout(() => {
                    let elem = document.getElementsByClassName('dialogue__messages')[0]
                    elem.scrollTop = elem.scrollHeight
                }, 10)
                inputRef.current.value = ''
            }).catch(error => occurredSendMessageError('Error: ', error.code))
        } else {
            dispatch(occurredSendMessageError('1-200 characters'))
        }
    }

    return (
        <div className={'dialogue'}>

            <Link to={`/user/${userId}`} className="dialogue__header">
                <button className={'dialogue__back'} onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                }}>
                    {currentTheme === 'dark'
                        ? <img src={backArrow} className={'dialogue__arrow'} alt="back arrow"/>
                        : <img src={backArrowDark} className={'dialogue__arrow'} alt="back arrow"/>
                    }
                </button>
                <img src={userData.photoURL ? userData.photoURL : guest} className={'dialogue__image'}
                     alt="user avatar"/>
                <p className={'dialogue__username'}>{userData.userName}</p>
            </Link>

            <div className="dialogue__messages">
                {dialogueData.messages.length !== 0
                    ? dialogueData.messages.map(message => {
                        return <Message message={{...message, betweenId: userId}} key={uuid()}/>
                    })
                    : <p style={{width: '100%', textAlign: 'center', marginTop: '1em', fontSize: '1.3em'}}>
                        There are no messages here yet...
                    </p>}
            </div>

            <div className="dialogue__controls">
                <div className="dialogue__input-wrapper">
                    <input
                        type="text"
                        className={'dialogue__input'}
                        id={'dialogue__input'}
                        placeholder={'Enter message...'}
                        ref={inputRef}
                    />
                    {sendMessageError && <p className={'dialogue__error'}>{sendMessageError}</p>}
                </div>
                <button className={'dialogue__send'} onClick={sendMessage}>
                    Send
                </button>
            </div>

        </div>
    )
}

export default Dialogue