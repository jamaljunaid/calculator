// Basic calculator logic
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function appendValue(val){
  display.value = (display.value || '') + val;
}

function clearDisplay(){ display.value = ''; }
function backspace(){ display.value = display.value.slice(0, -1); }

function sanitize(expr){
  // Allow digits, operators, parentheses, decimal point and spaces
  const cleaned = expr.replace(/[^0-9+\-*/(). %]/g, '');
  return cleaned;
}

function evaluateExpression(){
  const raw = display.value;
  const expr = sanitize(raw);
  if(!expr.trim()) return;
  try{
    // Evaluate in a safe-ish way using Function constructor
    // We still sanitize input above to remove letters.
    const result = Function('return ' + expr)();
    display.value = String(result);
  }catch(e){
    display.value = 'Error';
    setTimeout(()=>{ display.value = ''; }, 900);
  }
}

buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const v = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');
    if(action === 'clear') return clearDisplay();
    if(action === 'backspace') return backspace();
    if(action === 'equals') return evaluateExpression();
    if(v) appendValue(v);
  });
});

// Keyboard support
window.addEventListener('keydown', (e)=>{
  const key = e.key;
  if(key === 'Enter' || key === '='){ e.preventDefault(); return evaluateExpression(); }
  if(key === 'Backspace'){ return backspace(); }
  if(key === 'Escape'){ return clearDisplay(); }

  // Allow digits, operators and parentheses and dot
  if(/^[0-9+\-*/(). ]$/.test(key)){
    appendValue(key);
  }
});

// Theme (dark mode) toggle and persistence
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme){
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('calculatorTheme', theme);
  if(themeToggle){
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
  }
}

function toggleTheme(){
  const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// Initialize theme from localStorage or system preference
(function(){
  const saved = localStorage.getItem('calculatorTheme');
  if(saved){
    setTheme(saved);
  }else{
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

if(themeToggle){
  themeToggle.addEventListener('click', toggleTheme);
}
