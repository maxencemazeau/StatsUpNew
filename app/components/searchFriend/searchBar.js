import React, { useState, useContext } from "react"
import { View } from "react-native"
import { Input, Button } from "tamagui"
import debounce from 'lodash.debounce';
import axios from "axios"
//import { searchListContext } from "../../pages/searchFriend/searchFriend";
import { searchListContext } from "../../context/searchFriendContext"
import { getSearchUser } from "../../axiosPath/axiosPath"
import useGetUserId from "../../hooks/useGetUserId";

export default function SearchBar() {

    const UserId = useGetUserId()
    const { searchResults, setSearchResults } = useContext(searchListContext)

    const debouncedSearch = debounce(async (value) => {
        if (value.length > 0) {
            const response = await axios.get(getSearchUser, { params: { UserID: UserId, search: value } })
            setSearchResults(response.data)
        }
    }, 1000);

    return (
        <View style={{ display: 'flex', direction: "column", gap: 20, marginTop: 20, alignItems: 'center', padding: 0 }}>
            <Input placeholder="Search username" style={{ width: `100%`, backgroundColor: "white", color: "black" }} onChangeText={(text) => debouncedSearch(text)}></Input>
        </View>
    )
}