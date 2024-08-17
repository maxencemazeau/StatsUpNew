import React from "react"
import { useRouter } from "expo-router"
import { View } from "react-native"
import { Text, Button } from "tamagui"
import { ArrowLeft } from "@tamagui/lucide-icons"

export default function PageHeader({ Title }) {

    const router = useRouter()

    const navigateBack = () => {
        router.push('/pages/home/home');
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 20, paddingTop: 40, gap: 10 }}>
            <Button
                icon={<ArrowLeft size="$2" color={'white'} />}
                onPress={() => navigateBack()}
                style={{ backgroundColor: 'transparent' }}
            />
            <Text style={{
                padding: 0, color: "white",
                fontWeight: "bold",
                fontSize: 20
            }}>{Title}</Text>
        </View>
    )
}