import { plugin } from '@css-inject/plugin'

describe('The plugin', () => {
  it('should be a function', () => {
    expect(typeof plugin).toEqual('function')
  })

  it('adds the correct configuration', () => {
    const instance = plugin()

    expect(instance.name).toEqual('vite:inject')
    expect(instance.apply).toEqual('build')
    expect(instance.enforce).toEqual('post')
  })
})

describe('The renderChunk function', () => {
  const code = `import './should-be-before';`

  it('can return the replaced import', () => {
    const instance: any = plugin()

    const fileName = './__mocks__/test.css'
    const importedCss = new Set<string>()
    importedCss.add(fileName)

    const chunk = {
      viteMetadata: { importedCss },
      fileName,
    }

    const renderedChunk = instance.renderChunk(code, chunk)
    expect(renderedChunk.code).toMatch(/should.*be.*before.*import '.\/test.css';/gs)
  })

  it('returns null without metadata', () => {
    const instance: any = plugin()

    expect(instance.renderChunk(code, {})).toEqual(null)
  })

  it('returns null without css', () => {
    const instance: any = plugin()

    const chunk = { viteMetadata: { importedCss: new Set() } }
    expect(instance.renderChunk(code, chunk)).toEqual(null)
  })

  it('errors on unexpected css imports', () => {
    const instance: any = plugin()

    const importedCss = new Set()
    importedCss.add('1')
    importedCss.add('2')
    const chunk = { viteMetadata: { importedCss } }

    expect(() => instance.renderChunk(code, chunk)).toThrow()
  })

  it('returns null when file does not exist', () => {
    const instance: any = plugin()

    const importedCss: string[] = []
    Object.assign(importedCss, { size: 1 })

    const chunk = { viteMetadata: { importedCss } }
    expect(instance.renderChunk(code, chunk)).toEqual(null)
  })
})
