document.getElementById('optionsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const engines = formData.getAll('engines');
  
    chrome.storage.sync.set({ engines }, () => {
      console.log('Search engines saved:', engines);
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['engines'], (result) => {
      if (result.engines) {
        const checkboxes = document.querySelectorAll('input[name="engines"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = result.engines.includes(checkbox.value);
        });
      }
    });
  });
  