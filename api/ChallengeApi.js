import firebase from 'react-native-firebase';
import React from 'react';

export function addChallenge(challenge, addComplete){

    firebase.firestore()
    .collection('Challenges')
    .add({
        name: challenge.name,
        color: challenge.color,
        createdAt: firebase.firestore.FieldValue.serverTimeStamp()
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getChallenges(challengesRetrieved){

    var challengeList = [];

    var snapshot = await firebase.firestore()
    .collection('Challenges')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {

        challengeList.push(doc.data());
    });

    challengesRetrieved(challengeList);
}