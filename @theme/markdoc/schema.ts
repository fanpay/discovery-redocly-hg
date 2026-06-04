import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  'gsap-hello': {
    render: 'GsapHello',
    selfClosing: true,
  },
  br: {
    render: 'Break',
    selfClosing: true,
  },
  quiz: {
    attributes: {
      title: { type: String },
      summary: { type: String },
      questions: {
        type: 'Object',
        required: true,
      },
    },
    render: 'Quiz',
  },
};
