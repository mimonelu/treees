export default (schemeText, $container) => {
  const { pageSchemes, nodeSchemes } = makeSchemes(schemeText)
  $container.innerHTML = ''
  render(pageSchemes, nodeSchemes, $container)
}

const makeSchemes = (text) => {
  const pageSchemes = { pageTitle: '', imagePath: '' }
  const nodeSchemes = { level: 0, children: [] }
  const parentNodes = [ nodeSchemes ]
  let currentNode = nodeSchemes
  let previousNode = null
  text.trim().split('\n').forEach((line) => {
    const directive = (line.match(/^#(.*)/) || [ '', '' ])[1]
    if (directive !== '') {
      const pageTitle = (directive.match(/pageTitle=([^;]*)/) || [ '', '' ])[1]
      if (pageTitle !== '') {
        pageSchemes.pageTitle = pageTitle
      }
      const imagePath = (directive.match(/imagePath=([^;]*)/) || [ '', '' ])[1]
      if (imagePath !== '') {
        pageSchemes.imagePath = imagePath
      }
      return
    }
    const level = line.match(/^ */)[0].length / 2
    const text = line.replace(/\/\/.*$/, '').trim()
    if (text === '') {
      return
    }
    const name = (text.match(/([^:]+)/) || [ '', '' ])[1]
    const header = (text.match(/header=([^;]*)/) || [ '', '' ])[1] || name
    const footer = (text.match(/footer=([^;]*)/) || [ '', '' ])[1]
    const image = (text.match(/image=([^;]*)/) || [ '', '' ])[1]
    const classes = (text.match(/class=([^;]*)/) || [ '', '' ])[1].split(',')
    const node = { level, children: [], name, header, footer, image, classes }
    if (previousNode) {
      if (level > previousNode.level) {
        parentNodes.push(previousNode)
        currentNode = previousNode
      } else if (level < previousNode.level) {
        parentNodes.splice(level + 1)
        currentNode = parentNodes[level]
      }
    }
    currentNode.children.push(node)
    previousNode = node
  })
  return { pageSchemes, nodeSchemes }
}

const render = (pageSchemes, nodeSchemes, $container) => {
  if (pageSchemes.pageTitle !== '') {
    const $pageTitle = document.createElement('div')
    $pageTitle.classList.add('page-title')
    $pageTitle.innerHTML = pageSchemes.pageTitle
    $container.appendChild($pageTitle)
  }

  renderNode(pageSchemes, nodeSchemes, $container)
}

const renderNode = (pageSchemes, nodeSchemes, $parent) => {
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
      const image = pageSchemes.imagePath + scheme.image
      $image.classList.add('image')
      $image.src = image
      $image.onclick = () => {
        window.open(image)
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

      renderNode(pageSchemes, scheme, $childContainer)
    }
  }
}
