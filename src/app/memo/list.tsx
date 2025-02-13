import { View, StyleSheet, FlatList } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import { Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogoutButton";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../config";
import { Memo } from "../../../types/memo";

const handlePress = (): void => {
  router.push("/memo/create");
};

const List = (): JSX.Element => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt,
        });
      });
      setMemos(remoteMemos);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => {
          return <MemoListItem key={item.id} memo={item} />;
        }}
      />
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
