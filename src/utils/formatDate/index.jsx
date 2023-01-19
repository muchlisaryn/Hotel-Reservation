import {Input} from '../../component/atoms';

export const shortMonth = new Intl.DateTimeFormat('id', {month: 'short'});

export const lengthOfDay = (date1, date2) => {
  let day1 = new Date(date1);
  let day2 = new Date(date2);
  let differenceInTime = day2.getTime() - day1.getTime();
  let differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays;
};

export const convertDate = input => {
  const pad = s => {
    return s < 10 ? '0' + s : s;
  };
  var d = new Date(input);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};

export const formatDate = date => {
  const d = new Date(date);

  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

export const localDate = date => {
  date.toLocaleDateString('pt-PT');
};
