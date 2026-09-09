import { describe, it, expect } from 'vitest'
import  { sum } from '../src/my-math'
describe('Testing sum())', () => {
    it('Should equals 5 when nb1 = 2 and nb2 = 3', () => {
        // AAA
        // Arrange : préparation de l'environnement adéquate à votre test
        const nb1 = 2
        const nb2 = 3
        // Act : l'appel et l'exécution de la brique à tester
        const result = sum(nb1,nb2)
        // Assert : vérification du résulat qui doit être conforme au comportement attendu
        expect(result).toBe(5)
    })
    it('Should equals 10 when nb1=1, nb2=2 and nb3=7', () => {
        expect(sum(1,2,7)).toBe(10)
    })

    it('Should equals 100', () => {
        expect(sum(10, 20, 10, 20, 5, 35)).toBe(100)
    })
})

describe.skip('Testing multiply())', () => {})