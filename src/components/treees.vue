<template>
  <div class="Treees">
    <div class="all" />
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
      const $container = this.$el.querySelector('.all')
      treees(this.source, this.files, $container)
      this.$emit('update')
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

  .all {
    --margin-horizontal: 0.5rem;
    --margin-vertical: 1rem;
    --border-color: #000000;
    --border-width: 2px;
    --image-width: 120px;
    background-color: #ffffff;
    color: #000000;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2rem;
  }

  .page-title {
    font-size: large;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
  }

  .container {
    flex-grow: 1;
    position: relative;
    text-align: center;
  }
  .all > .container {
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .all > .container:not(:first-child) {
    border-top: 1px dashed var(--border-color);
  }
  .container::before {
    background-color: var(--border-color);
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: var(--border-width);
  }
  .all > .container::before,
  .container:first-child:last-child::before {
    display: none;
  }
  .container:first-child::before {
    left: 50%;
    width: 50%;
  }
  .container:last-child::before {
    right: 50%;
    width: 50%;
  }

  .child-container {
    display: flex;
    text-align: center;
  }

  .box {
    border: var(--border-width) solid var(--border-color);
    display: inline-block;
    margin: var(--margin-vertical) var(--margin-horizontal);
    padding: 0.25rem;
    position: relative;
  }
  .has-image > .box {
    // max-width: calc(var(--image-width) + 0.25rem * 2 + var(--border-width) * 2);
  }
  .box::before,
  .box::after {
    background-color: var(--border-color);
    content: "";
    display: block;
    margin-left: calc(var(--border-width) / -2);
    position: absolute;
    left: 50%;
    width: var(--border-width);
    height: var(--margin-vertical);
  }
  .all > .container > .box::before {
    display: none;
  }
  .box::before {
    top: calc(var(--margin-vertical) * -1 - var(--border-width));
  }
  .box:last-child::after {
    display: none;
  }
  .box::after {
    bottom: calc(var(--margin-vertical) * -1 - var(--border-width));
  }
  .disabled > .box > .header,
  .disabled > .box > .image,
  .disabled > .box > .footer {
    opacity: 0.5;
  }
  .borderless > .box {
    border-color: transparent;
  }
  .fill > .box {
    background-color: var(--border-color);
    color: #ffffff;
  }
  .red > .box {
    background-color: rgba(255, 64, 64, 0.25);
  }
  .blue > .box {
    background-color: rgba(64, 64, 255, 0.25);
  }
  .green > .box {
    background-color: rgba(64, 192, 64, 0.25);
  }
  .purple > .box {
    background-color: rgba(255, 64, 255, 0.25);
  }

  .header {
    font-size: small;
    font-weight: bold;
    line-height: 1.25;
    margin: 0 1rem;
    white-space: nowrap;
  }
  .has-image > .box > .header {
    margin: 0;
  }

  .image {
    cursor: pointer;
    margin-top: 0.25rem;
    width: var(--image-width);
    vertical-align: middle;
  }

  .footer {
    font-size: x-small;
    line-height: 1.25;
    margin-top: 0.25rem;
    text-align: left;
  }
}
</style>
