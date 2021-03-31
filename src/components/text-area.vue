<template>
  <textarea
    v-model="pseudoValue"
    class="TextArea"
    @change="onChange"
    @keydown="onKeyDown"
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
    },

    onKeyDown (event) {
      if (event.code === 'Tab') {
        const indent = '  '
        const start = event.target.selectionStart
        const end = event.target.selectionEnd
        this.pseudoValue = this.pseudoValue.substring(0, start) + indent + this.pseudoValue.substring(end)
        this.$nextTick(() => {
          event.target.selectionStart = event.target.selectionEnd = start + indent.length
        })

        event.preventDefault()
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables";

.TextArea {
  appearance: none;
  background-color: #202020;
  border-style: none;
  color: #f0f0f0;
  cursor: text;
  display: block;
  font-size: medium;
  line-height: 1.25;
  overflow: scroll;
  padding: 1rem;
  resize: none;
  width: 100%;
  height: 100%;
  @include scroll-bar(transparent, #606060);
}
</style>
