/*
  # 对mongodb做一些增改操作时，mongodb不会审查其类型。也就是说类型不固定。
  # 比如你想要age是int32类型，这时候插入了一个string类型的age，同样不会报错。
*/

// Mongo的一些连接配置
const MongoConfig = require('./config/config'),
  // 引入mongo模块
  Mongo = require('mongodb'),
  MongoClient = Mongo.MongoClient,
  // 想要使用任何与 id:ObjectId('id') 的操作都必须引入这个库
  ObjectID = Mongo.ObjectID

class DBHelper {
  // 单例
  static getInstance() {
    if (!DBHelper.instance) {
      DBHelper.instance = new DBHelper()
    }
    return DBHelper.instance
  }

  constructor() {
    // 初始化的时候连接数据库
    this.connect()
    this.dbConnect = null
  }

  connect() {
    // 异步代码的同步解决方式Promise
    return new Promise((resolve, reject) => {
      if (this.dbConnect) {
        resolve(this.dbConnect)
      } else {
        MongoClient.connect(
          MongoConfig.dbUrl,
          { useNewUrlParser: true },
          (err, client) => {
            this.client = client
            if (err) {
              reject(err)
            } else {
              this.dbConnect = client.db(MongoConfig.dbName)
              resolve(this.dbConnect)
            }
          }
        )
      }
    })
  }

  // 关闭数据库
  close() {
    this.client.close()
    this.dbConnect = null
  }

  // 因为find过后的id是5bf2e0246863c02e4c91633a这样子的
  // 而find所需要的id又是id:ObjectId('id')这样子的
  // 所以这里需要转换一下
  getObjectId(id) {
    return new ObjectID(id)
  }

  update(collectionName, opt, data) {
    return new Promise(async (resolve, reject) => {
      const result = (await this.connect())
        .collection(collectionName)
        .update(opt, { $set: data }, (err, result) => {
          err ? reject(err) : resolve(result)
        })
    })
  }

  find(collectionName, opt) {
    return new Promise(async (resolve, reject) => {
      const result = (await this.connect()).collection(collectionName).find(opt)
      result.toArray((err, docs) => {
        err ? reject(err) : resolve(docs)
      })
    })
  }

  insert(collectionName, data) {
    return new Promise(async (resolve, reject) => {
      const result = (await this.connect())
        .collection(collectionName)
        .insert(data, (err, result) => {
          err ? reject(err) : resolve(result)
        })
    })
  }

  remove(collectionName, opt) {
    return new Promise(async (resolve, reject) => {
      const result = (await this.connect())
        .collection(collectionName)
        .remove(opt, (err, result) => {
          err ? reject(err) : resolve(result)
        })
    })
  }
}

const dbHelper = DBHelper.getInstance()
const username = 'zxyshen'
const age = 21
const sex = 'man'
// const data = dbHelper.update(
//   'user',
//   { username: '21zzxs' },
//   { username, age, sex }
// ).then(data=>{
//   console.log(data)
// })
// const data = dbHelper.insert('user',[{'username':'zxyshen'},{'username':'zxyshen'}]).then(result=>{
//   console.log(result)
// })
const data = dbHelper.remove('user',{'username':'zxyshen'}).then(result=>{
  console.log(result)
})


module.exports = DBHelper.getInstance()
