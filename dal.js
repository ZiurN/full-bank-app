import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, query, where, orderBy, doc, updateDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAGJZCF4JYuH0MBGuzoo7_qHjwa66ol8q4",
	authDomain: "mit-test-project-57d3d.firebaseapp.com",
	databaseURL: "https://mit-test-project-57d3d-default-rtdb.firebaseio.com",
	projectId: "mit-test-project-57d3d",
	storageBucket: "mit-test-project-57d3d.appspot.com",
	messagingSenderId: "713529231221",
	appId: "1:713529231221:web:6e293568dff345ffc5753c"
};
const firebaseApp = initializeApp(firebaseConfig);;
const auth = getAuth();
const db = getFirestore(firebaseApp);
const usersRef = collection(db, "users");
const transactionsRef = collection(db, "transactions");

export function retrieveUserInfo (UserId) {
	return new Promise((resolve, reject) => {
		const queryUserInfo = query(usersRef, where("userId", "==", UserId));
		getDocs(queryUserInfo).then(data => {
			let userInfo;
			if (data.docs.length === 0) {
				reject('No Users');
			} else if (data.docs.length === 1){
				data.forEach((doc) => {
					userInfo = {...doc.data(), Id : doc.id};
				});
				retrieveUserTransactionsInf(UserId).then((userTransactionsInfo) => {
					resolve({userInfo, userTransactionsInfo});
				}).catch(err => reject(err));
			}
		}).catch(err => reject(err));
	});
}

export function retrieveUserTransactionsInf (UserId) {
	return new Promise((resolve, reject) => {
		const queryTransactionsInf = query(transactionsRef, where("userId", "==", UserId), orderBy('date'));
		const querySnapshot = getDocs(queryTransactionsInf);
		querySnapshot.then(data => {
			let transactionsList = [];
			if (data.docs.length === 0) {
				resolve([]);
			} else {
				data.forEach((doc) => {
					transactionsList.push(doc.data());
				});
				resolve(transactionsList);
			}
		}).catch(err => reject(err));
	});
}

export function createUserInFirebase ({name, email, password}) {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, 'system@test.com', 'jef123456').then((userCredential) => {
			createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				let newUser = {
					userId : user.uid,
					name: name,
					email: email,
					balance: 0,
					image: 'https://firebasestorage.googleapis.com/v0/b/mit-test-project-57d3d.appspot.com/o/newUser.jpg?alt=media&token=d86625c1-7c6e-4b38-a7f5-463249ca4269'
				}
				addDoc(usersRef, newUser).then((result) => {
					signOut(auth).then(() => {
						resolve(`User ${name} has been created!`);
					}).catch(error => reject(error));
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		}).catch(error => reject(error));
	});
}

export function upddateUserInfoInFirebase ({userInfo, transactionInf}) {
	return new Promise((resolve, reject) => {
		let userRef = doc(db, 'users', userInfo.Id);
		updateDoc(userRef, {balance: userInfo.balance}).then(() => {
			addDoc(transactionsRef, transactionInf).then(() => {
				resolve(`Deposit Done!`);
			}).catch(error => {console.log(error); reject(error)});
		}).catch(error => {console.log(error); reject(error)});
	});
}