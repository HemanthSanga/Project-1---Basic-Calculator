const display = document.getElementById("display");
  let memoryValue = 0; // Memory storage

  // Add value to display
  function append(value) {
    if (display.innerText === "0" || display.innerText === "Error") {
      display.innerText = value;
    } else {
      display.innerText += value;
    }
  }

  // Clear display
  function clearDisplay() {
    display.innerText = "0";
  }

  // Delete last character
  function deleteChar() {
    display.innerText = display.innerText.slice(0, -1) || "0";
  }

  // Calculate result (follows BODMAS)
  function calculate() {
    try {
      let expression = display.innerText;

      // Replace custom symbols with JS equivalents
      expression = expression
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/\^/g, '**')
        .replace(/√\(/g, 'Math.sqrt(');

      // Handle percentages (convert "50%" → "(50/100)")
      expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

      // Evaluate safely using Function
      const result = Function(`'use strict'; return (${expression})`)();
      display.innerText = Number.isFinite(result) ? result : "Error";
    } catch {
      display.innerText = "Error";
      setTimeout(clearDisplay, 1500);
    }
  }

  // --- Memory Functions ---
  function memoryAdd() {
    memoryValue += Number(display.innerText) || 0;
  }

  function memorySubtract() {
    memoryValue -= Number(display.innerText) || 0;
  }

  function memoryRecall() {
    display.innerText = memoryValue.toString();
  }

  function memoryClear() {
    memoryValue = 0;
  }

  // --- Keyboard Support ---
  document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9+\-*/().%^]/.test(key)) {
      append(key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      deleteChar();
    } else if (key === "Escape") {
      clearDisplay();
    } else if (key.toLowerCase() === "r") { // "r" for sqrt
      append("√(");
    } else if (key === "%") {
      append("%");
    } else if (key === ".") {
      append(".");
    } else if (key.toLowerCase() === "m") {
      memoryRecall();
    }
  });