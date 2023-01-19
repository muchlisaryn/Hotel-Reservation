import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import favoriteReducer from './features/favoriteSlice';
import hotelReducer from './features/hotelSlice';
import loginReducer from './features/loginSlice';
import logger from 'redux-logger';
import ReviewSlice from './features/ReviewSlice';
import detailHotelSlice from './features/detailHotelSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import getRoomsSlice from './features/getRoomsSlice';
import photoHotelSlice from './features/photoHotelSlice';
import authReducer from './features/authSlice';
import orderReducer from './features/bookingSlice';
import imageReducer from './features/createImageSlice';
import allOrderReducer from './features/orderHistorySlice';
import oneOrderReducer from './features/getOneBooking';
import guestReducer from './features/guestSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'hotel',
    'review',
    'detail',
    'rooms',
    'imageId',
    'order',
    'allOrder',
    'guestSlice',
    'guest',
  ],
};

const rootReducer = combineReducers({
  favorite: favoriteReducer,
  login: loginReducer,
  hotel: hotelReducer,
  review: ReviewSlice,
  detail: detailHotelSlice,
  rooms: getRoomsSlice,
  photo: photoHotelSlice,
  auth: authReducer,
  order: orderReducer,
  oneOrder: oneOrderReducer,
  allOrder: allOrderReducer,
  imageId: imageReducer,
  guest: guestReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});
