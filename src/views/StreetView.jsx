import ScatterGallery from '../components/ScatterGallery';

// Positions are in canvas pixels on a 1500px-wide layout; width defaults to 500.
// Titles come from the photo file names.
const photos = [
  { name: 'street/buswindow', title: 'bus window', x: 100, y: 150 },
  { name: 'street/manhaircut', title: 'man haircut', x: 800, y: 350, width: 600 },
  { name: 'street/grannycage', title: 'granny cage', x: 200, y: 700 },
  { name: 'street/loversbynight', title: 'lovers by night', x: 600, y: 1100, width: 600 },
  { name: 'street/nycsubdoor', title: 'NYC subway door', x: 1000, y: 1600 },
  { name: 'street/wongkarcig', title: 'Wong Kar cig', x: 150, y: 1700 },
  { name: 'street/metal2', title: 'metal II', x: 300, y: 2100 },
  { name: 'street/womanthought', title: 'woman in thought', x: 900, y: 2400, width: 600 },
  { name: 'street/sunsetfree', title: 'sunset free', x: 150, y: 2700 },
  { name: 'street/newspaper', title: 'newspaper', x: 700, y: 3000 },
  { name: 'street/intothelight', title: 'into the light', x: 1000, y: 3370 },
  { name: 'street/metal1', title: 'metal I', x: 130, y: 3400 },
  { name: 'street/nycgirls', title: 'NYC girls', x: 800, y: 3900, width: 400 },
  { name: 'street/meat', title: 'meat', x: 50, y: 4200 },
  { name: 'street/mancagedsmoking', title: 'man caged, smoking', x: 400, y: 4700 },
  { name: 'street/cops', title: 'cops', x: 1400, y: 4800 },
  { name: 'street/womendespair', title: 'women in despair', x: 200, y: 5200 },
  { name: 'street/menwomen', title: 'men and women', x: 300, y: 5850 },
  { name: 'street/speedingby', title: 'speeding by', x: 950, y: 6000 },
  { name: 'street/ciggysunlight', title: 'ciggy in sunlight', x: 100, y: 6300 },
  { name: 'street/tuniswalk', title: 'Tunis walk', x: 650, y: 6600 },
  { name: 'street/nycsubwindow', title: 'NYC subway window', x: 400, y: 7000 },
  { name: 'street/nycsubstrangers', title: 'NYC subway strangers', x: 150, y: 7500 },
  { name: 'street/nycjazz', title: 'NYC jazz', x: 700, y: 7800 },
  { name: 'street/girlmen', title: 'girl and men', x: 130, y: 8170 },
  { name: 'street/kitchen', title: 'kitchen', x: 999, y: 8400 },
  { name: 'street/grandmagrandaughter', title: 'grandma and granddaughter', x: 100, y: 8700 },
  { name: 'street/banhmiladies', title: 'bánh mì ladies', x: 700, y: 9000 },
  { name: 'street/trafficman', title: 'traffic man', x: 990, y: 9500 },
  { name: 'street/nycshy', title: 'NYC shy', x: 190, y: 9600 },
  { name: 'street/menonbikes', title: 'men on bikes', x: 100, y: 10000 },
  { name: 'street/manwifemarket', title: 'man and wife at the market', x: 800, y: 10200 },
  { name: 'street/nyccrosstreet', title: 'NYC cross street', x: 50, y: 10500 },
  { name: 'street/napman', title: 'nap man', x: 400, y: 10800 },
  { name: 'street/camel', title: 'camel', x: 1400, y: 11100 },
  { name: 'street/boatthought', title: 'boat thought', x: 200, y: 11500 },
  { name: 'street/windowbus', title: 'window bus', x: 900, y: 11800 },
  { name: 'street/womentrash', title: 'women and trash', x: 300, y: 12200 },
  { name: 'street/vanmen', title: 'van men', x: 950, y: 12500 },
  { name: 'street/nycdoor', title: 'NYC door', x: 100, y: 12800 },
  { name: 'street/marketkid', title: 'market kid', x: 700, y: 13100 },
  { name: 'street/marketbike', title: 'market bike', x: 130, y: 13600 },
  { name: 'street/manthinking', title: 'man thinking', x: 999, y: 13700 },
  { name: 'street/manmarketgap', title: 'man, market gap', x: 100, y: 14000 },
  { name: 'street/coldnight', title: 'cold night', x: 700, y: 14300 },
  { name: 'street/bikevendor', title: 'bike vendor', x: 130, y: 14600 },
].map(({ title, ...photo }) => ({ ...photo, alt: `Street photograph: ${title}` }));

export default function StreetView() {
  return (
    <ScatterGallery title="street (observations of existence)" video="videos/ocean" photos={photos} backTo="/photography" />
  );
}
