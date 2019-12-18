const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const mongo_conf = require('../config/mongo')

class Mongo{
    constructor() {
        this.mongo = new MongoClient(`${mongo_conf.url}:${mongo_conf.port}`, { useUnifiedTopology: true })
        this.mongo.connect(err => {
            assert.equal(null, err)
            this.db = this.mongo.db(mongo_conf.db)
            console.log('mongo连接数据库成功')
        })
    }
    insert(collection, data, options={}) {
        return new Promise((resolve, reject) => {
            if(data instanceof Array) {
                this.db.collection(collection).insertMany(data, options, (err, res) => {
                    assert.equal(null, err)
                    resolve(res)
                })
            } else {
                this.db.collection(collection).insertOne(data, options, (err, res) => {
                    assert.equal(null, err)
                    resolve(res)
                })
            }
        })
    }
    update(collection, filter, set, options={}, way='one') {
        return new Promise((resolve, reject) => {
            switch(way) {
                case 'one':
                    this.db.collection(collection).updateOne(filter, set, options, (err, res) => {
                        assert.equal(null, err)
                        resolve(res)
                    })
                    break
                case 'many':
                    this.db.collection(collection).updateMany(filter, set, options, (err, res) => {
                        assert.equal(null, err)
                        resolve(res)
                    })
                    break
            }
        })
    }
}

module.exports = new Mongo()