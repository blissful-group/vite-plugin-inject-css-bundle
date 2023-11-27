import path from 'path'
import MagicString from 'magic-string'
import type { Plugin } from 'vite'

export function plugin(): Plugin {
  return {
    name: 'vite:inject',
    apply: 'build',
    enforce: 'post',
    renderChunk: (code, chunk) => {
      if (!chunk?.viteMetadata) {
        return null
      }

      const { importedCss } = chunk.viteMetadata
      if (!importedCss.size) {
        return null
      }

      if (importedCss.size > 1) {
        throw new Error(`unexpected importedCss.size > 1 in chunk ${chunk.fileName}`)
      }

      const codeInjectionPoint = code.indexOf(';', code.lastIndexOf('import')) + 1
      const file = [...importedCss].at(0)

      if (!file) {
        return null
      }

      const relativeFilePath = path.relative(path.dirname(chunk.fileName), file).replaceAll(/[\\/]+/g, '/')
      const filePath = relativeFilePath.startsWith('.') ? relativeFilePath : `./${relativeFilePath}`
      const importStatement = `\nimport '${filePath}';`

      const ms = new MagicString(code)
      ms.appendRight(codeInjectionPoint, importStatement)

      return {
        code: ms.toString(),
        map: ms.generateMap(),
      }
    },
  }
}
