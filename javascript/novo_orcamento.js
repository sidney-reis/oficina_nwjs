$("#back-cliente").click(function() {
  window.location = "cliente.html";
});

$("#data-input").mask("99/99/9999",{placeholder:"dd/mm/aaaa"});

$("#novo-orcamento-form").submit(function() {
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));

  clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].orcamentos.push({
    "nome": $("#nome-input").val(),
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

  return false;
});