// var fs=require('fs');
// var express=require('express');
// var app=express();
// app.use(express.static(__dirname + '/static'));
// app.get('/', function(req,res) {
// data= fs.readFile('../html/busca_cliente.html',   function (err, data) {
// res.setHeader('Content-Type', 'text/html');
// res.send(data);
// });
// });
// app.listen(4000);


// var fs = require('fs');

// // fs.readFile('./package.json', 'utf-8', function (error, contents) {
// //     document.write(contents);
// // });

// app.get(
//   '/busca_cliente.html', function(req,res) {
//     data=fs.readFile('../html/busca_cliente.html',   function (err, data) {
//       res.setHeader('Content-Type', 'text/html');
//       res.send(data);
//     }
//   );
//   }
//   );
// // });

$(".area-inicial__btn").click(function() {
  window.location = "busca_cliente.html";
});