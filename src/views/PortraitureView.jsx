import ScatterGallery from '../components/ScatterGallery';

// Positions are in canvas pixels on a 1500px-wide layout; width defaults to 500.
const photos = [
  { name: 'portraits/rus3', x: 100, y: 150 },
  { name: 'portraits/fence1', x: 800, y: 350, width: 600 },
  { name: 'portraits/lamp1', x: 200, y: 700 },
  { name: 'portraits/rah2', x: 600, y: 1100, width: 600 },
  { name: 'portraits/shade2', x: 1000, y: 1600 },
  { name: 'portraits/rope4', x: 150, y: 1700 },
  { name: 'portraits/loon1', x: 300, y: 2100 },
  { name: 'portraits/stop1', x: 900, y: 2400, width: 600 },
  { name: 'portraits/lamp', x: 150, y: 2700 },
  { name: 'portraits/nam1', x: 700, y: 3000 },
  { name: 'portraits/bag1', x: 1000, y: 3370 },
  { name: 'portraits/rus1', x: 130, y: 3400 },
  { name: 'portraits/loon2', x: 800, y: 3900, width: 400 },
  { name: 'portraits/rope1', x: 50, y: 4200 },
  { name: 'portraits/decay2', x: 400, y: 4700 },
  { name: 'portraits/stop3', x: 1400, y: 4800 },
  { name: 'portraits/rope2', x: 200, y: 5200 },
  { name: 'portraits/duck2', x: 900, y: 5400 },
  { name: 'portraits/blank1', x: 300, y: 5850 },
  { name: 'portraits/abandoned1', x: 950, y: 6000 },
  { name: 'portraits/box1', x: 100, y: 6300 },
  { name: 'portraits/fence2', x: 650, y: 6600 },
  { name: 'portraits/hole1', x: 400, y: 7000 },
  { name: 'portraits/fight2', x: 995, y: 7300 },
  { name: 'portraits/box2', x: 150, y: 7500 },
  { name: 'portraits/shade1', x: 700, y: 7800 },
  { name: 'portraits/phone1', x: 130, y: 8170 },
  { name: 'portraits/nam2', x: 999, y: 8400 },
  { name: 'portraits/decay1', x: 100, y: 8700 },
  { name: 'portraits/lamp2', x: 700, y: 9000 },
  { name: 'portraits/rah1', x: 990, y: 9500 },
  { name: 'portraits/bubble1', x: 190, y: 9600 },
  { name: 'portraits/rus2', x: 100, y: 10000 },
  { name: 'portraits/mop1', x: 800, y: 10200 },
  { name: 'portraits/rope3', x: 50, y: 10500 },
  { name: 'portraits/fight1', x: 400, y: 10800 },
  { name: 'portraits/mop2', x: 1400, y: 11100 },
  { name: 'portraits/duck1', x: 200, y: 11500 },
  { name: 'portraits/loon3', x: 900, y: 11800 },
  { name: 'portraits/bag2', x: 300, y: 12200 },
  { name: 'portraits/drag1', x: 950, y: 12500 },
  { name: 'portraits/stop2', x: 100, y: 12800 },
  { name: 'portraits/hole2', x: 700, y: 13100 },
  { name: 'portraits/rah3', x: 130, y: 13600 },
  { name: 'portraits/gym1', x: 999, y: 13700 },
].map((photo) => ({ ...photo, alt: `Portrait from the ${seriesOf(photo.name)} series` }));

// 'portraits/lamp2' -> 'lamp'
function seriesOf(name) {
  return name.split('/')[1].replace(/\d+$/, '');
}

export default function PortraitureView() {
  return <ScatterGallery title="people i have come to know" video="videos/vin" photos={photos} backTo="/photography" />;
}
