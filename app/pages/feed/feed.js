import React from 'react'
import { Link } from "expo-router"
import { View } from 'react-native'
import { ArrowLeft } from '@tamagui/lucide-icons'
import FeedResults from '../../components/feedComponent/feedResults'

export default function Feed() {

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <Link href='/pages/home/home'>
                <ArrowLeft color={"black"} />
            </Link>
            <FeedResults />
        </View>
    )
}