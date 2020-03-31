import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text, Card, Title} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Colors} from '../../styles/colors';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const calcAvg = array => {
  if (array.length === 0) {
    return 0;
  } else {
    let total = 0;
    array.map(data => {
      total += data;
    });

    return total / array.length;
  }
};

const WeightTab = ({progressInfo}) => {
  const [weightData, setWeightData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    extractWeightData();
  }, []);

  const extractWeightData = () => {
    const extractedWeights = progressInfo.map(data => {
      return calcAvg(data.weight);
    });

    const extractedDates = progressInfo.map(data =>
      moment(data.createdAt).format('DD/MM'),
    );

    extractedWeights.reverse();
    extractedDates.reverse();

    setWeightData(extractedWeights);
    setLabels(extractedDates);
  };

  return (
    <View>
      {labels.length ? (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: weightData,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={{
            backgroundGradientFrom: Colors.bgPrimary,
            backgroundGradientTo: Colors.bgPrimary,
            decimalPlaces: 1,
            color: () => Colors.blueSecondary,
            labelColor: () => Colors.grey,
            style: {
              borderRadius: 20,
            },
            propsForDots: {
              r: 5,
              strokeWidth: 3,
              stroke: Colors.bluePrimary,
            },
            propsForLabels: {
              fontFamily: 'NunitoSans-Bold',
            },
          }}
          bezier
          style={{
            paddingVertical: 0,
          }}
        />
      ) : null}
    </View>
  );
};

const WorkloadTab = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: Colors.fgPrimary,
    }}
    style={{
      backgroundColor: Colors.bgSecondary,
    }}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

const ExerciseProgressCard = ({exercise, progressInfo}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Weight'},
    {key: 'second', title: 'Workload'},
  ]);

  const renderScene = SceneMap({
    first: () => <WeightTab progressInfo={progressInfo} />,
    second: () => <WorkloadTab progressInfo={progressInfo} />,
  });

  return (
    <Card style={styles.cardStyle}>
      <Title style={{alignSelf: 'center', marginVertical: 10}}>
        {exercise.name}
      </Title>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        style={{backgroundColor: Colors.darkGrey}}
      />
    </Card>
  );
};

export default ExerciseProgressCard;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 20,
    marginVertical: 5,
  },
  scene: {
    flex: 1,
  },
});
