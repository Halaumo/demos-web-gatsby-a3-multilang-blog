const path = require('path')

// import aliases
exports.onCreateWebpackConfig = async ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'libs'),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const POSTSPERPAGE = 3

  const tagsData = await graphql(`
    {
      allContentfulTags(filter: {node_locale: {eq: "en"}}) {
        nodes {
          tag
        }
      }
    }
  `)

  if (tagsData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const tags = tagsData.data.allContentfulTags.nodes

  {
    for (const { tag } of tags) {
      const posts = await graphql(`
        query ($tag: String!) {
          allContentfulPosts(
            filter: {
              node_locale: {eq: "en"},
              tags: {elemMatch: {tag: {eq: $tag}}}
            },
            sort: {fields: publishingDate, order: ASC}
          ) {
            nodes {
              slug
            }
          }
        }
      `, { tag })

      if (posts.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
      }

      const count = posts.data.allContentfulPosts.nodes.length
      const numPages = Math.ceil(count / POSTSPERPAGE)

      for (let i = 0; i < numPages; i++) {
        createPage({
          path: i === 0 ? `/${tag}` : `/${tag}/${i + 1}`,
          component: path.resolve(`./src/templates/tags/index.tsx`),
          context: {
            limit: POSTSPERPAGE,
            skip: POSTSPERPAGE * i,
            tag,
            numPages,
            currentPage: i + 1,
          },
        })
      }
    }
  }

  {
    const posts = await graphql(`
      {
        allContentfulPosts(filter: {node_locale: {eq: "en"}}, sort: {fields: publishingDate, order: ASC}) {
          nodes {
            slug
          }
        }
      }
    `)

    if (posts.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    const count = posts.data.allContentfulPosts.nodes.length
    const numPages = Math.ceil(count / POSTSPERPAGE)

    for (let i = 0; i < numPages; i++) {
      createPage({
        path: i === 0 ? '/' : `/${i + 1}`,
        component: path.resolve(`./src/templates/home/index.tsx`),
        context: {
          limit: POSTSPERPAGE,
          skip: POSTSPERPAGE * i,
          numPages,
          currentPage: i + 1,
        },
      })
    }
  }

}
