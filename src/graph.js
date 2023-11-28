async function plotGraph(event) {
  event.preventDefault();

  functionInput = document.getElementById("function").value;
  xMaxInput = Number(document.getElementById("xMax").value) || 200;
  xMinInput = Number(document.getElementById("xMin").value) || -200;
  stepInput = Number(document.getElementById("step").value) || 5;

  if (!functionInput) {
    alert("Por favor, informe uma função válida.");
    return;
  }

  const data = generateChartData(functionInput);
  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById("chartCanvas").getContext("2d");
  chart = await new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          borderColor: "blue",
          borderWidth: 2,
        },
      ],
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: true,
      scales: scales,
      plugins: {
        legend: {
          display: false,
        },
        zoom: zoomOptions,
      },
    },
  });
}

const zoomOptions = {
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "xy",
    onZoom({ chart }) {
      const zoomScale = chart.getZoomLevel();
      if (zoomScale < 1) {
        chart.scales.x.min = originalXAxisConfig.min;
        chart.scales.x.max = originalXAxisConfig.max;
        chart.scales.x.ticks.stepSize = originalXAxisConfig.ticks.stepSize;
      }
    },
  },
  pan: {
    enabled: true,
    mode: "xy",
  },
};

const scales = {
  x: {
    display: true,
    min: xMinInput,
    max: xMaxInput,
    ticks: {
      stepSize: stepInput,
    },
    grid: {
      color: "rgba(0, 0, 0, 1)",
    },
  },
  y: {
    display: true,
    grid: {
      color: "rgba(0, 0, 0, 1)",
    },
  },
};

let originalXAxisConfig = {
  min: xMinInput,
  max: xMaxInput,
  ticks: {
    stepSize: stepInput,
  },
};
