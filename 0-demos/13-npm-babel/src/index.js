const hello = (numbers) => {
    const hello = 'hello'
    let hi = 'hi'
    const doubles = numbers.map((numb) => numb * 2)
    const p1 = fetch('https://example.com')
    const p2 = fetch('https://example.com')
    Promise.all([p1, p2])
    .then(data => console.log('data'))
    .catch(error => error)
}