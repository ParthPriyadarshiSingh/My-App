import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import EmailVerificationInput from "../../components/EmailVerificationInput";

const EmailVerificationScreen = ({ navigation }: any) => {
  const codeLength = 4;
  const [isCodeFilled, setIsCodeFilled] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(new Array(codeLength).fill(""));
  const [codeError, setCodeError] = useState<string>("");

  useEffect(() => {
    setCodeError("");
    if (code.findIndex((value) => value === "") < 0) {
      setIsCodeFilled(true);
    } else {
      setIsCodeFilled(false);
    }
  }, [code]);

  const onSubmitPress = (): void => {
    console.log(code.join(""));
    if (code.join("") == "1234") {
      setCodeError("");
      navigation.navigate("Welcome");
    } else {
      setCodeError("Wrong OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>My-App</Text>
      <Text style={styles.verify}>
        Enter verification code sent on your email
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 40 }}>
        <Text style={styles.remember}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View>
      {codeError !== "" ? (
        <Text style={{ color: "red" }}>{codeError}</Text>
      ) : null}

      {codeLength ? (
        <EmailVerificationInput
          code={code}
          setCode={setCode}
          codeLength={codeLength}
        />
      ) : null}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onSubmitPress}
        style={[styles.submitBtn, { opacity: isCodeFilled ? 1 : 0.5 }]}
        disabled={!isCodeFilled}
      >
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignSelf: "center" }}>
        <Text style={styles.resendBtnText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  appName: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 80,
  },
  verify: {
    fontSize: 40,
    fontWeight: "700",
    color: "#261C12",
    marginBottom: 30,
  },
  remember: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
  },
  loginBtn: {
    fontSize: 16,
    fontWeight: "500",
    color: "#d5715b",
  },
  submitBtn: {
    width: "90%",
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#d5715b",
  },
  submitBtnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
  resendBtnText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default EmailVerificationScreen;
