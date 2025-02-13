import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Memo } from "../../types/memo";

interface Props {
  memo: Memo;
}

const MemoListItem = (props: Props): JSX.Element | null => {
  const { bodyText, updatedAt } = props.memo;
  if (bodyText === null || updatedAt == null) {
    return null;
  }
  const dateString = updatedAt.toDate().toLocaleDateString("ja-JP");
  return (
    <Link href="/memo/detail" asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>
            {bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dateString}</Text>
        </View>

        <TouchableOpacity>
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
