const baiduRank = require('./index')

const url = 'http://xc.hubwiz.com/course/597d463fff52d0da7e3e397a'
const word = 'vuex'
const start = 1
const end = 6

baiduRank(url,word,start,end)
  .then(ret => console.log(ret))