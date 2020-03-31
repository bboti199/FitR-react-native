import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Title, Checkbox, Paragraph, Button} from 'react-native-paper';
import {Colors} from '../../styles/colors';

import NumericInput from '@wwdrew/react-native-numeric-textinput';
import Feather from 'react-native-vector-icons/Feather';

const ProgressDataCard = ({item, updateFormData, removeFormData}) => {
  const [completed, setCompleted] = useState(false);
  const [exerciseData, setExerciseData] = useState(
    Array.from({length: item.initialSets}, () => ({
      weight: 0,
      reps: item.initialReps,
      id: Math.random(),
    })),
  );

  const toggleCompleted = () => {
    if (!completed) {
      updateFormData(
        {
          sets: exerciseData.length,
          reps: exerciseData.map(e => e.reps),
          weight: exerciseData.map(e => e.weight),
          id: item._id,
        },
        item.exercise._id,
      );
    } else {
      removeFormData(item._id);
    }
    setCompleted(!completed);
  };

  const removeSet = id => {
    setExerciseData(exerciseData.filter(data => data.id !== id));
  };

  const updateRep = (value, id) => {
    const idx = exerciseData.findIndex(e => e.id === id);

    if (idx !== -1) {
      let newState = [...exerciseData];
      newState[idx].reps = value;

      setExerciseData(newState);
    }
  };

  const updateWeight = (value, id) => {
    const idx = exerciseData.findIndex(e => e.id === id);

    if (idx !== -1) {
      let newState = [...exerciseData];
      newState[idx].weight = value;

      setExerciseData(newState);
    }
  };

  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title>{item.exercise.name}</Title>
          <Checkbox
            status={completed ? 'checked' : 'unchecked'}
            color={Colors.green}
            onPress={toggleCompleted}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <Paragraph>SET</Paragraph>
            <Paragraph>REPS</Paragraph>
            <Paragraph>WEIGHT</Paragraph>
            <View />
          </View>
          {exerciseData.map((data, idx) => (
            <View style={styles.row} key={data.id}>
              <Paragraph>{idx + 1}</Paragraph>
              <NumericInput
                style={styles.input}
                value={data.reps}
                placeholder="0"
                placeholderTextColor={Colors.yellow}
                onUpdate={value => updateRep(value, data.id)}
              />
              <NumericInput
                style={styles.input}
                value={data.weight}
                placeholder="0"
                placeholderTextColor={Colors.yellow}
                onUpdate={value => updateWeight(value, data.id)}
              />
              <TouchableOpacity
                onPress={() => {
                  removeSet(data.id);
                }}>
                <Feather name="trash-2" size={22} color={Colors.fgPrimary} />
              </TouchableOpacity>
            </View>
          ))}
          <Button
            onPress={() => {
              setExerciseData([
                ...exerciseData,
                {weight: 0, reps: 0, id: Math.random()},
              ]);
            }}>
            Add set
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ProgressDataCard;

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 5,
    borderRadius: 20,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formContainer: {},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  rightActionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 45,
    backgroundColor: Colors.red,
    flex: 1,
  },
  input: {
    color: Colors.fgPrimary,
    borderWidth: 0.5,
    borderColor: Colors.fgPrimary,
    marginVertical: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
});
