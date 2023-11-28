const formulaButtons = document.querySelectorAll(".formula-item button");

const formulaInput = document.getElementById("function");

formulaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.value;
    formulaInput.value += buttonValue;
  });
});