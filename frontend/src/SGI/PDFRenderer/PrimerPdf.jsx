// MyPDFDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../img/logo-odontologia-universidad-de-chile.png';

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20, // Agregar un espacio de relleno general para toda la página
  },
  section: {
    margin: 10,
    padding: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  }, 
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  logo: {
    maxWidth: '160px',
    marginBottom: 20,
  },
});

// Crear componente de documento
export const PrimerPdf = ({item}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={logo} style={styles.logo}/>
        <Text style={styles.title}>Solicitud #{item._id}</Text>
        <Text style={styles.text}>{item._id}</Text>
        <Text style={styles.text}>{item.NombreSolicitanteSolicitud}</Text>
        <Text style={styles.text}>{item.NombreBotiquin}</Text>
        <Text style={styles.text}>{item.InventarioSolicitud.length}</Text>
        <Text style={styles.text}>{item.EstadoSolicitud}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Salida de materiales de bodega</Text>
        <Text style={styles.header}>Sistema de existencias</Text>
      </View>
    </Page>
  </Document>
);

export default PrimerPdf;
