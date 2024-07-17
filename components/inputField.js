import { Fragment } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";

export default function InputField({
  item,
  findItem,
  errors,
  active,
  handleActiveState,
  handleInputChange,
  validate,
}) {
  const isEmpty = (input) => {
    return input ? false : true;
  };
  return (
    <Fragment>
      <View style={styles.field}>
        <View
          style={[
            styles.labelContainer,
            !isEmpty(findItem(item.category).value) && styles.labelFilled,
            active[findItem(item.category).index] && styles.labelActive,
          ]}
        >
          <Text
            style={[
              styles.label,
              active[findItem(item.category).index] && {
                color: "white",
              },
            ]}
          >
            {item.category}
          </Text>
        </View>
        <View
          style={[
            styles.input,
            active[findItem(item.category).index] && styles.fieldActive,
            errors[findItem(item.category).index] && styles.fieldError,
          ]}
        >
          <TextInput
            placeholder="XX"
            onChangeText={(e) => handleInputChange(item.category, e)}
            onFocus={() => {
              handleActiveState(findItem(item.category).index);
            }}
            onBlur={() => {
              handleActiveState(findItem(item.category).index);
              validate();
            }}
            value={findItem(item.category).value}
            inputMode="decimal"
            clearButtonMode="while-editing"
            enterKeyHint="next"
          />
        </View>
        <Text style={styles.inputUnit}>{item.unit}</Text>
      </View>
      <HelperText
        type="error"
        visible={errors[findItem(item.category).index]}
        style={styles.helper}
      >
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
  labelFilled: {
    borderColor: "#3B3B89",
    borderWidth: 2,
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
  field: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    flex: 3,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
  },
  input: {
    display: "flex",
    flex: 3,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#B1B1D0",
    borderWidth: 1,
    borderLeftColor: "transparent",
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
