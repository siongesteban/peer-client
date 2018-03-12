import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  TOGGLE_NOTE,
  GET_NOTES_FAILED,
  GET_NOTES_LOADING,
  GET_NOTES_SUCCESS,
  GET_NOTE_BY_ID_FAILED,
  GET_NOTE_BY_ID_LOADING,
  GET_NOTE_BY_ID_SUCCESS } from './NoteActionTypes';

// const initialState = [
//   {
//     id: 1,
//     contents: [
//       {
//         title: 'Sed ut perspiciatis',
//         text: 'Ynde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.'
//       }
//     ],
//     tags: [
//       'lipsum', 'test', 'material', 'note'
//     ],
//     color: '#E57373'
//   },
//   {
//     id: 2,
//     contents: [
//       {
//         title: 'At vero',
//         text: 'Accusamus et iusto odio dignissimos ducimus qui blanditiis.'
//       }
//     ],
//     tags: [
//       'voluptatum', 'cupiditate', 'molestias'
//     ],
//     color: '#F48FB1'
//   },
//   {
//     id: 3,
//     contents: [
//       {
//         title: 'What is this',
//         text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil.'
//       }
//     ],
//     tags: [
//       'foresee', 'bound'
//     ],
//     color: '#fff'
//   },
//   {
//     id: 4,
//     contents: [
//       {
//         title: 'Ut enim ad minima',
//         text: 'Oquis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?.'
//       }
//     ],
//     tags: [
//       'reprehenderit', 'aliquid', 'ullam'
//     ],
//     color: '#B39DDB'
//   },
//   {
//     id: 5,
//     contents: [
//       {
//         title: 'Holy Grail',
//         text: 'Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.'
//       }
//     ],
//     tags: [
//       'reprehenderit', 'aliquid', 'ullam'
//     ],
//     color: '#9FA8DA'
//   },
//   {
//     id: 6,
//     contents: [
//       {
//         title: 'At vero',
//         text: 'Accusamus et iusto odio dignissimos ducimus qui blanditiis.'
//       }
//     ],
//     tags: [
//       'voluptatum', 'cupiditate', 'molestias'
//     ],
//     color: '#fff'
//   },
//   {
//     id: 7,
//     contents: [
//       {
//         title: 'Sed ut perspiciatis',
//         text: 'Ynde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.'
//       }
//     ],
//     tags: [
//       'lipsum', 'test', 'material', 'note'
//     ],
//     color: '#B388FF'
//   },
//   {
//     id: 8,
//     contents: [
//       {
//         title: 'Ut enim ad minima',
//         text: 'Oquis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?.'
//       }
//     ],
//     tags: [
//       'reprehenderit', 'aliquid', 'ullam'
//     ],
//     color: '#03A9F4'
//   },
//   {
//     id: 9,
//     contents: [
//       {
//         title: 'Holy Grail',
//         text: 'Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.'
//       }
//     ],
//     tags: [
//       'reprehenderit', 'aliquid', 'ullam'
//     ],
//     color: '#80CBC4'
//   },
//   {
//     id: 10,
//     contents: [
//       {
//         title: 'What is this',
//         text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil.'
//       }
//     ],
//     tags: [
//       'foresee', 'bound'
//     ],
//     color: '#fff'
//   },
//   {
//     id: 11,
//     contents: [
//       {
//         title: 'Holy Grail',
//         text: 'Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.'
//       }
//     ],
//     tags: [
//       'reprehenderit', 'aliquid', 'ullam'
//     ],
//     color: '#CDDC39'
//   },
//   {
//     id: 12,
//     contents: [
//       {
//         title: 'At vero',
//         text: 'Accusamus et iusto odio dignissimos ducimus qui blanditiis.'
//       }
//     ],
//     tags: [
//       'voluptatum', 'cupiditate', 'molestias'
//     ],
//     color: '#00E676'
//   }
// ];

const notesInitialState = {
  all: [],
  failed: false,
  isLoading: false,
  isLoaded: false,
};

const persistConfig = {
  key: 'notes',
  storage: storage,
};

export const notesReducer = persistReducer(persistConfig, (state = notesInitialState, action) => {
  switch (action.type) {
    case GET_NOTES_FAILED:
      return {
        ...state,
        failed: action.failed
      };
    case GET_NOTES_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        all: action.notes,
        isLoaded: true
      };
    default:
      return state;
  }
});

const noteInitialState = {
  item: {},
  failed: false,
  isLoading: false
};

export const noteReducer = (state = noteInitialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTE:
      return state;
    case GET_NOTE_BY_ID_FAILED:
      return {
        ...state,
        failed: action.failed
      };
    case GET_NOTE_BY_ID_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_NOTE_BY_ID_SUCCESS:
      return {
        ...state,
        item: action.note,
      };
    default:
      return state;
  }
};