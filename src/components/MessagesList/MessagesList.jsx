import React, {useEffect, useState} from 'react'
// Styles
import './MessagesList.scss'
// Redux
import {useSelector} from 'react-redux'
// Libraries
import getUserDialoguesByID from '../../utils/getUserDialoguesByID'
import {v4 as uuid} from 'uuid'
// Assets
import guest from '../../Assets/guest.png'
// Firestore
import getUserDataByID from '../../utils/getUserDataByID'
import {Link} from 'react-router-dom'

const MessagesList = () => {

    const database = useSelector(state => state.firebase.database)
    const myUserId = useSelector(state => state.userData.userID)
    const [messagesList, setMessagesList] = useState([])

    useEffect(() => {
        getUserDialoguesByID(database, myUserId)
            .then(dialoguesList => {
                const filteredList = []
                dialoguesList.forEach(dialogue => {
                    if (dialogue.messages.length !== 0) {
                        filteredList.push(dialogue)
                    }
                })
                const newList = filteredList.map(dialogue => {
                    if (dialogue.between[0] === myUserId) {
                        return {...dialogue, between: dialogue.between[1]}
                    } else {
                        return {...dialogue, between: dialogue.between[0]}
                    }
                })
                newList.sort((a, b) => {
                    return (a.messages[a.messages.length - 1].sentAt.seconds < b.messages[b.messages.length - 1].sentAt.seconds) - (a.messages[a.messages.length - 1].sentAt.seconds > b.messages[b.messages.length - 1].sentAt.seconds)
                })
                newList.forEach(dialogueData => {
                    getUserDataByID(database, dialogueData.between)
                        .then(betweenData => {
                            setMessagesList(prevState => [...prevState, {
                                ...betweenData,
                                dialogueId: dialogueData.dialogueId,
                                ...dialogueData,
                            }])
                        })
                })
            })
        // eslint-disable-next-line
    }, [myUserId])

    function calcTimeDifference(timeStamp) {
        let minDiff = Math.floor((Date.now() - timeStamp * 1000) / 60000)
        if (minDiff < 1) {
            return 'less than a minute'
        } else if (minDiff < 60) {
            return `${minDiff} minutes`
        } else if (minDiff < 1440) {
            return `${Math.floor(minDiff / 60)} hours`
        } else if (minDiff < 10080) {
            return `${Math.floor(minDiff / 1440)} days`
        } else if (minDiff < 99999999) {
            return `${Math.floor(minDiff / 10080)} weeks`
        }
    }

    return (
        <section className="messages-list">
            {messagesList.length !== 0 && messagesList.map(dialogue => {
                if (dialogue.messages.length !== 0) {
                    return <Link to={`/dialogue/${dialogue.userID}`} className={'messages-list__item'} key={uuid()}>
                        <img src={dialogue.photoURL ? dialogue.photoURL : guest} className={'messages-list__image'}
                             alt="user avatar"/>
                        <div className="messages-list__text">
                            <p>{dialogue.userName}</p>
                            <span>{dialogue.messages[dialogue.messages.length - 1].text}</span>
                            <span style={{opacity: '.6', fontSize: '.9em'}}>
                            Sent {calcTimeDifference(dialogue.messages[dialogue.messages.length - 1].sentAt.seconds)} ago
                        </span>
                        </div>
                    </Link>
                } else {
                    return <p>ss</p>
                }
            })}
        </section>
    )
}

export default MessagesList