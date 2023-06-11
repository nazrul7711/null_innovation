import { TypedUseSelectorHook,useDispatch, useSelector } from "react-redux";
import type { rootState,appDispatch } from "./store/store";

type DispatchFunc  = ()=>appDispatch
export const useAppDispatch : DispatchFunc = useDispatch
export const useAppSelector : TypedUseSelectorHook<rootState> = useSelector