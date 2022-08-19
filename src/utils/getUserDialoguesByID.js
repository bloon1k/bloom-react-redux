import {collection, getDocs, query, where} from 'firebase/firestore'

async function getUserDialoguesByID(database, userId) {
    const dataQuery = query(collection(database, 'dialogues'), where('between', 'array-contains', userId))
    let dialoguesList = []
    await getDocs(dataQuery).then(result => result.forEach(doc => dialoguesList.push({
        ...doc.data(),
        dialogueId: doc.id
    })))
    return dialoguesList
}

export default getUserDialoguesByID