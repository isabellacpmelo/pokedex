<template>
    <div>
        <div v-if="!pokemon.habilidades">
            Selecione um Pokémon
        </div>
        <div v-else>
            <table class="table text-white">
                <tbody>
                    <tr
                        v-for="(habilidade, index ) in pokemon.habilidades"
                        :key="index"
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
                </tbody>
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
            this.$emit('addSkill', this.skill)
            this.skill = ''
        }
    }
}
</script>

<style scoped>
.table td {
    border: none;
}
</style>