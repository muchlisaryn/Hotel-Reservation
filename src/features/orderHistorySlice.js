import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  allOrder: [],
};

export const fetchOrder = createAsyncThunk('order/fetchOrder', async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_SERVER}/cms/booking`,
    );
    console.log(process.env.REACT_APP_API_KEY);
    return response.data.data;
  } catch (err) {
    throw err;
  }
});

const allOrderSlice = createSlice({
  name: 'allOrder',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.allOrder = action.payload;
        state.isSuccess = true;
        state.isPending = false;
        state.errorMessage = '';
      });
  },
});

export default allOrderSlice.reducer;
