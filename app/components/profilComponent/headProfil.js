import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { Text, Button } from "tamagui"
import { Link } from 'expo-router'

export default function HeadProfil(){


    return(
            <View style={{padding:20}}>
                    <Link href='/pages/home/home'>
                        <ArrowLeft color={"black"}/>
                    </Link>
                <View style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:5}}>
                    <Image source={require("../../assets/maxence.jpg")} style={style.image}/>
                    <Text style={{fontSize:20, marginTop:10, color:"black"}}>Maxence Mazeau</Text>
                    <Button style={{ bgcolor: "#DD7A34", marginTop: 10 }}>Follow</Button>
                </View>
            </View>
    )
}

const style = StyleSheet.create({
    image:{
        width:200,
        height:200,
        borderRadius : 100
    }
})