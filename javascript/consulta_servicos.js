var fs = require('fs');
var servicosJSON = JSON.parse(fs.readFileSync('./json/servicos.json', 'utf8'));

var table = document.getElementById("tabelaServicos");

for(var i = 0; i < servicosJSON.servicos.length; i++) {
  (function(i) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = servicosJSON.servicos[i].nome;
    cell2.innerHTML = servicosJSON.servicos[i].preco;

    var eba = i;
    row.onclick = function() {
      var cell = row.getElementsByTagName("td")[0];
      var id = cell.innerHTML;
      localStorage.setItem("servicoIndex", eba);
      window.location = "servico.html";
    };
  }) (i);
}
if($("#tabelaServicos tr").length == 1) {
  $("#nenhum-servico").show();
}
else {
  $("#nenhum-cliente").hide();
}

$("#addServico").click(function() {
  window.location = "add_servico.html";
});

$("#back-servicos").click(function(){
  window.location = "index.html";
});
