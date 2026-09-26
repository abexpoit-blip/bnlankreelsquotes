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
  Facebook,
  ImageDown,
  LibraryBig,
  Pause,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  Mic2,
} from "lucide-react";

import rainBook from "@/assets/book-rain-window.jpg";
import moonBook from "@/assets/book-midnight-moon.jpg";
import teaBook from "@/assets/book-solitude-tea.jpg";
import flowerBook from "@/assets/book-flowers-sun.jpg";
import autumnBook from "@/assets/book-autumn-desk.jpg";
import seaBook from "@/assets/book-sea-breeze.jpg";
import forestBook from "@/assets/book-forest-moss.jpg";
import roseBook from "@/assets/book-rose-evening.jpg";
import loneManBook from "@/assets/book-lone-man-midnight.jpg";
import magicDoveBook from "@/assets/book-magic-dove.jpg";
import grassCoversBook from "@/assets/book-grass-covers.jpg";
import highlightedPageBook from "@/assets/book-highlighted-page.jpg";
import trainWindowBook from "@/assets/book-train-window.jpg";
import candleLibraryBook from "@/assets/book-candle-library.jpg";
import snowWindowBook from "@/assets/book-snow-window.jpg";
import lanternRiverBook from "@/assets/book-lantern-river.jpg";
import coffeeCafeBook from "@/assets/book-coffee-cafe.jpg";
import sunflowerFieldBook from "@/assets/book-sunflower-field.jpg";
import rooftopRainBook from "@/assets/book-rooftop-rain.jpg";
import boatDawnBook from "@/assets/book-boat-dawn.jpg";
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
  textStyle: "ink" | "light" | "bold";
};

