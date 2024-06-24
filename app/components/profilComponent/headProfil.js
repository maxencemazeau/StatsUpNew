// import React from 'react'
// import { Image, StyleSheet } from 'react-native';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import { Link } from 'expo-router'
// import { Container, Typography, Box, Button } from "@mui/material"

// export default function HeadProfil(){

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return(
//             <Container sx={{padding:0}}>
//                     <Link href='/pages/home/reduxHomeProvider'>
//                         <ArrowBackIcon />
//                     </Link>
//                 <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:5}}>
//                     <Image source={require("../../assets/maxence.jpg")} style={style.image}/>
//                     <Typography sx={{fontFamily:'Poppins_700Bold', fontSize:20, marginTop:2}}>Maxence Mazeau</Typography>
//                     <Button variant={"contained"} sx={{ bgcolor: "#DD7A34", marginTop: 1 }} color={"warning"} disableElevation>Follow</Button>
//                 </Box>
//             </Container>
//     )
// }

// const style = StyleSheet.create({
//     image:{
//         width:200,
//         height:200,
//         borderRadius : 100
//     }
// })