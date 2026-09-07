
const team = [
  { name: 'Alice', dept: 'Tech' },
  { name: 'Bob', dept: 'HR' },
  { name: 'Chantal', dept: 'Tech' }
];
/**
 * En JS, c'est possible d'appeler les propriétés d'un objet
 * en index de l'objet
 */
const alice = team[0]['name'] // idem que team[0].name

const byDept = team.reduce((acc, emp) => {
  const key = emp.dept;
  if (!acc[key]) acc[key] = [];
  acc[key].push(emp.name);
  return acc;
}, {}); 
console.log('par Dept.', byDept); // Résultat : { Tech: ['Alice', 'Chantal'], HR: ['Bob'] }
            