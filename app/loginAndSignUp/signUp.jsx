// src/pages/SignUp.js

import React, { useState } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import { Text, Input, Button, Separator, Checkbox } from 'tamagui';
import { Link, useRouter } from "expo-router";
import axios from 'axios';
import { userSignUp } from '../axiosPath/axiosPath';
import { useDispatch } from 'react-redux';
import { setLogin } from '../reduxState/authentication/loginSlice';

export default function SignUp() {

    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter(); // Use this for Expo Router navigation

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            console.log(email)
            const response = await axios.post(userSignUp, {
                email,
                firstName,
                lastName,
                password
            });

            const data = response.data;

            if (data.error) {
                alert(data.error);
                return;
            }

            // Dispatch action to update authentication status
            dispatch(setLogin(response.data));
            // Navigate to the home page
            router.push('/pages/home/home'); // Adjust the path if needed

        } catch (error) {
            console.error(error);
            alert("An error occurred during sign up. Please try again.");
        }
    };

    const navigateToLogin = () => {
        router.push('loginAndSignUp/login'); // Navigate to the SignUp screen
    };

    return (
        <>
            <View style={{ height: "100%", padding: 0 }}>
                <ScrollView>
                    <View style={{ display: "flex", alignItems: 'center', height: containerHeight / 2.5, backgroundColor: "white", padding: 20 }}>
                        <Image source={require("../assets/Nom_Noir.png")} style={{ height: "50%", width: "100%", top: "40%", resizeMode: 'contain' }}></Image>
                    </View>
                    <View style={{
                        height: containerHeight / 1.5, backgroundColor: "white", padding: 20, borderTopWidth: 1, borderColor: 'transparent',  // Hide the border color if not needed
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: "center",
                            justifyContent: "space-around"
                        }}>
                            <Text style={{ fontSize: 16 }}>Get Started</Text>
                        </View>
                        <Input
                            label="Email"
                            placeholder='Email'
                            size="$5"
                            style={{ ...styles.inputs }}
                            value={email}
                            onChangeText={(Text) => setEmail(Text)}
                        />
                        <Input
                            label="First name"
                            placeholder='First name'
                            size="$5"
                            style={styles.inputs}
                            value={firstName}
                            onChangeText={(Text) => setFirstName(Text)}
                        />
                        <Input
                            label="Last name"
                            placeholder='Last name'
                            size="$5"
                            style={styles.inputs}
                            value={lastName}
                            onChangeText={(Text) => setLastName(Text)}
                        />
                        <Input
                            label="Password"
                            placeholder='Password'
                            size="$5"
                            style={styles.inputs}
                            type="password"
                            value={password}
                            onChangeText={(Text) => setPassword(Text)}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder='ConfirmPassword'
                            size="$5"
                            style={styles.inputs}
                            type="password"
                            value={confirmPassword}
                            onChangeText={(Text) => setConfirmPassword(Text)}
                        />

                        <Button
                            size="$5"
                            style={{
                                backgroundColor: "#DD7A34", width: "100%", marginBottom: 20,
                            }}
                            onPress={() => handleSignUp()}
                        >
                            SIGN UP
                        </Button>
                        <Separator />
                        <Button
                            size="$5"
                            style={{
                                marginTop: 20, width: "100%",
                                marginTop: 20, border: 1, borderColor: "lightgrey"
                            }}
                            onPress={navigateToLogin}
                        >
                            LOGIN
                        </Button>
                    </View>
                </ScrollView >
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputs: {
        width: "100%",
        backgroundColor: "white",
        marginBottom: 15,
        color: "black"
    }
})