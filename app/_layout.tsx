import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './reduxState/store';
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

const queryClient = new QueryClient()

export default function IndexLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
        </Provider>
    </TamaguiProvider>
  );
}
