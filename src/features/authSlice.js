import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  user: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

export const auth = createAsyncThunk('auth/authUser', async props => {
  const {email, password} = props;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/cms/auth/signin`,
      {
        email: email,
        password: password,
      },
    );

    return response.data;
  } catch (err) {
    throw err;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeLogin: state => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user[action.payload.prop] = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.pending, state => {
        state.loading = true;
        state.userToken = null;
        state.success = false;
        state.error = null;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.userToken = null;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.userToken = null;
        state.success = true;
        state.error = '';
      });
  },
});

export const {setUser, removeLogin, updateUser} = authSlice.actions;
export default authSlice.reducer;
