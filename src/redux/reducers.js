import { combineReducers } from "redux";
import * as actionTypes from './action';

const initialStateListContact = {
    isLoading : false,
    searchName : '',
    modalVisible : false,
    namaAZ : false,
    namaZA : false,
    sortYoung : false,
    sortOld : false,
    Contact : [],
};

const listContactReducer = (state = initialStateListContact, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_NAME:
          return {...state, searchName: action.payload};
        case actionTypes.SET_IS_LOADING:
          return {...state, isLoading: action.payload};
        case actionTypes.SET_MODAL_VISIBLE:
          return { ...state, modalVisible: action.payload };
        case actionTypes.SET_NAME_AZ:
          return { ...state, nameAZ: action.payload };
        case actionTypes.SET_NAME_ZA:
          return { ...state, nameZA: action.payload };
        case actionTypes.SET_SORT_YOUNG:
          return { ...state, sortYoung: action.payload };
        case actionTypes.SET_SORT_OLD:
          return { ...state, sortOld: action.payload };
        case actionTypes.SET_LIST_CONTACT:
            return {...state, Contact: action.payload};
        default:
          return state;
    }
};

const ContactDetail = {
    contactDetails : [],
    firstName : '',
    lastName : '',
    age : 0,
    photo : null,
};

const contactDetailReducer = (state = ContactDetail, action) => {
    switch (action.type) {
        case actionTypes.SET_FIRST_NAME:
            return {...state, firstName: action.payload};
        case actionTypes.SET_LAST_NAME:
            return {...state, lastName: action.payload};
        case actionTypes.SET_AGE:
            return {...state, age: action.payload};
        case actionTypes.SET_PHOTO:
            return {...state, photo: action.payload};
        case actionTypes.SET_CONTACT_DETAIL:
        return {...state, contactDetails: action.payload};
        default:
          return state;
    }
};


const appReducer = combineReducers ({
    listContactReducer,
    contactDetailReducer,
});

export default appReducer