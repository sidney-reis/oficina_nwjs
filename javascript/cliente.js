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

if(typeof cliente.servicos !== 'undefined') {
  if(cliente.servicos.length) {
    for(var i = 0; i < cliente.servicos.length; i++) {
      var stringaoHTML =
        '<div class="servico-box">'+
          '<h4>'+ cliente.servicos[i].data +'</h4>'+
          '<label>Serviço executado:</label>'+
          '<p>'+ cliente.servicos[i].servicoExecutado +'</p>'+
          '<label>Observações para a oficina:</label>'+
          '<p>'+ cliente.servicos[i].observacoesOficina +'</p>'+
          '<label>Observações para o cliente:</label>'+
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
  }
  else {
    $("#servico-nenhum").show();
  }
}
else {
  $("#servico-nenhum").show();
}

$(".printServico").click(function() {
  $("#main-container").hide();
  var servicoPos = $(this).attr("servicoNumber");
  var html =
    '<div id="servico-print-box">'+
      '<img class="center top30 bottom30" src="../mainlogo.png" alt="Advance Air Service" width="291" height="71" />'+
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

// ordens:

if(typeof cliente.ordens !== 'undefined') {
  if(cliente.ordens.length) {
    for(var i = 0; i < cliente.ordens.length; i++) {
      var stringaoHTML2 =
        '<div class="ordem-box">'+
          '<h4>'+ cliente.ordens[i].data +'</h4>'+
          '<label>Nome:</label>'+
          '<p>'+ cliente.ordens[i].nome +'</p>'+
          '<label>Observações:</label>'+
          '<p>'+ cliente.ordens[i].observacoes +'</p>'+
          '<label>Preço:</label>'+
          '<p>'+ cliente.ordens[i].preco +'</p>'
      ;
      stringaoHTML2 += '<button class="transformServico" ordemNumber='+i+'>Transformar em Serviço Prestado</button>';
      stringaoHTML2 += '<p class="transCerteza2 transConf2" ordemNumber='+i+' hidden>Tem certeza que deseja fazer isso?</p>';
      stringaoHTML2 += '<button class="transSim2 transConf2" ordemNumber='+i+' hidden>Confirmar</button>';
      stringaoHTML2 += '<button class="transNao2 transConf2" ordemNumber='+i+' hidden>Cancelar</button></div>';
      $("#lista-ordens").append(stringaoHTML2);
    }
  }
  else {
    $("#ordens-nenhum").show();
  }
}
else {
  $("#ordens-nenhum").show();
}

$(".transformServico").click(function() {
  var ordemPos = $(this).attr("ordemNumber");
  $(".transConf2[ordemNumber="+ordemPos+"]").show();
});

$(".transNao2").click(function() {
  var ordemPos = $(this).attr("ordemNumber");
  $(".transConf2[ordemNumber="+ordemPos+"]").hide();
});

$(".transSim2").click(function() {
  var ordemPos = $(this).attr("ordemNumber");
  localStorage.setItem("selectOrdemNumber", ordemPos);
  window.location = "novo_servico_ordem.html";
});

// orcamento:

$('#add-orcamento').click(function() {
  window.location = "novo_orcamento.html";
});

if(typeof cliente.orcamentos !== 'undefined') {
  console.log("1");
  if(cliente.orcamentos.length) {
    console.log("2");
    for(var j = 0; j < cliente.orcamentos.length; j++) {
      console.log("3");
      var stringaoHTML2 =
        '<div class="orcamento-box">'+
          '<h4>'+ cliente.orcamentos[j].data +'</h4>'+
          '<label>Nome:</label>'+
          '<p>'+ cliente.orcamentos[j].nome +'</p>'+
          '<label>Observações:</label>'+
          '<p>'+ cliente.orcamentos[j].observacoes +'</p>'+
          '<label>Preço:</label>'+
          '<p>'+ cliente.orcamentos[j].preco +'</p>'
      ;
      stringaoHTML2 += '<button class="printOrcamento" orcamentoNumber='+j+'>Imprimir orçamento</button>';
      stringaoHTML2 += '<button class="transformOrdem" orcamentoNumber='+j+'>Transformar em Ordem de Serviço</button>';
      stringaoHTML2 += '<p class="transCerteza transConf" orcamentoNumber='+j+' hidden>Tem certeza que deseja fazer isso?</p>';
      stringaoHTML2 += '<button class="transSim transConf" orcamentoNumber='+j+' hidden>Confirmar</button>';
      stringaoHTML2 += '<button class="transNao transConf" orcamentoNumber='+j+' hidden>Cancelar</button></div>';
      $("#lista-orcamentos").append(stringaoHTML2);
    }
  }
  else {
    $("#orcamento-nenhum").show();
  }
}
else {
  $("#orcamento-nenhum").show();
}

$(".transformOrdem").click(function() {
  var orcamentoPos = $(this).attr("orcamentoNumber");
  $(".transConf[orcamentoNumber="+orcamentoPos+"]").show();
});

$(".transNao").click(function() {
  var orcamentoPos = $(this).attr("orcamentoNumber");
  $(".transConf[orcamentoNumber="+orcamentoPos+"]").hide();
});

$(".transSim").click(function() {
  var orcamentoPos = $(this).attr("orcamentoNumber");
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));

  clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].ordens.push({
    "nome": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos[orcamentoPos].nome ,
    "data": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos[orcamentoPos].data ,
    "observacoes": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos[orcamentoPos].observacoes ,
    "preco": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos[orcamentoPos].preco
  });

  clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos.splice(orcamentoPos, 1);

  fs.writeFileSync("./json/clientes.json", JSON.stringify(clientesJSON), function(err) {
      if(err) {
          return console.log(err);
      }
  });
  location.reload();
});

$(".printOrcamento").click(function() {
  $("#main-container").hide();
  var orcamentoPos = $(this).attr("orcamentoNumber");
  var html =
    '<div id="orcamento-print-box">'+
      '<img class="center top30 bottom30" src="../mainlogo.png" alt="Advance Air Service" width="291" height="71" />'+
      '<h2>Dados do cliente:</h2>'+
      '<label>Nome:</label><p>'+cliente.nomeDoCliente+'</p>'+
      '<label>Endereço:</label><p>'+cliente.enderecoDoCliente+'</p>'+
      '<label>Placa do carro:</label><p>'+cliente.placaDoCarro+'</p>'+
      '<label>Modelo:</label><p>'+cliente.modeloDoCarro+'</p>'+
      '<label>Quilometragem:</label><p>'+cliente.quilometragemDoCarro+'</p>'+
      '<label>Ano do carro:</label><p>'+cliente.anoDoCarro+'</p>'+
      '<h2>Dados do orçamento:</h2>'+
      '<h4>'+ cliente.orcamentos[orcamentoPos].data +'</h4>'+
      '<label>Nome:</label>'+
      '<p>'+ cliente.orcamentos[orcamentoPos].nome +'</p>'+
      '<label>Observações:</label>'+
      '<p>'+ cliente.orcamentos[orcamentoPos].observacoes +'</p>'+
      '<label>Preço:</label>'+
      '<p>'+ cliente.orcamentos[orcamentoPos].preco +'</p>';

  $("#the-body").append(html);
  window.print();
  $("#orcamento-print-box").remove();
  $("#main-container").show();
});

