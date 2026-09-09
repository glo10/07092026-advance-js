import { readFile, writeFile as writeFileCB, mkdir } from 'node:fs'
import { writeFile as writeFilePromise } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from "node:url"; 
const __dirname = fileURLToPath(new URL(".", import.meta.url)); // 22-node
const dirPublic = resolve(__dirname, 'public')
writeFilePromise(resolve(dirPublic, 'hi.txt'), 'hi')
.then(res => console.log('res writefile promise', res))
.catch(error => console.error('Error writeFile promise', error))

// création de fichier
writeFileCB(resolve(dirPublic, 'hello.txt'), JSON.stringify({ username: 'Ali', age: 45}), (err) => {
    if(err) console.error('erreur écriture', err)
    else console.log('écriture OK')
})

await writeFilePromise(resolve(dirPublic, 'hola.txt'), 'hola')
readFile(resolve(dirPublic, 'hola.txt'), (err, content) => {
    if(err) console.error('erreur lecture', err)
    else console.log('lecture OK', content.toString())
})