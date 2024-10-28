// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyDn1blxTVVpal72k2BuR-yPsdzM7h7BSr8",
  authDomain: "bizimyilimiz.firebaseapp.com",
  databaseURL:
    "https://bizimyilimiz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bizimyilimiz",
  storageBucket: "bizimyilimiz.appspot.com",
  messagingSenderId: "569819222872",
  appId: "1:569819222872:web:f4b0e2c206449116af8b2d",
  measurementId: "G-3NL3RN2MCB",
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const routineList = document.getElementById("routine-list");

// Bugünkü gün (0 = Pazar, 1 = Pazartesi ...)
const today = new Date().getDay();

// Bugünün rutinlerini Firestore'dan getir
db.collection("routines")
  .where("days", "array-contains", today)
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onclick = () => {
        li.style.textDecoration = checkbox.checked ? "line-through" : "none";
      };

      li.appendChild(checkbox);
      routineList.appendChild(li);
    });
  });
