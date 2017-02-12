$("#novo-servico-form").submit(function( event ) {
  if($("#nome-servico-input").val().trim() == '') {
    $(".error").text("Não foi possível cadastrar o serviço. O nome deve ser preenchido.");
    $(".error").show();
  }

  else {
    var fs = require('fs');
    var servicosJSON = JSON.parse(fs.readFileSync('./json/servicos.json', 'utf8'));
    servicosJSON.servicos.push({
      "nome": $("#nome-servico-input").val(),
      "preco": $("#preco-input").val(),
      "observacoes": $("#observacoes-input").val()
    });
    servicosJSON.servicos = servicosJSON.servicos.sort(function(a,b){
      if(a.nome == b.nome)
        return 0;
      var arr = [a.nome, b.nome];
      arr.sort();
      if(arr[0] == a.nome)
        return -1;
      return 1;
    });
    fs.writeFileSync("./json/servicos.json", JSON.stringify(servicosJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    window.location = 'consulta_servicos.html';
  }

  return false;
});

$("#back-servico").click(function(){
  window.location = 'consulta_servicos.html';
});
