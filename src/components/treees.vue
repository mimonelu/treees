<template>
  <div class="Treees">
    <div class="treees" />
  </div>
</template>

<script>
import treees from '@/scripts/treees.js'

export default {
  name: 'Treees',

  props: {
    source: {
      type: String,
      default: '',
    },
    files: {
      type: Array,
      default: () => ([]),
    },
  },

  mounted () {
    this.update()
  },

  watch: {
    source () {
      this.update()
    },
  },

  methods: {
    update () {
      const $container = this.$el.querySelector('.treees')
      const schemes = treees(this.source, this.files, $container)
      this.$emit('update', schemes)
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/_variables";

.Treees {
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
}
</style>
