import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from "expo-router"
import { Button, Input, Separator } from "tamagui"
import { setLogin, setLogout } from '../reduxState/authentication/loginSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { userLogin } from '../axiosPath/axiosPath'
import { persistor } from '../reduxState/authentication/loginSlice';

export default function Login() {

    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height);
    const { width, height } = Dimensions.get('window');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {

            dispatch(setLogout());
        }, 2); // Délai de 2 ms

        // Nettoyage pour éviter des fuites de mémoire si le composant est démonté avant la fin du timeout
        return () => clearTimeout(timer);
    }, []);

    const navigateToSignUp = () => {
        router.push('loginAndSignUp/signUp'); // Navigate to the SignUp screen
    };

    const handleLogin = async () => {
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