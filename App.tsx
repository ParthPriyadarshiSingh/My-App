import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/(stacks)/Login";
import ForgotPassword from "./screens/(stacks)/ForgotPassword";
import OtpScreen from "./screens/(stacks)/OtpScreen";
import ResetPassword from "./screens/(stacks)/ResetPassword";
import Signup from "./screens/(stacks)/Signup";
import FarmInfo from "./screens/(stacks)/FarmInfo";
import Verification from "./screens/(stacks)/Verification";
import BusinessHours from "./screens/(stacks)/BusinessHours";
import Confirmation from "./screens/(stacks)/Confirmation";
import Welcome from "./screens/(stacks)/Welcome";
import EmailVerificationScreen from "./screens/(stacks)/EmailVerificationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EmailVerificationScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen
          name="EmailVerificationScreen"
          component={EmailVerificationScreen}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
        {/* <Stack.Screen name="FarmInfo" component={FarmInfo} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="BusinessHours" component={BusinessHours} />
        <Stack.Screen name="Confirmation" component={Confirmation} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
