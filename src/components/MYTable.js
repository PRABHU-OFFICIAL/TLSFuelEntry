import { Table, Row } from "react-native-table-component";
import { View, StyleSheet, ScrollView, LogBox } from "react-native";
import React, { useState, useEffect } from "react";

const MYTable = ({ Entry }) => {
  const tableHead = [
    "SLNo",
    "EntryDate",
    "PumpName",
    "Rate",
    "VehicleNo",
    "Fule",
    "Reading",
    "Remarks",
  ];
  const widthArr = [50, 130, 250, 70, 120, 70, 80, 250];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(Entry);
  }, []);

  const renderTable = () => {
    LogBox.ignoreAllLogs();
    return (
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.header1}
            textStyle={styles.textHeader}
          />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          {tableData === undefined ? (
            <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
              <Row
                data={["No record found"]}
                style={styles.row1}
                textStyle={styles.text1}
              />
            </Table>
          ) : (
            <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={Object.values(rowData)}
                  widthArr={widthArr}
                  style={[
                    styles.row1,
                    index % 2 && { backgroundColor: "white" },
                  ]}
                  textStyle={styles.text1}
                />
              ))}
            </Table>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>{renderTable()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 20 },
  header1: { height: 50, backgroundColor: "#b5cde6" },
  text1: { textAlign: "center", color: "black" },
  textHeader: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  dataWrapper: { marginTop: -1 },
  row1: { height: 40, backgroundColor: "#e1e3eb" },
});

export default MYTable;
