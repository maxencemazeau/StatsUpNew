import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button, Card, Text, Checkbox } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { activityWithNoGoal } from '../../axiosPath/axiosPath';

export default function LinkedActivity({ linkedActivity, UserId }) {
  const [activityList, setActivityList] = useState([]);
  const [noActivityWithoutGoal, setNoActivityWithoutGoal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showActivityList, setShowActivityList] = useState(false);

  useEffect(() => {
    const LoadActivitiesWithNoGoal = async () => {
      const response = await axios.get(activityWithNoGoal, { params: { id: UserId } });
      if (response.data.length > 1) {
        setActivityList(response.data);
      } else {
        setNoActivityWithoutGoal(true);
      }
    };

    LoadActivitiesWithNoGoal();
  }, []);

  const AddOrRemoveLinkedActivity = (id, isChecked) => {
    if (isChecked == true) {
      linkedActivity.push(id);
    } else {
      linkedActivity = linkedActivity.filter((item) => item !== id);
    }
  };

  const changeShowActivity = () => {
    setShowActivityList(prevState => !prevState)
  }

  return (
    <>
      <View style={{ ...styles.checkboxContainer, marginTop: 10 }}>
        <View style={styles.line}>
          <Text color={'black'}>Show linkable activities</Text>
          <Button icon={showActivityList && <Check />} style={{ backgroundColor: "black", color: "white", width: 15, height: 30 }} onPress={() => changeShowActivity()}></Button>
        </View>
      </View >
      {noActivityWithoutGoal &&
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
          No activity without goal
        </Text>
      }
      {
        showActivityList &&
        <View>
          {activityList?.map((activities) => (
            <Card key={activities.ActivityID} style={styles.container}>
              <Card.Header style={styles.activityCardHeader}>
                <Text>{activities.ActivityName}</Text>
                <Checkbox
                  size="$6"
                  style={{ backgroundColor: 'white' }}
                  onCheckedChange={(isChecked) =>
                    AddOrRemoveLinkedActivity(activities.ActivityID, isChecked)
                  }>
                  <Checkbox.Indicator>
                    <Check color={'#DD7A34'} />
                  </Checkbox.Indicator>
                </Checkbox>
              </Card.Header>
            </Card>
          ))}
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  activityCardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
});
