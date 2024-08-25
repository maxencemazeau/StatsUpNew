import React, { useState, useContext } from "react"
import { View } from "react-native"
import { Button, Text, Avatar } from "tamagui"
import { searchListContext } from "../../pages/searchFriend/searchFriend";
import useGetUserId from "../../hooks/useGetUserId";
import { followUser, unFollowUser } from "../../axiosPath/axiosPath";
import axios from 'axios'

export default function SearchResults() {

    const { searchResults, setSearchResults } = useContext(searchListContext)
    const UserId = useGetUserId()

    const ToggleFollowOrUnfollow = (UserID) => {
        let isUnfollow = false
        let userFound = false
        setSearchResults(prevList => {
            return prevList.map(item => {
                if (!userFound && UserID === item.UserID) {
                    userFound = true
                    item.isFollowing === 1 ? isUnfollow = true : isUnfollow = false
                    return { ...item, isFollowing: item.isFollowing === 1 ? 0 : 1 }
                }
                return item
            })
        })
        deleteOrAddFollow(isUnfollow, UserID)
    }

    const deleteOrAddFollow = async (isUnfollow, toFollow) => {
        let response
        if (isUnfollow === true) {
            response = await axios.delete(unFollowUser, { params: { FollowingId: toFollow, FollowerId: UserId } })
        } else {
            response = await axios.post(followUser, { params: { FollowingId: toFollow, FollowerId: UserId } })
        }

        console.log(response.data)
    }

    return (
        <>
            <View style={{ marginTop: 20, padding: 0 }}>
                <Text color={"black"}>Results</Text>
                {searchResults?.map(results => (
                    <View key={results.UserID} style={{ marginTop: 10, backgroundColor: "white", padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Avatar circular size="$3">
                                <Avatar.Image
                                // source={require("../assets/maxence.jpg")}
                                />
                                <Avatar.Fallback bc="lightgrey" />
                            </Avatar>
                            <Text color={"black"}>{results.FirstName} {results.LastName}</Text>
                        </View>
                        <Button style={{ color: "#DD7A34", fontSize: 12 }} onPress={() => ToggleFollowOrUnfollow(results.UserID)}>{results.isFollowing == 1 ? 'Unfollow' : 'Follow'}</Button>
                    </View>
                ))}
            </View>
        </>
    )
}