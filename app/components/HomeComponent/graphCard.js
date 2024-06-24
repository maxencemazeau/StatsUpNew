// import React from "react"
// import Card from "@mui/material/Card"
// import CardContent from "@mui/material/CardContent";
// import Container from "@mui/material/Container"
// import Divider from '@mui/material/Divider';
// import { Typography, Button } from "@mui/material";
// import Grid from "@mui/material/Grid"
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'


// export default function GraphCard() {

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return (
//         <Container maxWidth="md" sx={{ paddingTop: 2, paddingRight: 2, paddingLeft: 2, paddingBottom: 0 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                     <Card variant="outlined" sx={{ marginBottom: 3, borderRadius: 4, height: 150 }} sm={{ height: 200 }}>
//                         <Typography sx={{paddingLeft:2, paddingTop:2, fontFamily:"Poppins_700Bold", fontSize:48 ,color : "#DD7A34"}}>46</Typography>
//                         <Typography sx={{paddingLeft:2, fontFamily:"Poppins_700Bold", fontSize:18}}>Total activity</Typography>
//                         <Typography sx={{paddingLeft:2, fontFamily:"Poppins_700Bold", fontSize:18}}>completed</Typography>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={6}>
//                     <Card variant="outlined" sx={{ marginBottom: 3, borderRadius: 4, height: 150 }} sm={{ height: 200 }}>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//     )
// }