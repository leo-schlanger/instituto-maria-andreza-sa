function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inline(text) {
  const re = /https?:\/\/[^\s<>"]+/g;
  let out = "";
  let last = 0;
  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0;
    out += escapeHtml(text.slice(last, index));
    let url = match[0];
    let trail = "";
    while (url.length > 8 && /[.,;:)]$/.test(url)) {
      trail = url.slice(-1) + trail;
      url = url.slice(0, -1);
    }
    const safe = escapeHtml(url);
    out += `<a href="${safe}" target="_blank" rel="noopener">${safe}</a>${escapeHtml(trail)}`;
    last = index + match[0].length;
  }
  out += escapeHtml(text.slice(last));
  return out;
}

function renderBlock(block) {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (lines.length === 0) return "";
  if (lines.length === 1 && lines[0].startsWith("## ")) return `<h2>${inline(lines[0].slice(3))}</h2>`;
  if (lines.length === 1 && lines[0].startsWith("# ")) return `<h1>${inline(lines[0].slice(2))}</h1>`;
  if (lines.every((line) => line.startsWith("- "))) {
    return `<ul>${lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join("")}</ul>`;
  }
  return `<p>${inline(lines.join(" "))}</p>`;
}

export function renderLegalMarkdown(source) {
  return source
    .replaceAll("\r\n", "\n")
    .trim()
    .split(/\n{2,}/)
    .map(renderBlock)
    .filter(Boolean)
    .join("\n");
}
