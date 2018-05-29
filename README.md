# baidu-rank

查询网页在指定关键词上的百度排名。

## 安装

```
$ npm install baidu-rank
```

## 使用

下面的代码用来查询网页`http://xc.hubwiz.com/course/597d463fff52d0da7e3e397a`
在[vuex](http://xc.hubwiz.com/course/597d463fff52d0da7e3e397a)
关键字上的排名，查询范围为百度搜索结果页1~76：

```
var baiduRank = require('baidu-rank')

var url = 'http://xc.hubwiz.com/course/597d463fff52d0da7e3e397a'
var word = 'vuex'
var start = 1
var end = 76

baiduRank(url,word,start,end)
  .then(ret => console.log(ret))
```

输入结果类似如下：

```
=> vuex
[{
  word: 'vuex',
  url: 'http://xc.hubwiz.com/course/597d463fff52d0da7e3e397a',
  rank: 27
}]
```

## 感谢

- [汇智网](http://www.hubwiz.com)