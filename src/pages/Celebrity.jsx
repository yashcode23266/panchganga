// components/Celebrity.jsx
import React from 'react';
import MasonryGrid from '../components/ui/MasonryGrid.jsx';
// Local celebrity images — place celeb1.jpg ... celeb29.jpg in /public/images/
const galleryItems = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  src: `/images/celeb${i + 1}.jpg`,
}));

const Celebrity = () => {
  return (
    <div className="w-full min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
            Celebrity Gallery
          </h1>
          <p className="text-lg text-muted-foreground">
            A curated showcase of iconic faces
          </p>
        </div>

        <MasonryGrid
          items={galleryItems}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
          gap="1rem"
          renderItem={(item) => (
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card">
              <img
                src={item.src}
                alt={`Celebrity photo ${item.id}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Celebrity;