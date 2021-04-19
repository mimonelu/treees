<template>
  <div class="FileButton">
    <label>
      {{ label }}
      <input
        type="file"
        multiple
        @change="onChange"
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'FileButton',

  props: {
    label: {
      type: String,
      default: 'File',
    },
  },

  methods: {
    onChange (event) {
      this.$emit('change', event)
    },
  },
}
</script>

<style lang="scss" scoped>
.FileButton {
  display: inline-block;

  input[type="file"] {
    appearance: none;
    cursor: pointer;
    display: block;
    font-size: 0;
    opacity: 0;
    position: absolute;
  }
}
</style>
