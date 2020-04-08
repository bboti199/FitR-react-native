import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  Headline,
  Button,
  Portal,
  Dialog,
  Text,
  Snackbar,
} from 'react-native-paper';

import LoadingSpinner from '../../components/LoadingSpinner';

import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestLog } from '../../redux/routine/actions';
import { createLog } from '../../redux/logs/actions';

import { Colors } from '../../styles/colors';
import ProgressDataCard from '../../components/routines/ProgressDataCard';
import LogProgressDataCard from '../../components/routines/LogProgressDataCard';

import * as yup from 'yup';

const formSchema = yup
  .array()
  .of(
    yup
      .object({
        exercise: yup.string().required('Exercise required'),
        weight: yup
          .array()
          .of(yup.number().required())
          .required()
          .min(1, 'You must complete at least one set'),
        reps: yup
          .array()
          .of(yup.number().required())
          .required()
          .min(1, 'You must complete at least one set'),
        sets: yup.number().required(),
      })
      .required(),
  )
  .min(1, 'You must complete at least one exercise');

const WorkoutScreen = ({ navigation, route }) => {
  const routine = route.params.routine;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState([]);

  const loading = useSelector((state) => state.logs.creating);
  const completed = useSelector((state) => state.routines.logCreated);

  const latestLog = useSelector((state) => state.routines.latestLog);
  const latestLogFetching = useSelector(
    (state) => state.routines.latestLogFetching,
  );
  const latestLogFetchError = useSelector(
    (state) => state.routines.latestLogFetchError,
  );

  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchLatestLog(routine._id));
    }, [dispatch, routine._id]),
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!dialogVisible) {
          setDialogVisible(true);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [dialogVisible, setDialogVisible]),
  );

  useCallback(() => {
    if (completed) {
      navigation.goBack();
    }
  }, [completed, navigation]);

  const updateFormData = (progressInfo, exercise) => {
    const found = formData.find((data) => data.id === progressInfo.id);

    if (!found) {
      setFormData([...formData, { exercise, ...progressInfo }]);
    }
  };

  const removeFormData = (progressInfoID) => {
    setFormData(formData.filter((data) => data.id !== progressInfoID));
  };

  const handleSubmit = () => {
    formSchema
      .validate(formData)
      .then((data) => {
        dispatch(createLog(routine._id, data));
        setTimeout(() => navigation.goBack(), 500);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setSnackbarVisible(true);
      });
  };

  const [dialogVisible, setDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const hideDialog = () => setDialogVisible(false);

  return (
    <Portal.Host>
      <Snackbar
        style={{
          backgroundColor: Colors.darkGrey,
          marginHorizontal: 20,
          marginBottom: 30,
        }}
        duration={Snackbar.DURATION_SHORT}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'GOT IT',
          onPress: () => setDialogVisible(false),
        }}>
        <Text>{errorMessage}</Text>
      </Snackbar>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={hideDialog}
          style={styles.dialogStyle}>
          <Dialog.Title>
            Are you sure you want to cancel this workout?
          </Dialog.Title>
          <Dialog.Actions style={styles.dialogActionStyle}>
            <Button color={Colors.bluePrimary} onPress={hideDialog}>
              No
            </Button>
            <Button
              color={Colors.bluePrimary}
              onPress={() => {
                hideDialog();
                navigation.goBack();
              }}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Button
            color={Colors.red}
            onPress={() => {
              setDialogVisible(true);
            }}>
            Cancel
          </Button>
          <Headline>{routine.name}</Headline>
          <Button onPress={handleSubmit}>Finish</Button>
        </View>
        <View style={styles.content}>
          {loading || latestLogFetching ? (
            <View style={styles.indicatorContainer}>
              <LoadingSpinner />
            </View>
          ) : latestLogFetchError === null ? (
            <View style={{ marginHorizontal: 20 }}>
              <FlatList
                data={latestLog.workout}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <LogProgressDataCard
                    item={item}
                    updateFormData={updateFormData}
                    removeFormData={removeFormData}
                  />
                )}
              />
            </View>
          ) : (
            <View style={{ marginHorizontal: 20 }}>
              <FlatList
                data={routine.routineData}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <ProgressDataCard
                    item={item}
                    updateFormData={updateFormData}
                    removeFormData={removeFormData}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
    </Portal.Host>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgSecondary,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  titleContainer: {
    backgroundColor: Colors.bgSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  dialogStyle: {
    borderRadius: 25,
    marginHorizontal: 50,
  },
  dialogActionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.red,
  },
  errorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  indicatorContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
