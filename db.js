//db.js
const dbName = "UlubioneMiasta";
const storeName = "miasta";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = () => reject("IndexedDB error");
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    };
  });
}
async function isCityExistinDB(cityName) {
  const baza = await openDB();

  return new Promise((resolve, reject) => {
    const tx = baza.transaction("miasta", "readonly");
    const b = tx.objectStore("miasta");
    const request = b.getAll();

    request.onsuccess = () => {
      const cities = request.result;
      const exist = cities.some(
        (city) => city.name.toLowerCase().trim() === cityName.toLowerCase().trim()
      );
      resolve(exist);
    };

    request.onerror = (e) => reject(e.target.error);
  });
}


if (document.getElementById("addCityForm")) {
  document.getElementById("addCityForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const cityName = document.getElementById("cityName").value;
   
  if(await isCityExistinDB(cityName)) 
  {
    alert("To miasto już jest");
  }
  else{
    const baza= await openDB();
      
        const tx = baza.transaction(storeName, "readwrite");
    tx.objectStore(storeName).add({ name: cityName });
    tx.oncomplete = () => {
      document.getElementById("status").innerText = `Dodano: ${cityName}`;
      document.getElementById("cityName").value = "";
    };
  }
    

  });
}


if (document.getElementById("cityList")) {
  (async () => {
    const db = await openDB();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => {
      const cities = request.result;
  
      const weatherContainer=document.getElementById("weatherResult");
     if(!navigator.onLine)
     {
      const ul=document.getElementById("cityList");
      weatherContainer.innerHTML="<p>Brak internetu - nie można pobrać danych pogodowych</p>"
      cities.forEach((c)=>{
        const li = document.createElement("li");
        li.textContent=c.name;
        ul.appendChild(li);
      });
     }
     else{
      cities.forEach((c) => {

        searchWeather(c.name, weatherContainer);
      });
    }
    };
  })();
}
