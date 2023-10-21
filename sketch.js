let chart;
let chartCanvas;
let functionInput;

function setup() {
  chartCanvas = createCanvas(400, 400);
  chartCanvas.parent("chartCanvas");

  functionInput = "y = x ^ 4 / x ^ 3";

  plotGraph();
}

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

function generateChartData(expression) {
  let labels = Array.from({ length: 21 }, (_, i) => i * 5 - 50);
  let values = labels.map((x) => evaluateExpression(expression, x));

  const filtraComplexos = (_, index) => {
    if (isNaN(values[index])) {
      return false;
    }
    return true;
  };

  labels = labels.filter(filtraComplexos);
  values = values.filter(filtraComplexos);

  return { labels, values };
}

function evaluateExpression(expression, x) {
  try {
    const result = math.evaluate(expression, { x });
    if (math.typeOf(result) === "Complex") {
      return NaN;
    }
    return result;
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return NaN;
  }
}
