import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Card,
  Title,
  Button,
  Paragraph,
  Checkbox,
  Text,
} from 'react-native-paper';
import {Colors} from '../../styles/colors';

import Feather from 'react-native-vector-icons/Feather';
// import Collapsible from 'react-native-collapsible';
import NumericInput from '@wwdrew/react-native-numeric-textinput';

const RoutineDataCard = ({routineInfo, updateFormData, removeFormData}) => {
  // const [collapsed, setCollapsed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progressData, setProgressData] = useState(routineInfo);

  const toggleCompleted = () => {
    if (!completed) {
      updateFormData(
        {
          //weight: progressData.weight,
          sets: progressData.sets,
          reps: progressData.reps,
          id: progressData._id,
        },
        routineInfo.exercise._id,
      );
    } else {
      removeFormData(progressData._id);
    }
    setCompleted(!completed);
  };

  useEffect(() => {
    let newWeightArr = [...progressData.weight];

    if (newWeightArr.length === 0) {
      newWeightArr = new Array(progressData.sets).fill(0);
      setProgressData({...progressData, weight: newWeightArr});
    }
  }, []);

  // const toggleCollapsed = () => setCollapsed(!collapsed);

  const updateRepsAtIndex = (idx, value) => {
    const newReps = [...progressData.reps];
    newReps[idx] = value;

    setProgressData({
      ...progressData,
      reps: newReps,
    });
  };

  const updateWeightAtIndex = (idx, value) => {
    let newWeightArr = [...progressData.weight];

    if (newWeightArr.length === 0) {
      newWeightArr = new Array({length: progressData.sets}).fill(0);
    }

    if (value === null || value === undefined) {
      newWeightArr[idx] = 0;
    } else {
      newWeightArr[idx] = value;
    }

    setProgressData({
      ...progressData,
      weight: newWeightArr,
    });
  };

  const removeSetAtIndex = idx => {
    let newReps = [...progressData.reps];
    newReps.splice(idx, 1);

    setProgressData({
      ...progressData,
      sets: progressData.sets - 1,
      reps: newReps,
    });
  };

  return (
    <Card style={styles.cardStyle}>
      <Card.Content>
        <View style={styles.content}>
          <Title>{routineInfo.exercise.name}</Title>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Completed</Text>
            <Checkbox
              status={completed ? 'checked' : 'unchecked'}
              color={Colors.green}
              onPress={toggleCompleted}
            />
          </View>
        </View>
      </Card.Content>

      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Paragraph>SET</Paragraph>
          <Paragraph>REPS</Paragraph>
          <Paragraph>WEIGHT</Paragraph>
          <View />
        </View>
        {/* {progressData.reps.map((data, idx) => (
          <View style={styles.row} key={idx}>
            <Paragraph>{idx + 1}</Paragraph>
            <NumericInput
              style={styles.input}
              value={data}
              placeholder="0"
              placeholderTextColor={Colors.fgPrimary}
              onUpdate={value => updateRepsAtIndex(idx, value)}
            />
            <NumericInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={Colors.fgPrimary}
              value={progressData.weight[idx]}
              onUpdate={value => updateWeightAtIndex(idx, value)}
            />

            <TouchableOpacity onPress={() => removeSetAtIndex(idx)}>
              <Feather name="trash-2" color={Colors.fgPrimary} size={22} />
            </TouchableOpacity>
          </View>
        ))} */}
        <Button
          onPress={() => {
            setProgressData({
              ...progressData,
              sets: progressData.sets + 1,
              reps: [...progressData.reps, 0],
              weight: [...progressData.weight, 0],
            });
          }}
          style={styles.addSetButton}>
          Add Set
        </Button>
      </View>
    </Card>
  );
};

export default RoutineDataCard;

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: Colors.bgSecondary,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingBottom: 15,
  },
  formContainer: {
    backgroundColor: Colors.bgSecondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginVertical: 5,
  },
  input: {
    color: Colors.fgPrimary,
    borderWidth: 1,
    borderColor: Colors.fgPrimary,
    marginVertical: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 2,
  },
  addSetButton: {
    marginVertical: 7,
  },
});
