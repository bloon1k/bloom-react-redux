import {collection, getDocs, query, where} from 'firebase/firestore'

async function getUserDataByEmail(database, userID) {
    const dataQuery = query(collection(database, 'usersData'), where('userID', '==', userID))
    let userData
    await getDocs(dataQuery).then(result => result.forEach(doc => userData = doc.data()))
    return userData
}

export default getUserDataByEmail