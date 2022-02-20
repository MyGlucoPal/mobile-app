import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Title,
} from "react-native-paper";

import useError from "../hooks/useError";

const ErrorModal = (): JSX.Element => {
  const { errorMsg, hasError, clearError } = useError();

  return (
    <Portal>
      <Modal visible={hasError()} onDismiss={clearError}>
        <View style={styles.container}>
          <Card>
            <Card.Content>
              <Title>Oh no...</Title>
              <Paragraph>{errorMsg}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.buttonContainer}>
              <Button onPress={clearError} mode='contained'>
                DISMISS
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
});

export default ErrorModal;
