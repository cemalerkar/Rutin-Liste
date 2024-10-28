import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchTrackerData() {
  const querySnapshot = await getDocs(collection(db, "rutinler"));
  const trackerList = document.getElementById("tracker-list");

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.classList.add("tracker-day");

    const header = document.createElement("div");
    header.classList.add("tracker-day-header");
    header.innerHTML = `${data.tarih} - %${calculateCompletion(data.rutinler)}`;

    div.appendChild(header);
    trackerList.appendChild(div);
  });
}

function calculateCompletion(routines) {
  const completed = routines.filter((r) => r.tamamlandi).length;
  return Math.round((completed / routines.length) * 100);
}

fetchTrackerData();
