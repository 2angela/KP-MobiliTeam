import { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { HelperText } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default function DropdownField({
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
      <View
        style={[
          styles.field,
          active[findItem(item.category).index] && styles.fieldActive,
          errors[findItem(item.category).index] && styles.fieldError,
        ]}
      >
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
        <Dropdown
          search
          style={styles.dropdown}
          onFocus={() => {
            handleActiveState(findItem(item.category).index);
          }}
          onBlur={() => {
            handleActiveState(findItem(item.category).index);
            validate();
          }}
          placeholder="Select"
          placeholderStyle={[styles.input, { color: "#B8B8B8" }]}
          inputSearchStyle={styles.searchText}
          searchPlaceholder="Search"
          containerStyle={styles.options}
          itemTextStyle={[styles.input, { paddingTop: 0 }]}
          labelField="label"
          valueField="value"
          data={item.options.map((option) => ({
            label: option,
            value: option,
          }))}
          onChange={(e) => {
            handleInputChange(item.category, e.value);
          }}
          value={findItem(item.category).value}
          selectedTextStyle={styles.input}
          activeColor="#D8D8E7"
        />
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
    top: "-50%",
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
  input: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "black",
    marginTop: 10,
  },
  dropdown: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  options: {
    display: "flex",
    width: "80%",
  },
  helper: {
    fontFamily: "MontserratRegular",
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
});
