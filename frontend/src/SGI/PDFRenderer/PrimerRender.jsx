import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { PrimerPdf } from './PrimerPdf';

export const PrimerRender = () => (
  <PDFViewer width="1000" height="600">
    <PrimerPdf />
  </PDFViewer>
);

export default PrimerRender;