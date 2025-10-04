import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface GeneradorPDFProps {
  reportData: any; // Datos compilados para el reporte
}

const GeneradorPDF: React.FC<GeneradorPDFProps> = ({ reportData }) => {
  if (!reportData) {
    return <p>Cargando datos del reporte o esperando selección...</p>;
  }

  return (
    <div className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
      <PDFViewer className="w-full h-full">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>{reportData.reportTitle || 'Reporte Ejecutivo'}</Text>
              <Text style={styles.text}>{reportData.summary || 'Resumen del reporte.'}</Text>
            </View>

            {reportData.sections && reportData.sections.map((section: any, index: number) => (
              <View key={index} style={styles.section}>
                <Text style={styles.subtitle}>{section.title}</Text>
                {/* Renderizar contenido de la sección. Esto podría ser más complejo dependiendo de la estructura de `content` */}
                <Text style={styles.text}>{JSON.stringify(section.content, null, 2)}</Text>
              </View>
            ))}

            <View style={styles.section}>
              <Text style={styles.text}>Generado por el sistema de Reportes de Rendimiento.</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Generar PDF Final
      </button>
    </div>
  );
};

export default GeneradorPDF;