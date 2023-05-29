import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import { auth } from '../../app/config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { APP_LOADED } from '../../app/async/asyncReducer';
import { dataFromSnapshot, getUserProfile } from '../../app/firestore/firestoreService';
import { listenToCurrentUserProfile } from '../profiles/profileActions';

export function signInUser(user) {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}

export function verifyAuth() {
    return function (dispatch) {
        return onAuthStateChanged(auth, user => {
            if (user) {
                // dispatch({type: SIGN_IN_USER, payload:user})

                dispatch(signInUser(user));
                const profileRef = getUserProfile(user.uid);
                onSnapshot(profileRef, snapshot => {
                  dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                  dispatch({type: APP_LOADED})
                })
            } else {
                dispatch(signOutUser())
                dispatch({type: APP_LOADED})
            }
        })
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    }
}