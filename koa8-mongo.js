// 第一步 安装mongo
// cnpm install mongodb --save

// 第二步 引入mongodb下面的mongoclient
// const MongoClient = require('mongodb').MongoClient

// 第三步 定义数据库连接的地址 以及配置数据库
// const url = 'mongodb://localhost:27017/'
// const dbName = ''koa

// 第四步 连接/操作数据库
// MongoClient.connect(url, (err, client){
//  const db = client.db(dbName)}
//  db.collection(collectionName).api
//  用完别忘了关闭
//  db.close()
// }

const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://127.0.0.1:27017/'
const dbName = 'koa'
console.time('start')
MongoClient.connect(
  dbUrl,
  (err, client) => {
    if (err) {
      console.log(err)
      return
    }
    const db = client.db(dbName)
    // db.collection('user').insertOne(
    //   {
    //     username: 'zxeny',
    //     age: 23,
    //     sex: '男',
    //     status: true
    //   },
    //   (err, result) => {
    //     if (err) {
    //       console.log(err)
    //       return
    //     }
    //     console.log('操作成功')
    //   }
    // )
    const result = db.collection('user').find({})
    result.toArray((err, docs) => {
      console.log(docs)
    })
    client.close()
    // 耗时主要在连接数据库这里
    console.timeEnd('start')
  }
)
