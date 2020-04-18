import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Headline, Title} from 'react-native-paper';

import HeaderLeftButton from '../../components/navigation/HeaderLeftButton';

import {useSelector, useDispatch} from 'react-redux';
import {fetchRoutines} from '../../redux/routine/actions';

import {Colors} from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import LoadingSpinner from '../../components/LoadingSpinner';
import RoutineProgressCard from '../../components/routines/RoutineProgressCard';
import {globalStyles} from '../../styles/global';

const ProgressScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.routines.fetching);
  const routines = useSelector(state => state.routines.routines);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.titleContainer}>
        <HeaderLeftButton size={26} buttonStyle={{color: Colors.fgPrimary}} />
        <Headline>Analytics</Headline>
        <TouchableOpacity onPress={() => dispatch(fetchRoutines())}>
          <Feather name="refresh-cw" size={26} color={Colors.fgPrimary} />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.content}>
        {loading ? (
          <View style={globalStyles.indicatorContainer}>
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
