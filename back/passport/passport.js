import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import users from '../models/users.js'

// 建立一個叫 login 的驗證方式，是使用 passportLocal 的驗證策略(.Strategy)
passport.use('login', new passportLocal.Strategy({
  // 設定傳進來的資料的 username & password 欄位
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // 用 login 的 email 去資料庫查詢對應的 user 資料
    const user = await users.findOne({ email })

    // 如果該 email 沒有對應的 user
    if (!user) {
      throw new Error('EMAIL')
    }
    // 如果該 email 有帳號，但 password 不符
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('PASSWORD')
    }
    // return 查詢到的 user 資料，放在 done 第二個參數
    return done(null, user, null)
  } catch (error) {
    // 錯誤為 => email 沒有對應的 user
    if (error.message === 'EMAIL') {
      return done(null, null, { message: '帳號不存在或email有誤' })

    // 錯誤為 => 該 email 有帳號，但 password 不符
    } else if (error.message === 'PASSWORD') {
      return done(null, null, { message: '密碼錯誤' })

      // 其他錯誤
    } else {
      return done(null, null, { message: '未知錯誤' })
    }
  }
}))
// 上述驗證方式在 middlewares 的 auth.js 被呼叫，執行後將 user 資料代進 auth.js 的 (error, 'user', info)
