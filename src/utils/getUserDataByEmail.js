import {collection, getDocs, query, where} from 'firebase/firestore'


async function getUserDataByEmail(database, email) {
    const dataQuery = query(collection(database, 'usersData'), where('email', '==', email))
    let userData
    await getDocs(dataQuery).then(result => result.forEach(doc => userData = doc.data()))
    return userData
}

export default getUserDataByEmail