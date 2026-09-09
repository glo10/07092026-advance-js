function getResponse<T>(url: string) : Promise<T> {
  return fetch(url)
  .then(res => res.json())
  .catch(error => error)
} 

// Trivial pour l'inférence de TypeScript mais peut être essentiel pour l'autocomplétion ou pour utiliser todos opar la suite 
type TodoList = Array<{
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}>
// typer un objet dont les clés sont des strings et des valeurs des stringt 
type MyObject = Record<string, string>
// autre notation pour typer les objets
type MyObjectV2 =  { [key: string] : string }

const todoPartialV1 = await  getResponse('https://jsonplaceholder.typicode.com/todos') as Partial<TodoList>
// todoPartialV1 même que todoPartialV2 avec une syntaxe différente
const todosPartialV2 = await  getResponse<Partial<TodoList>>('https://jsonplaceholder.typicode.com/todos')
const comment = await getResponse('https://jsonplaceholder.typicode.com/comments')

