import { ChartWidget } from "./ChartWidget";

export function ImageExplainView() {
  return (
    <ChartWidget title="Grad-CAM Activation Map" subtitle="Pixel-level attention overlay for classification decision">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Original Input</p>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-32 h-32 mx-auto rounded-xl bg-muted-foreground/10 flex items-center justify-center">
                  <span className="text-4xl">🖼️</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">input_image.jpg</p>
                <p className="text-xs text-muted-foreground">224×224 RGB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grad-CAM Overlay */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Grad-CAM Heatmap Overlay</p>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
            <div className="w-full h-full relative">
              {/* Base image simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary" />
              {/* Heatmap overlay */}
              <div className="absolute inset-0">
                {/* Hot zones */}
                <div
                  className="absolute rounded-full blur-xl"
                  style={{
                    top: "25%", left: "30%", width: "40%", height: "35%",
                    background: "radial-gradient(ellipse, hsla(0, 90%, 50%, 0.7), hsla(25, 95%, 53%, 0.4), hsla(45, 93%, 47%, 0.2), transparent)",
                  }}
                />
                <div
                  className="absolute rounded-full blur-lg"
                  style={{
                    top: "45%", left: "50%", width: "25%", height: "20%",
                    background: "radial-gradient(ellipse, hsla(0, 90%, 50%, 0.6), hsla(25, 95%, 53%, 0.3), transparent)",
                  }}
                />
                {/* Warm zone */}
                <div
                  className="absolute rounded-full blur-2xl"
                  style={{
                    top: "15%", left: "20%", width: "60%", height: "55%",
                    background: "radial-gradient(ellipse, hsla(45, 93%, 47%, 0.15), transparent)",
                  }}
                />
              </div>
              {/* Bounding box */}
              <div
                className="absolute border-2 border-gradcam-hot rounded-md"
                style={{ top: "20%", left: "25%", width: "45%", height: "40%" }}
              >
                <span className="absolute -top-5 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-gradcam-hot text-primary-foreground">
                  0.94 conf
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color scale */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-[10px] text-muted-foreground">Low activation</span>
        <div className="flex h-2 w-40 rounded-full overflow-hidden">
          <div className="flex-1" style={{ background: "hsl(210 100% 56%)" }} />
          <div className="flex-1" style={{ background: "hsl(180 60% 45%)" }} />
          <div className="flex-1" style={{ background: "hsl(120 60% 45%)" }} />
          <div className="flex-1" style={{ background: "hsl(45 93% 47%)" }} />
          <div className="flex-1" style={{ background: "hsl(25 95% 53%)" }} />
          <div className="flex-1" style={{ background: "hsl(0 78% 55%)" }} />
        </div>
        <span className="text-[10px] text-muted-foreground">High activation</span>
      </div>
    </ChartWidget>
  );
}
