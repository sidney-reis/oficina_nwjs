$("#novo-item-form").submit(function( event ) {
  var fs = require('fs');
  var estoqueJSON = JSON.parse(fs.readFileSync('./json/estoque.json', 'utf8'));
  var repeat = false;

  for(var i = 0; i<estoqueJSON.itens.length; i++) {
    if($("#nome-input").val().trim() == estoqueJSON.itens[i].nome.trim()) {
      repeat = true;
      break;
    }
  }

  if(repeat) {
    $(".error").text("Não foi possível adicionar item. Já existe item com este nome no estoque.");
    $(".error").show();
  }

  else if($("#nome-input").val().trim() == '' || $("#quantidade-input").val().trim() == '') {
    $(".error").text("Não foi possível adicionar item. Nome e quantidade do item devem ser preenchidos para adicionar no estoque.");
    $(".error").show();
  }

  else {
    $(".error").hide();
    estoqueJSON.itens.push({
      "nome": $("#nome-input").val(),
      "quantidade": $("#quantidade-input").val(),
      "preco": $("#preco-input").val()
    });
    fs.writeFileSync("./json/estoque.json", JSON.stringify(estoqueJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    window.location = 'estoque.html';
  }

  return false;
});

$("#back-item").click(function(){
  window.location = 'estoque.html';
});