const scenes: Omit<Template, "id">[] = [
  { title: "বৃষ্টির জানালা", category: "বৃষ্টি", image: rainBook, position: "center", tone: "tone-cool", quoteTop: 62, quoteLeft: 70, quoteWidth: 34, quoteRotate: 1.2, ink: "#31251c", textStyle: "ink" },
  { title: "চাঁদের বই", category: "রাত", image: moonBook, position: "center", tone: "tone-midnight", quoteTop: 62, quoteLeft: 69, quoteWidth: 35, quoteRotate: 1.8, ink: "#34271e", textStyle: "ink" },
  { title: "নির্জন বিকেল", category: "একাকিত্ব", image: teaBook, position: "center", tone: "tone-olive", quoteTop: 63, quoteLeft: 68, quoteWidth: 34, quoteRotate: 1.5, ink: "#293226", textStyle: "ink" },
  { title: "ফুলের সকাল", category: "ফুল", image: flowerBook, position: "center", tone: "tone-coral", quoteTop: 58, quoteLeft: 70, quoteWidth: 33, quoteRotate: 2.4, ink: "#49342d", textStyle: "ink" },
  { title: "পুরোনো চিঠি", category: "ভিনটেজ", image: autumnBook, position: "center", tone: "tone-amber", quoteTop: 66, quoteLeft: 69, quoteWidth: 34, quoteRotate: 1.8, ink: "#3d2919", textStyle: "ink" },
  { title: "সমুদ্র হাওয়া", category: "প্রকৃতি", image: seaBook, position: "center", tone: "tone-sea", quoteTop: 70, quoteLeft: 69, quoteWidth: 34, quoteRotate: 1.2, ink: "#26383b", textStyle: "ink" },
  { title: "বনের নীরবতা", category: "প্রকৃতি", image: forestBook, position: "center", tone: "tone-forest", quoteTop: 70, quoteLeft: 69, quoteWidth: 32, quoteRotate: 2.2, ink: "#283021", textStyle: "ink" },
  { title: "গোধূলির গোলাপ", category: "অনুভূতি", image: roseBook, position: "center", tone: "tone-rose", quoteTop: 61, quoteLeft: 70, quoteWidth: 34, quoteRotate: 1.1, ink: "#442522", textStyle: "ink" },
  { title: "মধ্যরাতের একাকী", category: "একাকিত্ব", image: loneManBook, position: "center", tone: "tone-midnight", quoteTop: 30, quoteLeft: 30, quoteWidth: 46, quoteRotate: 0, ink: "#f4ead7", textStyle: "light" },
  { title: "শব্দের ডানা", category: "অনুভূতি", image: magicDoveBook, position: "center", tone: "tone-amber", quoteTop: 25, quoteLeft: 29, quoteWidth: 44, quoteRotate: 0, ink: "#f8edda", textStyle: "light" },
  { title: "সবুজ প্রচ্ছদ", category: "প্রকৃতি", image: grassCoversBook, position: "center", tone: "tone-forest", quoteTop: 27, quoteLeft: 33, quoteWidth: 54, quoteRotate: 0, ink: "#243029", textStyle: "bold" },
  { title: "হাইলাইটেড পাতা", category: "ভিনটেজ", image: highlightedPageBook, position: "center", tone: "tone-amber", quoteTop: 59, quoteLeft: 67, quoteWidth: 45, quoteRotate: -1.4, ink: "#33291f", textStyle: "ink" },
  { title: "বৃষ্টির ট্রেন", category: "বৃষ্টি", image: trainWindowBook, position: "center", tone: "tone-cool", quoteTop: 67, quoteLeft: 68, quoteWidth: 36, quoteRotate: 2.4, ink: "#33271f", textStyle: "ink" },
  { title: "মোমের লাইব্রেরি", category: "ভিনটেজ", image: candleLibraryBook, position: "center", tone: "tone-rose", quoteTop: 61, quoteLeft: 30, quoteWidth: 37, quoteRotate: -1.8, ink: "#3b281c", textStyle: "ink" },
  { title: "তুষারের জানালা", category: "প্রকৃতি", image: snowWindowBook, position: "center", tone: "tone-cool", quoteTop: 65, quoteLeft: 70, quoteWidth: 35, quoteRotate: 1.6, ink: "#30343b", textStyle: "ink" },
  { title: "নদীর লণ্ঠন", category: "প্রকৃতি", image: lanternRiverBook, position: "center", tone: "tone-sea", quoteTop: 71, quoteLeft: 31, quoteWidth: 36, quoteRotate: -1.1, ink: "#34291e", textStyle: "ink" },
  { title: "বৃষ্টির ক্যাফে", category: "বৃষ্টি", image: coffeeCafeBook, position: "center", tone: "tone-amber", quoteTop: 70, quoteLeft: 70, quoteWidth: 35, quoteRotate: 1.4, ink: "#30261e", textStyle: "ink" },
  { title: "সূর্যমুখীর কবিতা", category: "ফুল", image: sunflowerFieldBook, position: "center", tone: "tone-coral", quoteTop: 61, quoteLeft: 29, quoteWidth: 36, quoteRotate: -1.4, ink: "#3d2c1d", textStyle: "ink" },
  { title: "ছাদের বৃষ্টি", category: "একাকিত্ব", image: rooftopRainBook, position: "center", tone: "tone-midnight", quoteTop: 29, quoteLeft: 70, quoteWidth: 45, quoteRotate: 0, ink: "#f6eee1", textStyle: "light" },
  { title: "নৌকার ভোর", category: "প্রকৃতি", image: boatDawnBook, position: "center", tone: "tone-sea", quoteTop: 70, quoteLeft: 29, quoteWidth: 35, quoteRotate: -1.3, ink: "#382b20", textStyle: "ink" },
];

const templates: Template[] = scenes.map((scene, index) => ({ id: index + 1, ...scene }));

const fontOptions = [
  { id: "tiro", label: "Tiro Bangla", sample: "অ আ ক খ", family: "'Tiro Bangla', serif" },
  { id: "noto", label: "Noto Serif Bengali", sample: "অ আ ক খ", family: "'Noto Serif Bengali', serif" },
  { id: "hind", label: "Hind Siliguri", sample: "অ আ ক খ", family: "'Hind Siliguri', sans-serif" },
  { id: "playfair", label: "Playfair Display", sample: "Aa Bb Cc", family: "'Playfair Display', serif" },
] as const;

const filters = ["সব", "একাকিত্ব", "বৃষ্টি", "রাত", "ফুল", "প্রকৃতি", "ভিনটেজ", "অনুভূতি"];

const durations = [6, 10, 15, 20, 30] as const;

