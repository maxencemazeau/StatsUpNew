// import React, { useState } from "react"
// import { Box, Button, Container, Typography, Avatar, Grid } from "@mui/material"
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
// import BottomMenu from "../../navigation/bottomMenu"


// export default function SearchResults(){

//     const[following, setFollowing] = useState([
//         {
//             id:1,
//             name:'samuel',
//             following:true
//         },
//         {id:2,
//         name:'vincent',
//         following:false
//         }
// ])

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return(
//         <>
//         <Container sx={{marginTop:2, padding:0}}>
//             <Typography sx={{fontFamily:'Poppins_400Regular'}}>Results</Typography>
//             {following.map(follow =>(
//                 <Container key={follow.id} sx={{marginTop:2, padding:1, border:1, borderColor:'lightgrey', borderRadius:2, display:'flex', direction:'row', gap:2, alignItems:'center', justifyContent:'space-between'}}>
//                     <Box sx={{display:'flex', direction:'row', gap:2, alignItems:'center'}}>
//                     <Avatar alt="Remy Sharp" src="src/app/assets/H.png" />
//                     <Typography sx={{fontFamily:'Poppins_400Regular'}}>{follow.name}</Typography>
//                     </Box>
//                 <Button sx={{fontFamily:'Poppins_400Regular', color: "#DD7A34", fontSize:12}}>{follow.following ? 'Unfollow' : 'Follow'}</Button>
//             </Container>
//             ))}
//         </Container>
//         <BottomMenu/>
//         </>
//     )
// }