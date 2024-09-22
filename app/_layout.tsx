import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxState/store';
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { Screen } from 'expo-router/build/views/Screen';

const queryClient = new QueryClient()

export default function IndexLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Perform any pre-loading steps
        persistor.persist();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Artificial delay
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

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
