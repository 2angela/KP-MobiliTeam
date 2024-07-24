import { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { HelperText } from "react-native-paper";

export default function TextField({
  item,
  index,
  errors,
  setErrors,
  active,
  setActive,
  findValue,
  handleInputChange,
  validate,
  numOfLines,
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
      <View
        style={[
          styles.field,
          active[index] ? styles.fieldActive : null,
          errors[index] ? styles.fieldError : null,
        ]}
      >
        <View
          style={[
            styles.labelContainer,
            findValue(item.category) != "" ? styles.labelFilled : null,
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
        <TextInput
          style={[
            styles.textInput,
            numOfLines > 0 ? { marginTop: 5 } : { marginTop: 10 },
          ]}
          onFocus={() => {
            handleActiveState(index);
          }}
          onBlur={() => {
            handleActiveState(index);
            validate();
          }}
          placeholder={item.category}
          onChangeText={(e) => {
            handleInputChange(item.category, e);
          }}
          value={findValue(item.category)}
          clearButtonMode="while-editing"
          multiline={numOfLines > 0}
          rows={numOfLines}
        />
      </View>
      <HelperText type="error" visible={errors[index]} style={styles.helper}>
        This field cannot be empty
      </HelperText>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  field: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#B1B1D0",
    borderWidth: 1,
    backgroundColor: "white",
  },
  fieldError: {
    borderColor: "red",
    borderWidth: 1,
  },
  fieldActive: {
    borderColor: "#3B3B89",
    borderWidth: 1,
  },
  labelFilled: {
    borderColor: "#3B3B89",
    borderWidth: 2,
  },
  labelContainer: {
    display: "flex",
    position: "absolute",
    top: -15,
    left: "5%",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: "black",
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
  },
  textInput: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "black",
  },
  helper: {
    fontFamily: "MontserratRegular",
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
});
