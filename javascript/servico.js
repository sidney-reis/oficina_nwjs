var fs = require('fs');
var servico = JSON.parse(fs.readFileSync('./json/servicos.json', 'utf8')).servicos[localStorage.getItem("servicoIndex")];

$("#headerServico").text(servico.nome);

$("#nome-p").text(servico.nome ? servico.nome : "Informação não registrada.");
$("#preco-p").text(servico.preco ? servico.preco : "Informação não registrada.");
$("#observacoes-p").text(servico.observacoes ? servico.observacoes : "Informação não registrada.");
$("#nome-input").val(servico.nome);
$("#preco-input").val(servico.preco);
$("#observacoes-input").val(servico.observacoes);

$("#back-servico").click(function(){
  window.location = "consulta_servicos.html";
});

$("#remove-servico-btn").click(function(){
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
  var servicosJSON = JSON.parse(fs.readFileSync('./json/servicos.json', 'utf8'));
  servicosJSON.servicos.splice(localStorage.getItem("servicoIndex"), 1);
  fs.writeFileSync("./json/servicos.json", JSON.stringify(servicosJSON), function(err) {
      if(err) {
          return console.log(err);
      }
  });
  window.location = "consulta_servicos.html";
});

$("#edit-servico-btn").click(function(){
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

  var servicosJSON = JSON.parse(fs.readFileSync('./json/servicos.json', 'utf8'));
  servicosJSON.servicos.splice(localStorage.getItem("servicoIndex"), 1);
  servicosJSON.servicos.push({
    "nome": $("#nome-input").val(),
    "preco": $("#preco-input").val(),
    "observacoes": $("#observacoes-input").val()
  });
  servicosJSON.servicos = servicosJSON.servicos.sort(function(a,b){
    if(a.nome == b.nome)
      return 0;
    var arr = [a.nome, b.nome];
    arr.sort();
    if(arr[0] == a.nome)
      return -1;
    return 1;
  });
  fs.writeFileSync("./json/servicos.json", JSON.stringify(servicosJSON), function(err) {
      if(err) {
          return console.log(err);
      }
  });
  servico = JSON.parse(fs.readFileSync('./json/servicos.json', 'utf8')).servicos.slice(-1)[0];
  $("#headerServico").text(servico.nome);
  $("#nome-p").text(servico.nome ? servico.nome : "Informação não registrada.");
  $("#preco-p").text(servico.preco ? servico.preco : "Informação não registrada.");
  $("#observacoes-p").text(servico.observacoes ? servico.observacoes : "Informação não registrada.");
});
