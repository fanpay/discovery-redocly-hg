import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  'gsap-hello': {
    render: 'GsapHello',
    selfClosing: true,
  },
};
