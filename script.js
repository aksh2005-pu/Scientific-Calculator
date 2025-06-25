// Append any value (number, operator, etc.) to the display
function appendToDisplay(value) {
  const display = document.getElementById('display');
  display.value += value; // just add it at the end for now
}

// Clears out the display completely
function clearDisplay() {
  const input = document.getElementById('display');
  input.value = '';
}

// Remove last character (in case of typo or fat-finger)
function backspace() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1); // lops off the end char
}

// Attempts to evaluate the math expression
function calculate() {
  const display = document.getElementById('display');

  try {
    // Using Function constructor instead of eval — slightly safer, still sketchy but fine here
    const result = Function('"use strict"; return (' + display.value + ')')();
    display.value = result;
  } catch (err) {
    // Oops, probably a malformed input
    display.value = "Error"; // fallback for broken expressions
  }
}

// Theme toggle logic
function toggleMode() {
  const body = document.body;
  const btn = document.getElementById('toggleMode');

  body.classList.toggle('light');

  // Set text based on the updated theme
  if (body.classList.contains('light')) {
    btn.textContent = "🌞 Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
}


// Adding keyboard interaction — for users who type like me
document.addEventListener('keydown', function (e) {
  const key = e.key;

  // Valid inputs we’ll allow into the display
  const validKeys = ['+', '-', '*', '/', '.', '(', ')'];

  if ((key >= '0' && key <= '9') || validKeys.includes(key)) {
    appendToDisplay(key);

  } else if (key === 'Backspace') {
    backspace();

  } else if (key === 'Enter' || key === '=') {
    // Might be redundant, but people hit either
    calculate();

  } else if (key.toLowerCase() === 'c') {
    // quick-clear shortcut
    clearDisplay();
  }

  // Could add more keys later (like s for sin or l for log?), but keeping it simple
});
