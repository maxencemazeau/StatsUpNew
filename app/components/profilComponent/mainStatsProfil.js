import React from 'react'
import { View, StyleSheet } from "react-native"
import { Text, Separator } from "tamagui"

export default function MainStatsProfil() {

    return (
        <View style={{paddingRight:20, paddingLeft:20}}>
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{...styles.StatsNumber, color: '#DD7A34' }}>40</Text>
                <Text style={styles.titleStats}>Total activity</Text>
            </View>
            <Separator alignSelf="stretch" vertical />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.StatsNumber}>20/30</Text>
                <Text style={styles.titleStats}>Total goal</Text>
            </View>
            <Separator alignSelf="stretch" vertical/>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.StatsNumber}>40 %</Text>
                <Text style={styles.titleStats}>Success rate</Text>
            </View>
        
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:15, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15,
        borderRadius: 14, backgroundColor:"white" 
    },
    StatsNumber:{
        fontSize:20,
        color:"black"
    },
    titleStats:{
        fontSize:16,
        color:"black"

    }
})
