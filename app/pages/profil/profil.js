import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';
import HeadProfil from '../../components/profilComponent/headProfil';
import MainStatsProfil from '../../components/profilComponent/mainStatsProfil';
import Highlight from '../../components/profilComponent/highlight';
import ActivityProfilList from '../../components/profilComponent/ActivityProfilList';

export default function Profil() {

    return (
        <View style={{height: '95%'}}>
            <ScrollView>
                <View>
                    <HeadProfil />
                    <MainStatsProfil />
                    <Highlight />
                    <ActivityProfilList />
                </View>
            </ScrollView>
        </View>
    )
}
