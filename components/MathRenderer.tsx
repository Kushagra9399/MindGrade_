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

    // 1. Fix double-escaping (turns \\frac into \frac)
    processed = processed.replace(/\\\\/g, '\\');

    // 2. Auto-wrap common LaTeX commands if they aren't inside $...$
    // This handles cases where the AI says "\sqrt{x}" instead of "$\sqrt{x}$"
    const commonCommands = ['sqrt', 'frac', 'sum', 'int', 'triangle', 'angle', 'alpha', 'beta', 'theta', 'pi', 'pm', 'times', 'div'];
    commonCommands.forEach(cmd => {
      // Regex: Find \command NOT preceded by a $ and NOT followed by a $
      const regex = new RegExp(`(?<!\\$)\\\\${cmd}(?![^$]*\\$)`, 'g');
      // We wrap the specific command and its immediate curly braces content
      // Note: This is a simplified regex; for complex nested math, $ delimiters are always better.
      processed = processed.replace(regex, (match) => `$${match}$`);
    });

    // 3. Balance Dollar Signs
    const dollarCount = (processed.match(/(?<!\\)\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      processed += " $";
    }

    // 4. Handle whitespace and bullet points for normal text
    processed = processed.replace(/\n/g, '<br/>'); // Convert newlines to HTML breaks
    processed = processed.replace(/(\n|^)\s*-\s/g, '$1&bull; ');

    return processed;
  };

  useEffect(() => {
    let isMounted = true;

    const renderMath = async () => {
      if (window.MathJax && ref.current) {
        // Use innerHTML because processText now returns mixed HTML/Text
        ref.current.innerHTML = processText(text);

        try {
          // Promise-based typesetting ensures math is rendered after DOM update
          await window.MathJax.typesetPromise([ref.current]);
        } catch (err) {
          console.error("MathJax error:", err);
          if (isMounted) {
            window.MathJax.typesetClear?.([ref.current]);
            window.MathJax.typesetPromise?.([ref.current]);
          }
        }
      }
    };

    renderMath();
    return () => { isMounted = false; };
  }, [text]);

  // Use 'span' for inline math in results/lists, 'div' for block questions
  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      ref={ref}
      className={`math-content ${className} tex2jax_process leading-relaxed`}
      style={{ wordBreak: 'break-word', overflowWrap: 'break-word', display: inline ? 'inline' : 'block' }}
    />
  );
};

export default MathRenderer;
// import React, { useEffect, useRef } from 'react';

// declare global {
//   interface Window {
//     MathJax: any;
//   }
// }

// interface MathRendererProps {
//   text: string;
//   className?: string;
//   inline?: boolean;
// }

// const MathRenderer: React.FC<MathRendererProps> = ({ text, className = "", inline = false }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const processText = (input: string) => {
//     if (!input) return "";

//     let processed = input;

//     // FIX 1: Normalize the backslashes BEFORE counting dollars
//     // This turns \\triangle into \triangle
//     processed = processed.replace(/\\\\/g, '\\');

//     // FIX 2: Ensure we don't accidentally close an unclosed dollar sign
//     const dollarCount = (processed.match(/(?<!\\)\$/g) || []).length;
//     if (dollarCount % 2 !== 0) {
//       processed += " $";
//     }

//     processed = processed.replace(/\n{5,}/g, '\n\n\n\n');

//     processed = processed.replace(/(\n|^)\s*-\s/g, '$1&bull; ');

//     return processed;
//   };

//   useEffect(() => {
//     let isMounted = true;

//     const renderMath = async () => {
//       if (window.MathJax && ref.current) {
//         ref.current.innerHTML = processText(text);

//         try {
//           await window.MathJax.typesetPromise([ref.current]);
//         } catch (err) {
//           if (isMounted && window.MathJax.typesetClear) {
//             try {
//               window.MathJax.typesetClear([ref.current]);
//               await window.MathJax.typesetPromise([ref.current]);
//             } catch (e) {}
//           }
//         }
//       }
//     };

//     renderMath();

//     return () => { isMounted = false; };
//   }, [text]);

//   const Tag = inline ? 'span' : 'div';

//   return (
//     <Tag
//       ref={ref}
//       className={`math-content ${className} text-inherit leading-loose tracking-wide whitespace-pre-wrap`}
//       style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
//     />
//   );
// };

// export default MathRenderer;