$("#back-cliente").click(function() {
  window.location = "cliente.html";
});

$("#data-input").mask("99/99/9999",{placeholder:"dd/mm/aaaa"});

$("input[name=forma-pagamento]").click(function() {
  if(this.value == "dinheiro") {
    $("#pagamento2-input").hide();
    $("#pagamento2-texto").empty();
  }
  else if(this.value == "debito") {
    $("#pagamento2-input").hide();
    $("#pagamento2-texto").empty();
  }
  else if(this.value == "credito") {
    $("#pagamento2-input").show();
    $("#pagamento2-texto").text("Quantas vezes:");
  }
  else if(this.value == "deposito") {
    $("#pagamento2-input").show();
    $("#pagamento2-texto").text("Conta que foi depositado:");
  }
  else if(this.value == "outro") {
    $("#pagamento2-input").show();
    $("#pagamento2-texto").text("Qual método utilizado:");
  }
});

$("#novo-servico-form").submit(function() {
  if($("#servico-input").val().trim() == '') {
    $(".error").text("Não foi possível adicionar serviço. O campo de serviço executado deve ser preenchido.");
    $(".error").show();
  }

  else if(isNaN(parseFloat($("#custo-input").val())) || isNaN(parseFloat($("#preco-input").val()))) {
    $(".error").text("Utilize apenas números e pontos nos campos de custo e preço. Pontos são utilizados para separar reais e centavos.");
    $(".error").show();
  }

  else if($("#custo-input").val().includes(",") || $("#preco-input").val().includes(",")) {
    $(".error").text("Não utilize vírgulas. Utilize pontos para separar reais e centavos.");
    $(".error").show();
  }

  else if((($("#custo-input").val().match(/\./g) || []).length > 1) || (($("#preco-input").val().match(/\./g) || []).length > 1)) {
    $(".error").text("Utilize apenas um ponto separar reais e centavos.");
    $(".error").show();
  }

  else {
    var fs = require('fs');
    var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));

    clientesJSON.clientes[localStorage.getItem("selectedClienteIndex")].servicos.push({
      "servicoExecutado": $("#servico-input").val(),
      "data": $("#data-input").val(),
      "observacoes": $("#observacoes-input").val(),
      "custo": $("#custo-input").val(),
      "preco": $("#preco-input").val(),
      "pagamento1": $('input[name=forma-pagamento]:checked', '#novo-servico-form').val(),
      "pagamento2": $("#pagamento2-input").val()
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