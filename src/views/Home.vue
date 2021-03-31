<template>
  <div
    class="Home"
    :data-mode="mode"
  >
    <div class="header">
      <h1>Treees</h1>
      <menu>
        <button @click="onClickToggleModeButton"><span>{{ mode }}</span> mode</button>
        <button @click="onClickCaptureButton">Capture</button>
      </menu>
    </div>
    <div class="content">
      <div
        v-if="mode === 'edit'"
        class="left"
      >
        <TextArea :value.sync="source" />
      </div>
      <div class="right">
        <Treees
          ref="treees"
          :source="source"
        />
      </div>
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
      mode: 'edit',
      source: `#pageTitle=My Sitemap
#imagePath=img/

Top
  About
  Pricing
    Free
    Paid
  Contact: footer=Search bar<br>Top questions
    Email: class=fill
  Terms
    ...
  Privacy
    ...
  Login
    Authorized: class=borderless,red
      Contents: class=red
    Password reset
      Email: class=fill
  Error

Contents: class=red
  Categories: class=red
    All: class=red
      ...: class=red
    Novel: class=red; image=novel.jpg
      ...: class=red
    Music: class=red; image=music.jpg
      ...: class=red
    Movie: class=disabled,red; footer=Coming soon
    Game: class=red; image=game.jpg
      ...: class=red
  Search: class=red
  Cart: class=red
    Shipping form: class=red
      Payment form: class=red
        Confirmation: class=red
          Email: class=fill
`,
    }
  },

  methods: {
    onClickToggleModeButton () {
      this.mode = this.mode === 'edit' ? 'view' : 'edit'
    },

    onClickCaptureButton () {
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
  flex-direction: column;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    padding: 1rem 1rem 0 2rem;
    user-select: none;

    h1 {
      color: #808080;
      font-size: x-large;
      margin: 0;
    }

    menu {
      margin-left: auto;

      button {
        &:not(:last-child) {
          margin-right: 1rem;
        }

        span {
          text-transform: capitalize;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    padding: 1rem;
  }

  .left {
    width: 50%;
    margin-right: 1rem;
  }

  .right {
    display: flex;
    width: 50%;
    flex-direction: column;
  }
  &[data-mode="view"] .right {
    width: 100%;
  }

  .Treees {
    flex-grow: 1;
    @include scroll-bar(#ffffff, #c0c0c0);
  }
}
</style>
