import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Headline, Button, Portal, Dialog, Text} from 'react-native-paper';

import RoutineDataCard from '../../components/routines/RoutineDataCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import {useSelector, useDispatch} from 'react-redux';
import {uploadProgressData} from '../../redux/routine/actions';
import {createLog} from '../../redux/logs/actions';

import {Colors} from '../../styles/colors';

const WorkoutScreen = ({navigation, route}) => {
  const routine = route.params.routine;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.routines.progressDataUploading);
  const error = useSelector(state => state.routines.progressDataUploadError);
  const completed = useSelector(
    state => state.routines.progressUploadCompleted,
  );

  useEffect(() => {
    if (completed) {
      navigation.goBack();
    }
  }, [completed, navigation]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState([]);

  const updateFormData = (progressInfo, exerciseId) => {
    const found = formData.find(data => data.progress.id === progressInfo.id);

    if (!found) {
      setFormData([
        ...formData,
        {exercise: exerciseId, progress: progressInfo},
      ]);
    }
  };

  const removeFormData = id => {
    const found = formData.find(data => data.progress.id === id);

    if (found) {
      setFormData(formData.filter(data => data.progress.id !== id));
    }
  };

  const handleSubmit = () => {
    let submitData = formData.map(data => ({
      exercise: data.exercise,
      progress: {
        weight: data.progress.weight,
        sets: data.progress.sets,
        reps: data.progress.reps,
      },
    }));

    dispatch(createLog(routine._id));
    dispatch(uploadProgressData(routine._id, submitData));
  };

  const hideDialog = () => setDialogVisible(false);

  return (
    <Portal.Host>
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
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          {loading ? (
            <View style={styles.indicatorContainer}>
              <LoadingSpinner />
            </View>
          ) : (
            <FlatList
              data={routine.routineData}
              renderItem={({item}) => (
                <RoutineDataCard
                  routineInfo={item}
                  updateFormData={updateFormData}
                  removeFormData={removeFormData}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
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
