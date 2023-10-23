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
