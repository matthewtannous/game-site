/**
 * THIS FILE IS NOT NECESSARY FOR REDUX
 * It is only used to reduce repetition
 *
 * useSelector: Reads state from the store
 * useDispatch: Returns the store's dispatch so we can dispatch signIn and signOut actions
 * useCallback: React hook (not from redux) that allows caching functions between re-renders
 *              useCallback(fn, [dependencies])
 *              fn: the function to cache. React will return it during initial render.
 *              dependencies: values referenced inside the function fn.
 *                            When a dependency changes, React will return the function with the current dependencies
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signIn as signInAction,
  signOut as signOutAction,
} from '../slices/authSlice';

export function useAuth() {
  const dispatch = useDispatch(); // to dispatch actions
  const user = useSelector((state) => state.auth.user); // get user from state

  // useCallback caches the function for optimization
  const signIn = useCallback(
    (userData) => {
      dispatch(signInAction(userData));
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    dispatch(signOutAction());
  }, [dispatch]);

  return { user, signIn, signOut };
}
