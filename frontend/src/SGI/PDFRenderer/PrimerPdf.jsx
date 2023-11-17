// MyPDFDocument.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Crear estilos
const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
  section: { margin: 10, padding: 10, flexGrow: 1 }
});

// Crear componente de documento
export const PrimerPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text> Sección #1 </Text>
      </View>
      <View style={styles.section}>
        <Text> Sección #2 </Text>
      </View>
    </Page>
  </Document>
);

export default PrimerPdf;
