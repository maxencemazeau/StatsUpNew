import React from 'react'
import { View, StyleSheet } from "react-native"
import { Text, Separator } from "tamagui"

export default function ActivityProfilList() {


    return (
        <View style={{ paddingRight: 20, paddingLeft:20 }}>
            <Text style={{fontSize: 18, color:"black" }}>Activity List</Text>
            <View style={{ display: 'flex', flexDirection: 'Column', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text style={{  color:"black" }}>Gym</Text>
                        <Text style={{  color: 'grey' }}>Goal name, x per week</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={{   color: '#DD7A34', alignSelf:'flex-end' }}>12</Text>
                        <Text style={{  color: 'grey' }}>6/10</Text>
                    </View>
                </View>
                <Separator/>
                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text style={{  color:"black" }}>Guitar</Text>
                        <Text style={{  color: 'grey' }}>Guitar goal, x per week</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={{ color: '#DD7A34', alignSelf:'flex-end' }}>15</Text>
                        <Text style={{ color: 'grey' }}>4/4</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        marginTop:10,
        marginBottom:10
    },
    subContainer:{
        display: 'flex', flexDirection: 'column',
    }
})
