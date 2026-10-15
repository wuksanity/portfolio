import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Lightbox from '../components/Lightbox';
import Photo from '../components/Photo';
import { getImage, getVideo } from '../media';
import "./ActingModeling.css"

function ActingModeling() {
  const [activeTab, setActiveTab] = useState("modeling")
  const navigate = useNavigate()

  return (
    <div className="acting-modeling-page">
      <BackButton onClick={() => navigate('/')} tone="light" className="back-button-fixed">
        take me home
      </BackButton>
      {/* Navigation */}
      <nav className="main-navigation">
        <div className="tab-buttons-container">
          <button
            onClick={() => setActiveTab("modeling")}
            className={`tab-button ${activeTab === "modeling" ? "active-tab" : "inactive-tab"}`}
          >
            MODELING
          </button>
          <button
            onClick={() => setActiveTab("acting")}
            className={`tab-button ${activeTab === "acting" ? "active-tab" : "inactive-tab"}`}
          >
            ACTING
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="content-container">
        {activeTab === "modeling" ? <ModelingTab /> : <ActingTab />}
      </div>
    </div>
  )
}

// Modeling grid tiles in order. On wider screens a tile spans `cols` of 12 columns and
// `rows` rows; the spans are chosen so each tile has about the same shape as its photo,
// and so every band of rows is filled edge to edge. On phones (2 columns) a tile is either
// full width or half (`half`), shaped by its photo.
const tiles = [
  // A band three rows tall: two large portraits and a column of three small ones
  { name: 'modeling/tank2', alt: 'Portrait modeling shot', cols: 5, rows: 3 },
  { name: 'modeling/jean5', alt: 'Fashion modeling shot', cols: 5, rows: 3 },
  { name: 'modeling/wake1', alt: 'Editorial shot', cols: 2, rows: 1, half: true },
  { name: 'modeling/wake2', alt: 'Beauty shot', cols: 2, rows: 1, half: true },
  { name: 'modeling/lamin1', alt: 'Studio portrait', cols: 2, rows: 1 },
  // Two rows: the reel and three portraits
  { video: 'modeling/lamin', label: 'Video reel', cols: 3, rows: 2 },
  { name: 'modeling/jean2', alt: 'Lifestyle shot', cols: 3, rows: 2, half: true },
  { name: 'modeling/digital-stool', alt: 'Modeling digital, seated', cols: 3, rows: 2, half: true },
  { name: 'modeling/red1', alt: 'Detail shot', cols: 3, rows: 2 },
  // Two rows: the landscape shots side by side
  { name: 'modeling/digital-tank', alt: 'Modeling digital, white background', cols: 6, rows: 2 },
  { name: 'modeling/spotlight', alt: 'Editorial shot in a spotlight', cols: 6, rows: 2 },
  // Two rows: three portraits
  { name: 'modeling/lamin3', alt: 'Campaign shot', cols: 4, rows: 2, half: true },
  { name: 'modeling/lamin2', alt: 'Artistic shot', cols: 4, rows: 2, half: true },
  { name: 'modeling/elevator', alt: 'Editorial shot in an elevator', cols: 4, rows: 2 },
]

// The grid's geometry at a 1440px-wide window (12 columns of 82px, 24px gaps, 250px rows).
// It scales with the window, so this is enough to tell the browser how wide a file to fetch.
function tileSizes(tile, image) {
  const width = tile.cols * 82 + (tile.cols - 1) * 24
  const height = tile.rows * 250 + (tile.rows - 1) * 24
  const filled = Math.max(width, (height * image.width) / image.height) // object-fit: cover
  return `(max-width: 640px) ${tile.half ? 50 : 100}vw, ${Math.ceil((filled / 1440) * 100)}vw`
}

function tileStyle(tile, media) {
  return {
    '--cols': tile.cols,
    '--rows': tile.rows,
    '--phone-cols': tile.half ? 1 : 2,
    '--phone-shape': media ? `${media.width} / ${media.height}` : undefined,
  }
}

function ModelingTab() {
  const [selected, setSelected] = useState(null);
  const closeLightbox = useCallback(() => setSelected(null), []);

  return (
    <div className="modeling-container">
      {/* Artistic Grid Layout */}
      <div className="modeling-grid">
        {tiles.map((tile) => {
          if (tile.video) {
            const clip = getVideo(tile.video);
            return (
              <div key={tile.video} className="grid-item" style={tileStyle(tile, clip)}>
                {clip && (
                  <video
                    className="grid-video"
                    src={clip.src}
                    poster={clip.poster}
                    aria-label={tile.label}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                )}
              </div>
            );
          }
          const image = getImage(tile.name);
          if (!image) return null;
          return (
            <div
              key={tile.name}
              className="grid-item clickable"
              style={tileStyle(tile, image)}
              onClick={() => setSelected(tile)}
            >
              <Photo name={tile.name} alt={tile.alt} sizes={tileSizes(tile, image)} className="grid-image" />
              <div className="image-overlay" />
            </div>
          );
        })}
      </div>

      {selected && <Lightbox name={selected.name} alt={selected.alt} onClose={closeLightbox} />}
    </div>
  );
}

// Ranked by importance: 1 is the most important. Clips appear in this order.
const clips = [
  { name: 'acting/ganzberg-tvc', title: 'Ganzberg', kind: 'TV commercial' },
  { name: 'acting/venus-de-saigon-1', title: 'Venus de Saigon', kind: 'Scene 1' },
  { name: 'acting/venus-de-saigon-2', title: 'Venus de Saigon', kind: 'Scene 2' },
  { name: 'acting/oneplus-tvc', title: 'OnePlus', kind: 'TV commercial' },
  { name: 'acting/vertical-2', title: 'Short-form drama', kind: 'Vertical series' },
  { name: 'acting/vertical-1', title: 'After Breakup, He Proposes', kind: 'Vertical series' },
  { name: 'acting/chinsu-tvc', title: 'Chinsu', kind: 'TV commercial' },
  { name: 'acting/wake-campaign', title: 'Wake', kind: 'Campaign' },
  { name: 'acting/asus-tvc', title: 'ASUS', kind: 'TV commercial' },
]

// How many clips share each row, top to bottom: the top-ranked clip gets a row to itself.
const CLIPS_PER_ROW = [1, 2, 3, 3]

function ActingTab() {
  // One clip at a time: starting one pauses whichever was playing.
  const pauseOthers = (e) => {
    document.querySelectorAll('.clip-video').forEach((video) => {
      if (video !== e.currentTarget) video.pause();
    });
  };

  const rows = [];
  let start = 0;
  for (const count of CLIPS_PER_ROW) {
    rows.push(clips.slice(start, start + count));
    start += count;
  }
  if (start < clips.length) rows.push(clips.slice(start));

  return (
    <div className="clips">
      {rows.map((row) => (
        <div key={row[0].name} className="clips-row">
          {row.map((clip) => {
            const video = getVideo(clip.name);
            if (!video) return null;
            const shape = video.width / video.height;
            return (
              // Each clip grows in proportion to its shape, so a row's clips share one height.
              <figure key={clip.name} className="clip" style={{ flexGrow: shape, '--shape': shape }}>
                <video
                  className="clip-video"
                  src={video.src}
                  poster={video.poster}
                  width={video.width}
                  height={video.height}
                  aria-label={`${clip.title}, ${clip.kind}`}
                  controls
                  preload="none"
                  playsInline
                  onPlay={pauseOthers}
                />
                <figcaption className="clip-caption">
                  <span className="clip-title">{clip.title}</span> · {clip.kind}
                </figcaption>
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ActingModeling;
