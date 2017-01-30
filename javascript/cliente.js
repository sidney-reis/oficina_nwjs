var fs = require('fs');
var cliente = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8')).clientes[localStorage.getItem("selectedClienteIndex")];

$("#headerCliente").text(cliente.nomeDoCliente);

$("#nome-cliente-p").text(cliente.nomeDoCliente ? cliente.nomeDoCliente : "Informação não registrada.");
$("#endereco-p").text(cliente.enderecoDoCliente ? cliente.enderecoDoCliente : "Informação não registrada.");
$("#placa-p").text(cliente.placaDoCarro ? cliente.placaDoCarro : "Informação não registrada.");
$("#modelo-p").text(cliente.modeloDoCarro ? cliente.modeloDoCarro : "Informação não registrada.");
$("#quilometragem-p").text(cliente.quilometragemDoCarro ? cliente.quilometragemDoCarro : "Informação não registrada.");
$("#ano-carro-p").text(cliente.anoDoCarro ? cliente.anoDoCarro : "Informação não registrada.");
$("#observacoes-p").text(cliente.observacoes ? cliente.observacoes : "Informação não registrada.");
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
  $("#headerCliente").text(cliente.nomeDoCliente);
  $("#nome-cliente-p").text(cliente.nomeDoCliente ? cliente.nomeDoCliente : "Informação não registrada.");
  $("#endereco-p").text(cliente.enderecoDoCliente ? cliente.enderecoDoCliente : "Informação não registrada.");
  $("#placa-p").text(cliente.placaDoCarro ? cliente.placaDoCarro : "Informação não registrada.");
  $("#modelo-p").text(cliente.modeloDoCarro ? cliente.modeloDoCarro : "Informação não registrada.");
  $("#quilometragem-p").text(cliente.quilometragemDoCarro ? cliente.quilometragemDoCarro : "Informação não registrada.");
  $("#ano-carro-p").text(cliente.anoDoCarro ? cliente.anoDoCarro : "Informação não registrada.");
  $("#observacoes-p").text(cliente.observacoes ? cliente.observacoes : "Informação não registrada.");
});

$('#add-servico').click(function() {
  window.location = "novo_servico.html";
});

for(var i = 0; i < cliente.servicos.length; i++) {
  if(cliente.servicos[i].pagamento1=='dinheiro' || cliente.servicos[i].pagamento1=='debito') {
    $("#lista-servicos").append(
        '<div class="servico-box">'+
          '<h4>'+ cliente.servicos[i].data +'</h4>'+
          '<label>Serviço executado:</label>'+
          '<p>'+ cliente.servicos[i].servicoExecutado +'</p>'+
          '<label>Observações:</label>'+
          '<p>'+ cliente.servicos[i].observacoes +'</p>'+
          '<label>Preço:</label>'+
          '<p>'+ cliente.servicos[i].preco +'</p>'+
          '<label>Forma de pagamento:</label>'+
          '<p>'+ cliente.servicos[i].pagamento1 +'</p>'+
        '</div>'
      );
  }
  else if(cliente.servicos[i].pagamento1=='credito') {
    $("#lista-servicos").append(
        '<div class="servico-box">'+
          '<h4>'+ cliente.servicos[i].data +'</h4>'+
          '<label>Serviço executado:</label>'+
          '<p>'+ cliente.servicos[i].servicoExecutado +'</p>'+
          '<label>Observações:</label>'+
          '<p>'+ cliente.servicos[i].observacoes +'</p>'+
          '<label>Preço:</label>'+
          '<p>'+ cliente.servicos[i].preco +'</p>'+
          '<label>Forma de pagamento:</label>'+
          '<p>'+ cliente.servicos[i].pagamento1 +' em '+ cliente.servicos[i].pagamento2 +' vezes'+'</p>'+
        '</div>'
      );
  }
  else if(cliente.servicos[i].pagamento1=='deposito') {
    $("#lista-servicos").append(
        '<div class="servico-box">'+
          '<h4>'+ cliente.servicos[i].data +'</h4>'+
          '<label>Serviço executado:</label>'+
          '<p>'+ cliente.servicos[i].servicoExecutado +'</p>'+
          '<label>Observações:</label>'+
          '<p>'+ cliente.servicos[i].observacoes +'</p>'+
          '<label>Preço:</label>'+
          '<p>'+ cliente.servicos[i].preco +'</p>'+
          '<label>Forma de pagamento:</label>'+
          '<p>'+ cliente.servicos[i].pagamento1 +' na conta '+ cliente.servicos[i].pagamento2 +'</p>'+
        '</div>'
      );
  }
  else if(cliente.servicos[i].pagamento1=='outro') {
    $("#lista-servicos").append(
        '<div class="servico-box">'+
          '<h4>'+ cliente.servicos[i].data +'</h4>'+
          '<label>Serviço executado:</label>'+
          '<p>'+ cliente.servicos[i].servicoExecutado +'</p>'+
          '<label>Observações:</label>'+
          '<p>'+ cliente.servicos[i].observacoes +'</p>'+
          '<label>Preço:</label>'+
          '<p>'+ cliente.servicos[i].preco +'</p>'+
          '<label>Forma de pagamento:</label>'+
          '<p>'+ cliente.servicos[i].pagamento2 +'</p>'+
        '</div>'
      );
  }
}