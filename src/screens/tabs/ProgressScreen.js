import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Headline, Title} from 'react-native-paper';

import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';

import {useSelector, useDispatch} from 'react-redux';
import {fetchRoutines} from '../../redux/routine/actions';

import {Colors} from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import LoadingSpinner from '../../components/LoadingSpinner';
import RoutineProgressCard from '../../components/routines/RoutineProgressCard';

const ProgressScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.routines.fetching);
  const routines = useSelector(state => state.routines.routines);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
        <Headline>Analytics</Headline>
        <TouchableOpacity onPress={() => dispatch(fetchRoutines())}>
          <Feather name="refresh-cw" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.indicatorContainer}>
            <LoadingSpinner />
          </View>
        ) : (
          <React.Fragment>
            <Title style={{marginBottom: 10}}>Tap to show details</Title>
            <FlatList
              data={routines}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <RoutineProgressCard
                  routineId={item._id}
                  routineName={item.name}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

export default ProgressScreen;

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
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
