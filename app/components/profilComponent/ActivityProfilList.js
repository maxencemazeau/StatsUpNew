import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Pressable } from "react-native"
import { Text, Separator } from "tamagui"
import { theUserProfil } from '../../context/profilContext';
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from 'expo-router';
import axios from 'axios'
import { getActivityProfilList } from '../../axiosPath/axiosPath';
import { useDispatch } from 'react-redux';
import { AddRoute } from '../../reduxState/navigation/routingSlice';
import useGetUserToken from '../../hooks/useGetUserToken';

export default function ActivityProfilList() {

    const { userIdFromSearch } = useContext(theUserProfil)
    const router = useRouter()
    const dispatch = useDispatch()
    const token = useGetUserToken()

    const LoadUserProfilActivity = async () => {
        const response = await axios.get(getActivityProfilList, {
            params: { UserId: userIdFromSearch }, headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }

    const { data: userProfilActivity, isLoading } = useQuery({
        queryFn: async () => LoadUserProfilActivity(),
        queryKey: ["userProfilActivity"],
    })

    const navigateToDetail = (activityID) => {
        dispatch(AddRoute('/pages/profil/profil'))
        router.push({
            pathname: '/pages/activity/activityDetail',
            params: { activityID: activityID, userIdFromSearch: userIdFromSearch }
        });
    }

    return (
        <View style={{ paddingRight: 20, paddingLeft: 20, paddingBottom: 20 }}>
            {userProfilActivity?.length > 0 &&
                <>
                    <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Activity List</Text>
                    <View style={{ display: 'flex', flexDirection: 'Column', justifyContent: 'center', borderRadius: 14, backgroundColor: "white", padding: 10, marginTop: 5 }}>

                        {userProfilActivity?.map((activities, index) => (
                            <Pressable key={activities.ActivityID} onPress={() => navigateToDetail(activities.ActivityID)}>
                                <>
                                    {index !== 0 && <Separator height={1} borderColor={"#eeeeee"} />}
                                    <View style={styles.container}>
                                        <View style={styles.subContainer}>
                                            <Text style={{ color: "black", fontSize: 16 }}>{activities.ActivityName}</Text>
                                            <Text style={{ color: 'grey', fontSize: 14 }}>{activities.GoalName}, {activities.Frequence} {activities.Frame}</Text>
                                        </View>
                                        <View style={styles.subContainer}>
                                            <Text style={{ color: '#DD7A34', alignSelf: 'flex-end', fontWeight: "bold", fontSize: 16 }}>{activities.TotalActivity}</Text>
                                            <Text style={{ color: 'grey', fontSize: 14 }}>{activities.TotalAchievedGoals}/{activities.TotalGoals}</Text>
                                        </View>
                                    </View>
                                </>
                            </Pressable>
                        ))}
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    subContainer: {
        display: 'flex', flexDirection: 'column',
    }
})
