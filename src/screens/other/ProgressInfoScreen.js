import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Headline} from 'react-native-paper';

import {Colors} from '../../styles/colors';

import Feather from 'react-native-vector-icons/Feather';
import ExerciseProgressCard from '../../components/exercises/ExerciseProgressCard';

const ProgressInfoScreen = ({navigation, route}) => {
  const routine = route.params.routine;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
        <Headline>{route.params.routine.name}</Headline>
        <View />
      </View>
      <View style={styles.content}>
        <FlatList
          data={routine.routineData}
          renderItem={({item}) => (
            <ExerciseProgressCard
              exercise={item.exercise}
              progressInfo={item.progress}
            />
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ProgressInfoScreen;

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
    justifyContent: 'space-around',
    marginHorizontal: -20,
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
    paddingHorizontal: 20,
  },
});
