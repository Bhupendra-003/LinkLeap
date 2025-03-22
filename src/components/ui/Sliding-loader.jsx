import React from 'react';

const SlidingSquare = ({ color = 'darkorange' }) => {
    const squareStyle = {
        backgroundColor: color,
        border: 'none',
        borderRadius: '2px',
        width: '26px',
        height: '26px',
        position: 'absolute',
        padding: '0px',
        margin: '0px',
        fontSize: '6pt',
        color: 'black',
    };

    return (
        <div style={{ height: '100%', background: 'rgb(40, 44, 52)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: 'calc(3 * 30px + 26px)',
                height: 'calc(2 * 30px + 26px)',
                padding: '0px',
                margin: '10px auto 30px auto',
                position: 'relative',
            }}>
                <div
                    id="square1"
                    style={{
                        ...squareStyle,
                        left: 'calc(0 * 30px)',
                        top: 'calc(0 * 30px)',
                        animation: 'square1 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s 0.1s ease-out both',
                    }}
                />
                <div
                    id="square2"
                    style={{
                        ...squareStyle,
                        left: 'calc(0 * 30px)',
                        top: 'calc(1 * 30px)',
                        animation: 'square2 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s 0.2s ease-out both',
                    }}
                />
                <div
                    id="square3"
                    style={{
                        ...squareStyle,
                        left: 'calc(1 * 30px)',
                        top: 'calc(1 * 30px)',
                        animation: 'square3 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s 0.3s ease-out both',
                    }}
                />
                <div
                    id="square4"
                    style={{
                        ...squareStyle,
                        left: 'calc(2 * 30px)',
                        top: 'calc(1 * 30px)',
                        animation: 'square4 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s 0.4s ease-out both',
                    }}
                />
                <div
                    id="square5"
                    style={{
                        ...squareStyle,
                        left: 'calc(3 * 30px)',
                        top: 'calc(1 * 30px)',
                        animation: 'square5 2.4s 0.2s ease-in-out infinite, squarefadein 0.4s 0.5s ease-out both',
                    }}
                />
            </div>
        </div>
    );
};

export default SlidingSquare;

// Add the following CSS animations globally in the application (e.g., in index.css)
const globalStyles = `
  @keyframes square1 {
    0% { left: calc(0 * 30px); top: calc(0 * 30px); }
    8.333% { left: calc(0 * 30px); top: calc(1 * 30px); }
    100% { left: calc(0 * 30px); top: calc(1 * 30px); }
  }

  @keyframes square2 {
    0% { left: calc(0 * 30px); top: calc(1 * 30px); }
    8.333% { left: calc(0 * 30px); top: calc(2 * 30px); }
    16.67% { left: calc(1 * 30px); top: calc(2 * 30px); }
    25% { left: calc(1 * 30px); top: calc(1 * 30px); }
    83.33% { left: calc(1 * 30px); top: calc(1 * 30px); }
    91.67% { left: calc(1 * 30px); top: calc(0 * 30px); }
    100% { left: calc(0 * 30px); top: calc(0 * 30px); }
  }

  @keyframes square3 {
    0%, 100% { left: calc(1 * 30px); top: calc(1 * 30px); }
    16.67% { left: calc(1 * 30px); top: calc(1 * 30px); }
    25% { left: calc(1 * 30px); top: calc(0 * 30px); }
    33.33% { left: calc(2 * 30px); top: calc(0 * 30px); }
    41.67% { left: calc(2 * 30px); top: calc(1 * 30px); }
    66.67% { left: calc(2 * 30px); top: calc(1 * 30px); }
    75% { left: calc(2 * 30px); top: calc(2 * 30px); }
    83.33% { left: calc(1 * 30px); top: calc(2 * 30px); }
    91.67% { left: calc(1 * 30px); top: calc(1 * 30px); }
  }

  @keyframes square4 {
    0% { left: calc(2 * 30px); top: calc(1 * 30px); }
    33.33% { left: calc(2 * 30px); top: calc(1 * 30px); }
    41.67% { left: calc(2 * 30px); top: calc(2 * 30px); }
    50% { left: calc(3 * 30px); top: calc(2 * 30px); }
    58.33% { left: calc(3 * 30px); top: calc(1 * 30px); }
    100% { left: calc(3 * 30px); top: calc(1 * 30px); }
  }

  @keyframes square5 {
    0% { left: calc(3 * 30px); top: calc(1 * 30px); }
    50% { left: calc(3 * 30px); top: calc(1 * 30px); }
    58.33% { left: calc(3 * 30px); top: calc(0 * 30px); }
    66.67% { left: calc(2 * 30px); top: calc(0 * 30px); }
    75% { left: calc(2 * 30px); top: calc(1 * 30px); }
    100% { left: calc(2 * 30px); top: calc(1 * 30px); }
  }

  @keyframes squarefadein {
    0% { transform: scale(0.75); opacity: 0.0; }
    100% { transform: scale(1.0); opacity: 1.0; }
  }
`;

// Inject global styles into the document
const styleTag = document.createElement("style");
styleTag.innerHTML = globalStyles;
document.head.appendChild(styleTag);
