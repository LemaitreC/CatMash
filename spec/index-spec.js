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

        it("should return the list of two random cats", function (done) {

            request.get('http://localhost:3001/chats', function (error, res, body) {
                expect(res.statusCode).toBe(200)
                expect(JSON.parse(res.body).length).toEqual(2)
                done()
            })
        })

        it("should Add a cat to the database", function (done) {

            request.get('http://localhost:3001/vote/?id=baq&url=http://25.media.tumblr.com/tumblr_lhp53nDdzx1qgnva2o1_500.jpg', function (error, res, body) {
                expect(res.statusCode).toBe(200)
                done()
            })
        })
        
        it("should fail adding a cat to the database", function (done) {

            request.get('http://localhost:3001/vote/?id=00000000000&url=../images/image_not_found.png', function (error, res, body) {
                expect(res.statusCode).toBe(200)
                expect(body).toContain('Vote - CatMash')
                done()
            })
        })
        
    })
    
})