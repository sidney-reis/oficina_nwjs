var fs = require('fs');
var item = JSON.parse(fs.readFileSync('./json/estoque.json', 'utf8')).itens[localStorage.getItem("selectedItemIndex")];

$("#headerItem").text(item.nome);

$("#nome-p").text(item.nome ? item.nome : "Informação não registrada.");
$("#quantidade-p").text(item.quantidade ? item.quantidade : "Informação não registrada.");
$("#preco-p").text(item.preco ? item.preco : "Informação não registrada.");
$("#nome-input").val(item.nome);
$("#quantidade-input").val(item.quantidade);
$("#preco-input").val(item.preco);

$("#back-item").click(function(){
  window.location = "estoque.html";
});

$("#remove-item-btn").click(function(){
  $(".button-1").hide();
  $(".remove-confirmation").show();
  $(".button-disable").attr("disabled", true);
});

$("#cancel-remove").click(function(){
  $(".remove-confirmation").hide();
  $(".button-1").show();
  $(".button-disable").removeAttr("disabled");
});

$("#confirm-remove").click(function(){
  var estoqueJSON = JSON.parse(fs.readFileSync('./json/estoque.json', 'utf8'));
  estoqueJSON.itens.splice(localStorage.getItem("selectedItemIndex"), 1);
  fs.writeFileSync("./json/estoque.json", JSON.stringify(estoqueJSON), function(err) {
      if(err) {
          return console.log(err);
      }
  });
  window.location = "estoque.html";
});

$("#edit-item-btn").click(function(){
  $(".inputs").show();
  $(".ps").hide();
  $(".button-disable").attr("disabled", true);
});

$("#cancel-edit-btn").click(function(){
  $(".inputs").hide();
  $(".ps").show();
  $(".button-disable").removeAttr("disabled");
});

$("#save-edit-btn").click(function(){
  $(".inputs").hide();
  $(".ps").show();
  $(".button-disable").removeAttr("disabled");

  var estoqueJSON = JSON.parse(fs.readFileSync('./json/estoque.json', 'utf8'));
  estoqueJSON.itens.splice(localStorage.getItem("selectedItemIndex"), 1);
  estoqueJSON.itens.push({
    "nome": $("#nome-input").val(),
    "quantidade": $("#quantidade-input").val(),
    "preco": $("#preco-input").val()
  });
  fs.writeFileSync("./json/estoque.json", JSON.stringify(estoqueJSON), function(err) {
      if(err) {
          return console.log(err);
      }
  });
  item = JSON.parse(fs.readFileSync('./json/estoque.json', 'utf8')).itens.slice(-1)[0];
  $("#headerItem").text(item.nome);
  $("#nome-p").text(item.nome ? item.nome : "Informação não registrada.");
  $("#quantidade-p").text(item.quantidade ? item.quantidade : "Informação não registrada.");
  $("#preco-p").text(item.preco ? item.preco : "Informação não registrada.");
});
