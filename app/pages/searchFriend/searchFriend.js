import React, { useState, createContext } from "react"
import SearchBar from "../../components/searchFriend/searchBar"
import { ArrowLeft } from "@tamagui/lucide-icons"
import { Link } from 'expo-router'
import { View } from "react-native"
import SearchResults from "../../components/searchFriend/searchResults"

const searchListContext = createContext()

export { searchListContext }

export default function SearchFriend() {

    const [searchResults, setSearchResults] = useState([])

    return (
        <searchListContext.Provider value={{ searchResults, setSearchResults }}>
            <View style={{ padding: 20 }}>
                <Link href='/pages/home/home'>
                    <ArrowLeft size="$2" color={"black"} />
                </Link>
                <SearchBar />
                <SearchResults />
            </View>
        </searchListContext.Provider>
    )
}