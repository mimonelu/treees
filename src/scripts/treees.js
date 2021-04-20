export default (schemeText, files, $container) => {
  const { pageSchemes, nodeSchemes } = makeSchemes(schemeText)
  $container.innerHTML = ''
  render(pageSchemes, nodeSchemes, files, $container)
  return { pageSchemes, nodeSchemes }
}

// スキームの作成
const makeSchemes = (text) => {
  // ページスキーム（ディレクティブの格納場所）
  const pageSchemes = { pageTitle: '', imagePath: '' }

  // ノードスキーム
  const nodeSchemes = { indent: 0, children: [] }

  const parentNodes = [ nodeSchemes ]
  let currentNode = nodeSchemes
  let previousNode = null
  text.trim().split('\n').forEach((line) => {
    // コメントを除去
    let text = line.replace(/\/\/.*$/, '')
    if (text === '') {
      return
    }

    // インデント
    const indent = (text.match(/^(?: |\t)*/)[0].match(/ {2}|\t/g) || []).length
    text = text.trim()

    // ディレクティブ
    const directive = (text.match(/^#(.*)/) || [ '', '' ])[1]
    if (directive !== '') {
      // テーマ
      const theme = (directive.match(/theme=([^;]*)/) || [ '', '' ])[1]
      if (theme !== '') {
        pageSchemes.theme = theme
      }

      // ページタイトル
      const pageTitle = (directive.match(/pageTitle=([^;]*)/) || [ '', '' ])[1]
      if (pageTitle !== '') {
        pageSchemes.pageTitle = pageTitle
      }

      // イメージパス
      const imagePath = (directive.match(/imagePath=([^;]*)/) || [ '', '' ])[1]
      if (imagePath !== '') {
        pageSchemes.imagePath = imagePath
      }
      return
    }

    // 名称
    const name = (text.match(/([^:]+)/) || [ '', '' ])[1]

    // ヘッダー ※未使用。実質名称に同じ
    const header = (text.match(/header=([^;]*)/) || [ '', '' ])[1] || name

    // フッター
    const footer = (text.match(/footer=([^;]*)/) || [ '', '' ])[1]

    // イメージ
    const image = (text.match(/image=([^;]*)/) || [ '', '' ])[1]

    // クラス配列
    const classes = (text.match(/class=([^;]*)/) || [ '', '' ])[1].split(',')

    // 現在のノード
    const node = { indent, children: [], name, header, footer, image, classes }

    if (previousNode) {
      if (indent > previousNode.indent) {
        parentNodes.push(previousNode)
        currentNode = previousNode
      } else if (indent < previousNode.indent) {
        parentNodes.splice(indent + 1)
        currentNode = parentNodes[indent]
      }
    }
    currentNode.children.push(node)
    previousNode = node
  })
  return { pageSchemes, nodeSchemes }
}

// レンダリング
const render = (pageSchemes, nodeSchemes, files, $container) => {
  if (pageSchemes.theme !== '') {
    $container.setAttribute('class', `treees treees--${pageSchemes.theme}`)
  }

  if (pageSchemes.pageTitle !== '') {
    const $pageTitle = document.createElement('div')
    $pageTitle.classList.add('page-title')
    $pageTitle.innerHTML = pageSchemes.pageTitle
    $container.appendChild($pageTitle)
  }

  renderNode(pageSchemes, nodeSchemes, files, $container)
}

// 各ノードのレンダリング
const renderNode = (pageSchemes, nodeSchemes, files, $parent) => {
  for (const scheme of nodeSchemes.children) {
    const $container = document.createElement('div')
    $container.classList.add('container')
    scheme.classes.forEach((className) => {
      className = className.trim()
      if (className !== '') {
        $container.classList.add(className)
      }
    })
    if (scheme.image) {
      $container.classList.add('has-image')
    }
    $parent.appendChild($container)

    const $box = document.createElement('div')
    $box.classList.add('box')
    $container.appendChild($box)

    const $header = document.createElement('div')
    $header.classList.add('header')
    $header.innerHTML = scheme.header
    $box.appendChild($header)

    if (scheme.image) {
      const $image = document.createElement('img')
      $image.classList.add('image')

      const file = files.find((file) => {
        // NOTICE: Mac では 「ガ」というような文字が「カ＋゛」として表現される現象への対応
        // SEE: https://qiita.com/jkr_2255/items/e0c039c438d3ebfd1a6a
        const name = file.name.normalize('NFKC')
        return name === scheme.image
      })
      if (file) {
        $image.src = URL.createObjectURL(file)
        $image.onclick = () => {
          window.open($image.src)
        }
      } else {
        const image = pageSchemes.imagePath + scheme.image
        $image.src = image
        $image.onclick = () => {
          window.open(image)
        }
      }

      $box.appendChild($image)
    }

    if (scheme.footer) {
      const $footer = document.createElement('div')
      $footer.classList.add('footer')
      $footer.innerHTML = scheme.footer
      $box.appendChild($footer)
    }

    if (scheme.children.length > 0) {
      const $childContainer = document.createElement('div')
      $childContainer.classList.add('child-container')
      $container.appendChild($childContainer)

      renderNode(pageSchemes, scheme, files, $childContainer)
    }
  }
}
