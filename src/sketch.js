let chart;
let chartCanvas;
let functionInput;

function setup() {
  chartCanvas = createCanvas(400, 400);
  chartCanvas.parent("chartCanvas");

  functionInput = "y = x ^ 4 / x ^ 3";

  plotGraph();
}