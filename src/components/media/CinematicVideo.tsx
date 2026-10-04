import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Activity } from 'lucide-react';

interface CinematicVideoProps {
  videoSrc?: string;
  posterSrc?: string;
}

export function CinematicVideo({
  videoSrc = '/assets/ai-hero-video.mp4',
  posterSrc,
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser restricts play, toggle state safely
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  // Try muted autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [videoSrc]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence in Motion</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            See the NEXORA Neural Engine at Work
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl text-balance">
            Watch how our orchestrator coordinates multiple specialized models, parses complex unstructured workflows, and returns deterministic results in milliseconds.
          </p>
        </div>

        {/* Cinematic Media Container */}
        <div
          ref={containerRef}
          className="relative group w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0b1329] to-[#04060a] shadow-2xl shadow-cyan-950/40"
        >
          {/* Aspect ratio frame (16:9) */}
          <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden">
            {/* Real HTML5 Video element with fallback error handling */}
            {!hasError ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onError={() => setHasError(true)}
                aria-label="NEXORA AI Cinematic Platform Demonstration"
              />
            ) : null}

            {/* If video fails to load or before media asset is present, show high-fidelity cinematic simulated engine */}
            {hasError && (
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-radial-vignette p-6">
                {/* Simulated Neural Network Animation */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[spin_25s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-sky-400/30 animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="absolute inset-10 rounded-full border border-blue-500/25 animate-ping duration-1000" />
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                    <Activity className="w-10 h-10 text-white animate-pulse" />
                  </div>
                </div>

                <div className="mt-6 text-center max-w-md">
                  <span className="text-xs font-mono uppercase text-cyan-300 tracking-wider">
                    Neural Orchestration Stream
                  </span>
                  <p className="text-sm text-slate-300 mt-1">
                    Continuous pipeline validation and autonomous task routing live feed
                  </p>
                </div>
              </div>
            )}

            {/* Gradient Overlay for Cinematic Depth & Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Play / Pause Central Click Overlay */}
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none group/play"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <div
                className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center shadow-xl shadow-black/50 transition-all duration-300 ${
                  isPlaying
                    ? 'opacity-0 group-hover/play:opacity-100 scale-90 group-hover/play:scale-100'
                    : 'opacity-100 scale-100'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-6 sm:w-8 h-6 sm:h-8 text-cyan-300" />
                ) : (
                  <Play className="w-6 sm:w-8 h-6 sm:h-8 text-cyan-300 fill-cyan-400 translate-x-0.5" />
                )}
              </div>
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-2 z-20">
              {/* Scrub line indicator */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="hidden sm:inline text-slate-400 text-[11px] font-mono">
                    NEXORA / ARCHITECTURE OVERVIEW
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-slate-400">Stream Synchronized</span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
