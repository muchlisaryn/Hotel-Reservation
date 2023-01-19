import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  order: [],
};

export const fetchOrderOne = createAsyncThunk(
  'order/fetchOneOrder',
  async id => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_SERVER}/cms/booking/${id}`,
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  },
);

const oneOrderSlice = createSlice({
  name: 'oneOrder',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrderOne.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchOrderOne.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchOrderOne.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isSuccess = true;
        state.isPending = false;
        state.errorMessage = '';
      });
  },
});

export default oneOrderSlice.reducer;
