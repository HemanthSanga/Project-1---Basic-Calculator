const display = document.getElementById("display");

  // Append numbers or symbols to display
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

  // Calculate using BODMAS
  function calculate() {
    try {
      let expression = display.innerText;

      // Replace symbols
      expression = expression
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/\^/g, '**');

      // Evaluate expression with BODMAS
      const result = Function(`'use strict'; return (${expression})`)();
      display.innerText = Number.isFinite(result) ? result : "Error";
    } catch {
      display.innerText = "Error";
      setTimeout(clearDisplay, 1500);
    }
  }

  // Square root function
  function calculateSqrt() {
    try {
      const value = parseFloat(display.innerText);
      if (isNaN(value)) {
        display.innerText = "Error";
      } else {
        display.innerText = Math.sqrt(value);
      }
    } catch {
      display.innerText = "Error";
    }
  }

  // Percentage function (converts current number into its percentage)
  function calculatePercentage() {
    try {
      const value = parseFloat(display.innerText);
      if (isNaN(value)) {
        display.innerText = "Error";
      } else {
        display.innerText = value / 100;
      }
    } catch {
      display.innerText = "Error";
    }
  }

  // Keyboard support for input handling
  document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/[0-9+\-*/().]/.test(key)) {
      append(key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      deleteChar();
    } else if (key === "Escape") {
      clearDisplay();
    } else if (key === "%") {
      calculatePercentage();
    } else if (key.toLowerCase() === "s") { // Shortcut for square root
      calculateSqrt();
    }
  });
