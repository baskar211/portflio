type DescriptionSection = {
  title: string;
  paragraphs: string[];
  bullets: string[];
};

function cleanMarkdown(value: string) {
  return value.replace(/\*\*/g, "").replace(/^\s*[-*]\s*/, "").trim();
}

function parseDescription(description: string): DescriptionSection[] {
  const sections: DescriptionSection[] = [];
  let current: DescriptionSection = { title: "Overview", paragraphs: [], bullets: [] };
  const source = description
    .replace(/\s+(?=\*\*(?:Key Features|Technical Highlights|Overview)\*\*)/gi, "\n")
    .replace(/\s+\*\s+(?=\*\*)/g, "\n* ");

  source.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    const heading = line.match(/^\*\*(.+?)\*\*:?$/);
    if (heading) {
      if (current.paragraphs.length || current.bullets.length) sections.push(current);
      current = { title: cleanMarkdown(heading[1]), paragraphs: [], bullets: [] };
      return;
    }

    const bullet = line.match(/^(?:\*|-|•)\s+(.+)/);
    if (bullet) current.bullets.push(cleanMarkdown(bullet[1]));
    else current.paragraphs.push(cleanMarkdown(line));
  });

  if (current.paragraphs.length || current.bullets.length) sections.push(current);
  return sections;
}

export default function ProjectDescription({ description }: { description: string }) {
  const sections = parseDescription(description);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {sections.map((section, index) => (
        <section key={`${section.title}-${index}`} className={`rounded-2xl border p-6 ${index === 0 ? "border-indigo-100 bg-indigo-50/70 md:col-span-2" : "border-gray-200 bg-white"}`}>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
          </div>
          <div className="space-y-3 text-[15px] leading-7 text-gray-600">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 rounded-xl bg-gray-50 p-3 text-sm leading-6 text-gray-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}