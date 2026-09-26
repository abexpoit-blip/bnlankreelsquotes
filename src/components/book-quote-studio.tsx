import { useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
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
  Quote,
} from "lucide-react";

import loneManBook from "@/assets/book-lone-man-midnight.jpg";
import rooftopRainBook from "@/assets/book-rooftop-rain.jpg";
import sadBusStopNight from "@/assets/sad-bus-stop-night.jpg";
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
import { extraScenes } from "./scenes-extra";
import { japanScenes } from "./scenes-japan";
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

type BaseScene = Omit<Template, "id">;

const baseScenes: BaseScene[] = [
  { title: "শেষ বাসের অপেক্ষা", category: "অপেক্ষা", image: sadBusStopNight, position: "center", tone: "tone-midnight", quoteTop: 29, quoteLeft: 58, quoteWidth: 68, quoteRotate: 0, ink: "#fff4e8", textStyle: "light" },
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

const scenes: BaseScene[] = [...baseScenes, ...extraScenes, ...japanScenes];

const templates: Template[] = scenes.map((scene, index) => ({ ...scene, id: index + 1 }));

const fontOptions = [
  { id: "tiro", label: "Tiro Bangla", sample: "অ আ ক খ", family: "'Tiro Bangla', serif" },
  { id: "noto", label: "Noto Serif Bengali", sample: "অ আ ক খ", family: "'Noto Serif Bengali', serif" },
  { id: "hind", label: "Hind Siliguri", sample: "অ আ ক খ", family: "'Hind Siliguri', sans-serif" },
  { id: "playfair", label: "Playfair Display", sample: "Aa Bb Cc", family: "'Playfair Display', serif" },
] as const;

const filters = ["সব", "একাকিত্ব", "বৃষ্টি", "বিদায়", "স্মৃতি", "অপেক্ষা", "বিচ্ছেদ", "জাপান"];

const durations = [6, 10, 15, 20, 30] as const;

const videoFormats = [
  { id: "reel-hd", label: "Reels HD", detail: "9:16 · 1080 × 1920", width: 1080, height: 1920 },
  { id: "reel-lite", label: "Reels Lite", detail: "9:16 · 720 × 1280", width: 720, height: 1280 },
  { id: "feed", label: "Facebook Feed", detail: "4:5 · 1080 × 1350", width: 1080, height: 1350 },
  { id: "square", label: "Square Post", detail: "1:1 · 1080 × 1080", width: 1080, height: 1080 },
] as const;

const quoteLibrary = [
  { id: 1, category: "একাকিত্ব", text: "কিছু মানুষ দূরে গিয়েও থেকে যায়— পুরোনো স্মৃতির ভাঁজে রাখা শুকনো ফুলের মতো।", author: "মধ্যরাতের চিরকুট" },
  { id: 2, category: "অপেক্ষা", text: "অপেক্ষা মানুষকে বদলে দেয়; কেউ ফিরে আসে, আর কেউ অপেক্ষাতেই হারিয়ে যায়।", author: "মধ্যরাতের চিরকুট" },
  { id: 3, category: "বিচ্ছেদ", text: "তুমি চলে যাওয়ার পর শহরটা একই আছে, শুধু আমার ফেরার ঠিকানা বদলে গেছে।", author: "মধ্যরাতের চিরকুট" },
  { id: 4, category: "বৃষ্টি", text: "বৃষ্টি নামলেই কিছু পুরোনো কথার শব্দ জানালায় এসে জমে।", author: "মধ্যরাতের চিরকুট" },
  { id: 5, category: "স্মৃতি", text: "স্মৃতি কখনো পুরোনো হয় না, শুধু মানুষ তাকে লুকিয়ে রাখতে শিখে যায়।", author: "মধ্যরাতের চিরকুট" },
  { id: 6, category: "বিদায়", text: "সব বিদায় মুখে বলা হয় না; কিছু বিদায় নীরবতায় সারাজীবন বাজে।", author: "মধ্যরাতের চিরকুট" },
  { id: 7, category: "জীবন", text: "যে পথ একা হাঁটতে শেখায়, সেই পথই একদিন নিজের কাছে ফিরিয়ে আনে।", author: "মধ্যরাতের চিরকুট" },
  { id: 8, category: "ভালোবাসা", text: "ভালোবাসা থেকে যায়— মানুষটি না থাকলেও তার রেখে যাওয়া আলোয়।", author: "মধ্যরাতের চিরকুট" },
  { id: 9, category: "English", text: "Some goodbyes never leave; they simply learn to live quietly inside us.", author: "Midnight Note" },
  { id: 10, category: "English", text: "The loneliest nights often teach the heart how to become its own light.", author: "Midnight Note" },
  { id: 11, category: "English", text: "Not every distance is measured in miles; some begin between two silent hearts.", author: "Midnight Note" },
  { id: 12, category: "English", text: "We carry old memories like pressed flowers—fragile, faded, and impossible to throw away.", author: "Midnight Note" },
] as const;

const quoteStyles = [
  { id: "glass", label: "Elegant Glass", detail: "স্বচ্ছ প্যানেল" },
  { id: "editorial", label: "Editorial Line", detail: "সাহিত্যিক লাইন" },
  { id: "spotlight", label: "Soft Spotlight", detail: "মৃদু আলো" },
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
  const [showQuoteBy, setShowQuoteBy] = useState(true);
  const [showVoiceBy, setShowVoiceBy] = useState(true);
  const [sameCreditPerson, setSameCreditPerson] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState(templates[0]?.ink ?? "#fff4e8");
  const [quotePosition, setQuotePosition] = useState({ x: templates[0]?.quoteLeft ?? 50, y: templates[0]?.quoteTop ?? 30 });
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  const [fontId, setFontId] = useState<(typeof fontOptions)[number]["id"]>("tiro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [duration, setDuration] = useState<(typeof durations)[number]>(10);
  const [formatId, setFormatId] = useState<(typeof videoFormats)[number]["id"]>("reel-hd");
  const [quoteStyleId, setQuoteStyleId] = useState<(typeof quoteStyles)[number]["id"]>("glass");
  const [quoteLibraryFilter, setQuoteLibraryFilter] = useState("সব");
  const [mobilePanel, setMobilePanel] = useState<"templates" | "canvas" | "edit">("canvas");
  const imageRef = useRef<HTMLImageElement>(null);
  const safeAreaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<{
    mode: "move" | "resize";
    pointerId: number;
    startX: number;
    startY: number;
    position: { x: number; y: number };
    fontSize: number;
  } | null>(null);
  const current = templates[selected] ?? templates[0];
  const activeFont = fontOptions.find((item) => item.id === fontId) ?? fontOptions[0];
  const activeFormat = videoFormats.find((item) => item.id === formatId) ?? videoFormats[0];
  const displayedVoiceBy = sameCreditPerson ? author : voiceBy;

  const visibleTemplates = useMemo(
    () => templates.filter((template) =>
      (activeFilter === "সব" || template.category === activeFilter) &&
      template.title.toLowerCase().includes(query.toLowerCase()),
    ),
    [activeFilter, query],
  );
  const visibleQuotes = useMemo(
    () => quoteLibrary.filter((item) => quoteLibraryFilter === "সব" || item.category === quoteLibraryFilter),
    [quoteLibraryFilter],
  );

  if (!current) return null;

  const beginInteraction = (event: ReactPointerEvent<HTMLElement>, mode: "move" | "resize") => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      position: quotePosition,
      fontSize,
    };
  };

  const updateInteraction = (event: ReactPointerEvent<HTMLElement>) => {
    const interaction = interactionRef.current;
    const safeArea = safeAreaRef.current;
    if (!interaction || interaction.pointerId !== event.pointerId || !safeArea) return;
    event.preventDefault();
    const bounds = safeArea.getBoundingClientRect();
    const deltaX = event.clientX - interaction.startX;
    const deltaY = event.clientY - interaction.startY;
    if (interaction.mode === "resize") {
      const delta = ((deltaX + deltaY) / 2 / bounds.width) * 52;
      setFontSize(Math.round(Math.min(38, Math.max(12, interaction.fontSize + delta))));
      return;
    }
    const quoteBounds = quoteRef.current?.getBoundingClientRect();
    const halfWidth = quoteBounds ? (quoteBounds.width / bounds.width) * 50 : 10;
    const halfHeight = quoteBounds ? (quoteBounds.height / bounds.height) * 50 : 6;
    setQuotePosition({
      x: Math.min(96 - halfWidth, Math.max(4 + halfWidth, interaction.position.x + (deltaX / bounds.width) * 100)),
      y: Math.min(87 - halfHeight, Math.max(4 + halfHeight, interaction.position.y + (deltaY / bounds.height) * 100)),
    });
  };

  const endInteraction = (event: ReactPointerEvent<HTMLElement>) => {
    if (interactionRef.current?.pointerId !== event.pointerId) return;
    interactionRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const applyTemplate = (template: Template) => {
    setSelected(templates.findIndex((item) => item.id === template.id));
    setTextColor(template.ink);
    setQuotePosition({ x: template.quoteLeft, y: template.quoteTop });
  };

  const applyLibraryQuote = (item: (typeof quoteLibrary)[number]) => {
    setQuote(item.text);
    setAuthor(item.author);
    setShowQuoteBy(true);
    setMobilePanel("canvas");
  };

  const drawFrame = (context: CanvasRenderingContext2D, image: HTMLImageElement, progress = 0) => {
    const { width, height } = activeFormat;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * (1 + progress * 0.035);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    context.fillStyle = "rgba(24, 18, 12, 0.06)";
    context.fillRect(0, 0, width, height);
    context.save();
    const x = (0.05 + (quotePosition.x / 100) * 0.9) * width;
    const centerY = (0.05 + (quotePosition.y / 100) * 0.9) * height;
    context.translate(x, centerY);
    context.rotate((current.quoteRotate * Math.PI) / 180);
    context.textAlign = align;
    context.textBaseline = "middle";
    context.fillStyle = textColor;
    const outputScale = width / 360;
    context.font = `600 ${fontSize * outputScale}px ${activeFont.family}`;
    const lines = wrapCanvasText(context, quote, (current.quoteWidth / 100) * width);
    const textX = align === "left" ? -(current.quoteWidth / 200) * width : align === "right" ? (current.quoteWidth / 200) * width : 0;
    const lineHeight = fontSize * outputScale * 1.42;
    const startY = -((lines.length - 1) * lineHeight) / 2;
    const creditCount = Number(showQuoteBy && Boolean(author.trim())) + Number(showVoiceBy && Boolean(displayedVoiceBy.trim()));
    const panelTop = startY - 25 * outputScale;
    const panelBottom = startY + Math.max(lines.length - 1, 0) * lineHeight + (creditCount ? 56 : 24) * outputScale;
    if (quoteStyleId === "glass") {
      context.fillStyle = "rgba(10, 17, 20, 0.48)";
      context.strokeStyle = "rgba(255, 255, 255, 0.16)";
      context.lineWidth = outputScale;
      context.beginPath();
      context.roundRect(-(current.quoteWidth / 200) * width - 20 * outputScale, panelTop, (current.quoteWidth / 100) * width + 40 * outputScale, panelBottom - panelTop, 10 * outputScale);
      context.fill();
      context.stroke();
      context.fillStyle = textColor;
    }
    if (current.textStyle === "light") {
      context.shadowColor = "rgba(0, 0, 0, 0.78)";
      context.shadowBlur = 12 * outputScale;
    }
    lines.forEach((line, index) => context.fillText(line, textX, startY + index * lineHeight));
    context.shadowBlur = 0;
    context.font = `600 ${10.5 * outputScale}px 'Hind Siliguri', sans-serif`;
    context.fillStyle = textColor;
    const creditStart = startY + lines.length * lineHeight + 10 * outputScale;
    if (showQuoteBy && author.trim()) context.fillText(`Quote By — ${author.trim()}`, textX, creditStart);
    if (showVoiceBy && displayedVoiceBy.trim()) context.fillText(`Voice By — ${displayedVoiceBy.trim()}`, textX, creditStart + (showQuoteBy && author.trim() ? 15 * outputScale : 0));
    context.restore();
    context.save();
    const footerHeight = 54 * outputScale;
    context.fillStyle = "rgba(12, 17, 16, 0.82)";
    context.fillRect(0, height - footerHeight, width, footerHeight);
    context.textAlign = "center";
    context.font = `700 ${12 * outputScale}px 'Hind Siliguri', sans-serif`;
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.fillText("মধ্যরাতের চিরকুট  •  Design By Shovon", width / 2, height - 32 * outputScale);
    context.font = `600 ${8.5 * outputScale}px 'Hind Siliguri', sans-serif`;
    context.fillText("facebook.com/MidnightNoteofficial", width / 2, height - 15 * outputScale);
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
              <h1 className="truncate font-display text-base font-bold sm:text-lg">— মধ্যরাতের চিরকুট</h1>
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
            <div><p className="eyebrow">TEMPLATE LIBRARY</p><h2>আবেগময় দৃশ্য</h2></div>
            <span className="count-badge">{bnNumber(scenes.length)}</span>
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
                  applyTemplate(template);
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
            <img ref={imageRef} src={current.image} alt={`${current.title} আবেগময় টেমপ্লেট`} width={768} height={1376} style={{ objectPosition: current.position }} />
            <div className="film-grain" />
            <div ref={safeAreaRef} className="safe-area">
              <div
                ref={quoteRef}
                className={cn("printed-quote", `text-${current.textStyle}`, `quote-style-${quoteStyleId}`)}
                style={{
                  top: `${quotePosition.y}%`,
                  fontSize: `${fontSize}px`,
                  textAlign: align,
                  color: textColor,
                  width: `${current.quoteWidth}%`,
                  left: `${quotePosition.x}%`,
                  transform: `translate(-50%, -50%) rotate(${current.quoteRotate}deg)`,
                  fontFamily: activeFont.family,
                }}
                onPointerDown={(event) => beginInteraction(event, "move")}
                onPointerMove={updateInteraction}
                onPointerUp={endInteraction}
                onPointerCancel={endInteraction}
              >
                <span className="quote-mark">“</span>
                <p>{quote}</p>
                {(showQuoteBy && author.trim() || showVoiceBy && displayedVoiceBy.trim()) && (
                  <span className="credit-row" style={{ justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center" }}>
                    {showQuoteBy && author.trim() && <span className="credit-pill"><small>Quote By</small><strong>{author}</strong></span>}
                    {showVoiceBy && displayedVoiceBy.trim() && <span className="credit-pill voice-credit"><small>Voice By</small><strong>{displayedVoiceBy}</strong></span>}
                  </span>
                )}
                <span
                  className="resize-handle"
                  role="slider"
                  aria-label="লেখা বড় বা ছোট করুন"
                  aria-valuemin={12}
                  aria-valuemax={38}
                  aria-valuenow={fontSize}
                  tabIndex={0}
                  onPointerDown={(event) => beginInteraction(event, "resize")}
                  onPointerMove={updateInteraction}
                  onPointerUp={endInteraction}
                  onPointerCancel={endInteraction}
                />
              </div>
              <a className="reel-brand" href="https://www.facebook.com/MidnightNoteofficial" target="_blank" rel="noreferrer" aria-label="মধ্যরাতের চিরকুট Facebook পেজ">
                <span className="brand-mini">ম</span><span><strong>মধ্যরাতের চিরকুট • Design By Shovon</strong><small>facebook.com/MidnightNoteofficial</small></span>
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
          <div className="control-section quote-library">
            <div className="control-label"><span className="inline-flex items-center gap-1"><Quote /> কোট লাইব্রেরি</span><span>{visibleQuotes.length}টি</span></div>
            <div className="quote-filter-row">
              {["সব", "একাকিত্ব", "অপেক্ষা", "বিচ্ছেদ", "স্মৃতি", "English"].map((filter) => (
                <Button key={filter} type="button" size="sm" variant={quoteLibraryFilter === filter ? "default" : "outline"} onClick={() => setQuoteLibraryFilter(filter)}>{filter}</Button>
              ))}
            </div>
            <label className="control-label quote-design-label" htmlFor="quoteDesign"><span>কোট দেখানোর ডিজাইন</span></label>
            <select id="quoteDesign" value={quoteStyleId} onChange={(event) => setQuoteStyleId(event.target.value as (typeof quoteStyles)[number]["id"])}>
              {quoteStyles.map((style) => <option key={style.id} value={style.id}>{style.label} — {style.detail}</option>)}
            </select>
            <div className="quote-library-list">
              {visibleQuotes.map((item) => (
                <article className="quote-library-item" key={item.id}>
                  <span>{item.category}</span>
                  <p>{item.text}</p>
                  <Button type="button" size="sm" variant="outline" onClick={() => applyLibraryQuote(item)}>এই কোট ব্যবহার করুন</Button>
                </article>
              ))}
            </div>
          </div>
          <div className="control-section">
            <label className="visibility-toggle same-person-toggle"><input type="checkbox" checked={sameCreditPerson} onChange={(event) => setSameCreditPerson(event.target.checked)} /><span>Quote By ও Voice By একই ব্যক্তি</span></label>
            <label className="control-label" htmlFor="author"><span>Quote By</span><span>ঐচ্ছিক</span></label>
            <input id="author" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder={sameCreditPerson ? "একবার নাম লিখুন" : "লেখক বা কোটদাতার নাম"} />
            <label className="visibility-toggle"><input type="checkbox" checked={showQuoteBy} onChange={(event) => setShowQuoteBy(event.target.checked)} /><span>Quote By দেখান</span></label>
          </div>
          <div className={cn("control-section", sameCreditPerson && "same-person-section")}>
            <label className="control-label" htmlFor="voiceBy"><span className="inline-flex items-center gap-1"><Mic2 /> Voice By</span><span>ঐচ্ছিক</span></label>
            <input id="voiceBy" value={sameCreditPerson ? author : voiceBy} onChange={(event) => setVoiceBy(event.target.value)} placeholder="কণ্ঠশিল্পীর নাম" disabled={sameCreditPerson} />
            <label className="visibility-toggle"><input type="checkbox" checked={showVoiceBy} onChange={(event) => setShowVoiceBy(event.target.checked)} /><span>Voice By দেখান</span></label>
          </div>
          <div className="control-section">
            <div className="control-label"><span>লেখার মাপ</span><strong>{fontSize}px</strong></div>
            <input aria-label="লেখার মাপ" type="range" min="12" max="38" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} />
          </div>
          <div className="control-section">
            <label className="control-label" htmlFor="textColor"><span>লেখার রঙ</span><strong>{textColor.toUpperCase()}</strong></label>
            <div className="color-control">
              <input id="textColor" type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} />
              {["#fff4e8", "#f7f2e8", "#1f2523", "#f3c969", "#d8e9f0", "#f2b8b5"].map((color) => (
                <Button key={color} type="button" variant="outline" size="icon" className="color-swatch" style={{ "--swatch-color": color } as CSSProperties} onClick={() => setTextColor(color)} aria-label={`${color} রঙ বেছে নিন`}><span /></Button>
              ))}
            </div>
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