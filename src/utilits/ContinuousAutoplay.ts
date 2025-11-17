export default function ContinuousAutoplay(speed = 0.3) {
  return (slider: any) => {
    let raf: number;
    let lastTime: number;

    function animate(time: number) {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!slider || !slider.track || !slider.track.details) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const track = slider.track;
      const newPos = track.details.position + speed * (dt / 16);
      track.to(newPos); // smooth kaydırma

      raf = requestAnimationFrame(animate);
    }

    slider.on("created", () => {
      raf = requestAnimationFrame(animate);
    });

    slider.on("dragStarted", () => cancelAnimationFrame(raf));
    slider.on("dragEnded", () => {
      lastTime = 0; // zamanı sıfırla ki ani sıçrama olmasın
      raf = requestAnimationFrame(animate);
    });

    slider.on("destroyed", () => cancelAnimationFrame(raf));
  };
}
