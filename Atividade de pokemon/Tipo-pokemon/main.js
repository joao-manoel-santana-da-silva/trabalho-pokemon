// buscar o campo de texto
const input = document.querySelector("#busca");

// buscar o div que vai ficar o retorno dos dados da api
const info = document.querySelector("#info");

// adicionar o listener no evento input
input.addEventListener("keypress", async (event) => {
  if (event.key == "Enter") {
    const nome = event.target.value; // o que o usuário digitou no campo
    // buscar lá na api do pokedex pela variável nome
    const resultado = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome.toLowerCase());
    // verifica se talquei
    if (resultado.ok) {
      // converte os dados de retorno do fetch (doidões) para objeto javascript
      const dados = await resultado.json();
      // guardar o resultado em um objeto {}
      const pokemon = {
        nome: dados.name,
        imagem: dados.sprites.front_default,
        altura: parseInt(dados.height) / 10,
        peso: parseInt(dados.weight) / 10,
        tipo: dados.types[0].type,
      };
      info.innerHTML = "<h1>" + pokemon.nome + "</h1>";
      info.innerHTML += '<img src="' + pokemon.imagem + '">';
      info.innerHTML += "<p>Altura: " + pokemon.altura + " metros </p>";
      info.innerHTML += "<p>Peso: " + pokemon.peso + " kg </p>";
      info.style.display = 'block';
    }
  }



const input = document.querySelector("#busca");

const info = document.querySelector("#info");

input.addEventListener("keypress", async (event) => {
  if (event.key == "Enter") {
    const nome = event.target.value;
    const resultado = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome.toLowerCase());
    if (resultado.ok) {

      const dados = await resultado.json();
      // Objeto pokemon
      const pokemon = {
        nome: dados.name,
        imagem: dados.sprites.front_default,
        altura: parseInt(dados.height) / 10,
        peso: parseInt(dados.weight) / 10,
        tipos: dados.types.map(tipo => tipo.type.name).join(", "),
      };
      info.innerHTML = "<h1>" + pokemon.nome + "</h1>";
      info.innerHTML += '<img src="' + pokemon.imagem + '">';
      info.innerHTML += "<p>Altura: " + pokemon.altura + " metros </p>";
      info.innerHTML += "<p>Peso: " + pokemon.peso + " kg </p>";
      info.innerHTML += "<p>Tipo: " + pokemon.tipos + "</p>";
      info.style.display = 'block';
    } else {
      info.innerHTML = "<p style='color:red;'>Pokémon não encontrado. Tente novamente!</p>";
    }
  }



  // Buscar os elementos do HTML
const input = document.querySelector("#busca");
const info = document.querySelector("#info");

// Adicionar o evento no campo de texto
input.addEventListener("keypress", async (event) => {
  if (event.key == "Enter") {
    const busca = event.target.value.toLowerCase(); // Texto digitado pelo usuário
    const tipoDeBusca = busca.startsWith("habilidade:") ? "habilidade" : "nome"; // Detectar o tipo de busca

    // Mostrar uma mensagem de "Carregando..."
    info.innerHTML = `<p style='color:redyyyyy;'>Carregando...</p>`;

    if (tipoDeBusca === "habilidade") {
      // Buscar por habilidade
      const habilidade = busca.replace("habilidade:", "").trim(); // Extrair o nome da habilidade
      const resultado = await fetch(`https://pokeapi.co/api/v2/ability/${habilidade}`);
      if (resultado.ok) {
        const dados = await resultado.json();
        if (dados.pokemon.length > 0) {
          const primeiroPokemon = dados.pokemon[0].pokemon.name; // Pegar o primeiro Pokémon
          await buscarPokemonPorNome(primeiroPokemon); // Função para buscar pelo nome
        } else {
          info.innerHTML = `<p style='color:red;'>Nenhum Pokémon encontrado para a habilidade "${habilidade}".</p>`;
        }
      } else {
        info.innerHTML = `<p style='color:red;'>Habilidade "${habilidade}" não encontrada. Tente novamente!</p>`;
      }
    } else {
      // Buscar por nome
      await buscarPokemonPorNome(busca);
    }
  }
});

//Buscar Pokémon por nome
async function buscarPokemonPorNome(nome) {
  const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  if (resultado.ok) {
    const dados = await resultado.json();

    // Criar uma lista com os tipos do Pokémon
    const tipos = dados.types.map(tipo => tipo.type.name);

    // Buscar as fraquezas dos tipos
    const fraquezas = await buscarFraquezas(tipos);

    // Objeto 
    const pokemon = {
      nome: dados.name,
      imagem: dados.sprites.front_default,
      altura: parseInt(dados.height) / 10,
      peso: parseInt(dados.weight) / 10,
      tipos: tipos.join(", "),
      fraquezas: [...new Set(fraquezas)].join(", "),
    };

    info.innerHTML = `<h1>${pokemon.nome}</h1>`;
    info.innerHTML += `<img src="${pokemon.imagem}">`;
    info.innerHTML += `<p>Altura: ${pokemon.altura} metros</p>`;
    info.innerHTML += `<p>Peso: ${pokemon.peso} kg</p>`;
    info.innerHTML += `<p>Tipos: ${pokemon.tipos}</p>`;
    info.innerHTML += `<p>Fraquezas: ${pokemon.fraquezas}</p>`;
    info.style.display = 'block';
  } else {
    info.innerHTML = `<p style='color:red;'>Pokémon "${nome}" não encontrado. Tente novamente!</p>`;
  }
}

// Função para buscar fraquezas dos tipos
async function buscarFraquezas(tipos) {
  const fraquezas = [];

  for (const tipo of tipos) {
    const resultadoTipo = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    if (resultadoTipo.ok) {
      const dadosTipo = await resultadoTipo.json();
      fraquezas.push(...dadosTipo.damage_relations.double_damage_from.map(dano => dano.name));
    }
  }

  return fraquezas;
}





});

});