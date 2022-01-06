const { initializeApp } = require('firebase/app')
const { getStorage, ref, uploadString } = require('firebase/storage')
const core = require('@actions/core')
console.log(process.argv[2])
console.log(process.env.STORAGE_BUCKET.length)
const app = initializeApp({
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGE_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
})
const store = getStorage(app)
const build = ref(store, `builds/${process.env.GITHUB_REF}/animated_java.js`)

const fs = require('fs')
uploadString(build, fs.readFileSync('./dist/animated_java.js', 'utf8')).then(
	(snapshot) => {
		console.log(
			'Uploaded animated java to ',
			`builds/${process.env.GITHUB_REF}/animated_java.js`
		)
	}
)
