import React, { useState, useContext } from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { Button, Text, Avatar } from "tamagui"
import { useQuery } from "react-query";
import useGetUserId from "../../hooks/useGetUserId";
import { getFriendList } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from "../pageHeader";

export default function List() {

    const UserID = useGetUserId()
    const router = useRouter()

    const LoadFriendList = async () => {
        const response = await axios.get(getFriendList, { params: { UserId: UserID } })
        return response.data
    }

    const { data: friendList, isLoading } = useQuery({
        queryFn: async () => LoadFriendList(),
        queryKey: ["friendList"],
    })

    const navigateTo = (page, resultsUserId) => {
        router.push({
            pathname: `/pages${page}`,
            ...(page === '/profil/profil' && { params: { UserID: resultsUserId } })
        });
    }

    return (

        <View>
            <PageHeader Title={"Friend"} Color={"black"} />
            <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                {friendList?.map(friends => (
                    <View key={friends.UserID} style={{ marginTop: 10, backgroundColor: "white", padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableWithoutFeedback onPress={() => navigateTo("/profil/profil", friends.UserID)}>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Avatar circular size="$3">
                                    <Avatar.Image
                                    // source={require("../assets/maxence.jpg")}
                                    />
                                    <Avatar.Fallback bc="lightgrey" />
                                </Avatar>
                                <Text color={"black"}>{friends.FirstName} {friends.LastName}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Button style={{ color: "#DD7A34", fontSize: 12 }}>View profile</Button>
                    </View>
                ))}
            </View>
        </View>

    )
}