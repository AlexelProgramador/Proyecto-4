// MyPDFDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../img/logo-odontologia-universidad-de-chile.svg';

const COL_ANCHO_1 = 20
const COL_ANCHO_2 = 40

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
  align: {
    flexDirection: 'row',
  },
  textalign: {
    fontSize: 12,
    fontWeight: 'extralight',
    marginBottom: 4,
    flexGrow: 1,
    textAlign: 'left'
  },
  // tabla
  tabla: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
    marginHorizontal: 20  
  },
  tablaFila: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tablaCol1: {
    width: COL_ANCHO_1 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCol2: {
    width: COL_ANCHO_2 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCeldaHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 500
  },
  anchoCol1: {
    width: COL_ANCHO_1 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  anchoCol2: {
    width: COL_ANCHO_2 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCelda: {
    margin: 5,
    fontSize: 10
  }
});

// Crear componente de documento
export const PrimerPdf = ({item}) => (
  <Document>
    <Page size="A4">
      <View style={{ padding: '15px' }}>
        <View style= {{ display: 'flex', flexDirection: 'row'}}>
          <View style={{ flex: 1, marginHorizontal: '20px', marginBottom: '26px', marginTop: '2px', maxWidth: '130px' }}>
            <Image src={logo} style={{ width: '100%', height: 'auto'}}/>
          </View>
          <View style={{ flexGrow: 1, marginTop: 24, padding: 16, alignItems: 'flex-end'}}>
            <Text style={{ fontSize: 14, fontWeight: 900, marginBottom: 4}}>Salida de materiales de bodega</Text>
            <Text style={{ fontSize: 12, fontWeight: 200, marginBottom: 4}}>Sistema de existencias</Text>
          </View>
        </View>
        <View style={{ display: 'flex', marginHorizontal: 20, marginBottom: 10}}>
          <Text style={{fontSize: '12px'}}>Solicitud #{item._id.substring(0, 6)}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 20, marginBottom: 4, justifyContent: 'frex-start'}}>
            <Text style={{fontSize: '10px', marginRight: 40 }}>N C. COSTO: {item.VariableSolicitud}</Text>
            <Text style={{fontSize: '10px'}}>UNIDAD: Clinica</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 20, marginBottom: 4, justifyContent: 'space-between'}}>
          <Text style={{fontSize: '10px'}}>BOTIQUIN N: {item.NombreBotiquin}</Text>
          <Text style={{fontSize: '10px'}}>NOMBRE: {item.NombreSolicitanteSolicitud}</Text>
          <Text style={{fontSize: '10px'}}>FECHA: {item.FechaSolicitud}</Text>        
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 20, marginBottom: 4, justifyContent: 'flex-end' }}>
          {/* <Text style={{fontSize: '10px', marginRight: 20}}>PRODUCTOS: {item.InventarioSolicitud.length}</Text>
          <Text style={{fontSize: '10px'}}>ESTADO: {item.EstadoSolicitud}</Text> */}
        </View>
        <View style={styles.tabla}>
          <View style={styles.tablaFila}>
            <View style={styles.tablaCol1}>
              <Text style={styles.tablaCeldaHeader}>CODIGO</Text>
            </View>
            <View style={styles.tablaCol2}>
              <Text style={styles.tablaCeldaHeader}>DESCRIPCION</Text>
            </View>
            <View style={styles.tablaCol1}>
              <Text style={styles.tablaCeldaHeader}>CANT. SOLICITADA</Text>
            </View>
            <View style={styles.tablaCol1}>
              <Text style={styles.tablaCeldaHeader}>CANT. RECIBIDA</Text>
            </View>
          </View>
          {item.InventarioSolicitud.map((soli, index) =>
            <View style={styles.tablaFila} key={index}> 
              <View style={styles.anchoCol1}>
                <Text style={styles.tablaCelda}>{soli.IdProducto.substring(0, 6)}</Text>
              </View>
              <View style={styles.anchoCol2}>
                <Text style={styles.tablaCelda}>{soli.NombreProducto}</Text>
              </View>
              <View style={styles.anchoCol1}>
                <Text style={styles.tablaCelda}>{soli.CantidadSolicitud}</Text>
              </View>
              <View style={styles.anchoCol1}>
                <Text style={styles.tablaCelda}>{soli.CantidadSolicitud}</Text>
              </View>
            </View>
            )}
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{ fontSize: '6px', fontWeight: 'normal', marginTop: 1}}>
            GLUCK Y COMPAÑIA SPA -RUT.: 76.985.867-9 - MONTERREY 2818 - CONCHALI - SANTIAGO
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop:'60px', marginBottom: '78px', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: '10px', fontWeight: 'normal', borderTopColor: '#000', border: 0, borderTop: 1, paddingTop: 6, paddingHorizontal: '26px' }}>
            V B Jefatura
          </Text>
          <Text style={{ fontSize: '10px', fontWeight: 'normal', borderTopColor: '#000', border: 0, borderTop: 1, paddingTop: 6, paddingHorizontal: '26px' }}>
            Recibi Conforme
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrimerPdf;
