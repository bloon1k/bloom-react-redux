import {doc, updateDoc} from 'firebase/firestore'

const follow = async (database, currentFollowingList, userId, followUserId, followFollowersList) => {
    const newFollowingList = [...currentFollowingList, followUserId]
    const newFollowersList = [...followFollowersList, userId]
    await updateDoc(doc(database, 'followers', userId), {
        following: newFollowingList
    })
    await updateDoc(doc(database, 'followers', followUserId), {
        followers: newFollowersList
    })
    return newFollowingList
}

export default follow