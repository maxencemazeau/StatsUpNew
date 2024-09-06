import React from "react"
import { useRouter } from "expo-router"
import { View } from "react-native"
import { Text, Button } from "tamagui"
import { ArrowLeft } from "@tamagui/lucide-icons"
import { useDispatch, useSelector } from "react-redux"
import { DeleteRoute } from "../reduxState/navigation/routingSlice"

export default function PageHeader({ Title, Color = "white" }) {

    const router = useRouter()
    const routes = useSelector((state) => state.globalNavigation.value)
    const dispatch = useDispatch()

    const navigateBack = () => {
        const index = routes.length - 1
        const path = routes[index]
        dispatch(DeleteRoute())
        router.push(path);
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 20, paddingTop: 40, gap: 10 }}>
            <Button
                icon={<ArrowLeft size="$2" color={Color} />}
                onPress={() => navigateBack()}
                style={{ backgroundColor: 'transparent' }}
            />
            <Text style={{
                padding: 0, color: Color,
                fontWeight: "bold",
                fontSize: 20
            }}>{Title}</Text>
        </View>
    )
}