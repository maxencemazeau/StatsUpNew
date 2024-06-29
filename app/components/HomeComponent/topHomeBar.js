import React from "react"
import { View, Text } from "react-native"
import { User, Users } from "@tamagui/lucide-icons"
import { Button } from "tamagui"
import { Link } from "expo-router"

export default function TopHomeBar(){

    return(
        <View style={{paddingLeft:20, paddingTop :40}}>
          <Button icon={<Users size="$2" color={"black"}/>} style={{ width :50, height:30, backgroundColor:"transparent"}}></Button>
        </View>
    )
}