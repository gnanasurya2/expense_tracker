import React from "react";
import { View, Modal, TextInput, StyleSheet } from "react-native";

import Button from "./Button";
const Modals = (props) => {
  return (
    <Modal transparent={true} visible={props.visible}>
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <TextInput
            placeholder="Enter the name of the notebook"
            value={props.value}
            onChangeText={props.changeText}
          />
          <Button title="Create" clicked={props.clicked} />
        </View>
      </View>
    </Modal>
  );
};

const styles = new StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 12,
  },
});

export default Modals;
