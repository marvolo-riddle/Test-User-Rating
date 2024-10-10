import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBcZw_Pqya7js3lY1Z1naA98-b9OL44zQM",
  authDomain: "userfeedbackapp-6b7f2.firebaseapp.com",
  projectId: "userfeedbackapp-6b7f2",
  databaseURL: "https://userfeedbackapp-6b7f2-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:516411234343:web:e42b91dd4379e253a15602",

};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;