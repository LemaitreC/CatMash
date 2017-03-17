'use strict'

const request = require("request")
const fs = require('fs')

describe('** APP **', function () {
    describe('~ Index ~', function () {

        it("Get page : returns status code 200", function (done) {

            request.get('http://localhost:3001', function (err, res, body) {
                expect(res.statusCode).toBe(200)
                done()
            })

        })

        it("should return the list of cats", function (done) {

            request.get('http://localhost:3001/chats', function (error, res, body) {
                expect(res.statusCode).toBe(200)
                expect(JSON.parse(res.body).length).toEqual(2)
                done()
            })
        })

        xit("should return the list of cats", function (done) {

            request.get('http://localhost:3001/vote', function (error, res, body) {
                expect(res.statusCode).toBe(200)
                expect(JSON.parse(res.body).length).toEqual(2)
                done()
            })
        })
    })
    
})