import React, { useContext } from 'react'
import { View, StyleSheet } from "react-native"
import { Text } from "tamagui"
import { theUserProfil } from '../../pages/profil/profil'

export default function Highlight() {

    const { userProfil, UserID } = useContext(theUserProfil)

    return (
        <View style={{padding:20 }}>
            <Text style={{ fontSize:18, color:"black"}}>Highlight</Text>
            <View style={{ display: 'flex', flexDirection: 'Column', justifyContent: 'center', marginTop: 5, border : 1, borderRadius: 4, borderColor: 'lightgrey',padding:2 }}>
                <View style={styles.section}>
                    <Text style={styles.title}>Best Streak</Text>
                    <Text style={styles.stats}>4</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Most completed activity</Text>
                    <Text style={styles.stats}>{userProfil?.MostDoneActivity}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Most completed goal</Text>
                    <Text style={styles.stats}>{userProfil?.MostDoneGoal}</Text>
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
    stats:{
        color:"#DD7A34"
    },
    title : {
        color:"black"
    },
    section:{
        display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginTop : 10
    }
})
