$( "#buscaClientesForm" ).submit(function( event ) {
  $("#tabelaResultadosClientes").show();

  var fs = require('fs');
  var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));

  var table = document.getElementById("tabelaResultadosClientes");

  $('#tabelaResultadosClientes').children().children( 'tr:not(:first)' ).remove();

  for(var i = 0; i < clientesJSON.clientes.length; i++) {
    (function(i) {
      clienteAtual = clientesJSON.clientes[i];
      if(clienteAtual.placaDoCarro.toUpperCase().includes($("#buscaClienteField").val().toUpperCase()) || clienteAtual.nomeDoCliente.toUpperCase().includes($("#buscaClienteField").val().toUpperCase()) || clienteAtual.modeloDoCarro.toUpperCase().includes($("#buscaClienteField").val().toUpperCase())) { //placa do carro, nome do cliente ou modelo do carro
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = clientesJSON.clientes[i].placaDoCarro;
        cell2.innerHTML = clientesJSON.clientes[i].nomeDoCliente;
        cell3.innerHTML = clientesJSON.clientes[i].modeloDoCarro;

        var eba = i;
        row.onclick = function() {
          var cell = row.getElementsByTagName("td")[0];
          var id = cell.innerHTML;
          localStorage.setItem("selectedClienteIndex", eba);
          window.location = "cliente.html";
        };
      }
    }) (i);
  }
  if($("#tabelaResultadosClientes tr").length == 1) {
    $("#nenhum-cliente").show();
  }
  else {
    $("#nenhum-cliente").hide();
  }

  event.preventDefault();
});

$("#buscaClienteField").keyup(function() {
  if($("#buscaClienteField").val().length)
    $("input[type='submit']").removeAttr('disabled');
  else
    $("input[type='submit']").attr('disabled', 'disabled');
});

$("#addCliente").click(function() {
  window.location = "add_cliente.html";
});

$("#back-cliente").click(function(){
  window.location = "index.html";
});