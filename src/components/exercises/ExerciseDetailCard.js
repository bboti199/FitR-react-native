import React, {useRef} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Title, Card, Caption, Paragraph, Text} from 'react-native-paper';

import {Colors} from '../../styles/colors';

import Swipeable from 'react-native-gesture-handler/Swipeable';

const ExerciseDetailCard = ({
  exercise,
  removeExercise,
  reps,
  sets,
  setReps,
  setSets,
}) => {
  const RightActions = () => {
    return (
      <View style={styles.rightActionContainer}>
        <Title>Remove</Title>
      </View>
    );
  };

  const input2Ref = useRef(null);

  return (
    <Swipeable
      renderRightActions={RightActions}
      onSwipeableRightOpen={() => removeExercise(exercise)}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.container}>
            <View>
              <Title>{exercise.name}</Title>
              <Paragraph>
                {exercise.bodyPart}, {exercise.type}
              </Paragraph>
            </View>
            <View style={styles.formFields}>
              <View style={styles.field}>
                <Caption>SETS</Caption>
                <TextInput
                  style={styles.input}
                  value={sets}
                  placeholder="0"
                  placeholderTextColor={Colors.fgPrimary}
                  onChangeText={text => setSets(exercise._id, text)}
                  keyboardType="numeric"
                  maxLength={5}
                  onSubmitEditing={() => input2Ref.current.focus()}
                />
              </View>
              <View style={styles.field}>
                <Caption>REPS</Caption>
                <TextInput
                  style={styles.input}
                  value={reps}
                  onChangeText={text => setReps(exercise._id, text)}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={Colors.fgPrimary}
                  maxLength={5}
                  ref={input2Ref}
                />
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

export default ExerciseDetailCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.bgSecondary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  field: {
    alignItems: 'center',
  },
  input: {
    color: Colors.fgPrimary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.fgPrimary,
    marginVertical: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 2,
  },
  rightActionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.red,
    flex: 1,
  },
  formFields: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
