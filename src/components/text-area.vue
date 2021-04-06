<template>
  <div class="TextArea">
    <textarea
      v-model="pseudoValue"
      spellcheck="false"
      @input="onInput"
      @keydown="onKeyDown"
      @mousedown="onMouseDown"
      @scroll="onScroll"
    />
    <div
      class="caret-bar"
      :style="`top: ${caretTop}px; height: ${caretHeight}px;`"
    />
  </div>
</template>

<script>
import getCaretCoordinates from 'textarea-caret'

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
      $textarea: null,
      caretTop: 0,
      caretHeight: 0,
    }
  },

  mounted () {
    this.$textarea = this.$el.querySelector('textarea')
    this.setupTextarea()
    this.updateCaret()
    window.addEventListener('resize', this.updateCaret)
  },

  methods: {
    onInput () {
      this.updateCaret()
      this.$emit('update:value', this.pseudoValue)
    },

    onKeyDown (event) {
      // NOTICE: 遅延対策（ $nextTick では不可）
      setTimeout(this.updateCaret, 1)

      if (event.code === 'Tab') {
        const indent = '  '
        const start = event.target.selectionStart
        const end = event.target.selectionEnd
        this.pseudoValue = this.pseudoValue.substring(0, start) + indent + this.pseudoValue.substring(end)

        // NOTICE: onInput が反応しないため
        this.$emit('update:value', this.pseudoValue)

        this.$nextTick(() => {
          event.target.selectionStart = event.target.selectionEnd = start + indent.length
        })

        event.preventDefault()
        return false
      }
    },

    onMouseDown () {
      // NOTICE: 遅延対策（ $nextTick では不可）
      setTimeout(this.updateCaret, 1)
    },

    onScroll () {
      this.updateCaret()
    },

    setupTextarea () {
      this.$textarea.focus()
      this.$textarea.scrollTo(0, 0)
      this.$textarea.setSelectionRange(0, 0)
    },

    updateCaret () {
      const caretCoordinates = getCaretCoordinates(this.$textarea, this.$textarea.selectionEnd)
      this.caretTop = caretCoordinates.top - this.$textarea.scrollTop - 1
      this.caretHeight = caretCoordinates.height
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables";

.TextArea {
  overflow: hidden;
  position: relative;
  height: 100%;

  textarea {
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

  .caret-bar {
    border-bottom: 1px solid $accent-color;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1rem;
  }
}
</style>
