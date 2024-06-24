// import React, { useState, useContext } from 'react'
// import Chip from '@mui/material/Chip';
// import Grid from '@mui/material/Grid';
// import { Typography } from '@mui/material';
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import { useSelector, useDispatch } from 'react-redux';
// import { homeNavigation } from '../reduxState/navigation/navigationSlice';

// export default function HomeNavigation({}) {

//     const active = useSelector((state) => state.navigation.value) 
//     const dispatch = useDispatch()

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return (
//         <Grid container sx={{ paddingRight :2, paddingLeft : 2 }}>
//             <Grid item xs={6}>
//                 <Typography sx={{ fontWeight: "bold", textAlign:"center", 
//                 color :active === 'ACTIVITY' ? '#DD7A34' : 'black', fontFamily:'Poppins_400Regular', textDecorationLine: active === 'ACTIVITY' ? "underline": "none" }} 
//                 onClick={() => dispatch(homeNavigation("ACTIVITY"))}>ACTIVITY</Typography>
//             </Grid>
//             <Grid item xs={6}>
//                 <Typography sx={{ fontWeight: "bold", textAlign:"center", 
//                 color : active === 'GOALS' ? '#DD7A34' : 'black', fontFamily:'Poppins_400Regular', textDecorationLine: active === 'GOALS' ? "underline": "none"}} 
//                 onClick={() => dispatch(homeNavigation("GOALS"))}>GOALS</Typography>
//             </Grid>
//         </Grid>
//     )
// }