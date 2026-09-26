import { useMemo, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  Film,
  ImageDown,
  LibraryBig,
  Pause,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Volume2,
} from "lucide-react";

import rainBook from "@/assets/book-rain-window.jpg";
import moonBook from "@/assets/book-midnight-moon.jpg";
import teaBook from "@/assets/book-solitude-tea.jpg";
import flowerBook from "@/assets/book-flowers-sun.jpg";
import autumnBook from "@/assets/book-autumn-desk.jpg";
import seaBook from "@/assets/book-sea-breeze.jpg";
import forestBook from "@/assets/book-forest-moss.jpg";
import roseBook from "@/assets/book-rose-evening.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Template = {
  id: number;
  title: string;
  category: string;
  image: string;
  position: string;
  tone: string;
  quoteTop: number;
  ink: string;
  quoteWidth: number;
  quoteLeft: number;
  quoteRotate: number;
};

const scenes = [
  { title: "বৃষ্টির জানালা", category: "বৃষ্টি", image: rainBook, position: "center", tone: "tone-cool", quoteTop: 62, quoteLeft: 70, quoteWidth: 34, quoteRotate: 1.2, ink: "#31251c" },
  { title: "চাঁদের রাত", category: "রাত", image: moonBook, position: "center", tone: "tone-midnight", quoteTop: 62, quoteLeft: 69, quoteWidth: 35, quoteRotate: 1.8, ink: "#34271e" },
  { title: "নির্জন বিকেল", category: "একাকিত্ব", image: teaBook, position: "center", tone: "tone-olive", quoteTop: 63, quoteLeft: 68, quoteWidth: 34, quoteRotate: 1.5, ink: "#293226" },
  { title: "ফুলের সকাল", category: "ফুল", image: flowerBook, position: "center", tone: "tone-coral", quoteTop: 58, quoteLeft: 70, quoteWidth: 33, quoteRotate: 2.4, ink: "#49342d" },
  { title: "পুরোনো চিঠি", category: "ভিনটেজ", image: autumnBook, position: "center", tone: "tone-amber", quoteTop: 66, quoteLeft: 69, quoteWidth: 34, quoteRotate: 1.8, ink: "#3d2919" },
  { title: "সমুদ্র হাওয়া", category: "প্রকৃতি", image: seaBook, position: "center", tone: "tone-sea", quoteTop: 70, quoteLeft: 69, quoteWidth: 34, quoteRotate: 1.2, ink: "#26383b" },
  { title: "বনের নীরবতা", category: "প্রকৃতি", image: forestBook, position: "center", tone: "tone-forest", quoteTop: 70, quoteLeft: 69, quoteWidth: 32, quoteRotate: 2.2, ink: "#283021" },
  { title: "গোধূলির গোলাপ", category: "অনুভূতি", image: roseBook, position: "center", tone: "tone-rose", quoteTop: 61, quoteLeft: 70, quoteWidth: 34, quoteRotate: 1.1, ink: "#442522" },
];

const modifiers = [
  { suffix: "ক্লাসিক", position: "center", topShift: 0 },
  { suffix: "ক্লোজ", position: "center 58%", topShift: 3 },
  { suffix: "সিনেমা", position: "center 42%", topShift: -2 },
];

const templates: Template[] = scenes.flatMap((scene, sceneIndex) =>
  modifiers.map((modifier, modifierIndex) => ({
    id: sceneIndex * 3 + modifierIndex + 1,
    title: `${scene.title} · ${modifier.suffix}`,
    category: scene.category,
    image: scene.image,
    position: modifier.position,
    tone: scene.tone,
    quoteTop: scene.quoteTop + modifier.topShift,
    ink: scene.ink,
    quoteWidth: scene.quoteWidth,
    quoteLeft: scene.quoteLeft,
    quoteRotate: scene.quoteRotate,
  })),
);

const filters = ["সব", "একাকিত্ব", "বৃষ্টি", "রাত", "ফুল", "প্রকৃতি", "ভিনটেজ", "অনুভূতি"];

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function wrapCanvasText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else current = candidate;
  });
  if (current) lines.push(current);
  return lines;
}