const videoFormats = [
  { id: "reel-hd", label: "Reels HD", detail: "9:16 · 1080 × 1920", width: 1080, height: 1920 },
  { id: "reel-lite", label: "Reels Lite", detail: "9:16 · 720 × 1280", width: 720, height: 1280 },
  { id: "feed", label: "Facebook Feed", detail: "4:5 · 1080 × 1350", width: 1080, height: 1350 },
  { id: "square", label: "Square Post", detail: "1:1 · 1080 × 1080", width: 1080, height: 1080 },
] as const;

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
  const [author, setAuthor] = useState("");
  const [voiceBy, setVoiceBy] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  const [fontId, setFontId] = useState<(typeof fontOptions)[number]["id"]>("tiro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [duration, setDuration] = useState<(typeof durations)[number]>(10);
  const [formatId, setFormatId] = useState<(typeof videoFormats)[number]["id"]>("reel-hd");
  const [mobilePanel, setMobilePanel] = useState<"templates" | "canvas" | "edit">("canvas");
  const imageRef = useRef<HTMLImageElement>(null);
  const current = templates[selected] ?? templates[0];
  const activeFont = fontOptions.find((item) => item.id === fontId) ?? fontOptions[0];
  const activeFormat = videoFormats.find((item) => item.id === formatId) ?? videoFormats[0];

  const visibleTemplates = useMemo(
    () => templates.filter((template) =>
      (activeFilter === "সব" || template.category === activeFilter) &&
      template.title.toLowerCase().includes(query.toLowerCase()),
    ),
    [activeFilter, query],
  );

  if (!current) return null;

  const drawFrame = (context: CanvasRenderingContext2D, image: HTMLImageElement, progress = 0) => {
    const { width, height } = activeFormat;
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
    const outputScale = width / 360;
    context.font = `600 ${fontSize * outputScale}px ${activeFont.family}`;
    const lines = wrapCanvasText(context, quote, (current.quoteWidth / 100) * width);
    const textX = align === "left" ? -(current.quoteWidth / 200) * width : align === "right" ? (current.quoteWidth / 200) * width : 0;
    const lineHeight = fontSize * outputScale * 1.42;
    const startY = -((lines.length - 1) * lineHeight) / 2;
    if (current.textStyle === "light") {
      context.shadowColor = "rgba(0, 0, 0, 0.78)";
      context.shadowBlur = 12 * outputScale;
    }
    lines.forEach((line, index) => context.fillText(line, textX, startY + index * lineHeight));
    context.shadowBlur = 0;
    context.font = `600 ${10.5 * outputScale}px 'Hind Siliguri', sans-serif`;
    context.fillStyle = current.ink;
    const creditStart = startY + lines.length * lineHeight + 10 * outputScale;
    if (author.trim()) context.fillText(`Quote By — ${author.trim()}`, textX, creditStart);
    if (voiceBy.trim()) context.fillText(`Voice By — ${voiceBy.trim()}`, textX, creditStart + (author.trim() ? 15 * outputScale : 0));
    context.restore();
    context.save();
    context.textAlign = "center";
    context.font = `600 ${11 * outputScale}px 'Hind Siliguri', sans-serif`;
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.shadowColor = "rgba(0, 0, 0, 0.9)";
    context.shadowBlur = 8 * outputScale;
    context.fillText("Design By Shovon", width / 2, height - 35 * outputScale);
    context.font = `500 ${8 * outputScale}px 'Hind Siliguri', sans-serif`;
    context.fillText("facebook.com/MidnightNoteofficial", width / 2, height - 20 * outputScale);
    context.restore();
  };

  const exportImage = () => {
    const image = imageRef.current;
    if (!image) return;
    const canvas = document.createElement("canvas");
    canvas.width = activeFormat.width;
    canvas.height = activeFormat.height;
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
    canvas.width = activeFormat.width;
    canvas.height = activeFormat.height;
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
    const durationMs = duration * 1000;
    const render = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
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
          <span className="format-pill">{activeFormat.detail}</span>
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
            <span className="count-badge">২০</span>
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
          <div className={cn("reel-frame", current.tone, isPlaying && "is-playing")} style={{ aspectRatio: `${activeFormat.width} / ${activeFormat.height}` }}>
            <img ref={imageRef} src={current.image} alt={`${current.title} ওপেন বুক টেমপ্লেট`} width={768} height={1376} style={{ objectPosition: current.position }} />
            <div className="film-grain" />
            <div className="safe-area">
              <div
                className={cn("printed-quote", `text-${current.textStyle}`)}
                style={{
                  top: `${current.quoteTop}%`,
                  fontSize: `${fontSize}px`,
                  textAlign: align,
                  color: current.ink,
                  width: `${current.quoteWidth}%`,
                  left: `${current.quoteLeft}%`,
                  transform: `translate(-50%, -50%) rotate(${current.quoteRotate}deg)`,
                  fontFamily: activeFont.family,
                }}
              >
                <span className="quote-mark">“</span>
                <p>{quote}</p>
                {author.trim() && <span className="author-line" style={{ textAlign: align }}>Quote By — {author}</span>}
                {voiceBy.trim() && <span className="author-line voice-line" style={{ textAlign: align }}>Voice By — {voiceBy}</span>}
              </div>
              <a className="reel-brand" href="https://www.facebook.com/MidnightNoteofficial" target="_blank" rel="noreferrer" aria-label="মধ্যরাতের চিরকুট Facebook পেজ">
                <span className="brand-mini">ম</span><span><strong>Design By Shovon</strong><small>মধ্যরাতের চিরকুট</small></span>
              </a>
            </div>
          </div>
          <div className="playback">
            <Button size="icon" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? "বিরতি" : "চালু করুন"}>
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <span className="timecode">00:00</span>
            <div className="timeline"><span className={cn(isPlaying && "timeline-running")} /></div>
            <span className="timecode">00:{String(duration).padStart(2, "0")}</span>
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
            <label className="control-label" htmlFor="author"><span>Quote By</span><span>ঐচ্ছিক</span></label>
            <input id="author" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="লেখক বা কোটদাতার নাম" />
          </div>
          <div className="control-section">
            <label className="control-label" htmlFor="voiceBy"><span className="inline-flex items-center gap-1"><Mic2 /> Voice By</span><span>ঐচ্ছিক</span></label>
            <input id="voiceBy" value={voiceBy} onChange={(event) => setVoiceBy(event.target.value)} placeholder="কণ্ঠশিল্পীর নাম" />
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
            <div className="control-label"><span>বাংলা ও ইংরেজি ফন্ট</span><span>Smart contrast</span></div>
            {fontOptions.map((font) => (
              <Button
                key={font.id}
                type="button"
                variant="ghost"
                className={cn("font-option", fontId === font.id && "is-active")}
                onClick={() => setFontId(font.id)}
              >
                <span style={{ fontFamily: font.family }}>{font.sample}</span>
                <span>{font.label}</span>
                {fontId === font.id && <Check />}
              </Button>
            ))}
          </div>
          <div className="control-section export-settings">
            <label className="control-label" htmlFor="duration">ভিডিও সময়</label>
            <select id="duration" value={duration} onChange={(event) => setDuration(Number(event.target.value) as (typeof durations)[number])}>
              {durations.map((seconds) => <option key={seconds} value={seconds}>{seconds} সেকেন্ড</option>)}
            </select>
            <label className="control-label" htmlFor="format">ভিডিও সাইজ ও অনুপাত</label>
            <select id="format" value={formatId} onChange={(event) => setFormatId(event.target.value as (typeof videoFormats)[number]["id"])}>
              {videoFormats.map((format) => <option key={format.id} value={format.id}>{format.label} — {format.detail}</option>)}
            </select>
          </div>
          <a className="facebook-link" href="https://www.facebook.com/MidnightNoteofficial" target="_blank" rel="noreferrer"><Facebook /> facebook.com/MidnightNoteofficial</a>
          <div className="export-card">
            <div className="export-icon"><LibraryBig /></div>
            <div><strong>Ready for Facebook</strong><span>{duration} সেকেন্ড · {activeFormat.detail}</span></div>
            <Button onClick={exportVideo} disabled={isExporting}><Download /> {isExporting ? "রেন্ডারিং" : "ভিডিও"}</Button>
          </div>
        </aside>
      </main>
    </div>
  );
}