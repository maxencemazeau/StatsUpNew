import React, { useState } from "react"
import { View } from "react-native"
import { Button, Text, Avatar } from "tamagui" 
import BottomMenu from "../../navigation/bottomMenu"


export default function SearchResults(){

    const[following, setFollowing] = useState([
        {
            id:1,
            name:'samuel',
            following:true
        },
        {id:2,
        name:'vincent',
        following:false
        }
])

    return(
        <>
        <View style={{marginTop:20, padding:0}}>
            <Text color={"black"}>Results</Text>
            {following.map(follow =>(
                <View key={follow.id} style={{marginTop:10, backgroundColor: "white",padding:10, borderRadius:10, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                    <Avatar circular size="$3">
                            <Avatar.Image
                                // source={require("../assets/maxence.jpg")}
                            />
                            <Avatar.Fallback bc="lightgrey" />
                        </Avatar>
                    <Text color={"black"}>{follow.name}</Text>
                    </View>
                <Button style={{color: "#DD7A34", fontSize:12}}>{follow.following ? 'Unfollow' : 'Follow'}</Button>
            </View>
            ))}
        </View>
        </>
    )
}