export function BookQuoteStudio() {
  const [selected, setSelected] = useState(0);
  const [activeFilter, setActiveFilter] = useState("সব");
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState("কিছু মানুষ দূরে গিয়েও থেকে যায়— পুরোনো বইয়ের পাতায় রাখা শুকনো ফুলের মতো।");
  const [author, setAuthor] = useState("মধ্যরাতের চিরকুট");
  const [fontSize, setFontSize] = useState(16);
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"templates" | "canvas" | "edit">("canvas");
  const imageRef = useRef<HTMLImageElement>(null);
  const current = templates[selected] ?? templates[0];

  const visibleTemplates = useMemo(
    () => templates.filter((template) =>
      (activeFilter === "সব" || template.category === activeFilter) &&
      template.title.toLowerCase().includes(query.toLowerCase()),
    ),
    [activeFilter, query],
  );

  if (!current) return null;

  const drawFrame = (context: CanvasRenderingContext2D, image: HTMLImageElement, progress = 0) => {
    const width = 720;
    const height = 1280;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * (1 + progress * 0.035);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    context.fillStyle = "rgba(24, 18, 12, 0.06)";
    context.fillRect(0, 0, width, height);
    context.save();
    const x = (current.quoteLeft / 100) * width;
    const centerY = (current.quoteTop / 100) * height;
    context.translate(x, centerY);
    context.rotate((current.quoteRotate * Math.PI) / 180);
    context.textAlign = align;
    context.textBaseline = "middle";
    context.fillStyle = current.ink;
    context.font = `600 ${fontSize * 2}px 'Tiro Bangla', 'Noto Serif Bengali', serif`;
    const lines = wrapCanvasText(context, quote, (current.quoteWidth / 100) * width);
    const textX = align === "left" ? -(current.quoteWidth / 200) * width : align === "right" ? (current.quoteWidth / 200) * width : 0;
    const startY = -((lines.length - 1) * fontSize * 1.35) / 2;
    lines.forEach((line, index) => context.fillText(line, textX, startY + index * fontSize * 2.7));
    context.font = "500 21px 'Hind Siliguri', sans-serif";
    context.fillStyle = "rgba(41, 36, 31, 0.78)";
    context.fillText(`— ${author}`, textX, startY + lines.length * fontSize * 2.7 + 20);
    context.restore();
  };

  const exportImage = () => {
    const image = imageRef.current;
    if (!image) return;
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280;
    const context = canvas.getContext("2d");
    if (!context) return;
    drawFrame(context, image);
    canvas.toBlob((blob) => blob && saveBlob(blob, "moddhorater-chirkut.png"), "image/png", 0.95);
  };

  const exportVideo = async () => {
    const image = imageRef.current;
    if (!image) return;
    setIsExporting(true);
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280;
    const context = canvas.getContext("2d");
    if (!context || !("captureStream" in canvas)) {
      setIsExporting(false);
      return;
    }
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => event.data.size && chunks.push(event.data);
    recorder.onstop = () => {
      saveBlob(new Blob(chunks, { type: "video/webm" }), "moddhorater-chirkut-reel.webm");
      setIsExporting(false);
    };
    recorder.start();
    const startedAt = performance.now();
    const duration = 6000;
    const render = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      drawFrame(context, image, Math.sin(progress * Math.PI) * 0.6);
      if (progress < 1) requestAnimationFrame(render);
      else recorder.stop();
    };
    requestAnimationFrame(render);
  };

  return (
    <div className="studio-shell min-h-screen bg-background text-foreground">
      <header className="studio-header">
        <div className="flex min-w-0 items-center gap-3">
          <div className="brand-seal"><BookOpen /></div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate font-display text-base font-bold sm:text-lg">মধ্যরাতের চিরকুট</h1>
              <span className="pro-badge">PRO</span>
            </div>
            <p className="hidden text-[11px] text-muted-foreground sm:block">Premium Book Reel Studio</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <span className="status-dot" />
          <span className="text-xs text-muted-foreground">Auto saved</span>
          <span className="format-pill">9:16 · 1080 × 1920</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportImage}><ImageDown /> <span className="hidden sm:inline">ছবি</span></Button>
          <Button size="sm" onClick={exportVideo} disabled={isExporting}><Film /> {isExporting ? "তৈরি হচ্ছে…" : "রিল এক্সপোর্ট"}</Button>
        </div>
      </header>

      <nav className="mobile-tabs">
        {(["templates", "canvas", "edit"] as const).map((item) => (
          <Button key={item} variant={mobilePanel === item ? "default" : "ghost"} size="sm" onClick={() => setMobilePanel(item)}>
            {item === "templates" ? "টেমপ্লেট" : item === "canvas" ? "ক্যানভাস" : "এডিট"}
          </Button>
        ))}
      </nav>

      <main className="studio-grid">
        <aside className={cn("library-panel", mobilePanel !== "templates" && "mobile-hidden")}>
          <div className="panel-heading">
            <div><p className="eyebrow">TEMPLATE LIBRARY</p><h2>প্রিমিয়াম বই</h2></div>
            <span className="count-badge">২৪</span>
          </div>
          <label className="search-box">
            <Search />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="টেমপ্লেট খুঁজুন" />
          </label>
          <div className="filter-row">
            {filters.map((filter) => (
              <Button key={filter} variant={activeFilter === filter ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(filter)}>{filter}</Button>
            ))}
          </div>
          <div className="template-grid">
            {visibleTemplates.map((template) => (
              <Button
                key={template.id}
                variant="ghost"
                className={cn("template-card", current.id === template.id && "is-selected")}
                onClick={() => {
                  setSelected(templates.findIndex((item) => item.id === template.id));
                  setMobilePanel("canvas");
                }}
                aria-label={`${template.title} বেছে নিন`}
              >
                <img src={template.image} alt="" loading="lazy" width={768} height={1376} style={{ objectPosition: template.position }} />
                <span className="template-shade" />
                <span className="template-number">{String(template.id).padStart(2, "0")}</span>
                <span className="template-name">{template.title}</span>
                {current.id === template.id && <span className="selected-check"><Check /></span>}
              </Button>
            ))}
          </div>
        </aside>

        <section className={cn("canvas-stage", mobilePanel !== "canvas" && "mobile-hidden")}>
          <div className="canvas-toolbar">
            <div><span className="live-dot" /> লাইভ প্রিভিউ</div>
            <div className="flex items-center gap-2"><Sparkles /> HD Preview <ChevronDown /></div>
          </div>
          <div className={cn("reel-frame", current.tone, isPlaying && "is-playing")}>
            <img ref={imageRef} src={current.image} alt={`${current.title} ওপেন বুক টেমপ্লেট`} width={768} height={1376} style={{ objectPosition: current.position }} />
            <div className="film-grain" />
            <div className="safe-area">
              <div
                className="printed-quote"
                style={{
                  top: `${current.quoteTop}%`,
                  fontSize: `${fontSize}px`,
                  textAlign: align,
                  color: current.ink,
                  width: `${current.quoteWidth}%`,
                  left: `${current.quoteLeft}%`,
                  transform: `translate(-50%, -50%) rotate(${current.quoteRotate}deg)`,
                }}
              >
                <span className="quote-mark">“</span>
                <p>{quote}</p>
                <span className="author-line" style={{ textAlign: align }}>— {author}</span>
              </div>
              <div className="reel-brand"><span className="brand-mini">ম</span><span>মধ্যরাতের চিরকুট</span></div>
            </div>
          </div>
          <div className="playback">
            <Button size="icon" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? "বিরতি" : "চালু করুন"}>
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <span className="timecode">00:00</span>
            <div className="timeline"><span className={cn(isPlaying && "timeline-running")} /></div>
            <span className="timecode">00:06</span>
            <Button variant="ghost" size="icon" aria-label="অডিও"><Volume2 /></Button>
          </div>
        </section>

        <aside className={cn("editor-panel", mobilePanel !== "edit" && "mobile-hidden")}>
          <div className="panel-heading">
            <div><p className="eyebrow">EDITOR</p><h2>কোট সাজান</h2></div>
            <SlidersHorizontal />
          </div>
          <div className="control-section">
            <div className="control-label"><span>কোট</span><span>{quote.length}/১৩০</span></div>
            <textarea maxLength={130} value={quote} onChange={(event) => setQuote(event.target.value)} />
          </div>
          <div className="control-section">
            <label className="control-label" htmlFor="author">লেখক / পেজ</label>
            <input id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
          </div>
          <div className="control-section">
            <div className="control-label"><span>লেখার মাপ</span><strong>{fontSize}px</strong></div>
            <input type="range" min="13" max="23" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} />
          </div>
          <div className="control-section">
            <div className="control-label">সাজানো</div>
            <div className="segmented">
              <Button variant={align === "left" ? "default" : "outline"} size="icon" onClick={() => setAlign("left")} aria-label="বামে"><AlignLeft /></Button>
              <Button variant={align === "center" ? "default" : "outline"} size="icon" onClick={() => setAlign("center")} aria-label="মাঝে"><AlignCenter /></Button>
              <Button variant={align === "right" ? "default" : "outline"} size="icon" onClick={() => setAlign("right")} aria-label="ডানে"><AlignRight /></Button>
            </div>
          </div>
          <div className="control-section font-preview">
            <div className="control-label">বাংলা ফন্ট</div>
             <div className="font-option is-active"><span className="font-book">অ আ ক খ</span><span>Tiro Bangla Book</span><Check /></div>
            <div className="font-option"><span className="font-clean">অ আ ক খ</span><span>Hind Siliguri</span></div>
          </div>
          <div className="export-card">
            <div className="export-icon"><LibraryBig /></div>
            <div><strong>Ready for Facebook</strong><span>৬ সেকেন্ড · 9:16 · HD</span></div>
            <Button onClick={exportVideo} disabled={isExporting}><Download /> {isExporting ? "রেন্ডারিং" : "ভিডিও"}</Button>
          </div>
        </aside>
      </main>
    </div>
  );
}