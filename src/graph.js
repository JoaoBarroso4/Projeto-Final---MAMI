function plotGraph() {
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