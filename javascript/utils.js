var fs = require('fs');
var clientesJSON = JSON.parse(fs.readFileSync('./json/clientes.json', 'utf8'));

function encontrarNumeroIdentificacaoLivre() {
  var i = 1;
  var encontrouLivre = false;
  var encontrouIgual = false;

  while(!encontrouLivre) {
    console.log("entrou while");
    encontrouIgual = false;
    for(cliente in clientesJSON.clientes) {
      console.log("entrou for cliente");
      if(!encontrouIgual) {
        for(orcamento in clientesJSON.clientes[cliente].orcamentos) {
          if(clientesJSON.clientes[cliente].orcamentos[orcamento].numeroOrcamento == i) {
            console.log("encontrou "+i+" em orcamento");
            encontrouIgual = true;
            break;
          }
        }
        if(!encontrouIgual) {
          for(servico in clientesJSON.clientes[cliente].servicos) {
            if(clientesJSON.clientes[cliente].servicos[servico].numeroServico == i) {
              console.log("encontrou "+i+" em servico");
              encontrouIgual = true;
              break;
            }
          }
          if(!encontrouIgual) {
            for(ordem in clientesJSON.clientes[cliente].ordens) {
              if(clientesJSON.clientes[cliente].ordens[ordem].numeroOrdem == i) {
                console.log("encontrou "+i+" em ordem");
                encontrouIgual = true;
                break;
              }
            }
          }
        }
      }
      else {
        break;
      }
    }
    if(!encontrouIgual) {
      encontrouLivre = true;
      console.log("encontrou");
    }
    else {
      i++;
    }
  }

  return i;
}