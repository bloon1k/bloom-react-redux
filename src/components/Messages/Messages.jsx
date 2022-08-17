import React, {useEffect, useState} from 'react'
// Styles
import './Messages.scss'
import {useSelector} from 'react-redux'
import getUserDialoguesByID from '../../utils/getUserDialoguesByID'

const Messages = () => {

    const database = useSelector(state => state.firebase.database)
    const myUserId = useSelector(state => state.userData.userID)
    const [messagesList, setMessagesList] = useState([])

    useEffect(() => {
        getUserDialoguesByID(database, myUserId)
            .then(dialoguesList => setMessagesList(dialoguesList))
        // eslint-disable-next-line
    }, [myUserId])

    return (
        <section className={'messages'}>

            <div className="messages__list">
                {messagesList.length !== 0 && messagesList.map(dialogue => {
                    return <p>{dialogue.between[0]}</p>
                })}
            </div>
            <div className="messages__current-dialogue">

            </div>

        </section>
    )
}

export default Messages