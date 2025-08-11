// Diagnostic test to see if any JS can execute.
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.backgroundColor = 'blue';
    rootElement.style.textAlign = 'center';
    rootElement.style.paddingTop = '50px';
    rootElement.innerHTML = '<h1 style="color: white; font-family: sans-serif; font-size: 2rem;">Hello World</h1>';
  } else {
    // Fallback if the root element isn't found for some reason
    document.body.style.backgroundColor = 'red';
    document.body.innerHTML = '<h1 style="color: white; font-family: sans-serif; font-size: 2rem; text-align: center; padding-top: 50px;">Hello World - No Root Found</h1>';
  }
});
