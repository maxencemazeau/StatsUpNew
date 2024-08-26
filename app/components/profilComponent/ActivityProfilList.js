import React, { useContext } from 'react'
import { View, StyleSheet } from "react-native"
import { Text, Separator } from "tamagui"
import { theUserProfil } from '../../pages/profil/profil'
import { useQuery, useQueryClient } from "react-query";
import axios from 'axios'
import { getActivityProfilList } from '../../axiosPath/axiosPath';

export default function ActivityProfilList() {

    const { UserID } = useContext(theUserProfil)

    const LoadUserProfilActivity = async() => {
        const response = await axios.get(getActivityProfilList, { params : { UserId: UserID}})
        return response.data[0]
    }

    const { data: userProfilActivity, isLoading } = useQuery({
        queryFn: async () => LoadUserProfilAnbStats(),
        queryKey: ["userProfilActivity"],
    })

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
