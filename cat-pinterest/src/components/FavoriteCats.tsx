import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favoritesSlice';
import { RootState } from '../app/store';

const FavoriteCats: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      {favorites.length === 0 ? (
        <p className="text-center text-xl">Нет избранных котиков</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[3vw]">
          {favorites.map((cat) => (
            <div
              key={cat.id}
              className="relative transition-all duration-300 h-[225px]"
            >
              <div
                className="group w-full h-full transform transition-transform duration-300 hover:scale-[1.133]"
              >
                <img
                  src={cat.url}
                  alt="cat"
                  className="w-full h-full object-cover"
                  loading='lazy'
                />
                <button
                  onClick={() => dispatch(toggleFavorite(cat))}
                  className="absolute bottom-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src="/frontend-challenge/images/heart-filled.svg"
                    alt="Remove from favorites"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCats;