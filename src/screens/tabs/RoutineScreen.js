import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Headline, Title, Text, Portal} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';
import Feather from 'react-native-vector-icons/Feather';
import LoadingSpinner from '../../components/LoadingSpinner';

import {Colors} from '../../styles/colors';

import {useDispatch, useSelector} from 'react-redux';
import {fetchRoutines} from '../../redux/routine/actions';
import RoutineCard from '../../components/routines/RoutineCard';
import {globalStyles} from '../../styles/global';

const RoutineScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const fetching = useSelector(state => state.routines.fetching);
  const modified = useSelector(state => state.routines.modified);
  const routines = useSelector(state => state.routines.routines);
  const fetchError = useSelector(state => state.routines.fetchError);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (routines.length === 0 || modified) {
        dispatch(fetchRoutines());
      }
    }, [routines.length, modified, dispatch]),
  );

  const onRefreshing = useCallback(() => {
    setRefreshing(true);

    dispatch(fetchRoutines());

    if (!fetching) {
      setRefreshing(false);
    }
  }, [dispatch, fetching]);

  return (
    <Portal.Host>
      {/* <OfflineNotice /> */}
      <View style={globalStyles.mainContainer}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          backgroundColor={Colors.bgSecondary}
        />
        <View style={globalStyles.titleContainer}>
          <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
          <Headline>Routines</Headline>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateRoutine');
            }}>
            <Feather name="plus" size={26} color={Colors.fgPrimary} />
          </TouchableOpacity>
        </View>
        <View style={globalStyles.content}>
          <View style={styles.routineInfoContainer}>
            <Title>Total: {routines.length}</Title>
            <TouchableOpacity onPress={() => dispatch(fetchRoutines())}>
              <Feather name="refresh-cw" size={26} color={Colors.fgPrimary} />
            </TouchableOpacity>
          </View>
          {fetching ? (
            <View style={globalStyles.indicatorContainer}>
              <LoadingSpinner />
            </View>
          ) : fetchError ? (
            <View style={globalStyles.errorContainer}>
              <Text style={globalStyles.errorText}>{fetchError}</Text>
            </View>
          ) : routines.length === 0 ? (
            <View style={globalStyles.errorContainer}>
              <Title>You do not have any routines yet...</Title>
            </View>
          ) : (
            <View style={styles.routineContainer}>
              <FlatList
                data={routines}
                renderItem={({item}) => <RoutineCard routine={item} />}
                keyExtractor={item => item._id}
                refreshing={refreshing}
                onRefresh={onRefreshing}
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 60}}
              />
            </View>
          )}
        </View>
      </View>
    </Portal.Host>
  );
};

export default RoutineScreen;

const styles = StyleSheet.create({
  routineInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  routineContainer: {
    marginTop: 10,
    marginVertical: 5,
    marginBottom: 30,
  },
});
