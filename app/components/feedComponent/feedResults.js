// import React, { useState } from "react"
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'

// export default function FeedResults() {

//     const [following, setFollowing] = useState([
//         {
//             id: 1,
//             name: 'samuel',
//             text: 'has completed his ACTIVITY NAME, 2/$ of his PERIOD goal'
//         },
//         {
//             id: 2,
//             name: 'vincent',
//             text: 'has completed his ACTIVITY NAME, 2/$ of his PERIOD goal'
//         }
//     ])

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return (
//         <Container sx={{ padding: 2 }}>
//             <Divider textAlign="left"><Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 14 }}>Today</Typography></Divider>
//             {following.map(follow => (
//                 <Container key={follow.id} sx={{ marginTop: 2, marginBottom: 2, padding: 1, border: 1, borderColor: 'lightgrey', borderRadius: 2 }}>
//                     {/* <Box sx={{display:'flex', direction:'row', gap:2, alignItems:'center'}}> */}
//                     <Grid container>
//                         <Grid item xs={2} alignSelf={"center"}>
//                             <Avatar alt="Remy Sharp" src="src/app/assets/H.png" />
//                         </Grid>
//                         <Grid item xs={10}>
//                             <Typography sx={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>{follow.name}</Typography>
//                             <Typography sx={{ fontFamily: 'Poppins_400Regular', color: "#DD7A34", fontSize: 12 }}>{follow.text}</Typography>
//                         </Grid>

//                     </Grid>
//                     {/* </Box> */}
//                 </Container>
//             ))}
//             <Divider textAlign="left"><Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 14 }}>This week</Typography></Divider>
//             <Divider textAlign="left"><Typography sx={{ fontFamily: "Poppins_700Bold", fontSize: 14 }}>Prior</Typography></Divider>
//         </Container>
//     )
// }