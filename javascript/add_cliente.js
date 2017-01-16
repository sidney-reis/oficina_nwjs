$("#novo-cliente-form").submit(function( event ) {
  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));
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
});

$("#back-cliente").click(function(){
  window.location = 'busca_cliente.html';
});