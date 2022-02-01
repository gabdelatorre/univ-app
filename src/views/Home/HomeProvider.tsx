import { createContext, FC, useContext } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useAuthContext } from '../AuthProvider';
import { favouriteUniversity } from '../../redux/modules/firebase/actions';
import { TUserData } from '../../redux/types';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { useTypedSelector } from '../../utils/useTypedSelector';

const HomeContext = createContext({});

export interface THomeProviderReturn {
  userData: TUserData;
  handleFavourite: (name: string) => void;
}

export const HomeProvider: FC = ({ children }) => {
  const { auth } = useAuthContext();
  const dispatch = useAppDispatch();

  useFirestoreConnect([
    {
      collection: 'users',
      doc: auth.uid,
    },
  ]);
  const userData = useTypedSelector(({ firestore: { data } }) => data.users && data.users[auth.uid]) ?? {};

  const handleFavourite = (name: string) => {
    const indexOfFavourite = userData.favourites?.indexOf(name);

    dispatch(favouriteUniversity({ name, isFavourite: indexOfFavourite === -1 }));
  };

  const values = { userData, handleFavourite };
  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
};

export const useHomeContext = (): THomeProviderReturn => useContext(HomeContext) as THomeProviderReturn;
