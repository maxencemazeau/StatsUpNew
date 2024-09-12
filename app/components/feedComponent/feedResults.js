import React, { useState } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Text, Button, ScrollView } from "tamagui"
import { Avatar } from "tamagui"
import { getFeed } from "../../axiosPath/axiosPath"
import useGetUserId from "../../hooks/useGetUserId"
import { useQuery } from "react-query"
import axios from "axios"
import { useDispatch } from "react-redux"
import { AddRoute } from "../../reduxState/navigation/routingSlice"
import { useRouter } from 'expo-router';
import FeedSkeleton from "../skeleton/feedSkeleton"

export default function FeedResults() {

    const UserID = useGetUserId()
    const dispatch = useDispatch()
    const router = useRouter()

    const LoadFeed = async () => {
        const response = await axios.get(getFeed, { params: { UserID: UserID } })
        return response.data
    }

    const { data: feedResult, isLoading } = useQuery({
        queryFn: async () => LoadFeed(),
        queryKey: ["feedResult"]
    })

    const navigateTo = (UserID) => {
        dispatch(AddRoute('/pages/feed/feed'))
        router.push({
            pathname: '/pages/profil/profil',
            params: { UserID: UserID }
        });
    }

    return (
        <>
            {isLoading === true ? <FeedSkeleton /> :
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {feedResult?.map(feed => (
                        <Pressable key={feed.ActivityHistoryID} style={styles.container} onPress={() => navigateTo(feed.UserID)}>
                            <Button style={styles.groupButton} icon={<Avatar circular size="$3">
                                <Avatar.Image
                                    source={require("../../assets/baseProfilPhoto.png")}
                                />
                                <Avatar.Fallback bc="lightgrey" />
                            </Avatar>} onPress={() => navigateTo("/profil/profil")}></Button>
                            <View style={{ flex: 1, width: "100%" }}>
                                <Text style={{ fontSize: 14, color: "black", marginBottom: 5, fontWeight: "bold" }}>{feed.FirstName} {feed.LastName}</Text>
                                <Text style={{
                                    fontSize: 13, color: "black", marginBottom: 3,
                                    color: feed.Succeed === 1 ? 'green' : feed.Succeed === null || feed.Succeed === 0 ? 'black' : 'red'
                                }}>{feed.text}</Text>
                                <Text style={{ fontSize: 11, color: "grey", alignSelf: "flex-end" }}>{feed.TimeStamp}</Text>
                            </View>

                        </Pressable>
                    ))}
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 14,
        backgroundColor: "white",
        marginBottom: 15
    },
    groupButton: {
        backgroundColor: "white",
    }
})
