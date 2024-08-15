import { View, StyleSheet, Text } from "react-native";

export default function TaskCard({ item }) {
  const findColor = (name) => {
    switch (name) {
      case "Done":
        return { bg: "#CDF1CA", text: "#6AC432" };
      case "Pending":
        return { bg: "#D7DDF3", text: "#1126E9" };
      case "On Progress":
        return { bg: "#FFEBC9", text: "#F1A421" };
      case "Cancelled":
        return { bg: "#F3DDD7", text: "#E91111" };
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.topInfoContainer}>
        <View style={[styles.topInfo, { backgroundColor: "#E2E2EE" }]}>
          <Text style={styles.date}>{item.createdAt}</Text>
        </View>
        <View
          style={[
            styles.topInfo,
            { backgroundColor: findColor(item.status).bg },
          ]}
        >
          <Text style={[styles.status, { color: findColor(item.status).text }]}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.cardContents}>
        <View>
          <Text style={[styles.title, { textAlign: "center" }]}>SITE</Text>
          <Text style={[styles.value, { textAlign: "center" }]}>
            {item.site}
          </Text>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>REGION</Text>
              <Text style={styles.value}>{item.region}</Text>
            </View>
            <View>
              <Text style={styles.title}>CLUSTER</Text>
              <Text style={styles.value}>{item.cluster}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>TYPE</Text>
              <Text style={styles.value2}>{item.type}</Text>
            </View>
            <View>
              <Text style={styles.title}>CATEGORY</Text>
              <Text style={styles.value2}>{item.category}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    borderRadius: 15,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    paddingBottom: 15,
    paddingTop: 20,
  },
  topInfoContainer: {
    display: "flex",
    width: "100%",
    position: "absolute",
    top: "-8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 15,
  },
  topInfo: {
    display: "flex",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  date: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  status: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
  cardContents: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontFamily: "MontserratLight",
    fontSize: 12,
  },
  value: {
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
  value2: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
  },
  column: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  row: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
});
