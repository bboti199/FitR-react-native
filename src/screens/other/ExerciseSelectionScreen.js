import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import {Text, Headline, Searchbar} from 'react-native-paper';

import {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import {fetchExercises} from '../../redux/exercise/actions';

import ExerciseSelectionCard from '../../components/exercises/ExerciseSelectionCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import {Colors} from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';

const ExerciseSelectionScreen = ({navigation, route}) => {
  const [query, setQuery] = useState('');

  const exercises = useSelector(state => state.exercises.exercises);
  const fetching = useSelector(state => state.exercises.fetching);
  const dispatch = useDispatch();

  useEffect(() => {
    if (exercises.length === 0 || exercises === undefined) {
      dispatch(fetchExercises());
    }
  }, [dispatch, exercises]);

  const filteredExercises = exercises.filter(
    createFilter(query, ['name', 'bodyPart']),
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.bgPrimary} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
        <Headline>Exercises</Headline>
        <TouchableOpacity onPress={() => dispatch(fetchExercises())}>
          <Feather name="refresh-cw" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.exerciseContainer}>
        {!fetching ? (
          <View>
            <Searchbar
              placeholder="Search exercises..."
              placeholderTextColor={Colors.fgPrimary}
              value={query}
              onChangeText={text => setQuery(text)}
              style={{borderRadius: 20, marginBottom: 20, marginHorizontal: 5}}
            />
            <FlatList
              data={filteredExercises}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              style={{marginBottom: 90}}
              renderItem={({item}) => (
                <ExerciseSelectionCard
                  exercise={item}
                  addToList={() => {
                    route.params.addExerciseToState(item);
                    navigation.goBack();
                  }}
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.indicatorContainer}>
            <LoadingSpinner />
          </View>
        )}
      </View>
    </View>
  );
};

export default ExerciseSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseContainer: {
    flex: 1,
  },
  indicatorContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
