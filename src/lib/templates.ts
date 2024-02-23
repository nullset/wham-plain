export const defaultStyle = `
:root {
  --background: rgb(0, 115, 207);
  --shadow: rgba(0, 0, 0, 0.3);
}
#favicon {
  line-height: 0;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  background: var(--background);
}
#emoji {
  font-size: 280px;
  text-shadow: 0 0 10px var(--shadow);  
}
`;

export function generateFavicon({
  size = 16,
  styles = "",
  html = "😜",
  hue = 0,
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 300 300">
    <style>
      * {
        box-sizing: border-box;
      }
      ${styles.trim()}
    </style>
    <g fill="none">
      <foreignObject x="0" y="0" width="300" height="300">
        <div id="favicon" xmlns="http://www.w3.org/1999/xhtml">
          <div id="emoji" style="filter: hue-rotate(${hue}deg)">${html.trim()}</div>
        </div>
      </foreignObject>
    </g>
  </svg>`;
}
