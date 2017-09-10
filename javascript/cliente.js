var fs = require('fs');
var cliente = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8')).clientes[localStorage.getItem("selectedClienteIndex")];

$("#headerCliente").text(cliente.nomeDoCliente);

$("#nome-cliente-p").text(cliente.nomeDoCliente ? cliente.nomeDoCliente : "Informação não registrada.");
$("#cpf-p").text(cliente.cpfDoCliente ? cliente.cpfDoCliente : "Informação não registrada.");
$("#telefone-p").text(cliente.telefoneDoCliente ? cliente.telefoneDoCliente : "Informação não registrada.");
$("#endereco-p").text(cliente.enderecoDoCliente ? cliente.enderecoDoCliente : "Informação não registrada.");
$("#placa-p").text(cliente.placaDoCarro ? cliente.placaDoCarro : "Informação não registrada.");
$("#modelo-p").text(cliente.modeloDoCarro ? cliente.modeloDoCarro : "Informação não registrada.");
$("#quilometragem-p").text(cliente.quilometragemDoCarro ? cliente.quilometragemDoCarro : "Informação não registrada.");
$("#ano-carro-p").text(cliente.anoDoCarro ? cliente.anoDoCarro : "Informação não registrada.");
$("#observacoes-p").text(cliente.observacoes ? cliente.observacoes : "Informação não registrada.");
$("#nome-cliente-input").val(cliente.nomeDoCliente);
$("#cpf-input").val(cliente.cpfDoCliente);
$("#telefone-input").val(cliente.telefoneDoCliente);
$("#endereco-input").val(cliente.enderecoDoCliente);
$("#placa-input").val(cliente.placaDoCarro);
$("#modelo-input").val(cliente.modeloDoCarro);
$("#quilometragem-input").val(cliente.quilometragemDoCarro);
$("#ano-carro-input").val(cliente.anoDoCarro);
$("#observacoes-input").val(cliente.observacoes);

