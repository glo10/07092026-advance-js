import { findUsers } from "../api"

self.onmessage = async (event) => {
    if(event.data === 'FETCH_USERS') {
        try {
            const users = await findUsers()
            self.postMessage({ status: 'success', data : users})
        } catch(error) {
            self.postMessage({ status: 'error', message: error })
        }
    }
}