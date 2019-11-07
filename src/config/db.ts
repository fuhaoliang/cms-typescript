import * as mongoose from 'mongoose';
import appUrl from '../api'
console.info(appUrl);
const cmsBaseUrl = appUrl.mongodbUrl;
console.info('mongodbUrl---->', cmsBaseUrl);
mongoose.connect(cmsBaseUrl, { useNewUrlParser: true, useCreateIndex: true });
const db =  mongoose.connection;
db.on('error', err => {
  console.info('数据库连接失败', err);
});

db.once('open', () => {
  console.info('连接数据库');
});

export default db;
