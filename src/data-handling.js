function generateChartData(expression) {
  const length = Math.ceil((xMaxInput - xMinInput) / stepInput) + 1;
  let labels = Array.from({ length }, (_, i) => i * stepInput + xMinInput);
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
