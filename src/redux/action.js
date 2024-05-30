import { Alert } from "react-native";
import axios from "axios";
import { CommonActions } from '@react-navigation/native';

// Page Contact List //
export const SET_SEARCH_NAME = 'SET_SEARCH_NAME';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
export const SET_NAME_AZ = 'SET_NAME_AZ';
export const SET_NAME_ZA = 'SET_NAME_ZA';
export const SET_SORT_YOUNG = 'SET_SORT_YOUNG';
export const SET_SORT_OLD = 'SET_SORT_OLD';
export const SET_LIST_CONTACT = 'SET_LIST_CONTACT';

// Page Contact Detail //
export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_AGE = 'SET_AGE';
export const SET_PHOTO = 'SET_PHOTO';
export const SET_CONTACT_DETAIL = 'SET_CONTACT_DETAIL';


export const setSearchName = (payload) => ({
    type: SET_SEARCH_NAME,
    payload: payload
})

export const setIsLoading = (payload) => ({
    type: SET_IS_LOADING,
    payload: payload
})

export const setModalVisible = (visible) => ({
    type: SET_MODAL_VISIBLE,
    payload: visible,
});

export const setNameAZ = (value) => ({
    type: SET_NAME_AZ,
    payload: value,
});
  
export const setNameZA = (value) => ({
    type: SET_NAME_ZA,
    payload: value,
});
  
export const setSortYoung = (value) => ({
    type: SET_SORT_YOUNG,
    payload: value,
});
  
export const setSortOld = (value) => ({
    type: SET_SORT_OLD,
    payload: value,
});

export const setListContact = (listContact) => ({
    type: SET_LIST_CONTACT,
    payload: listContact,
});

export const getContactList = () => {
    return (dispatch) => {
      dispatch(setIsLoading(true));
      return axios({
        method: 'GET',
        url: 'https://contact.herokuapp.com/contact',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const listContact = res.data.data;
          dispatch(setListContact(listContact));
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
            Alert.alert("Error", error.message)
            console.error(error);
          dispatch(setIsLoading(false));
          throw error;
        });
    };
};

export const setIsEdit = (value) => ({
    type: SET_IS_EDIT,
    payload: value,
});

export const setFirstName = (payload) => ({
    type: SET_FIRST_NAME,
    payload: payload,
});

export const setLastName = (payload) => ({
    type: SET_LAST_NAME,
    payload: payload,
});

export const setAge = (payload) => ({
    type: SET_AGE,
    payload: payload,
});

export const setPhoto = (payload) => ({
    type: SET_PHOTO,
    payload: payload,
});

export const setContactDetail = (detailContact) => ({
    type: SET_CONTACT_DETAIL,
    payload: detailContact,
});

export const getContactDetails = (id) => {
    return (dispatch) => {
        return axios({
          method: 'GET',
          url: `https://contact.herokuapp.com/contact/${id}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
            const contactDetail = res.data.data;
            dispatch(setContactDetail(contactDetail));
            dispatch(setFirstName(contactDetail.firstName));
            dispatch(setLastName(contactDetail.lastName));
            dispatch(setAge(contactDetail.age));
            dispatch(setPhoto(contactDetail.photo));
        })
        .catch((error) => {
            Alert.alert("Error", error.message)
            console.error(error);
        throw error;
        });
    };
}

export const deleteContact = (id) => {
    return async (dispatch) => {
    try {
        const response = await axios ({
                method: 'DELETE',
                url: `https://contact.herokuapp.com/contact/${id}`,
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
              })
              if (response.status === 200 || response.status === 204) {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'ListContact' }],
                  })
                );
                alert('Contact Updated !!');
              }
            } catch (error) {
              console.log(error);
              if (error.response && error.response.status === 400) {
                Alert.alert("Error", error.message)
              } else {
                alert('Something went wrong');
              }
            }  
    }
}

export const setUpdateContact = (id, firstName, lastName, age, photo, navigation) => {
    return (dispatch) => {
        return axios({
          method: 'PUT',
          url: `https://contact.herokuapp.com/contact/${id}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo,
          },
        })
          .then((res) => {
            console.log(res.data.data)            
              navigation.dispatch(
                  CommonActions.reset({
                      index: 0,
                      routes: [
                      { name: 'ListContact' },
                      ],
                  })
                  );
              Alert.alert("Success", 'Contact Updated !!')
          })
          .catch((error) => {
              if ( error.response.status == 400 ) {
                  Alert.alert("Error", error.message)
              }
              else {
                  alert("Something Wrong")
              }
            throw error;
          });
      };
};

export const setAddContact = (firstName, lastName, age, photo, navigation) => {
    return (dispatch) => {
      return axios({
        method: 'POST',
        url: 'https://contact.herokuapp.com/contact',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
            firstName,
            lastName,
            age,
            photo,
          },
      })
        .then((res) => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                    { name: 'ListContact' },
                    ],
                })
                );
            Alert.alert("Success", 'Contact Added !!')
        })
        .catch((error) => {
            if ( error.response.status == 400 ) {
                Alert.alert("Error", error.message)
            }
            else {
                alert("Something Wrong")
            }
          throw error;
        });
    };
};