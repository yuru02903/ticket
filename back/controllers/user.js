import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

// 建立使用者
export const create = async (req, res) => {
  try {
    await users.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 11000 => 資料重複的錯誤代碼
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '該帳號已被註冊'
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}

// 登入資料
export const login = async (req, res) => {
  try {
    // jwt.sign(保存對象的id, 密鑰, 保存期限)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // req.user 為 middlewares 的 auth.js 在驗證完登入帳號後代入的 user 資訊
    req.user.tokens.push(token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // 回覆該使用者可能會使用的資訊
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
