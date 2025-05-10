if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.error('SW registration failed', err));
  });
  if(navigator.onLine)
  {
    console.log("Strona działa online");
                
}
  else{
    console.log("Strona działa offline");
                }}
