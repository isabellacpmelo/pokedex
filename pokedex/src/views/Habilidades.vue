<template>
    <div>
        <div v-if="!pokemon.habilidades">
            Selecione um Pokémon
        </div>
        <div v-else>
            <table class="table text-white">
                <transition-group name="lista" tag="tbody">
                    <tr
                        v-for="(habilidade, index ) in skillsOrdered"
                        :key="habilidade"
                        class="list-item"
                    >
                        <td>{{ habilidade }}</td>
                        <td class="d-flex justify-content-end">
                            <button 
                                type="button" 
                                class="btn btn-danger btn-sm"
                                @click="$emit('removeSkill', index)"
                            >
                                x
                            </button>
                        </td>
                    </tr>
                </transition-group>
            </table>
            <input
                v-model="skill"
                type="text" 
                class="form-control" 
                placeholder="Adicionar habilidade"
                @keyup.enter="addSkill()"
            >
        </div>
    </div>
</template>

<script>
export default {
    name:  'Habilidades',
    props: {
        pokemon: Object,
    },
    data: () => ({
        skill: ''
    }),
    methods: {
        addSkill() {
            // const newSkill = this.skill.charAt(0)
            const newSkill = this.skill.charAt(0).toUpperCase() + this.skill.substring(1)
            this.$emit('addSkill', newSkill)
            this.skill = ''
        }
    },
    computed: {
        skillsOrdered() {
            let skills = this.pokemon.habilidades
            
            return skills.sort()
        }
  }
}
</script>

<style scoped>
.table td {
    border: none;
}

.lista-enter-from {
    opacity: 0;
    transform: translateX(-150px);
}

.lista-enter-active {
    transition: all 1s;
}

.lista-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.lista-leave-from {
    opacity: 1;
    transform: translateX(0px);
}

.lista-leave-active {
    transition: all 1s;
    position: absolute;
}

.lista-leave-to {
    opacity: 0;
    transform: translateX(150px);
}

.lista-move {
    transition: all 1.5s;
}
</style>