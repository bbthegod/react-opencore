/**
 *
 * HomePage
 *
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHomePageSlice } from './slice';
import { selectHomePage } from './slice/selectors';

interface Props {}

export function HomePage(props: Props) {
  const { actions } = useHomePageSlice();
  const dispatch = useDispatch();
  const data = useSelector(selectHomePage);
  console.log(data);
  useEffect(() => {
    dispatch(actions.get());
  }, [actions, dispatch]);
  return <h1>Hi HomePage </h1>;
}
