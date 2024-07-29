import { Fragment } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { HelperText } from "react-native-paper";

export default function NumberField({
  item,
  index,
  errors,
  setErrors,
  active,
  setActive,
  findValue,
  handleInputChange,
  validate,
}) {
  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
    resetError(index);
  };

  const resetError = (index) => {
    const newErrors = errors.map((item, i) => (i == index ? false : item));
    setErrors(newErrors);
  };

  return (
    <Fragment>
      <View style={styles.field}>
        <View
          style={[
            styles.labelContainer,
            findValue(item.category) != "" ? styles.fieldActive : null,
            active[index] ? styles.labelActive : null,
          ]}
        >
          <Text
            style={[
              styles.label,
              active[index]
                ? {
                    color: "white",
                  }
                : null,
            ]}
          >
            {item.category}
          </Text>
        </View>
        <View
          style={[
            styles.input,
            active[index] ? styles.fieldActive : null,
            errors[index] ? styles.fieldError : null,
          ]}
        >
          <TextInput
            placeholder="XX"
            onChangeText={(e) => handleInputChange(item.category, e)}
            onFocus={() => {
              handleActiveState(index);
            }}
            onBlur={() => {
              handleActiveState(index);
              validate();
            }}
            value={findValue(item.category)}
            inputMode={item.unit ? "decimal" : "text"}
            clearButtonMode="while-editing"
            enterKeyHint="next"
          />
        </View>
        {item.unit ? <Text style={styles.inputUnit}>{item.unit}</Text> : null}
      </View>
      <HelperText type="error" visible={errors[index]} style={styles.helper}>
        This field cannot be empty
      </HelperText>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  fieldError: {
    borderColor: "red",
    borderWidth: 1,
  },
  fieldActive: {
    borderColor: "#3B3B89",
    borderWidth: 1,
  },
  label: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    textAlign: "center",
  },
  labelActive: {
    backgroundColor: "#3B3B89",
    borderColor: "#3B3B89",
    borderWidth: 2,
  },
  field: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 2,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
  },
  input: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#B1B1D0",
    borderWidth: 1,
    borderLeftColor: Platform.OS === "ios" ? "transparent" : null,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  inputUnit: {
    display: "flex",
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  helper: {
    fontFamily: "MontserratRegular",
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
});
