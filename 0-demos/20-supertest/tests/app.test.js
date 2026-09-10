/**
 * Avec supertest testetr les routes de votre application (pages web ou api)
 */
import { describe, it, expect } from 'vitest'
import app from '../src/app.js' // application Node.js
import request from 'supertest'

describe('Testing app navigation', () => {
    describe('Testing homepage /', () => {
        it('Should have HTTP status code 200', () => {
            return request(app)
                .get('/')
                .expect(200)
        })

        it('Should have HTML content text/html', () => {
            return request(app)
                .get('/')
                .expect('Content-Type', /html/)
        })

        it('Should have h1', () => {
            return request(app)
                .get('/')
                .then(response => {
                    const html = response.body
                    expect(html).toContain('<h1');
                })
        })
    })
})