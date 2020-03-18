import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Picker} from 'react-native';
import TextInput from '../forms/TextInput';
import Button from '../forms/Button';
import {RadioButton, Text, Paragraph, Headline} from 'react-native-paper';
import {Formik} from 'formik';

import Modal from 'react-native-modal';
import LoadingSpinner from '../LoadingSpinner';

import {useSelector, useDispatch} from 'react-redux';
import {addExercise} from '../../redux/exercise/actions';

import {Colors} from '../../styles/colors';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Name can not be empty'),
});

const ExerciseModal = ({visible, setVisible}) => {
  const dispatch = useDispatch();
  const modalLoading = useSelector(state => state.exercises.modalLoading);
  const finishedCreate = useSelector(state => state.exercises.finishedCreate);
  const createError = useSelector(state => state.exercises.createError);

  useEffect(() => {
    if (finishedCreate) {
      setVisible(false);
    }
  }, [finishedCreate, setVisible]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}>
      {modalLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Headline>Add new exercise</Headline>
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{name: '', bodyPart: 'chest', type: 'compound'}}
              onSubmit={values => {
                dispatch(addExercise(values));
              }}
              validationSchema={validationSchema}>
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                errors,
                setFieldValue,
              }) => (
                <View>
                  <TextInput
                    label="Name"
                    placeholder="Enter exercise name here..."
                    value={values.name}
                    errorMessage={touched.name && errors.name}
                    onChangeText={handleChange('name')}
                    autoCapitalize="sentences"
                    autoCompleteType="name"
                    onBlur={handleBlur('name')}
                  />
                  <View style={{marginHorizontal: 20}}>
                    <Paragraph style={{marginTop: 20, marginBottom: -10}}>
                      Exercise Type
                    </Paragraph>
                    <View style={styles.typeContainerTopLevel}>
                      <View style={styles.typeContainer}>
                        <Text>Compound</Text>
                        <RadioButton
                          value="compound"
                          status={
                            values.type === 'compound' ? 'checked' : 'unchecked'
                          }
                          color={Colors.bluePrimary}
                          onPress={() => setFieldValue('type', 'compound')}
                        />
                      </View>
                      <View style={styles.typeContainer}>
                        <Text>Isolation</Text>
                        <RadioButton
                          value="isolation"
                          status={
                            values.type === 'isolation'
                              ? 'checked'
                              : 'unchecked'
                          }
                          color={Colors.bluePrimary}
                          onPress={() => setFieldValue('type', 'isolation')}
                        />
                      </View>
                    </View>
                    <Paragraph>Body Part</Paragraph>
                    <Picker
                      selectedValue={values.bodyPart}
                      style={styles.select}
                      onValueChange={handleChange('bodyPart')}>
                      <Picker.Item label="Chest" value="chest" />
                      <Picker.Item label="Shoulders" value="shoulders" />
                      <Picker.Item label="Back" value="back" />
                      <Picker.Item label="Abs" value="abs" />
                      <Picker.Item label="Biceps" value="biceps" />
                      <Picker.Item label="Triceps" value="triceps" />
                      <Picker.Item label="Quads" value="quads" />
                      <Picker.Item label="Hamstrings" value="hamstrings" />
                      <Picker.Item label="Calves" value="calves" />
                      <Picker.Item label="Traps" value="traps" />
                      <Picker.Item label="Other" value="other" />
                    </Picker>
                  </View>
                  {createError ? (
                    <Text style={styles.errorContainer}>{createError}</Text>
                  ) : null}
                  <View style={{alignSelf: 'center'}}>
                    <Button title="Submit" onPress={handleSubmit} />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ExerciseModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgPrimary,
    height: Dimensions.get('screen').height * 0.6,
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
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  typeContainerTopLevel: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    width: Dimensions.get('screen').width * 0.6,
    alignSelf: 'center',
    marginTop: 20,
  },
  select: {
    marginVertical: 15,
    backgroundColor: Colors.bgSecondary,
    color: Colors.fgPrimary,
  },
  errorContainer: {
    marginHorizontal: 25,
    textAlign: 'center',
    color: Colors.red,
    marginVertical: 10,
  },
});
