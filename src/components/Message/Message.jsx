import React from 'react'
// Styles
import './Message.scss'

const Message = ({message}) => {

    const dateArr = new Date(message.sentAt.seconds * 1000).toString().split(' ')
    const date = `${dateArr[4]} ${dateArr[2]} ${dateArr[1]}`

    return (
        <div className={`message ${message.senderID !== message.betweenId ? 'message__right' : 'message__left'}`}>
            <p className={'message__text'}>{message.text}</p>
            <p className={'message__date'}>{date}</p>
        </div>
    )
}

export default Message