$("#cpf-input").keypress(function (e) {
  // if the letter is not digit then display error and don't type anything
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
  }
});

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
    "cpfDoCliente": $("#cpf-input").val(),
    "telefoneDoCliente": $("#telefone-input").val(),
    "enderecoDoCliente": $("#endereco-input").val(),
    "placaDoCarro": $("#placa-input").val(),
    "modeloDoCarro": $("#modelo-input").val(),
    "quilometragemDoCarro": $("#quilometragem-input").val(),
    "anoDoCarro": $("#ano-carro-input").val(),
    "observacoes": $("#observacoes-input").val(),
    "orcamentos": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos,
    "ordens": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].ordens,
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
  $("#cpf-p").text(cliente.cpfDoCliente ? cliente.cpfDoCliente : "Informação não registrada.");
  $("#telefone-p").text(cliente.telefoneDoCliente ? cliente.telefoneDoCliente : "Informação não registrada.");
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
      var observacoesOficina = '';
      if(typeof cliente.servicos[i].observacoesOficina !== 'undefined') {
        observacoesOficina = cliente.servicos[i].observacoesOficina;
      }
      var numeroServico = '';
      if(typeof cliente.servicos[i].numeroServico !== 'undefined') {
        numeroServico = cliente.servicos[i].numeroServico;
      }
      var stringaoHTML =
        '<div class="servico-box">'+
          '<p class="error" servicoNumber='+i+'></p>'+
          '<h4 class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].data +'</h4>'+
          '<input class="data-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ cliente.servicos[i].data +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Serviço executado:</label>'+
          '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].servicoExecutado +'</p>'+
          '<input class="servico-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ cliente.servicos[i].servicoExecutado +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Número de identificação:</label>'+
          '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ numeroServico +'</p>'+
          '<input class="numero-servico-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ numeroServico +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Observações para a oficina:</label>'+
          '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ observacoesOficina +'</p>'+
          '<input class="observacoes-oficina-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ observacoesOficina +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Observações para o cliente:</label>'+
          '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].observacoes +'</p>'+
          '<input class="observacoes-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ cliente.servicos[i].observacoes +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Custo para a oficina:</label>'+
          '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].custo +'</p>'+
          '<input class="custo-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ cliente.servicos[i].custo +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Preço pago pelo cliente:</label>'+
          '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].preco +'</p>'+
          '<input class="preco-input edit-serv-field" servicoNumber='+i+' hidden type="text" value="'+ cliente.servicos[i].preco +'"><br  class="edit-serv-field" servicoNumber='+i+' hidden>'+
          '<label>Forma de pagamento:</label>'
      ;
      if(cliente.servicos[i].pagamento1=='debito') {
        stringaoHTML += '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].pagamento1 +'</p>';
        stringaoHTML += '<div class="col-xs-12 edit-serv-field" servicoNumber='+i+' hidden>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="dinheiro"> Dinheiro </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="credito"> Crédito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked value="debito"> Débito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="deposito"> Depósito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="outro"> Outro </input>'+
                        '</div><br class="edit-serv-field">';
        stringaoHTML += '<div class="edit-serv-field" servicoNumber='+i+' hidden>'+
                          '<label class="col-xs-12 pagamento2-texto " servicoNumber='+i+'></label>'+
                          '<div class="col-xs-12" style="margin-left: 15px; margin-bottom: 15px;"><input hidden class="col-xs-4 pagamento2-input" servicoNumber='+i+' value=""/></div>'+
                        '</div>';
      }
      else if(cliente.servicos[i].pagamento1=='dinheiro') {
        stringaoHTML += '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].pagamento1 +'</p>';
        stringaoHTML += '<div class="col-xs-12 edit-serv-field" servicoNumber='+i+' hidden>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked value="dinheiro"> Dinheiro </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="credito"> Crédito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="debito"> Débito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="deposito"> Depósito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="outro"> Outro </input>'+
                        '</div><br class="edit-serv-field">';
        stringaoHTML += '<div class="edit-serv-field" servicoNumber='+i+' hidden>'+
                          '<label class="col-xs-12 pagamento2-texto " servicoNumber='+i+'></label>'+
                          '<div class="col-xs-12" style="margin-left: 15px; margin-bottom: 15px;"><input hidden class="col-xs-4 pagamento2-input" servicoNumber='+i+' value=""/></div>'+
                        '</div>';
      }
      else if(cliente.servicos[i].pagamento1=='credito') {
        stringaoHTML += '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].pagamento1 +' em '+ cliente.servicos[i].pagamento2 +' vezes'+'</p>';
        stringaoHTML += '<div class="col-xs-12 edit-serv-field" servicoNumber='+i+' hidden>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="dinheiro"> Dinheiro </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked value="credito"> Crédito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="debito"> Débito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="deposito"> Depósito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="outro"> Outro </input>'+
                        '</div><br class="edit-serv-field">';
        stringaoHTML += '<div class="edit-serv-field" servicoNumber='+i+' hidden>'+
                          '<label class="col-xs-12 pagamento2-texto "  servicoNumber='+i+'>Quantas vezes:</label>'+
                          '<div class="col-xs-12" style="margin-left: 15px; margin-bottom: 15px;"><input class="col-xs-4 pagamento2-input" servicoNumber='+i+' value="'+ cliente.servicos[i].pagamento2 +'"/></div>'+
                        '</div>';
      }
      else if(cliente.servicos[i].pagamento1=='deposito') {
        stringaoHTML += '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].pagamento1 +' na conta '+ cliente.servicos[i].pagamento2 +'</p>';
        stringaoHTML += '<div class="col-xs-12 edit-serv-field" servicoNumber='+i+' hidden>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="dinheiro"> Dinheiro </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="credito"> Crédito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="debito"> Débito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked value="deposito"> Depósito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="outro"> Outro </input>'+
                        '</div><br class="edit-serv-field">';
        stringaoHTML += '<div class="edit-serv-field" servicoNumber='+i+' hidden>'+
                          '<label class="col-xs-12 pagamento2-texto "  servicoNumber='+i+'>Conta que foi depositado:</label>'+
                          '<div class="col-xs-12" style="margin-left: 15px; margin-bottom: 15px;"><input class="col-xs-4 pagamento2-input" servicoNumber='+i+' value="'+ cliente.servicos[i].pagamento2 +'"/></div>'+
                        '</div>';
      }
      else if(cliente.servicos[i].pagamento1=='outro') {
        stringaoHTML += '<p class="to-hide-on-edit-serv" servicoNumber='+i+'>'+ cliente.servicos[i].pagamento2 +'</p>';
        stringaoHTML += '<div class="col-xs-12 edit-serv-field" servicoNumber='+i+' hidden>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="dinheiro"> Dinheiro </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="credito"> Crédito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="debito"> Débito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="deposito"> Depósito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked value="outro"> Outro </input>'+
                        '</div><br class="edit-serv-field">';
        stringaoHTML += '<div class="edit-serv-field" servicoNumber='+i+' hidden>'+
                          '<label class="col-xs-12 pagamento2-texto" servicoNumber='+i+'>Qual método utilizado:</label>'+
                          '<div class="col-xs-12" style="margin-left: 15px; margin-bottom: 15px;"><input class="col-xs-4 pagamento2-input" servicoNumber='+i+' value="'+ cliente.servicos[i].pagamento2 +'"/></div>'+
                        '</div>';
      }
      else {
        stringaoHTML += '<div class="col-xs-12 edit-serv-field" servicoNumber='+i+' hidden>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="dinheiro"> Dinheiro </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="credito"> Crédito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="debito"> Débito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="deposito"> Depósito </input>'+
                            '<input name="forma-pagamento-'+i+'" class="forma-pagamento-input" servicoNumber='+i+' type="radio" style="margin-left: 15px; margin-bottom: 15px;" value="outro"> Outro </input>'+
                        '</div><br class="edit-serv-field">';
      }
      stringaoHTML += '<button class="printServico to-hide-on-edit-serv" servicoNumber='+i+' servicoNumber='+i+'>Imprimir serviço</button>';
      stringaoHTML += '<button class="editServico to-hide-on-edit-serv" servicoNumber='+i+' style="margin-left: 5px" servicoNumber='+i+'>Alterar serviço</button>';
      stringaoHTML += '<button class="saveServico edit-serv-field" hidden servicoNumber='+i+'>Salvar</button>';
      stringaoHTML += '<button class="cancelServico edit-serv-field" servicoNumber='+i+' hidden style="margin-left: 5px" servicoNumber='+i+'>Cancelar</button></div>';
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

