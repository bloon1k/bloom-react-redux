import {doc, getDoc} from 'firebase/firestore'

async function getPostsDataByID(database, userID) {
    const docRef = doc(database, 'posts', userID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data().postList
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
    }
}

export default getPostsDataByID