import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import CountryData from "../assets/data/CountryCodes.json";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const MobileNumberInput = ({ email, setEmail, setPassword }: Props) => {
  useEffect(() => {
    setMobileNumber("");
    setMobileError("");
    setIsMobileValid(true);
  }, [email]);
  const [selectedCountry, setSelectedCountry] = useState(["🇮🇳", "+91", "IN"]);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(CountryData);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [ismobileValid, setIsMobileValid] = useState<boolean>(true);
  const [mobileError, setMobileError] = useState<string>("");

  const handleBlur = (): void => {
    if (mobileNumber === "") {
      setIsMobileValid(false);
      setMobileError("Required");
    }
  };

  const handleUpdateMobileNumber = (text: string) => {
    setMobileNumber(text);
    if (text !== "") {
      setEmail("");
      setPassword("");
      setIsMobileValid(true);
      setMobileError("");
    }
  };

  const validateMobileNumber = (mobileNumber: string, countryCode: any) => {
    try {
      const mobileNumberObj = parsePhoneNumberFromString(
        mobileNumber,
        countryCode
      );
      if (mobileNumberObj && mobileNumberObj.isValid()) {
        return true; // Valid phone number format
      }
    } catch (error) {
      console.log("error in mobile number validation");
    }
    return false; // Invalid phone number format
  };

  const onVerifyPress = (): void => {
    if (
      mobileNumber &&
      validateMobileNumber(mobileNumber, selectedCountry[2])
    ) {
      setIsMobileValid(true);
      setMobileError("");
    } else {
      setIsMobileValid(false);
      setMobileError("Invalid format");
    }
  };

  const onSearch = (searchText: string) => {
    if (searchText) {
      let filteredData = CountryData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(CountryData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>{mobileError}</Text>
      <View style={styles.numberContainer}>
        <TouchableOpacity
          style={[
            styles.dropdownBox,
            !ismobileValid && { borderWidth: 1.5, borderRightWidth: 0 },
          ]}
          activeOpacity={0.6}
          onPress={() => setClicked(!clicked)}
        >
          {clicked ? (
            <FontAwesome name="angle-up" size={18} color="#000" />
          ) : (
            <FontAwesome name="angle-down" size={18} color="#000" />
          )}
          <Text style={styles.selectedInput}>
            {selectedCountry[0] + selectedCountry[1]}{" "}
          </Text>
          <Text
            style={{
              fontSize: 32,
              color: "#000",
              fontWeight: "200",
              marginBottom: 5,
            }}
          >
            |
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.numberInput,
            !ismobileValid && { borderWidth: 1.5, borderLeftWidth: 0 },
          ]}
          placeholder="Mobile Number"
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={10}
          value={mobileNumber}
          onChangeText={(text) => handleUpdateMobileNumber(text)}
          onBlur={handleBlur}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onVerifyPress}>
        <Text style={styles.btnText}>Verify OTP</Text>
      </TouchableOpacity>
      {clicked ? (
        <Modal
          transparent={true}
          visible={clicked}
          onRequestClose={() => setClicked(false)}
          animationType="slide"
        >
          <TouchableOpacity
            onPress={() => setClicked(false)}
            style={{ flex: 1 }}
          ></TouchableOpacity>
          <View style={styles.dropdownArea}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000"
              onChangeText={(txt) => {
                onSearch(txt);
              }}
            ></TextInput>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry([item.flag, item.dial_code, item.code]);
                    setClicked(!clicked);
                    onSearch("");
                  }}
                >
                  <Text style={styles.dropdownText}>
                    {item.flag} {item.dial_code} | {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 10,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownBox: {
    width: "30%",
    height: 50,
    backgroundColor: "#e9e9e9",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 0,
    borderColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 5,
  },
  invalid: {
    borderWidth: 1.5,
  },
  selectedInput: {
    fontSize: 20,
  },
  numberInput: {
    width: "70%",
    height: 50,
    paddingLeft: 10,
    letterSpacing: 1.3,
    backgroundColor: "#e9e9e9",
    borderWidth: 0,
    fontSize: 20,
    borderColor: "red",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropdownArea: {
    paddingVertical: 10,
    backgroundColor: "#F89880",
    width: "100%",
    height: "60%",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
  },
  searchInput: {
    backgroundColor: "#fff",
    fontSize: 16,
    width: "95%",
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#000",
    alignSelf: "center",
    paddingLeft: 10,
  },
  dropdownText: {
    fontSize: 20,
    color: "#000",
  },
  countryItem: {
    width: "90%",
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
  btn: {
    width: "100%",
    height: 45,
    marginVertical: 10,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    backgroundColor: "#d5715b",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
});

export default MobileNumberInput;
