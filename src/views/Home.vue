<template>
  <div class="Home">
    <div class="left">
      <TextArea :value.sync="source" />
    </div>
    <div class="right">
      <div class="treees-controle">
        <button @click="onCapture">Capture</button>
      </div>
      <Treees
        ref="treees"
        :source="source"
      />
    </div>
  </div>
</template>

<script>
// SEE: https://www.npmjs.com/package/html-to-image
import * as htmlToImage from 'html-to-image'
import TextArea from '@/components/text-area'
import Treees from '@/components/treees'

export default {
  name: 'Home',

  components: {
    TextArea,
    Treees,
  },

  data () {
    return {
      source: `#pageTitle=Sample Tree

Top: class=red
  Login: class=red
    Authorized area: class=borderless
      Contents
  Password reset: class=red
  Error: class=red

Contents
  About
  Categories
    Fashion
      Fashion
    Foods
  Contact
  Links
    Other site: class=fill
`,
    }
  },

  methods: {
    onCapture () {
      const $node = this.$refs.treees.$el.querySelector('.all')
      htmlToImage.toPng($node)
        .then((dataUrl) => {
          this.download('test.png', dataUrl)
        })
        .catch(console.error)
    },

    download (fileName, href) {
      const link = document.createElement('a')
      link.download = fileName
      link.href = href
      link.target = '_blank'
      link.click()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables";

.Home {
  display: flex;
  height: 100%;

  .left {
    width: 50%;
    margin-right: 1rem;
  }

  .right {
    display: flex;
    width: 50%;
    flex-direction: column;
  }

  .treees-controle {
    margin-bottom: 0.5rem;
  }

  .Treees {
    flex-grow: 1;
    overflow: scroll;
  }
}
</style>
