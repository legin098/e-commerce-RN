import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MyButton } from "../components/MyButton";
import { MyInput } from "../components/MyInput";
import { MyText } from "../components/MyText";
import { Alert, useColorScheme } from "react-native";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Root";

interface IProps extends NativeStackScreenProps<RootStackParamList, "Login"> {}

export const Auth = ({ navigation }: IProps) => {
  const theme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created");
        const user = userCredential.user;
        //console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Sign In");
        const user = userCredential.user;
        navigation.replace("BottomNavigation");
        //console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
        paddingHorizontal: 17,
      }}
      contentContainerStyle={{ paddingVertical: 80 }}
    >
      <Ionicons
        name="people-circle-outline"
        size={120}
        style={{ alignSelf: "center" }}
        color={Colors[theme!].text}
      />
      <MyText type="title" style={{ marginBottom: 30 }}>
        Login
      </MyText>
      <MyInput label={"Email"} onChangeText={(text) => setEmail(text)} />
      <MyInput
        label={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <MyButton
        title={"Sign In"}
        onPress={handleSignIn}
        style={{ marginTop: 20 }}
      />
      <MyButton
        title={"Sign Up"}
        type={"secondary"}
        onPress={handleCreateAccount}
      />
    </KeyboardAwareScrollView>
  );
};
