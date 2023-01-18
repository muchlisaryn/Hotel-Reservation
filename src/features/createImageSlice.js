import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  imageId: null,
  error: null,
  success: false,
};

export const createImage = createAsyncThunk(
  'image/createImage',
  async props => {
    const {photoPayment} = props;

    let imagePayment = new FormData();
    imagePayment.append('payment', {
      uri: photoPayment?.uri,
      name: photoPayment?.fileName,
      type: photoPayment?.type,
    });

    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL_SERVER}/cms/images/payment`,
      data: imagePayment,
      headers: {'Content-Type': 'multipart/form-data'},
    });

    console.log(res);
    if (res.data.data) {
      return res.data.data;
    }
  },
);

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createImage.pending, state => {
        state.loading = true;
        state.userToken = null;
        state.success = false;
        state.error = null;
      })
      .addCase(createImage.rejected, (state, action) => {
        state.loading = false;
        state.userToken = null;
        state.success = false;
        state.error = action.error;
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.imageId = action.payload._id;
        state.loading = false;
        state.success = true;
      });
  },
});

export default imageSlice.reducer;
