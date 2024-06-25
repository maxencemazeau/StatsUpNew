import React from "react"
import { View } from "react-native"
import { Card, Text, Paragraph } from "tamagui"



export default function GraphCard() {


    return (
        <View maxWidth="md" style={{ display:"flex", flexDirection:"row", justifyContent:"space-between",paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 0 }}>
            <Card style={{padding:10, flex:1}}>
                        <Text style={{paddingLeft:2, paddingTop:2,  fontSize:48 ,color : "#DD7A34"}}>46</Text>
                        <Text style={{paddingLeft:2, fontSize:18}}>Total activity</Text>
                        <Text style={{paddingLeft:2, fontSize:18}}>completed</Text>


            </Card>
            <View style={{ width: 20 }} />
            <Card style={{padding:10, flex:1}}>
                        <Text style={{paddingLeft:2, paddingTop:2,  fontSize:48 ,color : "#DD7A34"}}>46</Text>
                        <Text style={{paddingLeft:2, fontSize:18}}>Total activity</Text>
                        <Text style={{paddingLeft:2, fontSize:18}}>completed</Text>


            </Card>
        </View>
    )
}