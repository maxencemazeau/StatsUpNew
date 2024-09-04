import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from "react-native"
import { Text } from "tamagui"
import { theUserProfil } from '../../pages/profil/profil'
import axios from "axios"
import { getBestGoalStreak } from '../../axiosPath/axiosPath'

export default function Highlight() {

    const { userProfil, userIdFromSearch } = useContext(theUserProfil)
    const [bestStreak, setBeastStreak] = useState(0)

    useEffect(() => {
        const getActivityStats = async () => {
            const response = await axios.get(getBestGoalStreak, { params: { UserId: userIdFromSearch } })
            setBeastStreak(response.data)
        }

        getActivityStats()
    }, [])

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Highlight</Text>
            <View style={{
                display: 'flex', flexDirection: 'Column', justifyContent: 'center', marginTop: 5, border: 1, borderRadius: 10,
                borderColor: 'lightgrey', backgroundColor: "white", padding: 14
            }}>
                <View style={styles.section}>
                    <Text style={styles.title}>Best Streak</Text>
                    <Text style={styles.stats}>{bestStreak}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Most completed activity</Text>
                    <Text style={styles.stats}>{userProfil?.MostDoneActivity ?? "None"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Most completed goal</Text>
                    <Text style={styles.stats}>{userProfil?.MostDoneGoal ?? "None"}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Most time on an activity</Text>
                    <Text style={styles.stats}>TIME</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stats: {
        color: "#DD7A34",
        fontSize: 16
    },
    title: {
        color: "black",
        fontSize: 16
    },
    section: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5,
        marginBottom: 5
    }
})
