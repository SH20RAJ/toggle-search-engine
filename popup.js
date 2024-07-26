document.querySelectorAll('.engine').forEach(item => {
    item.addEventListener('click', () => {
      const engine = item.getAttribute('data-engine');
      chrome.runtime.sendMessage({ action: 'toggleEngine', engine: engine });
    });
  });