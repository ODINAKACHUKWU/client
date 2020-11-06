import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  DataTableCell,
  TableBody,
} from "@david.kucsai/react-pdf-table";
import { formatAmount, formatDate } from "../helpers/format";

const styles = StyleSheet.create({
  page: {
    padding: "10px",
  },
});

function PdfDocument(props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View>
            <Text>Transactions</Text>
            <Text>{`${props.data.meta.current_page} of ${props.data.meta.total_pages} pages`}</Text>
          </View>
          {props.data && (
            <Table data={props.data.data}>
              <TableHeader>
                <TableCell>Payee</TableCell>
                <TableCell>Amount (NGN)</TableCell>
                <TableCell>Date of Contribution</TableCell>
                <TableCell>Memo</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell getContent={(r) => r.payee_name} />
                <DataTableCell
                  getContent={(r) => `${formatAmount(r.amount)}`}
                />
                <DataTableCell
                  getContent={(r) => formatDate(r.contribution_date)}
                />
                <DataTableCell getContent={(r) => r.memo} />
              </TableBody>
            </Table>
          )}
        </View>
      </Page>
    </Document>
  );
}

export default PdfDocument;
