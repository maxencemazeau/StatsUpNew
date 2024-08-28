import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "tamagui"
import { Avatar } from "tamagui"

export default function FeedResults() {

    const [following, setFollowing] = useState([
        {
            id: 1,
            name: 'samuel',
            text: 'has completed his ACTIVITY NAME, 2/$ of his PERIOD goal'
        },
        {
            id: 2,
            name: 'vincent',
            text: 'has completed his ACTIVITY NAME, 2/$ of his PERIOD goal'
        }
    ])


    return (
        <View style={{ padding: 2 }}>
            <Text style={{ fontSize: 14, color: "black" }}>Today</Text>
            {following.map(follow => (
                <View key={follow.id} style={{ marginTop: 2, marginBottom: 2, padding: 1, border: 1, borderColor: 'lightgrey', borderRadius: 2 }}>
                    <View>
                        <View>
                            <Avatar alt="Remy Sharp" src="src/app/assets/H.png" />
                        </View>
                        <View >
                            <Text style={{ fontSize: 14, color: "black" }}>{follow.name}</Text>
                            <Text style={{ color: "#DD7A34", fontSize: 12 }}>{follow.text}</Text>
                        </View>

                    </View>
                </View>
            ))}
        </View>
    )
}