import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {headers} from '../utils';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  photo: [],
};

export const fetchPhoto = createAsyncThunk('photo/fetchPhoto', async props => {
  const {hotel_id} = props;
  try {
    const response = await axios.get(
      'https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos',
      {
        params: {
          hotel_ids: hotel_id,
          languagecode: 'id',
        },
        headers,
      },
    );
    return response.data.data[hotel_id];
  } catch (err) {
    throw err;
  }
});

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhoto.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchPhoto.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        state.isSuccess = true;
        state.isPending = false;
        state.errorMessage = '';
      });
  },
});

export const {} = photoSlice.actions;
export default photoSlice.reducer;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.request({
//         method: 'GET',
//         url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos',
//         params: {hotel_ids: hotel_id, languagecode: 'id'},
//         headers,
//       });
//       console.log(process.env.REACT_APP_API_KEY);
//       setHotelPhotos(response.data.data[hotel_id]);
//     } catch (e) {
//       throw e;
//     }
//   };
//   fetchData();
// }, []);
