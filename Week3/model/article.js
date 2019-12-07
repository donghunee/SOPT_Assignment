const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil')
/*
아래 infoMap은 DB에 적용하기 이전에 임시 변수입니다.
즉 require 요청한 블록에 생성됩니다.
*/
const blogDB = [{
  title: 'sopt',
  content: 'hello',
  writer: '솝트',
  pwd: '1234',
  time: Date.now(),
}]

const board = {
  create: (title, content, writer, pwd) => {
    return new Promise((resolve, reject) => {
      
      if (!title || !content || !writer || !pwd) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json: "몇개 안넣음"
        })
      }
      const page = {
        title,
        content,
        writer,
        pwd,
        time: Date.now()
      }
      boardDB.push(page)
      resolve({
        code: statusCode.OK,
        json: "성공함"
      })
    })
  },

  read: (idx) => {
    return new Promise((resolve, reject) => {
      const page = board[idx]
      if (!page) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json: "게시물 없음"
        })
      }else{
        resolve({
          code: statusCode.OK,
          json: page
        })
      }
    })
  },

  update: (idx, title, content, writer, pwd) => {
    return new Promise((resolve, reject) => {
      
      
      const page = board[idx]
      if (page.pwd !== pwd) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json
        })
      }
      if (!page) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json: "게시물 없음"
        })
      }else{
        page.title = title
        page.content = content
        page.writer = writer
        page.pwd = pwd

        resolve({
          code: statusCode.OK,
          json: page
        })
      }
    })
  },

  delete: () => {
    return new Promise((resolve, reject) => {

    })
  }
}

module.exports = board