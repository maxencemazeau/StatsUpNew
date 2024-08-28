import React from "react"
import { View, Text } from "react-native"
import { User, Users } from "@tamagui/lucide-icons"
import { Button } from "tamagui"
import { useRouter } from "expo-router"

export default function TopHomeBar() {

  const router = useRouter()

  const navigateTo = () => {
    router.push({
      pathname: '/pages/searchFriend/searchFriend'
    });
  }

  return (
    <View style={{ paddingLeft: 20, paddingTop: 40 }}>
      <Button icon={<Users size="$2" color={"black"} />} style={{ width: 50, height: 30, backgroundColor: "transparent" }} onPress={() => navigateTo()}></Button>
    </View>
  )
}