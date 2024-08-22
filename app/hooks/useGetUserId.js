import React from "react"
import { useSelector } from "react-redux"

export default function useGetUserId() {
    const User = useSelector((state) => state.login.user)
    //console.log(User)
    return User.UserID//User.user[0].UserID
}