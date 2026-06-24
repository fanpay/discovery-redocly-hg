// Plugin: string-schemas-length-defined
//
// Declarative Redocly rules do not support requireAny or mutuallyRequired —
// this plugin implements the logic that cannot be expressed declaratively:
//
//   Every string schema must satisfy ONE of:
//     a) both minLength AND maxLength are defined, OR
//     b) enum is defined (set is already bounded), OR
//     c) format is defined (format implies known constraints)
//
// Payment-critical fields (accountNumber, routingNumber, terminalId, cardNumber)
// must declare minLength + maxLength so AI agents and code generators can
// validate values before sending. Without bounds an agent must guess — and
// guesses on financial identifiers fail in non-obvious ways at the processor.

/** @type {import('@redocly/cli').RuleDefinition} */
function stringLengthDefined() {
  return {
    Schema(node) {
      if (node.type !== 'string') return;

      const hasEnum = Array.isArray(node.enum) && node.enum.length > 0;
      const hasFormat = typeof node.format === 'string' && node.format.length > 0;
      const hasMinLength = typeof node.minLength === 'number';
      const hasMaxLength = typeof node.maxLength === 'number';
      const hasBothLengths = hasMinLength && hasMaxLength;

      if (!hasEnum && !hasFormat && !hasBothLengths) {
        if (hasMinLength || hasMaxLength) {
          // One side defined but not both — report the missing one specifically
          const missing = hasMinLength ? 'maxLength' : 'minLength';
          return {
            message: `String schema defines only one length bound — \`${missing}\` is also required. Add both, or use \`enum\` / \`format\` instead.`,
          };
        }

        return {
          message:
            'String schemas must define minLength + maxLength (or use enum/format). Required for agent request validation.',
        };
      }
    },
  };
}

module.exports = {
  id: 'payment-rules',
  rules: {
    oas3: {
      'string-schemas-length-defined': stringLengthDefined,
    },
  },
};
