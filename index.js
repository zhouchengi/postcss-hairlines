const postcss = require('postcss')

const propReg = /^border(-(top|right|bottom|left))?(-width)?/

module.exports = postcss.plugin(
  'postcss-hairlines',
  ({ hairlinesClass = 'hairlines', cssModules = false, ignoreComment = 'hairlines-ignore' } = {}) => {
    return (root) => {
      root.walkRules((rule) => {
        const ruleIgnore = rule.parent.nodes.filter((el) => el.type === 'comment' && el.text === ignoreComment)
        if (ruleIgnore.length) return
        if (rule.selector.indexOf(`.${hairlinesClass}`) !== -1) return
        const hasBorder = rule.nodes.filter((el) => {
          return el.type === 'decl' && el.prop.match(propReg)
        })
        if (hasBorder) {
          const hairlinesRule = postcss.rule({
            selector: cssModules
              ? `:global(.${hairlinesClass}) ${rule.selector}`
              : `.${hairlinesClass} ${rule.selector}`
          })
          rule.walkDecls(propReg, (decl, index) => {
            const declIgnore = decl.next() && decl.next().type === 'comment' && decl.next().text === ignoreComment
            if (declIgnore) return
            const is1px = decl.value.match(/1px/gi)
            if (is1px) {
              hairlinesRule.append({
                prop: decl.prop.match(/-width/) ? decl.prop : `${decl.prop}-width`,
                value: '0.5px'
              })
            }
          })

          if (hairlinesRule.nodes.length) {
            rule.after(hairlinesRule)
          }
        }
      })
    }
  }
)
