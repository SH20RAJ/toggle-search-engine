document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.engine').forEach(engine => {
      engine.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          let currentUrl = new URL(tabs[0].url);
          let query = null;
  
          // Extract the search query based on the search engine
          if (currentUrl.hostname.includes('google')) {
            query = currentUrl.searchParams.get('q');
          } else if (currentUrl.hostname.includes('bing')) {
            query = currentUrl.searchParams.get('q');
          } else if (currentUrl.hostname.includes('duckduckgo')) {
            query = currentUrl.searchParams.get('q');
          } else if (currentUrl.hostname.includes('yahoo')) {
            query = currentUrl.searchParams.get('p');
          } else if (currentUrl.hostname.includes('baidu')) {
            query = currentUrl.searchParams.get('wd');
          } else if (currentUrl.hostname.includes('yandex')) {
            query = currentUrl.searchParams.get('text');
          }
  
          if (!query) {
            alert('Please search something on a supported search engine first.');
            return;
          }
  
          let searchEngine = engine.getAttribute('data-engine');
          let searchUrl;
  
          switch (searchEngine) {
            case 'google':
              searchUrl = `https://www.google.com/search?q=${query}`;
              break;
            case 'bing':
              searchUrl = `https://www.bing.com/search?q=${query}`;
              break;
            case 'duckduckgo':
              searchUrl = `https://duckduckgo.com/?q=${query}`;
              break;
            case 'yahoo':
              searchUrl = `https://search.yahoo.com/search?p=${query}`;
              break;
            case 'baidu':
              searchUrl = `https://www.baidu.com/s?wd=${query}`;
              break;
            case 'yandex':
              searchUrl = `https://yandex.com/search/?text=${query}`;
              break;
          }
  
          chrome.tabs.update(tabs[0].id, { url: searchUrl });
        });
      });
    });
  });
  