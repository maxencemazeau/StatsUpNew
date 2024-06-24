// import React, { useState } from "react"
// import { TextField, Button, Container } from "@mui/material"
// import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'

// export default function SearchBar(){

//     const [searchFocus, setSearchFocus] = useState(false)

//     const OnFocusSearchFocusState = () => {
//         setSearchFocus(true)
//     }

//     const OnBlurSearchFocusState = () => {
//         setSearchFocus(false)
//     }

//     const [fontsLoad] = useFonts({
//         Poppins_400Regular, Poppins_700Bold,
//     })

//     return (
//         <Container sx={{display:'flex', direction: "row", gap : 2, marginTop:2, alignItems:'center', padding:0}}>
//             <TextField hiddenLabel placeholder="Search username" fullWidth color={'warning'} sx={{borderRadius:25, fontFamily:'Poppins_400Regular'}} onFocus={OnFocusSearchFocusState} onBlur={OnBlurSearchFocusState}></TextField>
//             {searchFocus && <Button sx={{fontFamily: 'Poppins_400Regular', color:'black'}}>Cancel</Button>}
//         </Container>
//     )
// }