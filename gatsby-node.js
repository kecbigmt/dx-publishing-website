/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const remark = require('remark')
const remarkHTML = require('remark-html')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
              frontmatter {
                title
                templateKey
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
  }

  // { '/news/': 'お知らせ', '/products/': '本の紹介' }のようなslugとページタイトルの辞書を作る
  const slugDict = Object.fromEntries(result.data.allMarkdownRemark.edges.map(edge => [edge.node.fields.slug, edge.node.fields.frontmatter.title]))

  // '/products/creative-computing-workbook/'のようなslugから'/', '/products/', '/products/creative-computing-workbook/'のように上から順にパスを取り出しつつ、パンくずリストのデータを用意する関数　
  const makeBreadcrumbs = (slug, prevIndex) => {
    const currentIndex = slug.indexOf('/', prevIndex + 1 || 0)
    if (currentIndex === -1) {
      return [] 
    }
    const current = slug.slice(0, currentIndex + 1)
    return [{ label: slugDict[current], to: current }, ...splitSlug(slug, currentIndex)]
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (['news-page', 'news-post', 'static-page', 'top-page', 'product-item', 'products-page'].includes(node.fields.frontmatter.templateKey)) {
      const breadcrumbs = makeBreadcrumbs(node.fields.slug)
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/${node.fields.frontmatter.templateKey}.jsx`),
        context: {
          id: node.id,
          slug: node.fields.slug,
          breadcrumbs,
        }
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    if (node.frontmatter) {
      const iterateRemark = ([key, value]) => {
        // keyが___mdかつvalueがstring型のとき：
        // keyから___mdを取り除き、valueの文字列をMarkdown -> HTMLに変換して返す
        if (key.endsWith('___md') && typeof value === 'string') {
          return [key.slice(0, -5), remark().use(remarkHTML).processSync(value).toString()]
        }

        // keyが___mdかつvalueがArray型のとき：
        // keyから___mdを取り除き、value配列の要素が文字列ならMarkdown -> HTMLに変換し、文字列以外ならそのままにして返す
        if (key.endsWith('___md') && Array.isArray(value)) {
          return [key.slice(0, -5), value.map(v => (
            typeof v === 'string' ? remark().use(remarkHTML).processSync(value).toString() : v
          ))]
        }

        // valueがArray型のとき：
        /// value配列の要素がObjectならiterateRemark関数を再起適用し、そうでないならそのままにして返す
        if (Array.isArray(value)) {
          return [key, value.map(v => 
            Object.prototype.toString.call(v) === '[object Object]' ? 
              Object.fromEntries(Object.entries(v).map(iterateRemark)) 
              : v
            )]
        }
        
        // valueがObject型のとき：
        /// iterateRemark関数を再起適用して返す
        if (Object.prototype.toString.call(value) === '[object Object]') {
          return [key, Object.entries(value).map(iterateRemark)]
        }

        // いずれでもないとき：何もせずに返す
        return [key, value]
      }
      const value = Object.fromEntries(Object.entries(node.frontmatter).map(iterateRemark))
      createNodeField({
        name: `frontmatter`,
        node,
        value,
      })
    }
  }
}