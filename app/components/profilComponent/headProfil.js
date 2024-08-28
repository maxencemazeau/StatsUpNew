import React, { useContext } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ArrowLeft, User } from '@tamagui/lucide-icons';
import { Text, Button } from "tamagui"
import { Link } from 'expo-router'
import { theUserProfil } from '../../pages/profil/profil';
import useGetUserId from '../../hooks/useGetUserId';
import { followOrUnFollow } from '../../utils/followOrUnfollow';

export default function HeadProfil() {

    const { userInfo, setUserInfo } = useContext(theUserProfil)
    const myUserID = useGetUserId()
    const ToggleFollowOrUnfollow = (UserID) => {
        let isUnfollow
        userInfo?.isFollowing === 1 ? isUnfollow = 0 : isUnfollow = 1
        console.log(isUnfollow)
        setUserInfo(prevState => ({ ...prevState, isFollowing: isUnfollow }))
        console.log(userInfo)
        followOrUnFollow(isUnfollow, UserID, myUserID)
    }

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Link href='/pages/home/home'>
                    <ArrowLeft color={"black"} />
                </Link>
                <TouchableWithoutFeedback>
                    <View style={{ height: 40, width: 50 }}>
                        <Link href='/pages/friendList/friendList'>
                            <User color={"black"} style={{ alignSelf: "center" }} />
                        </Link>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Image source={require("../../assets/maxence.jpg")} style={style.image} />
                <Text style={{ fontSize: 20, marginTop: 10, color: "black" }}>{userInfo?.FirstName} {userInfo?.LastName}</Text>
                {myUserID !== userInfo?.UserID && <Button style={{ bgcolor: "#DD7A34", marginTop: 10 }} onPress={() => ToggleFollowOrUnfollow(userInfo?.UserID)}>{userInfo?.isFollowing === 1 ? "Unfollow" : "Follow"}</Button>}
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100
    }
})