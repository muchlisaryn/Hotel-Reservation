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
    guest,
    imagePayment,
    order_id,
    hotel_id,
    codeBooking,
    hotel_name,
    address_hotel,
    countRoom,
    countPerson,
    name_room,
    DateCheckIn,
    DateCheckOut,
    price,
    charge_pay,
    transaction_time,
  } = props;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/cms/booking`,
      {
        customer: customerID,
        guest,
        image_payment: imagePayment,
        order_id,
        codeBooking,
        hotel_name,
        hotel_id,
        address_hotel,
        countRoom,
        countPerson,
        name_room,
        checkIn: DateCheckIn,
        checkOut: DateCheckOut,
        Total_payment: price,
        charge_pay,
        transaction_time: transaction_time,
        currentStatus: 'Diproses',
        statusOrder: 'Menunggu Pembayaran di verifikasi',
        statusPayment: 'Pembayaran Sedang di verifikasi',
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
