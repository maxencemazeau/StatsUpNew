import React, { createContext, useContext, useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';
import HeadProfil from '../../components/profilComponent/headProfil';
import MainStatsProfil from '../../components/profilComponent/mainStatsProfil';
import Highlight from '../../components/profilComponent/highlight';
import ActivityProfilList from '../../components/profilComponent/ActivityProfilList';
import { useLocalSearchParams } from "expo-router"
import { getProfilInfoAndStats } from '../../axiosPath/axiosPath';
import { useQuery, useQueryClient } from "react-query";
import axios from 'axios'
import useGetUserId from '../../hooks/useGetUserId';
import HeadProfilSkeleton from '../../components/skeleton/headProfilSkeleton';
import { theUserProfil } from '../../context/profilContext';
import useGetUserToken from '../../hooks/useGetUserToken';
//const theUserProfil = createContext()

//export { theUserProfil }

export default function Profil() {

    const { UserID } = useLocalSearchParams(); //Peut etre le User connecter ou un sur lequel on a cliquer
    const [userInfo, setUserInfo] = useState([])
    const myUserID = useGetUserId()
    const userIdFromSearch = UserID
    const token = useGetUserToken()

    const LoadUserProfilAnbStats = async () => {
        const response = await axios.get(getProfilInfoAndStats, {
            params: { UserId: UserID, myUserId: myUserID }, headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUserInfo(response.data.userInfo[0])
        return response.data.userProfil[0]
    }

    const { data: userProfil, isLoading } = useQuery({
        queryFn: async () => LoadUserProfilAnbStats(),
        queryKey: ["userProfil", UserID]
    })

    return (
        <theUserProfil.Provider value={{ userProfil, userIdFromSearch, userInfo, setUserInfo, userIdFromSearch, UserID, myUserID }}>
            <View style={{ height: '95%' }}>
                <ScrollView>
                    <View>
                        {isLoading === true ?
                            <HeadProfilSkeleton />
                            :
                            <HeadProfil />
                        }
                        <MainStatsProfil />
                        <Highlight />
                        <ActivityProfilList />
                    </View>
                </ScrollView>
            </View>
        </theUserProfil.Provider>
    )
}
