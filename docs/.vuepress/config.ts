import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    // 站点配置
    lang: 'zh-CN',
    title: '2023hvv漏洞收集',
    description: 'Ciallo～(∠・ω< )⌒☆',
    base: '/',
    head: [
        ['link', { rel: 'icon', href: '/images/www/宁宁.jpg' }]
    ],
    plugins: [
        ['@vuepress/back-to-top'],
        [
            '@vuepress/pwa',
            {
                skipWaiting: true
            }
        ],
        [
            '@vuepress/plugin-pwa-popup',
            {
                locales: {
                    '/': {
                        message: '发现新内容可用',
                        buttonText: '刷新',
                    }
                }
            }
        ],
        [
            '@vuepress/plugin-google-analytics',
            {
                id: 'G-0PQPMKMWLP'
            }
        ],
        [
            "@vuepress/plugin-docsearch",
            {
                appId: '853MBK3DG8',
                apiKey: 'ee36841771b23b4f1d3eb6a93e49177e',
                indexName: '853MBK3DG8',
                algoliaOptions: {
                    facetFilters: ["lang:en-US"],
                },
            }
        ]
    ],

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        repo: 'Redmomn/hvv-2023',
        docsRepo: 'Redmomn/hvv-2023',
        docsBranch: 'master',
        docsDir: 'docs',
        editLinkText: "编辑此页",
        lastUpdated: true,
        lastUpdatedText: '上一次编辑',
        contributors: true,
        tip: "提示",
        warning: "注意",
        danger: "警告",
        backToHome: "返回首页",
        navbar: [
            { text: '开始', link: '/guide/' },
            { text: '漏洞', children: ['/wiki/', '/wiki/重点漏洞.md'] }
        ],
        // navbar: [
        //     { text: 'Guide', children: ['/guide/', '/guide/quick_start.md', '/guide/config.md', '/guide/eventfilter.md', '/guide/file.md', '/guide/achieve.md', '/guide/docker.md'] },
        //     { text: 'API', children: ['/api/', '/api/guild.md'] },
        //     { text: 'Event', children: ['/event/', '/event/guild.md'] },
        //     { text: 'CQ Code', link: '/cqcode/' },
        //     { text: 'Guild', link: '/guild/'},
        //     { text: 'Reference', children: ['/reference/', '/reference/data_struct.md'] },
        //     { text: 'Advanced', link: '/advanced/'},
        //     { text: 'FAQ', link: '/faq/' }
        // ],
        sidebar: "auto",
    },

})
