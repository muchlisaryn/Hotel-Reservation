import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  guest: null,
  error: null,
  success: false,
};

export const createGuest = createAsyncThunk(
  'guest/createGuest',
  async props => {
    const {name, telephone, email} = props;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_SERVER}/cms/guest`,
        {
          name,
          telephone,
          email,
        },
      );
      return response.data.data._id;
    } catch (err) {
      throw err;
    }
  },
);

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createGuest.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createGuest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.guest = action.payload;
        state.loading = false;
        state.success = true;
        state.error = '';
      });
  },
});

export default guestSlice.reducer;
