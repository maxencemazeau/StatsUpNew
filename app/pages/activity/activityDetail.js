import React, { useState } from "react"
import { View, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter, useLocalSearchParams } from "expo-router"
import { Button, Text } from "tamagui"
import { useQuery, useQueryClient } from "react-query";
import axios from "axios"
import ActivityHistory from "../../components/activity/activityHistory";
import ActivityInformation from "../../components/activity/activityInformation";
import { getUserActivityByID } from "../../axiosPath/axiosPath";

export default function ActivityDetail() {

    const { activityID } = useLocalSearchParams();
    const [selectedChartPeriod, setSelectedChartPeriod] = useState(1)
    const [activityTimer, setActivityTimer] = useState(false)
    const router = useRouter()

    const { data: userActivity, isLoading } = useQuery({
        queryFn: async () => LoadActivity(),
        queryKey: ["userActivity"],
    })

    const LoadActivity = async () => {
        const response = await axios.get(getUserActivityByID, { params: { ActivityID: activityID } });
        return response.data[0]
    };

    console.log(userActivity)


    const navigateBack = () => {
        router.push('/pages/home/home');
    }

    return (
        <View style={{ height: '95%' }}>
            <ScrollView >
                <View style={{ backgroundColor: "#191919", padding: 0 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 20, paddingTop: 40, gap: 10 }}>
                        <Button
                            icon={<ArrowLeft size="$2" color={'white'} />}
                            onPress={() => navigateBack()}
                            style={{ backgroundColor: 'transparent' }}
                        />
                        {!isLoading &&
                            <Text style={{
                                padding: 0,
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 20
                            }}>{userActivity.ActivityName}</Text>
                        }
                    </View>
                    <View style={{ height: 400, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, paddingLeft: 20 }}>

                    </View>
                    <View style={{ backgroundColor: "#191919" }}>
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    <View>
                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: "center",
                            justifyContent: "space-around", gap: 20, border: 1, borderRadius: 10, borderColor: "black", padding: 15,
                            backgroundColor: "white"
                        }}>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Total</Text>
                                <Text style={styles.statsTextValue}>46</Text>
                            </View>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Best Streak</Text>
                                <Text style={styles.statsTextValue}>46</Text>
                            </View>
                            <View style={styles.statsTextcontainer}>
                                <Text style={styles.statsTextLabel}>Reached</Text>
                                <Text style={styles.statsTextValue}>5/10</Text>
                            </View>
                        </View>
                    </View>
                    {!isLoading && <ActivityInformation />}
                    {/* <ActivityHistory /> */}
                </View>
            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
    statsTextLabel: {
        fontSize: 18,
        color: "#191919"
    },
    statsTextValue: {
        fontSize: 24,
        color: "#DD7A34",
        fontWeight: "bold"
    },
    statsTextcontainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    }
})
