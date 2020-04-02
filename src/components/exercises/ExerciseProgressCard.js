import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text, Card, Title} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Colors} from '../../styles/colors';
import {LineChart} from 'react-native-chart-kit';

const WeightTab = ({labels, weight}) => {
  return (
    <View>
      {labels.length ? (
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: weight,
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
      ) : (
        <View style={styles.errorContainer}>
          <Text>This exercise does not contain any log data</Text>
        </View>
      )}
    </View>
  );
};

const WorkloadTab = ({labels, workload}) => (
  <View>
    {labels.length ? (
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: workload,
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
    ) : (
      <View style={styles.errorContainer}>
        <Text>This exercise does not contain any log data</Text>
      </View>
    )}
  </View>
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

const ExerciseProgressCard = ({exercise, labels, weight, workload}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Weight'},
    {key: 'second', title: 'Workload'},
  ]);

  const renderScene = SceneMap({
    first: () => <WeightTab labels={labels} weight={weight} />,
    second: () => <WorkloadTab labels={labels} workload={workload} />,
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
  errorContainer: {
    height: 250,
    width: Dimensions.get('screen').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
