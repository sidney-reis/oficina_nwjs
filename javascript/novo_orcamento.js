$("#back-cliente").click(function() {
  window.location = "cliente.html";
});

$("#data-input").mask("99/99/9999",{placeholder:"dd/mm/aaaa"});

$("#novo-orcamento-form").submit(function() {
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));

  var existNumber = false;
  for(cliente in clientesJSON.clientes) {
    for(orcamento in clientesJSON.clientes[cliente].orcamentos) {
      if(clientesJSON.clientes[cliente].orcamentos[orcamento].numeroOrcamento == $("#numero-input").val()) {
        existNumber = true;
        break;
      }
    }
    for(servico in clientesJSON.clientes[cliente].servicos) {
      if(clientesJSON.clientes[cliente].servicos[servico].numeroServico == $("#numero-input").val()) {
        existNumber = true;
        break;
      }
    }
    for(ordem in clientesJSON.clientes[cliente].ordens) {
      if(clientesJSON.clientes[cliente].ordens[ordem].numeroOrdem == $("#numero-input").val()) {
        existNumber = true;
        break;
      }
    }
  }

  if(existNumber && $("#numero-input").val().length) {
    $(".error").text("Número de identificação informado já existe.");
    $(".error").show();
  }

  else {
    clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos.push({
      "nome": $("#nome-input").val(),
      "numeroOrcamento": $("#numero-input").val(),
      "data": $("#data-input").val(),
      "observacoes": $("#observacoes-input").val(),
      "preco": $("#preco-input").val()
    });

    fs.writeFileSync("./json/clientes.json", JSON.stringify(clientesJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    window.location = 'cliente.html';
  }

  return false;
});

$("#numero-button").click(function() {
  $("#numero-input").val(encontrarNumeroIdentificacaoLivre());
  return false;
});
