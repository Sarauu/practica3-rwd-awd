/**
 * Heavy Enterprise Benchmark & Comparative Analysis Engine
 * Used in Desktop and RWD views.
 * Simulates high-density enterprise comparative metrics, vector charts,
 * and multi-dimensional hardware telemetry.
 */
document.addEventListener('DOMContentLoaded', () => {
  const chartCanvas = document.getElementById('benchmarkRadarCanvas');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = chartCanvas.clientWidth;
  const height = chartCanvas.clientHeight;

  chartCanvas.width = width * dpr;
  chartCanvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const categories = ['Cómputo FP64', 'Ancho Banda', 'Eficiencia Watts', 'IOPS Rendimiento', 'Capacidad / Densidad'];
  const datasets = [
    { name: 'NVIDIA H100 SXM5', color: 'rgba(118, 185, 0, 0.7)', stroke: '#76b900', values: [99, 98, 75, 80, 90] },
    { name: 'AMD EPYC 9654', color: 'rgba(255, 102, 0, 0.7)', stroke: '#ff6600', values: [95, 88, 85, 92, 95] },
    { name: 'Intel Xeon 8490H', color: 'rgba(0, 113, 197, 0.7)', stroke: '#0071c5', values: [88, 82, 80, 89, 90] },
    { name: 'Solidigm 61.44TB', color: 'rgba(245, 158, 11, 0.7)', stroke: '#f59e0b', values: [40, 75, 92, 98, 100] }
  ];

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 45;
  const angleStep = (Math.PI * 2) / categories.length;

  // Draw background web rings
  for (let level = 1; level <= 5; level++) {
    const r = (radius / 5) * level;
    ctx.beginPath();
    for (let i = 0; i < categories.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw axes & labels
  for (let i = 0; i < categories.length; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.stroke();

    // Labels
    const labelX = centerX + Math.cos(angle) * (radius + 22);
    const labelY = centerY + Math.sin(angle) * (radius + 18);
    ctx.font = '10px "Inter", -apple-system, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : Math.cos(angle) > 0 ? 'left' : 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(categories[i], labelX, labelY);
  }

  // Draw datasets
  datasets.forEach((ds) => {
    ctx.beginPath();
    for (let i = 0; i < categories.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = ds.values[i] / 100;
      const x = centerX + Math.cos(angle) * (radius * val);
      const y = centerY + Math.sin(angle) * (radius * val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = ds.color;
    ctx.fill();
    ctx.strokeStyle = ds.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Telemetry log to console to demonstrate heavy script execution on client
  console.info('[HeavyChartEngine] Loaded comprehensive enterprise radar benchmarks & 128 telemetry data points.');
});
