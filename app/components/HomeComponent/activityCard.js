import React, { useState } from "react"
import { View, StyleSheet } from "react-native";
import { getActivity } from "../../axiosPath/axiosPath";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { ArrowRight } from "@tamagui/lucide-icons";
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { useLoadMoreActivity } from "../../hooks/apiCall/activity/loadMoreActivity";
import { Separator, Card, Button, SizableText, Paragraph } from "tamagui";

export default function ActivityCard({ activityOffset }) {

    const [timer, setTimer] = useState(false)
    const [timerText, setTimerText] = useState("START")
    const isMoreDataLoading = useSelector((state) => state.isActivityLoading.value)

    useLoadMoreActivity(activityOffset)

    const { data: activityList, isLoading } = useQuery({
        queryFn: async () => LoadUserActivies(),
        queryKey: ["activityList"],
        staleTime: Infinity,
    })

    const LoadUserActivies = async () => {
        const response = await axios.get(getActivity, { params: { id: 1, offset: 0 } });
        return response.data.activity
    };

    const changeTimer = () => {
        if (timer == false) {
            setTimer(true);
            setTimerText("STOP")
        } else {
            setTimer(false);
            setTimerText("START")
        }

    }

    return (
        <>
        <View style={styles.container}>
            {activityList?.map(activities => (
                <Card key={activities.ActivityID} style={styles.card}>
                    <Card.Header style={styles.cardHeader}>
                        <View>
                            <SizableText style={styles.typography} size={"$6"} fontWeight="800">{activities.ActivityName}</SizableText>
                            <Paragraph style={styles.typography}>{activities.GoalName} : 0/{activities.Frequence}</Paragraph>
                        </View>
                        <Button icon={<ArrowRight size="$1"/>}style={{ backgroundColor: "#DD7A34", borderRadius: 25, height:50 }} />
                    </Card.Header>
                    {activities.Timer &&
                        <View style={{paddingRight:18, paddingLeft:18}}>
                            <Separator />
                            <View style={{...styles.cardHeader, paddingTop:10}}>     
                                <SizableText size={"$6"} color={timer == true ? 'red' : 'green'} fontWeight="800" onPress={() => changeTimer()}>{timerText}</SizableText>
                                <Paragraph color={"black"}>10:00:00</Paragraph>
                            </View>
                        </View>}
                </Card>
            ))}
            {isMoreDataLoading && <HomeCardSkeleton /> }      
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card:{
        backgroundColor:"white",
        marginBottom:15
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom:10
    },
    typography:{
        color:"black"
    }
})