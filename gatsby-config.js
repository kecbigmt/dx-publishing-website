const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: `.env.${activeEnv}.local`
})

console.log(`Environment: ${activeEnv}`)
console.log(`Google Analytics Tracking Id: ${process.env.GA_TRACKING_ID}`)

module.exports = {
  siteMetadata: {
    title: `DX出版`,
    description: `Amazonのプリント・オンデマンドでの出版を手掛ける出版者、DX出版のホームページ。DX出版の概要・書籍・お知らせなどをご覧いただけます。`,
    siteUrl: `https://dx-publishing.jp/`,
    // TODO: Twitterアカウントを作ったときに追加。SEO設定をする
    // author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sass',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DX出版`,
        short_name: `DX出版`,
        start_url: `/`,
        background_color: `#D9D7DC`,
        theme_color: `#1a54b8`,
        display: `minimal-ui`,
        icon: `src/images/dx-publishing-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [
          `/contact-success`
        ],
      },
    },
  ],
}
