import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  order: null,
  error: null,
  success: false,
};

export const order = createAsyncThunk('booking/bookingOrder', async props => {
  const {
    customerID,
    order_id,
    hotel_id,
    codeBooking,
    countRoom,
    countPerson,
    name_room,
    hotelName,
    DateCheckIn,
    DateCheckOut,
    price,
    imagePayment,
    transaction_time,
  } = props;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/cms/booking`,
      {
        customer: customerID,
        order_id: order_id,
        hotel_id: hotel_id,
        codeBooking,
        countRoom,
        countPerson,
        name_room,
        hotelName: hotelName,
        checkIn: DateCheckIn,
        checkOut: DateCheckOut,
        Total_payment: price,
        image_payment: imagePayment,
        transaction_time: transaction_time,
        statusOrder: false,
        statusPayment: 'Sedang di verifikasi',
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(order.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(order.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
      })
      .addCase(order.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.success = true;
        state.error = '';
      });
  },
});

export default orderSlice.reducer;
