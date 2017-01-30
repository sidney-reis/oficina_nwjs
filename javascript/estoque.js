$( "#buscaItensForm" ).submit(function( event ) {
  $("#tabelaResultadosItens").show();

  var fs = require('fs');
  var estoqueJSON = JSON.parse(fs.readFileSync('./json/estoque.json', 'utf8'));

  var table = document.getElementById("tabelaResultadosItens");

  $('#tabelaResultadosItens').children().children( 'tr:not(:first)' ).remove();

  for(var i = 0; i < estoqueJSON.itens.length; i++) {
    (function(i) {
      itemAtual = estoqueJSON.itens[i];
      if(itemAtual.nome.toUpperCase().includes($("#buscaItensField").val().toUpperCase())) {
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = estoqueJSON.itens[i].nome;
        cell2.innerHTML = estoqueJSON.itens[i].quantidade;
        cell3.innerHTML = estoqueJSON.itens[i].preco;

        var eba = i;
        row.onclick = function() {
          var cell = row.getElementsByTagName("td")[0];
          var id = cell.innerHTML;
          localStorage.setItem("selectedItemIndex", eba);
          window.location = "item.html";
        };
      }
    }) (i);
  }

  if($("#tabelaResultadosItens tr").length == 1) {
    $("#nenhum-item").show();
  }

  else {
    $("#nenhum-item").hide();
  }

  event.preventDefault();
});

$("#buscaItensField").keyup(function() {
  if($("#buscaItensField").val().length)
    $("input[type='submit']").removeAttr('disabled');
  else
    $("input[type='submit']").attr('disabled', 'disabled');
});

$("#addItens").click(function() {
  window.location = "add_item.html";
});

$("#back-estoque").click(function(){
  window.location = "index.html";
});