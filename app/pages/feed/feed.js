import React from 'react'
import { Link } from "expo-router"
import { View } from 'react-native'
import { ArrowLeft } from '@tamagui/lucide-icons'
import FeedResults from '../../components/feedComponent/feedResults'
import PageHeader from '../../components/pageHeader'
import { ScrollView } from 'tamagui'

export default function Feed() {

    return (
        <View style={{ height: '95%' }}>
            <ScrollView>
                <PageHeader Title={"Feed"} Color={"black"} />
                <FeedResults />
            </ScrollView>
        </View>
    )
}