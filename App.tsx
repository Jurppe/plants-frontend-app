import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LogInPage from './screens/LogInScreen';
import SplashScreen from './screens/SplashScreen'
import { AuthContext } from './context/AuthContext';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'UPDATE_ERROR':
          return {
            ...prevState,
            errorMsg: action.message
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      errorMsg: ''
    }
  );
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
  
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
  
      // After restoring token, we may need to validate it in production apps
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
  
    bootstrapAsync();
  }, []);
  
  const authContext = React.useMemo(
    () => ({
      signIn: async (credentials: { username: string, password: string }) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        
        return fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(response => response.json())
          .then(data => {
            data.access_token 
            ? dispatch({ type: 'SIGN_IN', token: data.access_token }) 
            : dispatch({ type: 'UPDATE_ERROR', message: "Access denied: " + data.message })
          })
          .catch(error => console.log(error))
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
  
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  if (state.isLoading) {
    return (
      <SplashScreen />
    )
  }
  else if (state.userToken == null) {
    return (
      <AuthContext.Provider value={{authContext, state: state}}>
        <LogInPage />
      </AuthContext.Provider>
    )
  }
  else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{authContext, state: state}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
