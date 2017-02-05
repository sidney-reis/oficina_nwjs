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
  clientesJSON.clientes.push({
    "nomeDoCliente": $("#nome-cliente-input").val(),
    "enderecoDoCliente": $("#endereco-input").val(),
    "placaDoCarro": $("#placa-input").val(),
    "modeloDoCarro": $("#modelo-input").val(),
    "quilometragemDoCarro": $("#quilometragem-input").val(),
    "anoDoCarro": $("#ano-carro-input").val(),
    "observacoes": $("#observacoes-input").val(),
    "servicos": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].servicos
  });
  clientesJSON.clientes.splice(localStorage.getItem("selectedClienteIndex"), 1);
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
  var stringaoHTML =
    '<div class="servico-box">'+
      '<h4>'+ cliente.servicos[i].data +'</h4>'+
      '<label>Serviço executado:</label>'+
      '<p>'+ cliente.servicos[i].servicoExecutado +'</p>'+
      '<label>Observações:</label>'+
      '<p>'+ cliente.servicos[i].observacoes +'</p>'+
      '<label>Custo para a oficina:</label>'+
      '<p>'+ cliente.servicos[i].custo +'</p>'+
      '<label>Preço pago pelo cliente:</label>'+
      '<p>'+ cliente.servicos[i].preco +'</p>'+
      '<label>Forma de pagamento:</label>'
  ;
  if(cliente.servicos[i].pagamento1=='dinheiro' || cliente.servicos[i].pagamento1=='debito') {
    stringaoHTML += '<p>'+ cliente.servicos[i].pagamento1 +'</p>';
  }
  else if(cliente.servicos[i].pagamento1=='credito') {
    stringaoHTML += '<p>'+ cliente.servicos[i].pagamento1 +' em '+ cliente.servicos[i].pagamento2 +' vezes'+'</p>';
  }
  else if(cliente.servicos[i].pagamento1=='deposito') {
    stringaoHTML += '<p>'+ cliente.servicos[i].pagamento1 +' na conta '+ cliente.servicos[i].pagamento2 +'</p>';
  }
  else if(cliente.servicos[i].pagamento1=='outro') {
    stringaoHTML += '<p>'+ cliente.servicos[i].pagamento2 +'</p>';
  }
  stringaoHTML += '<button class="printServico" servicoNumber='+i+'>Imprimir serviço</button></div>'
  $("#lista-servicos").append(stringaoHTML);
}

$(".printServico").click(function() {
  $("#main-container").hide();
  var servicoPos = $(this).attr("servicoNumber");
  var html =
    '<div id="servico-print-box">'+
      '<img src="../logo.png" alt="Advance Air Service" style:"width: 304px;height:228px;"/>'+
      '<h2>Dados do cliente:</h2>'+
      '<label>Nome:</label><p>'+cliente.nomeDoCliente+'</p>'+
      '<label>Endereço:</label><p>'+cliente.enderecoDoCliente+'</p>'+
      '<label>Placa do carro:</label><p>'+cliente.placaDoCarro+'</p>'+
      '<label>Modelo:</label><p>'+cliente.modeloDoCarro+'</p>'+
      '<label>Quilometragem:</label><p>'+cliente.quilometragemDoCarro+'</p>'+
      '<label>Ano do carro:</label><p>'+cliente.anoDoCarro+'</p>'+
      '<h2>Dados do serviço:</h2>'+
      '<h4>'+ cliente.servicos[servicoPos].data +'</h4>'+
      '<label>Serviço executado:</label>'+
      '<p>'+ cliente.servicos[servicoPos].servicoExecutado +'</p>'+
      '<label>Observações:</label>'+
      '<p>'+ cliente.servicos[servicoPos].observacoes +'</p>'+
      '<label>Custo para a oficina:</label>'+
      '<p>'+ cliente.servicos[servicoPos].custo +'</p>'+
      '<label>Preço pago pelo cliente:</label>'+
      '<p>'+ cliente.servicos[servicoPos].preco +'</p>'+
      '<label>Forma de pagamento:</label>';

  if(cliente.servicos[servicoPos].pagamento1=='dinheiro' || cliente.servicos[servicoPos].pagamento1=='debito') {
    html += '<p>'+ cliente.servicos[servicoPos].pagamento1 +'</p></div></body>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='credito') {
    html += '<p>'+ cliente.servicos[servicoPos].pagamento1 +' em '+ cliente.servicos[servicoPos].pagamento2 +' vezes'+'</p></div></body>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='deposito') {
    html += '<p>'+ cliente.servicos[servicoPos].pagamento1 +' na conta '+ cliente.servicos[servicoPos].pagamento2 +'</p></div></body>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='outro') {
    html += '<p>'+ cliente.servicos[servicoPos].pagamento2 +'</p></div></body>';
  }

  $("#the-body").append(html);
  window.print();
  $("#servico-print-box").remove();
  $("#main-container").show();

});
