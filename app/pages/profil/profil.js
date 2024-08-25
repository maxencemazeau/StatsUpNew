import React, { createContext, useContext } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';
import HeadProfil from '../../components/profilComponent/headProfil';
import MainStatsProfil from '../../components/profilComponent/mainStatsProfil';
import Highlight from '../../components/profilComponent/highlight';
import ActivityProfilList from '../../components/profilComponent/ActivityProfilList';
import { useLocalSearchParams } from "expo-router"
import { getProfilInfoAndStats } from '../../axiosPath/axiosPath';
import { useQuery, useQueryClient } from "react-query";
import axios from 'axios'

const theUserProfil = createContext()

export { theUserProfil }

export default function Profil() {

    const { UserID } = useLocalSearchParams(); //Peut etre le User connecter ou un sur lequel on a cliquer

    const LoadUserProfilAnbStats = async () => {
        const response = await axios.get(getProfilInfoAndStats, { params: { UserId: UserID } })
        console.log(response.data)
        return response.data[0]
    }

    const { data: userProfil, isLoading } = useQuery({
        queryFn: async () => LoadUserProfilAnbStats(),
        queryKey: ["userProfil"],
    })

    return (
        <theUserProfil.Provider value={{ userProfil, UserID }}>
            <View style={{ height: '95%' }}>
                <ScrollView>
                    <View>
                        <HeadProfil />
                        <MainStatsProfil />
                        <Highlight />
                        <ActivityProfilList />
                    </View>
                </ScrollView>
            </View>
        </theUserProfil.Provider>
    )
}
