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
          @update="onUpdateTreees"
        />
      </div>
    </div>
  </div>
</template>

<script>
// SEE: https://www.npmjs.com/package/html-to-image
import * as htmlToImage from 'html-to-image'
import defaultSource from '@/config/default-source.txt'
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
      source: '',
    }
  },

  created () {
    let data = localStorage.getItem('treees')
    if (data) {
      data = JSON.parse(data)
      data.mode = data.mode || 'edit'
      data.source = data.source || defaultSource
    } else {
      data.mode = 'edit'
      data.source = defaultSource
    }
    this.mode = data.mode
    this.source = data.source
  },

  methods: {
    onClickToggleModeButton () {
      this.mode = this.mode === 'edit' ? 'view' : 'edit'
      this.save()
    },

    onClickCaptureButton () {
      const $node = this.$refs.treees.$el.querySelector('.all')
      htmlToImage.toPng($node)
        .then((dataUrl) => {
          this.download('test.png', dataUrl)
        })
        // .catch(console.error)
    },

    onUpdateTreees () {
      this.save()
    },

    save () {
      const data = JSON.stringify({
        mode: this.mode,
        source: this.source,
      })
      localStorage.setItem('treees', data)
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
