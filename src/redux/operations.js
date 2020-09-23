import axios from 'axios';
import {
  getFormValueFetch,
  getFormValueSuccess,
  getFormValueError,
  getFormValue,
} from './actions';
import store from './store';

export const getDataFromDB = param => async (dispatch, getState) => {
  try {
    const data = await axios.get(
      `https://phonebook-c7b0b.firebaseio.com/phoneBook.json`,
    );
    const keys = Object.keys(data.data);

    const result = keys.reduce((acc, key) => {
      acc.push({ id: key, ...data.data[key] });

      return acc;
    }, []);

    dispatch(getFormValue(result));
  } catch (e) {
    console.log(e);
  }
};

export const postFormValueAsync = param => async (dispatch, getState) => {
  dispatch(getFormValueFetch());
  try {
    const data = await axios.post(
      `https://phonebook-c7b0b.firebaseio.com/phoneBook.json`,
      param,
    );
    dispatch(getFormValueSuccess({ ...param, id: data.data.name }));
  } catch (e) {
    dispatch(getFormValueError(e));
  } finally {
    dispatch(getFormValueFetch());
  }
};

export const deleteContactAsync = param => async (dispatch, getState) => {
  console.log('param', param);
  try {
    const data = await axios.delete(
      `https://phonebook-c7b0b.firebaseio.com/phoneBook/${param}.json`,
    );

    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data);
  } catch (e) {
    console.log(e);
  }
};
