import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Headline, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {fetchChartData} from '../../redux/routine/actions';
import {useFocusEffect} from '@react-navigation/native';

import LoadingSpinner from '../../components/LoadingSpinner';
import {Colors} from '../../styles/colors';

import Feather from 'react-native-vector-icons/Feather';
import ExerciseProgressCard from '../../components/exercises/ExerciseProgressCard';

const ProgressInfoScreen = ({navigation, route}) => {
  const routineId = route.params.routineId;
  const routineName = route.params.routineName;

  const dispatch = useDispatch();
  const chartData = useSelector(state => state.routines.chartData);
  const loading = useSelector(state => state.routines.chartDataFetching);
  const error = useSelector(state => state.routines.chartDataFetchError);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchChartData(routineId, 'month'));
    }, [dispatch, routineId]),
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
        <Headline>{routineName}</Headline>
        <View />
      </View>
      <View style={styles.content}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={chartData}
            renderItem={({item}) => (
              <ExerciseProgressCard
                exercise={item.exercise}
                labels={item.date}
                weight={item.weight}
                workload={item.workload}
              />
            )}
            keyExtractor={item => item.exercise}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.red,
  },
});
