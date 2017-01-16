var fs = require('fs');
var cliente = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8')).clientes[localStorage.getItem("selectedClienteIndex")];

$("#headerCliente").text(cliente.nomeDoCliente);

$("#nome-cliente-p").text(cliente.nomeDoCliente);
$("#endereco-p").text(cliente.enderecoDoCliente);
$("#placa-p").text(cliente.placaDoCarro);
$("#modelo-p").text(cliente.modeloDoCarro);
$("#quilometragem-p").text(cliente.quilometragemDoCarro);
$("#ano-carro-p").text(cliente.anoDoCarro);
$("#observacoes-p").text(cliente.observacoes);
$("#nome-cliente-input").val(cliente.nomeDoCliente);
$("#endereco-input").val(cliente.enderecoDoCliente);
$("#placa-input").val(cliente.placaDoCarro);
$("#modelo-input").val(cliente.modeloDoCarro);
$("#quilometragem-input").val(cliente.quilometragemDoCarro);
$("#ano-carro-input").val(cliente.anoDoCarro);
$("#observacoes-input").val(cliente.observacoes);

$("#back-cliente").click(function(){
  window.location = "busca_cliente.html";
});

$("#edit-cliente-btn").click(function(){
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

  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
  clientesJSON.clientes.splice(localStorage.getItem("selectedClienteIndex"), 1);
  clientesJSON.clientes.push({
    "nomeDoCliente": $("#nome-cliente-input").val(),
    "enderecoDoCliente": $("#endereco-input").val(),
    "placaDoCarro": $("#placa-input").val(),
    "modeloDoCarro": $("#modelo-input").val(),
    "quilometragemDoCarro": $("#quilometragem-input").val(),
    "anoDoCarro": $("#ano-carro-input").val(),
    "observacoes": $("#observacoes-input").val(),
    "dataUltimoServico": "",
    "serviçoExecutado": "",
    "servicos": []
  });
  fs.writeFileSync("./json/clientes.json", JSON.stringify(clientesJSON), function(err) {
      if(err) {
          return console.log(err);
      }
  });
  cliente = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8')).clientes.slice(-1)[0];
  $("#nome-cliente-p").text(cliente.nomeDoCliente);
  $("#endereco-p").text(cliente.enderecoDoCliente);
  $("#placa-p").text(cliente.placaDoCarro);
  $("#modelo-p").text(cliente.modeloDoCarro);
  $("#quilometragem-p").text(cliente.quilometragemDoCarro);
  $("#ano-carro-p").text(cliente.anoDoCarro);
  $("#observacoes-p").text(cliente.observacoes);
});