import React, { useEffect, useState } from 'react';
import { useGetCatsQuery } from '../features/catsApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favoritesSlice';
import { RootState } from '../app/store';
import { useLocation } from 'react-router-dom';

const CatList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [allCats, setAllCats] = useState<any[]>([]);
  const { data: cats, error, isLoading, isFetching } = useGetCatsQuery(page);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setPage(1);
      setAllCats([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (cats) {
      setAllCats((prevCats) => [...prevCats, ...cats]);
    }
  }, [cats]);

  const loadMoreCats = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && allCats.length === 0) return <div className="text-center text-xl">Загрузка...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Ошибка при загрузке</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[5vw]">
        {allCats.map((cat) => {
          const isFavorite = favorites.some((fav) => fav.id === cat.id);
          return (
            <div
              key={cat.id}
              className="relative transition-all duration-300 hover:shadow-lg h-[225px]"
            >
              <div
                className="group w-full h-full transform transition-transform duration-300 hover:scale-[1.133]"
              >
                <img
                  src={cat.url}
                  alt="cat"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button
                  onClick={() => dispatch(toggleFavorite(cat))}
                  className="absolute bottom-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={isFavorite ? "/frontend-challenge/images/heart-filled.svg" : "/frontend-challenge/images/heart.svg"}
                    alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        {cats?.length === 0 ? (
          <p className="text-gray-500">Все котики загружены</p>
        ) : (
          <button
            onClick={loadMoreCats}
            disabled={isFetching || cats?.length === 0}
            className="text-black text-[14px] hover:underline"
          >
            ... загрузить еще котиков ...
          </button>
        )}
      </div>
    </div>
  );
};

export default CatList;