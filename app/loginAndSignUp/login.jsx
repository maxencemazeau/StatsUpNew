import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { Link, useRouter } from "expo-router"
import { Button, Input, Text, Separator } from "tamagui"
import * as Font from 'expo-font';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { setLogin } from '../reduxState/authentication/loginSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { userLogin } from '../axiosPath/axiosPath'

export default function Login() {

    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const navigateToSignUp = () => {
        router.push('loginAndSignUp/signUp'); // Navigate to the SignUp screen
      };

    const handleLogin =  async () => {
        if (email === '' || password === '') {
            alert("Please enter your email and password")
             return
         }

         try {
             const response = await axios.post(userLogin, {
                 email: email,
                password: password,
             })
             dispatch(setLogin(response.data));

            router.push('/pages/home/home');
         } catch (error) {
             console.error(error)
             alert("An error occurred during login. Please try again.")

         }
    };

    return (
        <>
            <View style={{ height: "100%", padding: 0, zIndex: 1 }}>
                <ScrollView>
                    <View style={{ display: "flex", alignItems: 'center', height: containerHeight / 2, backgroundColor: "white", padding: 20 }}>
                        <Image source={require("../assets/H.png")} style={{ height: "50%", width: "50%", top: "30%" }}></Image>
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
                            style={{ width: "100%", backgroundColor: "white", marginTop:20, marginBottom: 20, color: "black" }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Input
                            size="$5"
                            placeholder="Password"
                            margin="normal"
                            style={{ width: "100%", backgroundColor: "white", marginBottom: 20, color: "black" }}
                            value={password}
                            onChangeText={(text) => {setPassword(text); console.log(text)}}
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