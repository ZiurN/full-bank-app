import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, doc, setDoc, query, where} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAGJZCF4JYuH0MBGuzoo7_qHjwa66ol8q4",
	authDomain: "mit-test-project-57d3d.firebaseapp.com",
	databaseURL: "https://mit-test-project-57d3d-default-rtdb.firebaseio.com",
	projectId: "mit-test-project-57d3d",
	storageBucket: "mit-test-project-57d3d.appspot.com",
	messagingSenderId: "713529231221",
	appId: "1:713529231221:web:6e293568dff345ffc5753c"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const usersRef = collection(db, "users");

export function retrieveUserInfo (UserId) {
	return new Promise((resolve, reject) => {
		const q = query(usersRef, where("userId", "==", UserId));
		const querySnapshot = getDocs(q);
		querySnapshot
		.then(data => {
			data.docs.length = 0 ? reject('No Users') : resolve(data.docs[0].data());
		})
		.catch(err => reject(err));
	});
}