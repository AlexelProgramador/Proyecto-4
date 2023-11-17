import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { PrimerPdf } from './PrimerPdf';

export const PrimerRender = () => (
  <PDFViewer>
    <PrimerPdf />
  </PDFViewer>
);

export default PrimerRender;