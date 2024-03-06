import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from '../components/ITableOfContent.vue'

export default Node.create({
  name: 'tableOfContents',
  addGlobalAttributes() {
    return [
      {
        types: [
          'heading',
        ],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ]
  },
})