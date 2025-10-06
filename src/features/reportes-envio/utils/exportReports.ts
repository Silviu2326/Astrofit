import { EmailAnalytics } from '../hooks/useEmailAnalytics';

export const exportToCSV = (analytics: EmailAnalytics, filename: string = 'reporte-email') => {
  const rows: string[] = [];

  // Header de métricas generales
  rows.push('MÉTRICAS GENERALES');
  rows.push('Métrica,Valor');
  rows.push(`Total Enviados,${analytics.metrics.totalSent}`);
  rows.push(`Entregados,${analytics.metrics.delivered}`);
  rows.push(`Abiertos,${analytics.metrics.opened}`);
  rows.push(`Clicks,${analytics.metrics.clicked}`);
  rows.push(`Rebotes,${analytics.metrics.bounced}`);
  rows.push(`Desuscritos,${analytics.metrics.unsubscribed}`);
  rows.push(`Tasa de Entrega,${analytics.metrics.deliveryRate}%`);
  rows.push(`Tasa de Apertura,${analytics.metrics.openRate}%`);
  rows.push(`Tasa de Clicks,${analytics.metrics.clickRate}%`);
  rows.push(`Tasa de Rebote,${analytics.metrics.bounceRate}%`);
  rows.push('');

  // Estadísticas diarias
  rows.push('ESTADÍSTICAS DIARIAS');
  rows.push('Fecha,Enviados,Abiertos,Clicks');
  analytics.dailyStats.forEach(stat => {
    rows.push(`${stat.date},${stat.sent},${stat.opened},${stat.clicked}`);
  });
  rows.push('');

  // Top campañas
  rows.push('TOP CAMPAÑAS');
  rows.push('Nombre,Enviados,Tasa Apertura %,Tasa Clicks %');
  analytics.topCampaigns.forEach(campaign => {
    rows.push(`${campaign.name},${campaign.sent},${campaign.openRate},${campaign.clickRate}`);
  });
  rows.push('');

  // Estadísticas por dispositivo
  rows.push('ESTADÍSTICAS POR DISPOSITIVO');
  rows.push('Dispositivo,Cantidad,Porcentaje %');
  analytics.deviceStats.forEach(device => {
    rows.push(`${device.device},${device.count},${device.percentage}`);
  });
  rows.push('');

  // Estadísticas geográficas
  rows.push('ESTADÍSTICAS GEOGRÁFICAS');
  rows.push('País,Cantidad,Porcentaje %');
  analytics.geographicStats.forEach(geo => {
    rows.push(`${geo.country},${geo.count},${geo.percentage}`);
  });

  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = async (analytics: EmailAnalytics, filename: string = 'reporte-email') => {
  // Crear contenido HTML para el PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reporte de Email Marketing</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            background: linear-gradient(to right, #059669, #0d9488, #0891b2);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          h2 {
            color: #059669;
            border-bottom: 2px solid #0d9488;
            padding-bottom: 10px;
            margin-top: 30px;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
          }
          .metric-card {
            border: 1px solid #e5e7eb;
            padding: 15px;
            border-radius: 8px;
            background: #f9fafb;
          }
          .metric-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          th {
            background: #f3f4f6;
            font-weight: 600;
            color: #374151;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <h1>📊 Reporte de Email Marketing</h1>

        <h2>Métricas Generales</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Enviados</div>
            <div class="metric-value">${analytics.metrics.totalSent.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Entregados</div>
            <div class="metric-value">${analytics.metrics.delivered.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Abiertos</div>
            <div class="metric-value">${analytics.metrics.opened.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Clicks</div>
            <div class="metric-value">${analytics.metrics.clicked.toLocaleString()}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Tasa de Entrega</div>
            <div class="metric-value">${analytics.metrics.deliveryRate}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Tasa de Apertura</div>
            <div class="metric-value">${analytics.metrics.openRate}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Tasa de Clicks</div>
            <div class="metric-value">${analytics.metrics.clickRate}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Tasa de Rebote</div>
            <div class="metric-value">${analytics.metrics.bounceRate}%</div>
          </div>
        </div>

        <h2>Top Campañas</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Enviados</th>
              <th>Tasa Apertura</th>
              <th>Tasa Clicks</th>
            </tr>
          </thead>
          <tbody>
            ${analytics.topCampaigns.map(campaign => `
              <tr>
                <td>${campaign.name}</td>
                <td>${campaign.sent.toLocaleString()}</td>
                <td>${campaign.openRate}%</td>
                <td>${campaign.clickRate}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Estadísticas por Dispositivo</h2>
        <table>
          <thead>
            <tr>
              <th>Dispositivo</th>
              <th>Cantidad</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            ${analytics.deviceStats.map(device => `
              <tr>
                <td>${device.device}</td>
                <td>${device.count.toLocaleString()}</td>
                <td>${device.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Estadísticas Geográficas</h2>
        <table>
          <thead>
            <tr>
              <th>País</th>
              <th>Cantidad</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            ${analytics.geographicStats.map(geo => `
              <tr>
                <td>${geo.country}</td>
                <td>${geo.count.toLocaleString()}</td>
                <td>${geo.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          Generado el ${new Date().toLocaleDateString('es-ES')} | Email Marketing Analytics
        </div>
      </body>
    </html>
  `;

  // Abrir en nueva ventana para imprimir
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    // Esperar a que se cargue y luego imprimir
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};

export const exportToJSON = (analytics: EmailAnalytics, filename: string = 'reporte-email') => {
  const jsonContent = JSON.stringify(analytics, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
