/**
 * Builds a clean, properly indented PDF from a rendered chapter article.
 * Walks the DOM in order and emits headings, paragraphs, bullets and code blocks.
 */
export async function downloadChapterPdf(
  el: HTMLElement,
  title: string,
  unit: string,
  blurb: string,
) {
  const { default: jsPDF } = await import("jspdf");

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 56;
  const contentWidth = pageWidth - margin * 2;
  const bottom = pageHeight - margin;
  let y = margin;

  const newPage = () => {
    pdf.addPage();
    y = margin;
  };

  const ensure = (h: number) => {
    if (y + h > bottom) newPage();
  };

  type TextOpts = {
    size?: number;
    bold?: boolean;
    italic?: boolean;
    color?: [number, number, number];
    indent?: number;
    hanging?: number;
    gapAfter?: number;
    lineFactor?: number;
  };

  const text = (raw: string, opts: TextOpts = {}) => {
    const {
      size = 10.5,
      bold = false,
      italic = false,
      color = [34, 34, 34],
      indent = 0,
      hanging = 0,
      gapAfter = 6,
      lineFactor = 1.45,
    } = opts;
    const value = raw.replace(/\s+/g, " ").trim();
    if (!value) return;

    const style = bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal";
    pdf.setFont("helvetica", style);
    pdf.setFontSize(size);
    pdf.setTextColor(color[0], color[1], color[2]);

    const width = contentWidth - indent - hanging;
    const lines = pdf.splitTextToSize(value, width) as string[];
    const lineHeight = size * lineFactor;

    lines.forEach((line, i) => {
      ensure(lineHeight);
      // Re-assert font after a possible page break
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
      pdf.setTextColor(color[0], color[1], color[2]);
      pdf.text(line, margin + indent + (i === 0 ? 0 : hanging), y + size);
      y += lineHeight;
    });
    y += gapAfter;
  };

  const bullet = (raw: string, indent = 12) => {
    const value = raw.replace(/\s+/g, " ").trim();
    if (!value) return;
    const size = 10.5;
    const lineHeight = size * 1.45;
    ensure(lineHeight);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(34, 34, 34);
    pdf.text("•", margin + indent, y + size);
    text(value, { indent: indent + 12, hanging: 0, gapAfter: 2 });
    void lineHeight;
  };

  const codeBlock = (code: string, indent = 0) => {
    const raw = code.replace(/\u00a0/g, " ").replace(/\t/g, "    ").replace(/\s+$/, "");
    if (!raw.trim()) return;
    const size = 8.5;
    const lineHeight = size * 1.4;
    const padX = 10;
    const padY = 8;
    const boxWidth = contentWidth - indent;

    pdf.setFont("courier", "normal");
    pdf.setFontSize(size);

    // Wrap while preserving each source line's leading indentation.
    const lines: string[] = [];
    for (const line of raw.split("\n")) {
      if (!line.trim()) {
        lines.push("");
        continue;
      }
      const lead = line.match(/^\s*/)?.[0] ?? "";
      const wrapped = pdf.splitTextToSize(line, boxWidth - padX * 2) as string[];
      wrapped.forEach((w, i) => lines.push(i === 0 ? w : lead + "  " + w.trimStart()));
    }

    let i = 0;
    while (i < lines.length) {
      if (y + lineHeight + padY * 2 > bottom) newPage();
      const available = Math.floor((bottom - y - padY * 2) / lineHeight);
      const chunk = lines.slice(i, i + Math.max(available, 1));
      const boxHeight = chunk.length * lineHeight + padY * 2;

      pdf.setFillColor(245, 246, 250);
      pdf.setDrawColor(222, 226, 236);
      pdf.rect(margin + indent, y, boxWidth, boxHeight, "FD");

      pdf.setFont("courier", "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(28, 30, 38);
      let ty = y + padY;
      for (const line of chunk) {
        pdf.text(line, margin + indent + padX, ty + size * 0.9);
        ty += lineHeight;
      }

      y += boxHeight;
      i += chunk.length;
      if (i < lines.length) newPage();
    }
    y += 10;
  };

  const rule = () => {
    ensure(12);
    pdf.setDrawColor(226, 230, 238);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 12;
  };

  const skipTag = new Set(["BUTTON", "SVG", "SCRIPT", "STYLE", "INPUT", "SELECT", "NAV"]);

  const cleanText = (node: Element) => {
    const clone = node.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("button, svg, script, style, input, select, textarea, pre").forEach((n) =>
      n.remove(),
    );
    return (clone.textContent ?? "").replace(/\s+/g, " ").trim();
  };

  const walk = (node: Element, depth = 0) => {
    const tag = node.tagName;
    if (skipTag.has(tag)) return;
    if (node instanceof HTMLElement && node.dataset["pdfSkip"] === "true") return;

    if (node instanceof HTMLElement && node.dataset["pdfBlock"] === "pre-text") {
      (node.textContent ?? "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((line) =>
          /^[-*•]/.test(line)
            ? bullet(line.replace(/^[-*•]\s*/, ""))
            : text(line, { indent: 10, gapAfter: 3 }),
        );
      y += 6;
      return;
    }


    if (tag === "H2") {
      ensure(30);
      text(cleanText(node), { size: 15, bold: true, color: [17, 24, 39], gapAfter: 8 });
      return;
    }
    if (tag === "H3" || tag === "H4") {
      text(cleanText(node), { size: 12, bold: true, color: [31, 41, 55], gapAfter: 6 });
      return;
    }
    if (tag === "PRE") {
      codeBlock(node.textContent ?? "", depth > 0 ? 10 : 0);
      return;
    }
    if (tag === "TEXTAREA") {
      codeBlock((node as HTMLTextAreaElement).value, depth > 0 ? 10 : 0);
      return;
    }
    if (tag === "UL" || tag === "OL") {
      const ordered = tag === "OL";
      Array.from(node.children).forEach((li, i) => {
        if (li.tagName !== "LI") return;
        const t = cleanText(li);
        if (!t) return;
        if (ordered) {
          text(`${i + 1}. ${t}`, { indent: 12, hanging: 14, gapAfter: 2 });
        } else {
          bullet(t);
        }
      });
      y += 6;
      return;
    }
    if (tag === "P") {
      text(cleanText(node), { gapAfter: 8 });
      return;
    }
    if (tag === "TABLE") {
      node.querySelectorAll("tr").forEach((tr) => {
        const cells = Array.from(tr.children).map((c) => cleanText(c)).filter(Boolean);
        if (cells.length) text(cells.join("  |  "), { size: 9.5, indent: 10, gapAfter: 2 });
      });
      y += 6;
      return;
    }

    // Container: recurse. If it has no element children, print its text.
    const children = Array.from(node.children).filter((c) => !skipTag.has(c.tagName));
    if (children.length === 0) {
      const t = cleanText(node);
      if (t) text(t, { gapAfter: 6 });
      return;
    }
    children.forEach((child) => walk(child, depth + 1));
  };

  // ---- Cover header ----
  text(unit.toUpperCase(), { size: 9, bold: true, color: [37, 99, 235], gapAfter: 4 });
  text(title, { size: 21, bold: true, color: [15, 23, 42], gapAfter: 6 });
  text(blurb, { size: 10.5, italic: true, color: [100, 106, 120], gapAfter: 10 });
  rule();

  const sections = Array.from(el.children).filter((c) => c.tagName === "SECTION");
  const roots = sections.length ? sections : Array.from(el.children);
  roots.forEach((section, i) => {
    if (i > 0) {
      y += 4;
      rule();
    }
    walk(section);
  });

  // Footer page numbers
  const total = pdf.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    pdf.setPage(p);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(150, 155, 165);
    pdf.text(`${title} · CodeLearners`, margin, pageHeight - 24);
    pdf.text(`${p} / ${total}`, pageWidth - margin, pageHeight - 24, { align: "right" });
  }

  const safe = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  pdf.save(`${safe}-notes.pdf`);
}
