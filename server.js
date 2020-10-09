var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号\n 例如：node server.js 8848')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 开始 ************/
  console.log('server说：得到 HTTP 路径\n' + path)
  if(path == '/index'){
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write('<head><link rel="stylesheet" href="/style.css"></head><h5>你好<h5>\n')
    response.end()
  }else if(path == '/'){
    response.setHeader('Content-Type','text/html;charset=utf-8')
     /* Content-Type的作用
该实体头的作用是让服务器告诉浏览器它发送的数据属于什么文件类型。
例如：当Content-Type 的值设置为text/html和text/plain时,前者会让浏览器把接收到的实体内容以HTML格式解析,后者会让浏览器以普通文本解析.
	    使用utf-8解析中文*/
    response.write('<!DOCTYPE>\n<html>' +
      '<head><link rel="stylesheet" href="/style.css"></head><body>' +
      '<h1>我是//主页</h1>' + 
      '<script src="/main.js"></script>' +
      '</body></html>')
    response.end()    
  }else if(path == '/main.js'){
    response.setHeader('Content-Type','application/javascript; charset=utf-8')
    response.write('alert("这是JS的1122")')
    response.end()
  }else if(path == '/style.css'){
    response.setHeader('Content-Type','text/css;charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: green; }h5{color: blue;
    }')
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }
    
  console.log('server说：查询字符串为\n' + query)
  console.log('server说：不含查询字符串的路径为\n' + pathNoQuery)

  /******** 结束 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)