$(".cancelServico").click(function() {
  var servicoPos = $(this).attr("servicoNumber");
  $(".to-hide-on-edit-serv[servicoNumber="+servicoPos+"]").show();
  $(".edit-serv-field[servicoNumber="+servicoPos+"]").hide();
  $(".error[servicoNumber="+servicoPos+"]").hide();
  location.reload();
});

var editando = false;

$(".editServico").click(function() {
  var servicoPos = $(this).attr("servicoNumber");
  if(!editando) {
    $(".to-hide-on-edit-serv[servicoNumber="+servicoPos+"]").hide();
    $(".edit-serv-field[servicoNumber="+servicoPos+"]").show();
    editando = true;
  } else {
    $(".error[servicoNumber="+servicoPos+"]").text("Você já está alterando outro serviço.");
    $(".error[servicoNumber="+servicoPos+"]").show();
    setTimeout(() => $(".error[servicoNumber="+servicoPos+"]").hide(), 5000)
  }
});

$(".saveServico").click(function() {
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
  var servicoPos = $(this).attr("servicoNumber");

  var existNumber = false;
  clientesJSON.clientes.forEach((cliente, index) => {
    for(orcamento in cliente.orcamentos) {
      if(cliente.orcamentos[orcamento].numeroOrcamento == $(".numero-servico-input[servicoNumber="+servicoPos+"]").val()) {
        existNumber = true;
        break;
      }
    }
    cliente.servicos.forEach( (servico, indexSer ) => {
      if( !(localStorage.getItem("selectedClienteIndex") == index && servicoPos == indexSer) ) {
        if(servico.numeroServico == $(".numero-servico-input[servicoNumber="+servicoPos+"]").val()) {
          existNumber = true;
          // break;
        }
      }
    });

    for(ordem in cliente.ordens) {
      if(cliente.ordens[ordem].numeroOrdem == $(".numero-servico-input[servicoNumber="+servicoPos+"]").val()) {
        existNumber = true;
        break;
      }
    }
  });

  if(existNumber && $(".numero-servico-input[servicoNumber="+servicoPos+"]").val().length) {
    $(".error[servicoNumber="+servicoPos+"]").text("Número de identificação informado já existe.");
    $(".error[servicoNumber="+servicoPos+"]").show();
  }

  else if($(".servico-input[servicoNumber="+servicoPos+"]").val().trim() == '') {
    $(".error[servicoNumber="+servicoPos+"]").text("Não foi possível adicionar serviço. O campo de serviço executado deve ser preenchido.");
    $(".error[servicoNumber="+servicoPos+"]").show();
  }

  else if(isNaN(parseFloat($(".custo-input[servicoNumber="+servicoPos+"]").val())) || isNaN(parseFloat($(".preco-input[servicoNumber="+servicoPos+"]").val()))) {
    $(".error[servicoNumber="+servicoPos+"]").text("Utilize apenas números e pontos nos campos de custo e preço. Pontos são utilizados para separar reais e centavos.");
    $(".error[servicoNumber="+servicoPos+"]").show();
  }

  else if($(".custo-input[servicoNumber="+servicoPos+"]").val().includes(",") || $(".preco-input[servicoNumber="+servicoPos+"]").val().includes(",")) {
    $(".error[servicoNumber="+servicoPos+"]").text("Não utilize vírgulas. Utilize pontos para separar reais e centavos.");
    $(".error[servicoNumber="+servicoPos+"]").show();
  }

  else if((($(".custo-input[servicoNumber="+servicoPos+"]").val().match(/\./g) || []).length > 1) || (($(".preco-input[servicoNumber="+servicoPos+"]").val().match(/\./g) || []).length > 1)) {
    $(".error[servicoNumber="+servicoPos+"]").text("Utilize apenas um ponto para separar reais e centavos.");
    $(".error[servicoNumber="+servicoPos+"]").show();
  }

  else {
    clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].servicos[servicoPos] = {
      "servicoExecutado": $(".servico-input[servicoNumber="+servicoPos+"]").val(),
      "numeroServico": $(".numero-servico-input[servicoNumber="+servicoPos+"]").val(),
      "data": $(".data-input[servicoNumber="+servicoPos+"]").val(),
      "observacoes": $(".observacoes-input[servicoNumber="+servicoPos+"]").val(),
      "observacoesOficina": $(".observacoes-oficina-input[servicoNumber="+servicoPos+"]").val(),
      "custo": $(".custo-input[servicoNumber="+servicoPos+"]").val(),
      "preco": $(".preco-input[servicoNumber="+servicoPos+"]").val(),
      "pagamento1": $(".forma-pagamento-input[servicoNumber="+servicoPos+"]:checked").val(),
      "pagamento2": $(".pagamento2-input[servicoNumber="+servicoPos+"]").val()
    };

    fs.writeFileSync("./json/clientes.json", JSON.stringify(clientesJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    $(".to-hide-on-edit-serv[servicoNumber="+servicoPos+"]").show();
    $(".edit-serv-field[servicoNumber="+servicoPos+"]").hide();
    location.reload();
  }
});

$(".forma-pagamento-input").click(function() {
  var servicoPos = $(this).attr("servicoNumber");
  if(this.value == "dinheiro") {
    $(".pagamento2-input[servicoNumber="+servicoPos+"]").hide();
    $(".pagamento2-texto[servicoNumber="+servicoPos+"]").empty();
  }
  else if(this.value == "debito") {
    $(".pagamento2-input[servicoNumber="+servicoPos+"]").hide();
    $(".pagamento2-texto[servicoNumber="+servicoPos+"]").empty();
  }
  else if(this.value == "credito") {
    $(".pagamento2-input[servicoNumber="+servicoPos+"]").show();
    $(".pagamento2-texto[servicoNumber="+servicoPos+"]").text("Quantas vezes:");
  }
  else if(this.value == "deposito") {
    $(".pagamento2-input[servicoNumber="+servicoPos+"]").show();
    $(".pagamento2-texto[servicoNumber="+servicoPos+"]").text("Conta que foi depositado:");
  }
  else if(this.value == "outro") {
    $(".pagamento2-input[servicoNumber="+servicoPos+"]").show();
    $(".pagamento2-texto[servicoNumber="+servicoPos+"]").text("Qual método utilizado:");
  }
});

$(".printServico").click(function() {
  $("#main-container").hide();
  var servicoPos = $(this).attr("servicoNumber");
  var cpf = '';
  var tel = '';
  if(typeof cliente.cpfDoCliente !== 'undefined') {
    cpf = cliente.cpfDoCliente;
  }
  if(typeof cliente.telefoneDoCliente !== 'undefined') {
    tel = cliente.telefoneDoCliente;
  }

  var numeroServico = '';
  if(typeof cliente.servicos[servicoPos].numeroServico !== 'undefined') {
    numeroServico = cliente.servicos[servicoPos].numeroServico;
  }

  var html =
    '<div id="servico-print-box">'+
      '<img class="center top30 bottom30" src="../mainlogo.png" alt="Advance Air Service" width="291" height="71" />'+
      '<fieldset class="col-xs-3" style="border: 3px black solid; margin-right:30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">DATA</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-12" style="text-align: center; margin-bottom: 20px"><h4>'+ cliente.servicos[servicoPos].data +'</h4></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-5" style="border: 3px black solid; margin-right:30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">EMPRESA</legend>'+
        '<div style="text-align: center; margin: 5px">'+
          '<div class="col-xs-12"><p>'+ 'Av. Flores da Cunha, 151 - Cachoeirinha RS' +'</p></div>'+
          '<div class="col-xs-12"><p>'+ 'Telefone: 3471.4077' +'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-3" style="border: 3px black solid">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">SERVIÇO</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-12" style="text-align: center; margin-bottom: 20px"><h4> ID: '+ numeroServico +'</h4></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">DADOS DO CLIENTE</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-6"><p>Nome: '+cliente.nomeDoCliente+'</p></div>'+
          '<div class="col-xs-6"><p>Telefone: '+tel+'</p></div>'+
          '<div class="col-xs-6"><p>CPF ou CNPJ: '+cpf+'</p></div>'+
          '<div class="col-xs-6"><p>Endereço: '+cliente.enderecoDoCliente+'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">DADOS DO CARRO</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-6"><p>Modelo: '+cliente.modeloDoCarro+'</p></div>'+
          '<div class="col-xs-6"><p>Ano do carro: '+cliente.anoDoCarro+'</p></div>'+
          '<div class="col-xs-6"><p>Quilometragem: '+cliente.quilometragemDoCarro+'</p></div>'+
          '<div class="col-xs-6"><p>Placa do carro: '+cliente.placaDoCarro+'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">SERVIÇO PRESTADO</legend>'+
        '<div style="margin: 5px;">'+
        '<div class="col-xs-12"><p>'+ cliente.servicos[servicoPos].servicoExecutado +'</p></div>'+
        '<div class="col-xs-12"><p>Preço: '+ cliente.servicos[servicoPos].preco +'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">FORMA DE PAGAMENTO</legend>'+
        '<div style="margin: 5px">';
        
 if(cliente.servicos[servicoPos].pagamento1=='debito') {
    html += '<div class="col-xs-12">'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Dinheiro </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Crédito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked="checked"> Débito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Depósito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Outro </input>'+
          '</div>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='dinheiro') {
    html += '<div class="col-xs-12">'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked="checked"> Dinheiro </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Crédito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Débito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Depósito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Outro </input>'+
          '</div>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='credito') {
    html += '<div class="col-xs-12">'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Dinheiro </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked="checked"> Crédito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Débito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Depósito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Outro </input>'+
          '</div>'+
          '<div class="col-xs-12">'+
              '<p>Número de vezes: '+ cliente.servicos[servicoPos].pagamento2 +'</p>'+
          '</div>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='deposito') {
    html += '<div class="col-xs-12">'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Dinheiro </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Crédito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Débito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked="checked"> Depósito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Outro </input>'+
          '</div>'+
          '<div class="col-xs-12">'+
              '<p>Conta que foi depositado: '+ cliente.servicos[servicoPos].pagamento2 +'</p>'+
          '</div>';
  }
  else if(cliente.servicos[servicoPos].pagamento1=='outro') {
    html += '<div class="col-xs-12">'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Dinheiro </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Crédito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Débito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;"> Depósito </input>'+
              '<input disabled type="radio" style="margin-left: 15px; margin-bottom: 15px;" checked="checked"> Outro </input>'+
          '</div>'+
          '<div class="col-xs-12">'+
              '<p>Método utilizado: '+ cliente.servicos[servicoPos].pagamento2 +'</p>'+
          '</div>';
  }
  html += '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">OBSERVAÇÃO</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-12"><p>'+ cliente.servicos[servicoPos].observacoes +'</p></div>'
        '</div>'+
      "</fieldset>";
      
  $("#the-body").append(html);
  window.print();
  $("#servico-print-box").remove();
  $("#main-container").show();

});

// ordens:

if(typeof cliente.ordens !== 'undefined') {
  if(cliente.ordens.length) {
    for(var i = 0; i < cliente.ordens.length; i++) {
      var numeroOrdem = '';
      if(typeof cliente.ordens[i].numeroOrdem !== 'undefined') {
        numeroOrdem = cliente.ordens[i].numeroOrdem;
      }
      var stringaoHTML2 =
        '<div class="ordem-box">'+
          '<h4>'+ cliente.ordens[i].data +'</h4>'+
          '<label>Nome:</label>'+
          '<p>'+ cliente.ordens[i].nome +'</p>'+
          '<label>Número de identificação:</label>'+
          '<p>'+ numeroOrdem +'</p>'+
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
  if(cliente.orcamentos.length) {
    for(var j = 0; j < cliente.orcamentos.length; j++) {
      var numeroOrcamento = '';
      if(typeof cliente.orcamentos[j].numeroOrcamento !== 'undefined') {
        numeroOrcamento = cliente.orcamentos[j].numeroOrcamento;
      }
      var stringaoHTML2 =
        '<div class="orcamento-box">'+
          '<h4>'+ cliente.orcamentos[j].data +'</h4>'+
          '<label>Nome:</label>'+
          '<p>'+ cliente.orcamentos[j].nome +'</p>'+
          '<label>Número de identificação:</label>'+
          '<p>'+ cliente.orcamentos[j].numeroOrcamento +'</p>'+
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
    "numeroOrdem": clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos[orcamentoPos].numeroOrcamento ,
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
  var numeroOrcamento = '';
  var cpf = '';
  var tel = '';
  if(typeof cliente.cpfDoCliente !== 'undefined') {
    cpf = cliente.cpfDoCliente;
  }
  if(typeof cliente.telefoneDoCliente !== 'undefined') {
    tel = cliente.telefoneDoCliente;
  }
  if(typeof cliente.orcamentos[orcamentoPos].numeroOrcamento !== 'undefined') {
    numeroOrcamento = cliente.orcamentos[orcamentoPos].numeroOrcamento;
  }
  var html =
    '<div id="orcamento-print-box">'+
      '<img class="center top30 bottom30" src="../mainlogo.png" alt="Advance Air Service" width="291" height="71" />'+
      // '<p class="center top10 bottom0" style="font-size:11px; text-align:center;">Av. Frederico Ritter 1455 - Cachoeirinha RS</p>'+
      // '<p class="center top0 bottom30" style="font-size:11px; text-align:center;"> Telefone: 3471.4077</p>'+
      '<fieldset class="col-xs-3" style="border: 3px black solid; margin-right:30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">DATA</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-12" style="text-align: center; margin-bottom: 20px"><h4>'+ cliente.orcamentos[orcamentoPos].data +'</h4></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-5" style="border: 3px black solid; margin-right:30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">EMPRESA</legend>'+
        '<div style="text-align: center; margin: 5px">'+
          '<div class="col-xs-12"><p>'+ 'Av. Flores da Cunha, 151 - Cachoeirinha RS' +'</p></div>'+
          '<div class="col-xs-12"><p>'+ 'Telefone: 3471.4077' +'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-3" style="border: 3px black solid">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">ORÇAMENTO</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-12" style="text-align: center; margin-bottom: 20px"><h4> ID: '+ numeroOrcamento +'</h4></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">DADOS DO CLIENTE</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-6"><p>Nome: '+cliente.nomeDoCliente+'</p></div>'+
          '<div class="col-xs-6"><p>Telefone: '+tel+'</p></div>'+
          '<div class="col-xs-6"><p>CPF ou CNPJ: '+cpf+'</p></div>'+
          '<div class="col-xs-6"><p>Endereço: '+cliente.enderecoDoCliente+'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">DADOS DO CARRO</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-6"><p>Modelo: '+cliente.modeloDoCarro+'</p></div>'+
          '<div class="col-xs-6"><p>Ano do carro: '+cliente.anoDoCarro+'</p></div>'+
          '<div class="col-xs-6"><p>Quilometragem: '+cliente.quilometragemDoCarro+'</p></div>'+
          '<div class="col-xs-6"><p>Placa do carro: '+cliente.placaDoCarro+'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">ORÇAMENTO</legend>'+
        '<div style="margin: 5px;">'+
        // '<h4>'+ cliente.orcamentos[orcamentoPos].data +'</h4>'+
        '<div class="col-xs-12"><p>'+ cliente.orcamentos[orcamentoPos].nome +'</p></div>'+
        // '<label>Número de identificação:</label>'+
        // '<p>'+ numeroOrcamento +'</p>'+
        // '<label>Observações:</label>'+
        // '<p>'+ cliente.orcamentos[orcamentoPos].observacoes +'</p>'+
        '<div class="col-xs-12"><p>Preço: '+ cliente.orcamentos[orcamentoPos].preco +'</p></div>'+
        '</div>'+
      '</fieldset>'+
      '<fieldset class="col-xs-12" style="border: 3px black solid; margin-top: 30px">'+
        '<legend style="margin-left: 10px; padding: 0 5px; width: auto; border: 0; margin-bottom: 0; background-color: white !important; -webkit-print-color-adjust: exact">OBSERVAÇÃO</legend>'+
        '<div style="margin: 5px">'+
          '<div class="col-xs-12"><p>'+ cliente.orcamentos[orcamentoPos].observacoes +'</p></div>'
        '</div>'+
      "</fieldset>";

  $("#the-body").append(html);
  setTimeout(() => {
    window.print();
      $("#orcamento-print-box").remove();
      $("#main-container").show();
  },250);
});

