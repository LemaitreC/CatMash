'use strict'

const request = require('request')

const statusOK = 200

describe('** APP **', function() {
	describe('~ Index ~', function() {

		it('Get page : returns status code 200', function(done) {

			request.get('http://localhost:3001', function(err, res) {
				expect(res.statusCode).toBe(statusOK)
				expect(err).toEqual(null)
				done()
			})

		})

		it('should return the list of two random cats', function(done) {

			request.get('http://localhost:3001/chats', function(err, res) {
				const twoCats = 2

				expect(err).toEqual(null)
				expect(res.statusCode).toBe(statusOK)
				expect(JSON.parse(res.body).length).toEqual(twoCats)
				done()
			})
		})

		it('should Add a cat to the database', function(done) {

			request.get('http://localhost:3001/vote/?id=baq&url=http://25.media.tumblr.com/tumblr_lhp53nDdzx1qgnva2o1_500.jpg', function(err, res) {
				expect(err).toEqual(null)
				expect(res.statusCode).toBe(statusOK)
				done()
			})
		})

		it('should fail adding a cat to the database', function(done) {

			request.get('http://localhost:3001/vote/?id=00000000000&url=../images/image_not_found.png', function(err, res, body) {
				expect(res.statusCode).toBe(statusOK)
				expect(err).toEqual(null)
				expect(body).toContain('Vote - CatMash')
				done()
			})
		})

	})

	describe('~ Resultats ~', function() {

		it('Get page : returns status code 200', function(done) {

			request.get('http://localhost:3001/resultats/', function(err, res) {
				expect(err).toEqual(null)
				expect(res.statusCode).toBe(statusOK)
				done()
			})

		})

		it('should return the results of the votes', function(done) {

			request.get('http://localhost:3001/resultats/votes/', function(err, res) {
				const cats = 50

				expect(err).toEqual(null)
				expect(res.statusCode).toBe(statusOK)
				console.log(JSON.parse(res.body).length)
				expect(JSON.parse(res.body).length).toBeGreaterThan(cats)
				done()
			})

		})


	})

})
