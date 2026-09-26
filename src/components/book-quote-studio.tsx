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
import loneManBook from "@/assets/book-lone-man-midnight.jpg";
import rooftopRainBook from "@/assets/book-rooftop-rain.jpg";
import sadSeaSolitude from "@/assets/sad-sea-solitude.jpg";
import sadRainWindow from "@/assets/sad-rain-window.jpg";
import sadEmptyBench from "@/assets/sad-empty-bench.jpg";
import sadTrainFarewell from "@/assets/sad-train-farewell.jpg";
import sadEmptySwing from "@/assets/sad-empty-swing.jpg";
import sadMidnightStreet from "@/assets/sad-midnight-street.jpg";
import sadWitheredFlowers from "@/assets/sad-withered-flowers.jpg";
import sadRooftopRain from "@/assets/sad-rooftop-rain.jpg";
import sadEmptyCafe from "@/assets/sad-empty-cafe.jpg";
import sadLostBoat from "@/assets/sad-lost-boat.jpg";
import sadTwilightTree from "@/assets/sad-twilight-tree.jpg";
import sadUnansweredCall from "@/assets/sad-unanswered-call.jpg";
import sadFoggyRoad from "@/assets/sad-foggy-road.jpg";
import sadHospitalCorridor from "@/assets/sad-hospital-corridor.jpg";
import sadLastRose from "@/assets/sad-last-rose.jpg";
import sadRiverPier from "@/assets/sad-river-pier.jpg";
import sadEmptyRoom from "@/assets/sad-empty-room.jpg";
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
  { title: "বৃষ্টির বই", category: "বই", image: rainBook, position: "center", tone: "tone-cool", quoteTop: 62, quoteLeft: 70, quoteWidth: 34, quoteRotate: 1.2, ink: "#31251c", textStyle: "ink" },
  { title: "সমুদ্রের একাকী", category: "একাকিত্ব", image: sadSeaSolitude, position: "center", tone: "tone-midnight", quoteTop: 27, quoteLeft: 50, quoteWidth: 76, quoteRotate: 0, ink: "#f7f2e8", textStyle: "light" },
  { title: "জানালার অপেক্ষা", category: "বৃষ্টি", image: sadRainWindow, position: "center", tone: "tone-midnight", quoteTop: 27, quoteLeft: 43, quoteWidth: 68, quoteRotate: 0, ink: "#f7f2e8", textStyle: "light" },
  { title: "খালি বেঞ্চ", category: "বৃষ্টি", image: sadEmptyBench, position: "center", tone: "tone-amber", quoteTop: 38, quoteLeft: 60, quoteWidth: 66, quoteRotate: 0, ink: "#fff4df", textStyle: "light" },
  { title: "শেষ ট্রেন", category: "বিদায়", image: sadTrainFarewell, position: "center", tone: "tone-amber", quoteTop: 31, quoteLeft: 60, quoteWidth: 64, quoteRotate: 0, ink: "#fff5e6", textStyle: "light" },
  { title: "ফেলে আসা শৈশব", category: "স্মৃতি", image: sadEmptySwing, position: "center", tone: "tone-olive", quoteTop: 27, quoteLeft: 60, quoteWidth: 66, quoteRotate: 0, ink: "#263028", textStyle: "bold" },
  { title: "মধ্যরাতের পথ", category: "একাকিত্ব", image: sadMidnightStreet, position: "center", tone: "tone-midnight", quoteTop: 25, quoteLeft: 50, quoteWidth: 78, quoteRotate: 0, ink: "#fff6e9", textStyle: "light" },
  { title: "শুকনো ফুল", category: "স্মৃতি", image: sadWitheredFlowers, position: "center", tone: "tone-rose", quoteTop: 27, quoteLeft: 52, quoteWidth: 72, quoteRotate: 0, ink: "#f9f3ea", textStyle: "light" },
  { title: "ছাদের বিষণ্নতা", category: "বৃষ্টি", image: sadRooftopRain, position: "center", tone: "tone-midnight", quoteTop: 27, quoteLeft: 50, quoteWidth: 76, quoteRotate: 0, ink: "#f8f2e8", textStyle: "light" },
  { title: "অপেক্ষার ক্যাফে", category: "অপেক্ষা", image: sadEmptyCafe, position: "center", tone: "tone-amber", quoteTop: 28, quoteLeft: 57, quoteWidth: 68, quoteRotate: 0, ink: "#fff6e8", textStyle: "light" },
  { title: "হারানো নৌকা", category: "বিদায়", image: sadLostBoat, position: "center", tone: "tone-sea", quoteTop: 25, quoteLeft: 50, quoteWidth: 76, quoteRotate: 0, ink: "#273540", textStyle: "bold" },
  { title: "গোধূলির মানুষ", category: "একাকিত্ব", image: sadTwilightTree, position: "center", tone: "tone-forest", quoteTop: 30, quoteLeft: 58, quoteWidth: 68, quoteRotate: 0, ink: "#fff4e8", textStyle: "light" },
  { title: "না-আসা ফোন", category: "অপেক্ষা", image: sadUnansweredCall, position: "center", tone: "tone-midnight", quoteTop: 30, quoteLeft: 48, quoteWidth: 70, quoteRotate: 0, ink: "#f8f1e7", textStyle: "light" },
  { title: "কুয়াশার বিদায়", category: "বিদায়", image: sadFoggyRoad, position: "center", tone: "tone-cool", quoteTop: 28, quoteLeft: 50, quoteWidth: 72, quoteRotate: 0, ink: "#26343b", textStyle: "bold" },
  { title: "নীরব করিডর", category: "অপেক্ষা", image: sadHospitalCorridor, position: "center", tone: "tone-cool", quoteTop: 29, quoteLeft: 58, quoteWidth: 66, quoteRotate: 0, ink: "#f6f3ec", textStyle: "light" },
  { title: "শেষ গোলাপ", category: "বিচ্ছেদ", image: sadLastRose, position: "center", tone: "tone-rose", quoteTop: 25, quoteLeft: 50, quoteWidth: 76, quoteRotate: 0, ink: "#fff4ea", textStyle: "light" },
  { title: "নদীর ধারে", category: "একাকিত্ব", image: sadRiverPier, position: "center", tone: "tone-sea", quoteTop: 27, quoteLeft: 50, quoteWidth: 76, quoteRotate: 0, ink: "#f8f2e9", textStyle: "light" },
  { title: "শূন্য ঘর", category: "স্মৃতি", image: sadEmptyRoom, position: "center", tone: "tone-cool", quoteTop: 25, quoteLeft: 48, quoteWidth: 72, quoteRotate: 0, ink: "#f8f3eb", textStyle: "light" },
  { title: "নিঃসঙ্গ রাত", category: "একাকিত্ব", image: loneManBook, position: "center", tone: "tone-midnight", quoteTop: 27, quoteLeft: 50, quoteWidth: 74, quoteRotate: 0, ink: "#f8f1e7", textStyle: "light" },
  { title: "বৃষ্টিভেজা ছাদ", category: "বৃষ্টি", image: rooftopRainBook, position: "center", tone: "tone-midnight", quoteTop: 27, quoteLeft: 50, quoteWidth: 74, quoteRotate: 0, ink: "#fff4e8", textStyle: "light" },
];

const templates: Template[] = scenes.map((scene, index) => ({ id: index + 1, ...scene }));

const fontOptions = [
  { id: "tiro", label: "Tiro Bangla", sample: "অ আ ক খ", family: "'Tiro Bangla', serif" },
  { id: "noto", label: "Noto Serif Bengali", sample: "অ আ ক খ", family: "'Noto Serif Bengali', serif" },
  { id: "hind", label: "Hind Siliguri", sample: "অ আ ক খ", family: "'Hind Siliguri', sans-serif" },
  { id: "playfair", label: "Playfair Display", sample: "Aa Bb Cc", family: "'Playfair Display', serif" },
] as const;

const filters = ["সব", "বই", "একাকিত্ব", "বৃষ্টি", "বিদায়", "স্মৃতি", "অপেক্ষা", "বিচ্ছেদ"];

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