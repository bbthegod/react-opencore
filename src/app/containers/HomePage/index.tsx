/*
 *
 * HomePage
 *
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectData } from './slice/selectors';
import { actions } from './slice';

interface Props {}

export default function HomePage(props: Props) {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);
  console.log(data);
  return <h1>Hi HomePage </h1>;
}
