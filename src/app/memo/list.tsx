import { View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const handlePress = (): void => {
  router.push("/memo/create");
};

const List = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />

      <View>
        <MemoListItem />
        <MemoListItem />
        <MemoListItem />
      </View>

      <CircleButton onPress={handlePress}>
        <Feather name="plus" size={40} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default List;
