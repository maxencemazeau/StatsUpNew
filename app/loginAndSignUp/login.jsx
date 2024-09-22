import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from "expo-router"
import { Button, Input, Separator } from "tamagui"
import { setLogin, setLogout } from '../reduxState/authentication/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { userLogin } from '../axiosPath/axiosPath'
import { persistor } from '../reduxState/authentication/loginSlice';

export default function Login() {

    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn === true) {
            router.push('/pages/home/home');
        }
    }, [isLoggedIn])

    const navigateToSignUp = () => {
        router.push('loginAndSignUp/signUp'); // Navigate to the SignUp screen
    };

    const handleLogin = async () => {
        if (email === '' || password === '') {
            alert("Please enter your email and password")
            return
        }

        try {
            const response = await axios.get(userLogin, {
                params: {
                    email: email,
                    password: password,
                }
            })

            dispatch(setLogin(response.data));
            router.push('/pages/home/home');
        } catch (error) {
            console.error(error.response.data)
            alert("An error occurred during login. Please try again.")

        }
    };

    return (
        <>
            <View style={{ height: "100%", padding: 0, zIndex: 1 }}>
                <ScrollView>
                    <View style={{ display: "flex", alignItems: 'center', height: containerHeight / 2, backgroundColor: "white", padding: 20 }}>
                        <Image source={require("../assets/Nom_Noir.png")} style={{ height: "50%", width: "100%", top: "40%", resizeMode: 'contain' }}></Image>
                    </View>
                    <View style={{
                        height: containerHeight - 370, backgroundColor: "white", padding: 20, borderTopWidth: 1, borderColor: 'transparent',  // Hide the border color if not needed
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Input size="$5"
                            placeholder="Email"
                            style={{ width: "100%", backgroundColor: "white", marginTop: 20, marginBottom: 20, color: "black" }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Input
                            size="$5"
                            placeholder="Password"
                            margin="normal"
                            style={{ width: "100%", backgroundColor: "white", marginBottom: 20, color: "black" }}
                            value={password}
                            onChangeText={(text) => { setPassword(text) }}
                        />
                        <Button size="$5" style={{
                            backgroundColor: "#DD7A34", marginTop: 1, width: "100%", marginBottom: 20,
                        }}
                            onPress={handleLogin}
                        >LOGIN
                        </Button>
                        <Separator />
                        <Button
                            size="$5"
                            style={{
                                marginTop: 20, width: "100%", border: 1, borderColor: "lightgrey"
                            }} onPress={navigateToSignUp}>SIGN UP</Button>
                    </View>
                </ScrollView >
            </View>
        </>
    )
}