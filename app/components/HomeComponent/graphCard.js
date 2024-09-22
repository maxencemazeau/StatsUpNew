import React from "react"
import { Pressable, View } from "react-native"
import { Card, Text } from "tamagui"
import { useQuery } from "react-query";
import { getTotalActivityCompleted } from "../../axiosPath/axiosPath";
import useGetUserId from "../../hooks/useGetUserId";
import axios from "axios"
import useGetUserToken from "../../hooks/useGetUserToken";

export default function GraphCard() {

    const UserId = useGetUserId()
    const token = useGetUserToken()

    const { data: totalActivityCompleted, isLoading } = useQuery({
        queryFn: async () => getTotalCompleted(),
        queryKey: ["totalActivityCompleted"],
        staleTime: Infinity,
    })

    const getTotalCompleted = async () => {
        const response = await axios.get(getTotalActivityCompleted, {
            params: { id: UserId }, headers: {
                Authorization: `Bearer ${token}` // Pass token in the Authorization header
            }
        });
        return response.data.TotalActivityCompleted
    };

    return (
        <View maxWidth="md" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 0 }}>
            <Card style={{ padding: 10, flex: 1 }}>
                <Text style={{ padding: 2, paddingTop: 0, fontSize: 56, color: "#DD7A34" }}>{totalActivityCompleted > 0 ? totalActivityCompleted : 0}</Text>
                <Text style={{ padding: 2, fontSize: 18 }}>Total activity</Text>
                <Text style={{ padding: 2, fontSize: 18 }}>completed</Text>


            </Card>
            <View style={{ width: 20 }} />
            <Card style={{ padding: 10, flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: "white" }}>
                <Text color={"black"}>Coming Soon</Text>
            </Card>
        </View>
    )
}