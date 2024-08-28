import axios from 'axios'
import { followUser, unFollowUser } from "../axiosPath/axiosPath"

export const followOrUnFollow = async (isUnfollow, toFollow, currentUserId) => {
    let response
    if (isUnfollow === 0) {
        response = await axios.delete(unFollowUser, { params: { FollowingId: toFollow, FollowerId: currentUserId } })
    } else {
        response = await axios.post(followUser, { params: { FollowingId: toFollow, FollowerId: currentUserId } })
    }
}