import React, { useContext, useState, useEffect } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeft, User, Camera, LogOut } from '@tamagui/lucide-icons';
import { Text, Button } from "tamagui"
import { useRouter } from 'expo-router'
import { useQueryClient } from 'react-query'; // Importer le client de React Query
import { theUserProfil } from '../../context/profilContext';
import useGetUserId from '../../hooks/useGetUserId';
import { followOrUnFollow } from '../../utils/followOrUnfollow';
import * as ImagePicker from 'expo-image-picker';
import { changeProfilPhoto } from '../../axiosPath/axiosPath';
import axios from "axios"
import { AddRoute, DeleteRoute } from '../../reduxState/navigation/routingSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function HeadProfil() {

    const [image, setImage] = useState("../../assets/baseProfilPhoto.png");
    const { userInfo, setUserInfo, UserID } = useContext(theUserProfil)
    const myUserID = useGetUserId()
    const dispatch = useDispatch()
    const router = useRouter()
    const routes = useSelector((state) => state.globalNavigation.value)
    const queryClient = useQueryClient(); // Obtenir le client de React Query

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

    const navigateBack = () => {
        const index = routes.length - 1
        const path = routes[index]
        dispatch(DeleteRoute())
        if (path === '/pages/friendList/friendList') {
            router.push({
                pathname: path,
                params: { UserIdParams: myUserID }
            });
        } else {
            router.push(path);
        }
    }

    const navigateTo = (path) => {
        dispatch(AddRoute("/pages/profil/profil"))
        router.push({
            pathname: path,
            params: { UserIdParams: myUserID !== UserID ? UserID : myUserID }
        });
    }

    const logout = () => {
        queryClient.resetQueries();
        router.push('/loginAndSignUp/login')
    }

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                    icon={<ArrowLeft size="$2" color={`black`} />}
                    onPress={() => navigateBack()}
                    style={{ backgroundColor: 'transparent' }}
                />
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {myUserID === userInfo?.UserID &&
                        <Pressable>
                            <Button
                                icon={<User size="$2" color={"black"} style={{ alignSelf: "center" }} />}
                                onPress={() => navigateTo(`/pages/friendList/friendList`)}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </Pressable>
                    }
                    <Button style={{ backgroundColor: 'transparent' }} onPress={() => logout()}>
                        <LogOut size={"$2"} color={"black"} />
                    </Button>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Image source={userInfo?.Photo !== null ? { uri: image } : require("../../assets/baseProfilPhoto.png")} style={style.image} />
                {myUserID === userInfo?.UserID &&
                    <Pressable style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: "#2580E1", position: 'absolute', bottom: 30 }} onPress={() => changePhoto()}>
                        <Camera color={"#2580E1"} />
                    </Pressable>
                }
                <Text style={{ fontSize: 20, marginTop: 10, color: "black" }}>{userInfo?.FirstName} {userInfo?.LastName}</Text>
                {userInfo?.UserID && myUserID !== userInfo?.UserID && (<Button style={{ bgcolor: "#DD7A34", marginTop: 10 }} onPress={() => ToggleFollowOrUnfollow(userInfo?.UserID)}>{userInfo?.isFollowing === 1 ? "Unfollow" : "Follow"}</Button>)}
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