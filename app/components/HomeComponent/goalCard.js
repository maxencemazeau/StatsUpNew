import React from "react"
import { View, StyleSheet } from "react-native";
import { ArrowRight } from "@tamagui/lucide-icons";
import { Card, Button, SizableText, Paragraph } from "tamagui";
import { getUserGoals } from "../../axiosPath/axiosPath"
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from 'axios'
import HomeCardSkeleton from "../skeleton/homeCardSkeleton";
import { useLoadMoreGoal } from "../../hooks/apiCall/goal/loadMoreGoal";

export default function GoalCard({goalOffset}) {

    const isMoreDataLoading = useSelector((state) => state.isGoalLoading.value)
    const User = useSelector((state) => state.login.user)
    const UserId = User.user[0].UserID
    useLoadMoreGoal(goalOffset)
    
    const { data : goalList } = useQuery({
        queryFn: async() => LoadUserGoals(),
        queryKey: ["goalList"],
        staleTime: Infinity
    })
 
    const LoadUserGoals = async () => {
        const response = await axios.get(getUserGoals, { params: { id: UserId, offset : 0} });
        return response.data.goal
    };


    return (
        <View style={styles.container}>
            {goalList?.map(goals => (
                <Card key={goals.GoalsID} style={styles.card}>
                    <Card.Header style={styles.cardHeader}>
                        <View>
                            <SizableText style={styles.typography} size={"$6"} fontWeight="800">{goals.GoalName}</SizableText>
                            <Paragraph style={styles.typography}>{goals.Frame} : 0/{goals.Frequence}</Paragraph>
                        </View>
                        <Button icon={<ArrowRight size="$1"/>}style={{ backgroundColor: "#DD7A34", borderRadius: 25, height:50 }} />
                    </Card.Header>
                </Card>
            ))}
            {isMoreDataLoading && <HomeCardSkeleton /> }
        </View>
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