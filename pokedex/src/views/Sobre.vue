<template>
    <div>
        <p>
            Identificador: {{ pokemon.id.toString().padStart(3, '0') }}
        </p>
        <p>Nome: {{ pokemon.nome }}</p>
        <p>Tipo: {{ pokemon.tipo }}</p>
    </div>
</template>

<script>
export default {
    name: 'Sobre',
    props: {
        pokemon: Object
    }
}
</script>