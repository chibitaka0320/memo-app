import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Memo } from "../../types/memo";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config";

interface Props {
  memo: Memo;
}

const handlePress = (id: string): void => {
  if (!auth.currentUser) {
    return;
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  Alert.alert("メモを削除します", "よろしいですか？", [
    {
      text: "キャンセル",
    },
    {
      text: "削除する",
      style: "destructive",
      onPress: () => {
        deleteDoc(ref).catch(() => {
          Alert.alert("削除に失敗しました");
        });
      },
    },
  ]);
};

const MemoListItem = (props: Props): JSX.Element | null => {
  const { id, bodyText, updatedAt } = props.memo;
  if (bodyText === null || updatedAt == null) {
    return null;
  }
  const dateString = updatedAt.toDate().toLocaleDateString("ja-JP");
  return (
    <Link href={{ pathname: "/memo/detail", params: { id } }} asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>
            {bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dateString}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            handlePress(id);
          }}
        >
          <Entypo name="cross" size={32} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 19,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
});

export default MemoListItem;
