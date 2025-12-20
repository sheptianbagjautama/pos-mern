import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId:"",
  customerName: "",
  customerPhone: "",
  guest: 0,
  tableNo: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, phone, guest, tableNo } = action.payload;
      state.orderId = `${Date.now()}`;
      state.customerName = name;
      state.customerPhone = phone;
      state.guest = guest;
      state.tableNo = tableNo;
    },

    removeCustomer: (state) => {
      state.customerName = "";
      state.customerPhone = "";
      state.guest = 0;
      state.tableNo = "";
    },

    updateTable: (state, action) => {
      state.tableNo = action.payload.tableNo;
    },
  },
});

export const { setCustomer, removeCustomer, updateTable} = customerSlice.actions;
export default customerSlice.reducer;
