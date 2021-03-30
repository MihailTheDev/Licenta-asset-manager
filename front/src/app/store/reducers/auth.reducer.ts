// import { Action, createReducer, on } from '@ngrx/store';

// import { Item } from '../../shared/models/item.model';
// import * as ItemActions from '../actions/item.actions';

// const initialAuth:

// const initialItems: Item[] = [
//   {
//     id: 0,
//     name: 'First item',
//     details: 'dummy details',
//     completedPercentage: 0,
//     complexity: 1,
//   },
//   {
//     id: 1,
//     name: 'Second item',
//     details: 'dummy details',
//     completedPercentage: 100,
//     complexity: 1,
//   },
// ];

// const createItem = (items, item) => [...items, item];
// const updateItem = (items, item) =>
//   items.map((i) => (i.id === item.id ? item : i));
// const deleteItem = (items, item) =>
//   items.filter((i) => {
//     return i.id !== item.id;
//   });

// export interface ItemState {
//   items: Item[];
//   selectedItem: number;
// }

// export const initialState: ItemState = {
//   items: initialItems,
//   selectedItem: null,
// };



// const itemReducer = createReducer(
//   initialState,
//   on(ItemActions.selectItem, (state, payload) => ({
//     ...state,
//     selectedItem: payload.selectedItem,
//   })),
//   on(ItemActions.createItem, (state, payload) => ({
//     ...state,
//     items: createItem(state.items, payload.item),
//   })),
//   on(ItemActions.updateItem, (state, payload) => ({
//     ...state,
//     items: updateItem(state.items, payload.item),
//   })),
//   on(ItemActions.deleteItem, (state, payload) => ({
//     ...state,
//     items: deleteItem(state.items, payload.item),
//     selectedItem: null,
//   }))
// );

// export function reducer(state: ItemState | undefined, action: Action) {
//   return itemReducer(state, action);
// }
