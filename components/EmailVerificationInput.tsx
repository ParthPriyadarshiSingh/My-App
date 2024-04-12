import React, { useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface Props {
  code: string[];
  setCode: (code: string[]) => void;
  codeLength: number;
}

const EmailVerificationInput = ({ code, setCode, codeLength }: Props) => {
  const otpInputRefs = useRef<TextInput[]>(new Array(codeLength).fill(null));

  const handleOTPInputChange = (text: string, index: number): void => {
    const updatedCode = [...code];
    updatedCode[index] = text;
    setCode(updatedCode);
    if (
      text !== "" &&
      index < codeLength - 1 &&
      otpInputRefs.current[index + 1]
    ) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPInputKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    const { key } = event.nativeEvent;
    const index = code.findIndex((value) => value === "");
    if (key === "Backspace" && index > 0 && code[index] === "") {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          ref={(ref) => (otpInputRefs.current[index] = ref as TextInput)}
          value={value}
          onChangeText={(text) => handleOTPInputChange(text, index)}
          onKeyPress={handleOTPInputKeyPress}
          keyboardType="numeric"
          maxLength={1}
          enterKeyHint="done"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "#E9E9E9",
    width: 50,
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 28,
  },
});

export default EmailVerificationInput;
