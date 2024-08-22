import React, { useState } from "react"
import { View } from "react-native"
import { Input } from "tamagui"

export default function SearchBar(){

    const [searchFocus, setSearchFocus] = useState(false)

    const OnFocusSearchFocusState = () => {
        setSearchFocus(true)
    }

    const OnBlurSearchFocusState = () => {
        setSearchFocus(false)
    }


    return (
        <View style={{display:'flex', direction: "row", gap : 20, marginTop:20, alignItems:'center', padding:0}}>
            <Input placeholder="Search username" style={{ width: "100%", backgroundColor: "white", color: "black" }}></Input>
            {searchFocus && <Button>Cancel</Button>}
        </View>
    )
}