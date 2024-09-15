import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxState/store';
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { Screen } from 'expo-router/build/views/Screen';

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
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </TamaguiProvider>
  );
}
