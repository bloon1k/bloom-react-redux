import {doc, getDoc} from 'firebase/firestore'

async function getFollowersDataByID(database, userID) {
    const docRef = doc(database, 'followers', userID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        console.log(docSnap.data())
        return docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
    }
}

export default getFollowersDataByID