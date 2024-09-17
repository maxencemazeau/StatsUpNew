import React from "react"
import { useSelector } from "react-redux"

export default function useGetUserToken() {
    const User = useSelector((state) => state.login.user)
    return User ? User.token : null
}