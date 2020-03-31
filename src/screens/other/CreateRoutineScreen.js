import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Text, Headline, Button} from 'react-native-paper';
import TextInput from '../../components/forms/TextInput';

import ExerciseDetailCard from '../../components/exercises/ExerciseDetailCard';
import * as yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {createRoutine} from '../../redux/routine/actions';

import {Colors} from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';

const formSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  routineData: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        exercise: yup.string().required(),
        progress: yup.array().of(
          yup.object().shape({
            initialSets: yup
              .number()
              .integer()
              .moreThan(0)
              .required(),
            initialReps: yup.array().of(
              yup
                .number()
                .integer()
                .required(),
            ),
          }),
        ),
      }),
    ),
});

const CreateRoutineScreen = ({navigation}) => {
  const [name, setName] = useState({error: '', value: ''});
  const [description, setDescription] = useState({error: '', value: ''});
  const [exerciseData, setExerciseData] = useState({
    exerciseList: [],
  });
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const createError = useSelector(state => state.routines.createError);
  const creating = useSelector(state => state.routines.creating);
  const createFinished = useSelector(state => state.routines.createFinished);

  const descRef = useRef(null);

  useEffect(() => {
    if (createFinished) {
      navigation.goBack();
    }
  }, [createFinished, navigation]);

  useEffect(() => {
    if (createError) {
      setFormError(createError);
    }
  }, [createError]);

  const checkField = (field, setField) => {
    if (field.value === '') {
      setField({...field, error: 'This field can not be empty!'});
    } else {
      setField({...field, error: ''});
    }
  };

  const addExerciseToState = exercise => {
    const exerciseFound = exerciseData.exerciseList.find(
      data => data._id === exercise._id,
    );
    if (!exerciseFound) {
      setExerciseData({
        exerciseList: [
          ...exerciseData.exerciseList,
          {...exercise, reps: '', sets: ''},
        ],
      });
    }
  };

  const removeExercise = exercise => {
    setExerciseData({
      exerciseList: exerciseData.exerciseList.filter(
        exerciseItem => exerciseItem._id !== exercise._id,
      ),
    });
  };
  const setReps = (id, reps) => {
    const exerciseIndex = exerciseData.exerciseList.findIndex(
      data => data._id === id,
    );

    if (exerciseIndex !== -1) {
      let newState = Object.assign({}, exerciseData);

      newState.exerciseList[exerciseIndex].reps = reps;

      setExerciseData(newState);
    }
  };

  const setSets = (id, sets) => {
    const exerciseIndex = exerciseData.exerciseList.findIndex(
      data => data._id === id,
    );

    if (exerciseIndex !== -1) {
      let newState = Object.assign({}, exerciseData);

      newState.exerciseList[exerciseIndex].sets = sets;

      setExerciseData(newState);
    }
  };

  const handleSubmit = () => {
    checkField(name, setName);
    checkField(description, setDescription);

    if (name.value !== '' && description.value !== '') {
      const formData = {
        name: name.value,
        description: description.value,
        routineData: exerciseData.exerciseList.map(exerciseDataItem => {
          let sets = exerciseDataItem.sets;
          let reps = exerciseDataItem.reps;

          if (sets === '') {
            sets = 0;
          } else {
            sets = parseInt(sets, 10);
          }

          if (reps === '' || sets === '' || sets === 0 || reps === 0) {
            reps = 0;
          } else {
            reps = parseInt(reps, 10);
          }

          return {
            exercise: exerciseDataItem._id,
            initialSets: sets,
            initialReps: reps,
          };
        }),
      };

      formSchema
        .validate(formData)
        .then(data => {
          setFormError('');
          dispatch(createRoutine(data));
        })
        .catch(err => {
          if (err.type === 'min') {
            if (err.path.includes('sets')) {
              setFormError('Your exercises must have at least one set!');
            } else {
              setFormError('Your routine must contain at least one exercise!');
            }
          } else {
            setFormError('An unknown error occured!');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={Colors.bgSecondary} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" color={Colors.fgPrimary} size={26} />
        </TouchableOpacity>
        <Headline>Create Routine</Headline>
        <TouchableOpacity onPress={handleSubmit}>
          <Feather name="check" color={Colors.fgPrimary} size={26} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextInput
            label="Name"
            autoCapitalize="sentences"
            autoCompleteType="name"
            placeholder="Enter routine name..."
            value={name.value}
            errorMessage={name.error}
            onBlur={() => checkField(name, setName)}
            onChangeText={text => setName({...name, value: text})}
            onSubmitEditing={() => descRef.current.focus()}
          />
          <TextInput
            label="Description"
            autoCapitalize="sentences"
            autoCompleteType="name"
            placeholder="Enter routine description..."
            value={description.value}
            errorMessage={description.error}
            onBlur={() => checkField(description, setDescription)}
            onChangeText={text => setDescription({...description, value: text})}
            ref={descRef}
          />
          <Button
            onPress={() =>
              navigation.navigate('ExerciseSelection', {
                addExerciseToState,
              })
            }>
            Add exercise
          </Button>
        </View>
        <View style={styles.separator} />
        <View style={styles.exerciseContainer}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{formError}</Text>
          </View>
          {creating ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator color={Colors.fgPrimary} size="large" />
            </View>
          ) : exerciseData.exerciseList.length === 0 ? null : (
            <FlatList
              data={exerciseData.exerciseList}
              renderItem={({item}) => (
                <ExerciseDetailCard
                  exercise={item}
                  removeExercise={removeExercise}
                  sets={item.sets}
                  reps={item.reps}
                  setReps={setReps}
                  setSets={setSets}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateRoutineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  titleContainer: {
    backgroundColor: Colors.bgSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: -20,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.grey,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  exerciseContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
