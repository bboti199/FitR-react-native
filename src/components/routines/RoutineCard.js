import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {
  Card,
  Caption,
  Portal,
  Dialog,
  Button,
  Title,
  Text,
} from 'react-native-paper';

import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../styles/colors';

import {useDispatch} from 'react-redux';
import {createRoutine, deleteRoutine} from '../../redux/routine/actions';

const RoutineCard = ({routine}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={hideDialog}
          style={styles.dialogStyle}>
          <Dialog.Title>
            Are you sure you want to delete this routine?
          </Dialog.Title>
          <Dialog.Actions style={styles.dialogActionStyle}>
            <Button color="#1877f2" onPress={hideDialog}>
              No
            </Button>
            <Button
              color="#1877f2"
              onPress={() => {
                hideDialog();
                dispatch(deleteRoutine(routine._id));
              }}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Card
        style={
          editMode ? {...styles.container, elevation: 7} : styles.container
        }
        onLongPress={() => setEditMode(true)}>
        <Card.Content>
          <View style={styles.titleContainer}>
            <View style={styles.title}>
              <Title style={{marginBottom: -5}}>{routine.name}</Title>
              {routine.description ? (
                <Caption>{routine.description}</Caption>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (!editMode) {
                  setDialogVisible(true);
                } else {
                  setEditMode(false);
                }
              }}>
              <Feather
                name={editMode ? 'x' : 'trash-2'}
                size={24}
                color={Colors.fgPrimary}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={routine.routineData}
            renderItem={({item}) => (
              <View style={styles.exerciseDetails}>
                <Text>
                  {item.progress[0].sets} x {item.exercise.name}
                </Text>
              </View>
            )}
            keyExtractor={item => item._id}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.buttonStyle}
              onPress={() => {
                if (editMode) {
                  console.log('Edit pressed');
                } else {
                  console.log('Start pressed');
                }
              }}>
              {editMode ? 'EDIT' : 'START'}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default RoutineCard;

const styles = StyleSheet.create({
  dialogActionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 2,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 70,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 2,
  },
  dialogStyle: {
    borderRadius: 25,
    marginHorizontal: 50,
  },
});
