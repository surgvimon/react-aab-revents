import {
  getFirestore,
  collection,
  Timestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  updateDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  serverTimestamp,
  increment,
  writeBatch,
  limit,
  startAfter,
  onSnapshot
} from 'firebase/firestore';
import cuid from 'cuid';
import { db } from '../config/firebase';

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function getEventsFromFirestore(observer){
  return onSnapshot(collection(db, "events"), observer);
}

export function listenToEventsFromFirestore() {
  return query(collection(db, "events"), orderBy('date'));
}

export function listenToEventFromFirestore(eventId) {
  return doc(db, "events", eventId);
}

export function addEventToFirestore(event) {
  return addDoc(collection(db, 'events'), {
    ...event,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: arrayUnion({
      id: cuid(),
      displayName: 'Diana',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
    }),
  })
}


export function updateEventInFirestore(event) {
  const eventDoc = doc(db, 'events', event.id);
  return updateDoc(eventDoc, event);
}
 
export function deleteEventInFirestore(eventId) {
  return deleteDoc(doc(db, 'events', eventId));
}

export function cancelEventToggle(event) {
  const eventDoc = doc(db, 'events', event.id);
  return updateDoc(eventDoc, {
    isCancelled: !event.isCancelled
  })
}
