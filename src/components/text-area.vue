<template>
  <div class="TextArea" />
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/selection/active-line'

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
      codeMirror: null,
    }
  },

  mounted () {
    this.codeMirror = CodeMirror(this.$el, {
      autofocus: true,
      value: this.pseudoValue,
      indentUnit: 2,
      indentWithTabs: false,
      lineNumbers: true,
      lineWrapping: true,
      mode: 'null',
      styleActiveLine: { nonEmpty: true },
      tabSize: 2,
      theme: 'base16-dark',
      extraKeys: {
        Tab (cm) {
          const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
          cm.replaceSelection(spaces)
        },
      },
    })
    this.codeMirror.on('change', (cm) => {
      this.pseudoValue = cm.getValue()
      this.$emit('update:value', this.pseudoValue)
    })
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables";

.TextArea {
  overflow: hidden;
  position: relative;
  height: 100%;

  &::v-deep {
    .CodeMirror {
      font-family: "Courier New", monospace;
      font-feature-settings: "palt";
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      height: 100%;
    }

    .CodeMirror-line,
    .CodeMirror-linenumber {
      line-height: 1.25;
    }

    .CodeMirror-activeline-background {
      background-color: rgba(#ff0000, 0.25);
    }

    .CodeMirror-hscrollbar,
    .CodeMirror-vscrollbar {
      @include scroll-bar(transparent, #606060);
    }
  }
}
</style>
