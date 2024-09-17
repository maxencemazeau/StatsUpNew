import axios from 'axios'
import { followUser, unFollowUser } from "../axiosPath/axiosPath"

export const followOrUnFollow = async (isUnfollow, toFollow, currentUserId, token) => {
    let response
    if (isUnfollow === 0) {
        response = await axios.delete(unFollowUser, { data: { FollowingId: toFollow, FollowerId: currentUserId }, headers: { Authorization: `Bearer ${token}` } })
    } else {
        response = await axios.post(followUser, { FollowingId: toFollow, FollowerId: currentUserId }, { headers: { Authorization: `Bearer ${token}` } })
    }
}