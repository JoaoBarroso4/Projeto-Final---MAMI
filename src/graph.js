function plotGraph(event) {
  event.preventDefault();

  functionInput = document.getElementById("function").value;
  xMaxInput = Number(document.getElementById("xMax").value) || 50;
  xMinInput = Number(document.getElementById("xMin").value) || -50;
  stepInput = Number(document.getElementById("step").value) || 5;

  if (!functionInput) {
    console.log("Por favor, informe uma função válida.");
    return;
  }

  const data = generateChartData(functionInput);
  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById("chartCanvas").getContext("2d");
  chart = new Chart(ctx, {
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
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
