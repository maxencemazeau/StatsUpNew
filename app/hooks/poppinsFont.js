// useCustomFonts.js
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const usePoppinsFonts = () => {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    return fontsLoaded;
};

export default usePoppinsFonts;
