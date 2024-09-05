import React, { useContext, useState, useEffect } from 'react'
import { Image, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ArrowLeft, User, Camera } from '@tamagui/lucide-icons';
import { Text, Button } from "tamagui"
import { Link } from 'expo-router'
import { theUserProfil } from '../../pages/profil/profil';
import useGetUserId from '../../hooks/useGetUserId';
import { followOrUnFollow } from '../../utils/followOrUnfollow';
import * as ImagePicker from 'expo-image-picker';
import { changeProfilPhoto } from '../../axiosPath/axiosPath';
import axios from "axios"

export default function HeadProfil() {

    const [image, setImage] = useState("");
    const { userInfo, setUserInfo } = useContext(theUserProfil)
    const myUserID = useGetUserId()

    useEffect(() => {
        setImage(userInfo?.Photo)
    }, [userInfo])

    const ToggleFollowOrUnfollow = (UserID) => {
        let isUnfollow
        userInfo?.isFollowing === 1 ? isUnfollow = 0 : isUnfollow = 1
        setUserInfo(prevState => ({ ...prevState, isFollowing: isUnfollow }))
        followOrUnFollow(isUnfollow, UserID, myUserID)
    }

    const changePhoto = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            // Now you can send the Blob to your backend
            const formData = new FormData();
            formData.append("photo", {
                uri: result.assets[0].uri,
                type: 'image/jpeg', // Adjust type as needed
                name: 'profilePhoto.jpg'
            });

            await axios.put(changeProfilPhoto, formData, {
                params: { UserID: myUserID },
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setUserInfo(prevState => ({ ...prevState, Photo: result.assets[0].uri }))
        }
    }

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Link href='/pages/home/home'>
                    <ArrowLeft color={"black"} />
                </Link>
                {myUserID === userInfo?.UserID &&
                    <TouchableWithoutFeedback>
                        <View style={{ height: 40, width: 50 }}>
                            <Link href='/pages/friendList/friendList'>
                                <User color={"black"} style={{ alignSelf: "center" }} />
                            </Link>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Image source={userInfo?.Photo !== null ? { uri: image } : require("../../assets/baseProfilPhoto.png")} style={style.image} />
                {myUserID === userInfo?.UserID &&
                    <Pressable style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: "#2580E1", position: 'absolute', bottom: 30 }} onPress={() => changePhoto()}>
                        <Camera color={"#2580E1"} />
                    </Pressable>
                }
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