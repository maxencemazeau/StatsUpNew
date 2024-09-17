import React, { useState, useContext } from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { Button, Text, Avatar } from "tamagui"
//import { searchListContext } from "../../pages/searchFriend/searchFriend";
import { searchListContext } from "../../context/searchFriendContext"
import useGetUserId from "../../hooks/useGetUserId";
import { followUser, unFollowUser } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useRouter } from "expo-router";
import { followOrUnFollow } from "../../utils/followOrUnfollow";
import { useDispatch } from "react-redux";
import { AddRoute } from "../../reduxState/navigation/routingSlice";
import useGetUserToken from "../../hooks/useGetUserToken";

export default function SearchResults() {

    const { searchResults, setSearchResults } = useContext(searchListContext)
    const currentUserId = useGetUserId()
    const router = useRouter()
    const dispatch = useDispatch()
    const token = useGetUserToken()

    const ToggleFollowOrUnfollow = (UserID) => {
        let isUnfollow
        let userFound = false
        setSearchResults(prevList => {
            return prevList.map(item => {
                if (!userFound && UserID === item.UserID) {
                    userFound = true
                    item.isFollowing === 1 ? isUnfollow = 0 : isUnfollow = 1
                    return { ...item, isFollowing: item.isFollowing === 1 ? 0 : 1 }
                }
                return item
            })
        })
        followOrUnFollow(isUnfollow, UserID, currentUserId, token)
    }

    const navigateTo = (page, resultsUserId) => {
        dispatch(AddRoute(`/pages/searchFriend/searchFriend`))
        router.push({
            pathname: `/pages${page}`,
            ...(page === '/profil/profil' && { params: { UserID: resultsUserId } })
        });
    }

    return (
        <>
            <View style={{ marginTop: 20, padding: 0 }}>
                <Text color={"black"}>Results</Text>
                {searchResults?.map(results => (
                    <View key={results.UserID} style={{ marginTop: 10, backgroundColor: "white", padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableWithoutFeedback onPress={() => navigateTo("/profil/profil", results.UserID)}>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Avatar circular size="$3">
                                    <Avatar.Image
                                        source={results.Photo !== null ? { uri: results.Photo } : require("../../assets/baseProfilPhoto.png")}
                                    />
                                    <Avatar.Fallback bc="lightgrey" />
                                </Avatar>
                                <Text color={"black"}>{results.FirstName} {results.LastName}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Button style={{ color: "#DD7A34", fontSize: 12 }} onPress={() => ToggleFollowOrUnfollow(results.UserID)}>{results.isFollowing == 1 ? 'Unfollow' : 'Follow'}</Button>
                    </View>
                ))}
            </View>
        </>
    )
}