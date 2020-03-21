import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import TextInput from '../forms/TextInput';
import Button from '../forms/Button';
import {Formik} from 'formik';

import Modal from 'react-native-modal';
import LoadingSpinner from '../LoadingSpinner';

import {Colors} from '../../styles/colors';

import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {updateRoutine} from '../../redux/routine/actions';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Name can not be empty'),
  description: Yup.string('Description').required(
    'Description can not be empty',
  ),
});

const RoutineUpdateModal = ({visible, setVisible, initName, initDesc, id}) => {
  const modalLoading = useSelector(state => state.routines.routineUpdating);
  const completed = useSelector(state => state.routines.routineUpdateComplete);
  const dispatch = useDispatch();

  useEffect(() => {
    if (completed) {
      setVisible(false);
    }
  }, [completed, setVisible]);

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{name: initName, description: initDesc}}
            onSubmit={values => {
              dispatch(updateRoutine(id, values));
            }}
            validationSchema={validationSchema}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <View>
                <TextInput
                  label="Name"
                  placeholder="Enter routine name here..."
                  value={values.name}
                  errorMessage={touched.name && errors.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  autoCompleteType="name"
                  autoCapitalize="sentences"
                />
                <TextInput
                  label="Description"
                  placeholder="Enter routine description here..."
                  value={values.description}
                  errorMessage={touched.description && errors.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  autoCompleteType="name"
                  autoCapitalize="sentences"
                />
                <View style={{alignSelf: 'center', marginTop: 20}}>
                  <Button
                    loading={modalLoading}
                    title="Submit"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default RoutineUpdateModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    height: Dimensions.get('screen').height * 0.4,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderRadius: 15,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgPrimary,
    height: Dimensions.get('screen').height * 0.6,
    borderRadius: 15,
  },
  titleContainer: {
    marginTop: 50,
    alignSelf: 'center',
  },
  formContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
