export const defaultStyle = `
#favicon {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  background: rgba(0, 115, 207, 0.5);
}
#emoji {
  font-size: 280px;
  text-shadow: 0 0 3dvh black;  
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
