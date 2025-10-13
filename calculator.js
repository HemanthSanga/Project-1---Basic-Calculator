  const display = document.getElementById("display");

  // Append value to display
  function append(value) {
    if (display.innerText === "0" || display.innerText === "Error") {
      display.innerText = value;
    } else {
      display.innerText += value;
    }
  }

  // Clear entire display
  function clearDisplay() {
    display.innerText = "0";
  }

  // Delete last character
  function deleteChar() {
    display.innerText = display.innerText.slice(0, -1) || "0";
  }

  // Evaluate the expression
  function calculate() {
    try {
      const result = eval(display.innerText
        .replace(/÷/g, '/')
        .replace(/×/g, '*'));
      display.innerText = result;
    } catch {
      display.innerText = "Error";
      setTimeout(clearDisplay, 1500);
    }
  }

  // Enable keyboard input
  document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9+\-*/.%]/.test(key)) {
      append(key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      deleteChar();
    } else if (key === "C" || key === "c") {
      clearDisplay();
    } else if (key === ".") {
      append(".");
    }
  });