import { fetchUserData , findUsers} from './api';
import { finalSettings, theme, otherSettings } from './config'
import EmailNotification from "./email-notification";
// Q8
const user = fetchUserData(1)
// Q10
const users = await findUsers();
const email = new EmailNotification("@", 'hello')
console.log('finalSettings', finalSettings, 'theme', theme)