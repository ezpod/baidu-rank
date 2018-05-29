/*
  baidu-rank: 
  
  find keyword rank of a url in baidu search results
  
  ezpod@hubwiz.com
*/
var Promise = require('bluebird')
var request = require('request')
var cheerio = require('cheerio')

request = request.defaults({
  gzip: true,
  headers: {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
  }      
})

// search a keyword 
function searchPage(kw,page){
  if(!page) page = 1
  
  process.stdout.write(page + '\r')

  var pn = (page - 1)*10
  
  
  var opts = {
    url: 'https://www.baidu.com/s',
    method: 'GET',
    qs: {
      wd: kw,
      pn: pn
    }
  }

  return new Promise(function(resolve,reject){
    request(opts,function(err,rsp,body){
      if(err) return reject(err)      
      var $ = cheerio.load(body)
      var ret = []
      $('.result .t a').each(function(i,e){
        var link = $(e).attr('href')
        ret.push(link)
      })
      resolve(ret)
    })
  })
  .then(serp => Promise.map(serp,resolveLink))
}

//resolve encryped link
function resolveLink(url){
  var opts = {
    url: url,
    method: 'GET',
    followRedirect:false
  }
  return new Promise(function(resolve,reject){
    request(opts,function(err,rsp,body){
      if(err) return reject(err)
      resolve(rsp.headers.location)
    })
  })
}

//get hits in serp
function findRankInPage(target,kw,page){
  var re = new RegExp(target)
  return searchPage(kw,page)
    .then(function(serp){
      var hit = false
      for(var i=0;i<serp.length;i++){
        var item = serp[i]
        if(re.test(item)) hit = {word:kw,url:item,rank: (page-1)*10+i}
        if(hit) break
      }
      return Promise.resolve(hit)
    })
}

//entry
function findRank(target,kw,start,end){
  console.log('=> ', kw)
  var pages = []
  for(var i=start;i<=end;i++) pages.push(i)
  return Promise.mapSeries(pages,p => findRankInPage(target,kw,p))
    .then(hits => hits.filter(hit => hit))
    .catch(err => console.error(err))    
}

module.exports = findRank

