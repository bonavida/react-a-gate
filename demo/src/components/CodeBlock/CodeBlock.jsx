import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
/** Styles */
import './CodeBlock.scss';

const CodeBlock = ({ language = 'javascript', value }) => {
  return (
    <SyntaxHighlighter className="codeblock" language={language} style={prism}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
