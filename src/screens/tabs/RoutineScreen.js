import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Headline, Title, Text, Portal} from 'react-native-paper';

import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';
import Feather from 'react-native-vector-icons/Feather';
import LoadingSpinner from '../../components/LoadingSpinner';

import {Colors} from '../../styles/colors';

import {useDispatch, useSelector} from 'react-redux';
import {fetchRoutines} from '../../redux/routine/actions';
import RoutineCard from '../../components/routines/RoutineCard';

const RoutineScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const fetching = useSelector(state => state.routines.fetching);
  const modified = useSelector(state => state.routines.modified);
  const routines = useSelector(state => state.routines.routines);
  const fetchError = useSelector(state => state.routines.fetchError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (routines.length === 0) {
      dispatch(fetchRoutines());
    }
    if (modified) {
      dispatch(fetchRoutines());
    }
  }, [dispatch, routines.length, modified]);

  const onRefreshing = useCallback(() => {
    setRefreshing(true);

    dispatch(fetchRoutines());

    if (!fetching) {
      setRefreshing(false);
    }
  }, [dispatch, fetching]);

  return (
    <Portal.Host>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor={Colors.bgSecondary} />
        <View style={styles.titleContainer}>
          <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
          <Headline>Routines</Headline>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateRoutine');
            }}>
            <Feather name="plus" size={26} color={Colors.fgPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.routineInfoContainer}>
            <Title>Total: {routines.length}</Title>
            <TouchableOpacity onPress={() => dispatch(fetchRoutines())}>
              <Feather name="refresh-cw" size={26} color={Colors.fgPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.routineContainer}>
            {fetching ? (
              <View style={styles.indicatorContainer}>
                <LoadingSpinner />
              </View>
            ) : fetchError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{fetchError}</Text>
              </View>
            ) : routines.length === 0 ? (
              <View style={styles.errorContainer}>
                <Title>You do not have any routines yet...</Title>
              </View>
            ) : (
              <FlatList
                data={routines}
                renderItem={({item}) => <RoutineCard routine={item} />}
                keyExtractor={item => item._id}
                refreshing={refreshing}
                onRefresh={onRefreshing}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </View>
    </Portal.Host>
  );
};

export default RoutineScreen;

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
    paddingHorizontal: 10,
  },
  routineInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  routineContainer: {
    marginTop: 20,
    marginVertical: 5,
    marginBottom: 50,
  },
  errorText: {
    color: Colors.red,
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 250,
  },
});
