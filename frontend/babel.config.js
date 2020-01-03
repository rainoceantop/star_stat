module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  plugins: [
    [// 这里配置ant design组件按需加载
      'import',
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}
