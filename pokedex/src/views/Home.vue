<template>
  <div class="container">
    <div class="row mt-2">
      
      <!-- início lado esquerdo -->
      <div class="col mb-2">
        <div class="card palco">
          <div class="card-header"></div>

          <div class="card-body bg-pokebola bg-normal">
            <div class="pokemon">
              <!-- <transition name="pulo" :duration="{ enter: 2000, leave: 1000}">
                <img v-show="exibir" src="@/assets/imgs/pokemons/001.png">
              </transition> -->
              <!-- <transition 
                enter-from-class="entrada-estado-inicial"
                enter-active-class="entrada-transicao"
                enter-to-class="entrada-estado-final"
                leave-from-class="saida-estado-inicial"
                leave-active-class="saida-transicao"
                leave-to-class="saida-estado-final"
              >
                <img v-show="exibir" src="@/assets/imgs/pokemons/001.png">
              </transition> -->

              <!-- Usando biblioteca animate.css -->
              <transition 
                @after-enter="showEvolutionsTransition"
                @before-leave="hideEvolutionsTransition"

                enter-active-class="animate__animated animate__bounce"
                leave-active-class="animate__animated animate__bounceOut"
              >
                <img
                  v-if="showPokemon"
                  :src="`/src/assets/imgs/pokemons/${chosenPokemon.imagem}`"
                >
              </transition>

              <div class="evolucoes">
                <transition
                  v-for="evolution in chosenPokemon.evolucoes"
                  :key="evolution"
                  name="fade"
                >
                  <img
                    v-if="showEvolutions"
                    :src="`/src/assets/imgs/pokemons/${evolution.toString().padStart(3, '0')}.png`"
                  >
                </transition>
              </div>
            </div>
          </div>

          <div class="card-footer">
         
          <nav class="nav nav-pills nav-fill">
            <!-- menu de navegação -->
            <router-link
              class="nav-item nav-link text-white"
              :to="{ path: '/sobre' }"
              exact-active-class="active"
            >
              Sobre
            </router-link>
            <router-link
              class="nav-item nav-link text-white"
              :to="{ path: '/status' }"
              exact-active-class="active"
            >
              Status
            </router-link>
            <router-link
              class="nav-item nav-link text-white"
              :to="{ path: '/habilidades' }"
              exact-active-class="active"
            >
              Habilidades
            </router-link>
          </nav>

          <div class="detalhes">
            <!-- exibe dados de acordo com o menu de navegação -->
            <router-view
              v-slot="{ Component }"
              :pokemon="chosenPokemon"
              @addSkill="addSkill"
              @removeSkill="removeSkill"
            >
              <transition
                enter-active-class="animate__animated animate__zoomInDown"
              >
                <component :is="Component" />
              </transition>
            </router-view>
          </div>

          </div>
        </div>
      </div>
      <!-- fim lado esquerdo -->

      <!-- início lado direito -->
      <div class="col mb-2 pokedex">        
        <div class="row">
          <div class="col">
            <h1>Pokédex</h1>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <select class="form-select" v-model="ordenacao">
              <option value="" disabled>Ordenar Pokémon</option>
              <option value="1">Id crescente</option>
              <option value="2">Id decrescrente</option>
              <option value="3">De A - Z</option>
              <option value="4">De Z - A</option>
            </select>
          </div>
        
          <div class="col">
            <input 
              type="text"
              class="form-control"
              placeholder="Pesquisar Pokémon watch"
              v-model="pokemonName"
            >
          </div>
        </div>

        <div class="row">
          <div class="pokedex-catalogo">

            <!-- início listagem dinâmica -->
            <transition-group name="ordenacao">
              <div
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                :class="`cartao-pokemon bg-${pokemon.tipo}`"
                @click="analyzePokemon(pokemon)"
              >
                <h1>{{ pokemon.id }} {{ pokemon.nome }}</h1>
                <span>{{ pokemon.tipo }}</span>
                <div class="cartao-pokemon-img">
                  <transition
                    appear
                    enter-active-class="animate__animated animate__fadeInDown"
                  >
                    <img :src="`/src/assets/imgs/pokemons/${pokemon.imagem}`">
                  </transition>
                </div>
              </div>
            </transition-group>
            <!-- fim listagem dinâmica -->

          </div>
        </div>
      </div>
      <!-- fim lado direito -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    showPokemon: false,
    showEvolutions: false,
    chosenPokemon: {},
    pokemons: [],
    ordenacao: '',
    pokemonName: '',
  }),
  watch: {
    pokemonName(newValue) {
      fetch(`http://localhost:3000/pokemons?nome_like=${newValue}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.pokemons = data
        })
    },
    ordenacao(newValue) {
      if (newValue == 1) { //ordenação por id crescente
        this.pokemons.sort((next, current) => {
          if (current.id < next.id) {
            return 1
          }
          else if (current.id > next.id) {
            return - 1
          }
          else {
            return 0
          }
        })
      }
      if (newValue == 2) { //ordenação por id decrescente
        this.pokemons.sort((next, current) => {
          if (current.id < next.id) {
            return -1
          }
          else if (current.id > next.id) {
            return 1
          }
          else {
            return 0
          }
        })
      }
      if (newValue == 3) { //ordenação alfabética A-Z
        this.pokemons.sort((next, current) => {
          if (current.nome < next.nome) {
            return 1
          }
          else if (current.nome > next.nome) {
            return - 1
          }
          else {
            return 0
          }
        })
      }
      if (newValue == 4) {
        this.pokemons.sort((next, current) => {
          // let resultado1 = current.nome.localeCompare(next.nome) // -1 indica que a string de referência vem antes do parâmetro
          // let resultado2 = next.nome.localeCompare(current.nome) // 1 indica que a string de referência vem depois do parâmetro
          // 0 indica que os valores são iguais

          return current.nome.localeCompare(next.nome)
        })
      }
    }
  },
  created() {
    fetch('http://localhost:3000/pokemons')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.pokemons = data
      })
  },
  methods: {
    showEvolutionsTransition() {
      this.showEvolutions = true
    },
    hideEvolutionsTransition() {
      this.showEvolutions = false
    },
    analyzePokemon(pokemon) {
      let changePokemonAnalyzed = false
      //se o pokémon atua é diferente do pokémon clicado
      //se o atributo exibir é true
      if(this.chosenPokemon.id != pokemon.id && this.showPokemon) {
        setTimeout(() => {
          this.analyzePokemon(pokemon)
        }, 1000)

        changePokemonAnalyzed = true
      }
      this.chosenPokemon = pokemon
      this.showPokemon = !this.showPokemon
      this.showEvolutions = !this.showEvolutions

      //se a ação for de ocultar o Pokémon
      //se a ação recursiva não for chamada
      if(!this.showPokemon && !changePokemonAnalyzed) {
        this.chosenPokemon = {}
      }
    },
    addSkill(skill) {
      if(this.chosenPokemon.habilidades) {
        this.chosenPokemon.habilidades.push(skill)
      }
    },
    removeSkill(index) {
      if(this.chosenPokemon.habilidades) {
        this.chosenPokemon.habilidades.splice(index, 1)
      }
    }
  }
}
</script>

<style>
body {
  background-color: #dee3eb;
}
</style>

<style scoped>
@import '@/assets/css/animacoes.css';

.pokedex {
  padding: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

.pokedex-catalogo {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 98%;
  margin-top: 10px;
}

.cartao-pokemon {
  position: relative;
  margin: 5px;
  width: 150px;
  height: 115px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.cartao-pokemon h1{
  color:#fff;
  font-size: 14px;
  margin: 5px 0px 0px 5px;
  padding: 0px;
}

.cartao-pokemon span{
  color:#fff;
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 10px 0px 0px 5px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

.cartao-pokemon img {
    max-width:60%;
    max-height:60%;
    float: right;
}

.bg-grama {
  background-color: #2d8f78;
}

.bg-fogo {
  background-color: #e47373
}

.bg-agua {
  background-color: #5a9ed2
}

.bg-inseto {
  background-color: #26d3ab
}

.bg-normal {
  background-color: #cecece
}

.bg-pokebola {
  background-image: url("~@/assets/imgs/pokebola.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.palco {
  color: #fff;
  background-color: #333;
  -webkit-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  border-radius: 10px;
}

.pokemon {
  display: block;
  text-align: center;
  height: 215px;
}

.detalhes {
  margin: 20px 30px 20px 30px;
}

.evolucoes {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 70px;
}

.evolucoes img {
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
}

.ordenacao-move {
  transition: all 1s;
}

</style>
