const postcss = require('postcss')

const plugin = require('./')

async function run(input, output, opts) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('border', async () => {
  await run('a { border: 1px #000 solid; }', 'a { border: 1px #000 solid; }\n.hairlines a { border-width: 0.5px; }', {})
})

it('single border', async () => {
  await run(
    'a{ border-top: 1px #000 solid; }',
    'a{ border-top: 1px #000 solid; }\n.hairlines a{ border-top-width: 0.5px; }',
    {}
  )
})

it('border width', async () => {
  await run('a{ border-top-width: 1px; }', 'a{ border-top-width: 1px; }\n.hairlines a{ border-top-width: 0.5px; }', {})
})

it('single border width', async () => {
  await run('a{ border-width: 1px; }', 'a{ border-width: 1px; }\n.hairlines a{ border-width: 0.5px; }', {})
})

it('composite border', async () => {
  await run(
    'a{ border: 1px #f00 solid; border-top: 1px #0f0 solid; border-top-width: 1px; }',
    'a{ border: 1px #f00 solid; border-top: 1px #0f0 solid; border-top-width: 1px; }\n.hairlines a{ border-width: 0.5px; border-top-width: 0.5px; border-top-width: 0.5px; }',
    {}
  )
})

it('rule ignore', async () => {
  await run(
    `
      /* hairlines-ignore */
      a {
        border: 1px #000 solid;
      }
    `,
    `
      /* hairlines-ignore */
      a {
        border: 1px #000 solid;
      }
    `,
    {}
  )
})

it('decl ignore', async () => {
  await run(
    `
      a {
        border: 1px #000 solid; /* hairlines-ignore */
      }
    `,
    `
      a {
        border: 1px #000 solid; /* hairlines-ignore */
      }
    `,
    {}
  )
})
