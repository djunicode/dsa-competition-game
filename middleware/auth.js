import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async(req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findOne({_id: decoded._id})

    if(!user) {
      throw new Error()
    }

    req.token = token
    req.user = user

    next()
  } catch(e) {
    res.status(401).json({
      success: false,
      message: 'Please authenticate'
    })
  }
}

export default auth

