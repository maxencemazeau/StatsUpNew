import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import axios from "axios"
import { Button, Card, Text, Checkbox } from "tamagui"
import { Check } from '@tamagui/lucide-icons'
import { activityWithNoGoal } from "../../axiosPath/axiosPath"

export default function LinkedActivity({linkedActivity, UserId}) {

    
    const [activityList, setActivityList] = useState([])  


    useEffect(() => {
        const LoadActivitiesWithNoGoal = async () => {
            const response = await axios.get(activityWithNoGoal, { params: { id: UserId } });
            setActivityList(response.data)
        };

        LoadActivitiesWithNoGoal()
    },[])


    const AddOrRemoveLinkedActivity = (id, isChecked) =>{
       if(isChecked == true){
            linkedActivity.push(id)
       } else {
           linkedActivity = linkedActivity.filter(item => item !== id) 
       }
    }

    console.log(linkedActivity)

    return (
        <View>
            {activityList?.map(activities => (
            <Card key={activities.ActivityID} style={styles.container}>
                <Card.Header style={styles.activityCardHeader}>
                    <Text>{activities.ActivityName}</Text>
                    <Checkbox size="$6" style={{backgroundColor:"white"}} onCheckedChange={(isChecked) => AddOrRemoveLinkedActivity(activities.ActivityID, isChecked)} >
                      <Checkbox.Indicator>
                        <Check color={"#DD7A34"}/>
                      </Checkbox.Indicator>
                    </Checkbox>
                </Card.Header>
            </Card>
              ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:10
    },
    activityCardHeader:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10
    }
})