<template>
  <textarea
    v-model="pseudoValue"
    class="TextArea"
    @change="onChange"
    @keyup="onChange"
  />
</template>

<script>
export default {
  name: 'TextArea',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      pseudoValue: this.value,
    }
  },

  methods: {
    onChange () {
      this.$emit('update:value', this.pseudoValue)
      this.$emit('change')
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables";

.TextArea {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
