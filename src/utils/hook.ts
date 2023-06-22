import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";
import type {RootState, AppDispatch} from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();// Export a hook that can be reused to resolve types
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;