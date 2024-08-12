import React, { useState } from "react"
import { View, ScrollView } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router"
import LinkedActivity from "../../components/goalComponent/linkedActivity";

export default function GoalDetail() {

    
    return (
        <>
            <View style={{ height: "90%" }}>
                <ScrollView>
                    <View style={{ height: "100%", backgroundColor: "#222121", padding: 0 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, gap: 2 }}>
                            <Text style={{
                                padding: 0, color: "white",
                                fontWeight: "bold",
                                fontSize: 20
                            }}>GOAL NAME</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, paddingLeft: 2 }}>
                            
                        </View>
                    </View>
                    <View style={{ position: "absolute", top: "98%", left: 0, right: 0, height: "45%", backgroundColor: "white", padding: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <View style={{ paddingLeft: 2, paddingRight: 2, paddingTop: 2 }}>
                           
                        </View>
                            <LinkedActivity />
                    </View>
                </ScrollView >
            </View>
        </>
    )
}
