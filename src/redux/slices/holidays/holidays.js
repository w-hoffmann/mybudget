import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import {
  getHolidaysByFilter,
  getHolidaysNowYear,
  getRegions,
  removeHolidayById,
  uploadExcel,
} from "./holidaysActions";

const initialState = {
  needRefreshData: false, // после удаления необходимо заново по установленным фильтрам запросить актуальные данные
  loadingHolidays: false, // отображение загрузки
  holidays: null, // пользователь
  error: null, // значение ошибки
  regions: [],
  filterRegion: null, // ВЫБРАННЫЙ фильтр регионов
  filterDate: "01.05.2023-31.05.2023", // фильтр дат
};

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setFilterRegion: (state, { payload }) => {
      // если выбран Alle - делаем запрос без фильтров по регионам
      if (payload == ["Alle"]) {
        return (state.filterRegion = null);
      }
      state.filterRegion = payload;
    },
    setFilterDate: (state, { payload }) => {
      state.filterDate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // получить все праздники текущего года
      .addCase(getHolidaysNowYear.pending, (state) => {
        state.loadingHolidays = true;
        state.holidays = null;
      })
      .addCase(getHolidaysNowYear.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = action.payload;
      })
      .addCase(getHolidaysNowYear.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = null;
        state.error = action.payload;
      })
      // получить праздники по фильтру
      .addCase(getHolidaysByFilter.pending, (state) => {
        state.loadingHolidays = true;
        state.holidays = null;
        state.error = null;
      })
      .addCase(getHolidaysByFilter.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = action.payload;
      })
      .addCase(getHolidaysByFilter.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.holidays = null;
        state.error = action.payload;
      })
      // получить все регионы
      .addCase(getRegions.pending, (state) => {
        state.loadingHolidays = true;
        state.regions = null;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.regions = action.payload;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.regions = null;
        state.error = action.payload;
      })
      // удалить праздник по id
      .addCase(removeHolidayById.pending, (state) => {
        state.loadingHolidays = true;
        state.needRefreshData = false;
      })
      .addCase(removeHolidayById.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = true;
      })
      .addCase(removeHolidayById.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = false;
        state.error = action.payload;
      })
      // загрузка excel на сервер
      .addCase(uploadExcel.pending, (state) => {
        state.loadingHolidays = true;
        state.needRefreshData = false;
      })
      .addCase(uploadExcel.fulfilled, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = true;
      })
      .addCase(uploadExcel.rejected, (state, action) => {
        state.loadingHolidays = false;
        state.needRefreshData = false;
        state.error = action.payload;
      });
  },
});

export const { setFilterRegion, setFilterDate } = holidaySlice.actions;
export default holidaySlice.reducer;
