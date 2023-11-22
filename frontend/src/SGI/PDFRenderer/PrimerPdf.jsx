// MyPDFDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../img/logo-odontologia-universidad-de-chile.png';

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Agregar un espacio de relleno general para toda la página
    paddingBottom: 20,
    paddingTop: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
  logocontainer: {
    flexGrow: 1,
    marginHorizontal: 26,
    marginBottom: 26,
    marginTop: 2,
    maxWidth: '130px',
  },
  section2: {
    margin: 10,
    marginTop: 24,
    padding: 16,
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  section3: {
    margin: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 2,
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'ultrabold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'extralight',
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: 'extralight',
    marginBottom: 4,
  }, 
});

// Crear componente de documento
export const PrimerPdf = ({item}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logocontainer}>
          <Image src={logo} style={styles.logo}/>
        </View>
        <View style={styles.section2}>
          <Text style={styles.title}>Salida de materiales de bodega</Text>
          <Text style={styles.subtitle}>Sistema de existencias</Text>
        </View>
      </View>
      <View style={styles.section3}>
        <Text style={styles.title}>Solicitud #{item._id}</Text>
        <Text style={styles.text}>N C. COSTO: {item.VariableSolicitud}</Text>
        <Text style={styles.text}>BOTIQUIN N: {item.NombreBotiquin}         NOMBRE: {item.NombreSolicitanteSolicitud}       FECHA: {item.FechaSolicitud}</Text>
        <Text style={styles.text}>{item.InventarioSolicitud.length}</Text>
        <Text style={styles.text}>{item.EstadoSolicitud}</Text>
        <Text>{item.NombreProducto}</Text>
        <Text>{item.CantidadAsignadaProducto}</Text>
        <Text>{item.FechaProcesoProducto}</Text>
      </View>
    </Page>
  </Document>
);

export default PrimerPdf;
