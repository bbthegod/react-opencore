import { RootState } from 'types/RootState';
import { createSlice as createSliceOriginal, SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit';

type RootStateKeyType = keyof RootState;

/* Wrap createSlice with stricter Name options */

/* istanbul ignore next */
export const createSlice = <State, CaseReducers extends SliceCaseReducers<State>, Name extends RootStateKeyType>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
  return createSliceOriginal(options);
};
