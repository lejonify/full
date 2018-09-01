const firebase = require('firebase/app');
require('firebase/database');

const config = {
  apiKey: 'AIzaSyCy12PDDurN5FcAj5twWKVl_zeCjDIgA-w',
  authDomain: 'sprakjs.firebaseapp.com',
  databaseURL: 'https://sprakjs.firebaseio.com',
  projectId: 'sprakjs',
  storageBucket: '',
  messagingSenderId: '294157308864',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const ref = firebase.database().ref();

module.exports = {
  ref,
};
