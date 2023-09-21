<template>
    <div class="code-editor" contenteditable="true" ref="editableDiv" @input="highlightCode" @keydown.enter.prevent="handleEnterKey"></div>
</template>

<script>
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/default.css'
export default {
  props: {
    value: String
  },
  mounted() {
    hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
    hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
    this.highlightCode(this.value)
    this.$refs.editableDiv.focus()
  },
  methods: {
    highlightCode(c) {
      console.log('高亮')
      const editableDiv = this.$refs.editableDiv
      const code = typeof c === 'string' ? c : editableDiv.innerText
      const highlightedCode = hljs.highlightAuto(code).value
      this.$refs.editableDiv.innerHTML = highlightedCode
      const selection = window.getSelection() //创建range
      selection.selectAllChildren(editableDiv) //range 选择obj下所有子内容
      selection.collapseToEnd() //光标移至最后
     this.$emit('input', this.$refs.editableDiv.textContent)
    },
    handleEnterKey(e) {
      console.log('换行')
      e.preventDefault() //Prevent default browser behavior
      if (window.getSelection) {
        let selection = window.getSelection(),
          range = selection.getRangeAt(0),
          br = document.createElement('br'),
          textNode = document.createTextNode('\n')
        range.insertNode(br)
        range.collapse(false)
        range.insertNode(textNode)
        range.selectNodeContents(textNode)

        selection.removeAllRanges()
        selection.addRange(range)
        return false
      }
    }
  }
}
</script>
<style scoped>
.code-editor {
  min-height: 400px;
  border: 1px dashed;
  padding: 15px;
  text-align: left;
  background: #333;
  color: #fff;
  white-space: pre-line;
  word-wrap: break-word; /*遇到空格整个单词显示不完就自动换行到下一行*/
  word-break: break-all; /*如果一行没有空格就到头截断单词换行*/
}

::selection {
  background-color: yellow;
  color: #333;
}

.highlighted-range::before {
  content: '';
  position: absolute;
  background-color: rgba(0, 0, 255, 0.3);
}
</style>
