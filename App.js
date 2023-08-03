import "react-native-gesture-handler";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import Header1 from "./src/components/Header 1";
import Loading from "./src/components/Loading";
import MYTable from "./src/components/MYTable";
import AppNavigator from "./src/AppNavigator";

export default function App() {
  return (
    <SafeAreaView style={{ marginTop: 30, height: "100%" }}>
      <AppNavigator />
    </SafeAreaView>
  );
}
