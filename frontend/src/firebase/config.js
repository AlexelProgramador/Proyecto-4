// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBluaQX4Na9Lfn9KlZMcjyz90ELqho24hc",
  authDomain: "deaodontouchile.firebaseapp.com",
  projectId: "deaodontouchile",
  storageBucket: "deaodontouchile.appspot.com",
  messagingSenderId: "439004879806",
  appId: "1:439004879806:web:504a8d5d7d1e92817977ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFiles(files, nroSolicitud, nroEtapa) {
  // Si files no es un arreglo, lo convertimos en un arreglo
  const filesArray = Array.isArray(files) ? files : [files];

  const urls = await Promise.all(
    filesArray.map(async (file) => {
      const fileName = file.name;
      const combinedName = `${nroSolicitud}_${fileName}_${nroEtapa}`;
      const storageRef = ref(storage, `Documentos_solicitudes/${combinedName}`);
      await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    })
  );

  return urls;
}