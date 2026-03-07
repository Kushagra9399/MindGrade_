import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    MathJax: any;
  }
}

interface MathRendererProps {
  text: string;
  className?: string;
  inline?: boolean;
}

const MathRenderer: React.FC<MathRendererProps> = ({ text, className = "", inline = false }) => {
  const ref = useRef<HTMLDivElement>(null);

  const processText = (input: string) => {
    if (!input) return "";

    let processed = input;

    const dollarCount = (processed.match(/(?<!\\)\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      processed += " $";
    }

    processed = processed.replace(/\n{5,}/g, '\n\n\n\n');

    processed = processed.replace(/(\n|^)\s*-\s/g, '$1&bull; ');

    return processed;
  };

  useEffect(() => {
    let isMounted = true;

    const renderMath = async () => {
      if (window.MathJax && ref.current) {
        ref.current.innerHTML = processText(text);

        try {
          await window.MathJax.typesetPromise([ref.current]);
        } catch (err) {
          if (isMounted && window.MathJax.typesetClear) {
            try {
              window.MathJax.typesetClear([ref.current]);
              await window.MathJax.typesetPromise([ref.current]);
            } catch (e) {}
          }
        }
      }
    };

    renderMath();

    return () => { isMounted = false; };
  }, [text]);

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      ref={ref}
      className={`math-content ${className} text-inherit leading-loose tracking-wide whitespace-pre-wrap`}
      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
    />
  );
};

export default MathRenderer;