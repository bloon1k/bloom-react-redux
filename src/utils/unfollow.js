import {doc, updateDoc} from 'firebase/firestore'

const unfollow = async (database, currentFollowingList, userId, unfollowUserId, unfollowFollowersList) => {
    const newFollowingList = []
    const newFollowersList = []
    currentFollowingList.forEach(follower => {
        if (follower !== unfollowUserId) {
            newFollowingList.push(follower)
        }
    })
    unfollowFollowersList.forEach(follower => {
        if (follower !== userId) {
            newFollowersList.push(follower)
        }
    })
    await updateDoc(doc(database, 'followers', userId), {
        following: newFollowingList
    })
    await updateDoc(doc(database, 'followers', unfollowUserId), {
        followers: newFollowersList
    })
    return newFollowingList
}

export default unfollow